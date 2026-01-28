# Stripe Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Quorum Tours App                          │
│                      (Next.js Frontend)                          │
└────────────────────────────┬──────────────────────────────────────┘
                             │
                             ├─────────────────────────┐
                             │                         │
        ┌────────────────────▼──────────────────┐  ┌──▼──────────────┐
        │   Join Tour Page                      │  │   Forming Tours  │
        │   /tours/[id]/join                    │  │   (No Payment)   │
        │                                       │  │                  │
        │  Form Submission                      │  │  Express Interest│
        │  ↓                                     │  │  (Direct Submit) │
        │  POST /api/checkout                   │  │                  │
        └────────────────────┬──────────────────┘  └──────────────────┘
                             │
                             │ (tourId, amount, email)
                             │
        ┌────────────────────▼──────────────────────────────────────┐
        │              Checkout API Route                           │
        │           src/app/api/checkout/route.ts                  │
        │                                                            │
        │  1. Validate input (amount, tourId, etc)                 │
        │  2. Create Stripe Checkout Session                       │
        │  3. Return sessionId & redirect URL                      │
        │                                                            │
        │  Uses: Stripe Node.js SDK (src/lib/stripe.ts)            │
        └────────────────┬─────────────────────────────────────────┘
                         │
                         │ stripe.checkout.sessions.create()
                         │
        ┌────────────────▼─────────────────────────────────────────┐
        │                                                            │
        │               Stripe Servers                             │
        │          (Payment Processing)                            │
        │                                                            │
        │  • Creates Checkout Session                              │
        │  • Generates checkout URL                                │
        │  • Handles card processing                               │
        │  • Manages payment confirmation                          │
        │                                                            │
        └──────────────┬─────────────────────────────────────────────┘
                       │
        ┌──────────────┴─────────────────────┬──────────────────────┐
        │                                    │                      │
        │ Checkout URL                      │ Webhook Event         │
        │ (redirect to Stripe)              │ (async)               │
        │                                    │                      │
        ▼                                    ▼                      ▼
┌─────────────────────┐          ┌──────────────────────────────────┐
│  Stripe Checkout    │          │   Webhook Handler                │
│  Payment Form       │          │   /api/webhooks/stripe/route.ts  │
│                     │          │                                  │
│ • Card fields       │          │  1. Extract event from request  │
│ • 3D Secure        │          │  2. Verify signature             │
│ • Authentication    │          │     (STRIPE_WEBHOOK_SECRET)      │
│                     │          │  3. Handle event:                │
│  User Completes →  │          │     • checkout.session.completed │
│  Payment            │          │     • checkout.session.expired   │
└──────────┬──────────┘          │     • charge.failed              │
           │                     │  4. TODO: Update database        │
           │                     │  5. TODO: Send emails            │
           │                     │  6. Return 200 OK                │
           │                     │                                  │
           │                     └──────────────────────────────────┘
           │                              │
           │                              │
        Success?                   Event Processed
        /tours/[id]/               (Logged in console)
        join/success
           │
           ▼
    ┌────────────────────┐
    │  Success Page      │
    │  Shows booking     │
    │  confirmation      │
    └────────────────────┘
```

## Component Structure

### 1. Stripe Client Library
```
src/lib/stripe.ts
├── Stripe instance initialization
├── API version configuration
├── TypeScript support enabled
└── Environment variable handling
```

### 2. Checkout Flow
```
POST /api/checkout
├── Input Validation
│   ├── tourId (required)
│   ├── amount (required, min 100 cents)
│   ├── tourName (required)
│   ├── userEmail (optional)
│   └── userId (optional)
│
├── Create Checkout Session
│   ├── Line items (product data)
│   ├── Success/cancel URLs
│   ├── Metadata (tourId, userId)
│   └── Payment method types (card)
│
└── Return Response
    ├── sessionId (for webhooks)
    └── url (for client redirect)
```

### 3. Webhook Handler
```
POST /api/webhooks/stripe
├── Extract raw body & signature
├── Verify Signature
│   ├── Use stripe.webhooks.constructEvent()
│   ├── Validate Stripe-Signature header
│   └── Use STRIPE_WEBHOOK_SECRET
│
├── Route by Event Type
│   ├── checkout.session.completed
│   │   └── TODO: Create commitment record
│   ├── checkout.session.expired
│   │   └── TODO: Mark as expired
│   └── charge.failed
│       └── TODO: Log failure for support
│
└── Return 200 OK (always, immediately)
```

## Data Flow

### Successful Payment Flow

```
1. USER ACTION
   User fills form and clicks "Reserve My Spot"

2. CLIENT SIDE
   Form validation in browser
   POST to /api/checkout with:
   {
     tourId: "kakadu-wetlands-2026",
     amount: 185000,
     tourName: "Kakadu Wetlands Expedition",
     userEmail: "user@example.com"
   }

3. SERVER SIDE - CHECKOUT
   Validate inputs
   Create Stripe Checkout Session
   Set success_url = /tours/{id}/join/success
   Set cancel_url = /tours/{id}/join?canceled=true
   Return { sessionId, url }

4. CLIENT SIDE - REDIRECT
   window.location.href = url
   User redirected to Stripe Checkout

5. STRIPE PROCESSING
   User enters payment details
   Stripe validates card
   3D Secure (if required)
   Payment processed

6. STRIPE WEBHOOK
   Payment confirmed
   Stripe sends webhook to /api/webhooks/stripe
   POST body: Stripe event object
   Header: Stripe-Signature: t=xxx,v1=yyy

7. SERVER SIDE - WEBHOOK
   Extract raw body
   Verify signature with webhook secret
   Construct event object
   Route to handler by event.type
   checkout.session.completed → Handle success
   Return 200 OK immediately

8. USER REDIRECT
   Stripe sends success_url redirect
   User redirected to /tours/{id}/join/success
   Shows confirmation message

9. DATABASE (TODO)
   Webhook handler updates database:
   INSERT INTO commitments:
   - status: "confirmed"
   - paymentConfirmedAt: now()
   - stripeSessionId: session.id
   - tourId: from metadata
   - userId: from metadata

10. EMAIL (TODO)
    Send confirmation email:
    - To: customer_email
    - Subject: Booking Confirmation
    - Include: tour details, booking reference
```

### Failed Payment Flow

```
1. USER ATTEMPTS PAYMENT
   Uses test card: 4000 0000 0000 9995 (decline)

2. STRIPE DECLINES
   Payment fails
   Sends charge.failed webhook

3. WEBHOOK HANDLER
   Processes charge.failed event
   TODO: Log failure to database
   TODO: Notify support team
   Return 200 OK

4. USER EXPERIENCE
   Stripe shows error message
   User can:
   - Try different card
   - Cancel checkout
   - Contact support

5. RETRY
   If user retries with valid card:
   Return to step 1 with new attempt
```

### Session Expiration Flow

```
1. SESSION CREATED
   User creates Checkout Session
   Session valid for 24 hours

2. USER DOESN'T COMPLETE
   User closes browser
   Session expires after 24 hours

3. STRIPE WEBHOOK
   Sends checkout.session.expired event

4. WEBHOOK HANDLER
   Processes expiration
   TODO: Mark commitment as expired
   TODO: Optional: Send follow-up email
   Return 200 OK

5. USER ACTION
   User can:
   - Click link to create new session
   - Contact support
```

## Security Architecture

```
┌─────────────────────────────────────────────────────┐
│              Security Layers                        │
└─────────────────────────────────────────────────────┘

LAYER 1: Client-Side Validation
├── Check required fields
├── Validate amount
└── User feedback on errors

LAYER 2: Server-Side Validation
├── Re-validate all inputs
├── Check amount range
├── Verify user has access
└── Reject invalid requests early

LAYER 3: Stripe Integration
├── Use official Stripe SDK
├── No raw card data handling
├── Secure HTTPS connection
└── Stripe handles PCI compliance

LAYER 4: Webhook Security
├── Verify Stripe-Signature header
├── Use webhook signing secret
├── HMAC-SHA256 verification
├── Timestamp validation
└── Reject unsigned requests

LAYER 5: Environment Variables
├── STRIPE_SECRET_KEY (never log/expose)
├── STRIPE_WEBHOOK_SECRET (never commit)
├── Never hardcode secrets in code
└── Use .env.local for development
```

## Environment Variables Architecture

```
┌──────────────────────────────────────────────────────┐
│  Environment Variables                               │
└──────────────────────────────────────────────────────┘

PUBLIC (Safe to expose):
├── NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
│   └── Client-side operations only
│   └── Test: pk_test_*
│   └── Live: pk_live_*
│
└── NEXT_PUBLIC_APP_URL
    └── Base URL for redirects
    └── Dev: http://localhost:3000
    └── Prod: https://yourdomain.com

PRIVATE (Never expose):
├── STRIPE_SECRET_KEY
│   └── Server-side API calls
│   └── Test: sk_test_*
│   └── Live: sk_live_*
│   └── Store in: .env.local (dev), CI/CD secrets (prod)
│
└── STRIPE_WEBHOOK_SECRET
    └── Webhook signature verification
    └── Test: whsec_test_*
    └── Live: whsec_*
    └── Store in: .env.local (dev), CI/CD secrets (prod)
```

## API Endpoint Architecture

```
┌────────────────────────────────────────────────────────┐
│  REST API Endpoints                                   │
└────────────────────────────────────────────────────────┘

POST /api/checkout
├── Purpose: Create Checkout Session
├── Request body:
│   ├── tourId (string, required)
│   ├── amount (number, required, ≥100)
│   ├── tourName (string, required)
│   ├── userEmail (string, optional)
│   └── userId (string, optional)
│
├── Response (200):
│   ├── sessionId (string)
│   └── url (string)
│
└── Error responses:
    ├── 400: Missing/invalid fields
    ├── 400: Invalid amount
    ├── 500: Server error

POST /api/webhooks/stripe
├── Purpose: Receive Stripe events
├── Headers (required):
│   └── stripe-signature (HMAC verification)
│
├── Body: Raw request body (NOT parsed)
├── Events handled:
│   ├── checkout.session.completed
│   ├── checkout.session.expired
│   └── charge.failed
│
├── Response (200): { received: true }
└── Error responses:
    ├── 400: Missing signature header
    ├── 401: Invalid signature
    └── 500: Processing error
```

## Error Handling Flow

```
┌──────────────────────────────────────────────┐
│  Error Handling Strategy                     │
└──────────────────────────────────────────────┘

CHECKOUT API Errors:
1. Validation errors
   └─→ 400 response + user message

2. Stripe API errors
   └─→ 500 response + log for debugging

3. Network errors
   └─→ 500 response + retry recommendation

WEBHOOK ERRORS:
1. Invalid signature
   └─→ 401 + log warning + manual review

2. Event processing error
   └─→ 500 + Stripe retries (up to 3 days)

3. Database errors (future)
   └─→ 500 + alert support team

CLIENT SIDE:
• Validation errors → alert(message)
• Network errors → retry or contact support
• Success → redirect to success page
```

## Testing Architecture

```
┌──────────────────────────────────────────────┐
│  Testing Strategy                            │
└──────────────────────────────────────────────┘

Manual Testing:
├── Use test card: 4242 4242 4242 4242
├── Use test card: 4000 0000 0000 9995 (decline)
├── Use test card: 4000 0025 0000 3155 (3D Secure)
├── Check console logs for events
└── Verify success page displays

Automated Testing (Future):
├── Unit tests for validation
├── Integration tests for API
├── End-to-end tests with Playwright
└── Webhook signature verification tests

Stripe Testing Tools:
├── Stripe Dashboard test events
├── Stripe CLI for local webhooks
└── Test card number reference
```

## Deployment Architecture

```
┌──────────────────────────────────────────────┐
│  Deployment Checklist                        │
└──────────────────────────────────────────────┘

Development:
├── Keys: Test mode (sk_test_, pk_test_)
├── URL: http://localhost:3000
├── Webhooks: Stripe CLI
└── Database: Placeholder (logging only)

Production:
├── Keys: Live mode (sk_live_, pk_live_)
├── URL: https://yourdomain.com
├── Webhooks: Dashboard configured
├── Database: Supabase integration
├── Email: Email service integration
├── Monitoring: Stripe Dashboard + logs
└── Backup: Regular backups
```
