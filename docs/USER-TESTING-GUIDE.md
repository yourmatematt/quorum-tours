# Quorum Tours - User Testing Guide

This document provides test scenarios and SQL scripts for testing the application's email flows, payment processing, and quorum mechanics.

---

## Quick Setup

Run the SQL scripts below in your Supabase SQL Editor (Dashboard → SQL Editor → New query).

**Prerequisites:**
- You have a user account (your test user profile exists in `profiles`)
- You know your user's UUID (find it in `profiles` table or Auth → Users)

---

## Test Scenarios

### Scenario A: Tour 1 Away from Quorum
When you commit to this tour, it will trigger:
- ✉️ Reservation confirmation email
- ✉️ **Quorum reached** email to all participants
- Tour status changes to `payment_pending`

### Scenario B: Tour Multiple Spots from Quorum
When you commit to this tour, it will trigger:
- ✉️ Reservation confirmation email
- Tour remains in `forming` status

### Scenario C: Payment Window Testing
After quorum is reached:
- ✉️ Payment reminder emails (7 days, 1 day before deadline)
- ✉️ Payment successful email
- ✉️ Strike applied email (if payment times out)

---

## SQL Setup Scripts

### Step 1: Create Test Operator

First, create a test operator. Replace `YOUR_USER_UUID` with your actual user ID.

```sql
-- =============================================================================
-- CREATE TEST OPERATOR
-- =============================================================================

-- Find your user UUID first:
-- SELECT id, email, display_name FROM profiles WHERE email = 'your-email@example.com';

INSERT INTO operators (
  id,
  owner_profile_id,
  slug,
  name,
  tagline,
  description,
  base_location,
  established_year,
  languages,
  specialties,
  verification_status,
  stripe_account_id,
  stripe_onboarding_complete,
  created_at
) VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',  -- Fixed UUID for easy reference
  'YOUR_USER_UUID',                          -- Replace with your user UUID
  'test-birding-tours',
  'Test Birding Tours',
  'Premium birding experiences for testing',
  'A test operator for QA purposes. Specializing in wetland and shorebird tours across Victoria.',
  'Melbourne, Victoria',
  2020,
  ARRAY['English'],
  ARRAY['wetlands', 'shorebirds', 'photography'],
  'verified',
  'acct_test_operator',  -- Fake Stripe account
  true,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;
```

### Step 2: Create Test Tours

```sql
-- =============================================================================
-- TOUR A: 1 SPOT AWAY FROM QUORUM (threshold 6, needs 5 fake + you = 6)
-- =============================================================================

INSERT INTO tours (
  id,
  slug,
  title,
  description,
  tour_type,
  tier_required,
  capacity,
  threshold,
  threshold_deadline,
  price_cents,
  deposit_cents,
  date_start,
  date_end,
  booking_deadline,
  status,
  target_species,
  included,
  operator_id,
  created_at
) VALUES (
  'b1b2b3b4-0000-0000-0000-000000000001',
  'test-quorum-trigger',
  '[TEST] Dawn Chorus - Quorum Trigger',
  'This tour is 1 commitment away from reaching quorum. When you join, quorum will be reached and emails will be sent.',
  'relaxed',
  0,
  12,      -- capacity
  6,       -- threshold (quorum)
  (CURRENT_DATE + INTERVAL '14 days')::DATE,
  35000,   -- $350 AUD
  15000,   -- $150 deposit
  NOW() + INTERVAL '30 days',
  NOW() + INTERVAL '30 days' + INTERVAL '4 hours',
  NOW() + INTERVAL '21 days',
  'forming',
  ARRAY['Brolga', 'Latham''s Snipe', 'Blue-billed Duck'],
  ARRAY['Expert guide', 'Morning tea', 'Bird checklist'],
  'a1b2c3d4-0000-0000-0000-000000000001',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = 'forming';

-- =============================================================================
-- TOUR B: 3 SPOTS AWAY FROM QUORUM (threshold 8, needs 5 fake = 3 away)
-- =============================================================================

INSERT INTO tours (
  id,
  slug,
  title,
  description,
  tour_type,
  tier_required,
  capacity,
  threshold,
  threshold_deadline,
  price_cents,
  deposit_cents,
  date_start,
  date_end,
  booking_deadline,
  status,
  target_species,
  included,
  operator_id,
  created_at
) VALUES (
  'b1b2b3b4-0000-0000-0000-000000000002',
  'test-forming-tour',
  '[TEST] Shorebird Migration - Still Forming',
  'This tour needs 3 more commitments to reach quorum. Joining will NOT trigger quorum emails yet.',
  'advanced',
  0,
  15,      -- capacity
  8,       -- threshold (quorum)
  (CURRENT_DATE + INTERVAL '21 days')::DATE,
  45000,   -- $450 AUD
  15000,   -- $150 deposit
  NOW() + INTERVAL '45 days',
  NOW() + INTERVAL '45 days' + INTERVAL '6 hours',
  NOW() + INTERVAL '35 days',
  'forming',
  ARRAY['Eastern Curlew', 'Bar-tailed Godwit', 'Red-necked Stint'],
  ARRAY['Expert guide', 'Lunch included', 'Spotting scope use'],
  'a1b2c3d4-0000-0000-0000-000000000001',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = 'forming';
```

### Step 3: Create Fake Reservations (Simulated Participants)

```sql
-- =============================================================================
-- CREATE FAKE TEST USERS (for simulated reservations)
-- =============================================================================

-- Create fake profiles for test reservations
INSERT INTO profiles (id, email, display_name, created_at)
VALUES
  ('00000000-fake-0001-0000-000000000001', 'fake1@test.quorum', 'Test Birder 1', NOW()),
  ('00000000-fake-0002-0000-000000000002', 'fake2@test.quorum', 'Test Birder 2', NOW()),
  ('00000000-fake-0003-0000-000000000003', 'fake3@test.quorum', 'Test Birder 3', NOW()),
  ('00000000-fake-0004-0000-000000000004', 'fake4@test.quorum', 'Test Birder 4', NOW()),
  ('00000000-fake-0005-0000-000000000005', 'fake5@test.quorum', 'Test Birder 5', NOW())
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- TOUR A RESERVATIONS: 5 fake users (you will be #6 = quorum!)
-- =============================================================================

INSERT INTO reservations (tour_id, user_id, status, created_at)
VALUES
  ('b1b2b3b4-0000-0000-0000-000000000001', '00000000-fake-0001-0000-000000000001', 'reserved', NOW() - INTERVAL '5 days'),
  ('b1b2b3b4-0000-0000-0000-000000000001', '00000000-fake-0002-0000-000000000002', 'reserved', NOW() - INTERVAL '4 days'),
  ('b1b2b3b4-0000-0000-0000-000000000001', '00000000-fake-0003-0000-000000000003', 'reserved', NOW() - INTERVAL '3 days'),
  ('b1b2b3b4-0000-0000-0000-000000000001', '00000000-fake-0004-0000-000000000004', 'reserved', NOW() - INTERVAL '2 days'),
  ('b1b2b3b4-0000-0000-0000-000000000001', '00000000-fake-0005-0000-000000000005', 'reserved', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- TOUR B RESERVATIONS: 5 fake users (you will be #6, still need 2 more)
-- =============================================================================

INSERT INTO reservations (tour_id, user_id, status, created_at)
VALUES
  ('b1b2b3b4-0000-0000-0000-000000000002', '00000000-fake-0001-0000-000000000001', 'reserved', NOW() - INTERVAL '5 days'),
  ('b1b2b3b4-0000-0000-0000-000000000002', '00000000-fake-0002-0000-000000000002', 'reserved', NOW() - INTERVAL '4 days'),
  ('b1b2b3b4-0000-0000-0000-000000000002', '00000000-fake-0003-0000-000000000003', 'reserved', NOW() - INTERVAL '3 days'),
  ('b1b2b3b4-0000-0000-0000-000000000002', '00000000-fake-0004-0000-000000000004', 'reserved', NOW() - INTERVAL '2 days'),
  ('b1b2b3b4-0000-0000-0000-000000000002', '00000000-fake-0005-0000-000000000005', 'reserved', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;
```

---

## Testing Checklist

### Test 1: Commit to Tour B (No Quorum Trigger)

1. Navigate to `/tours/test-forming-tour`
2. Click "Commit to this tour"
3. Complete the join flow
4. **Expected:**
   - ✅ Reservation confirmation email sent to you
   - ✅ Tour remains in `forming` status
   - ✅ Progress shows 6/8 (still 2 away from quorum)

### Test 2: Commit to Tour A (Quorum Trigger)

1. Navigate to `/tours/test-quorum-trigger`
2. Click "Commit to this tour"
3. Complete the join flow
4. **Expected:**
   - ✅ Reservation confirmation email sent to you
   - ✅ **Quorum reached email** sent to all 6 participants
   - ✅ Tour status changes to `payment_pending`
   - ✅ Payment deadline is set

### Test 3: Payment Flow (After Quorum)

1. After Test 2, check your email for payment instructions
2. Complete payment via Stripe
3. **Expected:**
   - ✅ Payment successful email
   - ✅ Reservation status changes to `confirmed`

---

## Verification Queries

### Check Tour Status and Participant Count

```sql
SELECT
  t.id,
  t.title,
  t.status,
  t.threshold,
  COUNT(r.id) FILTER (WHERE r.status IN ('reserved', 'confirmed', 'payment_pending')) as current_participants,
  t.threshold - COUNT(r.id) FILTER (WHERE r.status IN ('reserved', 'confirmed', 'payment_pending')) as spots_to_quorum
FROM tours t
LEFT JOIN reservations r ON t.id = r.tour_id
WHERE t.slug LIKE 'test-%'
GROUP BY t.id, t.title, t.status, t.threshold;
```

### Check Email Log

```sql
SELECT
  email_type,
  recipient_email,
  subject,
  status,
  created_at,
  metadata
FROM email_log
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```

### Check Your Reservations

```sql
SELECT
  r.id,
  t.title,
  r.status,
  r.created_at,
  r.deposit_cents,
  r.deposit_charged
FROM reservations r
JOIN tours t ON r.tour_id = t.id
WHERE r.user_id = 'YOUR_USER_UUID'  -- Replace with your UUID
ORDER BY r.created_at DESC;
```

---

## Reset Test Data

To clean up and start fresh:

```sql
-- Delete test reservations (including yours)
DELETE FROM reservations WHERE tour_id IN (
  'b1b2b3b4-0000-0000-0000-000000000001',
  'b1b2b3b4-0000-0000-0000-000000000002'
);

-- Reset tour status back to forming
UPDATE tours SET status = 'forming', payment_window_end = NULL
WHERE id IN (
  'b1b2b3b4-0000-0000-0000-000000000001',
  'b1b2b3b4-0000-0000-0000-000000000002'
);

-- Re-insert fake reservations (run Step 3 again)
```

---

## Cleanup (Remove All Test Data)

When testing is complete:

```sql
-- Remove all test data
DELETE FROM reservations WHERE tour_id IN (
  SELECT id FROM tours WHERE slug LIKE 'test-%'
);

DELETE FROM tours WHERE slug LIKE 'test-%';

DELETE FROM operators WHERE slug = 'test-birding-tours';

DELETE FROM profiles WHERE email LIKE '%@test.quorum';

DELETE FROM email_log WHERE email_type = 'health_check_test';
```

---

## Troubleshooting

### Emails Not Sending?

1. Check Resend API key in Supabase Edge Function secrets
2. Check `email_log` table for errors
3. Verify Edge Function is deployed: `supabase functions list`

### Quorum Not Triggering?

1. Verify reservation count with verification query above
2. Check that reservations have status `reserved` (not `interest` or `cancelled`)
3. Ensure the join flow calls the `process-quorum` edge function

### Payment Issues?

1. Check Stripe webhook is configured and receiving events
2. Verify `STRIPE_WEBHOOK_SECRET` matches the endpoint in Stripe dashboard
3. Check Health Dashboard for Stripe connectivity

---

## Test User Credentials

| Role | Email | Notes |
|------|-------|-------|
| Your test account | (your email) | Main testing account |
| Fake Birder 1-5 | fake1-5@test.quorum | Simulated participants |

---

*Last updated: 2026-01-28*
