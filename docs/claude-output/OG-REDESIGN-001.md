# OG-REDESIGN-001 — OG Image Rebuild

## Status: Complete

## Changes Made

### Part 1 — Font Fix (`src/lib/og-utils.tsx`)
- `loadFont()` now fetches Crimson Pro at both weight 400 and weight 700 in parallel
- Returns `{ font400, font700 }` instead of a single ArrayBuffer
- All 12 OG image routes updated to destructure both weights and register both in the `fonts` array

### Part 2 — Tour OG Redesign (`src/app/tours/[id]/opengraph-image.tsx`)
- Full rebuild: dark background (#1a3320), two-column layout (60/40 split)
- Left column: Q logo mark + wordmark, tour title (Crimson Pro 400, #f0fff4), operator avatar + name/location, date/duration/location pills, progress bar with "Commit by" deadline
- Right column: `og_image_url` image with left-fading gradient overlay
- Supabase query updated: added `og_image_url`, `booking_deadline`; removed `price_cents`, `highlights`, `capacity`
- Price and highlights completely removed from display

### Part 3 — Operator OG Updates (`src/app/operators/[id]/opengraph-image.tsx`)
- Background changed from `#ffffff` to `#f0fff4`
- Founding operator badge: background `#fef3c7`, text/icon colour `#92650a` (was `#DAA520`)
- Font fix applied (both weights)

## Files Modified
- `src/lib/og-utils.tsx`
- `src/app/tours/[id]/opengraph-image.tsx`
- `src/app/operators/[id]/opengraph-image.tsx`
- `src/app/apply/opengraph-image.tsx`
- `src/app/privacy/opengraph-image.tsx`
- `src/app/tours/opengraph-image.tsx`
- `src/app/terms/opengraph-image.tsx`
- `src/app/operators/opengraph-image.tsx`
- `src/app/signup/opengraph-image.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/login/opengraph-image.tsx`
- `src/app/how-it-works/opengraph-image.tsx`
- `src/app/for-operators/opengraph-image.tsx`

## Verification
- TypeScript strict check: passed (zero errors)
