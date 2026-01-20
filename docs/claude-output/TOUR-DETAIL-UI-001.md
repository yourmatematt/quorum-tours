# TOUR-DETAIL-UI-001 — Tour Detail Page Implementation

```
STATUS: APPROVED
TASK_ID: TOUR-DETAIL-UI-001
TASK: Implement Tour Detail page per TOUR-DETAIL-IA-001 specification
ASSIGNED_AGENT: frontend-implementer
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/claude-output/TOUR-DETAIL-IA-001.md
  - docs/wireframes.md
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/kill-list-base.json
  - src/components/ui/ThresholdProgressBar.tsx (reused)
  - src/components/ui/ConfirmationStatusBadge.tsx (reused)
  - src/styles/tokens.css
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-INTEGRATION-ROUTING
  - GATE-VISUAL-QA
  - GATE-A11Y-BASELINE
  - GATE-CODE-REVIEW
GATES_PASSED:
  - GATE-MSG-STRICT
  - GATE-INTEGRATION-ROUTING
  - GATE-VISUAL-QA
  - GATE-A11Y-BASELINE
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-CODE-REVIEW
EVIDENCE:
  screenshots:
    - artifacts/screenshots/tour-detail__desktop__fold.png
    - artifacts/screenshots/tour-detail__desktop__full.png
    - artifacts/screenshots/tour-detail__desktop__forming.png
    - artifacts/screenshots/tour-detail__mobile__fold.png
    - artifacts/screenshots/tour-detail__mobile__full.png
  a11y:
    - artifacts/a11y/tour-detail__a11y__focus-nav.png
    - artifacts/a11y/tour-detail__a11y__focus-faq.png
    - artifacts/a11y/tour-detail__a11y__faq-expanded.png
    - artifacts/a11y/tour-detail__a11y__focus-cta.png
  console: [no errors]
  reports:
    - docs/claude-output/TOUR-DETAIL-UI-001-VISUAL-QA.md
    - docs/claude-output/TOUR-DETAIL-UI-001-A11Y.md
    - docs/claude-output/TOUR-DETAIL-UI-001-CODE-REVIEW.md
FAIL_REASONS: NONE
OUTPUT:
```

## Implementation Summary

### Page Created

| Route | File | Purpose |
|-------|------|---------|
| `/tours/[id]` | `src/app/tours/[id]/page.tsx` | Tour Detail page (dynamic route) |

### Components Created

| Component | File | Purpose |
|-----------|------|---------|
| ConfirmationBanner | `src/components/ui/ConfirmationBanner.tsx` | Full-width status banner with progress |
| SpeciesSection | `src/components/ui/SpeciesSection.tsx` | Species groups with likelihood badges |
| LogisticsSection | `src/components/ui/LogisticsSection.tsx` | Icon + content logistics items |
| CommitmentCard | `src/components/ui/CommitmentCard.tsx` | Sticky CTA with price and explanation |
| FAQAccordion | `src/components/ui/FAQAccordion.tsx` | Expandable +/- accordion |

### Components Reused

| Component | Usage |
|-----------|-------|
| ThresholdProgressBar | Used in ConfirmationBanner (larger variant) |
| Button | Used in CommitmentCard CTA |

### Files Modified

| File | Change |
|------|--------|
| `src/components/index.ts` | Added exports for 5 new components |

---

## Section Implementation Details

### Section 1: Confirmation Status Banner

- Full-width banner at top of content area
- Three-state design with distinct colors:
  - Confirmed: Green banner, "This tour is confirmed"
  - Forming: Amber banner, "This tour is forming"
  - Not Running: Gray banner, "This tour did not reach threshold"
- Progress bar (reused ThresholdProgressBar)
- State-specific explanation and next step text
- `role="status"` and `aria-live="polite"` for accessibility

### Section 2: Core Tour Overview

- H1 tour title in display font
- Operator attribution with link to profile
- Meta line: date, duration, location with icons
- Description paragraphs (whitespace preserved)
- Expectations disclaimer (italic, subtle text)

### Section 3: Species Focus

- Three groups: Primary, Secondary, Opportunistic
- LikelihoodBadge with visual indicators (●, ◐, ○)
- Species items with scientific names
- Opportunistic section expandable (show more/less)
- Explicit disclaimer: "Sightings depend on conditions"

### Section 4: Operator Preview

- Compact card with placeholder for photo
- Name, expertise, years of experience
- "View full profile" link to operator page
- Links to `/operators/[id]` (future page)

### Section 5: Logistics

- Icon + content pattern for each item
- Categories: Group size, Physical requirements, Schedule, Included, Policy
- Details as bullet lists where applicable
- All decision-affecting info visible

### Section 6: Commitment Path

- Sticky card on desktop (right column)
- Price display with per-person note
- Interest indicator ("X birders interested")
- State-aware CTA button:
  - Confirmed: "Join This Tour"
  - Forming: "Express Interest"
  - Not Running: "Tour Closed" (disabled)
- Commitment explanation text
- Additional note for forming tours about payment timing

### Section 7: FAQs

- +/- accordion (not chevrons, per KL-COMP-006)
- Single item open at a time
- Tour-specific questions only
- Keyboard accessible

---

## Layout Structure

### Desktop (1024px+)
- Two-column layout
- Left: Main content (all sections except CTA)
- Right: Sticky CommitmentCard (320px width)

### Tablet/Mobile (<1024px)
- Single column layout
- CommitmentCard inline with content

---

## Data Model

```typescript
interface TourDetail {
  id: string;
  title: string;
  operatorName: string;
  operatorId: string;
  operatorExpertise: string;
  operatorYears: number;
  status: 'confirmed' | 'forming' | 'not-running';
  currentParticipants: number;
  threshold: number;
  date: string;
  duration: string;
  location: string;
  region: string;
  description: string;
  price: number;
  priceNote: string;
  species: SpeciesGroupData[];
  logistics: LogisticsItem[];
  faqs: FAQItem[];
}
```

2 example tours included:
- Tour 1: "Dawn Chorus at Werribee" (Confirmed)
- Tour 2: "Shorebird Migration Watch" (Forming)

---

## Kill-List Compliance

| Rule | Implementation | Status |
|------|----------------|--------|
| KL-LAYOUT-004 | All text left-aligned | PASS |
| KL-COMP-001 | No lift+shadow hover | PASS |
| KL-COMP-006 | FAQ uses +/- not chevrons | PASS |
| KL-CONTENT-001 | No LLM words | PASS |
| KL-CONTENT-005 | All conditions visible | PASS |
| KL-CONTENT-006 | No "Learn More" CTAs | PASS |

---

## Component Details

### ConfirmationBanner

```typescript
interface ConfirmationBannerProps {
  status: 'confirmed' | 'forming' | 'not-running';
  currentParticipants: number;
  threshold: number;
}
```

- State-colored left border (4px)
- Reuses ThresholdProgressBar
- Dynamic text per status

### SpeciesSection

```typescript
interface SpeciesSectionProps {
  groups: {
    level: 'primary' | 'secondary' | 'opportunistic';
    species: { name: string; scientificName?: string }[];
  }[];
}
```

- Sorted by level (primary first)
- Collapsible opportunistic group
- LikelihoodBadge with visual indicators

### LogisticsSection

```typescript
interface LogisticsSectionProps {
  items: {
    icon: 'group' | 'fitness' | 'included' | 'policy' | 'time' | 'location';
    label: string;
    value: string;
    details?: string[];
  }[];
}
```

- Custom SVG icons (inline, not library)
- Details as optional bullet list

### CommitmentCard

```typescript
interface CommitmentCardProps {
  status: 'confirmed' | 'forming' | 'not-running';
  price: number;
  priceNote?: string;
  currentParticipants: number;
}
```

- State-aware CTA text and disabled state
- Price in mono font
- Commitment explanation text

### FAQAccordion

```typescript
interface FAQAccordionProps {
  items: { question: string; answer: string }[];
}
```

- Single open item at a time
- +/- indicators (not chevrons)
- Keyboard accessible

---

## Routing Integration

| Route | Status |
|-------|--------|
| `/` | Working (Home) |
| `/tours` | Working (Tours Index) |
| `/tours/[id]` | Working (New) |
| `/operators/[id]` | Not implemented (links present) |
| `/how-it-works` | Not implemented (future) |

Breadcrumb navigation: Home > Tours > [Tour Name]

---

## Accessibility

| Feature | Implementation |
|---------|----------------|
| Status announcement | `role="status"` + `aria-live="polite"` on banner |
| Breadcrumb | `aria-label="Breadcrumb"` + `aria-current="page"` |
| FAQ accordion | `aria-expanded` on buttons |
| Focus states | All interactive elements |
| Icon accessibility | `aria-hidden="true"` on decorative icons |

---

## Token Usage

All styling uses CSS custom properties:
- Colors: `--color-*`
- Spacing: `--space-*`
- Typography: `--text-*`, `--font-*`
- Radii: `--radius-*`
- Shadows: `--shadow-*`
- Transitions: `--transition-*`

No hardcoded values.

---

```
APPROVED_BY: orchestrator
APPROVED_DATE: 2026-01-20
NEXT_ACTIONS:
  1. Begin OPERATOR-PROFILE-IA-001 (Information Architecture for Operator Profile page)
  2. Continue Phase 1: Operator Public Profile is the final page
```
