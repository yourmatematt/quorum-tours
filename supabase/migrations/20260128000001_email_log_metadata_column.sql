-- =============================================================================
-- Migration: Email Log Metadata Column and Constraint Updates
-- Description: Adds missing metadata column and expands email_type/status constraints
-- Created: 2026-01-28
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. ADD METADATA COLUMN IF NOT EXISTS
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'email_log'
        AND column_name = 'metadata'
    ) THEN
        ALTER TABLE public.email_log
        ADD COLUMN metadata JSONB DEFAULT '{}';

        RAISE NOTICE 'Added metadata column to email_log';
    ELSE
        RAISE NOTICE 'metadata column already exists in email_log';
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 2. UPDATE EMAIL_TYPE CHECK CONSTRAINT
-- Drop and recreate to include all email types used by the system
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    -- Drop existing constraint if exists
    ALTER TABLE public.email_log
    DROP CONSTRAINT IF EXISTS email_log_email_type_check;

    -- Add new constraint with all email types
    ALTER TABLE public.email_log
    ADD CONSTRAINT email_log_email_type_check
    CHECK (email_type IN (
        -- Original types
        'reservation_confirmed',
        'threshold_met',
        'payment_reminder',
        'payment_successful',
        'spot_forfeited',
        'waitlist_notification',
        'tour_cancelled',
        -- Welcome and onboarding
        'welcome',
        'email_verification',
        'password_reset',
        -- Tour lifecycle
        'tour_reminder_7day',
        'tour_reminder_1day',
        'tour_updated',
        'quorum_reached',
        -- Payment and strikes
        'strike_applied',
        'strike_warning',
        -- Admin and system
        'health_check_test',
        'system_notification',
        'operator_notification'
    ));

    RAISE NOTICE 'Updated email_type constraint with expanded values';
END $$;

-- -----------------------------------------------------------------------------
-- 3. UPDATE STATUS CHECK CONSTRAINT
-- Drop and recreate to include all status values used by the system
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    -- Drop existing constraint if exists
    ALTER TABLE public.email_log
    DROP CONSTRAINT IF EXISTS email_log_status_check;

    -- Add new constraint with all status values
    ALTER TABLE public.email_log
    ADD CONSTRAINT email_log_status_check
    CHECK (status IN (
        'sent',
        'failed',
        'bounced',
        'pending',
        'delivered',
        'opened',
        'clicked',
        'test'  -- For health check tests
    ));

    RAISE NOTICE 'Updated status constraint with expanded values';
END $$;

-- -----------------------------------------------------------------------------
-- 4. CREATE INDEX ON METADATA IF NOT EXISTS
-- For efficient querying of metadata fields
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_email_log_metadata
ON public.email_log USING gin (metadata);

-- -----------------------------------------------------------------------------
-- 5. ADD COMMENT FOR DOCUMENTATION
-- -----------------------------------------------------------------------------
COMMENT ON COLUMN public.email_log.metadata IS
    'JSON metadata for email context (trigger source, template vars, etc.)';
