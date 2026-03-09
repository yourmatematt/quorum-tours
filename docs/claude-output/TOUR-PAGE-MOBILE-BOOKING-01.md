# Build Report — TOUR-PAGE-MOBILE-BOOKING-01

## Summary

Fixed mobile booking widget layout on the tour detail page. The widget now appears inline after the tour overview on mobile, rather than being buried at the bottom after all content sections.

## Problem

On mobile (`flex-col` layout), the CommitmentCard sat in the sidebar column which rendered after ALL content sections (species, guide, itinerary, logistics, FAQs). Users had to scroll past everything to find the booking action.

## Solution

Used a show/hide pattern with two CommitmentCard instances:

1. **Mobile card** (`lg:hidden`): Renders inline after the tour overview section (title, description, meta), before species/guide/logistics. Full width, naturally in the document flow.

2. **Desktop card** (`hidden lg:block`): Remains in the sticky sidebar column at `lg:w-[320px]`. Unchanged from previous behaviour.

This ensures:
- Mobile users see the booking widget early (after overview, before detailed sections)
- Desktop users keep the sticky sidebar layout
- No CSS order hacks or layout complexity

## File Changed

- `src/app/tours/[id]/page.tsx`

## Validation Checklist

- [x] Mobile booking widget renders full width after tour overview
- [x] Not fixed/stuck in a broken position
- [x] Quorum progress bar visible on mobile
- [x] Commit button is full width and tappable on mobile
- [x] Desktop sidebar layout unchanged (sticky, 320px)
- [x] TypeScript compiles cleanly
