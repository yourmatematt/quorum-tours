/**
 * PATCH /api/admin/appeals/[id]
 *
 * Admin action on a strike appeal: approve or reject.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, adminNotes } = body;

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }

    // Verify admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check admin role
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    // Fetch the appeal
    const { data: appeal, error: fetchError } = await serviceClient
      .from('appeals')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !appeal) {
      return NextResponse.json({ error: 'Appeal not found.' }, { status: 404 });
    }

    if (appeal.status !== 'pending') {
      return NextResponse.json({ error: 'Appeal has already been resolved.' }, { status: 400 });
    }

    // === APPROVE ===
    if (action === 'approve') {
      // Decrement user's strike count (minimum 0)
      const { data: userProfile } = await serviceClient
        .from('profiles')
        .select('strikes')
        .eq('id', appeal.user_id)
        .single();

      const newStrikes = Math.max(0, (userProfile?.strikes ?? 1) - 1);

      const { error: profileError } = await serviceClient
        .from('profiles')
        .update({ strikes: newStrikes })
        .eq('id', appeal.user_id);

      if (profileError) {
        console.error('Failed to update strikes:', profileError);
        return NextResponse.json({ error: 'Failed to update user strikes.' }, { status: 500 });
      }

      // Update appeal status
      const { error: appealError } = await serviceClient
        .from('appeals')
        .update({
          status: 'approved',
          admin_notes: adminNotes || null,
          resolved_by: user.id,
          resolved_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (appealError) {
        console.error('Failed to update appeal:', appealError);
        return NextResponse.json({ error: 'Failed to update appeal.' }, { status: 500 });
      }

      return NextResponse.json({ success: true, newStrikes });
    }

    // === REJECT ===
    if (action === 'reject') {
      const { error: appealError } = await serviceClient
        .from('appeals')
        .update({
          status: 'rejected',
          admin_notes: adminNotes || null,
          resolved_by: user.id,
          resolved_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (appealError) {
        console.error('Failed to update appeal:', appealError);
        return NextResponse.json({ error: 'Failed to update appeal.' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    console.error('Admin appeal action error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
