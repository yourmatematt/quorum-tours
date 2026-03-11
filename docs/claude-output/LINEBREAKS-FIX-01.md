# LINEBREAKS-FIX-01 — Build Report

## Summary

Fixed `\n` line breaks rendering as spaces in two locations.

## Changes

### 1. Tour page — itinerary day description
**File:** `src/app/tours/[id]/TourDetailClient.tsx`
**Status:** Already fixed in commit `3210c8b` — splits on `\n`, renders each line as `<p>`.

### 2. Operator profile page — bio/description
**File:** `src/app/operators/[id]/OperatorProfileClient.tsx` (line 294)

**Before:** Split on `\n\n` only — single `\n` breaks collapsed into spaces.
```tsx
{operator.description.split('\n\n').map((paragraph, index) => (
  <p key={index}>{paragraph}</p>
))}
```

**After:** Split on `\n` — each line renders as `<p>`, empty lines render as `<br>` for paragraph spacing.
```tsx
{operator.description.split('\n').map((line, index) => (
  line.trim() === ''
    ? <br key={index} />
    : <p key={index}>{line}</p>
))}
```

## Validation
- [x] Single `\n` renders as line break in both locations
- [x] Double `\n\n` renders as paragraph gap (via empty-line `<br>`)
- [x] No data or SQL changes
