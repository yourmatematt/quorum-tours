-- =============================================================================
-- Migration: Real-time Optimization for Threshold Tracking
-- Description: Add denormalized participant count, triggers, and realtime publication
-- Created: 2026-01-24
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. DENORMALIZED PARTICIPANT COUNT
-- Avoid expensive COUNT queries on every threshold check
-- -----------------------------------------------------------------------------
ALTER TABLE public.tours
    ADD COLUMN IF NOT EXISTS current_participant_count INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.tours.current_participant_count IS
    'Denormalized count of active reservations (reserved/payment_pending/confirmed). Updated by trigger.';

-- -----------------------------------------------------------------------------
-- 2. FUNCTION: Increment/Decrement Participant Count
-- Maintains the denormalized count on reservation changes
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_participant_count()
RETURNS TRIGGER AS $$
DECLARE
    active_statuses TEXT[] := ARRAY['reserved', 'payment_pending', 'confirmed'];
    old_is_active BOOLEAN;
    new_is_active BOOLEAN;
BEGIN
    -- Determine if old/new status counts as "active"
    old_is_active := TG_OP != 'INSERT' AND OLD.status = ANY(active_statuses);
    new_is_active := TG_OP != 'DELETE' AND NEW.status = ANY(active_statuses);

    -- Handle transitions
    IF TG_OP = 'INSERT' AND new_is_active THEN
        -- New active reservation: increment
        UPDATE public.tours
        SET current_participant_count = current_participant_count + 1,
            updated_at = NOW()
        WHERE id = NEW.tour_id;

    ELSIF TG_OP = 'DELETE' AND old_is_active THEN
        -- Deleted active reservation: decrement
        UPDATE public.tours
        SET current_participant_count = GREATEST(current_participant_count - 1, 0),
            updated_at = NOW()
        WHERE id = OLD.tour_id;

    ELSIF TG_OP = 'UPDATE' THEN
        -- Status transition: adjust count accordingly
        IF NOT old_is_active AND new_is_active THEN
            -- Became active: increment
            UPDATE public.tours
            SET current_participant_count = current_participant_count + 1,
                updated_at = NOW()
            WHERE id = NEW.tour_id;

        ELSIF old_is_active AND NOT new_is_active THEN
            -- Became inactive: decrement
            UPDATE public.tours
            SET current_participant_count = GREATEST(current_participant_count - 1, 0),
                updated_at = NOW()
            WHERE id = NEW.tour_id;

        ELSIF OLD.tour_id != NEW.tour_id THEN
            -- Tour changed (rare): adjust both tours
            IF old_is_active THEN
                UPDATE public.tours
                SET current_participant_count = GREATEST(current_participant_count - 1, 0),
                    updated_at = NOW()
                WHERE id = OLD.tour_id;
            END IF;
            IF new_is_active THEN
                UPDATE public.tours
                SET current_participant_count = current_participant_count + 1,
                    updated_at = NOW()
                WHERE id = NEW.tour_id;
            END IF;
        END IF;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trg_update_participant_count ON public.reservations;
CREATE TRIGGER trg_update_participant_count
    AFTER INSERT OR UPDATE OR DELETE ON public.reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_participant_count();

COMMENT ON FUNCTION update_participant_count IS
    'Maintains tours.current_participant_count when reservations change status.';

-- -----------------------------------------------------------------------------
-- 3. BACKFILL EXISTING COUNTS
-- Ensure current data is accurate
-- -----------------------------------------------------------------------------
UPDATE public.tours t
SET current_participant_count = (
    SELECT COUNT(*)
    FROM public.reservations r
    WHERE r.tour_id = t.id
    AND r.status IN ('reserved', 'payment_pending', 'confirmed')
);

-- -----------------------------------------------------------------------------
-- 4. OPTIMIZED THRESHOLD CHECK FUNCTION
-- Use denormalized count instead of COUNT query
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION check_tour_threshold()
RETURNS TRIGGER AS $$
DECLARE
    tour_record RECORD;
BEGIN
    -- Get tour details including denormalized count
    SELECT id, threshold, status, current_participant_count
    INTO tour_record
    FROM public.tours
    WHERE id = NEW.tour_id;

    -- Update tour status if threshold reached
    IF tour_record.current_participant_count >= tour_record.threshold
       AND tour_record.status = 'proposed' THEN

        UPDATE public.tours
        SET
            status = 'payment_pending',
            payment_window_end = NOW() + INTERVAL '24 hours',
            updated_at = NOW()
        WHERE id = NEW.tour_id;

        -- Update all reserved reservations to payment_pending
        UPDATE public.reservations
        SET
            status = 'payment_pending',
            payment_due_at = NOW() + INTERVAL '24 hours',
            updated_at = NOW()
        WHERE tour_id = NEW.tour_id
        AND status = 'reserved';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION check_tour_threshold IS
    'Updates tour and reservation status when threshold is reached. Uses denormalized count.';

-- -----------------------------------------------------------------------------
-- 5. ENABLE REALTIME PUBLICATION
-- Allow frontend to subscribe to live updates
-- -----------------------------------------------------------------------------

-- Check if publication exists before adding tables
DO $$
BEGIN
    -- Add tours table to realtime publication
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'tours'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.tours;
    END IF;

    -- Add reservations table to realtime publication
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'reservations'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;
    END IF;

    -- Add payment_events table to realtime publication (for operator dashboards)
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND tablename = 'payment_events'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.payment_events;
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 6. INDEXES FOR REALTIME QUERY PATTERNS
-- Optimize common subscription filter queries
-- -----------------------------------------------------------------------------

-- Index for "proposed tours approaching threshold" queries
CREATE INDEX IF NOT EXISTS idx_tours_threshold_progress
    ON public.tours(status, current_participant_count, threshold)
    WHERE status = 'proposed';

-- Index for operator dashboard: their tours with live counts
CREATE INDEX IF NOT EXISTS idx_tours_operator_status
    ON public.tours(operator_id, status, current_participant_count);

-- Index for user: their active reservations
CREATE INDEX IF NOT EXISTS idx_reservations_user_active
    ON public.reservations(user_id, status)
    WHERE status IN ('reserved', 'payment_pending', 'confirmed');

COMMENT ON INDEX idx_tours_threshold_progress IS
    'Optimizes queries for tours approaching their commitment threshold.';

-- -----------------------------------------------------------------------------
-- 7. HELPER VIEW: Tour Progress Summary
-- Convenient view for frontend queries
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.tour_progress AS
SELECT
    t.id,
    t.slug,
    t.title,
    t.status,
    t.threshold,
    t.capacity,
    t.current_participant_count,
    t.threshold_deadline,
    t.date_start,
    -- Progress percentage (capped at 100)
    LEAST(
        ROUND((t.current_participant_count::NUMERIC / t.threshold) * 100),
        100
    ) AS progress_percent,
    -- Spots remaining until threshold
    GREATEST(t.threshold - t.current_participant_count, 0) AS spots_until_threshold,
    -- Spots remaining until capacity
    GREATEST(t.capacity - t.current_participant_count, 0) AS spots_remaining,
    -- Is at or over threshold?
    t.current_participant_count >= t.threshold AS threshold_met,
    -- Is at capacity?
    t.current_participant_count >= t.capacity AS at_capacity,
    -- Days until threshold deadline
    CASE
        WHEN t.threshold_deadline IS NOT NULL THEN
            EXTRACT(DAY FROM (t.threshold_deadline::TIMESTAMP - NOW()))::INTEGER
        ELSE NULL
    END AS days_until_deadline
FROM public.tours t;

COMMENT ON VIEW public.tour_progress IS
    'Computed view of tour threshold progress for frontend display.';

-- Grant access to the view
GRANT SELECT ON public.tour_progress TO authenticated;
GRANT SELECT ON public.tour_progress TO anon;

-- -----------------------------------------------------------------------------
-- 8. RPC FUNCTION: Get Tour Progress (for non-realtime queries)
-- Returns structured progress data for a single tour
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_tour_progress(p_tour_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'tour_id', tp.id,
        'current', tp.current_participant_count,
        'threshold', tp.threshold,
        'capacity', tp.capacity,
        'progress_percent', tp.progress_percent,
        'spots_until_threshold', tp.spots_until_threshold,
        'spots_remaining', tp.spots_remaining,
        'threshold_met', tp.threshold_met,
        'at_capacity', tp.at_capacity,
        'status', tp.status,
        'days_until_deadline', tp.days_until_deadline
    ) INTO result
    FROM public.tour_progress tp
    WHERE tp.id = p_tour_id;

    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

COMMENT ON FUNCTION get_tour_progress IS
    'Returns structured JSON of tour threshold progress for a single tour.';

GRANT EXECUTE ON FUNCTION get_tour_progress TO authenticated;
GRANT EXECUTE ON FUNCTION get_tour_progress TO anon;
