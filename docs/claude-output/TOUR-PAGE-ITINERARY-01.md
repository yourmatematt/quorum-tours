# Build Report — TOUR-PAGE-ITINERARY-01

## Summary

Two fixes to the tour detail page logistics section: per-day itinerary rendering and included section deduplication.

---

## Task 1: Render Itinerary as Per-Day Schedule

### Changes

**`src/app/tours/[id]/page.tsx`:**
- Added `ItineraryDay` interface for the itinerary JSON structure
- Updated `generateLogistics` to accept `itinerary` parameter
- When `itinerary` is present: omits the generic Schedule block from logistics
- When `itinerary` is null/empty: falls back to existing single time range
- Added `itinerary` field to tour mapping (from `dbTour.itinerary`)
- Added new Schedule section rendered before Logistics, showing per-day blocks

### Per-Day Rendering

Each day block displays:
- **Title** — bold heading (e.g. "Saturday — Mallacoota Inlet")
- **Vessel** — muted text "Aboard the [vessel]" (when present)
- **Departure** — muted text "Departs: [departure]" (when present)
- **Description** — body text (when present)
- Horizontal divider between days

### Fallback

When `itinerary` is null or empty array, the generic Schedule block (`startTime - endTime`) remains in the Logistics section — no regression.

---

## Task 2: Fix Included Section Duplication

### Problem

The `value` field was set to `tour.included.slice(0, 3).join(', ')` — repeating the first 3 items as a bold headline. Then `details` listed all items again below.

### Fix

Changed `value` from the comma-joined summary to `"${tour.included.length} items"` — a simple count that doesn't duplicate any content. The items appear once only, in the details list.

---

## Files Changed

- `src/app/tours/[id]/page.tsx` — itinerary rendering + included fix

## Validation Checklist

- [x] Schedule section renders per-day blocks when `itinerary` is present
- [x] Each day shows title, vessel, departure, and description
- [x] Divider between days
- [x] Falls back to single time block when `itinerary` is null
- [x] Included section shows each item once — no summary headline duplication
- [x] TypeScript compiles cleanly
