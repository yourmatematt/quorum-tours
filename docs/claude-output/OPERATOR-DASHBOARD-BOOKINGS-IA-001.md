# BOOKINGS IA Specification — OPERATOR-DASHBOARD-BOOKINGS-IA-001

**Date:** 2026-01-22
**Version:** 001
**Status:** ✅ APPROVED FOR IMPLEMENTATION
**Parent Task:** OPERATOR-DASHBOARD-FULL-BUILD
**Complexity:** Medium (table view, filtering, participant management)

---

## 1. Page Purpose & User Goals

### Primary Purpose
Provide operators with a comprehensive view of all participants across all tours with filtering, contact management, and export capabilities.

### User Goals
1. **Monitor bookings** - See all participants who've committed to tours
2. **Track tour progress** - Understand which tours are close to threshold
3. **Manage participants** - View contact details, booking dates, special requests
4. **Communicate** - Send messages via platform (no email exposure)
5. **Export data** - Download participant list for offline use (spreadsheets, labels)

### Operator Context (from Research)
> "Pre-trip communication overwhelm: You answer the same questions eleven times."

**Pain Points Addressed:**
- Scattered participant info (emails, spreadsheets, sticky notes)
- Manual tracking of who's paid, who hasn't
- Repetitive communication ("What should I bring?")
- No visibility into participant distribution across tours

---

## 2. Information Architecture

### 2.1 Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ BOOKINGS                                                    │
│ ───────────────────────────────────────────────────────────│
│                                                             │
│ Filters:                                                    │
│ [All Tours ▼] [All Statuses ▼] [🔍 Search participants...] │
│                                                             │
│ 47 participants across 8 tours              [Export CSV ↓] │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Tour                    │ Participant │ Status │ Date   ││
│ ├─────────────────────────┼─────────────┼────────┼────────┤│
│ │ Patagonian Adventure    │ John Davis  │ Held   │ Jan 5  ││
│ │ May 10-24, 2026         │ john@...    │        │        ││
│ │ 4/6 participants        │ [View] [✉] │        │        ││
│ ├─────────────────────────┼─────────────┼────────┼────────┤│
│ │ Patagonian Adventure    │ Maria Lopez │ Held   │ Jan 8  ││
│ │ May 10-24, 2026         │ maria@...   │        │        ││
│ │ 4/6 participants        │ [View] [✉] │        │        ││
│ ├─────────────────────────┼─────────────┼────────┼────────┤│
│ │ Costa Rica Expedition   │ Sarah Chen  │ Paid   │ Dec 12 ││
│ │ Mar 15-22, 2026         │ sarah@...   │        │        ││
│ │ 8/8 CONFIRMED           │ [View] [✉] │        │        ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ [Load More] (20 of 47 shown)                                │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Navigation Hierarchy

```
Operator Dashboard
└── Bookings (current page)
    ├── Participant Detail (modal/panel)
    ├── Send Message (modal)
    └── Export CSV (download)
```

---

## 3. Content Structure

### 3.1 Page Header

```tsx
<h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
  Bookings
</h1>
<p className="text-[var(--color-ink-muted)] mt-2">
  Manage participants across all your tours
</p>
```

### 3.2 Summary Stats (Above Table)

```
┌─────────────────────────────────────────────┐
│ 47 participants across 8 tours              │
│                                             │
│ • 18 deposits held (forming tours)          │
│ • 29 payments confirmed (confirmed tours)   │
└─────────────────────────────────────────────┘
```

**Data:**
- Total participants count
- Breakdown by payment status (held vs confirmed)
- Number of active tours with bookings

### 3.3 Filters

**Tour Filter:**
```tsx
<select className="px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
  <option value="">All Tours</option>
  <optgroup label="Active Tours">
    <option value="tour-1">Patagonian Adventure (4/6)</option>
    <option value="tour-2">Costa Rica Expedition (8/8 FULL)</option>
    <option value="tour-3">Amazon Basin Birding (2/6)</option>
  </optgroup>
  <optgroup label="Past Tours">
    <option value="tour-4">Iceland Spring 2025</option>
    {/* ... */}
  </optgroup>
</select>
```

**Status Filter:**
```tsx
<select className="px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
  <option value="">All Statuses</option>
  <option value="held">Deposits Held (forming tours)</option>
  <option value="paid">Payments Confirmed</option>
  <option value="cancelled">Cancelled</option>
  <option value="refunded">Refunded</option>
</select>
```

**Search:**
```tsx
<input
  type="search"
  placeholder="Search participants by name or email..."
  className="flex-1 px-4 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]"
/>
```

**Search Behavior:**
- Real-time filtering (debounced 300ms)
- Searches: Participant name, email
- Shows "No participants found" if empty results

---

## 4. Table Structure

### 4.1 Column Definitions

| Column | Content | Width | Sortable |
|--------|---------|-------|----------|
| Tour | Tour title, dates, booking progress | 35% | Yes (by date) |
| Participant | Name, email, action buttons | 30% | Yes (by name) |
| Status | Payment/deposit status | 15% | Yes |
| Booking Date | When participant committed | 20% | Yes (default) |

### 4.2 Row Layout (Desktop)

```
┌────────────────────────────────────────────────────────────┐
│ Patagonian Birding Adventure                               │
│ May 10-24, 2026 (14 days)                                  │
│ 🟡 FORMING  4/6 participants                               │
│                                                            │
│ John Davis                      🟡 Held      Jan 5, 2026  │
│ john.davis@email.com            Deposit      14:32        │
│ [View Details] [Send Message]   $500                      │
└────────────────────────────────────────────────────────────┘
```

**Tour Cell:**
- Title (font-display, text-base, semibold)
- Dates + duration (text-sm, muted)
- Status badge (🟡 FORMING or ✅ CONFIRMED)
- Progress: "4/6 participants"

**Participant Cell:**
- Name (text-base, semibold)
- Email (text-sm, muted, truncated with ...)
- Action buttons: "View Details", "Send Message"

**Status Cell:**
- Badge: "Held" (yellow) or "Paid" (green) or "Cancelled" (red)
- Sub-text: "Deposit" or "Payment"
- Amount: "$500" or "$4,200"

**Booking Date Cell:**
- Date: "Jan 5, 2026"
- Time: "14:32" (muted, smaller)

### 4.3 Grouping (Optional Enhancement)

**Group by Tour:**
```
Patagonian Birding Adventure (4 participants)
  ├─ John Davis - Held - Jan 5
  ├─ Maria Lopez - Held - Jan 8
  ├─ Tom Wilson - Held - Jan 12
  └─ Emma Brown - Held - Jan 15

Costa Rica Expedition (8 participants)
  ├─ Sarah Chen - Paid - Dec 12
  ├─ ...
```

**Phase 2 feature** (not MVP) - Default view is flat table.

---

## 5. Interactive Elements

### 5.1 View Details (Participant Modal)

**Trigger:** Click "View Details" button or participant name

**Modal Content:**
```
┌──────────────────────────────────────────────┐
│ John Davis                          [✕ Close]│
├──────────────────────────────────────────────┤
│                                              │
│ Contact Information                          │
│ Email: john.davis@email.com                  │
│ Phone: +1 (555) 123-4567                     │
│                                              │
│ Tour Details                                 │
│ Tour: Patagonian Birding Adventure           │
│ Dates: May 10-24, 2026 (14 days)            │
│ Booked: January 5, 2026 at 2:32 PM          │
│                                              │
│ Payment Status                               │
│ Status: Deposit Held                         │
│ Amount: $500 (deposit)                       │
│ Full amount: $4,200                          │
│ Due when: Tour reaches 6 participants        │
│                                              │
│ Special Requests / Notes                     │
│ "Vegetarian meals, gluten-free."             │
│ "First time birding internationally."        │
│                                              │
│ Internal Notes (Private)                     │
│ [Add note for this participant...]          │
│ • Jan 8: Sent welcome email                  │
│ • Jan 5: Booking confirmed                   │
│                                              │
│ [Send Message] [View Tour Page]              │
└──────────────────────────────────────────────┘
```

**Data Shown:**
- Contact info (email, phone if provided)
- Tour details
- Payment status with clear explanation
- Participant's special requests (dietary, accessibility)
- Internal notes (operator only, not visible to participant)
- Communication history timeline

### 5.2 Send Message

**Trigger:** Click "Send Message" button

**Modal:**
```
┌──────────────────────────────────────────────┐
│ Send Message to John Davis         [✕ Close]│
├──────────────────────────────────────────────┤
│                                              │
│ To: John Davis (john.davis@email.com)       │
│ Re: Patagonian Birding Adventure            │
│                                              │
│ Subject:                                     │
│ [Pre-trip information for Patagonia tour   ] │
│                                              │
│ Message:                                     │
│ [                                           ]│
│ [                                           ]│
│ [                                           ]│
│ [                                           ]│
│                                              │
│ ☐ Send copy to my email                     │
│                                              │
│ [Cancel] [Send Message]                      │
└──────────────────────────────────────────────┘
```

**Behavior:**
- Message sent via platform (email notification to participant)
- Operator's email NOT exposed to participant
- Participant replies go to platform inbox (Phase 2)
- Message saved to communication history
- Optional: Send copy to operator's email for record-keeping

**Pre-filled Templates (Phase 2):**
- "Welcome to the tour"
- "Pre-trip preparation checklist"
- "Final logistics before departure"
- Custom templates

### 5.3 Export CSV

**Trigger:** Click "Export CSV" button

**Exported Columns:**
- Participant Name
- Email
- Phone
- Tour Title
- Tour Dates
- Booking Date
- Payment Status
- Amount Paid
- Special Requests

**Filename:** `quorum-bookings-{operator-name}-{date}.csv`

**Use Cases:**
- Import into spreadsheet for offline tracking
- Generate mailing labels
- Share with co-guides
- Backup records

**Technical:**
```tsx
const handleExport = async () => {
  const response = await fetch('/api/operator/bookings/export', {
    method: 'POST',
    body: JSON.stringify({filters: currentFilters})
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quorum-bookings-${new Date().toISOString()}.csv`;
  a.click();
};
```

---

## 6. Empty States

### 6.1 No Bookings Yet

```
┌─────────────────────────────────────────┐
│                                         │
│         📅                              │
│                                         │
│     No bookings yet                     │
│                                         │
│     Publish a tour to start receiving   │
│     bookings from participants.         │
│                                         │
│     [Create Your First Tour]            │
│                                         │
└─────────────────────────────────────────┘
```

### 6.2 No Results from Filter

```
┌─────────────────────────────────────────┐
│                                         │
│     No participants found               │
│                                         │
│     Try adjusting your filters or       │
│     search term.                        │
│                                         │
│     [Clear Filters]                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 7. Sorting & Pagination

### 7.1 Sort Options

**Default:** Booking date (most recent first)

**Other Options:**
- Tour departure date (soonest first)
- Participant name (A-Z)
- Payment status (held → paid → cancelled)

**UI:**
```tsx
<select className="px-4 py-2 border-2 rounded-[var(--radius-organic)]">
  <option value="booking_date_desc">Most recent booking</option>
  <option value="booking_date_asc">Oldest booking</option>
  <option value="tour_date_asc">Soonest tour departure</option>
  <option value="participant_name_asc">Participant name (A-Z)</option>
  <option value="status">Payment status</option>
</select>
```

### 7.2 Pagination

**Load More Pattern:**
- Show 20 bookings initially
- "Load More" button at bottom
- Shows progress: "20 of 47 shown"
- Load 20 more on click

**Infinite Scroll (Phase 2):**
- Auto-load when user scrolls to bottom
- Better UX for long lists

---

## 8. Data Requirements

### 8.1 Booking Data Model

```typescript
interface Booking {
  id: string;
  tour_id: string;
  participant_id: string;

  // Tour info (denormalized for performance)
  tour_title: string;
  tour_start_date: Date;
  tour_end_date: Date;
  tour_status: 'forming' | 'confirmed' | 'completed' | 'cancelled';
  tour_participants_current: number;
  tour_participants_min: number;

  // Participant info
  participant_name: string;
  participant_email: string;
  participant_phone: string | null;

  // Booking details
  booking_date: Date;
  payment_status: 'held' | 'paid' | 'refunded' | 'cancelled';
  amount: number;
  special_requests: string | null;

  // Internal
  operator_notes: string | null;
  created_at: Date;
  updated_at: Date;
}
```

### 8.2 API Endpoints

**GET /api/operator/bookings**
- Returns all bookings for authenticated operator
- Query params: `?tour_id=abc&status=held&search=john&sort=booking_date_desc`
- Pagination: `?offset=0&limit=20`

**GET /api/operator/bookings/{id}**
- Returns detailed booking info
- Includes communication history

**POST /api/operator/bookings/{id}/message**
- Sends message to participant
- Body: `{subject, message, send_copy_to_operator}`
- Triggers email notification to participant

**POST /api/operator/bookings/export**
- Returns CSV file
- Respects current filters
- Body: `{filters: {tour_id, status, search}}`

---

## 9. Responsive Behavior

### 9.1 Desktop (1280px+)

**Layout:** Full table with all columns visible

### 9.2 Tablet (768-1279px)

**Layout:**
- Stack tour info above participant info
- Reduce padding
- Smaller font sizes (minimum 16px)

### 9.3 Mobile (<768px)

**Layout:**
- Card-based (not table)
- Each booking = card

```
┌───────────────────────────────┐
│ Patagonian Adventure          │
│ May 10-24 • 4/6               │
│                               │
│ John Davis                    │
│ john@email.com                │
│                               │
│ 🟡 Held • $500 • Jan 5       │
│                               │
│ [View] [Message]              │
└───────────────────────────────┘
```

---

## 10. Accessibility

### 10.1 WCAG AAA Compliance

**Color Contrast:**
- Status badges: Minimum 7:1 contrast
- Table text: Minimum 7:1 (ink on surface)
- Action buttons: Minimum 4.5:1

**Keyboard Navigation:**
- Tab through table rows
- Enter to open participant detail
- Arrow keys to navigate rows (optional)
- Escape to close modals

**Screen Reader:**
```tsx
<table aria-label="Participant bookings">
  <thead>
    <tr>
      <th scope="col">Tour</th>
      <th scope="col">Participant</th>
      <th scope="col">Payment Status</th>
      <th scope="col">Booking Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{tour.title}</td>
      <td>
        {participant.name}
        <span className="sr-only">Email: {participant.email}</span>
      </td>
      <td>
        <span className="sr-only">Payment status:</span>
        {status}
      </td>
      <td>
        <time dateTime={booking.created_at}>
          {formatDate(booking.created_at)}
        </time>
      </td>
    </tr>
  </tbody>
</table>
```

---

## 11. Performance Considerations

### 11.1 Data Loading

**Initial Load:**
- Fetch only first 20 bookings
- Denormalize tour info to avoid N+1 queries
- Cache for 5 minutes

**Filtering:**
- Server-side for >100 bookings
- Client-side for <100 bookings
- Debounced search (300ms)

### 11.2 Export Performance

**Large Exports:**
- If >1000 bookings, generate async
- Email download link when ready
- Show progress indicator

---

## 12. Design System Application

### 12.1 Typography

- **Page title:** font-display, text-3xl, semibold (Crimson Pro)
- **Tour titles:** font-display, text-base, semibold
- **Participant names:** text-base, semibold (Atkinson Hyperlegible)
- **Meta text:** text-sm, text-[var(--color-ink-muted)]

### 12.2 Colors

- **Status badges:**
  - Held: #F59E0B (amber-500) background, dark text
  - Paid: #10B981 (emerald-500) background, white text
  - Cancelled: #EF4444 (red-500) background, white text
- **Table borders:** border-[var(--color-border)]
- **Hover row:** bg-[var(--color-surface-sunken)]

### 12.3 Spacing

- **Table padding:** p-4 (16px per cell)
- **Row spacing:** divide-y-2 (2px borders between rows)
- **Button padding:** px-4 py-2 (16px horizontal, 8px vertical)

---

## 13. Success Criteria

### Usability
- [ ] Operator can find specific participant in <10 seconds
- [ ] Filter by tour works instantly (<100ms)
- [ ] Export CSV completes in <5 seconds for <500 bookings
- [ ] Send message modal is self-explanatory

### Performance
- [ ] Page loads in <1 second
- [ ] Search/filter updates in <300ms
- [ ] Table scrolling is smooth (60fps)

### Accessibility
- [ ] WCAG AAA compliance (7:1 contrast)
- [ ] Keyboard navigation functional
- [ ] Screen reader announces table structure

### Design System
- [ ] All typography uses design tokens
- [ ] All colors from palette
- [ ] Organic styling applied consistently

---

## 14. Implementation Notes

### File Structure

```
src/app/operator/bookings/
  page.tsx                  // Main bookings list
  components/
    BookingsTable.tsx       // Table component
    BookingsFilters.tsx     // Filter UI
    ParticipantModal.tsx    // Detail view
    MessageModal.tsx        // Send message
```

---

**Status:** ✅ Ready for implementation
**Estimated Complexity:** Medium
**Estimated Build Time:** 3-4 days (table, filters, modals, export)
