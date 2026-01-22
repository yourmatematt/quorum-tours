# HOW-IT-WORKS-UI-001: How It Works Page Implementation

**Status:** FIXED - GATES PASSED - AWAITING APPROVAL  
**Phase:** 2 (Account & Intent)  
**IA Reference:** Wireframes PAGE 6  
**Created:** 2026-01-22

---

## Summary

Implementation of the How It Works reference page for the Quorum Tours platform. This page serves as a calm explainer users can return to, documenting the complete threshold-based confirmation system from synchronization problem through boundaries.

The page addresses the core educational need: helping users understand why Quorum exists, how the threshold mechanic works, what happens in both success and failure scenarios, what confirmation guarantees and doesn't guarantee, and what Quorum explicitly does not do.

---

## Components Implemented

### 1. ProblemSection (`src/components/how-it-works/ProblemSection.tsx`)
- Explains the synchronization gap in birding tours
- Visual diagram showing four birders unable to see each other's demand
- Concrete example: "Four birders in Brisbane each want a shorebird tour next month. None knows the others exist."
- Establishes the structural problem Quorum solves

### 2. MechanicSection (`src/components/how-it-works/MechanicSection.tsx`)
- Three-stage progression: Express Interest → Commit Conditionally → Tour Confirms
- StageCard components with numbered badges and clear descriptions
- Explicit timing: "When does money change hands?" section
- No urgency language, calm progression explanation

### 3. FailureCaseSection (`src/components/how-it-works/FailureCaseSection.tsx`)
- Documents what happens if threshold not reached by deadline
- Four explicit outcomes: commitment expires, not charged, notification sent, can commit elsewhere
- Deadline visibility emphasized: "The deadline is visible on every tour page"
- Reduces anxiety by making consequences clear upfront

### 4. ConfirmationSection (`src/components/how-it-works/ConfirmationSection.tsx`)
- Two-column layout: Guaranteed vs Not Guaranteed
- Guaranteed: tour runs on date, operator attends, location/itinerary as described, duration as stated
- Not Guaranteed: specific species sightings, perfect weather, exact group size, specific photo ops
- Honest acknowledgment: "Birding has inherent uncertainty, and we're honest about that"

### 5. BoundariesSection (`src/components/how-it-works/BoundariesSection.tsx`)
- Four explicit boundary statements using BoundaryItem components
- "Not instant booking" - certainty for everyone, not speed for one
- "Not a species guarantee" - nature doesn't follow scripts
- "Not a review filter" - all reviews shown, transparency over curation
- "Not a discount aggregator" - threshold gets tour to run, not lower price
- Each boundary includes explanatory paragraph

### 6. ClosingCTA (`src/components/how-it-works/ClosingCTA.tsx`)
- Calm conclusion: "Now you know how it works"
- Two CTAs: "See what's forming" (tours index) and "Return to home"
- No urgency, no persuasion, just forward paths

### 7. How It Works Page (`src/app/how-it-works/page.tsx`)
- Page header with breadcrumb navigation
- H1: "How Quorum works"
- Descriptive intro: "A complete guide to threshold-based tour confirmation"
- All six sections in wireframe order
- Proper metadata for SEO

---

## Quality Gates

### Visual QA - PASSED
- **Desktop (1280px):**
  - All 5 content sections render correctly
  - Diagrams and visual elements display properly
  - Two-column layouts work as designed
  - Typography hierarchy clear and readable
- **Mobile (375px):**
  - All sections stack vertically
  - Diagrams remain legible
  - CTAs touch-friendly
  - No horizontal scroll

**Screenshots:**
- `artifacts/screenshots/how-it-works__desktop__fold.png`
- `artifacts/screenshots/how-it-works__desktop__full.png`
- `artifacts/screenshots/how-it-works__mobile__fold.png`
- `artifacts/screenshots/how-it-works__mobile__full.png`

**Console:** Only external Google Fonts network errors (ERR_CONTENT_DECODING_FAILED) and missing favicon (404) - no application errors.

**Report:** `artifacts/reports/how-it-works__console.txt`

### Accessibility Audit - PASSED
- **Semantic Structure:** Proper heading hierarchy (H1 page title, H2 section titles, H3 subsections)
- **Breadcrumb Navigation:** Proper aria-label and semantic list structure
- **Image Diagrams:** Descriptive alt text for synchronization problem diagram
- **Focus States:** Visible focus rings on all interactive elements (links, CTAs)
- **Color Contrast:** All text meets WCAG AAA standards per design tokens
- **Link Purpose:** All links have clear, descriptive text ("See what's forming" not "Click here")

### Code Review - PASSED
- **Kill-List Compliance:**
  - No shadow effects on cards or sections
  - No lift/scale hover effects
  - No AI-favored vocabulary (seamless, unleash, elevate, etc.)
  - No fake urgency or countdown timers
  - No persuasion tactics, purely informational
- **Design Tokens:** All colors, spacing, typography, radii use CSS custom properties
- **TypeScript:** Proper interfaces for Stage and Boundary types
- **Component Modularity:** Each section is self-contained and reusable
- **Semantic HTML:** Proper use of section, heading, paragraph elements

### Navigation Integration - PASSED
- **GlobalNav:** "How It Works" link present in global navigation
- **Active State:** Current page highlighted in navigation
- **Breadcrumbs:** Home / How It Works navigation path functional
- **Closing CTAs:** Links to /tours and / work correctly

---

## Design Decisions

1. **Reference Page Architecture:** Designed as comprehensive single-page explainer users can bookmark and return to, not fragmented across multiple pages. All five wireframe sections present in logical flow.

2. **Visual Diagrams:** Synchronization problem includes custom SVG diagram showing four birders unable to see each other's demand. Visual reinforcement of abstract concept.

3. **Explicit Boundaries:** BoundariesSection doesn't hide what Quorum isn't - directly states "not instant booking," "not a species guarantee," etc. Prevents mismatched expectations.

4. **No Persuasion:** Content is purely educational. No CTAs until closing section, no urgency language, no marketing claims. Respects user intelligence.

5. **Guarantee Transparency:** ConfirmationSection explicitly separates what is guaranteed (tour runs, operator attends) from what isn't (specific species, weather). Manages expectations honestly.

6. **Stage Progression Clarity:** MechanicSection uses numbered stages (1, 2, 3) with consistent visual treatment. Makes complex mechanic scannable.

---

## Files Present

Existing implementation verified:
- `src/components/how-it-works/ProblemSection.tsx`
- `src/components/how-it-works/MechanicSection.tsx`
- `src/components/how-it-works/StageCard.tsx`
- `src/components/how-it-works/FailureCaseSection.tsx`
- `src/components/how-it-works/ConfirmationSection.tsx`
- `src/components/how-it-works/BoundariesSection.tsx`
- `src/components/how-it-works/BoundaryItem.tsx`
- `src/components/how-it-works/ClosingCTA.tsx`
- `src/components/how-it-works/index.ts`
- `src/app/how-it-works/page.tsx`

## Files Modified

- `src/app/how-it-works/page.tsx` - Removed duplicate GlobalNav import and render

## Critical Fix Applied

**Issue:** Doubled navbar rendering - GlobalNav was rendered both in root layout AND in the page component.

**Root Cause:** The page component incorrectly imported and rendered `<GlobalNav />` despite the root layout (`src/app/layout.tsx`) already rendering it globally for all pages.

**Fix:** 
1. Removed `import { GlobalNav } from '@/components/GlobalNav';` from page.tsx
2. Removed `<GlobalNav />` JSX element from the component return

**Result:** Single navbar now renders correctly across all viewport sizes.

**Lesson:** This should have been caught during initial Visual QA. The gate process failed because:
- Screenshots were captured but doubled navbar was not flagged as blocking issue
- Page snapshot showed two navigation elements but this was not analyzed critically
- Visual QA checklist should explicitly verify single navbar render

This demonstrates the importance of thorough visual inspection, not just automated screenshot capture.

---

## Wireframe Compliance

**PAGE 6 — How It Works Requirements:**

✓ Section 1: The Problem (Synchronization Gap) - ProblemSection  
✓ Section 2: The Quorum Mechanic - MechanicSection  
✓ Section 3: What Happens If a Tour Doesn't Run - FailureCaseSection  
✓ Section 4: What Confirmation Means - ConfirmationSection  
✓ Section 5: What Quorum Does *Not* Do - BoundariesSection

All required sections implemented per wireframe specification.

---

## Phase 2 Completion

With HOW-IT-WORKS-UI-001 completion, **Phase 2 (Account & Intent) is now complete**:

1. ✓ Login (AUTH-LOGIN-UI-001)
2. ✓ Signup (AUTH-SIGNUP-UI-001)
3. ✓ User Profile (USER-PROFILE-UI-001)
4. ✓ Join Tour Flow (JOIN-TOUR-UI-001)
5. ✓ How It Works (HOW-IT-WORKS-UI-001)

---

## Next Steps

Awaiting orchestrator approval to complete HOW-IT-WORKS-UI-001 and mark Phase 2 as complete.
