/**
 * GET/PUT /api/operator/profile
 *
 * Fetch or update the authenticated operator's profile.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get operator membership
    const { data: membership } = await supabase
      .from('operator_members')
      .select('operator_id')
      .eq('profile_id', user.id)
      .eq('is_active', true)
      .maybeSingle();

    let operatorId = membership?.operator_id;

    // Fallback to linked_operator_id
    if (!operatorId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('linked_operator_id')
        .eq('id', user.id)
        .single();
      operatorId = profile?.linked_operator_id;
    }

    if (!operatorId) {
      return NextResponse.json({ error: 'No operator account found' }, { status: 404 });
    }

    // Fetch operator record
    const { data: operator, error: opError } = await supabase
      .from('operators')
      .select('*')
      .eq('id', operatorId)
      .single();

    if (opError || !operator) {
      return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
    }

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, name, display_name, avatar_url')
      .eq('id', user.id)
      .single();

    return NextResponse.json({ operator, profile });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tab, data } = body;

    // Get operator ID
    const { data: membership } = await supabase
      .from('operator_members')
      .select('operator_id')
      .eq('profile_id', user.id)
      .eq('is_active', true)
      .maybeSingle();

    let operatorId = membership?.operator_id;

    if (!operatorId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('linked_operator_id')
        .eq('id', user.id)
        .single();
      operatorId = profile?.linked_operator_id;
    }

    if (!operatorId) {
      return NextResponse.json({ error: 'No operator account found' }, { status: 404 });
    }

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (tab === 'public') {
      // Update operator table
      const { error: opError } = await serviceClient
        .from('operators')
        .update({
          name: data.name,
          tagline: data.tagline || null,
          description: data.description || null,
          base_location: data.baseLocation || null,
        })
        .eq('id', operatorId);

      if (opError) {
        console.error('Operator update error:', opError);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
      }

      // Update profile name
      if (data.displayName) {
        await serviceClient
          .from('profiles')
          .update({ name: data.displayName, display_name: data.displayName })
          .eq('id', user.id);
      }

      return NextResponse.json({ success: true });
    }

    if (tab === 'business') {
      // Store business info in operator metadata
      const { data: current } = await serviceClient
        .from('operators')
        .select('metadata')
        .eq('id', operatorId)
        .single();

      const metadata = { ...(current?.metadata || {}), ...data };

      const { error: opError } = await serviceClient
        .from('operators')
        .update({ metadata })
        .eq('id', operatorId);

      if (opError) {
        return NextResponse.json({ error: 'Failed to update business info' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    if (tab === 'notifications') {
      const { data: current } = await serviceClient
        .from('operators')
        .select('metadata')
        .eq('id', operatorId)
        .single();

      const metadata = { ...(current?.metadata || {}), notification_preferences: data };

      const { error: opError } = await serviceClient
        .from('operators')
        .update({ metadata })
        .eq('id', operatorId);

      if (opError) {
        return NextResponse.json({ error: 'Failed to update notification preferences' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown tab' }, { status: 400 });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
