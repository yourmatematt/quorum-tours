# OG-TOUR-FIX-004 — Fix Commit By Date Parsing

## Status: Complete

## Fix
- Moved deadline parsing out of the status conditional to avoid NaN/Invalid Date
- Uses `toLocaleDateString('en-AU', { day: 'numeric', month: 'long', timeZone: 'UTC' })` for clean formatting
- Falls back to "Commit by 31 March" if no booking_deadline exists

## File Modified
- `src/app/tours/[id]/opengraph-image.tsx`

## Verification
- TypeScript strict check: passed (zero errors)
