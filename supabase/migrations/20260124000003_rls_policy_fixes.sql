-- =============================================================================
-- Migration: RLS Policy Fixes
-- Description: Fix missing operator access policies for tours and reservations
-- Created: 2026-01-24
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. TOURS - Allow Operators to Manage Their Own Tours
-- Current: Only admins can INSERT/UPDATE/DELETE
-- Fixed: Operator admins can also manage tours for their operator
-- -----------------------------------------------------------------------------

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can insert tours" ON public.tours;
DROP POLICY IF EXISTS "Admins can update tours" ON public.tours;
DROP POLICY IF EXISTS "Admins can delete tours" ON public.tours;

-- Create new policies that include operators
CREATE POLICY "Operators and admins can insert tours"
    ON public.tours FOR INSERT
    WITH CHECK (
        is_admin()
        OR (
            operator_id IS NOT NULL
            AND is_operator_admin(operator_id)
        )
    );

CREATE POLICY "Operators and admins can update tours"
    ON public.tours FOR UPDATE
    USING (
        is_admin()
        OR (
            operator_id IS NOT NULL
            AND is_operator_admin(operator_id)
        )
    )
    WITH CHECK (
        is_admin()
        OR (
            operator_id IS NOT NULL
            AND is_operator_admin(operator_id)
        )
    );

CREATE POLICY "Operators and admins can delete tours"
    ON public.tours FOR DELETE
    USING (
        is_admin()
        OR (
            operator_id IS NOT NULL
            AND is_operator_admin(operator_id)
        )
    );

COMMENT ON POLICY "Operators and admins can insert tours" ON public.tours IS
    'Operator admins can create tours for their operator. Platform admins can create any tour.';

-- -----------------------------------------------------------------------------
-- 2. RESERVATIONS - Allow Operators to View Bookings for Their Tours
-- Current: Only user and admin can view
-- Fixed: Operators can see reservations for tours they own
-- -----------------------------------------------------------------------------

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view own reservations" ON public.reservations;

-- Create more comprehensive SELECT policy
CREATE POLICY "Users and operators can view relevant reservations"
    ON public.reservations FOR SELECT
    USING (
        -- Platform admins see all
        is_admin()
        -- Users see their own reservations
        OR auth.uid() = user_id
        -- Operators see reservations for their tours
        OR EXISTS (
            SELECT 1 FROM public.tours t
            WHERE t.id = reservations.tour_id
            AND t.operator_id IS NOT NULL
            AND is_operator_member(t.operator_id)
        )
    );

COMMENT ON POLICY "Users and operators can view relevant reservations" ON public.reservations IS
    'Users see own bookings. Operators see all bookings for their tours.';

-- Keep existing UPDATE policy (only user/admin can modify)
-- Operators should NOT be able to modify user reservations directly

-- -----------------------------------------------------------------------------
-- 3. TOUR_SPECIES - Fix Inconsistent Policy
-- Current: Uses profiles.linked_operator_id (deprecated)
-- Fixed: Use operator_members table consistently
-- -----------------------------------------------------------------------------

-- Drop old inconsistent policy
DROP POLICY IF EXISTS "Tour owners can manage tour species" ON public.tour_species;
DROP POLICY IF EXISTS "Operators can manage tour species" ON public.tour_species;

-- Create consistent policy using operator_members
CREATE POLICY "Operators can manage tour species"
    ON public.tour_species FOR ALL
    USING (
        is_admin()
        OR EXISTS (
            SELECT 1 FROM public.tours t
            WHERE t.id = tour_species.tour_id
            AND t.operator_id IS NOT NULL
            AND is_operator_admin(t.operator_id)
        )
    )
    WITH CHECK (
        is_admin()
        OR EXISTS (
            SELECT 1 FROM public.tours t
            WHERE t.id = tour_species.tour_id
            AND t.operator_id IS NOT NULL
            AND is_operator_admin(t.operator_id)
        )
    );

COMMENT ON POLICY "Operators can manage tour species" ON public.tour_species IS
    'Operator admins can manage species for their tours. Uses operator_members table.';

-- -----------------------------------------------------------------------------
-- 4. PAYMENT_EVENTS - Ensure Operator Access (verify from previous migration)
-- Operators should see payment events for reservations on their tours
-- -----------------------------------------------------------------------------

-- Verify the policy exists (created in 20260124000001)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'payment_events'
        AND policyname = 'Operators can view tour payment events'
    ) THEN
        -- Create it if missing
        CREATE POLICY "Operators can view tour payment events"
            ON public.payment_events FOR SELECT
            USING (
                reservation_id IN (
                    SELECT r.id FROM public.reservations r
                    JOIN public.tours t ON t.id = r.tour_id
                    WHERE t.operator_id IS NOT NULL
                    AND is_operator_member(t.operator_id)
                )
            );
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 5. WAITLIST - Add Operator Access
-- Operators should see waitlist entries for their tours
-- -----------------------------------------------------------------------------

-- Check if waitlist table exists before modifying
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'waitlist') THEN
        -- Drop old policy if exists
        DROP POLICY IF EXISTS "Users can view own waitlist entries" ON public.waitlist;

        -- Create comprehensive policy
        CREATE POLICY "Users and operators can view waitlist"
            ON public.waitlist FOR SELECT
            USING (
                is_admin()
                OR auth.uid() = user_id
                OR EXISTS (
                    SELECT 1 FROM public.tours t
                    WHERE t.id = waitlist.tour_id
                    AND t.operator_id IS NOT NULL
                    AND is_operator_member(t.operator_id)
                )
            );
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 6. HELPER FUNCTION: Check if user can access tour data
-- Useful for RPC functions and Edge Functions
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION can_access_tour_data(p_tour_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        -- Platform admin
        is_admin()
        -- Operator member for this tour
        OR EXISTS (
            SELECT 1 FROM public.tours t
            WHERE t.id = p_tour_id
            AND t.operator_id IS NOT NULL
            AND is_operator_member(t.operator_id)
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION can_access_tour_data IS
    'Check if current user can access detailed tour data (reservations, payments, etc.)';

-- -----------------------------------------------------------------------------
-- 7. HELPER FUNCTION: Get user's role for a tour
-- Returns: 'admin', 'operator_admin', 'operator_member', 'participant', 'none'
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_tour_access_level(p_tour_id UUID)
RETURNS TEXT AS $$
DECLARE
    tour_operator_id UUID;
    user_role TEXT;
BEGIN
    -- Check if platform admin
    IF is_admin() THEN
        RETURN 'admin';
    END IF;

    -- Get tour's operator
    SELECT operator_id INTO tour_operator_id
    FROM public.tours
    WHERE id = p_tour_id;

    IF tour_operator_id IS NOT NULL THEN
        -- Check operator membership
        IF is_operator_admin(tour_operator_id) THEN
            RETURN 'operator_admin';
        ELSIF is_operator_member(tour_operator_id) THEN
            RETURN 'operator_member';
        END IF;
    END IF;

    -- Check if participant
    IF EXISTS (
        SELECT 1 FROM public.reservations
        WHERE tour_id = p_tour_id
        AND user_id = auth.uid()
        AND status NOT IN ('cancelled', 'refunded', 'abandoned')
    ) THEN
        RETURN 'participant';
    END IF;

    RETURN 'none';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION get_tour_access_level IS
    'Returns the access level the current user has for a specific tour.';

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION can_access_tour_data TO authenticated;
GRANT EXECUTE ON FUNCTION get_tour_access_level TO authenticated;

-- -----------------------------------------------------------------------------
-- 8. INDEX: Optimize RLS Subqueries
-- These indexes help the RLS policy subqueries perform well
-- -----------------------------------------------------------------------------

-- Index for finding tours by operator
CREATE INDEX IF NOT EXISTS idx_tours_operator_id
    ON public.tours(operator_id)
    WHERE operator_id IS NOT NULL;

-- Index for finding reservations by tour
CREATE INDEX IF NOT EXISTS idx_reservations_tour_id
    ON public.reservations(tour_id);

-- Index for operator members lookup (critical for RLS)
CREATE INDEX IF NOT EXISTS idx_operator_members_profile_active
    ON public.operator_members(profile_id, is_active)
    WHERE is_active = TRUE;

-- Index for waitlist by tour
CREATE INDEX IF NOT EXISTS idx_waitlist_tour_id
    ON public.waitlist(tour_id);

COMMENT ON INDEX idx_operator_members_profile_active IS
    'Optimizes is_operator_member() and is_operator_admin() RLS checks.';
