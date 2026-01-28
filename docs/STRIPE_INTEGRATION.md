# Stripe Payment Integration Guide

## Overview

This document describes the Stripe payment integration for Quorum Tours. The integration handles one-time payments for tour commitments using Stripe Checkout Sessions.

## Features Implemented

### 1. Checkout Session Creation
- **File**: `src/app/api/checkout/route.ts`
- **Method**: POST `/api/checkout`
- **Purpose**: Creates a Stripe Checkout Session for payment
- **Accepts**: Tour ID, amount, tour name, user email
- **Returns**: Session ID and redirect URL

### 2. Webhook Handling
- **File**: `src/app/api/webhooks/stripe/route.ts`
- **Endpoint**: POST `/api/webhooks/stripe`
- **Purpose**: Processes Stripe events (payment success, expiration, failures)
- **Security**: Verifies webhook signatures using STRIPE_WEBHOOK_SECRET
- **Events Handled**:
  - `checkout.session.completed`: Payment successful
  - `checkout.session.expired`: Session expired (24 hours)
  - `charge.failed`: Payment declined

### 3. Client Integration
- **File**: `src/app/tours/[id]/join/page.tsx`
- **Changes**: Updated form submission to call checkout API
- **Flow**:
  1. User clicks "Reserve My Spot" button
  2. Form submits to `/api/checkout`
  3. Receives redirect URL from Stripe
  4. Browser redirects to Stripe Checkout page
  5. User completes payment
  6. Redirected to success page

### 4. Stripe Client Library
- **File**: `src/lib/stripe.ts`
- **Purpose**: Initializes Stripe Node.js SDK
- **Configuration**: Uses API version `2025-11-17.clover`

## Setup Instructions

### 1. Install Stripe Package

Already installed via npm:
```bash
npm install stripe
```

### 2. Get Stripe API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. In Test mode (default), copy:
   - **Secret Key** (starts with `sk_test_`)
   - **Publishable Key** (starts with `pk_test_`)

### 3. Set Environment Variables

Create a `.env.local` file in the project root:

```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_WEBHOOK_SECRET
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configure Webhook Endpoint (Local Testing)

For local development with Stripe webhooks:

#### Option A: Using Stripe CLI (Recommended)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run in terminal:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Copy the webhook secret from the CLI output
4. Add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_test_... (from CLI output)
   ```

#### Option B: Using Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `charge.failed`
5. Reveal and copy the signing secret
6. Add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_... (from dashboard)
   ```

### 5. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to a confirmed tour: `/tours/kakadu-wetlands-2026/join`

3. Click "Reserve My Spot"

4. You'll be redirected to Stripe Checkout Test page

5. Use test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Requires 3D Secure**: `4000 0025 0000 3155`
   - **Decline**: `4000 0000 0000 9995`

6. Enter any future expiry date and CVC

7. Click "Pay" to complete the test payment

## API Endpoints

### POST /api/checkout

Creates a Checkout Session.

**Request body:**
```json
{
  "tourId": "kakadu-wetlands-2026",
  "amount": 185000,
  "tourName": "Kakadu Wetlands Expedition",
  "userEmail": "user@example.com",
  "userId": "user-id"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### POST /api/webhooks/stripe

Receives and processes Stripe webhook events.

**Security:**
- Verifies `Stripe-Signature` header
- Rejects requests with invalid signatures
- Uses `STRIPE_WEBHOOK_SECRET` for verification

**Events:**
- `checkout.session.completed`: Payment successful
- `checkout.session.expired`: Session expired
- `charge.failed`: Payment declined

## Testing Checklist

- [ ] Test card payments succeed with `4242...`
- [ ] Failed payments are handled with `4000...9995`
- [ ] Webhook events are logged (check server console)
- [ ] Success page displays after payment
- [ ] Forming tours (no payment) still work
- [ ] Form validation prevents invalid submissions
- [ ] Error messages display to user on failure

## Future Enhancements

### Database Integration
Currently, webhook handlers log events but don't update the database. Next steps:

1. **After successful payment**:
   - Create/update commitment record
   - Set status to "confirmed"
   - Record payment confirmation timestamp
   - Lock commitment terms

2. **After session expiration**:
   - Mark commitment as "expired"
   - Clean up temporary records

3. **After payment failure**:
   - Record failure reason
   - Flag for support review

### Email Notifications
- Send confirmation email after successful payment
- Send receipt with tour details and booking reference
- Send follow-up reminder before tour date
- Send cancellation confirmation if cancelled

### Operator Dashboard
- Show payment received notification
- Display participant list with payment status
- Generate invoice/receipt for operator
- Track financial metrics

### Advanced Features
- Subscription payments for operators
- Refund handling (partial/full)
- Payment intent disputes
- Customer metadata tracking
- Multiple payment method support
- Currency conversion (if tours in different countries)

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `STRIPE_SECRET_KEY` | Server-side API calls (SECRET) | `sk_test_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side operations | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification | `whsec_test_...` |
| `NEXT_PUBLIC_APP_URL` | Base URL for redirects | `http://localhost:3000` |

## Security Notes

1. **Secret Key**: Never commit `STRIPE_SECRET_KEY` to version control. Use environment variables.
2. **Webhook Verification**: Always verify webhook signatures to prevent replay attacks.
3. **PCI Compliance**: Never handle raw card data on your server. Stripe Checkout handles this.
4. **Amount Validation**: Always validate amounts on the server before creating sessions.
5. **HTTPS**: Use HTTPS in production for all Stripe requests.

## Stripe Test Mode Card Numbers

| Scenario | Card Number | Expiry | CVC |
|----------|------------|--------|-----|
| Payment succeeds | 4242 4242 4242 4242 | Any future date | Any 3 digits |
| Requires 3D Secure | 4000 0025 0000 3155 | Any future date | Any 3 digits |
| Payment declined | 4000 0000 0000 9995 | Any future date | Any 3 digits |
| Insufficient funds | 4000 0000 0000 0002 | Any future date | Any 3 digits |
| Lost card | 4000 0200 0000 0005 | Any future date | Any 3 digits |

## Useful Links

- [Stripe Dashboard](https://dashboard.stripe.com)
- [API Keys](https://dashboard.stripe.com/apikeys)
- [Webhook Settings](https://dashboard.stripe.com/webhooks)
- [Test Data](https://stripe.com/docs/testing)
- [Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Webhook Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## Troubleshooting

### Webhook signature verification fails
- Check that `STRIPE_WEBHOOK_SECRET` is correct
- Ensure raw request body is not modified before verification
- For local testing, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Payment succeeds but no redirect
- Check that `NEXT_PUBLIC_APP_URL` is set correctly
- Ensure success URL is properly formatted in checkout session
- Check browser console for any JavaScript errors

### Form doesn't submit
- Check that `/api/checkout` endpoint is running
- Verify all required fields are sent (tourId, amount, tourName)
- Check server logs for validation errors

### 404 on Webhook endpoint
- Ensure `/api/webhooks/stripe/route.ts` file exists
- Check file path and naming conventions
- Restart development server after creating new routes

## Support

For issues with the integration:
1. Check Stripe Dashboard logs: https://dashboard.stripe.com/logs
2. Review webhook delivery: https://dashboard.stripe.com/webhooks
3. Check test card status: https://stripe.com/docs/testing
4. Stripe documentation: https://stripe.com/docs
