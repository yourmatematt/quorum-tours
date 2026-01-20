# TOURS-IA-001 — Tours Index Page Information Architecture

```
STATUS: READY_FOR_REVIEW
TASK_ID: TOURS-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Tours Index page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/wireframes.md
  - docs/claude-output/HOME-IA-001.md
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/tls-component-rubrics.md
  - claude/protocols/kill-list-base.json
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE1-DISCOVERY
GATES_PASSED:
  - GATE-MSG-STRICT
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## Tours Index Page — Detailed IA Specification

### Primary Job

Allow users to evaluate tours without guesswork. Every tour's confirmation state, threshold progress, and key attributes must be immediately comparable. The page serves expert decision-making, not browsing entertainment.

### User Entry Points

1. Navigation: "Tours" in global nav
2. Home page: "Browse Available Tours" CTA
3. Direct link / search engine

### Page Structure Philosophy

This is a **comparison surface**, not a catalog. Users arrive to make decisions. Every element must support:
- Quick scanning of confirmation states
- Attribute comparison across tours
- Confidence assessment before clicking through

---

## Section 1: Page Header

**Target TLS:** < 15 (minimal header)

**Intent:**
- Establish page context with minimal distraction
- Provide aggregate insight immediately
- No marketing or persuasion

**Structure:**
- Left-aligned page title (not centered)
- Aggregate stat: "X tours currently forming" or similar
- Brief context line: what users can do here

**Anti-Template Requirements:**
- NO hero image or large visual
- NO marketing headline
- NO centered layout
- Minimal vertical space

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| PageTitle | H1, left-aligned, display font |
| AggregateIndicator | "X tours forming, Y confirmed" |
| PageContext | Single line explaining page purpose |

---

## Section 2: Filtering & Sorting Controls

**Target TLS:** < 15 (utility, not decoration)

**Intent:**
- Enable species-driven, timing-driven, and confidence-driven filtering
- Controls available but not dominant
- Support refinement without overwhelming

**Structure:**
- Horizontal filter bar (desktop) / collapsible (mobile)
- Primary filters: Confirmation status, Location/Region, Date range
- Secondary filters: Species type (expandable)
- Sort options: Soonest, Most confirmed, Recently added
- Active filters shown as removable chips

**Filter Categories:**
1. **Confirmation Status** (primary)
   - All tours
   - Confirmed only
   - Forming (near threshold)
   - Needs interest

2. **Timing** (primary)
   - Date range selector
   - "Next 30 days" / "Next 90 days" quick filters

3. **Region** (primary)
   - Geographic regions, not individual locations
   - Multi-select supported

4. **Species Focus** (secondary, collapsible)
   - Bird families or habitat types
   - Not individual species (too granular)

**Anti-Template Requirements:**
- NO prominent search bar as primary interaction
- NO filter counts that create urgency
- NO auto-submit on every change (apply button for complex filters)
- Filters are tools, not persuasion

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| FilterBar | Horizontal container, responsive collapse |
| FilterDropdown | Single-select or multi-select options |
| FilterChip | Active filter, removable |
| SortDropdown | Sort order selection |
| FilterToggle | Mobile expand/collapse |
| ApplyFiltersButton | Explicit filter application |

---

## Section 3: Tours List (Primary Surface)

**Target TLS:** < 20

**Intent:**
- Structured cards with comparable attributes
- Confirmation state always visible and dominant
- Enable quick scanning without clicking through

**Structure:**
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop max)
- Card order: by selected sort (default: confirmed first, then by date)
- Each card shows all decision-critical information

**Card Anatomy (Top to Bottom):**
1. **Confirmation Status Badge** — Most prominent element
2. **Tour Title** — Display font, links to detail
3. **Operator Name** — Secondary text, links to operator profile
4. **Date & Location** — Metadata line
5. **Threshold Progress** — Visual bar + count ("X of Y birders")
6. **Species Highlight** — Primary target species (1-2 max)

**Card States:**
| State | Visual Treatment |
|-------|------------------|
| Confirmed | Green badge, full progress bar, solid border |
| Forming (>50%) | Orange badge, partial progress, standard border |
| Forming (<50%) | Orange badge, partial progress, subtle border |
| Not Running | Gray badge, explanation text, muted colors |

**Anti-Template Requirements:**
- NO lift+shadow hover (use border color change + internal transitions)
- NO uniform 4-column grid
- NO urgency indicators ("Only X spots left!")
- NO fake scarcity
- Participant count is outcome-focused ("X birders committed") not slot-focused ("X/Y spots")

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| TourCard | Reuse from Home page, extended for listing context |
| ConfirmationStatusBadge | Distinct styling per state |
| ThresholdProgressBar | Thick, calm, non-urgent |
| TourMetadata | Date, location, species highlight |
| CardGrid | Responsive layout container |

---

## Section 4: Aggregate Signals

**Target TLS:** < 15

**Intent:**
- Group-level indicators only
- No individual exposure or ranking
- Help users understand the overall landscape

**Structure:**
- Subtle bar or inline display above or within filter area
- Shows: Total tours matching filters, breakdown by status
- Updates when filters change

**Signals Displayed:**
- "Showing X tours" (total matching filters)
- "Y confirmed, Z forming" (status breakdown)
- No ranking, scoring, or popularity metrics

**Anti-Template Requirements:**
- NO "trending" or "popular" labels
- NO user counts on individual tours beyond threshold progress
- NO social proof badges ("50 people viewing")
- Aggregate only, never individual

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ResultsCount | Total matching current filters |
| StatusBreakdown | Confirmed / forming summary |
| FilterSummary | Text describing active filters |

---

## Section 5: Empty / No-Match States

**Target TLS:** < 12 (simple, helpful)

**Intent:**
- Explain why nothing is shown
- Offer refinement paths
- Never dead-end the user

**Empty State Scenarios:**

1. **No tours match filters**
   - "No tours match your current filters"
   - Show which filters are active
   - Suggest: Broaden date range, remove region filter, etc.
   - Offer: Clear all filters button

2. **No tours in system** (edge case)
   - "Tours are added regularly"
   - Suggest: Check back, or express interest in a region

3. **All tours completed/past**
   - "These tours have already run"
   - Offer: View upcoming tours only

**Anti-Template Requirements:**
- NO sad illustrations or mascots
- NO marketing upsell in empty states
- Helpful and actionable, not apologetic

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| EmptyState | Container with icon, message, actions |
| RefinementSuggestion | Specific filter adjustment suggestion |
| ClearFiltersButton | Reset to default view |

---

## Section 6: Load More / Pagination

**Target TLS:** < 10 (invisible utility)

**Intent:**
- Handle large result sets without overwhelming
- User controls pace of content loading

**Structure:**
- "Load more" button (preferred over pagination)
- Shows: "Showing X of Y tours"
- No infinite scroll (user must choose to load more)

**Anti-Template Requirements:**
- NO pagination with page numbers for < 50 results
- NO auto-loading infinite scroll
- User maintains control

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| LoadMoreButton | Explicit load action |
| ResultsProgress | "Showing X of Y" indicator |

---

## Full Component Inventory (Tours Index Page)

| Component | TLS Category | Key Differentiation |
|-----------|--------------|---------------------|
| PageTitle | Typography | H1, left-aligned, display font |
| AggregateIndicator | Proof | Total stats, not urgency |
| FilterBar | Layout | Horizontal, responsive collapse |
| FilterDropdown | Interaction | Clear states, no auto-submit |
| FilterChip | DNA | Removable, clear indication |
| SortDropdown | Interaction | Explicit sort selection |
| TourCard | Interaction | State-aware, no lift+shadow |
| ConfirmationStatusBadge | DNA | Distinct per state |
| ThresholdProgressBar | DNA | Thick, calm |
| TourMetadata | Copy | Date, location, species |
| CardGrid | Layout | Responsive, not uniform 4-col |
| ResultsCount | Copy | Total matching filters |
| StatusBreakdown | Proof | Confirmed/forming summary |
| EmptyState | Layout | Helpful, actionable |
| RefinementSuggestion | Copy | Specific adjustment suggestion |
| LoadMoreButton | Interaction | Explicit load action |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Grid is max 3 columns, not consecutive card sections |
| KL-LAYOUT-004 | PASS | No centered long text |
| KL-COMP-001 | PASS | No lift+shadow hover |
| KL-COMP-002 | PASS | No row of 4 default icons |
| KL-CONTENT-001 | PASS | No LLM words in any text |
| KL-CONTENT-004 | PASS | Specific attributes, not generic value props |
| KL-CONTENT-005 | PASS | Threshold progress visible, no hidden mechanics |
| KL-CONTENT-006 | PASS | No "Learn More" CTAs |
| KL-TRUST-001 | PASS | No grayscale logo wall |
| KL-TRUST-002 | PASS | No generic testimonials |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Page Header | Minimal | < 15 |
| Filter Controls | Utility | < 15 |
| Tours List | Cards | < 20 |
| Aggregate Signals | Proof | < 15 |
| Empty States | Layout | < 12 |
| Load More | Utility | < 10 |

---

## Integration Requirements

### Navigation
- "Tours" in global nav links here
- Breadcrumb: Home > Tours

### Routing
- Base route: `/tours`
- With filters: `/tours?status=confirmed&region=vic`
- Filters should be URL-persisted for shareability

### Cross-Page Consistency
- TourCard component reused from Home page
- ConfirmationStatusBadge identical across site
- ThresholdProgressBar identical across site

---

## Accessibility Requirements

- Filter controls keyboard-accessible
- Clear focus states on all interactive elements
- Results count announced on filter changes (aria-live)
- Cards are links (entire card clickable)
- Empty states are informative, not just decorative

---

```
NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. If approved: frontend-implementer receives TOURS-UI-001 task
  3. visual-qa to capture evidence after implementation
  4. a11y-auditor to run baseline checks after implementation
```
