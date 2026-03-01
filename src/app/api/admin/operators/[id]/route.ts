/**
 * GET /api/admin/operators/[id]
 *
 * Detailed operator endpoint returning full metrics, tour list,
 * recent reservations, and profile completeness.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Fetch operator
    const { data: operator, error: opError } = await serviceClient
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
        languages,
        is_verified,
        created_at,
        stripe_charges_enabled,
        stripe_payouts_enabled
      `)
      .eq('id', id)
      .single();

    if (opError || !operator) {
      return NextResponse.json({ error: 'Operator not found.' }, { status: 404 });
    }

    // Fetch all tours
    const { data: tours, error: toursError } = await serviceClient
      .from('tours')
      .select(`
        id,
        title,
        status,
        start_date,
        end_date,
        min_participants,
        max_participants,
        price_cents,
        created_at
      `)
      .eq('operator_id', id)
      .order('created_at', { ascending: false });

    if (toursError) {
      console.error('Failed to fetch tours:', toursError);
    }

    // Fetch reservation counts per tour
    const tourIds = tours?.map(t => t.id) || [];
    const tourReservations: Record<string, number> = {};

    if (tourIds.length > 0) {
      const { data: reservations } = await serviceClient
        .from('reservations')
        .select('tour_id, id')
        .in('tour_id', tourIds);

      reservations?.forEach(r => {
        tourReservations[r.tour_id] = (tourReservations[r.tour_id] || 0) + 1;
      });
    }

    // Enrich tours with reservation count
    const enrichedTours = (tours || []).map(t => ({
      ...t,
      reservation_count: tourReservations[t.id] || 0,
    }));

    // Calculate aggregate stats
    const liveTours = enrichedTours.filter(t =>
      ['forming', 'payment_pending', 'confirmed'].includes(t.status)
    ).length;
    const completedTours = enrichedTours.filter(t => t.status === 'completed').length;
    const failedTours = enrichedTours.filter(t => t.status === 'cancelled').length;
    const totalReservations = Object.values(tourReservations).reduce((a, b) => a + b, 0);
    const quorumDenominator = completedTours + failedTours;
    const quorumRate = quorumDenominator > 0
      ? Math.round((completedTours / quorumDenominator) * 100)
      : null;

    return NextResponse.json({
      operator: {
        ...operator,
        live_tours: liveTours,
        completed_tours: completedTours,
        failed_tours: failedTours,
        total_tours: enrichedTours.length,
        total_reservations: totalReservations,
        quorum_rate: quorumRate,
      },
      tours: enrichedTours,
    });
  } catch (error) {
    console.error('Admin operator detail error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
