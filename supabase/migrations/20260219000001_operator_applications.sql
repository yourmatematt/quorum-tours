-- =============================================================================
-- OPERATOR APPLICATIONS TABLE
-- Stores applications from users wanting to become tour operators
-- =============================================================================

CREATE TABLE public.operator_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Link to existing account (nullable — applicant may not have an account yet)
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  -- Application form fields
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  base_location TEXT NOT NULL,
  description TEXT NOT NULL,
  years_experience INTEGER NOT NULL,
  credentials TEXT,
  website_url TEXT,
  -- Review workflow
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'more_info_requested')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  -- Result tracking
  created_operator_id UUID REFERENCES public.operators(id),
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_operator_applications_status ON public.operator_applications(status);
CREATE INDEX idx_operator_applications_email ON public.operator_applications(contact_email);
CREATE INDEX idx_operator_applications_profile ON public.operator_applications(profile_id);

-- RLS
ALTER TABLE public.operator_applications ENABLE ROW LEVEL SECURITY;

-- Authenticated users can submit applications linked to their account
CREATE POLICY "Users can submit applications"
  ON public.operator_applications FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Anonymous submissions (profile_id is null)
CREATE POLICY "Anonymous can submit applications"
  ON public.operator_applications FOR INSERT
  TO anon
  WITH CHECK (profile_id IS NULL);

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
  ON public.operator_applications FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Admins have full access
CREATE POLICY "Admins full access to applications"
  ON public.operator_applications FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Updated_at trigger (reuse if function exists, create if not)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column'
  ) THEN
    CREATE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $fn$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $fn$ LANGUAGE plpgsql;
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_operator_applications_updated_at
  BEFORE UPDATE ON public.operator_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add metadata JSONB column to operators for flexible settings (business info, prefs)
ALTER TABLE public.operators
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

COMMENT ON COLUMN public.operators.metadata IS
  'Flexible JSON storage for business settings, tax info, notification preferences';
