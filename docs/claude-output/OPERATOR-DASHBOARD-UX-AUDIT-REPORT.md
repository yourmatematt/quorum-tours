# Operator Dashboard UI/UX Audit Report
**Generated:** 2026-01-23
**Scope:** `/operator` section - All pages and components
**Methodology:** UI/UX Pro Max + Modern Dashboard Best Practices

---

## Executive Summary

The Quorum Tours operator dashboard demonstrates **solid architectural foundations** with a consistent component pattern, but requires optimization in **7 critical areas** to meet modern dashboard UX standards:

### Overall Score: 68/100

| Category | Score | Status |
|----------|-------|--------|
| Information Architecture | 75/100 | 🟡 Good |
| Component Reusability | 80/100 | 🟢 Strong |
| Responsive Design | 55/100 | 🔴 Needs Work |
| Accessibility | 60/100 | 🟡 Moderate |
| Visual Hierarchy | 70/100 | 🟡 Good |
| Data Density | 65/100 | 🟡 Moderate |
| Navigation Patterns | 85/100 | 🟢 Strong |

---

## 1. Layout Structure Analysis

### Current Implementation

**Components:**
- `OperatorSidebar` - Fixed left sidebar (256px width)
- `DashboardViewContainer` - Max-width container system
- `DashboardViewHeader` - Fixed header pattern
- `DashboardScrollArea` - Scrollable content region

### ✅ Strengths

1. **Consistent Container Pattern**
   - Clear separation between fixed/scrollable regions
   - Reusable container components with configurable widths
   - Good semantic structure

2. **Fixed Sidebar Navigation**
   - Always accessible navigation (src/components/operator/OperatorSidebar.tsx:42)
   - Active state indication with visual feedback
   - Clean icon + label pattern

3. **Component Composition**
   - Smart composition with `DashboardViewContainer` > `DashboardViewHeader` > `DashboardScrollArea`
   - Reduces layout bugs and inconsistencies

### 🔴 Critical Issues

#### Issue 1.1: No Responsive Sidebar Strategy
**Location:** `src/app/operator/layout.tsx:8-18`

**Problem:**
```tsx
<div className="h-screen bg-[var(--color-surface-sunken)] flex overflow-hidden">
  <OperatorSidebar />  {/* Fixed 256px width - no mobile handling */}
  <main className="ml-64 flex-1 h-screen overflow-y-auto">
```

**Impact:** Dashboard completely broken on mobile/tablet (< 1024px)

**Recommendation:**
```tsx
// Implement hamburger menu + drawer pattern
<div className="h-screen flex overflow-hidden">
  {/* Mobile: Overlay drawer, Desktop: Fixed sidebar */}
  <OperatorSidebar
    isMobile={isMobile}
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  {/* Mobile: Full width, Desktop: With margin */}
  <main className="flex-1 h-screen overflow-y-auto lg:ml-64">
    {/* Mobile: Show hamburger trigger */}
    <div className="lg:hidden p-4">
      <button onClick={() => setSidebarOpen(true)}>
        <Menu className="w-6 h-6" />
      </button>
    </div>
    {children}
  </main>
</div>
```

**Priority:** 🔴 CRITICAL (blocks mobile operators)

---

#### Issue 1.2: Fixed Layout Height Constraints
**Location:** Multiple files with `h-screen` locks

**Problem:**
- `h-screen` prevents natural content flow on short content
- iOS Safari address bar causes layout jumps
- No accommodation for dynamic viewport heights

**Recommendation:**
```tsx
// Use min-h-screen for flexibility
<main className="min-h-screen lg:ml-64 flex-1 overflow-y-auto">
```

**Priority:** 🟡 HIGH

---

## 2. Dashboard Home Analysis

**File:** `src/components/operator/DashboardHome.tsx`

### ✅ Strengths

1. **Clear Information Hierarchy**
   - Welcome message > Stats > Alerts > Activity (line 65-150)
   - Good use of visual weight (icons, cards, spacing)

2. **Contextual Alerts**
   - "Tours Needing Attention" surfaces actionable items (line 109-135)
   - Time-sensitive warnings with countdown

### 🔴 Issues

#### Issue 2.1: Fixed Stats Grid Not Responsive
**Location:** `DashboardHome.tsx:75-84`

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
```

**Problem:**
- 4 columns at 1024px (lg:) is too cramped
- Should use xl: breakpoint (1280px+) for 4 columns
- Mobile (sm:) should be 2 columns, not 1

**Recommendation:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
```

**Priority:** 🟡 MEDIUM

---

#### Issue 2.2: StatCard Missing Hover State
**Location:** `DashboardHome.tsx:12-26`

**Problem:** Cards feel static, no interactive feedback

**Recommendation:**
```tsx
<div className="bg-[var(--color-surface)] ... hover:shadow-[var(--shadow-hover)] hover:border-[var(--color-primary)] transition-all duration-200 cursor-pointer">
```

**Priority:** 🟡 LOW (polish)

---

#### Issue 2.3: Activity Feed Missing Infinite Scroll / Pagination
**Location:** `DashboardHome.tsx:137-170`

**Problem:**
- Hardcoded 3 items
- No "Load More" or pagination
- Will be unusable with real data volume

**Recommendation:**
```tsx
// Add pagination UI
<div className="flex justify-center mt-4">
  <button className="...">Load More Activity</button>
</div>

// Or implement infinite scroll with IntersectionObserver
```

**Priority:** 🟡 MEDIUM

---

## 3. My Tours View Analysis

**File:** `src/components/operator/tours/MyToursView.tsx`

### ✅ Strengths

1. **Comprehensive Filtering**
   - Status filter + search (line 103-130)
   - Smart filter logic with species search
   - Good UX for finding tours quickly

2. **Rich Tour Cards**
   - Excellent information density (metadata, progress, species, actions)
   - Visual status indicators with color coding
   - Contextual action buttons based on tour state

3. **Empty States**
   - Clear empty state messaging (line 185-203)
   - Actionable CTA when no results

### 🔴 Issues

#### Issue 3.1: No Mobile Card Layout
**Location:** `MyToursView.tsx:247-359` (TourCard component)

**Problem:**
- Card layout assumes desktop horizontal space
- Action buttons will wrap awkwardly on mobile
- Metadata row becomes unreadable < 640px

**Recommendation:**
```tsx
// Metadata row - stack on mobile
<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">

// Actions - full width buttons on mobile
<div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
  {actions.map(...)}
</div>
```

**Priority:** 🔴 HIGH

---

#### Issue 3.2: Progress Bar Accessibility
**Location:** `MyToursView.tsx:284-297`

**Problem:**
- No ARIA attributes for screen readers
- Percentage not programmatically exposed
- Color-only status indicator

**Recommendation:**
```tsx
<div
  role="progressbar"
  aria-valuenow={tour.participants_current}
  aria-valuemin={0}
  aria-valuemax={tour.participants_threshold}
  aria-label={`${tour.participants_current} of ${tour.participants_threshold} participants`}
  className="h-2 bg-[var(--color-surface-sunken)] rounded-full overflow-hidden"
>
  <div className="..." style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
</div>
```

**Priority:** 🟡 MEDIUM (WCAG requirement)

---

#### Issue 3.3: Missing Bulk Actions
**Location:** Entire MyToursView component

**Problem:**
- No way to perform bulk operations (duplicate, archive, cancel)
- UX Guidelines violation: "Editing one by one is tedious"

**Recommendation:**
```tsx
// Add checkbox column + bulk action bar
const [selectedTours, setSelectedTours] = useState<string[]>([]);

{selectedTours.length > 0 && (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] border-2 shadow-xl rounded-lg p-4 flex items-center gap-4">
    <span>{selectedTours.length} tours selected</span>
    <button>Duplicate All</button>
    <button>Cancel All</button>
  </div>
)}
```

**Priority:** 🟡 MEDIUM

---

## 4. Bookings Table Analysis

**File:** `src/components/operator/bookings/BookingsView.tsx`

### ✅ Strengths

1. **Data Table Pattern**
   - Clean tabular layout (line 68-121)
   - Sticky header (good UX for long lists)
   - Hover row highlighting

2. **Export Functionality**
   - CSV export button prominently placed (line 56-62)

### 🔴 Issues

#### Issue 4.1: Table Not Responsive
**Location:** `BookingsView.tsx:64-122`

**Problem:**
- Wide table will overflow on mobile
- No mobile card alternative
- UX Guideline: "Tables can overflow on mobile - Use card layout"

**Recommendation:**
```tsx
{/* Desktop: Table */}
<div className="hidden md:block overflow-x-auto">
  <table>...</table>
</div>

{/* Mobile: Card Stack */}
<div className="md:hidden space-y-3">
  {filteredBookings.map(booking => (
    <div className="bg-white border rounded-lg p-4">
      <div className="font-medium">{booking.participant_name}</div>
      <div className="text-sm text-gray-600">{booking.tour_name}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="badge">{booking.status}</span>
        <span className="font-medium">${booking.amount}</span>
      </div>
    </div>
  ))}
</div>
```

**Priority:** 🔴 CRITICAL

---

#### Issue 4.2: Missing Bulk Selection
**Location:** Entire table structure

**Problem:**
- No checkbox column for multi-select
- Can't bulk-email participants or bulk-cancel bookings

**Recommendation:**
```tsx
<th className="px-6 py-4">
  <input
    type="checkbox"
    onChange={handleSelectAll}
    checked={selectedBookings.length === filteredBookings.length}
  />
</th>
```

**Priority:** 🟡 MEDIUM

---

#### Issue 4.3: No Sorting Controls
**Location:** Table header row

**Problem:**
- Headers aren't clickable for sorting
- No visual indicator of sortable columns

**Recommendation:**
```tsx
<th className="px-6 py-4 text-left cursor-pointer hover:bg-gray-50" onClick={() => handleSort('tour_name')}>
  <div className="flex items-center gap-2">
    Tour
    {sortBy === 'tour_name' && (
      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown />
    )}
  </div>
</th>
```

**Priority:** 🟡 MEDIUM

---

## 5. Earnings View Analysis

**File:** `src/components/operator/earnings/EarningsView.tsx`

### ✅ Strengths

1. **Financial Dashboard Pattern**
   - Clear stat cards with trends (line 25-31)
   - Payout history with status badges
   - Revenue breakdown by tour

2. **External Integration CTA**
   - Stripe link for detailed financial data (line 15-21)

### 🔴 Issues

#### Issue 5.1: No Data Visualization
**Location:** Entire view

**Problem:**
- Financial data best shown with charts (line graphs, bar charts)
- Text-only presentation harder to parse trends
- Missing Chart.js / Recharts integration

**Recommendation:**
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

<section>
  <h2>Earnings Trend (Last 6 Months)</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={earningsTrend}>
      <Line type="monotone" dataKey="amount" stroke="var(--color-primary)" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
</section>
```

**Priority:** 🟡 HIGH (improves comprehension)

---

#### Issue 5.2: Time Range Filter Not Functional
**Location:** `EarningsView.tsx:44-50`

**Problem:**
```tsx
<select className="...">
  <option>Last 6 Months</option>  {/* No onChange handler */}
  <option>Last 3 Months</option>
```

**Recommendation:**
```tsx
const [timeRange, setTimeRange] = useState('6-months');

<select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
```

**Priority:** 🟡 MEDIUM

---

## 6. Create Tour Wizard Analysis

**File:** `src/components/operator/tours/CreateTourWizard.tsx`

### ✅ Strengths

1. **Step-by-Step Pattern**
   - Clear progress indicator (line 36-70)
   - Linear flow with validation gates
   - Visual completion checkmarks

2. **Conditional Logic**
   - Tour type (single/multi-day) affects subsequent steps
   - Smart form adaptation

### 🔴 Issues

#### Issue 6.1: Progress Indicator Not Mobile-Friendly
**Location:** `CreateTourWizard.tsx:40-70`

**Problem:**
- 6 steps displayed horizontally will overflow on mobile
- Step descriptions hidden on `md:` only
- No condensed mobile view

**Recommendation:**
```tsx
{/* Mobile: Simplified indicator */}
<div className="md:hidden mb-6">
  <div className="text-center">
    <span className="text-lg font-medium">Step {currentStep} of {STEPS.length}</span>
    <p className="text-sm text-gray-600 mt-1">{STEPS[currentStep - 1].name}</p>
  </div>
  <div className="h-2 bg-gray-200 rounded-full mt-3">
    <div
      className="h-full bg-primary rounded-full transition-all"
      style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
    />
  </div>
</div>

{/* Desktop: Full step indicator */}
<div className="hidden md:flex items-center justify-between mb-8">
  {/* Existing code */}
</div>
```

**Priority:** 🟡 HIGH

---

#### Issue 6.2: No Form Validation Feedback
**Location:** All step components (OverviewStep, PricingStep, etc.)

**Problem:**
- Input fields have no validation states (error, success)
- No inline error messages
- Required field indicators (`*`) but no enforcement

**Recommendation:**
```tsx
// Add validation state
const [errors, setErrors] = useState<Record<string, string>>({});

<div>
  <label>Tour Title *</label>
  <input
    className={cn(
      "w-full px-4 py-3 border-2 rounded",
      errors.title ? "border-red-500" : "border-gray-300"
    )}
    aria-invalid={!!errors.title}
    aria-describedby={errors.title ? "title-error" : undefined}
  />
  {errors.title && (
    <p id="title-error" className="text-sm text-red-600 mt-1">
      {errors.title}
    </p>
  )}
</div>
```

**Priority:** 🔴 HIGH (prevents bad data)

---

#### Issue 6.3: No Save Draft Functionality
**Location:** Entire wizard flow

**Problem:**
- User must complete all steps in one session
- No way to save partial progress
- Risk of data loss if browser crashes

**Recommendation:**
```tsx
// Add auto-save to localStorage
useEffect(() => {
  const draftData = {
    currentStep,
    tourType,
    formData: { /* ... */ }
  };
  localStorage.setItem('tour-draft', JSON.stringify(draftData));
}, [currentStep, tourType, /* ...dependencies */]);

// Show "Resume Draft" banner on mount
{hasDraft && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
    <p>You have an unsaved draft. <button>Resume</button> or <button>Discard</button></p>
  </div>
)}
```

**Priority:** 🟡 MEDIUM

---

## 7. Cross-Cutting Concerns

### 7.1 Accessibility Issues

#### Missing ARIA Landmarks
**Locations:** All views

**Problem:**
- No `<nav role="navigation">` on sidebar
- No `<main role="main">` wrapper
- No `<search role="search">` on filter forms

**Fix:**
```tsx
// OperatorSidebar.tsx
<nav role="navigation" aria-label="Operator Dashboard Navigation">

// DashboardViewContainer.tsx
<main role="main" aria-label={`${title} view`}>

// Filter sections
<form role="search" aria-label="Filter bookings">
```

**Priority:** 🟡 MEDIUM (WCAG 2.1 Level A)

---

#### Missing Skip Links
**Location:** `src/app/operator/layout.tsx`

**Problem:**
- Keyboard users must tab through entire sidebar to reach content
- Violates UX Guideline: "Provide skip to main content link"

**Fix:**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white"
>
  Skip to main content
</a>
```

**Priority:** 🟡 MEDIUM (WCAG requirement)

---

#### Color-Only Status Indicators
**Locations:** Tour cards, booking table, earnings view

**Problem:**
- Status badges use color only (green = confirmed, yellow = forming, red = cancelled)
- Fails WCAG 1.4.1: Use of Color

**Fix:**
```tsx
<span className="...">
  {status.icon} {/* Add visual icon */}
  {status.label}
</span>
```

**Priority:** 🟡 MEDIUM

---

### 7.2 Responsive Design Gaps

#### Tablet Breakpoint Missing
**Locations:** All views

**Problem:**
- Most components jump from `md:` (768px) to `lg:` (1024px)
- 768-1024px range (iPad landscape, Surface) gets desktop layouts that are too cramped

**Fix:**
```tsx
// Add explicit tablet handling
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

**Priority:** 🟡 MEDIUM

---

#### Fixed Padding Values
**Locations:** DashboardViewContainer, all views

**Problem:**
```tsx
<div className="min-h-full px-8 py-6">  {/* Same padding all sizes */}
```

**Fix:**
```tsx
<div className="min-h-full px-4 md:px-6 lg:px-8 py-4 md:py-6">
```

**Priority:** 🟡 LOW

---

### 7.3 Performance Concerns

#### Missing Virtualization for Long Lists
**Locations:** MyToursView, BookingsView

**Problem:**
- Rendering 100+ tours/bookings will cause performance issues
- No pagination or virtual scrolling

**Recommendation:**
```bash
npm install react-window
```

```tsx
import { FixedSizeList as List } from 'react-window';

<List
  height={600}
  itemCount={filteredBookings.length}
  itemSize={80}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <BookingRow booking={filteredBookings[index]} />
    </div>
  )}
</List>
```

**Priority:** 🟡 MEDIUM (scales with data)

---

#### No Loading States
**Locations:** All views fetching data

**Problem:**
- No skeleton screens or spinners
- Blank screen during data fetch (poor perceived performance)

**Fix:**
```tsx
{isLoading ? (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
) : (
  <TourList tours={tours} />
)}
```

**Priority:** 🟡 MEDIUM

---

## 8. Information Architecture Review

### Current Structure

```
/operator
├── / (Dashboard home)
├── /tours (My Tours)
├── /tours/create (Create Tour Wizard)
├── /bookings (Bookings table)
├── /earnings (Revenue)
├── /profile (Settings)
└── /help (Support)
```

### ✅ Strengths

1. **Logical Grouping**
   - Tour management grouped under `/tours`
   - Flat, shallow hierarchy (max 2 levels deep)

2. **Clear Labels**
   - "My Tours" (not "Tours" - implies ownership)
   - "Create Tour" (action-oriented)

### 🟡 Recommendations

#### Add Tour Detail/Edit View
**Missing:** `/operator/tours/[id]` and `/operator/tours/[id]/edit`

**Current Gap:**
- "Edit" button in MyToursView links to `/operator/tours/${tour.id}/edit` (line 333)
- Route doesn't exist yet

**Priority:** 🟡 HIGH (critical flow)

---

#### Consider Grouping Financial Features
**Suggestion:** Move earnings under `/operator/financials`

```
/operator/financials
├── /earnings (Overview)
├── /payouts (History)
└── /taxes (Reports)
```

**Rationale:** Scalability - more financial features likely needed later

**Priority:** 🟢 LOW (future enhancement)

---

## 9. Component Reusability Assessment

### ✅ Well-Architected Patterns

1. **DashboardViewContainer Family**
   - `DashboardViewContainer`, `DashboardViewHeader`, `DashboardScrollArea`
   - Used consistently across all views
   - **Score: 95/100**

2. **Card Components**
   - StatCard, TourCard, PayoutCard all follow same structure
   - Reusable with props
   - **Score: 85/100**

### 🟡 Opportunities for Extraction

#### Repeated Filter Pattern
**Locations:** MyToursView, BookingsView

**Current:** Copy-paste filter UI
```tsx
{/* Status dropdown + search input repeated */}
```

**Recommendation:** Extract `<FilterBar>` component
```tsx
<FilterBar
  filters={[
    { type: 'select', options: statusOptions, value: status, onChange: setStatus },
    { type: 'search', placeholder: 'Search...', value: query, onChange: setQuery }
  ]}
/>
```

**Priority:** 🟡 MEDIUM (DRY principle)

---

#### Status Badge Component
**Locations:** All views with status indicators

**Recommendation:**
```tsx
// src/components/operator/shared/StatusBadge.tsx
export function StatusBadge({
  status,
  variant = 'default'
}: {
  status: TourStatus | BookingStatus | PayoutStatus;
  variant?: 'default' | 'compact';
}) {
  const config = STATUS_CONFIGS[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
      config.bgColor, config.textColor, config.borderColor
    )}>
      {config.icon}
      {variant === 'default' && config.label}
    </span>
  );
}
```

**Priority:** 🟡 LOW (polish)

---

## 10. Recommendations Summary

### 🔴 Critical (Must Fix)

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 1 | Add responsive sidebar pattern | Blocks mobile use | 8h |
| 2 | Make bookings table responsive | Mobile unusable | 6h |
| 3 | Add form validation to wizard | Data quality risk | 8h |
| 4 | Fix tour card mobile layout | Content unreadable | 4h |

**Total Critical Fixes:** ~26 hours

---

### 🟡 High Priority (Should Fix)

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 5 | Add data visualizations (earnings) | Comprehension | 12h |
| 6 | Implement bulk actions | Efficiency | 8h |
| 7 | Add loading states | Perceived perf | 4h |
| 8 | Fix wizard progress on mobile | UX | 3h |
| 9 | Add ARIA landmarks | Accessibility | 2h |

**Total High Priority:** ~29 hours

---

### 🟢 Medium Priority (Nice to Have)

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 10 | Extract FilterBar component | Maintainability | 4h |
| 11 | Add table sorting | Usability | 3h |
| 12 | Implement save draft | Data loss prevention | 6h |
| 13 | Add skip links | A11y | 1h |
| 14 | Responsive padding scales | Polish | 2h |

**Total Medium Priority:** ~16 hours

---

## 11. Design System Recommendations

Based on UI/UX Pro Max analysis, the dashboard should adopt:

### Style: Data-Dense Dashboard
- **Current:** Using custom design tokens (good foundation)
- **Enhancement:** Reduce card padding from `p-6` to `p-4` for data density
- **Rationale:** Maximize information per viewport

### Typography: Fira Code / Fira Sans
- **Current:** Using display font (undefined in tokens)
- **Recommendation:**
  ```css
  --font-display: 'Fira Sans', sans-serif;
  --font-body: 'Fira Sans', sans-serif;
  --font-mono: 'Fira Code', monospace; /* For data tables */
  ```

### Color Palette: Dashboard
- **Primary:** `#3B82F6` (current `--color-primary` is good)
- **Enhancement:** Add semantic colors
  ```css
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  ```

### Spacing: Reduce for Data Density
```css
/* Cards */
.dashboard-card { @apply p-4 /* down from p-6 */ }

/* Stats Grid */
.stats-grid { @apply gap-3 /* down from gap-4 */ }
```

---

## 12. Quick Wins (< 2 hours each)

1. **Add cursor-pointer to clickable cards**
   ```tsx
   <div className="... hover:shadow-lg cursor-pointer">
   ```

2. **Fix stats grid breakpoints**
   ```tsx
   <div className="grid grid-cols-2 xl:grid-cols-4">
   ```

3. **Add ARIA labels to icon buttons**
   ```tsx
   <button aria-label="View booking details">
     <Eye className="w-5 h-5" />
   </button>
   ```

4. **Add loading spinner component**
   ```tsx
   export function LoadingSpinner() {
     return <div className="animate-spin ...">⏳</div>
   }
   ```

5. **Extract status badge component**
   (See section 9)

---

## 13. Testing Checklist

Before deploying dashboard improvements:

### Responsive
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 768px (iPad portrait)
- [ ] Test at 1024px (iPad landscape)
- [ ] Test at 1440px (Desktop)

### Accessibility
- [ ] Keyboard navigation (tab order logical)
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] Color contrast 4.5:1 minimum
- [ ] Focus indicators visible

### Performance
- [ ] Test with 100+ tours loaded
- [ ] Test with 500+ bookings
- [ ] Check Lighthouse score (target: 90+)

### Cross-Browser
- [ ] Chrome/Edge (Chromium)
- [ ] Safari (especially iOS)
- [ ] Firefox

---

## 14. Implementation Roadmap

### Phase 1: Critical Fixes (Week 1-2)
- Responsive sidebar with mobile drawer
- Bookings table mobile layout
- Tour card responsive fixes
- Form validation in wizard

**Deliverable:** Dashboard usable on all devices

---

### Phase 2: High Priority (Week 3-4)
- Data visualization charts
- Bulk action UI
- Loading states
- ARIA landmarks

**Deliverable:** Professional dashboard experience

---

### Phase 3: Polish (Week 5-6)
- Component extraction (DRY)
- Table sorting
- Save draft functionality
- Design system refinements

**Deliverable:** Best-in-class operator dashboard

---

## Appendix A: File Inventory

| File | Purpose | Lines | Quality |
|------|---------|-------|---------|
| `src/app/operator/layout.tsx` | Dashboard shell | 18 | 🟡 Needs responsive |
| `src/app/operator/page.tsx` | Dashboard home route | 9 | 🟢 Good |
| `src/components/operator/OperatorSidebar.tsx` | Nav sidebar | 92 | 🟡 Needs mobile |
| `src/components/operator/DashboardViewContainer.tsx` | Layout containers | 68 | 🟢 Excellent |
| `src/components/operator/DashboardHome.tsx` | Dashboard view | 170 | 🟢 Good |
| `src/components/operator/tours/MyToursView.tsx` | Tours list | 359 | 🟡 Needs responsive |
| `src/components/operator/bookings/BookingsView.tsx` | Bookings table | 150 | 🔴 Critical responsive |
| `src/components/operator/earnings/EarningsView.tsx` | Earnings view | 140 | 🟡 Needs charts |
| `src/components/operator/tours/CreateTourWizard.tsx` | Tour wizard | 520 | 🟡 Needs validation |

**Total Lines of Code:** ~1,526 (dashboard only)

---

## Appendix B: Design Tokens Review

### Current Tokens (from `src/styles/tokens.css`)

```css
--color-primary: /* Verified */
--color-surface: /* Verified */
--color-border: /* Verified */
--radius-organic: /* Good for dashboard cards */
--shadow-card: /* Verified */
```

### Recommended Additions

```css
/* Status colors */
--color-status-forming: #F59E0B;
--color-status-confirmed: #10B981;
--color-status-past: #6B7280;
--color-status-cancelled: #EF4444;

/* Data visualization */
--color-chart-1: #3B82F6;
--color-chart-2: #8B5CF6;
--color-chart-3: #EC4899;
--color-chart-4: #10B981;

/* Interactive states */
--shadow-hover: 0 8px 16px rgba(0,0,0,0.12);
--transition-default: all 200ms ease;
```

---

## Appendix C: Recommended Libraries

### Charts
```bash
npm install recharts
# Lightweight, responsive, React-native
```

### Virtualization
```bash
npm install react-window
# For long lists (100+ items)
```

### Form Validation
```bash
npm install react-hook-form zod
# Type-safe validation for wizard
```

### Responsive Utilities
```bash
npm install react-responsive
# useMediaQuery hook for JS-based responsive
```

---

## Conclusion

The Quorum Tours operator dashboard has **solid architectural foundations** with consistent component patterns and clear information hierarchy. However, **responsive design gaps** and **missing accessibility features** prevent it from being production-ready.

**Primary Focus:**
1. Mobile responsiveness (sidebar, tables, cards)
2. Form validation and error handling
3. Data visualization for financial data
4. Accessibility improvements (ARIA, keyboard nav)

**Estimated Effort:**
- Critical fixes: 26 hours
- High priority: 29 hours
- **Total minimum viable improvements:** ~55 hours (~7 business days)

**Next Steps:**
1. Address Critical issues (responsive sidebar, table)
2. Run accessibility audit with axe DevTools
3. Implement loading states and error boundaries
4. Add data visualization to earnings view
5. Extract shared components (FilterBar, StatusBadge)

---

**Report Generated by:** Claude Code + UI/UX Pro Max Skill
**Methodology:** Codebase analysis + Modern dashboard UX best practices
**Framework Reference:** Tailwind CSS, React, Next.js 15
