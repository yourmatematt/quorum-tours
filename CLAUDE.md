# CLAUDE.md — Quorum Tours

Birding tour marketplace where tours confirm via quorum (minimum participants). Connects operators with birders through a trust-based booking system.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run typecheck    # TypeScript strict check (tsc --noEmit)
npm run lint         # ESLint
```

Supabase (edge functions, migrations):
```bash
supabase start                    # Local Supabase
supabase functions serve          # Local edge functions
supabase db push                  # Push migrations to remote
supabase secrets set KEY=value    # Set edge function secrets
```

## Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5.3 (strict mode)
- **Styling:** Tailwind CSS 3.4 + CSS custom properties (`src/styles/tokens.css`)
- **Backend:** Supabase (Postgres, Auth, Edge Functions, Realtime)
- **Payments:** Stripe (Connect for operators, Checkout for users)
- **Icons:** Lucide React
- **Dates:** date-fns
- **Path alias:** `@/*` maps to `./src/*`

## Directory Structure

```
src/
  app/                  # Next.js App Router pages
    admin/              # Business admin dashboard
    api/                # API routes (checkout, webhooks, cron, operator apps)
    for-operators/      # Operator marketing/info page
    how-it-works/       # How it works page
    operator/           # Operator dashboard (tours, bookings, earnings, profile)
    operators/[id]/     # Public operator profiles
    profile/            # User profile
    tours/              # Tours listing + [id] detail
    login/ signup/      # Auth pages
  components/           # React components (mirrored by feature area)
  styles/tokens.css     # Design tokens (colors, spacing, typography, radius)
supabase/
  functions/            # Edge functions (Deno)
    create-checkout/    # Stripe checkout session creation
    stripe-webhook/     # Stripe event handler
    process-quorum/     # Quorum threshold processing
    send-email/         # Resend email templates (14 templates in templates/)
    stripe-connect-onboard/
    process-payment-timeout/
    process-failed-tours/
    send-tour-reminders/
  migrations/           # Postgres migrations
```

## Environment Variables

Copy `.env.example` to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase public key
SUPABASE_SERVICE_ROLE_KEY=       # Server-side only, never expose to client
```

Edge function secrets (set via `supabase secrets set`):
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
EMAIL_FROM=tours@quorumtours.com
SITE_URL=http://localhost:4000
```

## Design System

All styling uses design tokens from `src/styles/tokens.css`. Never hardcode colors, spacing, or typography values.

- **Colors:** `var(--color-*)` — biophilic green palette, ink/surface/primary/accent
- **Spacing:** `var(--space-*)`
- **Typography:** `var(--text-*)` with clamp() for fluid sizing
- **Fonts:** Crimson Pro (headings), Atkinson Hyperlegible (body)
- **Radius:** `var(--radius-*)`

## Key Business Rules

- **Quorum model:** Tours confirm only when enough participants commit
- **Trust tiers:** New (deposit required) → Trusted (no deposit) → Strike 1/2 → Suspended
- **Payment flow:** Commit → quorum reached → 24h to pay balance → miss = strike
- **Commission:** 6% platform fee (3% on forfeited deposits)
- **Strikes:** Permanent, removable only via support appeal

## Code Style

- `'use client'` only where needed (interactive components)
- Prefer server components by default
- No LLM-speak in UI copy (no "seamless", "unlock", "journey", etc.)
- No generic SaaS template patterns (4-icon grids, fake testimonials)
- No dark patterns, fake urgency, or marketing hype
- Clarity over persuasion — trust is the conversion surface

## Current State

- **Phase 1 (Public Discovery):** Complete — Home, Tours, Tour Detail, Operator profiles
- **Phase 2 (Account & Intent):** Complete — Auth, User Profile, Operator Dashboard
- **Phase 4 (Trust System & Emails):** In progress
  - Stripe integration complete (Connect + Checkout + Webhooks)
  - 14 email templates built (Resend)
  - Trust/strike system migrated
  - Operator application flow in progress (uncommitted changes)
