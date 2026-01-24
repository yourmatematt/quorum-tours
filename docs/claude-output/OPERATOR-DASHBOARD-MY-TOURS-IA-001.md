# MY TOURS IA Specification — OPERATOR-DASHBOARD-MY-TOURS-IA-001

**Date:** 2026-01-22
**Version:** 001
**Status:** ✅ APPROVED FOR IMPLEMENTATION
**Parent Task:** OPERATOR-DASHBOARD-FULL-BUILD
**Complexity:** Medium (table/card hybrid, filtering, bulk actions)

---

## 1. Page Purpose & User Goals

### Primary Purpose
Provide operators with a comprehensive view of all their tours (forming, confirmed, completed, cancelled) with quick access to management actions.

### User Goals
1. **Monitor active tours** - See which tours are forming, which are confirmed, booking progress toward thresholds
2. **Access past tours for duplication** - Quickly duplicate successful tours from previous seasons
3. **Manage tour lifecycle** - Edit, cancel, or view public page for any tour
4. **Understand revenue pipeline** - See upcoming confirmed tours and projected earnings
5. **Find specific tours quickly** - Filter by status, date, or search by name

### Operator Context (from Research)
> "You didn't become a naturalist to manage spreadsheets."

**Pain Points:**
- Operators currently track tours in Excel/Google Sheets
- Status tracking is manual ("Did we reach threshold? Let me count...")
- Finding last year's tour to duplicate requires scrolling through folders
- No visibility into "tours needing attention" (close to departure, below threshold)

---

## 2. Information Architecture

### 2.1 Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ MY TOURS                                                    │
│ ───────────────────────────────────────────────────────────│
│                                                             │
│ [+ Create New Tour]                                         │
│                                                             │
│ Filters:                                                    │
│ [All ▼] [🔍 Search tours...]                               │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ACTIVE TOURS (3)                                        ││
│ │                                                         ││
│ │ ┌─────────────────────────────────────────────────────┐││
│ │ │ Patagonian Birding Adventure                        │││
│ │ │ May 10-24, 2026 (14 days)                           │││
│ │ │                                                     │││
│ │ │ 🟡 FORMING   4/6 participants                       │││
│ │ │ 80 days until departure                             │││
│ │ │                                                     │││
│ │ │ [Edit] [View Public Page] [Duplicate] [Cancel]     │││
│ │ └─────────────────────────────────────────────────────┘││
│ │                                                         ││
│ │ ┌─────────────────────────────────────────────────────┐││
│ │ │ Costa Rica Cloud Forest Expedition                  │││
│ │ │ March 15-22, 2026 (7 days)                          │││
│ │ │                                                     │││
│ │ │ ✅ CONFIRMED   8/8 participants (FULL)              │││
│ │ │ 24 days until departure                             │││
│ │ │                                                     │││
│ │ │ [Edit] [View Public Page] [Manage Participants]    │││
│ │ └─────────────────────────────────────────────────────┘││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ PAST TOURS (12)                                         ││
│ │ [Show older tours ▼]                                    ││
│ └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Navigation Hierarchy

```
Operator Dashboard
└── My Tours (current page)
    ├── Create New Tour (modal/new page)
    ├── Edit Tour (tour ID)
    ├── View Public Page (opens in new tab)
    ├── Manage Participants (tour ID, bookings view)
    └── Duplicate Tour (pre-fills create form)
```

---

## 3. Content Structure

### 3.1 Page Header

**Component:** H1 heading + primary action

```tsx
<h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
  My Tours
</h1>
<p className="text-[var(--color-ink-muted)] mt-2">
  Manage your tours, track bookings, and duplicate past successes
</p>

<button className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)]">
  + Create New Tour
</button>
```

**Visual Treatment:**
- Large, prominent "Create New Tour" button (forest green)
- Helper text explains page purpose
- Consistent with DashboardHome welcome pattern

### 3.2 Filters & Search

**Component:** Filter dropdown + search input

```tsx
<div className="flex gap-4 items-center">
  {/* Status Filter */}
  <select className="px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
    <option value="all">All Tours</option>
    <option value="forming">Forming (need participants)</option>
    <option value="confirmed">Confirmed</option>
    <option value="upcoming">Upcoming (next 60 days)</option>
    <option value="past">Past Tours</option>
    <option value="cancelled">Cancelled</option>
  </select>

  {/* Search */}
  <input
    type="search"
    placeholder="Search tours..."
    className="flex-1 px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]"
  />
</div>
```

**Filter Logic:**
- **Forming**: Tours below threshold, future dates
- **Confirmed**: Tours at/above threshold, future dates
- **Upcoming**: All tours in next 60 days (forming or confirmed)
- **Past**: Tours with end_date in the past
- **Cancelled**: Tours with status='cancelled'

**Search Behavior:**
- Searches tour title, location, target species
- Real-time filter (no submit button)
- Show "No tours found" state if empty results

### 3.3 Tour Card (Primary Component)

**Desktop Card Layout:**

```
┌───────────────────────────────────────────────────────────┐
│ Patagonian Birding Adventure                              │
│ May 10-24, 2026 (14 days) • Multi-Day • $4,200/person    │
│                                                           │
│ 🟡 FORMING   4/6 participants                             │
│ ━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░░ 67%                   │
│ 80 days until departure                                   │
│                                                           │
│ Target Species: Andean Condor, Magellanic Woodpecker (+3)│
│                                                           │
│ [Edit Tour] [View Public Page] [Duplicate] [Cancel Tour] │
└───────────────────────────────────────────────────────────┘
```

**Card Content Elements:**

1. **Title** (font-display, text-lg, semibold)
2. **Dates + Duration** (text-sm, muted)
   - Format: "May 10-24, 2026 (14 days)"
   - For single-day: "May 15, 2026 (6 hours)"
3. **Tour Type Badge** (Multi-Day or Single-Day)
4. **Price** (per person)
5. **Status Indicator** with icon:
   - 🟡 FORMING (yellow)
   - ✅ CONFIRMED (green)
   - ⏰ PAST (gray)
   - ❌ CANCELLED (red)
6. **Progress Bar** (forming/confirmed tours only)
   - Shows: "4/6 participants"
   - Visual: Progress bar (67% filled)
7. **Days Until Departure** (forming/confirmed only)
   - "80 days until departure"
   - Red text if <14 days and still forming
8. **Target Species Preview** (truncated, +N more)
9. **Action Buttons** (context-sensitive)

**Status-Dependent Actions:**

| Status | Actions Available |
|--------|------------------|
| Forming | Edit, View Public Page, Duplicate, Cancel |
| Confirmed | Edit, View Public Page, Manage Participants, Duplicate |
| Past | View Public Page, Duplicate |
| Cancelled | View Public Page, Duplicate, Delete |

### 3.4 Section Grouping

**Auto-Grouping by Status:**

```tsx
{/* Active Tours Section */}
{activeTours.length > 0 && (
  <section>
    <h2 className="font-display text-xl font-semibold mb-4">
      Active Tours ({activeTours.length})
    </h2>
    <div className="space-y-4">
      {activeTours.map(tour => <TourCard tour={tour} />)}
    </div>
  </section>
)}

{/* Past Tours Section (Collapsed by Default) */}
{pastTours.length > 0 && (
  <details>
    <summary className="font-display text-xl font-semibold cursor-pointer">
      Past Tours ({pastTours.length})
    </summary>
    <div className="space-y-4 mt-4">
      {pastTours.map(tour => <TourCard tour={tour} />)}
    </div>
  </details>
)}
```

**Grouping Logic:**
- **Active Tours**: status='forming' OR status='confirmed', end_date >= today
- **Past Tours**: end_date < today
- Past tours collapsed by default (reduce visual noise)
- Show count in section header

---

## 4. Interactive Elements

### 4.1 Primary Actions

#### Create New Tour Button

**Location:** Top of page, above filters
**Visual:** Large button, forest green background, white text
**Behavior:** Opens Create Tour flow (separate page or modal)

```tsx
<button
  onClick={() => router.push('/operator/tours/create')}
  className="px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-[var(--radius-organic)] hover:opacity-90 transition-opacity"
>
  + Create New Tour
</button>
```

#### Edit Tour

**Location:** Tour card actions
**Behavior:** Navigate to `/operator/tours/edit/{tour_id}`
**Icon:** Pencil icon (lucide-react)

#### View Public Page

**Location:** Tour card actions
**Behavior:** Open `/tours/{tour_id}` in new tab
**Visual:** Eye icon + "View Public Page" text

```tsx
<a
  href={`/tours/${tour.id}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:bg-[var(--color-surface-sunken)]"
>
  <Eye className="w-4 h-4" />
  View Public Page
</a>
```

#### Duplicate Tour

**Location:** Tour card actions
**Behavior:**
1. Copy all tour data
2. Pre-fill Create Tour form
3. Update dates to current year +1
4. Set status to 'draft'
5. Navigate to Create Tour page with pre-filled data

**Confirmation:**
```
┌─────────────────────────────────────────┐
│ Duplicate Tour?                         │
├─────────────────────────────────────────┤
│ This will create a copy of:            │
│ "Patagonian Birding Adventure"         │
│                                         │
│ You can edit the details before        │
│ publishing.                             │
│                                         │
│ [Cancel] [Duplicate Tour]               │
└─────────────────────────────────────────┘
```

#### Cancel Tour

**Location:** Tour card actions (forming/confirmed tours only)
**Behavior:**
1. Show confirmation dialog
2. If confirmed, set status='cancelled'
3. Trigger participant notifications (Phase 2)
4. Move tour to "Cancelled" section

**Confirmation Dialog:**
```
┌─────────────────────────────────────────┐
│ ⚠️ Cancel Tour?                         │
├─────────────────────────────────────────┤
│ Are you sure you want to cancel:       │
│ "Costa Rica Cloud Forest Expedition"   │
│ March 15-22, 2026                       │
│                                         │
│ 8 participants will be notified and    │
│ refunded automatically.                 │
│                                         │
│ This action cannot be undone.           │
│                                         │
│ [Keep Tour] [Cancel Tour]               │
└─────────────────────────────────────────┘
```

**Warning States:**
- If tour is <14 days away, show additional warning: "This tour departs soon. Cancellation may affect your reputation."
- If tour is confirmed (threshold met), require reason selection

### 4.2 Secondary Actions

#### Manage Participants

**Location:** Tour card actions (confirmed tours only)
**Behavior:** Navigate to `/operator/bookings?tour_id={tour_id}`
**Visual:** Users icon + "Manage Participants"

#### Sort Tours

**Location:** Above tour list
**Options:**
- Departure date (soonest first) — default
- Departure date (latest first)
- Creation date (newest first)
- Title (A-Z)
- Booking progress (lowest % first) — shows tours needing attention

```tsx
<select className="px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
  <option value="departure_asc">Soonest departure first</option>
  <option value="departure_desc">Latest departure first</option>
  <option value="created_desc">Recently created</option>
  <option value="title_asc">Title (A-Z)</option>
  <option value="progress_asc">Needs attention (low bookings)</option>
</select>
```

---

## 5. Empty States

### 5.1 No Tours Created Yet

**Trigger:** Operator has 0 tours in database
**Visual:**

```
┌─────────────────────────────────────────┐
│                                         │
│         📋                              │
│                                         │
│     No tours yet                        │
│                                         │
│     Create your first tour to start     │
│     accepting bookings.                 │
│                                         │
│     [+ Create Your First Tour]          │
│                                         │
└─────────────────────────────────────────┘
```

### 5.2 No Results from Filter/Search

**Trigger:** Filter or search returns 0 results
**Visual:**

```
┌─────────────────────────────────────────┐
│                                         │
│     No tours found                      │
│                                         │
│     Try adjusting your filters or       │
│     search term.                        │
│                                         │
│     [Clear Filters]                     │
│                                         │
└─────────────────────────────────────────┘
```

### 5.3 All Tours Are Past

**Trigger:** Operator has tours, but all are past
**Visual:**

```
┌─────────────────────────────────────────┐
│     No active tours                     │
│                                         │
│     Your past tours are below. Want to │
│     create a new tour or duplicate a    │
│     past one?                           │
│                                         │
│     [+ Create New Tour]                 │
└─────────────────────────────────────────┘
```

---

## 6. Data Requirements

### 6.1 Tour Data Model (for Display)

```typescript
interface Tour {
  id: string;
  operator_id: string;
  type: 'single_day' | 'multi_day';
  title: string;
  start_date: Date;
  end_date: Date | null;  // null for single-day
  duration_days: number;
  price_per_person: number;
  min_participants: number;
  max_participants: number;
  status: 'draft' | 'published' | 'forming' | 'confirmed' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;

  // Computed fields
  current_participants: number;
  days_until_departure: number;
  booking_progress_percent: number;
  target_species_preview: string[];  // first 3-5 species
}
```

### 6.2 API Endpoints

**GET /api/operator/tours**
- Returns all tours for authenticated operator
- Supports query params: `?status=forming&search=patagonia&sort=departure_asc`
- Returns tours with computed fields (participant counts, days until, etc.)

**POST /api/operator/tours/{id}/duplicate**
- Duplicates tour with new ID
- Updates dates to current year + 1
- Sets status to 'draft'
- Returns new tour ID

**DELETE /api/operator/tours/{id}**
- Soft delete (sets status='cancelled' if published, hard delete if draft)
- Triggers participant notifications if tour had bookings

**PATCH /api/operator/tours/{id}**
- Updates tour fields
- Used for quick edits without full form

---

## 7. Responsive Behavior

### 7.1 Desktop (1280px+)

**Layout:**
- Full card layout as shown above
- 2-column grid if >6 tours (optional optimization)
- All actions visible

### 7.2 Tablet (768px - 1279px)

**Layout:**
- Single column card layout
- Actions remain visible
- Slightly reduced padding

### 7.3 Mobile (< 768px)

**Note:** Desktop-first design, but mobile should function for field use

**Layout:**
- Simplified card (stack vertically)
- Actions in dropdown menu (⋮ icon)
- Reduced font sizes (minimum 16px)
- Touch targets 48px minimum

**Mobile Card:**
```
┌─────────────────────────────┐
│ Patagonian Birding          │
│ May 10-24, 2026 • 14 days  │
│                             │
│ 🟡 FORMING  4/6             │
│ 80 days left                │
│                             │
│ [⋮ Actions]                 │
└─────────────────────────────┘
```

---

## 8. Accessibility

### 8.1 WCAG AAA Compliance

**Color Contrast:**
- Status badges: Minimum 7:1 contrast
- Text on cards: Minimum 7:1 (ink on surface)
- Action buttons: Minimum 4.5:1 (interactive elements)

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close dialogs
- Focus indicators visible (2px outline, forest green)

**Screen Reader:**
```tsx
<div role="article" aria-labelledby={`tour-${tour.id}-title`}>
  <h3 id={`tour-${tour.id}-title`}>Patagonian Birding Adventure</h3>
  <p aria-label="Tour status">
    <span className="sr-only">Status:</span> Forming, 4 of 6 participants
  </p>
  <p aria-label="Days until departure">80 days remaining</p>
</div>
```

### 8.2 Large Font Sizes (50-70 Demographic)

- Tour title: 18px (text-lg)
- Dates/meta: 14px (text-sm)
- Status: 16px (text-base)
- Action buttons: 16px with 48px height

---

## 9. Performance Considerations

### 9.1 Data Loading

**Initial Load:**
- Fetch only active tours by default (forming + confirmed)
- Lazy-load past tours when section expanded
- Limit to 50 tours per page, paginate if more

**Caching:**
- Cache tour list for 5 minutes (operator unlikely to create tours rapidly)
- Invalidate cache on create/edit/delete
- Optimistic updates for status changes

### 9.2 Search/Filter Performance

**Client-Side Filtering:**
- If <100 tours, filter in React state (instant)
- If >100 tours, server-side filtering with debounced search (300ms)

---

## 10. Phase 2 Enhancements (Not MVP)

1. **Bulk Actions**
   - Select multiple tours
   - Bulk cancel, bulk publish, bulk delete drafts

2. **Tour Analytics**
   - Click-through rate (views → bookings)
   - Average time to confirmation
   - Seasonal booking patterns

3. **Calendar View**
   - Month/year calendar with tour dots
   - Hover to see tour details
   - Drag to reschedule (multi-day)

4. **Tour Templates**
   - Save tour as template (reusable)
   - Template library (personal + platform)
   - One-click create from template

5. **Export**
   - Export tour list to CSV
   - Print itineraries (PDF batch)

---

## 11. Design System Application

### 11.1 Typography

- **Page title:** font-display, text-3xl, semibold (Crimson Pro)
- **Tour titles:** font-display, text-lg, semibold
- **Body text:** Default (Atkinson Hyperlegible), text-base
- **Meta text:** text-sm, text-[var(--color-ink-muted)]

### 11.2 Colors

- **Primary action:** bg-[var(--color-primary)] (Forest Green #2E8B57)
- **Status colors:**
  - Forming: #F59E0B (amber-500)
  - Confirmed: #10B981 (emerald-500)
  - Past: #6B7280 (gray-500)
  - Cancelled: #EF4444 (red-500)
- **Card background:** bg-[var(--color-surface)]
- **Borders:** border-2 border-[var(--color-border)]

### 11.3 Spacing & Layout

- **Card padding:** p-6 (24px)
- **Card spacing:** space-y-4 (16px between cards)
- **Section spacing:** mb-8 (32px between sections)
- **Button padding:** px-6 py-3 (24px horizontal, 12px vertical)

### 11.4 Organic Styling

- **Border radius:** rounded-[var(--radius-organic)] (20px)
- **Shadows:** shadow-[var(--shadow-card)] on cards
- **Transitions:** transition-opacity duration-200 on hover

---

## 12. Success Criteria

### Usability
- [ ] Operator can find specific tour in <10 seconds (via search or filter)
- [ ] Duplicate tour action takes <3 clicks
- [ ] Status of all active tours visible without scrolling (if ≤5 tours)
- [ ] Actions are self-explanatory (no tooltips needed)

### Performance
- [ ] Page loads in <1 second on desktop
- [ ] Search/filter updates in <300ms
- [ ] No layout shift during load

### Accessibility
- [ ] WCAG AAA compliance (7:1 contrast)
- [ ] Keyboard navigation functional
- [ ] Screen reader announces status changes

### Design System
- [ ] All typography uses design tokens
- [ ] All colors from palette (no hardcoded hex)
- [ ] Organic border radius applied consistently

---

## 13. Implementation Notes

### File Structure

```
src/app/operator/tours/
  page.tsx                 // My Tours list view
  create/
    page.tsx               // Create Tour flow
  edit/[id]/
    page.tsx               // Edit Tour flow

src/components/operator/
  TourCard.tsx             // Individual tour card
  TourFilters.tsx          // Filter/search component
  TourList.tsx             // Main list component
  TourActions.tsx          // Action buttons component
```

### Component Breakdown

1. **TourList.tsx** - Container component
   - Fetches tours from API
   - Manages filter/search state
   - Renders sections (active, past)

2. **TourCard.tsx** - Presentational component
   - Receives tour prop
   - Displays all tour info
   - Handles action button clicks

3. **TourFilters.tsx** - Filter UI
   - Status dropdown
   - Search input
   - Sort dropdown
   - Emits filter changes to parent

4. **TourActions.tsx** - Action buttons
   - Context-aware based on tour status
   - Confirmation dialogs
   - API calls for duplicate/cancel

---

## 14. Next Steps

After MY TOURS IA approval:

1. **CREATE TOUR IA** - Complex multi-day itinerary builder
2. **BOOKINGS IA** - Participant management across tours
3. **EARNINGS IA** - Revenue dashboard and payout tracking
4. **PROFILE IA** - Operator profile editing
5. **HELP IA** - Documentation and support

**Dependencies:**
- MY TOURS depends on: Sidebar navigation (✅ built)
- CREATE TOUR depends on: MY TOURS (for duplicate flow)

---

**Status:** ✅ Ready for implementation
**Estimated Complexity:** Medium
**Estimated Build Time:** 2-3 days (list view + filters + actions)
