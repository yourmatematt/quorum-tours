-- Add is_founding_operator boolean to operators table
ALTER TABLE public.operators
  ADD COLUMN IF NOT EXISTS is_founding_operator BOOLEAN NOT NULL DEFAULT false;

-- Set Dale Winward (Compass Tours) as founding operator
UPDATE public.operators
  SET is_founding_operator = true
  WHERE slug = 'compass-tours';
