# Stripe Integration Architecture

**Status:** PLANNED
**Last Updated:** 2026-01-24

---

## Overview

Quorum Tours uses Stripe for the unique "quorum" payment flow where payments are authorized (held) but not captured until a tour reaches its minimum threshold.

---

## Payment Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        QUORUM PAYMENT LIFECYCLE                              │
└─────────────────────────────────────────────────────────────────────────────┘

    BIRDER COMMITS                THRESHOLD MET                TOUR COMPLETES
         │                              │                            │
         ▼                              ▼                            ▼
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ Create Payment  │          │ Capture Payment │          │ Transfer to     │
│ Intent (manual  │─────────►│ Intent          │─────────►│ Operator via    │
│ capture)        │          │                 │          │ Connect         │
└─────────────────┘          └─────────────────┘          └─────────────────┘
         │                              │                            │
         ▼                              ▼                            ▼
   reservation:              reservation:                 reservation:
   status='reserved'         status='confirmed'           stripe_transfer_id
   stripe_payment_           deposit_charged=true         transferred_at
   intent_id set             platform_fee_cents set       operator_payout_cents

         │
         ▼ (if threshold NOT met by deadline)
┌─────────────────┐
│ Cancel Payment  │
│ Intent (release │
│ hold)           │
└─────────────────┘
         │
         ▼
   reservation:
   status='cancelled'
   No charge to birder
```

---

## Database Schema

### Core Tables

**reservations** (booking records):
```sql
-- Payment tracking
stripe_payment_intent_id TEXT,       -- PaymentIntent ID
deposit_cents INTEGER,               -- Deposit amount held
deposit_charged BOOLEAN,             -- Has payment been captured?
deposit_charged_at TIMESTAMPTZ,      -- When captured
stripe_deposit_charge_id TEXT,       -- Charge ID for deposit
stripe_balance_charge_id TEXT,       -- Charge ID for balance (if split)
balance_cents INTEGER,               -- Remaining balance
balance_paid_at TIMESTAMPTZ,         -- When balance paid

-- Fee tracking
platform_fee_cents INTEGER,          -- 6% commission
operator_payout_cents INTEGER,       -- Net to operator (computed)
stripe_transfer_id TEXT,             -- Transfer to Connect account
transferred_at TIMESTAMPTZ,          -- When transferred

-- Refund tracking
refund_amount_cents INTEGER,
refunded_at TIMESTAMPTZ,
```

**operators** (Connect accounts):
```sql
stripe_account_id TEXT,              -- Connect account ID
stripe_onboarding_complete BOOLEAN,  -- Legacy field
stripe_charges_enabled BOOLEAN,      -- Can accept charges
stripe_payouts_enabled BOOLEAN,      -- Can receive payouts
stripe_details_submitted BOOLEAN,    -- All details submitted
stripe_onboarding_started_at TIMESTAMPTZ,
stripe_onboarding_completed_at TIMESTAMPTZ,
```

**payment_events** (webhook log):
```sql
stripe_event_id TEXT UNIQUE,         -- Idempotency key
event_type TEXT,                     -- 'payment_intent.succeeded', etc.
reservation_id UUID,                 -- Link to reservation
raw_payload JSONB,                   -- Full event for debugging
processed BOOLEAN,                   -- Has been handled?
processing_error TEXT,               -- Error if failed
```

---

## Stripe Webhook Events to Handle

| Event | Action |
|-------|--------|
| `payment_intent.created` | Log event |
| `payment_intent.succeeded` | Update reservation, trigger threshold check |
| `payment_intent.payment_failed` | Update reservation, notify user |
| `payment_intent.canceled` | Update reservation status |
| `charge.succeeded` | Log, update charge IDs |
| `charge.refunded` | Update refund fields |
| `account.updated` | Update operator Connect status fields |
| `transfer.created` | Update transfer tracking |
| `transfer.failed` | Alert admin, retry logic |

---

## Edge Function: Stripe Webhook Handler

```typescript
// supabase/functions/stripe-webhook/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()

  // Verify webhook signature
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Check idempotency - skip if already processed
  const { data: existing } = await supabase
    .from('payment_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single()

  if (existing) {
    return new Response(JSON.stringify({ received: true, skipped: true }))
  }

  // Log the event
  const { error: insertError } = await supabase
    .from('payment_events')
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      raw_payload: event,
    })

  if (insertError) {
    console.error('Failed to log event:', insertError)
  }

  // Handle specific event types
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object)
        break
      case 'account.updated':
        await handleAccountUpdated(event.data.object)
        break
      // ... other handlers
    }

    // Mark as processed
    await supabase
      .from('payment_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id)

  } catch (err) {
    // Log error but return 200 to prevent Stripe retry storm
    await supabase
      .from('payment_events')
      .update({ processing_error: err.message })
      .eq('stripe_event_id', event.id)
  }

  return new Response(JSON.stringify({ received: true }))
})

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const reservationId = paymentIntent.metadata.reservation_id
  if (!reservationId) return

  await supabase
    .from('reservations')
    .update({
      status: 'reserved',
      updated_at: new Date().toISOString(),
    })
    .eq('id', reservationId)

  // Check if this tips the tour over threshold
  await checkTourThreshold(reservationId)
}

async function handleAccountUpdated(account: Stripe.Account) {
  await supabase
    .from('operators')
    .update({
      stripe_charges_enabled: account.charges_enabled,
      stripe_payouts_enabled: account.payouts_enabled,
      stripe_details_submitted: account.details_submitted,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_account_id', account.id)
}
```

---

## Threshold Capture Logic

When a tour reaches its threshold, capture all held payments:

```typescript
async function captureTourPayments(tourId: string) {
  // Get all reserved reservations
  const { data: reservations } = await supabase
    .from('reservations')
    .select('id, stripe_payment_intent_id, deposit_cents, balance_cents')
    .eq('tour_id', tourId)
    .eq('status', 'reserved')

  for (const reservation of reservations) {
    try {
      // Capture the payment
      const paymentIntent = await stripe.paymentIntents.capture(
        reservation.stripe_payment_intent_id
      )

      // Calculate platform fee (6%)
      const totalCents = reservation.deposit_cents + (reservation.balance_cents || 0)
      const platformFeeCents = Math.round(totalCents * 0.06)

      // Update reservation
      await supabase
        .from('reservations')
        .update({
          status: 'confirmed',
          deposit_charged: true,
          deposit_charged_at: new Date().toISOString(),
          stripe_deposit_charge_id: paymentIntent.latest_charge,
          platform_fee_cents: platformFeeCents,
        })
        .eq('id', reservation.id)

    } catch (err) {
      console.error(`Failed to capture ${reservation.id}:`, err)
      // Log for manual intervention
    }
  }

  // Update tour status
  await supabase
    .from('tours')
    .update({ status: 'confirmed' })
    .eq('id', tourId)
}
```

---

## Payout to Operators

After tour completion, transfer funds to operator:

```typescript
async function transferToOperator(reservationId: string) {
  const { data: reservation } = await supabase
    .from('reservations')
    .select(`
      id,
      operator_payout_cents,
      tours!inner(operator_id),
      operators!inner(stripe_account_id)
    `)
    .eq('id', reservationId)
    .single()

  // Create transfer to Connect account
  const transfer = await stripe.transfers.create({
    amount: reservation.operator_payout_cents,
    currency: 'aud',
    destination: reservation.operators.stripe_account_id,
    metadata: {
      reservation_id: reservationId,
    },
  })

  // Update reservation
  await supabase
    .from('reservations')
    .update({
      stripe_transfer_id: transfer.id,
      transferred_at: new Date().toISOString(),
    })
    .eq('id', reservationId)
}
```

---

## Security Considerations

1. **Webhook Verification** - Always verify Stripe signatures
2. **Idempotency** - Log events with unique `stripe_event_id` to prevent double-processing
3. **Service Role Only** - Webhook handler uses service role, not user JWTs
4. **Sensitive Data** - Never log full card details; Stripe handles PCI compliance
5. **RLS Policies** - Users can only see their own payment events

---

## Migration File

See: `supabase/migrations/20260124000001_stripe_integration_gaps.sql`

Adds:
- `payment_events` table
- Operator Stripe Connect status fields
- Reservation fee tracking fields
- RLS policies for payment events
- Platform fee calculation function
