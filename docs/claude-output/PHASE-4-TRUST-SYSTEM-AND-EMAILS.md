# Phase 4: Trust System UI + Email Configuration

**Status:** PLANNED
**Created:** 2026-01-24

---

## Overview

Make the trust/strike system transparent across the platform and configure transactional emails via Resend.

---

## Part A: Trust System UI

### A1. How It Works Page Updates

**Add new section: "Our Trust System"**

- [ ] Explain first-time deposit requirement
- [ ] Explain how completing a tour builds trust
- [ ] Explain 24-hour payment window after quorum
- [ ] Explain strike system (what triggers, consequences)
- [ ] Explain deposit tiers (new → trusted → strike 1 → strike 2 → suspended)
- [ ] FAQ: "What if I need to cancel?" / "Can strikes be removed?"

**Files:** `src/app/how-it-works/page.tsx`, new component `TrustSystemSection.tsx`

---

### A2. Tour Detail Page

**Show deposit requirement before join:**

- [ ] Fetch user trust status via `get_user_trust_status()`
- [ ] Display deposit amount (or "No deposit required" for trusted)
- [ ] Brief explanation: "First booking requires a $X deposit to secure your spot"
- [ ] Link to "Learn more about our trust system"

**Files:** `src/app/tours/[id]/page.tsx`

---

### A3. Join Tour Flow

**Clear payment breakdown:**

- [ ] Show: "Deposit now: $X" vs "Balance due when tour confirms: $Y"
- [ ] For trusted users: "No deposit required - you'll pay the full amount when the tour confirms"
- [ ] Explain: "You have 24 hours to complete payment once the tour reaches its threshold"
- [ ] Warning for Strike 1+: "Your account has X strike(s). [Learn more]"

**Files:** `src/app/tours/[id]/join/page.tsx`

---

### A4. User Profile / Dashboard

**New "Trust Status" section:**

- [ ] Trust tier badge (New / Trusted / Strike 1 / Strike 2 / Suspended)
- [ ] Tours completed count
- [ ] Strike count (if any)
- [ ] Strike history with dates and reasons
- [ ] For suspended: Appeal instructions + support contact

**Files:** `src/app/profile/page.tsx`, new component `TrustStatusCard.tsx`

---

### A5. Operator: For Operators Landing

**Add section: "How Deposits Protect You"**

- [ ] Explain birder deposit system
- [ ] Explain forfeited deposits come to them (minus 3%)
- [ ] Explain strike system reduces no-shows over time

**Files:** `src/app/for-operators/page.tsx`

---

### A6. Operator: Create Tour

**Deposit field explanation:**

- [ ] Label: "Deposit Amount"
- [ ] Helper text: "First-time birders and those with 1 strike pay this deposit. Forfeited deposits are transferred to you."
- [ ] Suggested amounts or percentage guidance

**Files:** `src/app/operator/tours/create/page.tsx`

---

### A7. Operator: Bookings Dashboard

**Show trust context:**

- [ ] User trust tier badge on each booking
- [ ] Payment status (Deposit Paid / Awaiting Balance / Confirmed / Forfeited)
- [ ] Forfeited deposits highlighted with amount received

**Files:** `src/app/operator/bookings/page.tsx`

---

### A8. Operator: Earnings Dashboard

**Forfeited deposits section:**

- [ ] Separate line item for forfeited deposits
- [ ] Show: Original deposit, platform fee (3%), net received
- [ ] Link to which booking it came from

**Files:** `src/app/operator/earnings/page.tsx`

---

## Part B: Resend Email Configuration

### B1. Supabase Setup

- [ ] Set Resend API key as secret:
  ```bash
  supabase secrets set RESEND_API_KEY=re_...
  ```

- [ ] Set sender email:
  ```bash
  supabase secrets set EMAIL_FROM=tours@quorumtours.com
  ```

---

### B2. Email Edge Function

**Create `send-email` Edge Function:**

- [ ] Accept: `to`, `template`, `data`
- [ ] Use Resend SDK
- [ ] Log to `email_log` table
- [ ] Handle errors gracefully

**File:** `supabase/functions/send-email/index.ts`

---

### B3. Email Templates

| Template | Trigger | Content |
|----------|---------|---------|
| `welcome` | User signup | Welcome + how the platform works |
| `tour_committed` | User commits to tour | Confirmation + what happens next |
| `quorum_reached` | Tour hits threshold | 24h payment deadline + pay link |
| `payment_reminder` | 12h before deadline | Reminder + consequences |
| `payment_confirmed` | User pays balance | Booking confirmed + tour details |
| `strike_applied` | User misses deadline | Strike notice + account status |
| `waitlist_spot` | Spot opens for waitlist | 24h to claim + pay link |
| `tour_cancelled` | Tour didn't reach quorum | Refund info (if deposit paid) |
| `tour_reminder` | 48h before tour | Tour details + what to bring |

**Operator emails:**

| Template | Trigger | Content |
|----------|---------|---------|
| `new_booking` | Someone commits | New commitment notification |
| `quorum_reached_operator` | Tour hits threshold | Threshold reached + next steps |
| `deposit_forfeited` | User misses deadline | Deposit received notification |
| `tour_confirmed` | All payments collected | Tour is a go + participant list |
| `payout_sent` | After tour completion | Earnings transferred |

---

### B4. Update Edge Functions

**Integrate email sending into existing functions:**

- [ ] `process-quorum/index.ts` → Send `quorum_reached` emails
- [ ] `process-payment-timeout/index.ts` → Send `strike_applied` + `waitlist_spot`
- [ ] `stripe-webhook/index.ts` → Send `payment_confirmed` on success

---

### B5. Email Template Files

**Create HTML templates:**

```
supabase/functions/send-email/templates/
├── welcome.html
├── tour-committed.html
├── quorum-reached.html
├── payment-reminder.html
├── payment-confirmed.html
├── strike-applied.html
├── waitlist-spot.html
├── tour-cancelled.html
├── tour-reminder.html
├── new-booking.html
├── quorum-reached-operator.html
├── deposit-forfeited.html
├── tour-confirmed.html
└── payout-sent.html
```

**Template requirements:**
- [ ] Responsive design (mobile-friendly)
- [ ] Matches brand (Crimson Pro headings, forest green accents)
- [ ] Clear CTAs (big buttons)
- [ ] Unsubscribe link where required
- [ ] Plain text fallback

---

### B6. Cron Jobs for Scheduled Emails

| Schedule | Job | Email |
|----------|-----|-------|
| Every 5 min | Check expired payment windows | (handled by `process-payment-timeout`) |
| Every hour | 12h payment reminders | `payment_reminder` |
| Daily 9am | 48h tour reminders | `tour_reminder` |

---

## Part C: Testing Checklist

### Trust System UI
- [ ] New user sees deposit requirement on tour page
- [ ] Trusted user sees "No deposit required"
- [ ] Strike 1 user sees operator deposit
- [ ] Strike 2 user sees 50% deposit
- [ ] Suspended user sees block message + appeal info
- [ ] User profile shows correct trust status
- [ ] Operator sees trust tiers in bookings

### Email Flow
- [ ] Welcome email on signup
- [ ] Commitment confirmation email
- [ ] Quorum reached email (check 24h deadline)
- [ ] Payment reminder at 12h
- [ ] Payment confirmed email
- [ ] Strike email on timeout
- [ ] Waitlist notification email
- [ ] Operator emails for all relevant events

---

## Execution Order

1. **B1-B2**: Set up Resend + create send-email function
2. **B3-B5**: Create email templates
3. **B4**: Integrate emails into existing Edge Functions
4. **A1**: Update How It Works page
5. **A2-A3**: Tour detail + join flow UI
6. **A4**: User profile trust status
7. **A5-A8**: Operator dashboard updates
8. **B6**: Set up cron jobs
9. **C**: Full testing

---

## Dependencies

- [ ] Resend API key (user has verified domain)
- [ ] Brand assets for email templates (logo, colors)
- [ ] Copy approval for trust system explanations
- [ ] Copy approval for email content

---

## Notes

- All strike/deposit info should be factual, not scary
- Frame as "protecting committed birders" not "punishing bad behavior"
- Always show a path forward (appeal process, how to rebuild trust)
- Operators should feel protected, not like enforcers
