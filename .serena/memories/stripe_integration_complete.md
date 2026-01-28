# Stripe Integration Architecture

## Status: BACKEND COMPLETE

All database and Edge Function work is done. Frontend integration pending.

---

## Database Layer

### Tables Modified
- `operators` - Added `stripe_account_id`, `stripe_onboarding_complete`, timestamps
- `reservations` - Added payment tracking, forfeit fields, Stripe IDs
- `profiles` - Added `strikes` column (permanent, accumulative)

### Key Functions
```sql
calculate_required_deposit(user_id, tour_id) → INTEGER (cents, -1 if blocked)
get_user_trust_status(user_id) → JSON (tier, strikes, can_book)
apply_payment_timeout_strike(user_id, reservation_id) → new_strike_count
calculate_forfeit_payout(deposit_cents) → INTEGER (97% of deposit)
```

### Views
- `user_booking_eligibility` - Quick frontend lookup for trust tier

---

## Edge Functions

### stripe-webhook
- Verifies Stripe signatures
- Logs to `payment_events` for idempotency
- Handles: checkout.session.completed, payment_intent.*, account.updated, transfer.created

### create-checkout
- Checks user trust status via RPC
- Calculates deposit requirement
- Creates Stripe Checkout Session
- Returns `no_payment_required: true` for trusted users

### process-quorum
- Called when tour reaches threshold
- Updates tour status to `payment_pending`
- Sets 24h deadline on all reservations
- Logs email sends (actual sending pending)

### process-payment-timeout
- Can process single reservation, tour, or all expired (cron mode)
- Marks reservation as `abandoned`
- Applies strike via RPC
- Transfers forfeited deposit to operator (97%)
- Offers spot to next waitlist user

### stripe-connect-onboard
- Creates Express Connect account
- Returns onboarding link
- Saves account ID to operator record

---

## Frontend Integration Points

```typescript
// Commit to tour (with deposit check)
const { data } = await supabase.functions.invoke('create-checkout', {
  body: { tour_id, payment_type: 'deposit' }
})

// Trusted user path
if (data.no_payment_required) redirect('/success')
// Deposit required path
else window.location.href = data.checkout_url

// Check trust status
const { data } = await supabase.rpc('get_user_trust_status', { p_user_id })
// Returns: { trust_tier, strikes, can_book, tours_completed }
```

---

## Cron Jobs Needed

| Schedule | Function | Purpose |
|----------|----------|---------|
| Every 5 min | process-payment-timeout | Check expired windows |
| Every hour | (new) | 12h payment reminders |
| Daily 9am | (new) | 48h tour reminders |

---

## Testing Commands

```bash
# Start Stripe listener
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook

# Test checkout
curl -X POST http://localhost:54321/functions/v1/create-checkout \
  -H "Authorization: Bearer <user_jwt>" \
  -H "Content-Type: application/json" \
  -d '{"tour_id": "...", "payment_type": "deposit"}'
```
