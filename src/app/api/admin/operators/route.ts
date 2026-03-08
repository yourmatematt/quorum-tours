/**
 * GET /api/admin/operators
 *
 * Returns all approved operators with aggregated performance metrics.
 * Supports ?search= query param for name/location filtering.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
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

    const { data: profile } = await serviceClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const search = request.nextUrl.searchParams.get('search')?.trim().toLowerCase();

    // Fetch all operators
    let operatorQuery = serviceClient
      .from('operators')
      .select(`
        id,
        slug,
        name,
        tagline,
        description,
        logo_url,
        hero_image_url,
        base_location,
        specialties,
        is_verified,
        is_featured,
        created_at,
        stripe_charges_enabled,
        stripe_payouts_enabled
      `)
      .eq('is_verified', true)
      .order('name', { ascending: true });

    if (search) {
      operatorQuery = operatorQuery.or(
        `name.ilike.%${search}%,base_location.ilike.%${search}%`
      );
    }

    const { data: operators, error: opError } = await operatorQuery;

    if (opError) {
      console.error('Failed to fetch operators:', opError);
      return NextResponse.json({ error: 'Failed to fetch operators.' }, { status: 500 });
    }

    if (!operators || operators.length === 0) {
      return NextResponse.json({ operators: [] });
    }

    const operatorIds = operators.map(o => o.id);

    // Fetch all tours for these operators with status
    const { data: tours, error: toursError } = await serviceClient
      .from('tours')
      .select('id, operator_id, status')
      .in('operator_id', operatorIds);

    if (toursError) {
      console.error('Failed to fetch tours:', toursError);
    }

    // Fetch reservation counts per operator (via tours)
    const tourIds = tours?.map(t => t.id) || [];
    let reservationCounts: Record<string, number> = {};

    if (tourIds.length > 0) {
      const { data: reservations, error: resError } = await serviceClient
        .from('reservations')
        .select('tour_id')
        .in('tour_id', tourIds);

      if (resError) {
        console.error('Failed to fetch reservations:', resError);
      }

      // Build tour_id -> operator_id map
      const tourOperatorMap = new Map<string, string>();
      tours?.forEach(t => tourOperatorMap.set(t.id, t.operator_id));

      // Count reservations per operator
      reservations?.forEach(r => {
        const opId = tourOperatorMap.get(r.tour_id);
        if (opId) {
          reservationCounts[opId] = (reservationCounts[opId] || 0) + 1;
        }
      });
    }

    // Aggregate tour stats per operator
    const tourStats: Record<string, {
      live: number;
      completed: number;
      failed: number;
      total: number;
    }> = {};

    tours?.forEach(t => {
      if (!tourStats[t.operator_id]) {
        tourStats[t.operator_id] = { live: 0, completed: 0, failed: 0, total: 0 };
      }
      const stats = tourStats[t.operator_id];
      stats.total++;

      if (['forming', 'payment_pending', 'confirmed'].includes(t.status)) {
        stats.live++;
      } else if (t.status === 'completed') {
        stats.completed++;
      } else if (t.status === 'cancelled') {
        stats.failed++;
      }
    });

    // Enrich operators with metrics
    const enrichedOperators = operators.map(op => {
      const stats = tourStats[op.id] || { live: 0, completed: 0, failed: 0, total: 0 };
      const quorumDenominator = stats.completed + stats.failed;
      const quorumRate = quorumDenominator > 0
        ? Math.round((stats.completed / quorumDenominator) * 100)
        : null;

      return {
        ...op,
        live_tours: stats.live,
        completed_tours: stats.completed,
        failed_tours: stats.failed,
        total_tours: stats.total,
        total_reservations: reservationCounts[op.id] || 0,
        quorum_rate: quorumRate,
      };
    });

    return NextResponse.json({ operators: enrichedOperators });
  } catch (error) {
    console.error('Admin operators error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
