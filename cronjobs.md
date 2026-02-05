# Quorum Tours - Cron Jobs Inventory

**Last Updated:** 2026-02-04
**Project:** Quorum Tours
**Environment:** Vercel (Primary) + Supabase pg_cron (Alternative)

---

## Overview

This project uses **dual cron systems** for redundancy and flexibility:

1. **Vercel Cron Jobs** (Primary) - Configured in `vercel.json`
2. **Supabase pg_cron** (Alternative/Backup) - Configured in database migration

Both systems trigger the same Supabase Edge Functions to perform scheduled tasks.

---

## Active Cron Jobs

### 1. Tour Reminders
**Purpose:** Send 7-day and 1-day reminder emails to confirmed tour participants

**Schedule:**
- **Vercel:** `0 23 * * *` (Daily at 11:00 PM UTC)
- **Supabase:** `0 23 * * *` (Daily at 11:00 PM UTC)
- **Local Time:** 9:00 AM AEST (next day)

**Endpoint:** `/api/cron/tour-reminders`

**Implementation:**
- **API Route:** `src/app/api/cron/tour-reminders/route.ts`
- **Edge Function:** `supabase/functions/send-tour-reminders/index.ts`
- **Vercel Config:** `vercel.json` line 5-7
- **Database Config:** `supabase/migrations/20260127000002_cron_jobs.sql` line 18-31

**Functionality:**
- Finds tours happening in 7 days → sends 7-day reminder
- Finds tours happening in 1 day → sends 1-day reminder
- Only sends to confirmed participants (status: 'confirmed')

**Security:**
- Requires `CRON_SECRET` environment variable
- Bearer token authentication

---

### 2. Payment Timeout Check
**Purpose:** Process reservations that missed the 24-hour payment window after quorum confirmation

**Schedule:**
- **Vercel:** `*/5 * * * *` (Every 5 minutes)
- **Supabase:** `*/5 * * * *` (Every 5 minutes)

**Endpoint:** `/api/cron/payment-timeouts`

**Implementation:**
- **API Route:** `src/app/api/cron/payment-timeouts/route.ts`
- **Edge Function:** `supabase/functions/process-payment-timeout/index.ts`
- **Vercel Config:** `vercel.json` line 8-11
- **Database Config:** `supabase/migrations/20260127000002_cron_jobs.sql` line 34-50

**Functionality:**
- Finds confirmed tours with reservations in 'pending_payment' status
- Checks if 24 hours have passed since tour confirmation
- Cancels timed-out reservations
- Issues strikes to users who missed payment
- Sends timeout notification emails
- May trigger tour cancellation if quorum is lost

**Security:**
- Requires `CRON_SECRET` environment variable
- Bearer token authentication

---

### 3. Failed Tours Check
**Purpose:** Cancel tours that didn't reach quorum by their commitment deadline

**Schedule:**
- **Vercel:** `0 * * * *` (Every hour on the hour)
- **Supabase:** `0 * * * *` (Every hour on the hour)

**Endpoint:** `/api/cron/failed-tours`

**Implementation:**
- **API Route:** `src/app/api/cron/failed-tours/route.ts`
- **Edge Function:** `supabase/functions/process-failed-tours/index.ts`
- **Vercel Config:** `vercel.json` line 12-15
- **Database Config:** `supabase/migrations/20260127000002_cron_jobs.sql` line 53-69

**Functionality:**
- Finds tours past their commitment_deadline
- Checks if quorum was reached
- Marks tours as 'cancelled' if quorum not met
- Refunds all deposits via Stripe
- Sends cancellation emails to all committed participants
- Cleans up pending reservations

**Security:**
- Requires `CRON_SECRET` environment variable
- Bearer token authentication

---

## Configuration Files

### Vercel Configuration
**File:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/tour-reminders",
      "schedule": "0 23 * * *"
    },
    {
      "path": "/api/cron/payment-timeouts",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cron/failed-tours",
      "schedule": "0 * * * *"
    }
  ]
}
```

### Supabase Configuration
**File:** `supabase/migrations/20260127000002_cron_jobs.sql`

**Jobs:**
- `send-tour-reminders` - Daily at 9AM AEST
- `check-payment-timeouts` - Every 5 minutes
- `check-failed-tours` - Hourly

**Logging Table:** `public.cron_job_log`
- Tracks execution history
- Stores success/failure status
- Captures error messages

---

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌────────────────────┐
│  Vercel Cron    │────────▶│  API Route       │────────▶│  Supabase Edge     │
│  (Primary)      │         │  /api/cron/*     │         │  Function          │
└─────────────────┘         └──────────────────┘         └────────────────────┘
                                    │                              │
                                    │                              │
┌─────────────────┐                 │                              │
│ Supabase        │                 │                              │
│ pg_cron         │─────────────────┴──────────────────────────────┘
│ (Alternative)   │
└─────────────────┘
```

**Flow:**
1. Cron scheduler triggers endpoint (Vercel or Supabase)
2. API route validates `CRON_SECRET`
3. API route calls Supabase Edge Function
4. Edge Function performs business logic
5. Edge Function logs execution to database
6. Edge Function returns result

---

## Environment Variables Required

```bash
# Cron authentication
CRON_SECRET=<random-secure-token>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Stripe (for refunds)
STRIPE_SECRET_KEY=<stripe-secret-key>
```

---

## Monitoring & Debugging

### View Vercel Cron Executions
```bash
# Via Vercel Dashboard
# Project → Settings → Cron Jobs
# Shows last run, next run, execution history
```

### View Supabase Cron Jobs
```sql
-- List all scheduled jobs
SELECT * FROM cron.job;

-- View recent execution history
SELECT * FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 20;

-- View application logs
SELECT * FROM public.cron_job_log
ORDER BY started_at DESC
LIMIT 20;

-- Check for failures
SELECT * FROM public.cron_job_log
WHERE status = 'failed'
ORDER BY started_at DESC;
```

### Unschedule a Job (Supabase)
```sql
-- Disable a job without deleting
SELECT cron.unschedule('send-tour-reminders');
SELECT cron.unschedule('check-payment-timeouts');
SELECT cron.unschedule('check-failed-tours');
```

---

## Testing Cron Jobs Locally

### Manual Trigger (Development)
```bash
# Set CRON_SECRET in .env.local
CRON_SECRET=your-test-secret

# Call endpoints manually
curl -X GET http://localhost:3000/api/cron/tour-reminders \
  -H "Authorization: Bearer your-test-secret"

curl -X GET http://localhost:3000/api/cron/payment-timeouts \
  -H "Authorization: Bearer your-test-secret"

curl -X GET http://localhost:3000/api/cron/failed-tours \
  -H "Authorization: Bearer your-test-secret"
```

### Test Edge Functions Directly
```bash
# Using Supabase CLI
supabase functions serve send-tour-reminders --env-file ./supabase/.env.local

# Call the function
curl -X POST http://localhost:54321/functions/v1/send-tour-reminders \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Maintenance Notes

### When to Update Schedules
- **Tour Reminders:** If changing notification timing (currently 7 and 1 day)
- **Payment Timeouts:** If adjusting payment window (currently 24 hours)
- **Failed Tours:** If modifying quorum deadline checking frequency

### Deployment Checklist
- [ ] Set `CRON_SECRET` in Vercel environment variables
- [ ] Verify Supabase service role key is configured
- [ ] Enable pg_cron extension in Supabase (Pro+ required)
- [ ] Run migration `20260127000002_cron_jobs.sql`
- [ ] Test each cron endpoint manually after deployment
- [ ] Monitor logs for first 24 hours

### Rollback Procedure
```sql
-- Disable Supabase cron jobs
SELECT cron.unschedule('send-tour-reminders');
SELECT cron.unschedule('check-payment-timeouts');
SELECT cron.unschedule('check-failed-tours');

-- For Vercel: remove crons from vercel.json and redeploy
```

---

## Future Enhancements

### Potential Additional Cron Jobs
1. **Daily Health Check** - Monitor system status, check for stuck reservations
2. **Weekly Analytics** - Generate operator performance reports
3. **Monthly Cleanup** - Archive old tours, cleanup orphaned data
4. **Hourly Quorum Progress** - Send notifications when tours are close to quorum
5. **Pre-Deadline Reminder** - Remind users 24 hours before commitment deadline

### Optimization Opportunities
- Add retry logic for failed edge function calls
- Implement exponential backoff for rate-limited operations
- Add Slack/Discord webhook notifications for critical failures
- Create dashboard for cron job health monitoring
- Add metrics tracking (execution time, success rate, error patterns)

---

## Related Documentation

- [Email Flow Architecture](docs/EMAIL-FLOW-ARCHITECTURE.md)
- [Email Templates Guide](docs/email-templates/IMPLEMENTATION-GUIDE.md)
- [Stripe Integration](docs/claude-output/PHASE-4-TRUST-SYSTEM-AND-EMAILS.md)
- [System Health Dashboard](src/components/admin/SystemHealthDashboard.tsx)

---

## Support & Troubleshooting

### Common Issues

**Issue:** Cron job not executing
- **Check:** Vercel deployment logs
- **Check:** `CRON_SECRET` is set correctly
- **Check:** pg_cron extension is enabled in Supabase

**Issue:** Edge function returning 401/403
- **Check:** `SUPABASE_SERVICE_ROLE_KEY` is correct
- **Check:** Edge function deployment is successful
- **Check:** Database RLS policies allow service role

**Issue:** Emails not sending
- **Check:** Resend API key is configured
- **Check:** Email templates exist in database
- **Check:** `send-email` edge function is working

### Emergency Contacts
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Supabase Support:** [supabase.com/support](https://supabase.com/support)
- **Stripe Support:** [support.stripe.com](https://support.stripe.com)

---

*End of Cron Jobs Inventory*
