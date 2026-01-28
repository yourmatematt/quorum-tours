# Phase 4: Current State (2026-01-24)

## Status: READY TO START

Backend payment infrastructure is complete and deployed.

---

## Completed This Session

### Migrations Created & Pushed
1. `20260124000002_realtime_optimization.sql` - Denormalized counts, realtime publication
2. `20260124000003_rls_policy_fixes.sql` - Operator access to tours/reservations
3. `20260124000004_strike_system.sql` - Trust tiers, strikes, deposit calculation

### Edge Functions Deployed
1. `stripe-webhook` - Handles all Stripe events with idempotency
2. `create-checkout` - Creates checkout sessions based on trust tier
3. `process-quorum` - Sends emails when threshold reached, sets 24h window
4. `process-payment-timeout` - Applies strikes, forfeits deposits, notifies waitlist
5. `stripe-connect-onboard` - Operator Connect account creation

### Secrets Configured
- `STRIPE_SECRET_KEY` ✓
- `STRIPE_WEBHOOK_SECRET` ✓ (from stripe listen)
- `SITE_URL=http://localhost:4000` ✓

---

## Phase 4 Plan (Next Steps)

See: `docs/claude-output/PHASE-4-TRUST-SYSTEM-AND-EMAILS.md`

### Part A: Trust System UI
Make strike/deposit system transparent across:
- How It Works page (new "Our Trust System" section)
- Tour Detail page (show deposit requirement)
- Join Tour flow (payment breakdown)
- User Profile (trust status card)
- Operator pages (deposit explanations, booking trust badges)

### Part B: Resend Email Configuration
- [ ] User needs to set: `RESEND_API_KEY`, `EMAIL_FROM`
- [ ] Create `send-email` Edge Function
- [ ] Create 14 email templates (welcome, quorum_reached, payment_reminder, etc.)
- [ ] Integrate emails into existing Edge Functions

---

## Pending Decision

User asked about email aliases before going to bed:
- For SENDING: No aliases needed (domain verified in Resend)
- For RECEIVING: Depends on whether they want replies
- Recommended: `noreply@quorumtours.com` or `tours@quorumtours.com` with reply-to

---

## Key Business Rules (Confirmed)

### Trust Tiers
| Tier | Condition | Deposit |
|------|-----------|---------|
| New User | 0 tours | Operator-set |
| Trusted | 1+ tours, 0 strikes | None |
| Strike 1 | 1 strike | Operator-set |
| Strike 2 | 2 strikes | 50% of tour |
| Suspended | 3+ strikes | Cannot book |

### Payment Flow
1. User commits to tour (deposit if required)
2. Tour reaches quorum threshold
3. All committed users get 24h to pay balance
4. Miss deadline = strike + deposit forfeited + spot to waitlist
5. Waitlist user gets 24h window (cycle repeats)

### Commission Structure
- Regular bookings: 6% platform fee
- Forfeited deposits: 3% platform fee

### Strikes
- Permanent (never clear)
- Can only be removed via support appeal
