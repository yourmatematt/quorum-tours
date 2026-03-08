/**
 * POST /api/operator/photo
 * DELETE /api/operator/photo
 *
 * Handles operator profile photo upload and deletion.
 * Uploads cropped image to Supabase Storage (operator-photos bucket)
 * and updates operators.logo_url.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const BUCKET = 'operator-photos';
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

async function getOperatorForUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', status: 401 };

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: operator } = await serviceClient
    .from('operators')
    .select('id, user_id, logo_url')
    .eq('user_id', user.id)
    .single();

  if (!operator) return { error: 'Operator not found', status: 404 };

  return { user, operator, serviceClient };
}

export async function POST(request: Request) {
  try {
    const auth = await getOperatorForUser();
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { user, operator, serviceClient } = auth;

    const formData = await request.formData();
    const file = formData.get('photo') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, or WebP.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 5MB.' }, { status: 400 });
    }

    // Delete old photo if exists
    const oldPath = `${user.id}/profile`;
    await serviceClient.storage.from(BUCKET).remove([`${oldPath}.webp`, `${oldPath}.jpg`, `${oldPath}.png`]);

    // Upload new photo
    const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
    const filePath = `${user.id}/profile.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await serviceClient.storage
      .from(BUCKET)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = serviceClient.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    // Update operator record
    const { error: updateError } = await serviceClient
      .from('operators')
      .update({ logo_url: publicUrl })
      .eq('id', operator.id);

    if (updateError) {
      console.error('Operator logo_url update error:', updateError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const auth = await getOperatorForUser();
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { user, operator, serviceClient } = auth;

    // Remove all possible extensions
    const basePath = `${user.id}/profile`;
    await serviceClient.storage.from(BUCKET).remove([
      `${basePath}.webp`,
      `${basePath}.jpg`,
      `${basePath}.png`,
    ]);

    // Clear logo_url
    const { error: updateError } = await serviceClient
      .from('operators')
      .update({ logo_url: null })
      .eq('id', operator.id);

    if (updateError) {
      console.error('Operator logo_url clear error:', updateError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Photo delete error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
