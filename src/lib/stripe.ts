/**
 * Stripe Client Configuration
 *
 * Initializes the Stripe Node.js SDK for server-side operations.
 * This module handles:
 * - Checkout Session creation
 * - Webhook event handling
 * - Payment verification
 *
 * Uses test keys by default. Replace with live keys in production.
 */

import Stripe from 'stripe';

// Lazy singleton — do not initialize at module level so builds without env vars succeed.
// The key is validated at first call (request time), not at import time.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    });
  }
  return _stripe;
}

export default getStripe;
