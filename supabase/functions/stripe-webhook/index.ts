// =============================================================================
// Edge Function: Stripe Webhook Handler
// Handles all incoming Stripe webhook events
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.14.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
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
      console.error('Webhook signature verification failed:', err.message)
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    // Check idempotency - skip if already processed
    const { data: existing } = await supabaseAdmin
      .from('payment_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .single()

    if (existing) {
      return new Response(JSON.stringify({ received: true, skipped: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Log the event
    await supabaseAdmin.from('payment_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      raw_payload: event,
    })

    // Handle specific event types
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
          break

        case 'payment_intent.succeeded':
          await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
          break

        case 'payment_intent.payment_failed':
          await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
          break

        case 'account.updated':
          await handleConnectAccountUpdated(event.data.object as Stripe.Account)
          break

        case 'transfer.created':
          await handleTransferCreated(event.data.object as Stripe.Transfer)
          break

        default:
          console.log(`Unhandled event type: ${event.type}`)
      }

      // Mark as processed
      await supabaseAdmin
        .from('payment_events')
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq('stripe_event_id', event.id)

    } catch (err) {
      console.error('Error processing webhook:', err)
      await supabaseAdmin
        .from('payment_events')
        .update({ processing_error: err.message })
        .eq('stripe_event_id', event.id)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Webhook handler error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// =============================================================================
// Event Handlers
// =============================================================================

/**
 * Handle completed checkout session
 * This is for deposit payments when user commits to a tour
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const reservationId = session.metadata?.reservation_id
  const paymentType = session.metadata?.payment_type // 'deposit' or 'balance'

  if (!reservationId) {
    console.log('No reservation_id in session metadata')
    return
  }

  if (paymentType === 'deposit') {
    // Deposit payment completed
    await supabaseAdmin
      .from('reservations')
      .update({
        deposit_charged: true,
        deposit_charged_at: new Date().toISOString(),
        stripe_deposit_charge_id: session.payment_intent as string,
        status: 'reserved',
        updated_at: new Date().toISOString(),
      })
      .eq('id', reservationId)

    // Link payment event to reservation
    await supabaseAdmin
      .from('payment_events')
      .update({ reservation_id: reservationId })
      .eq('stripe_event_id', session.id)

  } else if (paymentType === 'balance') {
    // Full/balance payment completed (after quorum)
    await supabaseAdmin
      .from('reservations')
      .update({
        balance_paid_at: new Date().toISOString(),
        stripe_balance_charge_id: session.payment_intent as string,
        status: 'confirmed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', reservationId)

    // Check if all reservations for this tour are now confirmed
    const { data: reservation } = await supabaseAdmin
      .from('reservations')
      .select('tour_id')
      .eq('id', reservationId)
      .single()

    if (reservation) {
      await checkTourFullyPaid(reservation.tour_id)
    }
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const reservationId = paymentIntent.metadata?.reservation_id
  if (!reservationId) return

  await supabaseAdmin
    .from('payment_events')
    .update({
      reservation_id: reservationId,
      amount_cents: paymentIntent.amount,
      status: 'succeeded'
    })
    .eq('raw_payload->id', paymentIntent.id)
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const reservationId = paymentIntent.metadata?.reservation_id
  if (!reservationId) return

  // Log the failure
  await supabaseAdmin
    .from('payment_events')
    .update({
      reservation_id: reservationId,
      status: 'failed',
      processing_error: paymentIntent.last_payment_error?.message
    })
    .eq('raw_payload->id', paymentIntent.id)

  // TODO: Send email notification about failed payment
}

/**
 * Handle Connect account status updates
 */
async function handleConnectAccountUpdated(account: Stripe.Account) {
  await supabaseAdmin
    .from('operators')
    .update({
      stripe_charges_enabled: account.charges_enabled,
      stripe_payouts_enabled: account.payouts_enabled,
      stripe_details_submitted: account.details_submitted,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_account_id', account.id)
}

/**
 * Handle transfer created (payout to operator)
 */
async function handleTransferCreated(transfer: Stripe.Transfer) {
  const reservationId = transfer.metadata?.reservation_id
  if (!reservationId) return

  await supabaseAdmin
    .from('reservations')
    .update({
      stripe_transfer_id: transfer.id,
      transferred_at: new Date().toISOString(),
    })
    .eq('id', reservationId)
}

/**
 * Check if all reservations for a tour are paid, update tour status
 */
async function checkTourFullyPaid(tourId: string) {
  // Get count of payment_pending reservations
  const { count } = await supabaseAdmin
    .from('reservations')
    .select('*', { count: 'exact', head: true })
    .eq('tour_id', tourId)
    .eq('status', 'payment_pending')

  if (count === 0) {
    // All reservations are confirmed, update tour status
    await supabaseAdmin
      .from('tours')
      .update({
        status: 'confirmed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', tourId)
  }
}
