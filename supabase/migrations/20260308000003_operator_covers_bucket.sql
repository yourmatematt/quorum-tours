-- Create a public bucket for operator cover/banner images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'operator-covers',
  'operator-covers',
  true,
  10485760,  -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- RLS policies — API routes handle authorization, service client bypasses RLS
CREATE POLICY "Authenticated users can upload operator covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'operator-covers');

CREATE POLICY "Authenticated users can update operator covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'operator-covers');

CREATE POLICY "Authenticated users can delete operator covers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'operator-covers');

CREATE POLICY "Anyone can view operator covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'operator-covers');
