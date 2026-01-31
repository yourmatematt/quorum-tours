# Join Page Improvements - January 2026

## Summary
Comprehensive updates to `/tours/[id]/join` page and related components for better UX, consistency, and sticky sidebar functionality.

## Changes Made

### 1. Sticky Sidebar Fix (Root Cause)
- **Problem**: Sticky positioning wasn't working on `/tours/[id]` and `/tours/[id]/join`
- **Root Cause**: `overflow-x: hidden` on `html` element in `globals.css` breaks `position: sticky`
- **Solution**: Removed `overflow-x: hidden` from `html`, kept it only on `body`
- **File**: `src/app/globals.css`

### 2. Join Page Layout Restructure (`src/app/tours/[id]/join/page.tsx`)
- Swapped columns: form flow now on LEFT, sticky tour summary on RIGHT
- Form wraps both columns to allow submit button in sidebar
- Sticky sidebar alignment: `lg:pt-[6.5rem]` padding, `lg:top-[calc(57px+2.5rem)]` sticky offset
- Commit button moved INTO the sticky sidebar (always visible on scroll)
- Removed "View full tour details" link from sidebar
- Updated page header: "Confirm your commitment"
- Updated subtext: "You'll be notified when this tour reaches quorum."

### 3. CommitmentSummary Component Updates (`src/components/join/CommitmentSummary.tsx`)
- Changed "When the tour confirms:" to "When the tour reaches quorum:"
- Updated heading to match "What you're agreeing to" styling (`h4`, `font-display`, `text-lg`, `font-semibold`)
- Updated bullet points to use same styled format (flex layout with colored dots)
- Removed all "withdraw anytime" language (commitment IS binding once quorum reached)
- Three-state logic: confirmed, forming with deposit, forming without deposit (trusted user)

### 4. QuorumProgressBar Integration
- **Component**: `src/components/ui/QuorumProgressBar.tsx` - Uses dots visualization instead of bar
- Added to `/tours/[id]/join` sidebar replacing old bar-style progress
- Added to `CommitmentCard` component (used on `/tours/[id]` sidebar)
- `CommitmentCard` now accepts `quorum` prop for the progress bar

### 5. CommitmentCard Updates (`src/components/ui/CommitmentCard.tsx`)
- Added `QuorumProgressBar` import
- Added `quorum` prop to interface
- Replaced text-only "X birders committed" with dot-style `QuorumProgressBar`

### 6. Tour Detail Page Cleanup (`src/app/tours/[id]/page.tsx`)
- Removed `ConfirmationBanner` component (progress now shown in sidebar via CommitmentCard)
- Removed banner import
- Added `quorum={tour.threshold}` prop to CommitmentCard

### 7. Terminology Consistency
- "quorum" not "threshold" in user-facing text
- "commit" not "express interest"
- Removed misleading "withdraw anytime" language

## Key Files Modified
- `src/app/globals.css` - overflow fix
- `src/app/tours/[id]/page.tsx` - removed banner, added quorum prop
- `src/app/tours/[id]/join/page.tsx` - major restructure
- `src/components/join/CommitmentSummary.tsx` - copy and styling updates
- `src/components/ui/CommitmentCard.tsx` - added QuorumProgressBar
- `src/components/ui/QuorumProgressBar.tsx` - existing component, now used more widely

## Design Decisions
- Sticky sidebar keeps commit button always visible during scroll
- Dot-style progress bar (QuorumProgressBar) used consistently across tour cards, tour detail, and join page
- Form on left, summary on right matches typical checkout flow patterns
- Trust-focused copy: clear about what happens at quorum, no misleading withdrawal language
