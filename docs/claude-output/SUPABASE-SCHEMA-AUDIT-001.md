# SUPABASE-SCHEMA-AUDIT-001: Database Schema Build

**Status:** COMPLETED  
**Date:** 2026-01-21  
**Project:** xvfevfvqqlonzoxbehrc (Quorum Tours)  
**Region:** ap-southeast-2 (Sydney)

---

## Executive Summary

Built complete Supabase database schema from scratch, aligned with frontend requirements. Applied 10 migrations creating 22 tables, 13 custom types, comprehensive RLS policies, and business logic functions. Incorporated fixes for 3 critical gaps identified in schema audit.

---

## Gap Analysis (Pre-Build)

### Critical Gaps Fixed

| Gap | Issue | Resolution |
|-----|-------|------------|
| **tours.location** | Frontend requires `location` string (e.g., "Werribee, VIC") but original schema only had operator.base_location | Added `location TEXT NOT NULL` to tours table |
| **tours.region_id** | Frontend filters by region but no relationship existed | Added `region_id UUID REFERENCES regions(id)` with regions lookup table |
| **profiles.stripe_customer_id** | Required for Stripe payments but missing | Added `stripe_customer_id TEXT UNIQUE` to profiles |

### Redundancies Removed

| Item | Reason |
|------|--------|
| `guides` table | Superseded by operators system - not created |
| `guide_ratings` table | Superseded by reviews system - not created |
| `tours.target_species TEXT[]` | Redundant with tour_species junction - not created |
| `badges` / `user_badges` | Gamification contrary to design principles - not created |
| `referrals` table | Deferred - not core to Phase 1-2 frontend |

### Status Terminology Alignment

| Frontend | Schema Enum |
|----------|-------------|
| "forming" | `forming` |
| "confirmed" | `confirmed` |
| "not-running" | `cancelled` |

Reservation status includes new `interest` value for Express Interest flow (forming tours, no payment).

---

## Schema Structure

### Migrations Applied (10)

1. `create_custom_types` - Enums and types
2. `create_profiles_table` - User profiles with Stripe customer ID
3. `create_operators_tables` - Operators, members, credentials, media, regions
4. `create_tours_reservations` - Tours (with location/region), reservations, species
5. `create_reviews_messages` - Reviews, messages, notifications, waitlist
6. `create_admin_platform_tables` - Strike history, audit log, alerts, metrics
7. `create_helper_functions` - RLS helpers, update triggers
8. `create_rls_policies_core` - Policies for profiles, operators
9. `create_rls_policies_tours` - Policies for tours, reservations, reviews
10. `create_rls_policies_remaining` - Policies for notifications, admin tables
11. `create_business_logic_functions` - Threshold checking, stats updates
12. `seed_regions` - Australian states/territories

### Tables Created (22)

**Core:**
- `profiles` - User data (extended auth.users)
- `profile_private` - Sensitive user data (admin-only)

**Operators:**
- `operators` - Business entities
- `operator_members` - Multi-user access
- `operator_credentials` - Licenses/permits
- `operator_media` - Photo/video gallery
- `regions` - Australian states/territories
- `operator_regions` - Service area mapping

**Tours:**
- `tours` - Tour listings with quorum mechanics
- `reservations` - Bookings/commitments
- `species` - Bird taxonomy
- `tour_species` - Target species per tour
- `user_chase_list` - User wishlists

**Engagement:**
- `reviews` - Verified reviews
- `messages` - Platform messaging
- `notification_preferences` - User preferences
- `notification_log` - Sent notifications
- `email_log` - Email tracking
- `waitlist` - Full tour queuing

**Platform:**
- `strike_history` - User reliability tracking
- `fieldcraft_results` - Quiz results
- `admin_audit_log` - Admin actions
- `alerts` - Admin notifications
- `platform_metrics` - Daily aggregates
- `platform_settings` - Config values

---

## Frontend Data Mapping

### Home Page
- Featured tours → `tours` table (filter by status, order by date)
- Stats → `platform_metrics` or COUNT queries

### Tours Index
- Tour listings → `tours` with `region_id` join
- Filters: region (`tours.region_id`), status, type, price
- Participant count → `get_tour_participant_count(tour_id)` function
- Progress → `currentParticipants / threshold`

### Tour Detail
- Tour info → `tours`
- Operator → `operators` via `operator_id`
- Target species → `tour_species` + `species`
- Reviews → `reviews` via `tour_id`
- Itinerary → `tours.itinerary` JSONB

### Operators Index
- Operator listings → `operators` where `is_active = TRUE`
- Filters: region (via `operator_regions`), specialties
- Ratings → `operators.rating_avg`, `rating_count`

### Operator Profile
- Details → `operators`
- Team → `operator_members` + `profiles`
- Media → `operator_media`
- Tours → `tours` via `operator_id`
- Reviews → `reviews` via `operator_id`

### User Profile
- Profile data → `profiles`
- Active commitments → `reservations` where status IN ('interest', 'reserved', 'payment_pending', 'confirmed')
- Past tours → `reservations` where status IN ('completed', 'cancelled', 'refunded')
- Private data → `profile_private`

### Join Tour Flow
- Express Interest → INSERT `reservations` with `status = 'interest'`
- Join Confirmed → INSERT `reservations` with `status = 'reserved'`
- Payment → Update `stripe_payment_intent_id`, `deposit_held`, etc.

### Auth (Login/Signup)
- Auth → Supabase Auth (auth.users)
- Profile creation → Automatic via `handle_new_user()` trigger
- Private data → `profile_private` on demand

---

## RLS Policy Summary

| Table | Anon Read | Auth Read | Auth Write | Admin |
|-------|-----------|-----------|------------|-------|
| profiles | Public only | Own + public | Own | Full |
| profile_private | ❌ | Own | Own | Full |
| operators | Active only | Active only | Operator admin | Full |
| tours | ✓ | ✓ | Operator admin | Full |
| reservations | ❌ | Own + operator | Own | Full |
| reviews | Not hidden | Not hidden | Own | Full |
| messages | ❌ | Sender + recipient | Sender | Full |
| species | ✓ | ✓ | ❌ | Full |

---

## Stripe Integration Readiness

### Customer Side (profiles)
- `stripe_customer_id` - Stripe customer ID for this user
- Created on first payment via API

### Operator Side (operators)
- `stripe_account_id` - Stripe Connect account
- `stripe_onboarding_complete` - Onboarding status
- `stripe_charges_enabled` - Can receive charges
- `stripe_payouts_enabled` - Can receive payouts
- `stripe_requirements_due` - Outstanding requirements
- `stripe_connected_at` - Connection timestamp

### Payment Side (reservations)
- `stripe_payment_intent_id` - Payment intent for this booking
- `stripe_setup_intent_id` - For card hold (auth without capture)
- `stripe_payment_method_id` - Saved payment method
- `deposit_held` - Card authorized but not captured
- `deposit_charged` - Deposit captured
- Timestamps for all payment events

### Integration Flow
1. User signs up → profile created (no Stripe customer yet)
2. User joins confirmed tour → create Stripe customer, save ID
3. Collect card → create SetupIntent, save payment method
4. Tour runs → capture deposit via PaymentIntent
5. Operator payout → transfer to Connect account

---

## Business Logic Functions

| Function | Purpose |
|----------|---------|
| `get_tour_participant_count(tour_id)` | Returns current participant count for frontend display |
| `user_requires_deposit(user_id)` | Check if first-time or flagged user |
| `apply_strike(user_id, ...)` | Apply strike and update flag status |
| `check_tour_threshold()` | Trigger: update tour status when threshold met |
| `update_operator_stats()` | Trigger: recalc operator rating on review |
| `get_next_waitlist_position(tour_id)` | Get next waitlist number |
| `handle_new_user()` | Trigger: create profile on signup |

---

## Indexes

Performance indexes created for:
- Tour filtering: `slug`, `status`, `operator_id`, `region_id`, `dates`, `location`
- Reservation queries: `tour_id`, `user_id`, `status`, `stripe_payment_intent_id`
- Operator lookups: `slug`, `is_active`, `stripe_account_id`
- Review aggregation: `operator_id`, `tour_id`, `rating`
- Message inbox: `recipient_operator_id` (unread filter)

---

## Seeded Data

### Regions (8 records)
- vic (Victoria)
- nsw (New South Wales)
- qld (Queensland)
- wa (Western Australia)
- sa (South Australia)
- tas (Tasmania)
- nt (Northern Territory)
- act (Australian Capital Territory)

---

## Next Steps

1. **Seed Species** - Import Australian bird taxonomy (~900 species)
2. **Create Test Operators** - Sample operators for development
3. **Create Test Tours** - Sample tours matching frontend mock data
4. **Configure Stripe Webhook** - Set up webhook endpoint for payment events
5. **Wire Frontend** - Replace mock data with Supabase queries

---

## Migration Files Reference

All migrations stored in Supabase migration history. To regenerate:
```bash
supabase db dump -f supabase/schema.sql
```

---

**AUDIT STATUS:** COMPLETED  
**SCHEMA VERSION:** 1.0.0  
**TABLES:** 22  
**POLICIES:** 45+  
**FUNCTIONS:** 12
