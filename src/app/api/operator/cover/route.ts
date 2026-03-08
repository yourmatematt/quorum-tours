/**
 * POST /api/operator/cover
 * DELETE /api/operator/cover
 *
 * Handles operator cover/banner image upload and deletion.
 * Uploads to Supabase Storage (operator-covers bucket)
 * and updates operators.hero_image_url.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const BUCKET = 'operator-covers';
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

async function getOperatorForUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', status: 401 };

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: membership } = await serviceClient
    .from('operator_members')
    .select('operator_id')
    .eq('profile_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  let operatorId = membership?.operator_id;

  if (!operatorId) {
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('linked_operator_id')
      .eq('id', user.id)
      .single();
    operatorId = profile?.linked_operator_id;
  }

  if (!operatorId) return { error: 'Operator not found', status: 404 };

  const { data: operator } = await serviceClient
    .from('operators')
    .select('id, hero_image_url')
    .eq('id', operatorId)
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
    const { operator, serviceClient } = auth;

    const formData = await request.formData();
    const file = formData.get('cover') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, or WebP.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 });
    }

    // Delete old cover if exists
    const oldPath = `${operator.id}/cover`;
    await serviceClient.storage.from(BUCKET).remove([`${oldPath}.webp`, `${oldPath}.jpg`, `${oldPath}.png`]);

    // Upload new cover
    const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
    const filePath = `${operator.id}/cover.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await serviceClient.storage
      .from(BUCKET)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Cover upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload cover image' }, { status: 500 });
    }

    const { data: { publicUrl } } = serviceClient.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    // Append cache-buster so browsers don't serve the old image
    const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await serviceClient
      .from('operators')
      .update({ hero_image_url: cacheBustedUrl })
      .eq('id', operator.id);

    if (updateError) {
      console.error('Operator hero_image_url update error:', updateError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ url: cacheBustedUrl });
  } catch (error) {
    console.error('Cover upload error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const auth = await getOperatorForUser();
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { operator, serviceClient } = auth;

    const basePath = `${operator.id}/cover`;
    await serviceClient.storage.from(BUCKET).remove([
      `${basePath}.webp`,
      `${basePath}.jpg`,
      `${basePath}.png`,
    ]);

    const { error: updateError } = await serviceClient
      .from('operators')
      .update({ hero_image_url: null })
      .eq('id', operator.id);

    if (updateError) {
      console.error('Operator hero_image_url clear error:', updateError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cover delete error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
