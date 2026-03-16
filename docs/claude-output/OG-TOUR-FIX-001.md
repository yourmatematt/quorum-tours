# OG-TOUR-FIX-001 — Tour OG Image Corrections

## Status: Complete

## Corrections Applied

### 1. Logo Mark
- Changed from 22px badge to 52px rounded square (border-radius 10px), #2e8b57 bg, white Q at 28px bold
- Wordmark changed from "QUORUM TOURS" to "quorumtours.com" in #a0c8a8, 22px

### 2. Headline Size
- Increased from 36px to 72px, Crimson Pro weight 400, #f0fff4, line-height 1.1

### 3. Operator Row
- Renders operator's actual profile photo (logo_url) as 60x60 circular image
- Falls back to initials circle if logo_url is null
- Operator name displayed at 24px, #f0fff4

### 4. Right Column Photo
- Removed left-fading gradient overlay entirely
- Photo now sits in rounded rectangle container (border-radius 16px, overflow hidden)
- Container occupies ~42% width with proper margins

### 5. Bottom Bar — Commit By
- "Commit by" text now centred across full card width
- Progress track line split on either side: left line | text | right line
- All elements in amber #daa520

### 6. Supabase Query
- Added `logo_url` to the operator join select

## File Modified
- `src/app/tours/[id]/opengraph-image.tsx`

## Verification
- TypeScript strict check: passed (zero errors)
