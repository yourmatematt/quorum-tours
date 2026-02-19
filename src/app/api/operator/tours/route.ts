/**
 * POST /api/operator/tours
 *
 * Create a new tour for the authenticated operator.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { slugify } from '@/lib/utils/slugify';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
      return NextResponse.json({ error: 'No operator account found' }, { status: 403 });
    }

    const body = await request.json();
    const {
      tourType,
      title,
      description,
      targetSpecies,
      date,
      startDate,
      endDate,
      startTime,
      duration,
      pricePerPerson,
      minParticipants,
      maxParticipants,
      included,
      notIncluded,
    } = body;

    // Server-side validation
    if (!title?.trim() || title.trim().length < 10) {
      return NextResponse.json({ error: 'Title must be at least 10 characters.' }, { status: 400 });
    }
    if (!description?.trim() || description.trim().length < 50) {
      return NextResponse.json({ error: 'Description must be at least 50 characters.' }, { status: 400 });
    }

    const price = parseFloat(pricePerPerson);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: 'Price must be greater than $0.' }, { status: 400 });
    }

    const minP = parseInt(minParticipants, 10);
    const maxP = parseInt(maxParticipants, 10);
    if (isNaN(minP) || minP < 1) {
      return NextResponse.json({ error: 'Minimum participants must be at least 1.' }, { status: 400 });
    }
    if (isNaN(maxP) || maxP < minP) {
      return NextResponse.json({ error: 'Maximum participants must be >= minimum.' }, { status: 400 });
    }

    // Determine dates
    const dateStart = date || startDate;
    const dateEnd = date || endDate;

    if (!dateStart) {
      return NextResponse.json({ error: 'Start date is required.' }, { status: 400 });
    }

    // Generate unique slug
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let slug = slugify(title);
    const { data: existingSlugs } = await serviceClient
      .from('tours')
      .select('slug')
      .ilike('slug', `${slug}%`);

    if (existingSlugs && existingSlugs.length > 0) {
      const suffix = Math.random().toString(36).substring(2, 6);
      slug = `${slug}-${suffix}`;
    }

    // Calculate pricing
    const priceCents = Math.round(price * 100);
    const depositCents = Math.round(priceCents * 0.20); // 20% default deposit

    // Calculate deadlines (defaults)
    const startDateObj = new Date(dateStart);
    const bookingDeadline = new Date(startDateObj);
    bookingDeadline.setDate(bookingDeadline.getDate() - 7);
    const thresholdDeadline = new Date(startDateObj);
    thresholdDeadline.setDate(thresholdDeadline.getDate() - 14);

    // Parse included/notIncluded as arrays (split by newlines)
    const includedArr = included
      ? included.split('\n').map((s: string) => s.trim()).filter(Boolean)
      : [];
    const notIncludedArr = notIncluded
      ? notIncluded.split('\n').map((s: string) => s.trim()).filter(Boolean)
      : [];

    // Parse target species
    const speciesArr = Array.isArray(targetSpecies)
      ? targetSpecies
      : typeof targetSpecies === 'string'
        ? targetSpecies.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

    // Build itinerary
    const itinerary = tourType === 'single-day'
      ? { type: 'single-day', startTime: startTime || null, duration: duration || null }
      : { type: 'multi-day' };

    // Insert tour
    const { data: tour, error: insertError } = await serviceClient
      .from('tours')
      .insert({
        slug,
        title: title.trim(),
        description: description.trim(),
        tour_type: tourType || 'multi-day',
        operator_id: operatorId,
        capacity: maxP,
        threshold: minP,
        current_participant_count: 0,
        price_cents: priceCents,
        deposit_cents: depositCents,
        date_start: dateStart,
        date_end: dateEnd || dateStart,
        booking_deadline: bookingDeadline.toISOString().split('T')[0],
        threshold_deadline: thresholdDeadline.toISOString().split('T')[0],
        status: 'forming',
        target_species: speciesArr,
        included: includedArr,
        itinerary,
        is_featured: false,
      })
      .select('id, slug')
      .single();

    if (insertError) {
      console.error('Tour insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create tour. Please try again.' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, tour: { id: tour.id, slug: tour.slug } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Tour creation error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
