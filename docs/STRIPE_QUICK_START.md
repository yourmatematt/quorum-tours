# Stripe Integration Quick Start

Get the Stripe integration running in 5 minutes.

## Step 1: Get Stripe Keys (2 minutes)

1. Visit https://dashboard.stripe.com/apikeys
2. Copy your **Secret Key** (looks like `sk_test_...`)
3. Copy your **Publishable Key** (looks like `pk_test_...`)

## Step 2: Set Environment Variables (1 minute)

Create `.env.local` in the project root:

```
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_test_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Install Dependencies (Already done)

```bash
npm install stripe
```

## Step 4: Set Up Webhooks for Testing (1 minute)

### Using Stripe CLI (Easiest)

```bash
# Install if not already installed
# https://stripe.com/docs/stripe-cli

# In a new terminal, run:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook secret from the output and add to `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_test_... (from CLI)
```

### Or use Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe` (update for production)
4. Select: `checkout.session.completed`, `checkout.session.expired`, `charge.failed`
5. Copy the secret and add to `.env.local`

## Step 5: Test It (1 minute)

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3000/tours/kakadu-wetlands-2026/join

3. Click "Reserve My Spot"

4. Use test card: **4242 4242 4242 4242**

5. Any future date for expiry, any 3 digits for CVC

6. Click "Pay"

7. You should be redirected to success page

## Key Files

- `/src/lib/stripe.ts` - Stripe client initialization
- `/src/app/api/checkout/route.ts` - Create Checkout Session
- `/src/app/api/webhooks/stripe/route.ts` - Handle webhook events
- `/src/app/tours/[id]/join/page.tsx` - Updated to use Stripe

## Test Card Numbers

| Scenario | Card | Expiry | CVC |
|----------|------|--------|-----|
| Success | 4242 4242 4242 4242 | Any future | Any 3 digits |
| Decline | 4000 0000 0000 9995 | Any future | Any 3 digits |
| 3D Secure | 4000 0025 0000 3155 | Any future | Any 3 digits |

## What's Next?

After testing:
1. Create a test Stripe account (free)
2. Connect real database for commitment storage
3. Set up email notifications
4. Add payment confirmation logging
5. Create operator dashboard for payments received

## Troubleshooting

**No redirect after payment?**
- Check `NEXT_PUBLIC_APP_URL` is correct
- Check browser console for errors

**Webhook not firing?**
- Using Stripe CLI? Make sure it's running
- Check `STRIPE_WEBHOOK_SECRET` is correct

**404 on API endpoints?**
- Restart dev server after creating new files
- Check file paths match exactly

## Need Help?

See full docs: `/docs/STRIPE_INTEGRATION.md`
