# Quorum Tours — Project Status Report

**Date:** 7 March 2026
**Branch:** `master`
**Stack:** Next.js 14.2 / TypeScript / Tailwind / Supabase / Stripe / Resend

---

## Executive Summary

Quorum Tours is a birding tour marketplace where tours confirm via quorum (minimum participants). The platform connects operators with birders through a trust-based booking system with species-driven search, eBird integration, and a deposit/strike trust model.

**The platform is not yet ready for a public social media launch.** Core build phases are complete, but several operational and testing gaps remain before announcing "we're live." Below is a phase-by-phase breakdown and a clear list of what's blocking launch.

---

## Build Phases

### Phase 1: Public Discovery — COMPLETE

All public-facing discovery pages are built and functional.

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Done — hero, featured tours (Supabase-powered), value props |
| Tours Listing | `/tours` | Done — filterable tour cards with quorum progress |
| Tour Detail | `/tours/[id]` | Done — itinerary, operator info, commitment sidebar, personalized deposit |
| Operators Listing | `/operators` | Done — operator cards with letter avatars |
| Operator Profile | `/operators/[id]` | Done — bio, specialties, tour listings, reviews |
| How It Works | `/how-it-works` | Done — quorum mechanics, trust system explainer |
| For Operators | `/for-operators` | Done — operator value prop, trust transparency, CTA to apply |
| Terms / Privacy | `/terms`, `/privacy` | Done |

### Phase 2: Account & Intent — COMPLETE

Authentication, user profiles, and the commit-to-tour flow are built.

| Page | Route | Status |
|------|-------|--------|
| Login | `/login` | Done — email/password + OAuth + magic link |
| Signup | `/signup` | Done — registration with auto-profile creation |
| User Profile | `/profile` | Done — dashboard layout, trust status, committed tours, chase list, past tours |
| Join Tour | `/tours/[id]/join` | Done — personalized deposit, trust tier context, sticky sidebar |
| Join Success | `/tours/[id]/join/success` | Done |
| Payment | `/tours/[id]/join/payment` | Done |
| Strike Appeal | `/profile/appeal` | Done |

**Key features in this phase:**
- Chase list with eBird CSV import and DB persistence (case-insensitive matching)
- EnhancedTourCard with quorum progress, payment status, fellow travelers
- Profile dashboard (no-scroll desktop, scrollable mobile)
- Trust status card showing tier, strikes, and booking eligibility

### Phase 3: Operator Dashboard — COMPLETE

Full operator management interface for tour CRUD, bookings, earnings, and Stripe onboarding.

| Page | Route | Status |
|------|-------|--------|
| Operator Dashboard | `/operator` | Done — overview with key metrics |
| Tour Management | `/operator/tours` | Done — list/manage tours |
| Create Tour | `/operator/tours/create` | Done — multi-step tour creation |
| Bookings | `/operator/bookings` | Done — booking list with trust badges |
| Earnings | `/operator/earnings` | Done — payout tracking |
| Operator Profile Edit | `/operator/profile` | Done |
| Help | `/operator/help` | Done |

### Phase 4: Trust System, Payments & Email — COMPLETE

The deepest phase. Stripe integration, trust/strike system, email lifecycle, and operator applications are all built.

#### 4A. Stripe Integration — Backend Complete

| Component | Status |
|-----------|--------|
| Stripe Connect (operator onboarding) | Done — Express accounts, onboarding links |
| Stripe Checkout (user payments) | Done — deposit calculation, trusted-user bypass |
| Stripe Webhooks | Done — checkout.session.completed, payment_intent.*, account.updated, transfer.created |
| Payment timeout processing | Done — strikes, forfeit payouts (97% to operator) |
| Quorum processing | Done — status update, 24h payment deadline, waitlist promotion |

**Edge Functions deployed (8):**
- `create-checkout` — Checkout session with trust-aware deposit
- `stripe-webhook` — Event handler with idempotency logging
- `stripe-connect-onboard` — Express Connect account creation
- `process-quorum` — Quorum threshold processing
- `process-payment-timeout` — Expired payment window handling + strikes
- `process-failed-tours` — Tours that didn't reach quorum
- `send-tour-reminders` — 48h pre-tour reminders
- `send-email` — Resend email dispatch with template registry

#### 4B. Trust & Strike System — Complete

| Feature | Status |
|---------|--------|
| Trust tiers (New / Trusted / Strike 1 / Strike 2 / Suspended) | Done |
| Deposit calculation (trust-aware) | Done — `calculate_required_deposit()` RPC |
| Trust status lookup | Done — `get_user_trust_status()` RPC + `user_booking_eligibility` view |
| Strike application | Done — `apply_payment_timeout_strike()` RPC |
| Strike history + appeals table | Done — migration applied |
| Appeal submission UI | Done — `/profile/appeal` |
| Admin appeals management | Done — `/admin/appeals` |
| Trust UI across all pages | Done — tour detail, join flow, profile, operator bookings |

#### 4C. Email Templates — Complete (14 templates)

**User emails (9):** welcome, tour-committed, quorum-reached, payment-reminder, payment-confirmed, strike-applied, waitlist-spot, tour-cancelled, tour-reminder

**Operator emails (5):** new-booking, quorum-reached-operator, deposit-forfeited, tour-confirmed, payout-sent

All templates use a shared `_base.ts` layout. Deployed via Resend.

#### 4D. Operator Application Flow — Complete

| Feature | Status |
|---------|--------|
| Application form | Done — `/apply` |
| Application status page | Done — `/apply/status` |
| Admin review dashboard | Done — `/admin/operators` + `/admin/operators/[id]` |
| Resubmission after info request | Done |
| 6 application lifecycle emails | Done |
| End-to-end reachability | Verified — Footer > For Operators > Apply > Status |

### Phase 5: Admin Dashboard — COMPLETE

| Page | Route | Status |
|------|-------|--------|
| Admin Overview | `/admin` | Done |
| Tour Oversight | `/admin/tours` | Done — featured tour toggle (star icon) |
| Operator Management | `/admin/operators` | Done — application review pipeline |
| User Management | `/admin/users` | Done |
| Metrics | `/admin/metrics` | Done |
| Alerts | `/admin/alerts` | Done |
| Audit Log | `/admin/audit` | Done |
| System | `/admin/system` | Done |
| Appeals | `/admin/appeals` | Done |
| Access Denied | `/access-denied` | Done |

**Admin auth gap:** Middleware detects admin subdomain and enforces login, but role-based access control is basic. A `role` column exists on profiles (migration applied), but enforcement in middleware needs verification.

---

## Database Migrations Applied (15)

All migrations are in `supabase/migrations/` and have been pushed:

1. Stripe integration gaps (payment fields, operator Stripe IDs)
2. Realtime optimization
3. RLS policy fixes
4. Strike system (strikes column, trust functions)
5. Welcome email trigger
6. Cron jobs (payment timeout, tour reminders)
7. Email log metadata
8. Reservation status enum fix
9. Auto-create profile on signup
10. Featured tours (`is_featured` column)
11. Role column on profiles
12. Operator applications table
13. Chase list table + RLS
14. Strike history and appeals tables
15. Chase list case-insensitive index

---

## What's Blocking a "We're Live" Social Media Announcement

### Critical (Must-Do Before Launch)

| Item | Detail | Effort |
|------|--------|--------|
| **End-to-end payment testing** | Full Stripe test-mode flow: commit > deposit > quorum reached > balance payment > payout to operator. Has not been tested end-to-end with real Stripe test data. | Medium |
| **Real tour data** | All tour data is currently mock/placeholder. Need at least 3-5 real tours from real operators before launching. | Operational |
| **Real operator profiles** | Operator `specialties` arrays are empty. Operators need to populate their profiles, bios, and photos. | Operational |
| **Images** | Most tour and hero images are missing. Components have graceful fallbacks, but a launch with placeholder/missing images undermines trust. Needed: `home-hero.jpg` (done), `how-it-works-hero.jpg`, 8 tour images, operator photos. | Content |
| **Admin role enforcement** | Verify middleware properly restricts `/admin` routes to users with `role = 'admin'`. Migration exists but enforcement needs testing. | Small |
| **DNS + deployment** | Production deployment on Vercel (or equivalent), custom domain, SSL. Edge functions deployed to production Supabase. | Operational |
| **Resend domain verification** | `tours@quorumtours.com` needs domain verification in Resend for emails to actually send. | Small |
| **Cron job activation** | Payment timeout (every 5 min), tour reminders (daily 9am) — need to be enabled in production Supabase. | Small |

### Important (Should-Do Before Launch)

| Item | Detail | Effort |
|------|--------|--------|
| **Visual QA pass** | Full page-by-page check across desktop (1280px) and mobile (375px). Some pages haven't been visually verified since early builds. | Medium |
| **Chase list match notifications** | Edge function to notify users when a new tour matches species on their chase list. Hook exists, notification trigger doesn't. | Medium |
| **SEO metadata** | Page titles, descriptions, Open Graph tags for social sharing. Critical for the social media launch to look professional when links are shared. | Small-Medium |
| **Error/loading states** | Some pages may not gracefully handle network errors or empty database states in production. | Small |
| **Rate limiting** | API routes (operator applications, etc.) should have basic rate limiting before public exposure. | Small |

### Nice-to-Have (Post-Launch)

| Item | Detail |
|------|--------|
| Tour discussion boards | Designed but not built — threaded Q&A for committed participants |
| Reengagement emails | 30d/90d/180d/365d inactive user emails |
| Email marketing welcome series | Day 1/3/7 onboarding sequence designed but not automated |
| eBird API integration | Currently CSV import only; API-based sync would be smoother |
| Realtime updates | Tour pages could use Supabase Realtime for live quorum progress |

---

## Social Media Readiness

A detailed pre-launch social media strategy has been developed covering 3 channels:

| Channel | Audience | Content Pillars |
|---------|----------|----------------|
| **Facebook** | Birders 45-70 | Species stories (40%), quorum mechanics (25%), operator spotlights (20%), community (15%) |
| **LinkedIn** | Tour operators (B2B) | Quorum advantage (35%), trust economics (25%), niche tourism thought leadership (25%), success stories (15%) |
| **Instagram** | Younger birders 25-45 | Birding photography (40%), species carousels (25%), birder culture (20%), tour opportunities (15%) |

**Strategy documents exist:**
- `docs/SOCIAL-MEDIA-BRAND-KIT.md` — Colors, fonts, Canva dimensions
- `docs/FIRST-POSTS-CANVA-SPECS.md` — First 3 post specifications
- `docs/claude-output/SOCIAL-MEDIA-STRATEGY-PRELAUNCH.md` — Full 8-week strategy

**Planned timeline:** 8 weeks of brand-building content before a public launch announcement. The strategy emphasises trust-building and education over hype — no fake urgency or marketing manipulation.

**The social media strategy is ready to execute, but the platform itself needs the critical items above resolved first.**

---

## Summary Scorecard

| Area | Status | Launch-Ready? |
|------|--------|---------------|
| Frontend pages (38 routes) | Complete | Yes |
| Design system & tokens | Complete | Yes |
| Authentication & profiles | Complete | Yes |
| Trust/strike system | Complete | Yes |
| Stripe integration (backend) | Complete | Needs e2e testing |
| Email templates (14) | Complete | Needs Resend domain verification |
| Operator application flow | Complete | Yes |
| Admin dashboard | Complete | Needs role enforcement check |
| Chase list + eBird import | Complete | Yes |
| Real content (tours, operators, images) | Not started | No |
| Production deployment | Not started | No |
| Social media strategy | Planned | Ready to execute |
| Social media content | Not started | No |

**Bottom line:** The codebase is functionally complete across all planned phases. What remains is operational: real data, real images, production deployment, payment testing, and content creation. The 8-week social media strategy should begin only after the critical blockers are resolved, meaning a realistic public launch announcement is approximately 10-12 weeks out if work begins now — 2-4 weeks for operational items, then 8 weeks of pre-launch social content.
