-- =============================================================================
-- Migration: Strike System for Trust-Based Deposits
-- Description: Add strike tracking and deposit forfeit logic
-- Created: 2026-01-24
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. ADD STRIKES TO PROFILES
-- Strikes are permanent and accumulate over time
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS strikes INTEGER NOT NULL DEFAULT 0 CHECK (strikes >= 0);

COMMENT ON COLUMN public.profiles.strikes IS
    'Number of times user missed payment window. Permanent. 3+ = suspended.';

-- -----------------------------------------------------------------------------
-- 2. ADD FORFEIT TRACKING TO RESERVATIONS
-- Track when deposits are forfeited due to missed payment window
-- -----------------------------------------------------------------------------
ALTER TABLE public.reservations
    ADD COLUMN IF NOT EXISTS deposit_forfeited BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS deposit_forfeited_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS forfeit_transferred BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS forfeit_transfer_id TEXT;

COMMENT ON COLUMN public.reservations.deposit_forfeited IS
    'Whether deposit was forfeited due to missed payment window.';

COMMENT ON COLUMN public.reservations.forfeit_transfer_id IS
    'Stripe Transfer ID for forfeited deposit sent to operator (minus 3%).';

-- -----------------------------------------------------------------------------
-- 3. FUNCTION: Calculate Required Deposit
-- Based on user trust status (tours_completed + strikes)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_required_deposit(
    p_user_id UUID,
    p_tour_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    user_tours_completed INTEGER;
    user_strikes INTEGER;
    tour_deposit INTEGER;
    tour_price INTEGER;
BEGIN
    -- Get user stats
    SELECT tours_completed, strikes INTO user_tours_completed, user_strikes
    FROM public.profiles
    WHERE id = p_user_id;

    -- Get tour pricing
    SELECT deposit_cents, price_cents INTO tour_deposit, tour_price
    FROM public.tours
    WHERE id = p_tour_id;

    -- Strike 3+: Blocked (return -1 to indicate blocked)
    IF user_strikes >= 3 THEN
        RETURN -1;
    END IF;

    -- Strike 2: 50% of tour price
    IF user_strikes = 2 THEN
        RETURN ROUND(tour_price * 0.5);
    END IF;

    -- Strike 1 OR New User (0 completed tours): Operator deposit
    IF user_strikes = 1 OR user_tours_completed = 0 THEN
        RETURN tour_deposit;
    END IF;

    -- Trusted user (1+ tours, 0 strikes): No deposit
    RETURN 0;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

COMMENT ON FUNCTION calculate_required_deposit IS
    'Returns deposit amount in cents. Returns -1 if user is blocked (3+ strikes).';

GRANT EXECUTE ON FUNCTION calculate_required_deposit TO authenticated;

-- -----------------------------------------------------------------------------
-- 4. FUNCTION: Get User Trust Status
-- Returns user's trust tier for display purposes
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_user_trust_status(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
    user_record RECORD;
    trust_tier TEXT;
    deposit_multiplier NUMERIC;
BEGIN
    SELECT tours_completed, strikes INTO user_record
    FROM public.profiles
    WHERE id = p_user_id;

    IF user_record.strikes >= 3 THEN
        trust_tier := 'suspended';
        deposit_multiplier := NULL;
    ELSIF user_record.strikes = 2 THEN
        trust_tier := 'strike_2';
        deposit_multiplier := 0.5; -- 50% of tour price
    ELSIF user_record.strikes = 1 THEN
        trust_tier := 'strike_1';
        deposit_multiplier := NULL; -- operator deposit
    ELSIF user_record.tours_completed = 0 THEN
        trust_tier := 'new';
        deposit_multiplier := NULL; -- operator deposit
    ELSE
        trust_tier := 'trusted';
        deposit_multiplier := 0; -- no deposit
    END IF;

    RETURN json_build_object(
        'user_id', p_user_id,
        'tours_completed', user_record.tours_completed,
        'strikes', user_record.strikes,
        'trust_tier', trust_tier,
        'deposit_multiplier', deposit_multiplier,
        'can_book', user_record.strikes < 3
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

COMMENT ON FUNCTION get_user_trust_status IS
    'Returns user trust tier and booking eligibility.';

GRANT EXECUTE ON FUNCTION get_user_trust_status TO authenticated;

-- -----------------------------------------------------------------------------
-- 5. FUNCTION: Apply Strike to User
-- Called when user misses payment window
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION apply_payment_timeout_strike(
    p_user_id UUID,
    p_reservation_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    new_strike_count INTEGER;
BEGIN
    -- Increment strike count
    UPDATE public.profiles
    SET strikes = strikes + 1,
        updated_at = NOW()
    WHERE id = p_user_id
    RETURNING strikes INTO new_strike_count;

    -- Log to strike history
    INSERT INTO public.strike_history (
        user_id,
        reservation_id,
        strike_amount,
        reason
    ) VALUES (
        p_user_id,
        p_reservation_id,
        1,
        'Missed 24-hour payment window after quorum reached'
    );

    RETURN new_strike_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION apply_payment_timeout_strike IS
    'Increments user strike count and logs to history. Called on payment timeout.';

-- -----------------------------------------------------------------------------
-- 6. FUNCTION: Calculate Forfeit Payout
-- Operator gets deposit minus 3% platform commission
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_forfeit_payout(deposit_cents INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- 3% commission on forfeits (not 6% like regular bookings)
    RETURN ROUND(deposit_cents * 0.97);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_forfeit_payout IS
    'Calculates operator payout for forfeited deposits (97% - platform keeps 3%).';

-- -----------------------------------------------------------------------------
-- 7. INDEX: Users approaching suspension
-- For admin monitoring dashboard
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_high_strikes
    ON public.profiles(strikes)
    WHERE strikes >= 2;

COMMENT ON INDEX idx_profiles_high_strikes IS
    'Find users with 2+ strikes for admin monitoring.';

-- -----------------------------------------------------------------------------
-- 8. VIEW: User booking eligibility
-- Quick check for frontend/API
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.user_booking_eligibility AS
SELECT
    p.id AS user_id,
    p.tours_completed,
    p.strikes,
    CASE
        WHEN p.strikes >= 3 THEN 'suspended'
        WHEN p.strikes = 2 THEN 'strike_2'
        WHEN p.strikes = 1 THEN 'strike_1'
        WHEN p.tours_completed = 0 THEN 'new'
        ELSE 'trusted'
    END AS trust_tier,
    p.strikes < 3 AS can_book,
    CASE
        WHEN p.strikes >= 3 THEN 'Account suspended. Please contact support.'
        WHEN p.strikes = 2 THEN '50% deposit required'
        WHEN p.strikes = 1 THEN 'Deposit required'
        WHEN p.tours_completed = 0 THEN 'Deposit required for first booking'
        ELSE 'No deposit required'
    END AS booking_message
FROM public.profiles p;

GRANT SELECT ON public.user_booking_eligibility TO authenticated;

-- RLS: Users can only see their own eligibility
CREATE POLICY "Users can view own eligibility"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);
