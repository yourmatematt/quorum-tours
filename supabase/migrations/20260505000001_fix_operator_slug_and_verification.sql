-- =============================================================================
-- Fix: Mallacoota Cruises slug normalisation + verification flag
-- =============================================================================
--
-- Root causes (QUO-13):
--   1. The founding operator was seeded with slug = 'compass-tours'.
--      The Dale Winward profile copy migration (20260407000001) and the live
--      URL /operators/mallacoota-cruises both assume slug = 'mallacoota-cruises',
--      so there was never a rename migration. This renames it now.
--
--   2. is_verified was never set to TRUE for this operator, so:
--        - useOperators() (verified_only=true) returns 0 rows → empty /operators page
--        - the operator card link navigated to the old slug → always 404
--
-- Idempotent: safe to re-run. If the slug is already 'mallacoota-cruises'
-- the UPDATE simply sets the same values; is_founding_operator is preserved.
-- =============================================================================

UPDATE public.operators
SET
  slug               = 'mallacoota-cruises',
  is_verified        = true,
  is_founding_operator = true
WHERE slug IN ('compass-tours', 'mallacoota-cruises');
