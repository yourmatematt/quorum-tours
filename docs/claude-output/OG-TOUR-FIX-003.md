# OG-TOUR-FIX-003 — Tour OG Targeted Fixes

## Status: Complete

## Fixes Applied

### 1. Label
- Replaced static "TOUR" with `tour.title.toUpperCase()` as small caps eyebrow
- Styled: 13px, letterSpacing 0.08em, #a0c8a8

### 2. Date Fix
- Dates now parsed with UTC suffix (`+ 'T00:00:00Z'`) to prevent timezone offset shifting dates back one day
- `toLocaleDateString` uses `timeZone: 'UTC'`

### 3. Duration Fix
- Duration calculation now adds +1 for inclusive day count (Fri–Sun = 3 days, not 2)

### 4. Operator Avatar
- 52x52px circle, renders logo_url as `<img>` with borderRadius 50%, objectFit cover
- Falls back to initials circle (#2e8b57 bg, white text) if logo_url is null

## File Modified
- `src/app/tours/[id]/opengraph-image.tsx`

## Verification
- TypeScript strict check: passed (zero errors)
