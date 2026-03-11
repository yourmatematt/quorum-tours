# TOUR-ITINERARY-LINEBREAKS-01 — Build Report

## Summary

Fixed itinerary day descriptions rendering `\n` as spaces instead of line breaks.

## Change

**File:** `src/app/tours/[id]/TourDetailClient.tsx` (lines 513–518)

- Changed the description container from a single `<p>` to a `<div>` with `space-y-1`
- Split `day.description` on `\n` and render each segment as a separate `<p>`
- Applies to all itinerary day cards

## Before
```tsx
<p className="...">{day.description}</p>
```

## After
```tsx
<div className="... space-y-1">
  {day.description.split('\n').map((line, i) => (
    <p key={i}>{line}</p>
  ))}
</div>
```

## Validation
- [x] TypeScript compiles clean
- [x] Line breaks render as separate paragraphs with consistent spacing
- [x] Applies to all itinerary day cards
