# Payment Flow Architecture

**Status:** PLANNED
**Last Updated:** 2026-01-24

---

## Overview

Quorum Tours uses a trust-based payment system where deposits are only required for new users and those with strikes. Payments are only collected after a tour reaches its quorum threshold.

---

## Trust Tiers

| Tier | Condition | Deposit Required |
|------|-----------|------------------|
| **New User** | 0 completed tours | Operator-set deposit |
| **Trusted** | 1+ tours, 0 strikes | None |
| **Strike 1** | 1 strike | Operator-set deposit |
| **Strike 2** | 2 strikes | 50% of tour price |
| **Suspended** | 3+ strikes | Cannot book (must appeal) |

**Strikes are permanent** - completing tours does not clear strikes.

---

## Complete Payment Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         QUORUM PAYMENT LIFECYCLE                             │
└─────────────────────────────────────────────────────────────────────────────┘

PHASE 1: COMMITMENT
───────────────────
User clicks "Join Tour"
        │
        ▼
┌─────────────────┐
│ Check Trust     │
│ Status          │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
Trusted    Deposit Required
    │              │
    │              ▼
    │      ┌─────────────────┐
    │      │ Stripe Checkout │
    │      │ (deposit only)  │
    │      └────────┬────────┘
    │               │
    ▼               ▼
┌─────────────────────────────┐
│ reservation.status =        │
│ 'reserved'                  │
│ (Waiting for quorum)        │
└─────────────────────────────┘


PHASE 2: QUORUM REACHED
───────────────────────
Tour reaches threshold
        │
        ▼
┌─────────────────┐
│ process-quorum  │
│ Edge Function   │
└────────┬────────┘
         │
         ├─► tour.status = 'payment_pending'
         ├─► Set 24-hour deadline
         ├─► Update all reservations to 'payment_pending'
         └─► Send emails to all committed users


PHASE 3: PAYMENT WINDOW (24 hours)
──────────────────────────────────

User receives email
        │
        ▼
┌─────────────────┐
│ User pays       │───► reservation.status = 'confirmed'
│ balance         │     └─► Check if tour fully paid
└─────────────────┘              │
                                 ▼
                          All paid? → tour.status = 'confirmed'

        OR

┌─────────────────┐
│ User misses     │───► reservation.status = 'abandoned'
│ deadline        │     ├─► Apply strike (+1)
└─────────────────┘     ├─► Forfeit deposit (if any)
                        │   └─► Transfer to operator (minus 3%)
                        └─► Offer spot to waitlist #1
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ Waitlist user   │
                        │ gets 24h window │
                        └────────┬────────┘
                                 │
                            (repeat cycle)


PHASE 4: TOUR COMPLETION
────────────────────────
Tour runs successfully
        │
        ▼
┌─────────────────┐
│ Transfer funds  │───► Operator receives:
│ to operator     │     tour_price - platform_fee (6%)
└─────────────────┘

User's tours_completed += 1
(If first tour: Now "Trusted" status)
```

---

## Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `create-checkout` | User commits to tour | Create Stripe checkout for deposit (if required) |
| `stripe-webhook` | Stripe events | Handle payment confirmations, Connect updates |
| `process-quorum` | Threshold reached | Send emails, set payment window |
| `process-payment-timeout` | Cron / deadline | Apply strikes, forfeit deposits, notify waitlist |
| `stripe-connect-onboard` | Operator signup | Create Connect account, return onboarding link |

---

## Database Functions

| Function | Purpose |
|----------|---------|
| `calculate_required_deposit(user_id, tour_id)` | Returns deposit amount based on trust tier |
| `get_user_trust_status(user_id)` | Returns trust tier and booking eligibility |
| `apply_payment_timeout_strike(user_id, reservation_id)` | Increment strikes, log to history |
| `calculate_forfeit_payout(deposit_cents)` | Calculate operator payout (97%) |

---

## Deposit Forfeiture

When a user misses the 24-hour payment window:

1. **Deposit marked as forfeited** in reservation
2. **Strike applied** to user profile
3. **Payout to operator**: deposit × 97% (platform keeps 3%)
4. **Stripe Transfer** created to operator's Connect account
5. **Email sent** notifying user of strike

**Commission rates:**
- Regular booking: 6% platform fee
- Forfeited deposit: 3% platform fee

---

## Waitlist Cascade

When a spot opens (user misses deadline):

1. Query `waitlist` table for tour, ordered by `position`
2. Get first entry
3. Create `reservation` with status `payment_pending`
4. Set 24-hour `payment_due_at`
5. Delete from `waitlist`
6. Send email with payment link

This repeats until:
- A waitlist user pays, OR
- Waitlist is empty

---

## Cron Jobs Required

| Schedule | Function | Purpose |
|----------|----------|---------|
| Every 5 minutes | `process-payment-timeout` | Check for expired payment windows |
| Daily | Threshold reminder | Remind users of upcoming tour deadlines |
| Daily | Strike report | Admin report of new strikes |

---

## Stripe Configuration

### Required Environment Variables

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
SITE_URL=https://quorumtours.com
```

### Webhook Events to Configure

Register webhook endpoint: `https://<project>.supabase.co/functions/v1/stripe-webhook`

Events to subscribe:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `account.updated`
- `transfer.created`

### Connect Settings

- **Account type**: Express
- **Country**: Australia
- **Capabilities**: Card payments, Transfers

---

## Migration Files

| Migration | Description |
|-----------|-------------|
| `20260124000001_stripe_integration_gaps.sql` | Payment events, operator Stripe fields |
| `20260124000004_strike_system.sql` | Strikes, trust tier functions, forfeit tracking |

---

## Security Considerations

1. **Webhook verification** - Always verify Stripe signatures
2. **Idempotency** - Check `payment_events` before processing
3. **Service role only** - Edge Functions use service role key
4. **User validation** - Verify user owns reservation before payment
5. **Operator validation** - Verify user is operator admin for Connect

---

## Frontend Integration

### Commit to Tour (with deposit)

```typescript
const { data } = await supabase.functions.invoke('create-checkout', {
  body: { tour_id: tourId, payment_type: 'deposit' }
})

if (data.no_payment_required) {
  // Trusted user - redirect to success
} else {
  // Redirect to Stripe Checkout
  window.location.href = data.checkout_url
}
```

### Pay Balance (after quorum)

```typescript
const { data } = await supabase.functions.invoke('create-checkout', {
  body: { tour_id: tourId, payment_type: 'balance' }
})

window.location.href = data.checkout_url
```

### Check Trust Status

```typescript
const { data } = await supabase.rpc('get_user_trust_status', {
  p_user_id: userId
})

// data = { trust_tier: 'trusted', strikes: 0, can_book: true, ... }
```
