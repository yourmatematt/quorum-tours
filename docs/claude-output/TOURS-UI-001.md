# TOURS-UI-001 — Tours Index Page Implementation

```
STATUS: APPROVED
TASK_ID: TOURS-UI-001
TASK: Implement Tours Index page per TOURS-IA-001 specification
ASSIGNED_AGENT: frontend-implementer
REPORTS_TO: orchestrator
APPROVED_BY: orchestrator
APPROVED_DATE: 2026-01-20
INPUTS_USED:
  - docs/claude-output/TOURS-IA-001.md
  - docs/wireframes.md
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/kill-list-base.json
  - src/components/TourCard.tsx (extended)
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
  - GATE-KILL-LIST
  - GATE-TLS (ADVISORY: TourCard 25 vs target 20)
  - GATE-INTEGRATION-ROUTING
  - GATE-VISUAL-QA
  - GATE-A11Y-BASELINE
  - GATE-CODE-REVIEW
EVIDENCE:
  screenshots:
    - artifacts/screenshots/tours__desktop__full.png
    - artifacts/screenshots/tours__desktop__fold.png
    - artifacts/screenshots/tours__mobile__fold.png
    - artifacts/screenshots/tours__mobile__mid.png
    - artifacts/screenshots/tours__desktop__filtered.png
  a11y:
    - artifacts/a11y/tours__a11y.md
    - artifacts/a11y/tours__focus__dropdown.png
    - artifacts/a11y/tours__focus__card.png
    - artifacts/a11y/tours__focus__chip-remove.png
  console:
    - artifacts/reports/tours__console.txt
  reports:
    - artifacts/reports/tours__code-review.md
  deliverables:
    - docs/claude-output/TOURS-UI-001-VISUAL-QA.md
    - docs/claude-output/TOURS-UI-001-A11Y.md
    - docs/claude-output/TOURS-UI-001-CODE-REVIEW.md
FAIL_REASONS: NONE
OUTPUT:
```

## Implementation Summary

### Page Created

| Route | File | Purpose |
|-------|------|---------|
| `/tours` | `src/app/tours/page.tsx` | Tours Index page |

### Components Created

| Component | File | Purpose |
|-----------|------|---------|
| FilterChip | `src/components/ui/FilterChip.tsx` | Removable active filter indicator |
| FilterDropdown | `src/components/ui/FilterDropdown.tsx` | Single-select filter control |
| EmptyState | `src/components/ui/EmptyState.tsx` | No-results state with suggestions |
| GlobalNav | `src/components/GlobalNav.tsx` | Site-wide navigation bar |

### Components Extended

| Component | File | Change |
|-----------|------|--------|
| TourCard | `src/components/TourCard.tsx` | Added optional `speciesHighlight` prop |

### Files Modified

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Added GlobalNav import and render |
| `src/components/index.ts` | Added exports for new components |

---

## Section Implementation Details

### Section 1: Page Header

- H1 left-aligned: "Available Tours"
- Context line: Explains comparison purpose
- No hero image or marketing

### Section 2: Filtering & Sorting Controls

**Filters Implemented:**
- Status: All / Confirmed / Forming / Not Running
- Region: All / VIC / NSW / QLD / SA / WA / TAS

**Sort Options:**
- Soonest first (default)
- Most confirmed
- Nearest threshold

**UI Details:**
- Horizontal filter bar with dropdowns
- Active filters shown as removable chips
- "Clear all" link when multiple filters active

### Section 3: Tours List

- Responsive grid: 1 col (mobile) / 2 col (tablet) / 3 col (desktop)
- TourCard reused from Home page
- Extended with `speciesHighlight` prop
- 8 example tours with varied states and regions

### Section 4: Aggregate Signals

- Results count with status breakdown
- "X tours · Y confirmed · Z forming"
- aria-live region for screen reader updates

### Section 5: Empty State

- Shown when no tours match filters
- Title, description, suggestions list
- Clear filters action button
- No sad illustrations

### Section 6: Load More

- "Showing X of Y tours" indicator
- Load more button (appears when 6+ results)
- No infinite scroll

---

## Data Model (Example Tours)

```typescript
interface Tour {
  id: string;
  title: string;
  operatorName: string;
  status: 'confirmed' | 'forming' | 'not-running';
  currentParticipants: number;
  threshold: number;
  date: string;
  location: string;
  region: string;
  speciesHighlight: string;
}
```

8 example tours included covering:
- All 3 status types
- 6 regions
- Various threshold progress levels
- Species highlights

---

## Kill-List Compliance

| Rule | Implementation | Status |
|------|----------------|--------|
| KL-LAYOUT-001 | 3-column max grid | PASS |
| KL-LAYOUT-004 | All text left-aligned | PASS |
| KL-COMP-001 | No lift+shadow hover | PASS |
| KL-CONTENT-001 | No LLM words | PASS |
| KL-CONTENT-005 | Progress visible | PASS |
| KL-CONTENT-006 | No "Learn More" | PASS |

---

## Component Details

### FilterChip

```typescript
interface FilterChipProps {
  label: string;
  onRemove: () => void;
}
```

- Pill-shaped with × button
- Keyboard accessible remove
- Focus states defined

### FilterDropdown

```typescript
interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}
```

- Click-outside to close
- Keyboard navigation (native select behavior)
- Selected option highlighted
- Chevron rotation on open

### EmptyState

```typescript
interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  suggestions?: string[];
}
```

- Centered layout (appropriate for empty state)
- Simple icon (not sad illustration)
- Actionable suggestions
- Optional CTA button

### GlobalNav

- Persistent across all pages
- Active state based on pathname
- Responsive horizontal layout
- Links: Home, Tours, How It Works, Operators

---

## Routing Integration

| Route | Status |
|-------|--------|
| `/` | Working (Home) |
| `/tours` | Working (New) |
| `/tours/[id]` | Not implemented (future) |
| `/how-it-works` | Not implemented (future) |
| `/operators` | Not implemented (future) |

GlobalNav links to all routes. Future pages will show 404 until implemented.

---

## Accessibility

| Feature | Implementation |
|---------|----------------|
| Focus states | All interactive elements |
| aria-live | Results count region |
| aria-label | Filter remove buttons |
| aria-haspopup | Dropdowns |
| aria-expanded | Dropdown open state |
| aria-current | Active nav link |

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
COMPLETED_ACTIONS:
  1. visual-qa: GATE-VISUAL-QA PASS (2026-01-20)
  2. a11y-auditor: GATE-A11Y-BASELINE PASS (2026-01-20)
  3. code-reviewer: GATE-CODE-REVIEW PASS (2026-01-20)
  4. orchestrator: APPROVED (2026-01-20)

NEXT_TASK: TOURS-DETAIL-001 (Tour Detail page)
```
