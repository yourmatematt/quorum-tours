/**
 * POST /api/appeals
 *
 * Submit a strike appeal. User must be authenticated and have strikes > 0.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reason, strikeHistoryId } = body;

    if (!reason?.trim()) {
      return NextResponse.json({ error: 'Please provide a reason for your appeal.' }, { status: 400 });
    }

    // Verify user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check user has strikes
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('strikes')
      .eq('id', user.id)
      .single();

    if (!profile || profile.strikes <= 0) {
      return NextResponse.json({ error: 'No strikes to appeal.' }, { status: 400 });
    }

    // Check for existing pending appeal on the same strike
    if (strikeHistoryId) {
      const { data: existing } = await serviceClient
        .from('appeals')
        .select('id')
        .eq('user_id', user.id)
        .eq('strike_history_id', strikeHistoryId)
        .eq('status', 'pending')
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ error: 'You already have a pending appeal for this strike.' }, { status: 400 });
      }
    }

    // Insert appeal
    const { data: appeal, error: insertError } = await serviceClient
      .from('appeals')
      .insert({
        user_id: user.id,
        strike_history_id: strikeHistoryId || null,
        reason: reason.trim(),
        status: 'pending',
      })
      .select('id, status, created_at')
      .single();

    if (insertError) {
      console.error('Failed to insert appeal:', insertError);
      return NextResponse.json({ error: 'Failed to submit appeal.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, appeal });
  } catch (error) {
    console.error('Appeal submission error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
