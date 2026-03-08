# Build Report — OPERATOR-PROFILE-HERO-MOBILE-01

**Date:** 2026-03-08

## Summary

Refined mobile hero layout to match LinkedIn iOS profile header pattern. Photo left, stacked identity content right, bio full-width below.

## Changes

### `src/components/ui/OperatorHero.tsx`

**Mobile layout (< 640px):**
- Photo: 72px diameter (was 80px)
- Name on its own line (line 1), `text-xl` on mobile
- Badges on their own line (line 2), `flex-nowrap` ensures they stay inline
- Both badges have `whitespace-nowrap` to prevent text wrapping
- Location on its own line (line 3) with `whitespace-nowrap` and `truncate` fallback
- "Guiding since" on its own line (line 4) directly below location with `mt-0.5`
- Location and guiding since are no longer in a shared flex-wrap container — each is its own row

**Desktop layout (≥ 1024px):**
- No changes — photo scales 72→128→160px, name scales xl→3xl→4xl

**Structure change:**
- Name separated from badges into its own element (was combined in a flex-wrap div)
- Badges wrapped in a conditional container with `flex-nowrap`
- Location and guiding since split into separate divs (were in a shared flex-wrap)

## Validation

- [x] Mobile hero matches two-column structure: photo left, content right
- [x] Badges render inline on one line at 375px width
- [x] Location renders on a single line (whitespace-nowrap + truncate)
- [x] "Guiding since" sits on its own line below location
- [x] Bio text sits full-width below the photo/content row
- [x] Photo is 72px diameter on mobile
- [x] Desktop layout unchanged (scales via sm/lg breakpoints)
- [x] TypeScript typecheck passes clean
