-- =============================================================================
-- Migration: Stripe Integration Gaps
-- Description: Add payment_events table, operator Stripe fields, and fee tracking
-- Created: 2026-01-24
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. PAYMENT EVENTS TABLE
-- Logs all Stripe webhook events for debugging and idempotency
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Link to reservation (nullable - some events may not have a reservation yet)
    reservation_id UUID REFERENCES public.reservations(id) ON DELETE SET NULL,

    -- Stripe event details
    stripe_event_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,  -- e.g., 'payment_intent.succeeded', 'payment_intent.payment_failed'

    -- Financial details from event
    amount_cents INTEGER,
    currency TEXT DEFAULT 'aud',
    status TEXT,  -- Stripe's status field from the event

    -- Full payload for debugging
    raw_payload JSONB NOT NULL,

    -- Processing status (for webhook handling)
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMPTZ,
    processing_error TEXT,
    retry_count INTEGER DEFAULT 0,

    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for finding unprocessed events (webhook retry logic)
CREATE INDEX idx_payment_events_unprocessed
    ON public.payment_events(created_at)
    WHERE processed = FALSE;

-- Index for looking up events by reservation
CREATE INDEX idx_payment_events_reservation
    ON public.payment_events(reservation_id);

-- Index for event type queries (analytics)
CREATE INDEX idx_payment_events_type
    ON public.payment_events(event_type, created_at DESC);

-- Index for idempotency checks
CREATE UNIQUE INDEX idx_payment_events_stripe_id
    ON public.payment_events(stripe_event_id);

COMMENT ON TABLE public.payment_events IS
    'Logs all Stripe webhook events for debugging, idempotency, and audit trail';

COMMENT ON COLUMN public.payment_events.processed IS
    'Whether the event has been fully processed. Used for retry logic.';

-- -----------------------------------------------------------------------------
-- 2. OPERATOR STRIPE CONNECT FIELDS
-- Track granular Connect account states
-- -----------------------------------------------------------------------------
ALTER TABLE public.operators
    ADD COLUMN IF NOT EXISTS stripe_charges_enabled BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS stripe_payouts_enabled BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS stripe_details_submitted BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS stripe_onboarding_started_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS stripe_onboarding_completed_at TIMESTAMPTZ;

COMMENT ON COLUMN public.operators.stripe_charges_enabled IS
    'Whether this Connect account can accept charges. Updated via account.updated webhook.';

COMMENT ON COLUMN public.operators.stripe_payouts_enabled IS
    'Whether this Connect account can receive payouts. Updated via account.updated webhook.';

COMMENT ON COLUMN public.operators.stripe_details_submitted IS
    'Whether the account has submitted all required details. May still need verification.';

-- -----------------------------------------------------------------------------
-- 3. RESERVATION FEE TRACKING
-- Track platform fees for transparency and accounting
-- -----------------------------------------------------------------------------
ALTER TABLE public.reservations
    ADD COLUMN IF NOT EXISTS platform_fee_cents INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS operator_payout_cents INTEGER GENERATED ALWAYS AS (
        COALESCE(deposit_cents, 0) + COALESCE(balance_cents, 0)
        - COALESCE(refund_amount_cents, 0)
        - COALESCE(platform_fee_cents, 0)
    ) STORED,
    ADD COLUMN IF NOT EXISTS stripe_transfer_id TEXT,
    ADD COLUMN IF NOT EXISTS transferred_at TIMESTAMPTZ;

COMMENT ON COLUMN public.reservations.platform_fee_cents IS
    'Platform commission (6% of total). Calculated when payment is captured.';

COMMENT ON COLUMN public.reservations.operator_payout_cents IS
    'Net amount to be transferred to operator. Auto-calculated from other fields.';

COMMENT ON COLUMN public.reservations.stripe_transfer_id IS
    'Stripe Transfer ID for the payout to the operator Connect account.';

-- -----------------------------------------------------------------------------
-- 4. RLS POLICIES FOR PAYMENT_EVENTS
-- Only admins and the reservation owner can view payment events
-- -----------------------------------------------------------------------------
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;

-- Admins can see all payment events
CREATE POLICY "Admins can view all payment events"
    ON public.payment_events FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

-- Users can see payment events for their own reservations
CREATE POLICY "Users can view own reservation payment events"
    ON public.payment_events FOR SELECT
    USING (
        reservation_id IN (
            SELECT id FROM public.reservations
            WHERE user_id = auth.uid()
        )
    );

-- Operators can see payment events for reservations on their tours
CREATE POLICY "Operators can view tour payment events"
    ON public.payment_events FOR SELECT
    USING (
        reservation_id IN (
            SELECT r.id FROM public.reservations r
            JOIN public.tours t ON t.id = r.tour_id
            JOIN public.operators o ON o.id = t.operator_id
            WHERE EXISTS (
                SELECT 1 FROM public.operator_members om
                WHERE om.operator_id = o.id
                AND om.user_id = auth.uid()
            )
        )
    );

-- Only service role can insert (via Edge Functions handling webhooks)
CREATE POLICY "Service role can insert payment events"
    ON public.payment_events FOR INSERT
    WITH CHECK (
        -- This will only work with service_role key, not user JWTs
        auth.role() = 'service_role'
        OR EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

-- -----------------------------------------------------------------------------
-- 5. HELPER FUNCTION: Calculate Platform Fee
-- 6% commission on successful bookings
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_platform_fee(total_cents INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- 6% platform fee, rounded to nearest cent
    RETURN ROUND(total_cents * 0.06);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_platform_fee IS
    'Calculates the 6% platform commission on a booking amount.';

-- -----------------------------------------------------------------------------
-- 6. TRIGGER: Auto-calculate platform fee when deposit is charged
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_platform_fee_on_charge()
RETURNS TRIGGER AS $$
BEGIN
    -- When deposit is charged, calculate the platform fee
    IF NEW.deposit_charged = TRUE AND OLD.deposit_charged = FALSE THEN
        NEW.platform_fee_cents := calculate_platform_fee(
            COALESCE(NEW.deposit_cents, 0) + COALESCE(NEW.balance_cents, 0)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_platform_fee
    BEFORE UPDATE ON public.reservations
    FOR EACH ROW
    WHEN (NEW.deposit_charged = TRUE AND OLD.deposit_charged = FALSE)
    EXECUTE FUNCTION set_platform_fee_on_charge();

-- -----------------------------------------------------------------------------
-- 7. INDEX: Pending transfers (for payout batch processing)
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_reservations_pending_transfer
    ON public.reservations(deposit_charged_at)
    WHERE deposit_charged = TRUE
    AND stripe_transfer_id IS NULL
    AND status = 'confirmed';

COMMENT ON INDEX idx_reservations_pending_transfer IS
    'Find reservations that have been charged but not yet transferred to operator.';
