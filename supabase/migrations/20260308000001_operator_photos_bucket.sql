-- Create a public bucket for operator profile photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'operator-photos',
  'operator-photos',
  true,
  5242880,  -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Allow authenticated users to upload to their own operator folder
CREATE POLICY "Operators can upload their own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'operator-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to update/overwrite their own photos
CREATE POLICY "Operators can update their own photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'operator-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own photos
CREATE POLICY "Operators can delete their own photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'operator-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Public read access (bucket is public, but explicit policy)
CREATE POLICY "Anyone can view operator photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'operator-photos');
