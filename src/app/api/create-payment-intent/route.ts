/**
 * POST /api/create-payment-intent
 *
 * Creates a Stripe PaymentIntent for embedded payment form (Stripe Elements).
 * Used for both deposits (forming tours) and full payments (confirmed tours).
 *
 * Request body:
 * {
 *   tourId: string;       // Tour identifier
 *   tourSlug: string;     // Tour slug for redirects
 *   amount: number;       // Amount in cents
 *   tourName: string;     // Tour name for display
 *   userId?: string;      // User identifier
 *   userEmail?: string;   // Customer email
 *   isDeposit?: boolean;  // Whether this is a deposit payment
 * }
 *
 * Response:
 * {
 *   clientSecret: string;  // PaymentIntent client secret for Stripe Elements
 *   paymentIntentId: string;
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tourId, tourSlug, amount, tourName, userId, userEmail, isDeposit } = body;

    // Validate required fields
    if (!tourId || !amount || !tourName) {
      return NextResponse.json(
        { error: 'Missing required fields: tourId, amount, tourName' },
        { status: 400 }
      );
    }

    // Validate amount (minimum $1 = 100 cents)
    if (typeof amount !== 'number' || amount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum is $1.00 (100 cents)' },
        { status: 400 }
      );
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
      description: isDeposit
        ? `Refundable deposit for ${tourName}`
        : `Tour booking: ${tourName}`,
      receipt_email: userEmail,
      metadata: {
        tourId,
        tourSlug: tourSlug || '',
        userId: userId || 'guest',
        paymentType: isDeposit ? 'deposit' : 'full_payment',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('PaymentIntent creation error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create payment intent',
      },
      { status: 500 }
    );
  }
}
