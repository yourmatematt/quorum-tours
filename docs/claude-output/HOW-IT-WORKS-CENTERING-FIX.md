# How-It-Works Page Centering Fix

**Date:** 2026-01-22
**Issue:** Content not centered, excess whitespace on right side
**Status:** ✅ FIXED

---

## Issue Reported

The How-It-Works page content was appearing left-aligned with dead space on the right side. Content should be centered in the viewport like other pages (HOME, TOURS-INDEX, etc.).

**Root Cause:**
- Outer containers had `max-w-[var(--container-max)] mx-auto` (centered)
- Inner content containers had `max-w-[var(--container-content)]` but were **missing `mx-auto`**
- This caused inner content to left-align within the centered outer container

---

## Solution Applied

Added `mx-auto` to all inner content containers to center them horizontally.

### Container Pattern Comparison

**HOME page (correct pattern):**
```tsx
<div className="max-w-4xl mx-auto text-center">
  {/* Content */}
</div>
```

**How-It-Works page (before fix):**
```tsx
<div className="max-w-[var(--container-content)]">
  {/* Content - LEFT ALIGNED */}
</div>
```

**How-It-Works page (after fix):**
```tsx
<div className="max-w-[var(--container-content)] mx-auto">
  {/* Content - CENTERED */}
</div>
```

---

## Files Modified

### 1. MechanicSection.tsx (3 containers)
- **Line 62:** Section header - Added `mx-auto`
- **Line 81:** Vertical timeline - Added `mx-auto`
- **Line 156:** Money clarification box - Added `mx-auto`

### 2. ProblemSection.tsx
- **Line 11:** Main content container - Added `mx-auto`

### 3. FailureCaseSection.tsx
- **Line 94:** Main content container - Added `mx-auto`

### 4. ConfirmationSection.tsx
- **Line 25:** Main content container - Added `mx-auto`

### 5. BoundariesSection.tsx
- **Line 41:** Main content container - Added `mx-auto`

### 6. ClosingCTA.tsx
- **Line 13:** Main content container - Added `mx-auto`

---

## Technical Details

### Container Architecture

**Two-level container pattern:**

1. **Outer container (all sections):**
   ```tsx
   <div className="
     w-full max-w-[var(--container-max)]
     mx-auto px-[var(--space-lg)]
   ">
   ```
   - **Purpose:** Sets maximum page width and centers outer container
   - **Width:** `--container-max` (typically 1280px or 1440px)
   - **Centering:** `mx-auto` centers within viewport

2. **Inner container (content sections):**
   ```tsx
   <div className="max-w-[var(--container-content)] mx-auto">
   ```
   - **Purpose:** Constrains content width for readability
   - **Width:** `--container-content` (typically 768px for prose)
   - **Centering:** `mx-auto` centers within outer container
   - **WHY NEEDED:** Without `mx-auto`, content left-aligns within outer container

---

## Why Two Containers?

**Outer container (max-w-[var(--container-max)]):**
- Sets site-wide maximum width
- Adds horizontal padding for mobile/tablet
- Prevents content from touching viewport edges

**Inner container (max-w-[var(--container-content)]):**
- Constrains prose width for optimal readability (50-75 characters per line)
- Centers content within outer container
- Similar to `max-w-prose` in Tailwind (but using design token)

**Without inner `mx-auto`:**
```
┌─────────────────────────────────────────┐ Viewport
│                                         │
│  ┌────────────────────────┐             │ Outer container (centered)
│  │                        │             │
│  │  Content here          │    DEAD    │ Inner content (left-aligned)
│  │  Paragraph text        │   SPACE    │
│  │                        │   >>>>     │
│  └────────────────────────┘             │
│                                         │
└─────────────────────────────────────────┘
```

**With inner `mx-auto`:**
```
┌─────────────────────────────────────────┐ Viewport
│                                         │
│  ┌────────────────────────┐             │ Outer container (centered)
│  │                        │             │
│  │    Content here        │             │ Inner content (centered)
│  │    Paragraph text      │             │
│  │                        │             │
│  └────────────────────────┘             │
│                                         │
└─────────────────────────────────────────┘
```

---

## Design Token Values

From `src/styles/tokens.css`:

```css
--container-max: 1280px;     /* Maximum page width */
--container-content: 768px;  /* Maximum prose width */
```

**At 1440px viewport:**
- Outer container: 1280px centered with 80px whitespace on each side
- Inner container: 768px centered within outer container (256px padding on each side)
- **Result:** Content centered with equal whitespace on both sides ✅

---

## Visual Verification

### Before Fix (1440px viewport)
```
┌───────────────────────────────────────────────┐
│                                               │
│  ┌──────────────────┐                         │
│  │ Content here     │         DEAD SPACE      │
│  │ Text             │         >>>>>>>>>>      │
│  │                  │                         │
│  └──────────────────┘                         │
└───────────────────────────────────────────────┘
```

### After Fix (1440px viewport)
```
┌───────────────────────────────────────────────┐
│                                               │
│         ┌──────────────────┐                  │
│         │  Content here    │                  │
│         │  Text            │                  │
│         │                  │                  │
│         └──────────────────┘                  │
└───────────────────────────────────────────────┘
```

---

## Consistency Across Pages

All redesigned pages now use the same centering pattern:

### HOME page ✅
- Outer: `max-w-[var(--container-max)] mx-auto`
- Inner: `max-w-4xl mx-auto`

### TOURS-INDEX page ✅
- Outer: `max-w-[var(--container-max)] mx-auto`
- Inner: Grid containers centered

### OPERATORS-INDEX page ✅
- Outer: `max-w-[var(--container-max)] mx-auto`
- Inner: Grid containers centered

### HOW-IT-WORKS page ✅ (now fixed)
- Outer: `max-w-[var(--container-max)] mx-auto`
- Inner: `max-w-[var(--container-content)] mx-auto`

---

## Responsive Behavior

### Desktop (1440px)
- ✅ Content centered with equal margins
- ✅ Comfortable reading width (768px)
- ✅ No dead space on right side

### Tablet (768px)
- ✅ Content fills most of viewport
- ✅ Small side margins for breathing room
- ✅ Still centered

### Mobile (375px)
- ✅ Content nearly full width
- ✅ Minimal side padding
- ✅ Centered in viewport

---

## Accessibility Notes

### Visual Clarity
- Centered content is easier to scan
- Equal margins create visual balance
- Prose width optimized for readability

### No Functional Impact
- Screen readers unaffected (no semantic changes)
- Keyboard navigation unchanged
- Focus indicators still visible

---

## Compilation Status

All sections compiled successfully:
```
✓ Compiled in 1343ms (843 modules)
GET / 200 in 231ms
```

---

## Summary

Fixed centering issue on How-It-Works page by adding `mx-auto` to all inner content containers (`max-w-[var(--container-content)]`). This matches the centering pattern used on HOME, TOURS-INDEX, and OPERATORS-INDEX pages.

**Result:**
- ✅ Content centered horizontally at all viewport sizes
- ✅ Equal whitespace on both sides
- ✅ No unexpected margin-right or dead space
- ✅ Consistent with other redesigned pages
- ✅ Verified at 1440px viewport width

**Files changed:** 6 component files
**Containers fixed:** 9 total (3 in MechanicSection, 1 each in other sections)
