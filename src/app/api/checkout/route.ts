/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for tour commitments.
 *
 * Request body:
 * {
 *   tourId: string;      // Tour identifier
 *   amount: number;      // Amount in cents (e.g., 185000 for $1,850)
 *   tourName: string;    // Tour name for display
 *   userId?: string;     // User identifier (for future DB sync)
 *   userEmail?: string;  // Customer email
 * }
 *
 * Response:
 * {
 *   sessionId: string;  // Checkout Session ID for client redirect
 *   url: string;        // Stripe Checkout URL (for backwards compatibility)
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tourId, amount, tourName, userId, userEmail } = body;

    // Validate required fields
    if (!tourId || !amount || !tourName) {
      return NextResponse.json(
        {
          error: 'Missing required fields: tourId, amount, tourName',
        },
        { status: 400 }
      );
    }

    // Validate amount (minimum $1 = 100 cents)
    if (typeof amount !== 'number' || amount < 100) {
      return NextResponse.json(
        {
          error: 'Invalid amount. Minimum is $1.00 (100 cents)',
        },
        { status: 400 }
      );
    }

    // Get the base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${request.headers.get('host')}`;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,

      // Line items configuration
      line_items: [
        {
          price_data: {
            currency: 'aud', // Australian Dollars for Quorum Tours
            product_data: {
              name: tourName,
              description: `Tour commitment for ${tourName}`,
              metadata: {
                tourId,
                userId: userId || 'guest',
              },
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],

      // Success and cancel URLs
      success_url: `${baseUrl}/tours/{CHECKOUT_SESSION_ID}/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/tours/${tourId}/join?canceled=true`,

      // Metadata for webhook processing
      metadata: {
        tourId,
        userId: userId || 'guest',
      },
    });

    // Return session ID to client
    return NextResponse.json({
      sessionId: session.id,
      url: session.url, // For backwards compatibility with redirect
    });
  } catch (error) {
    console.error('Checkout session creation error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create checkout session',
      },
      { status: 500 }
    );
  }
}
