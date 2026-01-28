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

// Validate required environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export default stripe;
