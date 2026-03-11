# TOUR-NOT-INCLUDED-01 — Build Report

## Summary

Added a "Not Included" section to the tour detail page, displayed immediately below the existing "Included" section within the Logistics card.

## Changes

### Database
- **Column:** `not_included` (`text[]`, default `'{}'`) — already existed in the tours table
- **Seed data:** Wilderness Coast Weekender (`wilderness-coast-weekender-apr-2026`) seeded with:
  - Accommodation
  - Travel to Mallacoota
  - Travel insurance
  - Meals not specified in the itinerary
- **Migration:** `supabase/migrations/20260311000001_add_not_included_to_tours.sql`

### Frontend

1. **`src/lib/supabase/useTours.ts`** — Added `not_included: string[]` to `Tour` interface
2. **`src/components/ui/LogisticsSection.tsx`**
   - Added `not_included` icon type (horizontal dash — neutral, not alarming)
   - Detail list items prefixed with em dash and styled with `--color-ink-subtle` (muted vs the standard `--color-ink-muted` used for Included)
3. **`src/app/tours/[id]/TourDetailClient.tsx`**
   - Extended `generateLogistics()` signature to accept `not_included`
   - Added "Not Included" logistics item rendered directly after "Included"
   - Passed `not_included` from tour data to the logistics generator

### Visual treatment
- Same card/container as Included (within Logistics section)
- Dash icon (—) instead of checkmark
- Muted text color (`--color-ink-subtle`) for list items
- Em dash prefix on each item for subtle visual distinction
- Standard, transparent presentation — not a warning

## Locations updated
- [x] Tour detail page (`/tours/[slug]`) — Logistics section
- [x] Booking confirmation email — does not list inclusions (uses "What to bring" instead), no change needed
- [x] Tour summary cards — do not list inclusions, no change needed

## Validation
- [x] Not Included section renders below Included on tour page
- [x] Four items display correctly
- [x] Visual style is clearly distinct from Included but not alarming
- [x] TypeScript compiles clean (`tsc --noEmit` passes)
