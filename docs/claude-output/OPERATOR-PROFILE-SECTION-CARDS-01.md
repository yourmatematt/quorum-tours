# Build Report — OPERATOR-PROFILE-SECTION-CARDS-01

## Summary

Split the single white profile card into 5 individual section cards on the operator public profile page. The light grey page background now shows between cards, creating clear visual separation.

## Changes Made

### `src/app/operators/[id]/page.tsx`
- Removed single outer white card wrapper (`lg:bg-white lg:border ...`)
- Removed inner card content wrapper (`lg:px-[var(--space-lg)] lg:pb-[var(--space-lg)]`)
- Added flex column container with responsive gap (`gap-3 sm:gap-4 lg:gap-6`)
- Wrapped each section group in its own card div with consistent styling:
  - `bg-white rounded-[var(--radius-organic)] border border-[var(--color-border)] shadow-sm`
  - Responsive padding: `p-4 sm:p-6 lg:p-8`

### Card breakdown:
1. **Hero card** — banner + photo + name + badges + location + guiding since + bio. Bottom padding only (`pb-4 sm:pb-6 lg:pb-8`), banner bleeds full width with rounded top corners.
2. **Why I Joined Quorum card** — heading + blockquote + attribution (conditional)
3. **Expertise card** — Track Record summary (if available) + specialty tags
4. **About card** — heading + description paragraphs + Capabilities/Resources section
5. **Tours card** — empty state OR tour tabs with active/past tours

### `src/components/ui/OperatorHero.tsx`
- Removed outer section bottom margin (`mb-[var(--space-xl)] sm:mb-[var(--space-2xl)]`) — card gap handles spacing

### `src/components/ui/AuthoritySection.tsx`
- Removed outer section bottom margin (`mb-[var(--space-xl)] sm:mb-[var(--space-2xl)] lg:mb-[var(--space-3xl)]`) — card gap handles spacing

### `src/components/ui/CapabilitiesSection.tsx`
- Removed outer section bottom margin (`mb-[var(--space-3xl)]`) — card gap handles spacing

### `src/components/ui/OperatorNoToursCard.tsx`
- Removed outer section bottom margin (`mb-[var(--space-md)] sm:mb-[var(--space-lg)]`) — card gap handles spacing

## Validation

- [x] Five distinct cards visible on desktop with grey page background showing between them
- [x] Hero card banner image bleeds full width with rounded top corners
- [x] All cards have consistent border, shadow, and padding
- [x] Existing page background colour visible between all cards — page background colour is NOT changed
- [x] Mobile card treatment correct (cards at all breakpoints with responsive padding/gap)
- [x] Footer sits at normal distance below the final card
- [x] No content or logic changes
- [x] TypeScript typecheck passes
