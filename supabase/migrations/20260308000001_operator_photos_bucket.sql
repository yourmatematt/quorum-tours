-- Create a public bucket for operator profile photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'operator-photos',
  'operator-photos',
  true,
  5242880,  -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Uploads go through API routes which handle authorization.
-- Service role client bypasses RLS, but keep policies as safety net.
CREATE POLICY "Authenticated users can upload operator photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'operator-photos');

CREATE POLICY "Authenticated users can update operator photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'operator-photos');

CREATE POLICY "Authenticated users can delete operator photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'operator-photos');

-- Public read access
CREATE POLICY "Anyone can view operator photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'operator-photos');
