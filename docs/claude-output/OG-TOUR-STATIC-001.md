# OG-TOUR-STATIC-001 — Static Base Image with Dynamic Status Overlay

## Status: Complete

## Changes

### Simplified to static base image
- `og_image_url` rendered as full-bleed 1200x630 background
- All dynamic elements removed (title, operator, pills, brand)
- Only dynamic element: centred status line at bottom

### Status text logic
- `tour.status === 'confirmed'` → "Tour confirmed" (#2e8b57)
- `current >= threshold` → "Guaranteed to run" (#2e8b57)
- `current > threshold` → "Waitlist only" (#daa520)
- `booking_deadline` is past → "Applications closed" (#6b7280)
- Default → "Commit by [D Month]" (#daa520)

### Overlay style
- Bottom bar: full width, no background, centred text
- Progress track lines on either side of text
- Font: Crimson Pro 400, 18px
- Track background: rgba(255,255,255,0.2) for visibility over images

### Supabase query
- Trimmed to: og_image_url, status, current_participant_count, threshold, booking_deadline

## File Modified
- `src/app/tours/[id]/opengraph-image.tsx`

## Verification
- TypeScript strict check: passed (zero errors)
