-- =============================================================================
-- Migration: Cron Jobs for Email Automation
-- Description: Sets up pg_cron jobs for tour reminders, payment timeouts, and failed tours
-- Created: 2026-01-27
-- Note: Requires pg_cron extension (available on Supabase Pro+)
-- =============================================================================

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;

-- =============================================================================
-- 1. TOUR REMINDERS - Daily at 9:00 AM AEST (11:00 PM UTC previous day)
-- Sends 7-day and 1-day reminder emails to confirmed participants
-- =============================================================================
SELECT cron.schedule(
  'send-tour-reminders',
  '0 23 * * *',  -- 11:00 PM UTC = 9:00 AM AEST next day
  $$
  SELECT net.http_post(
    url := current_setting('app.supabase_url') || '/functions/v1/send-tour-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
    ),
    body := '{}'::jsonb
  );
  $$
);

-- =============================================================================
-- 2. PAYMENT TIMEOUT CHECK - Every 5 minutes
-- Processes reservations that missed the 24-hour payment window
-- =============================================================================
SELECT cron.schedule(
  'check-payment-timeouts',
  '*/5 * * * *',  -- Every 5 minutes
  $$
  SELECT net.http_post(
    url := current_setting('app.supabase_url') || '/functions/v1/process-payment-timeout',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
    ),
    body := '{}'::jsonb
  );
  $$
);

-- =============================================================================
-- 3. FAILED TOURS CHECK - Every hour
-- Cancels tours that didn't reach quorum by their deadline
-- =============================================================================
SELECT cron.schedule(
  'check-failed-tours',
  '0 * * * *',  -- Every hour on the hour
  $$
  SELECT net.http_post(
    url := current_setting('app.supabase_url') || '/functions/v1/process-failed-tours',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
    ),
    body := '{}'::jsonb
  );
  $$
);

-- =============================================================================
-- 4. CRON JOB LOGGING TABLE
-- Tracks execution history for debugging
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.cron_job_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_name TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    status TEXT DEFAULT 'running',  -- 'running', 'success', 'failed'
    result JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cron_job_log_name ON public.cron_job_log(job_name, started_at DESC);
CREATE INDEX idx_cron_job_log_status ON public.cron_job_log(status) WHERE status = 'failed';

COMMENT ON TABLE public.cron_job_log IS
    'Tracks cron job execution history for monitoring and debugging';

-- =============================================================================
-- 5. VIEW SCHEDULED JOBS (for reference)
-- =============================================================================
COMMENT ON EXTENSION pg_cron IS
    'Scheduled jobs:
     - send-tour-reminders: Daily 9AM AEST - 7-day and 1-day tour reminders
     - check-payment-timeouts: Every 5 min - Enforce 24hr payment deadline
     - check-failed-tours: Hourly - Cancel tours that missed quorum deadline

     To view jobs: SELECT * FROM cron.job;
     To view history: SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 20;
     To unschedule: SELECT cron.unschedule(''job-name'');';

-- =============================================================================
-- 6. ALTERNATIVE: Supabase Edge Function Scheduler (if pg_cron unavailable)
-- =============================================================================
-- If pg_cron is not available, you can use Supabase's built-in scheduler
-- via the Dashboard > Database > Extensions > pg_cron
-- Or use an external scheduler like:
-- - GitHub Actions with scheduled workflows
-- - Vercel Cron Jobs
-- - AWS EventBridge / CloudWatch Events
-- - Third-party services like Cronitor or EasyCron

-- For Vercel Cron, add to vercel.json:
-- {
--   "crons": [
--     { "path": "/api/cron/tour-reminders", "schedule": "0 23 * * *" },
--     { "path": "/api/cron/payment-timeouts", "schedule": "*/5 * * * *" },
--     { "path": "/api/cron/failed-tours", "schedule": "0 * * * *" }
--   ]
-- }
