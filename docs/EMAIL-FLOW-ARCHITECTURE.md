# Email Flow Architecture

**Last Updated:** 2026-01-27

This document describes all transactional email triggers in the Quorum Tours platform.

---

## Overview

Emails are sent via the `send-email` Supabase Edge Function which uses the Resend API.

**Infrastructure:**
- **Email Provider:** Resend (`re_xxx` API key in `RESEND_API_KEY`)
- **From Address:** `Quorum Tours <tours@quorumtours.com>` (configurable via `EMAIL_FROM`)
- **Edge Function:** `supabase/functions/send-email/index.ts`
- **Templates:** `supabase/functions/send-email/templates/*.ts`

---

## Email Templates (14 Total)

| Template Key | Trigger | Recipient | Purpose |
|-------------|---------|-----------|---------|
| `welcome` | Profile created | New user | Onboarding, introduce platform |
| `tour_committed` | Deposit paid | User | Confirm commitment to tour |
| `quorum_reached` | Tour hits min participants | All committed users | Notify payment window open |
| `quorum_reached_operator` | Tour hits min participants | Operator | Notify tour is proceeding |
| `payment_reminder` | Payment failed OR deadline approaching | User | Prompt payment completion |
| `payment_confirmed` | Balance payment complete | User | Confirm tour booking |
| `strike_applied` | Payment timeout | User | Notify of strike and deposit forfeit |
| `waitlist_spot` | Spot opens from dropout | Waitlist user | Offer spot to next in line |
| `tour_cancelled` | Tour fails to reach quorum | All committed users | Notify of cancellation + refund |
| `tour_confirmed` | All payments received | All confirmed users | Final confirmation |
| `tour_reminder` | 7 days / 1 day before tour | Confirmed users | Reminder with details |
| `deposit_forfeited` | User abandons after quorum | User who abandoned | Notify deposit was forfeited |
| `new_booking` | New commitment | Operator | Alert about new participant |
| `payout_sent` | Transfer complete | Operator | Confirm payment received |

---

## Trigger Points

### 1. User Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│  Signup     │ ──▶ │  Profile    │ ──▶ │  Welcome Email  │
│  (Auth)     │     │  Created    │     │  (welcome)      │
└─────────────┘     └─────────────┘     └─────────────────┘
                          │
                          ▼ DB Trigger (if pg_net available)
                    send_welcome_email()
```

**Trigger Location:** `supabase/migrations/20260127000001_welcome_email_trigger.sql`

### 2. Tour Commitment Flow

```
┌─────────────┐     ┌─────────────────┐     ┌───────────────────┐
│  User       │ ──▶ │  Stripe         │ ──▶ │  tour_committed   │
│  Commits    │     │  Checkout       │     │  Email            │
└─────────────┘     │  (deposit)      │     └───────────────────┘
                    └─────────────────┘              │
                          │                          ▼
                          │                    ┌───────────────────┐
                          │                    │  new_booking      │
                          │                    │  (to operator)    │
                          └───────────────────▶└───────────────────┘
```

**Trigger Location:** `supabase/functions/stripe-webhook/index.ts`
- Event: `checkout.session.completed` with `payment_type: 'deposit'`

### 3. Quorum Reached Flow

```
┌─────────────────┐     ┌─────────────────────┐     ┌───────────────────┐
│  Tour reaches   │ ──▶ │  process-quorum     │ ──▶ │  quorum_reached   │
│  min threshold  │     │  Edge Function      │     │  (to all users)   │
└─────────────────┘     └─────────────────────┘     └───────────────────┘
                                  │
                                  ▼
                        ┌───────────────────────────┐
                        │  quorum_reached_operator  │
                        │  (to operator)            │
                        └───────────────────────────┘
```

**Trigger Location:** `supabase/functions/process-quorum/index.ts`
- Called manually or via cron when tour participant count >= threshold

### 4. Payment Window (24 hours)

```
┌─────────────────┐     ┌─────────────────────┐
│  quorum_reached │     │  User pays          │
│  email sent     │     │  balance            │
└────────┬────────┘     └──────────┬──────────┘
         │                         │
         │   ┌─────────────────┐   │
         └──▶│  24hr window    │◀──┘
             └────────┬────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
   ┌──────────┐ ┌──────────┐ ┌────────────────┐
   │ PAID     │ │ TIMEOUT  │ │ PAYMENT FAILED │
   └────┬─────┘ └────┬─────┘ └───────┬────────┘
        │            │               │
        ▼            ▼               ▼
 payment_confirmed  strike_applied  payment_reminder
```

**Trigger Locations:**
- Paid: `supabase/functions/stripe-webhook/index.ts` - `checkout.session.completed` with `payment_type: 'balance'`
- Timeout: `supabase/functions/process-payment-timeout/index.ts` - via cron
- Failed: `supabase/functions/stripe-webhook/index.ts` - `payment_intent.payment_failed`

### 5. Waitlist Flow

```
┌─────────────────┐     ┌─────────────────────┐     ┌───────────────────┐
│  User abandons  │ ──▶ │  process-payment-   │ ──▶ │  waitlist_spot    │
│  (timeout)      │     │  timeout            │     │  (to waitlist #1) │
└─────────────────┘     └─────────────────────┘     └───────────────────┘
```

**Trigger Location:** `supabase/functions/process-payment-timeout/index.ts`

### 6. Tour Confirmation / Cancellation

```
┌─────────────────────┐
│  Payment window     │
│  closes             │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌──────────┐ ┌──────────┐
│ ALL PAID │ │ NOT ALL  │
└────┬─────┘ │ PAID     │
     │       └────┬─────┘
     ▼            ▼
tour_confirmed  tour_cancelled
(+ tour_reminder later)
```

**Trigger Locations:**
- Confirmed: `supabase/functions/stripe-webhook/index.ts` - `checkTourFullyPaid()`
- Cancelled: Cron job (TBD - needs implementation)

### 7. Operator Payouts

```
┌─────────────────┐     ┌─────────────────────┐     ┌───────────────────┐
│  Tour complete  │ ──▶ │  Stripe transfer    │ ──▶ │  payout_sent      │
│  (after tour)   │     │  to operator        │     │  (to operator)    │
└─────────────────┘     └─────────────────────┘     └───────────────────┘
```

**Trigger Location:** `supabase/functions/stripe-webhook/index.ts` - `transfer.created`

---

## Cron Jobs

All cron jobs are implemented with two options:
1. **Supabase pg_cron** (Pro plan) - Database-level scheduling
2. **Vercel Cron** (Free tier) - API route scheduling

| Job | Schedule | Edge Function | API Route |
|-----|----------|---------------|-----------|
| Tour reminders | Daily 9am AEST | `send-tour-reminders` | `/api/cron/tour-reminders` |
| Payment timeouts | Every 5 min | `process-payment-timeout` | `/api/cron/payment-timeouts` |
| Failed tours | Hourly | `process-failed-tours` | `/api/cron/failed-tours` |

### Vercel Cron Configuration (`vercel.json`)
```json
{
  "crons": [
    { "path": "/api/cron/tour-reminders", "schedule": "0 23 * * *" },
    { "path": "/api/cron/payment-timeouts", "schedule": "*/5 * * * *" },
    { "path": "/api/cron/failed-tours", "schedule": "0 * * * *" }
  ]
}
```

### Environment Variable Required
```
CRON_SECRET=your-secret-for-vercel-cron
```

---

## Email Log Table

All emails are logged to `public.email_log` for audit and debugging:

```sql
email_log (
  id UUID,
  user_id UUID,
  email_type TEXT,
  subject TEXT,
  recipient_email TEXT,
  status TEXT,  -- 'pending', 'sent', 'failed'
  sent_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ
)
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for sending emails |
| `EMAIL_FROM` | From address (default: `Quorum Tours <tours@quorumtours.com>`) |
| `APP_URL` | Base URL for links in emails (e.g., `https://quorumtours.com`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for internal calls |

---

## Testing Emails

To test email delivery locally:

1. Set up Resend API key in `.env.local`
2. Call the edge function directly:

```bash
curl -X POST 'http://localhost:54321/functions/v1/send-email' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "template": "welcome",
    "to": "test@example.com",
    "data": {
      "userName": "Test User",
      "loginUrl": "http://localhost:3000/login",
      "toursUrl": "http://localhost:3000/tours"
    }
  }'
```

---

## Implementation Status

All core transactional emails are now implemented:

| Feature | Status | Location |
|---------|--------|----------|
| Tour reminder emails | ✅ Done | `send-tour-reminders` edge function |
| Tour cancellation emails | ✅ Done | `process-failed-tours` edge function |
| New booking operator notification | ✅ Done | `stripe-webhook` |
| Payout confirmation | ✅ Done | `stripe-webhook` |
| Re-engagement emails | ⏳ Future | Marketing, not transactional |

---

## Security Notes

- All edge functions verify authentication before sending
- Service role key is used for function-to-function calls
- Email addresses are never exposed in client-side code
- Resend handles deliverability and bounce tracking
