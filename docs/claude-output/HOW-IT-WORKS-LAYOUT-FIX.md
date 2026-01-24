# How-It-Works Page Layout Fix

**Date:** 2026-01-22
**Issue:** Desktop layout bug - steps displayed incorrectly
**Status:** ✅ FIXED

---

## Issue Reported

"For Birders: Your Journey" section was displaying step cards in a horizontal multi-column grid (5 columns side-by-side), making the detailed content cramped and unreadable.

**Problems:**
1. Text was cramped in narrow columns
2. Detailed descriptions were hard to read
3. UX pattern was wrong for sequential educational content
4. Multi-column layout doesn't suit step-by-step journey narrative

---

## Solution Applied: Vertical Timeline Layout

**UX Pattern:** Vertical stepper/timeline component

**Layout Structure:**
```
[1] -------- Browse and find a tour
             Explore our curated tours led by verified guides...
             All tour details are transparent upfront...

   |  (vertical connecting line)
   |

[2] -------- Express interest (no charge)
             Signal that you want this tour to happen...
             This is pure signal...

   |  (vertical connecting line)
   |

[3] -------- Commit conditionally
             Agree to join the tour if the threshold is met...
             The commitment is conditional...

   (continues for all 5 steps)
```

---

## Technical Implementation

### File Modified: `src/components/how-it-works/MechanicSection.tsx`

**BEFORE (Multi-Column Grid):**
```tsx
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  2xl:grid-cols-5
  gap-[var(--space-xl)]
  relative
">
  {stages.map((stage, index) => (
    <div key={stage.number} className="relative">
      <StageCard {...stage} />
    </div>
  ))}
</div>
```

**AFTER (Vertical Timeline):**
```tsx
<div className="max-w-[var(--container-content)]">
  {stages.map((stage, index) => (
    <div key={stage.number} className="relative">
      {/* Step container with horizontal layout */}
      <div className="flex gap-[var(--space-lg)]">
        {/* Number badge on left */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="
            w-10 h-10
            bg-[var(--color-primary)]
            text-white
            font-mono font-medium
            rounded-full
            flex items-center justify-center
            text-base
            flex-shrink-0
          ">
            {stage.number}
          </div>

          {/* Vertical connecting line */}
          {index < stages.length - 1 && (
            <div className="
              w-0.5
              flex-1
              bg-[var(--color-border)]
              my-[var(--space-sm)]
              min-h-[var(--space-2xl)]
            " aria-hidden="true" />
          )}
        </div>

        {/* Content on right */}
        <div className="flex-1 pb-[var(--space-2xl)]">
          <h3 className="
            font-display
            text-[var(--text-lg)]
            text-[var(--color-ink)]
            mb-[var(--space-sm)]
          ">
            {stage.title}
          </h3>

          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
            mb-[var(--space-md)]
          ">
            {stage.description}
          </p>

          <p className="
            text-[var(--color-ink-subtle)]
            text-[var(--text-sm)]
            leading-relaxed
            pl-[var(--space-md)]
            border-l-2 border-[var(--color-border)]
          ">
            {stage.clarification}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
```

---

## Layout Features

### Number Badge (Left Side)
- **Size:** 40px × 40px circle
- **Color:** Forest green (primary) background, white text
- **Font:** Monospace, medium weight
- **Position:** Fixed width, flex-shrink-0 (never collapses)

### Vertical Connecting Line
- **Width:** 0.5px (thin line)
- **Color:** Border color (#E5E7EB)
- **Position:** Between each step's number badge
- **Min height:** 2xl spacing to ensure visibility
- **Hidden:** After the last step (no line below step 5)

### Content Area (Right Side)
- **Width:** Flexible (flex-1, takes remaining space)
- **Spacing:** 2xl padding bottom between steps
- **Structure:**
  1. **Title:** Crimson Pro, lg size, primary ink color
  2. **Description:** Body text, muted ink, relaxed leading
  3. **Clarification:** Smaller text, subtle ink, left border accent

### Responsive Behavior
- **Desktop (all sizes):** Number left, content right, full width
- **Mobile (< 768px):** Same layout, just narrower container
- **Max width:** Content container max width for readability

---

## UX Improvements

### ✅ Readability
- Full-width content allows comfortable line length
- No cramped text in narrow columns
- Each step gets proper vertical space

### ✅ Scanability
- Number badges create clear visual hierarchy
- Vertical timeline shows progression naturally
- Eyes move top-to-bottom (natural reading flow)

### ✅ Comprehension
- Sequential steps are stacked in order (1→2→3→4→5)
- Connecting lines show relationship between steps
- Clarifications have visual separation (left border)

### ✅ Educational Pattern
- Matches user expectation for "how it works" content
- Timeline/stepper is standard pattern for sequential processes
- Similar to checkout flows, onboarding tutorials

---

## Design Rationale

### Why Vertical Timeline Instead of Horizontal Cards?

**Content Density:**
- Each step has ~50-100 words of description + clarification
- Horizontal cards would require 200px+ width per column
- 5 columns × 200px = 1000px+ just for cards (plus gaps)
- Detailed text doesn't fit comfortably in narrow columns

**Reading Pattern:**
- Users read sequential content top-to-bottom, not left-to-right-to-next-row
- Horizontal grid breaks natural reading flow (step 1→2→3 on row 1, then 4→5 on row 2)
- Vertical timeline matches mental model of "journey" or "process"

**Educational Best Practice:**
- Vertical steppers are standard for tutorials, guides, processes
- Similar to Google Material Design Stepper, Ant Design Steps
- Users expect this pattern for "how it works" content

**Responsive Simplicity:**
- Vertical layout works identically on mobile and desktop
- No complex grid breakpoints or card rearrangement
- Single column with good spacing at all viewport sizes

---

## Components Affected

### StageCard Component (No Longer Used)
- Previously used for horizontal card layout
- Now replaced with inline rendering in MechanicSection
- Component still exists but not imported/used
- Can be removed in future cleanup (low priority)

---

## Visual Quality Verification

### Desktop (1440px)
- ✅ Steps displayed vertically in single column
- ✅ Number badges aligned on left edge
- ✅ Content area has comfortable reading width
- ✅ Vertical lines connect all steps
- ✅ No cramped or narrow columns

### Mobile (375px)
- ✅ Same vertical layout, narrower container
- ✅ Number badges still visible on left
- ✅ Text reflows but remains readable
- ✅ Vertical spacing preserved

---

## Accessibility Notes

### Keyboard Navigation
- Steps are still in logical tab order (top to bottom)
- No grid navigation complexity
- Focus indicators work on all interactive elements

### Screen Readers
- Steps announced in sequential order (1, 2, 3, 4, 5)
- Connecting lines marked aria-hidden (decorative)
- Clear heading hierarchy (h3 for step titles)

### Visual Clarity
- High contrast number badges (white on forest green)
- Connecting lines subtle but visible
- Clarifications visually separated with border

---

## Performance Impact

### Positive Changes
- Removed unused StageCard component import (if cleaned up)
- Simpler DOM structure (no grid + card wrappers)
- Fewer CSS classes to process

### Neutral Changes
- Same number of text nodes rendered
- Same content, just different layout
- No additional images or assets

---

## Status

**Layout Fix:** ✅ COMPLETE
**Compilation:** ✅ SUCCESS
**Responsive:** ✅ VERIFIED (works at all viewports)
**Accessibility:** ✅ MAINTAINED
**UX Pattern:** ✅ CORRECT (vertical timeline for sequential content)

---

## Summary

The "For Birders: Your Journey" section now uses a **vertical timeline layout** instead of a multi-column grid. Each step is displayed with its number badge on the left, content on the right, and vertical connecting lines between steps. This matches standard UX patterns for educational/tutorial content and provides better readability for the detailed step descriptions.

**Key Benefits:**
- ✅ Content is readable (no cramped columns)
- ✅ Natural top-to-bottom reading flow
- ✅ Clear visual progression (number badges + connecting lines)
- ✅ Works identically on mobile and desktop
- ✅ Matches user expectations for "how it works" content
