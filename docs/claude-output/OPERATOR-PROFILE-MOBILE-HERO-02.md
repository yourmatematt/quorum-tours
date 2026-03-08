# Build Report — OPERATOR-PROFILE-MOBILE-HERO-02

## Summary

Split the hero card into two cards on mobile (identity + bio) and increased profile photo size from 72px to 96px. Desktop layout unchanged.

## Changes Made

### `src/components/ui/OperatorHero.tsx`
- Removed `expertise` prop — bio/tagline rendering moved to page level for card-split control
- Increased mobile profile photo from `w-[72px] h-[72px]` to `w-24 h-24` (96px)
- Increased mobile spacer from `pt-10` to `pt-14` to accommodate larger photo overlap

### `src/app/operators/[id]/page.tsx`
- Removed `expertise` prop from OperatorHero usage
- Added desktop-only bio paragraph inside hero card (`hidden lg:block`)
- Added mobile-only bio card after hero card (`lg:hidden`) with standard card styling and padding
- Same gap between identity and bio cards as all other section cards

## Card split behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile (<1024px) | Two cards: identity card (banner, photo, name, badges, location, guiding since) + bio card (tagline text) |
| Desktop (≥1024px) | Single hero card with bio included — unchanged from previous state |

## Validation

- [x] Mobile: two separate hero cards with page background gap between them
- [x] Split point is between "Guiding since" and the bio text
- [x] Profile photo is 96px on mobile
- [x] Desktop: single hero card unchanged
- [x] TypeScript typecheck passes
- [x] No content or logic changes
