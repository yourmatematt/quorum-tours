/**
 * GET /api/admin/users?q=search&tier=all&status=all
 *
 * Admin-only user search. Searches by name, email, or user ID.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
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

    const { data: adminProfile } = await serviceClient
      .from('profiles')
      .select('is_admin, role')
      .eq('id', user.id)
      .single();

    if (!adminProfile?.is_admin && adminProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    // Parse query params
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.trim() || '';
    const tierFilter = url.searchParams.get('tier') || 'all';
    const statusFilter = url.searchParams.get('status') || 'all';

    if (!query) {
      return NextResponse.json({ users: [] });
    }

    // Build query
    let dbQuery = serviceClient
      .from('profiles')
      .select('id, email, name, tier, trust_score, tours_completed, strikes, is_flagged, is_admin, role, location, created_at, linked_operator_id')
      .order('created_at', { ascending: false })
      .limit(50);

    // Search by email, name, or UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(query);
    if (isUuid) {
      dbQuery = dbQuery.eq('id', query);
    } else {
      dbQuery = dbQuery.or(`email.ilike.%${query}%,name.ilike.%${query}%`);
    }

    // Apply tier filter
    if (tierFilter !== 'all') {
      const tierNum = parseInt(tierFilter, 10);
      if (!isNaN(tierNum)) {
        dbQuery = dbQuery.eq('tier', tierNum);
      }
    }

    // Apply status filter
    if (statusFilter === 'flagged') {
      dbQuery = dbQuery.eq('is_flagged', true);
    } else if (statusFilter === 'suspended') {
      dbQuery = dbQuery.gte('strikes', 3);
    } else if (statusFilter === 'active') {
      dbQuery = dbQuery.eq('is_flagged', false).lt('strikes', 3);
    }

    const { data: users, error } = await dbQuery;

    if (error) {
      console.error('Admin user search error:', error);
      return NextResponse.json({ error: 'Search failed.' }, { status: 500 });
    }

    return NextResponse.json({ users: users || [] });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
