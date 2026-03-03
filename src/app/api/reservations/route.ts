/**
 * POST /api/reservations
 *
 * Creates a reservation for a tour (no-deposit express interest).
 * Used when a trusted user commits to a forming tour with $0 deposit.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tourId } = body;

    if (!tourId) {
      return NextResponse.json({ error: 'Missing tourId.' }, { status: 400 });
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

    // Check booking eligibility via trust status
    const { data: trustStatus, error: trustError } = await serviceClient.rpc('get_user_trust_status', {
      p_user_id: user.id,
    });

    if (trustError) {
      console.error('Trust status check failed:', trustError);
      return NextResponse.json({ error: 'Failed to verify booking eligibility.' }, { status: 500 });
    }

    if (trustStatus && !trustStatus.can_book) {
      return NextResponse.json({ error: 'Your account is not eligible to book tours.' }, { status: 403 });
    }

    // Fetch tour to verify it exists and is forming
    const { data: tour, error: tourError } = await serviceClient
      .from('tours')
      .select('id, slug, status, capacity, current_participants')
      .eq('id', tourId)
      .single();

    if (tourError || !tour) {
      return NextResponse.json({ error: 'Tour not found.' }, { status: 404 });
    }

    if (tour.status !== 'forming') {
      return NextResponse.json({ error: 'This tour is no longer accepting commitments.' }, { status: 400 });
    }

    if (tour.current_participants >= tour.capacity) {
      return NextResponse.json({ error: 'This tour is full.' }, { status: 400 });
    }

    // Check for existing reservation
    const { data: existing } = await serviceClient
      .from('reservations')
      .select('id, status')
      .eq('tour_id', tourId)
      .eq('user_id', user.id)
      .not('status', 'in', '("cancelled","abandoned","refunded")')
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'You already have a reservation for this tour.' }, { status: 400 });
    }

    // Calculate deposit (should be 0 for trusted users)
    const { data: depositCents } = await serviceClient.rpc('calculate_required_deposit', {
      p_user_id: user.id,
      p_tour_id: tourId,
    });

    if (depositCents && depositCents > 0) {
      return NextResponse.json({ error: 'A deposit is required for this tour. Please use the payment flow.' }, { status: 400 });
    }

    // Create reservation with interest status (no payment needed)
    const { data: reservation, error: insertError } = await serviceClient
      .from('reservations')
      .insert({
        tour_id: tourId,
        user_id: user.id,
        status: 'reserved',
        deposit_cents: 0,
        deposit_charged: false,
        guest_count: 1,
      })
      .select('id, status')
      .single();

    if (insertError) {
      // Handle unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json({ error: 'You already have a reservation for this tour.' }, { status: 400 });
      }
      console.error('Failed to create reservation:', insertError);
      return NextResponse.json({ error: 'Failed to create reservation.' }, { status: 500 });
    }

    // Increment tour participant count
    await serviceClient
      .from('tours')
      .update({ current_participants: tour.current_participants + 1 })
      .eq('id', tourId);

    return NextResponse.json({
      success: true,
      reservationId: reservation.id,
      tourSlug: tour.slug,
    });
  } catch (error) {
    console.error('Reservation creation error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
