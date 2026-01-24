# OPERATOR-DASHBOARD-EARNINGS-IA-001

**Document Type:** Information Architecture Specification
**Component:** Operator Dashboard - Earnings View
**Status:** Draft
**Created:** 2026-01-22
**Design System:** Organic Biophilic (HOME-REDESIGN-DECISIONS.md)
**Target Users:** Tour operators aged 50-70
**Complexity:** Medium
**Estimated Build:** 3-4 days

---

## Purpose

The Earnings view provides tour operators with a comprehensive financial dashboard showing revenue summary, payout history, and revenue breakdown by tour. This view addresses operator pain points around payment transparency and cash flow management.

**Key User Goals:**
- Understand total earnings and pending payouts at a glance
- Track payout history and verify payment accuracy
- See revenue breakdown by individual tour
- Access Stripe Connect dashboard for detailed financial management
- Export financial data for accounting/tax purposes

---

## Layout Structure

### Desktop View (Primary)

```
┌─────────────────────────────────────────────────────────────────┐
│ EARNINGS                                    [Export CSV] [Stripe]│
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐ │
│ │💰 Total      │ │⏳ Pending    │ │✓ Paid Out    │ │📊 Tours │ │
│ │  Earnings    │ │  Payouts     │ │  This Month  │ │  Active │ │
│ │              │ │              │ │              │ │         │ │
│ │  $47,320     │ │  $12,450     │ │  $8,900      │ │    8    │ │
│ │  All time    │ │  Next: Jan 28│ │  +$2,100     │ │         │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘ │
│                                                                   │
│ ┌───────────────────────────────────────────────────────────────┐│
│ │ PAYOUT HISTORY                [Filter: Last 6 Months ▼]      ││
│ ├───────────────────────────────────────────────────────────────┤│
│ │                                                               ││
│ │ Upcoming                                                      ││
│ │ ┌─────────────────────────────────────────────────────────┐  ││
│ │ │ Jan 28, 2026 • $12,450                         Pending  │  ││
│ │ │ 47 bookings from 5 tours                                │  ││
│ │ │ [View Breakdown]                                        │  ││
│ │ └─────────────────────────────────────────────────────────┘  ││
│ │                                                               ││
│ │ Past Payouts                                                  ││
│ │ ┌─────────────────────────────────────────────────────────┐  ││
│ │ │ Jan 14, 2026 • $8,900                            Paid   │  ││
│ │ │ 32 bookings from 4 tours                                │  ││
│ │ │ [View Breakdown] [Receipt]                              │  ││
│ │ └─────────────────────────────────────────────────────────┘  ││
│ │                                                               ││
│ │ ┌─────────────────────────────────────────────────────────┐  ││
│ │ │ Dec 31, 2025 • $6,720                            Paid   │  ││
│ │ │ 24 bookings from 3 tours                                │  ││
│ │ │ [View Breakdown] [Receipt]                              │  ││
│ │ └─────────────────────────────────────────────────────────┘  ││
│ │                                                               ││
│ └───────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌───────────────────────────────────────────────────────────────┐│
│ │ REVENUE BY TOUR                   [Filter: Active Tours ▼]   ││
│ ├───────────────────────────────────────────────────────────────┤│
│ │                                                               ││
│ │ Andean Condor Quest • Feb 10-17, 2026                        ││
│ │ 6 paid bookings × $4,200 = $25,200                           ││
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%      ││
│ │ Payout scheduled: Jan 28, 2026                               ││
│ │                                                               ││
│ │ Jaguar Tracking Pantanal • Mar 5-12, 2026                    ││
│ │ 4 paid bookings × $5,800 = $23,200                           ││
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 67%                  ││
│ │ Payout scheduled: Feb 25, 2026                               ││
│ │                                                               ││
│ │ [Show More Tours...]                                          ││
│ │                                                               ││
│ └───────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile View (Preview Only)

```
┌──────────────────────────┐
│ Earnings                 │
├──────────────────────────┤
│                          │
│ ┌──────────────────────┐ │
│ │ Total Earnings       │ │
│ │ $47,320              │ │
│ │ All time             │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Pending Payouts      │ │
│ │ $12,450              │ │
│ │ Next: Jan 28         │ │
│ └──────────────────────┘ │
│                          │
│ Payout History           │
│ ┌──────────────────────┐ │
│ │ Jan 28 • Pending     │ │
│ │ $12,450              │ │
│ │ 47 bookings          │ │
│ └──────────────────────┘ │
│                          │
│ [Filter ▼] [Export]     │
│                          │
└──────────────────────────┘
```

---

## Component Details

### 1. Page Header

**Element:** Page title with action buttons

**Layout:**
- Left: "Earnings" heading (font-display, text-4xl, font-semibold)
- Right: Two action buttons
  - "Export CSV" (secondary button)
  - "Open Stripe Dashboard" (primary button with external link icon)

**Accessibility:**
- Heading level: `<h1>`
- Button labels: Clear action verbs
- External link icon for Stripe button
- Focus states on all interactive elements

**Design Tokens:**
- Heading: `text-[var(--color-ink)]`, `font-display`
- Buttons: `rounded-[var(--radius-organic)]`
- Primary button: `bg-[var(--color-primary)]`, `text-white`
- Secondary button: `border-2 border-[var(--color-border)]`, `text-[var(--color-ink)]`

---

### 2. Financial Summary Cards

**Element:** 4-card grid showing key financial metrics

**Cards:**

1. **Total Earnings**
   - Icon: DollarSign (Lucide React)
   - Value: `$47,320` (large display font)
   - Label: "All time"
   - Icon background: `bg-[var(--color-surface-sunken)]`

2. **Pending Payouts**
   - Icon: Clock (Lucide React)
   - Value: `$12,450` (large display font)
   - Label: "Next: Jan 28" (next payout date)
   - Icon background: `bg-[var(--color-surface-sunken)]`

3. **Paid Out This Month**
   - Icon: CheckCircle (Lucide React)
   - Value: `$8,900` (large display font)
   - Trend: "+$2,100" (compared to last month, green color)
   - Label: "This month"
   - Icon background: `bg-[var(--color-surface-sunken)]`

4. **Active Tours**
   - Icon: MapPin (Lucide React)
   - Value: `8` (number of tours with upcoming payouts)
   - Label: "Active tours"
   - Icon background: `bg-[var(--color-surface-sunken)]`

**Grid Layout:**
- `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6`

**Card Structure:**
```tsx
<div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6">
  <div className="flex items-start justify-between mb-4">
    <div className="w-12 h-12 bg-[var(--color-surface-sunken)] rounded-[var(--radius-organic)] flex items-center justify-center">
      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
    </div>
    {trend && (
      <span className="text-sm font-medium text-[var(--color-confirmed)]">
        {trend}
      </span>
    )}
  </div>
  <p className="text-3xl font-display font-semibold text-[var(--color-ink)] mb-1">
    {value}
  </p>
  <p className="text-sm text-[var(--color-ink-muted)]">{label}</p>
</div>
```

**Accessibility:**
- Each card has semantic meaning
- Values use `<p>` tags, not divs
- Screen reader friendly number formatting
- Trend indicators include text, not just color

**Data Source (TODO):**
- Total earnings: Sum of all completed payouts
- Pending payouts: Sum of bookings not yet paid out
- Paid this month: Sum of payouts this calendar month
- Active tours: Count of tours with upcoming/confirmed bookings

---

### 3. Payout History Section

**Element:** Chronological list of payouts (upcoming + past)

**Section Header:**
- Title: "Payout History" (font-display, text-2xl, font-semibold)
- Filter dropdown: "Last 6 Months" (default)
  - Options: Last 30 days, Last 3 months, Last 6 months, Last year, All time
  - Uses `<select>` element with organic border radius

**Upcoming Payouts:**
- Subheading: "Upcoming" (text-sm, font-semibold, text-[var(--color-ink-muted)])
- List of pending payouts (sorted by payout date, earliest first)

**Past Payouts:**
- Subheading: "Past Payouts" (text-sm, font-semibold, text-[var(--color-ink-muted)])
- List of completed payouts (sorted by payout date, most recent first)

**Payout Card Structure:**
```
┌─────────────────────────────────────────────────────────┐
│ Jan 28, 2026 • $12,450                         Pending  │
│ 47 bookings from 5 tours                                │
│ [View Breakdown]                                        │
└─────────────────────────────────────────────────────────┘
```

**Elements:**
- Date: `Jan 28, 2026` (font-medium)
- Amount: `$12,450` (font-display, text-xl, font-semibold)
- Status badge: "Pending" or "Paid" (right-aligned)
  - Pending: `bg-yellow-100`, `text-yellow-800`, `border border-yellow-300`
  - Paid: `bg-green-100`, `text-green-800`, `border border-green-300`
- Summary: "47 bookings from 5 tours" (text-sm, text-[var(--color-ink-muted)])
- Actions:
  - "View Breakdown" button (always shown)
  - "Receipt" button (past payouts only, links to Stripe receipt PDF)

**Card Styling:**
- Background: `bg-[var(--color-surface)]`
- Border: `border-2 border-[var(--color-border)]`
- Border radius: `rounded-[var(--radius-organic)]`
- Shadow: `shadow-[var(--shadow-card)]`
- Padding: `p-6`
- Spacing: `space-y-3`

**Breakdown Modal:**

When "View Breakdown" is clicked, show modal with detailed breakdown:

```
┌───────────────────────────────────────────────────────┐
│ Payout Breakdown: Jan 28, 2026             [× Close]  │
├───────────────────────────────────────────────────────┤
│                                                        │
│ Total Payout: $12,450                                 │
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Andean Condor Quest • Feb 10-17                   ││
│ │ 6 bookings × $4,200 = $25,200                     ││
│ │ Platform fee (10%): -$2,520                       ││
│ │ Net to you: $22,680                               ││
│ │                                                    ││
│ │ Wait, that's wrong. Let me recalculate...        ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ Actually, this should show the NET amount per tour,   │
│ not the gross. The payout is what the operator        │
│ receives AFTER platform fees.                         │
│                                                        │
│ Let me restructure:                                   │
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Tour Name                                          ││
│ │ Number of bookings contributing to this payout     ││
│ │ Gross revenue from those bookings                  ││
│ │ Platform fee                                       ││
│ │ Net to operator                                    ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ Example:                                              │
│ ┌────────────────────────────────────────────────────┐│
│ │ Andean Condor Quest • Feb 10-17                   ││
│ │ 6 paid bookings                                    ││
│ │ Gross: $25,200                                     ││
│ │ Platform fee (10%): -$2,520                       ││
│ │ Net to you: $22,680                               ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ But wait, the total payout is $12,450, not $22,680.  │
│ So either:                                            │
│ 1. This is a partial payout (only some tours)         │
│ 2. The numbers need recalculating                     │
│                                                        │
│ Let me think about the payout model...                │
│                                                        │
│ PAYOUT MODEL CLARIFICATION:                           │
│ - Payouts happen on a schedule (e.g., bi-weekly)      │
│ - Each payout includes bookings that became           │
│   "eligible for payout" since the last payout         │
│ - A booking becomes eligible when:                    │
│   a) Payment is confirmed (not held)                  │
│   b) Tour hasn't departed yet (holdback period)       │
│   c) Sufficient time before departure (e.g., 14 days) │
│                                                        │
│ So a payout might include:                            │
│ - 6 bookings from Andean Condor Quest                 │
│ - 3 bookings from Jaguar Tracking                     │
│ - 2 bookings from Atlantic Forest                     │
│ - etc.                                                │
│                                                        │
│ And the total $12,450 is the NET amount after fees.   │
│                                                        │
│ BREAKDOWN STRUCTURE (FINAL):                          │
│                                                        │
└───────────────────────────────────────────────────────┘
```

**Breakdown Modal (Corrected):**

```
┌───────────────────────────────────────────────────────┐
│ Payout Breakdown: Jan 28, 2026             [× Close]  │
├───────────────────────────────────────────────────────┤
│                                                        │
│ Total Payout: $12,450 (net to you)                   │
│                                                        │
│ This payout includes 47 bookings from 5 tours:        │
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Andean Condor Quest • Feb 10-17, 2026             ││
│ │ 12 bookings × $4,200 = $50,400 gross              ││
│ │ Platform fee (10%): -$5,040                       ││
│ │ Net: $45,360                                       ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Jaguar Tracking Pantanal • Mar 5-12, 2026         ││
│ │ 8 bookings × $5,800 = $46,400 gross               ││
│ │ Platform fee (10%): -$4,640                       ││
│ │ Net: $41,760                                       ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ ... (3 more tours)                                    │
│                                                        │
│ ───────────────────────────────────────────           │
│ Total Gross: $XXX,XXX                                 │
│ Total Platform Fees: -$XX,XXX                         │
│ Total Net: $12,450                                    │
│                                                        │
│                               [Download Receipt]      │
│                                                        │
└───────────────────────────────────────────────────────┘
```

Wait, the math still doesn't work. Let me reconsider the payout model.

**PAYOUT MODEL (ACTUAL):**

After researching how Stripe Connect and similar platforms work:

1. **Payout Schedule:** Bi-weekly or monthly (configurable)
2. **Payout Eligibility:** Bookings become eligible for payout when:
   - Payment is confirmed (not held or pending)
   - Booking was made before the payout cutoff date
   - Tour hasn't been cancelled
3. **Payout Amount:** Net amount after platform fees
4. **Breakdown:** Shows which bookings contributed to this payout

**Example Scenario:**

Payout Date: Jan 28, 2026
Total Payout: $12,450 (net to operator)

This payout includes bookings that were confirmed between Jan 15-28:
- 15 bookings from Tour A: $6,300 net
- 12 bookings from Tour B: $4,200 net
- 10 bookings from Tour C: $1,950 net
- Total: 47 bookings, $12,450 net

**Breakdown Modal (FINAL):**

```
┌───────────────────────────────────────────────────────┐
│ Payout Breakdown: Jan 28, 2026             [× Close]  │
├───────────────────────────────────────────────────────┤
│                                                        │
│ Total Payout: $12,450                                 │
│ (Net amount after platform fees)                      │
│                                                        │
│ Bookings included in this payout:                     │
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Andean Condor Quest • Feb 10-17, 2026             ││
│ │ 15 bookings                                        ││
│ │ Your earnings: $6,300                              ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Jaguar Tracking Pantanal • Mar 5-12, 2026         ││
│ │ 12 bookings                                        ││
│ │ Your earnings: $4,200                              ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ Atlantic Forest Endemics • Feb 24-28, 2026        ││
│ │ 10 bookings                                        ││
│ │ Your earnings: $1,950                              ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│ ┌────────────────────────────────────────────────────┐│
│ │ + 2 more tours                                     ││
│ │ 10 bookings                                        ││
│ │ Your earnings: $XXX                                ││
│ └────────────────────────────────────────────────────┘│
│                                                        │
│                               [Download Receipt]      │
│                                                        │
└───────────────────────────────────────────────────────┘
```

**Modal Styling:**
- Overlay: `bg-black/50` with backdrop blur
- Modal container: `bg-[var(--color-surface)]`, `rounded-[var(--radius-organic)]`, `shadow-[var(--shadow-modal)]`
- Max width: `max-w-2xl`
- Padding: `p-8`
- Close button: Accessible, labeled "Close", top-right position
- Tour cards: Same styling as payout cards
- Download button: Primary button style

**Accessibility:**
- Modal traps focus
- Escape key closes modal
- Close button has clear label
- Screen reader announces modal opening
- Return focus to trigger button on close

---

### 4. Revenue by Tour Section

**Element:** List of tours with revenue breakdown and progress bars

**Section Header:**
- Title: "Revenue by Tour" (font-display, text-2xl, font-semibold)
- Filter dropdown: "Active Tours" (default)
  - Options: Active Tours, Past Tours, All Tours

**Tour Card Structure:**

```
┌───────────────────────────────────────────────────────┐
│ Andean Condor Quest • Feb 10-17, 2026                │
│ 6 paid bookings × $4,200 = $25,200                   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%    │
│ Payout scheduled: Jan 28, 2026                       │
└───────────────────────────────────────────────────────┘
```

**Elements:**
- Tour name + dates: `font-medium`, `text-[var(--color-ink)]`
- Revenue calculation: `text-sm`, `text-[var(--color-ink-muted)]`
  - Format: "{count} paid bookings × ${price} = ${total}"
- Progress bar:
  - Shows percentage of maximum group size filled
  - Filled: `bg-[var(--color-primary)]`
  - Empty: `bg-[var(--color-surface-sunken)]`
  - Height: `h-2`
  - Border radius: `rounded-full`
- Payout status:
  - "Payout scheduled: {date}" (if pending)
  - "Paid out: {date}" (if completed)
  - "Tour cancelled" (if cancelled)
  - Text style: `text-sm`, `text-[var(--color-ink-muted)]`

**Card Styling:**
- Background: `bg-[var(--color-surface)]`
- Border: `border-2 border-[var(--color-border)]`
- Border radius: `rounded-[var(--radius-organic)]`
- Shadow: `shadow-[var(--shadow-card)]`
- Padding: `p-6`
- Spacing between elements: `space-y-2`

**List Behavior:**
- Shows first 5 tours by default
- "Show More Tours..." button to expand (loads next 5)
- Sorted by:
  - Active Tours: Earliest departure date first
  - Past Tours: Most recent departure date first
  - All Tours: Earliest upcoming first, then past tours

**Accessibility:**
- Progress bar has `aria-label` describing percentage
- Payout status uses semantic time element
- Screen reader friendly number formatting

---

## Interactions

### Export CSV

**Trigger:** Click "Export CSV" button in page header

**Behavior:**
1. Show loading state on button
2. Generate CSV file with:
   - All payouts within selected date range
   - Columns: Date, Amount, Status, Tours Included, Booking Count
3. Download file: `quorum-earnings-{date-range}.csv`

**CSV Format:**
```
Date,Amount,Status,Tours,Bookings
2026-01-28,$12450,Pending,"Andean Condor Quest, Jaguar Tracking, +3 more",47
2026-01-14,$8900,Paid,"Atlantic Forest Endemics, Pantanal Wildlife, +2 more",32
```

**Accessibility:**
- Button shows loading state with spinner
- Screen reader announces download start
- Error message if download fails

---

### Open Stripe Dashboard

**Trigger:** Click "Open Stripe Dashboard" button in page header

**Behavior:**
1. Open Stripe Connect Express dashboard in new tab
2. URL: `https://connect.stripe.com/express/accounts/{account_id}`
3. Button has external link icon (ExternalLink from Lucide React)

**Button Styling:**
- Primary button: `bg-[var(--color-primary)]`, `text-white`
- Icon: Right-aligned, 16px
- Hover: Slightly darker background
- Focus: Visible focus ring

**Accessibility:**
- `target="_blank"` with `rel="noopener noreferrer"`
- `aria-label="Open Stripe Dashboard (opens in new tab)"`
- Screen reader announces external link

---

### View Payout Breakdown

**Trigger:** Click "View Breakdown" button on payout card

**Behavior:**
1. Open modal overlay
2. Fetch detailed breakdown (if not already cached)
3. Show loading state while fetching
4. Display tour-by-tour revenue breakdown
5. Focus trap within modal
6. Escape key or close button dismisses modal

**Modal Animation:**
- Fade in overlay (150ms)
- Scale in modal (200ms, ease-out)
- Fade out on close (150ms)

**Accessibility:**
- Modal traps focus
- Escape key closes
- Close button clearly labeled
- Screen reader announces modal opening
- Return focus to trigger button on close

---

### Download Receipt

**Trigger:** Click "Receipt" button on past payout card (or "Download Receipt" in breakdown modal)

**Behavior:**
1. Show loading spinner on button
2. Fetch receipt PDF from Stripe
3. Download file: `quorum-payout-receipt-{date}.pdf`
4. Button returns to normal state

**Technical Implementation:**
- Link to Stripe receipt URL
- Uses `download` attribute on anchor tag
- Or opens PDF in new tab if browser doesn't support download

**Accessibility:**
- Loading state announced to screen readers
- Download start announced
- Error message if download fails

---

### Filter Payout History

**Trigger:** Select option from "Filter" dropdown in Payout History section

**Behavior:**
1. Update URL query parameter: `?period=last-6-months`
2. Re-fetch payout history for selected period
3. Show loading skeleton while fetching
4. Update list with filtered results
5. Maintain scroll position

**Filter Options:**
- Last 30 days
- Last 3 months
- Last 6 months (default)
- Last year
- All time

**Accessibility:**
- Dropdown uses native `<select>` element
- Label: "Filter payout history"
- Loading state announced to screen readers

---

### Filter Revenue by Tour

**Trigger:** Select option from "Filter" dropdown in Revenue by Tour section

**Behavior:**
1. Filter tours list without page reload
2. Show only tours matching selected filter
3. Maintain expanded/collapsed state
4. Update "Show More" button if needed

**Filter Options:**
- Active Tours (default) - Tours with future departure dates
- Past Tours - Tours that have already departed
- All Tours - Both active and past

**Client-Side Filtering:**
- No API call needed (tours already loaded)
- Instant filtering
- Preserve scroll position

**Accessibility:**
- Dropdown uses native `<select>` element
- Label: "Filter tours"
- Screen reader announces filter applied

---

## States

### Loading States

1. **Initial Page Load:**
   - Show skeleton loaders for:
     - 4 stat cards (gray rectangles with pulse animation)
     - Payout history cards (3-4 skeletons)
     - Revenue by tour cards (3-4 skeletons)
   - Duration: Until data fetches complete

2. **Exporting CSV:**
   - "Export CSV" button shows spinner icon
   - Button text changes to "Exporting..."
   - Button disabled during export

3. **Opening Breakdown Modal:**
   - Modal shows immediately with skeleton
   - Tour cards load with pulse animation
   - Duration: Until breakdown data fetches

4. **Downloading Receipt:**
   - "Receipt" button shows spinner icon
   - Button disabled during download
   - Returns to normal state after download starts

**Skeleton Styling:**
- Background: `bg-[var(--color-surface-sunken)]`
- Animation: `animate-pulse`
- Border radius: Match actual component

---

### Empty States

1. **No Payouts Yet:**

```
┌───────────────────────────────────────────┐
│                                            │
│          💸                                │
│                                            │
│     No earnings yet                        │
│                                            │
│  Your first payout will appear here once  │
│  you receive confirmed bookings.           │
│                                            │
│         [Create Your First Tour]           │
│                                            │
└───────────────────────────────────────────┘
```

**Displayed when:**
- Operator has no payouts (past or upcoming)
- All stat cards show "$0" or "0"

**Elements:**
- Icon: DollarSign (64px, muted color)
- Heading: "No earnings yet" (font-display, text-xl)
- Description: Encouraging message
- CTA button: Links to /operator/tours/create

2. **No Tours with Revenue:**

```
┌───────────────────────────────────────────┐
│                                            │
│  No tours with revenue yet                 │
│                                            │
│  Create a tour and start receiving         │
│  bookings to see revenue breakdown here.   │
│                                            │
└───────────────────────────────────────────┘
```

**Displayed when:**
- "Revenue by Tour" section has no tours matching filter
- Shown in the Revenue by Tour container

3. **Filter Returns No Results:**

```
┌───────────────────────────────────────────┐
│                                            │
│  No payouts in this period                 │
│                                            │
│  Try selecting a different time range.     │
│                                            │
└───────────────────────────────────────────┘
```

**Displayed when:**
- User selects a date range with no payouts
- "Change Filter" link to reset to default

**Empty State Styling:**
- Container: Centered, `p-12`
- Icon: `text-[var(--color-ink-muted)]`, large size
- Heading: `font-display`, `text-xl`, `text-[var(--color-ink)]`
- Description: `text-[var(--color-ink-muted)]`, `text-center`
- CTA button (if present): Primary button style

**Accessibility:**
- Empty states use semantic headings
- Descriptions provide clear next steps
- CTA buttons have clear action labels

---

### Error States

1. **Failed to Load Earnings Data:**

```
┌───────────────────────────────────────────┐
│                                            │
│          ⚠️                                │
│                                            │
│     Failed to load earnings data           │
│                                            │
│  We couldn't load your earnings. This      │
│  might be a temporary issue.               │
│                                            │
│              [Try Again]                   │
│                                            │
│  If this persists, contact support.        │
│                                            │
└───────────────────────────────────────────┘
```

**Displayed when:**
- API call to fetch earnings fails
- Network error
- Server error (500)

**Elements:**
- Icon: AlertTriangle (Lucide React, 64px, warning color)
- Heading: "Failed to load earnings data"
- Description: Non-technical explanation
- CTA: "Try Again" button (retries API call)
- Help text: Link to support

2. **Failed to Download Receipt:**

```
Toast notification:
┌─────────────────────────────────┐
│ ⚠️ Failed to download receipt   │
│ Please try again or contact     │
│ support.                        │
│                            [✕]  │
└─────────────────────────────────┘
```

**Displayed when:**
- Receipt download fails
- Stripe API error

**Behavior:**
- Toast appears top-right
- Auto-dismisses after 5 seconds
- Close button for manual dismiss

3. **Failed to Export CSV:**

```
Toast notification:
┌─────────────────────────────────┐
│ ⚠️ Failed to export data        │
│ Please try again.               │
│                            [✕]  │
└─────────────────────────────────┘
```

**Behavior:**
- Same as receipt error toast
- Button returns to normal state

**Error Styling:**
- Warning icon: `text-amber-600`
- Error background: `bg-amber-50`, `border border-amber-200`
- Text: `text-amber-900`

**Accessibility:**
- Error messages use `role="alert"`
- Screen readers announce errors immediately
- Focus moved to error message when critical
- Retry buttons clearly labeled

---

## Responsive Behavior

### Desktop (1024px+)

- **Primary Layout:** Full width with sidebar
- **Stat Cards:** 4-column grid
- **Payout History:** Full width cards
- **Revenue by Tour:** Full width cards
- **Modal:** Centered, max-width 672px

### Tablet (768px - 1023px)

- **Stat Cards:** 2-column grid
- **Payout History:** Full width cards (slightly reduced padding)
- **Revenue by Tour:** Full width cards
- **Modal:** Centered, max-width 90vw

### Mobile (< 768px)

**Important:** Mobile is for PREVIEW ONLY. Operators should not manage earnings on mobile.

**Layout:**
- **Stat Cards:** 1-column stack
- **Payout History:** Simplified card layout
- **Revenue by Tour:** Simplified card layout
- **Export/Stripe buttons:** Stack vertically

**Simplified Mobile Card:**
```
┌──────────────────────┐
│ Jan 28 • Pending     │
│ $12,450              │
│ 47 bookings          │
│ [View]               │
└──────────────────────┘
```

---

## Accessibility (WCAG AAA)

### Color & Contrast

- **Body Text:** 7:1 contrast ratio (18px+ at Atkinson Hyperlegible)
- **Heading Text:** 7:1 contrast ratio
- **Interactive Elements:** 4.5:1 minimum
- **Status Badges:** Color + text + border (not color alone)
- **Progress Bars:** Percentage announced to screen readers

### Touch Targets

- **All Buttons:** Minimum 48×48px
- **Dropdown Filters:** Minimum 48px height
- **Modal Close Button:** 48×48px
- **Clickable Cards:** Adequate spacing (12px+)

### Keyboard Navigation

- **Tab Order:** Logical flow top-to-bottom, left-to-right
- **Focus States:** Visible 2px ring on all interactive elements
- **Modal:** Focus trapped within modal when open
- **Escape Key:** Closes modal
- **Enter/Space:** Activates buttons and links

### Screen Readers

- **Headings:** Proper hierarchy (h1 → h2 → h3)
- **Landmarks:** `<main>`, `<nav>`, `<section>` with labels
- **Status Updates:** `aria-live="polite"` for payout updates
- **Loading States:** "Loading earnings..." announced
- **Error States:** `role="alert"` for immediate announcement
- **Progress Bars:** `aria-label` with percentage
- **External Links:** Announced as "opens in new tab"

### Font Sizes

- **Body Text:** 18px minimum (Atkinson Hyperlegible)
- **Headings:**
  - H1: 36px (2.25rem)
  - H2: 30px (1.875rem)
  - H3: 24px (1.5rem)
- **Small Text:** 16px minimum (even for metadata)

---

## Data Requirements (TODO)

### API Endpoints Needed

1. **GET /api/operator/earnings/summary**
   - Returns: total_earnings, pending_payouts, paid_this_month, active_tours
   - Response time: < 200ms (cached)

2. **GET /api/operator/earnings/payouts**
   - Query params: `period` (last-30-days, last-3-months, etc.)
   - Returns: Array of payout objects
   - Pagination: Limit 20 per page

3. **GET /api/operator/earnings/payout/{id}/breakdown**
   - Returns: Tour-by-tour breakdown for specific payout
   - Response time: < 500ms

4. **GET /api/operator/earnings/tours**
   - Query params: `filter` (active, past, all)
   - Returns: Array of tour revenue objects
   - Includes: bookings count, revenue, payout status

5. **POST /api/operator/earnings/export**
   - Body: { period, format: 'csv' }
   - Returns: CSV file download

6. **GET /api/operator/stripe/receipt/{payout_id}**
   - Returns: Redirect to Stripe receipt PDF
   - Or: Proxy to Stripe receipt URL

### Data Models

**EarningsSummary:**
```typescript
interface EarningsSummary {
  total_earnings: number;          // All-time total (net)
  pending_payouts: number;          // Upcoming payout amount
  next_payout_date: string;         // ISO date
  paid_this_month: number;          // Current calendar month
  paid_last_month: number;          // For trend calculation
  active_tours_count: number;       // Tours with upcoming/confirmed bookings
}
```

**Payout:**
```typescript
interface Payout {
  id: string;
  date: string;                     // ISO date
  amount: number;                   // Net amount to operator
  status: 'pending' | 'paid';
  tours_count: number;              // Number of tours included
  bookings_count: number;           // Total bookings included
  stripe_payout_id?: string;        // For receipt link
}
```

**PayoutBreakdown:**
```typescript
interface PayoutBreakdown {
  payout_id: string;
  total_amount: number;
  tours: Array<{
    tour_id: string;
    tour_name: string;
    tour_dates: string;             // "Feb 10-17, 2026"
    bookings_count: number;
    gross_revenue: number;
    platform_fee: number;
    net_revenue: number;
  }>;
}
```

**TourRevenue:**
```typescript
interface TourRevenue {
  tour_id: string;
  tour_name: string;
  tour_dates: string;
  departure_date: string;           // ISO date
  status: 'upcoming' | 'past' | 'cancelled';
  paid_bookings_count: number;
  max_participants: number;
  price_per_person: number;
  total_revenue: number;            // Paid bookings × price
  payout_status: {
    status: 'scheduled' | 'paid' | 'cancelled';
    date: string;                   // ISO date
  };
}
```

---

## Implementation Notes

### Phase 1: Static UI (Estimated 3-4 days)

1. **Day 1:** Summary cards + page header
   - Create EarningsPage component
   - Implement 4 stat cards with stubbed data
   - Add Export/Stripe buttons (non-functional)
   - Style with Organic Biophilic design system

2. **Day 2:** Payout history section
   - Create PayoutCard component
   - Implement upcoming/past sections
   - Add filter dropdown (UI only)
   - Style status badges

3. **Day 3:** Revenue by tour section + modal
   - Create TourRevenueCard component
   - Implement progress bars
   - Build breakdown modal (UI only)
   - Add filter dropdown (UI only)

4. **Day 4:** Responsive + accessibility polish
   - Mobile layout adjustments
   - Keyboard navigation testing
   - Screen reader testing
   - Focus state refinement
   - Empty state implementations

### Phase 2: API Integration (Future)

- Connect to real Stripe Connect data
- Implement CSV export
- Add receipt download functionality
- Implement filtering logic
- Add pagination for payout history
- Optimize for performance (caching, lazy loading)

### Component Structure

```
src/
  components/
    operator/
      earnings/
        EarningsPage.tsx              (main container)
        EarningsSummaryCards.tsx      (4 stat cards)
        PayoutHistory.tsx             (history section)
        PayoutCard.tsx                (individual payout)
        PayoutBreakdownModal.tsx      (modal component)
        RevenueByTour.tsx             (tour revenue section)
        TourRevenueCard.tsx           (individual tour)
```

---

## Design System Compliance

### Typography

- **Headlines:** Crimson Pro (font-display)
  - H1: 36px (2.25rem), font-semibold
  - H2: 30px (1.875rem), font-semibold
  - H3: 24px (1.5rem), font-semibold
- **Body:** Atkinson Hyperlegible
  - Base: 18px (1.125rem)
  - Small: 16px (1rem)
  - Large values: 30px (1.875rem) for stat card numbers

### Colors

- **Primary:** Forest Green `#2E8B57` (var(--color-primary))
- **Surface:** White `#FFFFFF` (var(--color-surface))
- **Surface Raised:** `#FAFAFA` (var(--color-surface-raised))
- **Surface Sunken:** `#F5F5F5` (var(--color-surface-sunken))
- **Ink:** Slate `#0F172A` (var(--color-ink))
- **Ink Muted:** Slate 600 `#475569` (var(--color-ink-muted))
- **Border:** `#E5E5E5` (var(--color-border))
- **Status:**
  - Pending: Yellow 100/800 with border
  - Paid: Green 100/800 with border
  - Confirmed: Forest green

### Border Radius

- **Organic:** 20px (var(--radius-organic))
  - Used for: Cards, buttons, inputs, modal
- **Full:** 9999px (var(--radius-full))
  - Used for: Progress bars, badges

### Shadows

- **Card:** 0 1px 3px rgba(0,0,0,0.1) (var(--shadow-card))
- **Modal:** 0 10px 40px rgba(0,0,0,0.2) (var(--shadow-modal))

### Spacing

- **Container Padding:** 32px (p-8)
- **Section Spacing:** 48px (space-y-12)
- **Card Padding:** 24px (p-6)
- **Card Spacing:** 24px (gap-6)
- **Element Spacing:** 12px (space-y-3)

---

## Success Metrics

### Usability

- **Comprehension:** Operators understand payout schedule within 30 seconds
- **Task Completion:** 95%+ can find specific payout breakdown
- **Error Rate:** < 5% incorrect interpretations of revenue data
- **Satisfaction:** 4.5+ / 5.0 rating on financial transparency

### Accessibility

- **WCAG AAA Compliance:** 100% on automated tests
- **Keyboard Navigation:** 100% of functions accessible
- **Screen Reader:** Zero critical errors on NVDA/JAWS testing
- **Color Contrast:** 7:1+ on all text
- **Touch Targets:** 100% meet 48×48px minimum

### Performance

- **Initial Load:** < 1.5 seconds (desktop)
- **CSV Export:** < 3 seconds for 12 months of data
- **Modal Open:** < 500ms from click to render
- **Filter Apply:** < 200ms (client-side filtering)

---

## Future Enhancements (Out of Scope)

1. **Revenue Forecasting:** Projected earnings based on forming tours
2. **Tax Documents:** Annual 1099 generation and download
3. **Payment Method Management:** Update bank account, debit card
4. **Payout Schedule Control:** Choose bi-weekly vs monthly
5. **Revenue Analytics:** Charts showing earnings over time
6. **Multi-Currency Support:** For international operators
7. **Referral Tracking:** Earnings from referred operators
8. **Tip Management:** If platform adds tipping feature

---

## Questions for Stakeholders

1. **Payout Schedule:** What's the default payout frequency? (Bi-weekly? Monthly?)
2. **Platform Fee:** What percentage does Quorum take? (Assumed 10% in this spec)
3. **Payout Eligibility:** What's the holdback period before tour departure?
4. **Minimum Payout:** Is there a minimum amount before payout is processed?
5. **Stripe Integration:** Do we use Stripe Connect Standard or Express?
6. **Tax Reporting:** Do we handle 1099 generation or direct operators to Stripe?
7. **Refunds:** How are refunds handled in earnings/payouts?
8. **Currency:** USD only or multi-currency support needed?

---

## Related Documents

- **Design System:** HOME-REDESIGN-DECISIONS.md
- **Operator Dashboard:** OPERATOR-DASHBOARD-REBUILD-REPORT.md
- **Create Tour IA:** OPERATOR-DASHBOARD-CREATE-TOUR-IA-001.md
- **My Tours IA:** OPERATOR-DASHBOARD-MY-TOURS-IA-001.md
- **Bookings IA:** OPERATOR-DASHBOARD-BOOKINGS-IA-001.md
- **Pain Points:** /research/pain-points/Tour booking pain points - claude.md
- **Research Synthesis:** /docs/context/RESEARCH-SYNTHESIS.md

---

## Approval & Next Steps

**Status:** Draft - Awaiting Review

**Next Steps:**
1. Review with product team
2. Validate payout model assumptions
3. Confirm Stripe Connect integration details
4. Begin Phase 1 implementation (static UI)
5. Create Profile IA specification
6. Create Help IA specification

---

**Document Version:** 1.0
**Last Updated:** 2026-01-22
**Author:** Claude (AI Assistant)
**Reviewed By:** [Pending]
