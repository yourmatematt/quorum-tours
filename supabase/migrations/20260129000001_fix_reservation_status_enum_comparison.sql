-- =============================================================================
-- Migration: Fix Reservation Status Enum Comparison
-- Description: Cast enum to text in trigger functions to fix type mismatch
-- Created: 2026-01-29
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. FIX: update_participant_count trigger function
-- Issue: Comparing reservation_status enum with TEXT[] using = ANY()
-- Fix: Cast status to TEXT before comparison
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_participant_count()
RETURNS TRIGGER AS $$
DECLARE
    active_statuses TEXT[] := ARRAY['reserved', 'payment_pending', 'confirmed'];
    old_is_active BOOLEAN;
    new_is_active BOOLEAN;
BEGIN
    -- Determine if old/new status counts as "active"
    -- Cast enum to text for comparison with text array
    old_is_active := TG_OP != 'INSERT' AND OLD.status::TEXT = ANY(active_statuses);
    new_is_active := TG_OP != 'DELETE' AND NEW.status::TEXT = ANY(active_statuses);

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

-- -----------------------------------------------------------------------------
-- 2. FIX: check_tour_threshold trigger function
-- Issue: Comparing reservation_status enum with text literal
-- Fix: Cast text literal to enum type
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
       AND tour_record.status = 'forming' THEN

        UPDATE public.tours
        SET
            status = 'payment_pending',
            payment_window_end = NOW() + INTERVAL '24 hours',
            updated_at = NOW()
        WHERE id = NEW.tour_id;

        -- Update all reserved reservations to payment_pending
        -- Cast text to reservation_status enum for comparison
        UPDATE public.reservations
        SET
            status = 'payment_pending'::reservation_status,
            payment_due_at = NOW() + INTERVAL '24 hours',
            updated_at = NOW()
        WHERE tour_id = NEW.tour_id
        AND status = 'reserved'::reservation_status;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_participant_count IS
    'Maintains tours.current_participant_count when reservations change status. Fixed enum comparison.';

COMMENT ON FUNCTION check_tour_threshold IS
    'Updates tour and reservation status when threshold is reached. Fixed enum comparison.';
