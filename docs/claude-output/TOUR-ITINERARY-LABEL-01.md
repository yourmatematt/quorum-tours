# TOUR-ITINERARY-LABEL-01 — Build Report

## Summary

Added rendering of the `label` field (day and date) as eyebrow text above the itinerary day title.

## Changes

**File:** `src/app/tours/[id]/TourDetailClient.tsx`

1. Added `label?: string` to `ItineraryDay` interface
2. Rendered `day.label` as uppercase eyebrow text above `day.title` in all itinerary day cards

## Before
```
Mallacoota Inlet — MV Loch-Ard
```

## After
```
SATURDAY 26 APRIL
Mallacoota Inlet — MV Loch-Ard
```

## Styling
- `text-xs font-medium uppercase tracking-wide text-[var(--color-ink-subtle)]`
- Rendered conditionally — only if `label` exists
- No data or SQL changes

## Validation
- [x] Label renders above title on all itinerary day cards
- [x] Styling is subtle eyebrow text, visually distinct from title
- [x] No data or SQL changes made
