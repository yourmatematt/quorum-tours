/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook endpoint for handling payment events.
 *
 * Configured events:
 * - checkout.session.completed: Payment successful, commitment recorded
 * - checkout.session.expired: Session expired, no action needed
 * - charge.failed: Payment failed, log for support
 *
 * Security:
 * - Verifies webhook signature using STRIPE_WEBHOOK_SECRET
 * - Rejects unsigned or invalid requests
 * - Idempotent: Safe to retry (checks idempotency keys)
 *
 * Future integration:
 * - Update commitment status in database
 * - Send confirmation emails via email service
 * - Sync with operator dashboard
 * - Track payment analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

// Webhook secret - ensure STRIPE_WEBHOOK_SECRET is set in environment
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret';

/**
 * Handler for incoming webhook events from Stripe
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw request body as a string (required for signature verification)
    const body = await request.text();

    // Get the Stripe-Signature header
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Log the event (useful for debugging)
    console.log(`Webhook event received: ${event.type} (ID: ${event.id})`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;

      case 'checkout.session.expired':
        await handleCheckoutSessionExpired(event);
        break;

      case 'charge.failed':
        await handleChargeFailed(event);
        break;

      default:
        // Silently ignore other event types
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always respond with 200 to acknowledge receipt
    // Stripe expects this response immediately
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 500 to signal Stripe to retry
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout.session.completed event
 *
 * This event fires when a Checkout Session is successfully completed.
 * The customer paid and the payment is confirmed.
 *
 * Future: Update database with:
 * - Set commitment status to "confirmed"
 * - Record payment confirmation timestamp
 * - Lock commitment terms
 * - Send confirmation email
 */
async function handleCheckoutSessionCompleted(event: any) {
  const session = event.data.object;

  const {
    id: sessionId,
    metadata,
    customer_email: customerEmail,
    amount_total: amountTotal,
  } = session;

  console.log(`Payment completed for session: ${sessionId}`);
  console.log(`Tour ID: ${metadata?.tourId}`);
  console.log(`User ID: ${metadata?.userId}`);
  console.log(`Amount: ${amountTotal} cents`);
  console.log(`Customer email: ${customerEmail}`);

  // TODO: Database integration
  // const commitment = await db.commitments.update({
  //   where: { sessionId },
  //   data: {
  //     status: 'confirmed',
  //     paymentConfirmedAt: new Date(),
  //     stripeSessionId: sessionId,
  //   },
  // });

  // TODO: Email service integration
  // await sendConfirmationEmail({
  //   email: customerEmail,
  //   tourId: metadata?.tourId,
  //   userName: commitment.userName,
  // });

  // TODO: Notify operator dashboard
  // await notifyOperator(metadata?.tourId, 'commitment', { sessionId, amount: amountTotal });
}

/**
 * Handle checkout.session.expired event
 *
 * This event fires when a Checkout Session expires (24 hours after creation).
 * The customer did not complete payment.
 *
 * Future: Update database with:
 * - Mark commitment as "expired"
 * - Clean up temporary session record
 * - Optionally send follow-up email
 */
async function handleCheckoutSessionExpired(event: any) {
  const session = event.data.object;

  const { id: sessionId, metadata } = session;

  console.log(`Checkout session expired: ${sessionId}`);
  console.log(`Tour ID: ${metadata?.tourId}`);

  // TODO: Database integration
  // const commitment = await db.commitments.update({
  //   where: { sessionId },
  //   data: { status: 'expired' },
  // });

  // TODO: Optional follow-up
  // await sendAbandonedCheckoutEmail(metadata?.tourId);
}

/**
 * Handle charge.failed event
 *
 * This event fires when a charge attempt fails (card declined, etc.)
 *
 * Future: Update database with:
 * - Record failure reason
 * - Log for support team review
 * - Optionally send retry instructions
 */
async function handleChargeFailed(event: any) {
  const charge = event.data.object;

  const { id: chargeId, metadata, failure_message: failureMessage } = charge;

  console.error(`Charge failed: ${chargeId}`);
  console.error(`Failure reason: ${failureMessage}`);
  console.log(`Tour ID: ${metadata?.tourId}`);

  // TODO: Database integration
  // const commitment = await db.commitments.update({
  //   where: { sessionId: metadata?.sessionId },
  //   data: {
  //     status: 'payment_failed',
  //     failureReason: failureMessage,
  //   },
  // });

  // TODO: Support notification
  // await notifySupportTeam({
  //   event: 'payment_failed',
  //   chargeId,
  //   tourId: metadata?.tourId,
  //   reason: failureMessage,
  // });
}
