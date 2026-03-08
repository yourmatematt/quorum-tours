# Build Report — OPERATORS-INDEX-POLISH-01

## Summary

Three improvements to the operators index page: featured single-operator layout, card copy fixes, and a "more guides joining soon" section.

## Changes Made

### Task 1: Single Operator Featured Layout

**`src/app/operators/page.tsx`**
- Added `FeaturedOperatorCard` component for single-operator display
- Conditional rendering: 1 operator = featured layout, 2+ = grid layout
- Featured card: full-width, horizontal layout with 120px photo, name, badges, location, specialties (up to 5), bio excerpt (2-line clamp), "View profile" CTA
- Responsive: stacks vertically on mobile, horizontal on sm+

### Task 2: Card Copy Fixes

**`src/components/ui/OperatorCard.tsx`**
- **Fix 1 — Hide zero tours**: Stats row now conditionally renders; "0 tours" line hidden when `toursCompleted === 0`
- **Fix 2 — Name truncation**: Removed `truncate` class from name span; name now wraps using `flex-wrap` on the badges row
- **Fix 3 — Founding Operator badge**: Added optional `isFoundingOperator` prop; renders amber badge matching profile page styling (`--color-founding-bg` / `--color-founding`)

**`src/lib/supabase/useOperators.ts`**
- Added `is_founding_operator` to the `Operator` interface (data already returned by `select('*')`)

**`src/app/operators/page.tsx`**
- Added `isFoundingOperator` and `description` to `DisplayOperator` interface and mapping
- Passes `isFoundingOperator` to both `OperatorCard` and `FeaturedOperatorCard`

### Task 3: "More Operators Coming Soon" Section

**`src/app/operators/page.tsx`**
- Added card below operator listings with heading, body copy, and "Apply to join" CTA
- CTA links to `/for-operators` (existing operator application page)
- Styled as a standard page card — muted, not promotional
- Border CTA button with hover fill transition

## Validation

- [x] Single operator renders in featured full-width layout, not grid
- [x] Featured layout shows full name, badges, location, specialties, bio excerpt, and CTA
- [x] "0 tours" does not appear on any card
- [x] Operator name does not truncate — wraps if needed
- [x] Founding Operator badge appears on Dale's card
- [x] "More guides joining soon" section renders below the operator card(s)
- [x] "Apply to join" CTA links to `/for-operators`
- [x] Adding a second operator triggers grid layout (conditional on `filteredOperators.length === 1`)
- [x] TypeScript typecheck passes
