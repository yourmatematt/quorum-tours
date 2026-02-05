-- Add is_featured column to tours table
-- This allows admins to feature specific tours on the homepage

ALTER TABLE tours
ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT false;

-- Create index for faster queries on featured tours
CREATE INDEX idx_tours_is_featured ON tours(is_featured) WHERE is_featured = true;

-- Comment for documentation
COMMENT ON COLUMN tours.is_featured IS 'Whether this tour should be featured on the homepage';
