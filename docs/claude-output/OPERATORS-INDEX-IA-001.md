# OPERATORS-INDEX-IA-001 — Operators Index Page Information Architecture

```
STATUS: APPROVED
TASK_ID: OPERATORS-INDEX-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Operators Index page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
APPROVED_BY: orchestrator
APPROVED_DATE: 2026-01-20
INPUTS_USED:
  - src/app/tours/page.tsx (pattern reference)
  - docs/claude-output/OPERATOR-PROFILE-IA-001.md
  - src/app/operators/[id]/page.tsx (data model reference)
  - src/components/OperatorPreviewCard.tsx (existing component)
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/kill-list-base.json
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE1-DISCOVERY
GATES_PASSED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE1-DISCOVERY
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## Operators Index Page — Detailed IA Specification

### Primary Job

Serve as a discovery surface for verified tour operators. Users arrive to evaluate who runs tours on Quorum before committing to specific tours. Every operator listing must provide enough information to assess credibility at a glance, with clear pathways to full profiles.

### User Entry Points

1. GlobalNav: Click "Operators" link (currently broken — points to /tours)
2. Tour Detail: Click "See all tours by [Operator]"
3. Home page: Future "Browse operators" link
4. Direct link: Shared URL or search engine

### Page Structure Philosophy

This is a **discovery and comparison surface**. Users need to:
- Quickly scan available operators
- Filter by region or specialization
- Compare credibility signals (verification, reviews, track record)
- Navigate to full profiles for deeper evaluation

The page answers: "Who are the guides I can book tours with?"

---

## Section 1: Page Header

**Target TLS:** < 18 (direct, informational)

**Intent:**
- Clear page purpose
- No marketing language
- Set expectation for what users will find

**Structure:**
- H1 page title
- Subtitle explaining page purpose
- No breadcrumb (top-level page)

**Content:**
```
H1: "Tour Operators"
Subtitle: "Meet the guides running tours on Quorum. Filter by region or specialization to find operators in your area."
```

**Anti-Template Requirements:**
- NO "Find your perfect guide"
- NO "Expert guides ready to help"
- NO marketing superlatives
- Factual, direct language only

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| PageHeader | Title + subtitle container |

---

## Section 2: Filter & Sort Controls

**Target TLS:** < 15 (functional, minimal)

**Intent:**
- Enable refinement of operator list
- Consistent with Tours Index filter pattern
- Clear active state indication

**Structure:**
- Filter row with dropdowns
- Active filter chips (dismissible)
- Sort dropdown
- Results count

**Filter Options:**

| Filter | Options |
|--------|---------|
| Region | All regions, Victoria, New South Wales, Queensland, South Australia, Western Australia, Tasmania, Northern Territory, ACT |
| Specialization | All specializations, Shorebirds, Wetlands, Rainforest, Pelagic, Raptors, Grasslands, Nocturnal |

**Sort Options:**

| Value | Label | Description |
|-------|-------|-------------|
| name | Alphabetical | A-Z by name (default) |
| reviews | Most reviewed | Total review count descending |
| tours | Most active | Active tour count descending |
| rating | Highest rated | Average rating descending |

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| FilterControls | Container for filter row |
| FilterDropdown | Reuse from Tours Index |
| FilterChip | Reuse from Tours Index |
| SortDropdown | Sort options |
| ResultsCount | "X operators" display |

---

## Section 3: Operators Grid

**Target TLS:** < 20 (card section, consistent)

**Intent:**
- Scannable operator cards
- Key credibility signals visible
- Clear link to full profile

**Structure:**
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- OperatorCard for each operator
- Cards link to /operators/[id]

**Card Information (Enhanced OperatorPreviewCard):**

| Element | Purpose |
|---------|---------|
| Photo | Real photo (or initial fallback) |
| Name | Operator's full name |
| Verified badge | If verified |
| Expertise | Primary specialization |
| Location | Region served |
| Stats row | Reviews count, Tours completed |
| Arrow | Navigation indicator |

**Data Requirements (per card):**
```typescript
interface OperatorListItem {
  id: string;
  slug: string;
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  region: string; // for filtering
  specializations: string[]; // for filtering
  totalReviews: number;
  averageRating: number;
  toursCompleted: number;
  activeTourCount: number;
}
```

**Anti-Template Requirements:**
- NO lift+shadow hover (KL-COMP-001)
- NO generic icons in row of 4 (KL-COMP-002)
- Cards use border-color change on hover (consistent with existing)

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| OperatorsGrid | Grid container |
| OperatorCard | Enhanced card for listing |

---

## Section 4: Aggregate Stats

**Target TLS:** < 15 (data, factual)

**Intent:**
- Provide context for platform scale
- Build trust through transparency
- No vanity metrics

**Structure:**
- Inline with filter controls (like Tours Index)
- Shows count with filter context

**Display Format:**
```
[X] operators [· Y verified] [· Z total tours run]
```

**Anti-Template Requirements:**
- NO "Join thousands of birders"
- Factual counts only
- Numbers visible, not hidden

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| AggregateStats | Inline stats display |

---

## Section 5: Empty State

**Target TLS:** < 15 (helpful, actionable)

**Intent:**
- Clear feedback when filters return nothing
- Actionable suggestions
- Easy path to broaden search

**Structure:**
- Icon or illustration (not Undraw)
- Clear message
- Suggestions list
- "Clear filters" action

**Content:**
```
Title: "No operators match your filters"
Description: "Try adjusting your filters to see more operators."
Suggestions:
- Select a different region
- Choose a different specialization
- View all operators
Action: "Clear all filters"
```

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| EmptyState | Reuse from Tours Index |

---

## Full Component Inventory (Operators Index Page)

| Component | New/Reuse | Key Differentiation |
|-----------|-----------|---------------------|
| PageHeader | New (simple) | H1 + subtitle |
| FilterControls | Reuse pattern | Adapted filters |
| FilterDropdown | Reuse | From Tours Index |
| FilterChip | Reuse | From Tours Index |
| OperatorsGrid | New | Grid container |
| OperatorCard | New | Enhanced preview card |
| EmptyState | Reuse | From Tours Index |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Single card grid section only |
| KL-LAYOUT-004 | PASS | All text left-aligned |
| KL-COMP-001 | PASS | No lift+shadow hover on cards |
| KL-COMP-002 | PASS | No 4-icon row |
| KL-COMP-005 | PASS | No carousel |
| KL-CONTENT-001 | PASS | No LLM words |
| KL-CONTENT-004 | PASS | Specific filters, not generic |
| KL-CONTENT-006 | PASS | No "Learn More" buttons |
| KL-IMAGE-001 | PASS | No Undraw illustrations |
| KL-TRUST-002 | PASS | No generic testimonials on index |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Page Header | Copy | < 18 |
| Filter Controls | Functional | < 15 |
| Operators Grid | Cards | < 20 |
| Aggregate Stats | Data | < 15 |
| Empty State | Copy | < 15 |

---

## Page Layout Structure

```
+---------------------------------------+
| GlobalNav                             |
+---------------------------------------+
|                                       |
| PAGE HEADER                           |
| H1: Tour Operators                    |
| Subtitle text...                      |
|                                       |
+---------------------------------------+
| FILTER & SORT CONTROLS                |
| +-----------------------------------+ |
| | [Region v] [Specialization v]     | |
| | [Sort: Alphabetical v]            | |
| | [Active chips...] | X operators   | |
| +-----------------------------------+ |
+---------------------------------------+
|                                       |
| OPERATORS GRID                        |
| +----------+ +----------+ +----------+|
| |Operator 1| |Operator 2| |Operator 3||
| |Photo     | |Photo     | |Photo     ||
| |Name [v]  | |Name [v]  | |Name      ||
| |Expertise | |Expertise | |Expertise ||
| |Location  | |Location  | |Location  ||
| |4.8 · 23  | |4.5 · 12  | |4.9 · 45  ||
| +----------+ +----------+ +----------+|
| +----------+ +----------+ +----------+|
| |Operator 4| |Operator 5| |Operator 6||
| ...                                   |
|                                       |
+---------------------------------------+
| LOAD MORE (if applicable)             |
+---------------------------------------+
```

Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column

---

## Integration Requirements

### Navigation Fix Required

**Current Issue:** Operator Profile breadcrumb links to `/tours` instead of `/operators`

**Location:** `src/app/operators/[id]/page.tsx` line 372-374

**Current Code:**
```tsx
<a href="/tours" className="...">
  Operators
</a>
```

**Required Fix:**
```tsx
<a href="/operators" className="...">
  Operators
</a>
```

This fix should be applied during implementation of the Operators Index page.

### Routing

| Route | Page |
|-------|------|
| `/operators` | Operators Index (new) |
| `/operators/[id]` | Operator Profile (existing) |

### Cross-Page Consistency

- OperatorCard uses same photo display as OperatorPreviewCard
- VerificationBadge consistent across all operator displays
- Filter pattern matches Tours Index
- Card hover behavior matches TourCard (border change, not lift+shadow)

### GlobalNav Update

Add "Operators" link to GlobalNav pointing to `/operators`

---

## Data Requirements (Full Page)

```typescript
interface OperatorListItem {
  id: string;
  slug: string;
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  region: string;
  specializations: string[];
  totalReviews: number;
  averageRating: number;
  toursCompleted: number;
  activeTourCount: number;
}

// Filter state
interface OperatorFilters {
  region: string; // 'all' | region code
  specialization: string; // 'all' | specialization key
  sortBy: 'name' | 'reviews' | 'tours' | 'rating';
}

// Aggregate stats
interface OperatorStats {
  total: number;
  verified: number;
  totalToursRun: number;
}
```

---

## Example Operators Data

Based on existing operator profiles:

```typescript
const operators: OperatorListItem[] = [
  {
    id: 'sarah-mitchell',
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    photo: undefined,
    verified: true,
    expertise: 'Wetland and waterbird specialist',
    location: 'Melbourne, Victoria',
    region: 'vic',
    specializations: ['wetlands', 'shorebirds'],
    totalReviews: 4,
    averageRating: 4.8,
    toursCompleted: 47,
    activeTourCount: 1,
  },
  {
    id: 'david-chen',
    slug: 'david-chen',
    name: 'David Chen',
    photo: undefined,
    verified: true,
    expertise: 'Shorebird identification specialist',
    location: 'Cairns, Queensland',
    region: 'qld',
    specializations: ['shorebirds', 'pelagic'],
    totalReviews: 2,
    averageRating: 4.5,
    toursCompleted: 23,
    activeTourCount: 1,
  },
  // Additional operators for demo variety
  {
    id: 'maria-santos',
    slug: 'maria-santos',
    name: 'Maria Santos',
    photo: undefined,
    verified: false,
    expertise: 'Rainforest endemic specialist',
    location: 'Cairns, Queensland',
    region: 'qld',
    specializations: ['rainforest'],
    totalReviews: 0,
    averageRating: 0,
    toursCompleted: 3,
    activeTourCount: 1,
  },
  {
    id: 'james-wilson',
    slug: 'james-wilson',
    name: 'James Wilson',
    photo: undefined,
    verified: true,
    expertise: 'Mallee woodland specialist',
    location: 'Mildura, Victoria',
    region: 'vic',
    specializations: ['grasslands'],
    totalReviews: 8,
    averageRating: 4.6,
    toursCompleted: 31,
    activeTourCount: 1,
  },
  {
    id: 'emily-roberts',
    slug: 'emily-roberts',
    name: 'Emily Roberts',
    photo: undefined,
    verified: true,
    expertise: 'Alpine and highland specialist',
    location: 'Sydney, New South Wales',
    region: 'nsw',
    specializations: ['grasslands', 'raptors'],
    totalReviews: 12,
    averageRating: 4.9,
    toursCompleted: 56,
    activeTourCount: 1,
  },
  {
    id: 'tom-baker',
    slug: 'tom-baker',
    name: 'Tom Baker',
    photo: undefined,
    verified: true,
    expertise: 'Kimberley endemic specialist',
    location: 'Broome, Western Australia',
    region: 'wa',
    specializations: ['grasslands', 'wetlands'],
    totalReviews: 6,
    averageRating: 4.7,
    toursCompleted: 19,
    activeTourCount: 1,
  },
  {
    id: 'lucy-chen',
    slug: 'lucy-chen',
    name: 'Lucy Chen',
    photo: undefined,
    verified: true,
    expertise: 'Tasmanian endemic specialist',
    location: 'Hobart, Tasmania',
    region: 'tas',
    specializations: ['rainforest'],
    totalReviews: 15,
    averageRating: 4.9,
    toursCompleted: 42,
    activeTourCount: 1,
  },
];
```

---

## Accessibility Requirements

- Page title: "Tour Operators — Quorum Tours"
- Filter dropdowns have proper labels
- Grid uses semantic list (ul/li) or role="list"
- Cards are focusable links
- Active filter chips are keyboard dismissible
- Results count uses aria-live="polite"
- Empty state is announced to screen readers

---

## Responsive Behavior

| Viewport | Grid Columns | Card Layout |
|----------|--------------|-------------|
| Desktop (1024px+) | 3 columns | Full card |
| Tablet (768-1023px) | 2 columns | Full card |
| Mobile (<768px) | 1 column | Full card |

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| OperatorCard | `src/components/ui/OperatorCard.tsx` | Enhanced listing card |

## Components to Reuse

| Component | From | Usage |
|-----------|------|-------|
| FilterDropdown | Tours Index | Region/specialization filters |
| FilterChip | Tours Index | Active filter display |
| EmptyState | Tours Index | No results state |
| Button | UI components | Load more |

---

```
NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. If approved: frontend-implementer receives OPERATORS-INDEX-UI-001 task
  3. Implementation must include breadcrumb fix in operator profile page
  4. visual-qa to capture evidence after implementation
  5. a11y-auditor to run baseline checks after implementation
```
