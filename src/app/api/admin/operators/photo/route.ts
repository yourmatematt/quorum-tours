/**
 * POST /api/admin/operators/photo
 *
 * Admin endpoint to upload an operator's profile photo.
 * Expects FormData with 'photo' (file) and 'operatorId' (string).
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const BUCKET = 'operator-photos';

export async function POST(request: Request) {
  try {
    // Verify admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await serviceClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('photo') as File | null;
    const operatorId = formData.get('operatorId') as string | null;

    if (!file || !operatorId) {
      return NextResponse.json({ error: 'Missing photo or operatorId' }, { status: 400 });
    }

    // Get operator's user_id for storage path
    // Verify operator exists
    const { data: operator } = await serviceClient
      .from('operators')
      .select('id')
      .eq('id', operatorId)
      .single();

    if (!operator) {
      return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
    }

    // Delete old photos (stored by operator id)
    const basePath = `${operatorId}/profile`;
    await serviceClient.storage.from(BUCKET).remove([
      `${basePath}.webp`, `${basePath}.jpg`, `${basePath}.png`,
    ]);

    // Upload
    const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
    const filePath = `${operatorId}/profile.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await serviceClient.storage
      .from(BUCKET)
      .upload(filePath, arrayBuffer, { contentType: file.type, upsert: true });

    if (uploadError) {
      console.error('Admin photo upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
    }

    const { data: { publicUrl } } = serviceClient.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;

    // Update operator
    await serviceClient
      .from('operators')
      .update({ logo_url: cacheBustedUrl })
      .eq('id', operatorId);

    return NextResponse.json({ url: cacheBustedUrl });
  } catch (error) {
    console.error('Admin photo upload error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
