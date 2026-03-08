-- Add is_featured flag to operators for home page featured section
ALTER TABLE operators ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- Index for quick lookup of featured operators
CREATE INDEX IF NOT EXISTS idx_operators_is_featured ON operators (is_featured) WHERE is_featured = true;
