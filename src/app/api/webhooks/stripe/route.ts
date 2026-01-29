/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook endpoint for handling payment events.
 *
 * Configured events:
 * - payment_intent.succeeded: Embedded payment successful (Stripe Elements)
 * - checkout.session.completed: Hosted checkout successful (legacy)
 * - checkout.session.expired: Session expired
 * - charge.failed: Payment failed
 *
 * Security:
 * - Verifies webhook signature using STRIPE_WEBHOOK_SECRET
 * - Rejects unsigned or invalid requests
 * - Idempotent: Checks payment_events table before processing
 */

import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Webhook secret
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret';

// Site URL for email links
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

// Supabase Edge Function URL for emails
const emailFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`;

/**
 * Handler for incoming webhook events from Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    console.log(`Webhook event received: ${event.type} (ID: ${event.id})`);

    // Check idempotency - have we already processed this event?
    const { data: existingEvent } = await supabaseAdmin
      .from('payment_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .single();

    if (existingEvent) {
      console.log(`Event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true, status: 'already_processed' });
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event);
        break;

      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;

      case 'checkout.session.expired':
        await handleCheckoutSessionExpired(event);
        break;

      case 'charge.failed':
        await handleChargeFailed(event);
        break;

      case 'payout.paid':
        await handlePayoutPaid(event);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

/**
 * Handle payment_intent.succeeded event (Stripe Elements embedded payments)
 */
async function handlePaymentIntentSucceeded(event: any) {
  const paymentIntent = event.data.object;
  const {
    id: paymentIntentId,
    metadata,
    amount,
    receipt_email: receiptEmail,
  } = paymentIntent;

  const { tourId, tourSlug, userId, paymentType } = metadata || {};
  const isDeposit = paymentType === 'deposit';

  console.log(`Payment succeeded: ${paymentIntentId}`);
  console.log(`Tour: ${tourId}, User: ${userId}, Type: ${paymentType}`);

  // Log the event for idempotency
  await supabaseAdmin.from('payment_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    amount_cents: amount,
    status: 'succeeded',
    raw_payload: event.data.object,
    processed: false,
  });

  try {
    // Get tour details
    const { data: tour, error: tourError } = await supabaseAdmin
      .from('tours')
      .select(`
        *,
        operator:operators(id, name, slug, base_location)
      `)
      .eq('id', tourId)
      .single();

    if (tourError || !tour) {
      console.error('Tour not found:', tourId);
      throw new Error(`Tour not found: ${tourId}`);
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id, email, name')
      .eq('id', userId)
      .single();

    const userEmail = profile?.email || receiptEmail;
    const userName = profile?.name || userEmail?.split('@')[0] || 'there';

    // Create or update reservation
    const reservationData = {
      tour_id: tourId,
      user_id: userId !== 'anonymous' && userId !== 'guest' ? userId : null,
      status: isDeposit ? 'reserved' : 'confirmed',
      deposit_cents: isDeposit ? amount : 0,
      deposit_held: isDeposit,
      deposit_held_at: isDeposit ? new Date().toISOString() : null,
      balance_cents: isDeposit ? tour.price_cents - amount : 0,
      stripe_payment_intent_id: paymentIntentId,
      guest_count: 1,
    };

    const { data: reservation, error: reservationError } = await supabaseAdmin
      .from('reservations')
      .insert(reservationData)
      .select()
      .single();

    if (reservationError) {
      console.error('Failed to create reservation:', reservationError);
      throw reservationError;
    }

    console.log(`Reservation created: ${reservation.id}`);

    // Update payment_events with reservation_id
    await supabaseAdmin
      .from('payment_events')
      .update({ reservation_id: reservation.id, processed: true, processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id);

    // Re-fetch tour to check if quorum was just reached (DB trigger updates count and status)
    const { data: updatedTour } = await supabaseAdmin
      .from('tours')
      .select('status, current_participant_count, threshold, payment_window_end')
      .eq('id', tourId)
      .single();

    const quorumJustReached = isDeposit &&
      updatedTour?.status === 'payment_pending' &&
      updatedTour?.current_participant_count >= updatedTour?.threshold;

    // Calculate payment deadline (24 hours from now if quorum just reached)
    const paymentDeadline = quorumJustReached
      ? new Date(updatedTour.payment_window_end || Date.now() + 24 * 60 * 60 * 1000)
      : null;

    // Determine which email to send
    let emailTemplate: string;
    let emailData: Record<string, unknown>;

    if (!isDeposit) {
      // Full payment - tour was already confirmed
      emailTemplate = 'payment_confirmed';
      emailData = {
        firstName: userName,
        tourName: tour.title,
        tourDate: formatDateRange(tour.date_start, tour.date_end),
        operatorName: tour.operator?.name || 'Tour Operator',
        amountPaid: amount / 100,
        tourUrl: `${siteUrl}/tours/${tour.slug}`,
        siteUrl,
      };
    } else if (quorumJustReached) {
      // This user was the one who hit quorum - send quorum_reached email
      emailTemplate = 'quorum_reached';
      emailData = {
        firstName: userName,
        tourName: tour.title,
        tourDate: formatDateRange(tour.date_start, tour.date_end),
        operatorName: tour.operator?.name || 'Tour Operator',
        depositPaid: amount / 100,
        remainingAmount: (tour.price_cents - amount) / 100,
        totalPrice: tour.price_cents / 100,
        paymentDeadline: paymentDeadline ? formatDate(paymentDeadline.toISOString()) : 'within 24 hours',
        paymentUrl: `${siteUrl}/tours/${tour.slug}/join/payment?type=full`,
        tourUrl: `${siteUrl}/tours/${tour.slug}`,
        siteUrl,
      };
      console.log(`Quorum reached! User ${userId} was the final commit.`);

      // Trigger the process-quorum function to notify all OTHER participants
      // This will send quorum_reached emails to everyone except this user (who just got theirs)
      try {
        const processQuorumUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/process-quorum`;
        await fetch(processQuorumUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            tour_id: tourId,
            exclude_user_id: userId, // Don't double-email this user
          }),
        });
        console.log(`Triggered process-quorum for tour ${tourId}`);
      } catch (quorumErr) {
        console.error('Failed to trigger process-quorum:', quorumErr);
      }
    } else {
      // Standard deposit - tour still forming
      emailTemplate = 'tour_committed';
      emailData = {
        firstName: userName,
        tourName: tour.title,
        tourDate: formatDateRange(tour.date_start, tour.date_end),
        operatorName: tour.operator?.name || 'Tour Operator',
        operatorEmail: 'hello@quorumtours.com',
        deadlineDate: formatDate(tour.threshold_deadline || tour.booking_deadline),
        depositAmount: amount / 100,
        remainingAmount: (tour.price_cents - amount) / 100,
        threshold: tour.threshold,
        currentCommits: updatedTour?.current_participant_count || (tour.current_participant_count + 1),
        spotsRemaining: Math.max(0, tour.threshold - (updatedTour?.current_participant_count || (tour.current_participant_count + 1))),
        targetSpecies: tour.target_species?.join(', ') || '',
        tourLocation: tour.operator?.base_location || tour.location || 'Australia',
        tourUrl: `${siteUrl}/tours/${tour.slug}`,
        siteUrl,
      };
    }

    await sendEmail(emailTemplate, userEmail, emailData);

    // Log user email sent
    await supabaseAdmin.from('email_log').insert({
      user_id: userId !== 'anonymous' && userId !== 'guest' ? userId : null,
      reservation_id: reservation.id,
      tour_id: tourId,
      email_type: isDeposit ? 'reservation_confirmed' : 'payment_successful',
      recipient_email: userEmail,
      subject: isDeposit
        ? `Your commitment to ${tour.title} is confirmed`
        : `Payment confirmed for ${tour.title}`,
      status: 'sent',
    });

    console.log(`Confirmation email sent to ${userEmail}`);

    // Send new_booking notification to operator
    const { data: operatorProfile } = await supabaseAdmin
      .from('profiles')
      .select('id, email, name')
      .eq('id', tour.operator?.id)
      .single();

    if (operatorProfile?.email) {
      const operatorEmailData = {
        operatorName: operatorProfile.name || 'Tour Operator',
        guestName: userName,
        guestEmail: userEmail,
        tourName: tour.title,
        tourDate: formatDateRange(tour.date_start, tour.date_end),
        bookingType: isDeposit ? 'Deposit commitment' : 'Full payment',
        amountPaid: amount / 100,
        currentParticipants: tour.current_participant_count + 1,
        threshold: tour.threshold,
        spotsRemaining: Math.max(0, tour.threshold - (tour.current_participant_count + 1)),
        tourUrl: `${siteUrl}/tours/${tour.slug}`,
        dashboardUrl: `${siteUrl}/operator/tours`,
        siteUrl,
      };

      await sendEmail('new_booking', operatorProfile.email, operatorEmailData);

      await supabaseAdmin.from('email_log').insert({
        user_id: operatorProfile.id,
        reservation_id: reservation.id,
        tour_id: tourId,
        email_type: 'new_booking',
        recipient_email: operatorProfile.email,
        subject: `New booking for ${tour.title}`,
        status: 'sent',
      });

      console.log(`New booking notification sent to operator ${operatorProfile.email}`);
    }

  } catch (error) {
    console.error('Error processing payment:', error);

    // Mark event as failed
    await supabaseAdmin
      .from('payment_events')
      .update({
        processing_error: error instanceof Error ? error.message : 'Unknown error',
        processed: false
      })
      .eq('stripe_event_id', event.id);
  }
}

/**
 * Handle checkout.session.completed event (legacy Stripe Checkout)
 */
async function handleCheckoutSessionCompleted(event: any) {
  const session = event.data.object;
  const {
    id: sessionId,
    metadata,
    customer_email: customerEmail,
    amount_total: amountTotal,
  } = session;

  console.log(`Checkout completed: ${sessionId}`);

  // Log event
  await supabaseAdmin.from('payment_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    amount_cents: amountTotal,
    status: 'completed',
    raw_payload: session,
    processed: true,
    processed_at: new Date().toISOString(),
  });

  // Similar processing to PaymentIntent - could refactor to share code
  // For now, log the event for manual follow-up if needed
  console.log(`Tour ID: ${metadata?.tourId}, User: ${metadata?.userId}`);
}

/**
 * Handle checkout.session.expired event
 */
async function handleCheckoutSessionExpired(event: any) {
  const session = event.data.object;
  console.log(`Checkout session expired: ${session.id}`);

  await supabaseAdmin.from('payment_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    status: 'expired',
    raw_payload: session,
    processed: true,
    processed_at: new Date().toISOString(),
  });
}

/**
 * Handle charge.failed event
 */
async function handleChargeFailed(event: any) {
  const charge = event.data.object;
  console.error(`Charge failed: ${charge.id}, reason: ${charge.failure_message}`);

  await supabaseAdmin.from('payment_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    amount_cents: charge.amount,
    status: 'failed',
    raw_payload: charge,
    processing_error: charge.failure_message,
    processed: true,
    processed_at: new Date().toISOString(),
  });
}

/**
 * Handle payout.paid event - notify operator of payout
 */
async function handlePayoutPaid(event: any) {
  const payout = event.data.object;
  const {
    id: payoutId,
    amount,
    arrival_date: arrivalDate,
    destination,
  } = payout;

  console.log(`Payout paid: ${payoutId}, amount: ${amount}`);

  // Log event
  await supabaseAdmin.from('payment_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    amount_cents: amount,
    status: 'paid',
    raw_payload: payout,
    processed: true,
    processed_at: new Date().toISOString(),
  });

  // Get connected account info from Stripe
  try {
    const account = await stripe.accounts.retrieve(destination);
    const accountEmail = account.email;

    if (accountEmail) {
      // Find operator by Stripe account ID
      const { data: operator } = await supabaseAdmin
        .from('operators')
        .select('id, name, user_id')
        .eq('stripe_account_id', destination)
        .single();

      const operatorName = operator?.name || account.business_profile?.name || 'Tour Operator';

      const emailData = {
        operatorName,
        amount: amount / 100,
        currency: payout.currency?.toUpperCase() || 'AUD',
        arrivalDate: new Date(arrivalDate * 1000).toLocaleDateString('en-AU', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        bankLast4: payout.destination_details?.bank_account?.last4 || '****',
        payoutId,
        dashboardUrl: `${siteUrl}/operator/earnings`,
        siteUrl,
      };

      await sendEmail('payout_sent', accountEmail, emailData);

      await supabaseAdmin.from('email_log').insert({
        user_id: operator?.user_id || null,
        email_type: 'payout_sent',
        recipient_email: accountEmail,
        subject: `Payout of $${amount / 100} is on its way`,
        status: 'sent',
      });

      console.log(`Payout notification sent to ${accountEmail}`);
    }
  } catch (error) {
    console.error('Error processing payout notification:', error);
  }
}

/**
 * Send email via Supabase Edge Function
 */
async function sendEmail(template: string, to: string, data: Record<string, unknown>) {
  try {
    const response = await fetch(emailFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ template, to, data }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Email send failed:', error);
      throw new Error(`Email send failed: ${error}`);
    }

    const result = await response.json();
    console.log(`Email sent successfully: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

/**
 * Format date range for display
 */
function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleDateString('en-AU', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-AU', { month: 'short' });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

/**
 * Format single date
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });
}
