# Database Architecture Plan

**Status:** PLANNED
**Last Updated:** 2026-01-24
**Schema Version:** 2.9.0 + Migrations

---

## Executive Summary

Comprehensive review of Quorum Tours database architecture covering:
1. Gap analysis (frontend entities vs. database)
2. Stripe payment integration
3. Real-time optimization for threshold tracking
4. RLS policy security review

---

## Migrations Created

| Migration | Purpose | Status |
|-----------|---------|--------|
| `20260124000001_stripe_integration_gaps.sql` | Payment events table, operator Stripe fields, fee tracking | PLANNED |
| `20260124000002_realtime_optimization.sql` | Denormalized count, realtime publication, tour progress | PLANNED |
| `20260124000003_rls_policy_fixes.sql` | Operator access to tours/reservations | PLANNED |

---

## Section 1: Gap Analysis

### Frontend Entity Coverage

| Entity | Table Exists | Notes |
|--------|--------------|-------|
| Users/Profiles | ✅ `profiles` | Complete |
| Operators | ✅ `operators` + `operator_members` | Complete |
| Tours | ✅ `tours` | Complete |
| Reservations | ✅ `reservations` | Complete |
| Reviews | ✅ `reviews` | Complete |
| Species | ✅ `species` | Complete |
| Chase Lists | ✅ `user_chase_list` | Complete |
| Waitlist | ✅ `waitlist` | Complete |
| Notifications | ✅ `notifications` | Complete |
| Messages | ✅ `messages` | Complete |
| Guides | ✅ `guides` | Complete |
| Badges | ✅ `badges` + `user_badges` | Complete |

### Minor Gaps Identified

| Gap | Priority | Action |
|-----|----------|--------|
| Tour species likelihood | LOW | Could add `likelihood` enum to `tour_species` |
| Cancellation policies | LOW | JSON field on tours covers this |
| Operator affiliations | LOW | Could be `operator_credentials` type |

**Conclusion:** Existing schema is comprehensive. No blocking gaps.

---

## Section 2: Stripe Integration

### Added in Migration 001

| Component | Description |
|-----------|-------------|
| `payment_events` table | Webhook event log for idempotency and debugging |
| `operators.stripe_charges_enabled` | Can this Connect account accept charges? |
| `operators.stripe_payouts_enabled` | Can this Connect account receive payouts? |
| `operators.stripe_details_submitted` | Has operator completed onboarding? |
| `reservations.platform_fee_cents` | 6% commission calculated on capture |
| `reservations.operator_payout_cents` | Computed column: total - fees |
| `reservations.stripe_transfer_id` | Transfer to Connect account |
| `calculate_platform_fee()` | Helper function for 6% calculation |
| `set_platform_fee_on_charge()` | Trigger to auto-calculate on capture |

### Payment Flow

```
Birder Commits → PaymentIntent (manual capture) → Authorization Hold
                                                         ↓
                              Threshold Met → Capture PaymentIntent
                                                         ↓
                                   Tour Completes → Transfer to Operator
```

**Documentation:** `docs/claude-output/STRIPE-INTEGRATION-ARCHITECTURE.md`

---

## Section 3: Real-time Optimization

### Added in Migration 002

| Component | Description |
|-----------|-------------|
| `tours.current_participant_count` | Denormalized count for fast reads |
| `update_participant_count()` | Trigger to maintain count |
| Optimized `check_tour_threshold()` | Uses denormalized count |
| Realtime publication | `tours`, `reservations`, `payment_events` |
| `tour_progress` view | Computed progress metrics |
| `get_tour_progress()` | RPC function for progress data |
| Performance indexes | Threshold progress, operator dashboard queries |

### Performance Improvement

| Metric | Before | After |
|--------|--------|-------|
| Threshold check | COUNT query | Column read |
| UI update latency | Polling | ~50ms push |
| Database load | O(n) per check | O(1) trigger |

**Documentation:** `docs/claude-output/REALTIME-ARCHITECTURE.md`

---

## Section 4: RLS Policy Fixes

### Fixed in Migration 003

| Issue | Fix |
|-------|-----|
| Operators can't manage tours | Added operator admin policies |
| Operators can't see reservations | Added operator member SELECT |
| Inconsistent `tour_species` policy | Use `operator_members` table |
| Missing access level helpers | `can_access_tour_data()`, `get_tour_access_level()` |
| RLS performance | Added supporting indexes |

### Access Matrix (After Fixes)

| Resource | User | Operator Member | Operator Admin | Platform Admin |
|----------|------|-----------------|----------------|----------------|
| Tours (read) | ✅ | ✅ | ✅ | ✅ |
| Tours (write) | ❌ | ❌ | ✅ Own | ✅ All |
| Reservations (read) | ✅ Own | ✅ Own tours | ✅ Own tours | ✅ All |
| Reservations (write) | ✅ Own | ❌ | ❌ | ✅ All |
| Payment events | ✅ Own | ✅ Own tours | ✅ Own tours | ✅ All |

**Documentation:** `docs/claude-output/RLS-POLICY-ARCHITECTURE.md`

---

## Application Order

```bash
# Apply migrations in order
supabase migration apply 20260124000001_stripe_integration_gaps.sql
supabase migration apply 20260124000002_realtime_optimization.sql
supabase migration apply 20260124000003_rls_policy_fixes.sql

# Or run all pending
supabase db push
```

---

## Next Steps

### Immediate (Pre-Launch)

- [ ] Review migrations with Supabase team
- [ ] Test in staging environment
- [ ] Verify RLS policies with impersonation
- [ ] Test realtime subscriptions end-to-end

### Post-Launch

- [ ] Monitor `payment_events` for webhook reliability
- [ ] Track query performance on threshold checks
- [ ] Review RLS performance with pg_stat_statements
- [ ] Consider read replicas if realtime load increases

---

## Related Documentation

| Document | Location |
|----------|----------|
| Schema Export | `supabase/database-schema-export.md` |
| Stripe Architecture | `docs/claude-output/STRIPE-INTEGRATION-ARCHITECTURE.md` |
| Realtime Architecture | `docs/claude-output/REALTIME-ARCHITECTURE.md` |
| RLS Architecture | `docs/claude-output/RLS-POLICY-ARCHITECTURE.md` |
| Operator Onboarding | `docs/claude-output/OPERATOR-ONBOARDING-ARCHITECTURE.md` |
