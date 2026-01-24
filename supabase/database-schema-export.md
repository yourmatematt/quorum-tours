# Quorum Tours (Mallacoota Birding) - Complete Database Schema Export

**Generated:** 2026-01-21
**Last Updated:** 2026-01-24
**Schema Version:** 2.10.0
**Database:** PostgreSQL (Supabase)

### Changelog

**v2.10.0 (2026-01-24)**
- Added `tour_status` enum type definition (values: forming, payment_pending, confirmed, cancelled, completed)
- Added `reservation_status` enum type definition (values: interest, reserved, payment_pending, confirmed, cancelled, abandoned, waitlisted, refunded)
- Fixed tours.status to use enum type instead of TEXT with CHECK
- Fixed reservations.status to use enum type instead of TEXT with CHECK
- Updated function references from 'proposed' to 'forming'
- Added `current_participant_count` column to tours (via migration)
- Added `payment_events` table (via migration)
- Added operator Stripe Connect status fields (via migration)
- Added RLS policies for operator access to tours/reservations (via migration)

---

## Table of Contents

1. [Custom Types & Enums](#custom-types--enums)
2. [Tables](#tables)
3. [Foreign Key Relationships](#foreign-key-relationships)
4. [Row Level Security (RLS) Policies](#row-level-security-rls-policies)
5. [Database Functions](#database-functions)
6. [Triggers](#triggers)
7. [Views](#views)
8. [Indexes](#indexes)
9. [Extensions](#extensions)

---

## Custom Types & Enums

### operator_member_role
```sql
CREATE TYPE operator_member_role AS ENUM ('owner', 'admin', 'guide');
```

### credential_type
```sql
CREATE TYPE credential_type AS ENUM (
  'guide_license',
  'maritime_license',
  'park_permit',
  'insurance',
  'first_aid',
  'eco_certification'
);
```

### media_type
```sql
CREATE TYPE media_type AS ENUM ('photo', 'video');
```

### admin_action_type
```sql
CREATE TYPE admin_action_type AS ENUM (
  'credential_approved',
  'credential_rejected',
  'review_approved',
  'review_hidden',
  'refund_processed',
  'tour_cancelled',
  'operator_approved',
  'operator_rejected',
  'operator_suspended',
  'user_tier_changed',
  'booking_modified',
  'alert_dismissed',
  'operator_reinstated',
  'operator_info_requested',
  'tour_extended',
  'tour_force_confirmed',
  'user_flagged',
  'user_unflagged',
  'review_restored'
);
```

### admin_target_type
```sql
CREATE TYPE admin_target_type AS ENUM (
  'operator',
  'tour',
  'booking',
  'review',
  'credential',
  'user',
  'message',
  'alert'
);
```

### alert_type
```sql
CREATE TYPE alert_type AS ENUM (
  'threshold_risk',
  'response_overdue',
  'credential_expiring',
  'review_flagged',
  'dispute_opened',
  'low_rating',
  'operator_pending',
  'credential_expired',
  'operator_auto_suspended',
  'api_cost_warning',
  'api_cost_critical',
  'stripe_disconnected'
);
```

### alert_severity
```sql
CREATE TYPE alert_severity AS ENUM ('info', 'warning', 'urgent');
```

### operator_approval_status
```sql
CREATE TYPE operator_approval_status AS ENUM (
  'pending',
  'reviewing',
  'approved',
  'rejected',
  'suspended'
);
```

### tour_status
```sql
CREATE TYPE tour_status AS ENUM (
  'forming',        -- Collecting commitments, threshold not yet met
  'payment_pending', -- Threshold met, payment window open
  'confirmed',      -- Payments captured, tour will run
  'cancelled',      -- Tour cancelled (threshold not met or operator cancelled)
  'completed'       -- Tour has run
);
```

### reservation_status
```sql
CREATE TYPE reservation_status AS ENUM (
  'interest',       -- User expressed interest, no payment auth yet
  'reserved',       -- Payment authorized, commitment made
  'payment_pending', -- Threshold met, awaiting payment capture
  'confirmed',      -- Payment captured, booking confirmed
  'cancelled',      -- User cancelled before threshold
  'abandoned',      -- User didn't complete payment in window
  'waitlisted',     -- Tour at capacity, user on waitlist
  'refunded'        -- Refund processed
);
```

---

## Tables

### 1. profiles
Extends Supabase auth.users with platform-specific user data.

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,

  -- Identity & Bio
  bio TEXT,
  location TEXT,
  profile_photo_url TEXT,

  -- Tier & Trust System
  tier INTEGER NOT NULL DEFAULT 0 CHECK (tier >= 0 AND tier <= 2),
  trust_score INTEGER NOT NULL DEFAULT 0 CHECK (trust_score >= -100 AND trust_score <= 1000),

  -- eBird Integration
  ebird_username TEXT,
  ebird_verified BOOLEAN DEFAULT FALSE,
  ebird_life_list_count INTEGER CHECK (ebird_life_list_count >= 0),
  ebird_last_sync TIMESTAMPTZ,
  life_list_range TEXT CHECK (life_list_range IN ('<100', '100-300', '300-500', '500+')),
  local_experience BOOLEAN DEFAULT FALSE,

  -- Birding Profile
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'experienced', 'expert')),
  primary_focus TEXT CHECK (primary_focus IN ('birding', 'photography', 'nature', 'mixed')),
  pace_preference TEXT CHECK (pace_preference IN ('leisurely', 'moderate', 'fast')),
  years_birding INTEGER CHECK (years_birding >= 0),
  gear_summary TEXT,

  -- Platform Progress
  fieldcraft_quiz_passed BOOLEAN DEFAULT FALSE,
  fieldcraft_quiz_passed_at TIMESTAMPTZ,
  tours_completed INTEGER NOT NULL DEFAULT 0,
  referrals_count INTEGER NOT NULL DEFAULT 0 CHECK (referrals_count >= 0),

  -- Privacy Settings
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  show_life_list BOOLEAN NOT NULL DEFAULT FALSE,
  show_tour_history BOOLEAN NOT NULL DEFAULT FALSE,

  -- Strike System (hidden from users)
  strike_count DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK (strike_count >= 0 AND strike_count <= 5),
  is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
  probation_successful_bookings INTEGER NOT NULL DEFAULT 0,
  flagged_at TIMESTAMPTZ,
  flagged_by UUID REFERENCES profiles(id),
  flag_reason TEXT,

  -- Admin & Operator
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  operator_slug TEXT UNIQUE,
  linked_operator_id UUID REFERENCES operators(id) ON DELETE SET NULL,

  -- Email Preferences
  email_preferences JSONB DEFAULT '{
    "marketing": true,
    "tour_updates": true,
    "booking_confirmations": true,
    "review_requests": true,
    "threshold_alerts": true
  }'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT profiles_bio_length CHECK (char_length(bio) <= 500)
);
```

**Comments:**
- `tier`: 0=Explorer, 1=Field Naturalist, 2=Trusted Contributor
- `trust_score`: +10 per tour, +20 quiz, +15 eBird (500+), +5 referral, -30 strike
- `operator_slug`: URL-friendly slug for operator portal access
- `linked_operator_id`: Links user profile to their operator business

---

### 2. profile_private
Admin-only sensitive user data.

```sql
CREATE TABLE public.profile_private (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  phone TEXT,
  emergency_contact JSONB, -- {name, phone, relationship}
  dietary_requirements TEXT,
  medical_notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 3. guides
Legacy guide profiles (superseded by operators system).

```sql
CREATE TABLE public.guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  bio TEXT,
  ebird_username TEXT,
  years_experience INTEGER NOT NULL DEFAULT 0,
  species_count INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 4. operators
Business entities that offer tours (multi-user capable).

```sql
CREATE TABLE public.operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Owner relationship
  owner_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Identity
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  hero_image_url TEXT,
  base_location TEXT,

  -- Experience
  established_year INTEGER,
  languages TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}',
  equipment_summary TEXT,

  -- Vessel info (for boat operators)
  vessel_name TEXT,
  vessel_type TEXT,
  vessel_capacity INTEGER,
  vessel_features TEXT[] DEFAULT '{}',

  -- Platform stats (denormalized, trigger-maintained)
  rating_avg DECIMAL(2,1) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  tours_completed INTEGER DEFAULT 0,
  guests_served INTEGER DEFAULT 0,
  response_time_hours INTEGER,

  -- Status & Approval
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  approval_status operator_approval_status DEFAULT 'approved',
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  admin_notes TEXT,

  -- Stripe Connect
  stripe_account_id TEXT,
  stripe_onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_charges_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_payouts_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_requirements_due JSONB NOT NULL DEFAULT '[]'::jsonb,
  stripe_connected_at TIMESTAMPTZ,

  -- Email Preferences
  email_preferences JSONB DEFAULT '{
    "booking_notifications": true,
    "message_notifications": true,
    "review_notifications": true,
    "credential_reminders": true,
    "platform_updates": true
  }'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- `rating_avg`: Denormalized, maintained by trigger on reviews
- `tours_completed`: Denormalized, maintained by trigger on reservations
- `stripe_account_id`: Stripe Connect account ID (acct_xxx)

---

### 5. operator_members
Junction table linking user profiles to operators with role-based access.

```sql
CREATE TABLE public.operator_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role operator_member_role NOT NULL DEFAULT 'guide',
  title TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(operator_id, profile_id)
);
```

---

### 6. operator_credentials
Verifiable documents like licenses, permits, and certifications.

```sql
CREATE TABLE public.operator_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
  type credential_type NOT NULL,
  document_url TEXT,
  identifier TEXT,
  expiration_date DATE,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  is_critical BOOLEAN DEFAULT FALSE,
  rejection_reason TEXT,
  rejected_at TIMESTAMPTZ,
  rejected_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- Documents are private, but verification status is public
- Critical credentials (insurance, guide_license, maritime_license) trigger auto-suspension on expiry

---

### 7. operator_media
Photo and video gallery for operator profiles.

```sql
CREATE TABLE public.operator_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
  type media_type NOT NULL DEFAULT 'photo',
  url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- Hero images are environmental portraits showing guides in the field
- Only one hero image per operator (enforced by unique index)

---

### 8. regions
Service areas for operators.

```sql
CREATE TABLE public.regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('state', 'park', 'region', 'country')),
  parent_id UUID REFERENCES regions(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 9. operator_regions
Many-to-many relationship between operators and service regions.

```sql
CREATE TABLE public.operator_regions (
  operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  PRIMARY KEY (operator_id, region_id)
);
```

---

### 10. species
Australian bird species taxonomy (source: AviList, CC BY 4.0).

```sql
CREATE TABLE public.species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  family TEXT,
  "order" TEXT,
  region TEXT DEFAULT 'AU',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- IDs are stable concept identifiers that persist through name changes
- ~900 Australian species seeded

---

### 11. tours
Tour listings with social booking mechanics.

```sql
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,

  -- Classification
  tour_type TEXT NOT NULL CHECK (tour_type IN ('relaxed', 'advanced', 'photography', 'private')),
  tier_required INTEGER NOT NULL DEFAULT 0 CHECK (tier_required >= 0 AND tier_required <= 2),

  -- Capacity & Threshold
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  threshold INTEGER NOT NULL CHECK (threshold > 0),
  threshold_deadline DATE,

  -- Pricing (in cents AUD)
  price_cents INTEGER NOT NULL CHECK (price_cents > 0),
  deposit_cents INTEGER NOT NULL DEFAULT 15000,

  -- Dates
  date_start TIMESTAMPTZ NOT NULL,
  date_end TIMESTAMPTZ NOT NULL,
  booking_deadline TIMESTAMPTZ NOT NULL,
  payment_window_end TIMESTAMPTZ,

  -- Status (uses tour_status enum)
  status tour_status NOT NULL DEFAULT 'forming',
  -- Valid values: 'forming', 'payment_pending', 'confirmed', 'cancelled', 'completed'
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,

  -- Content
  target_species TEXT[] DEFAULT '{}',
  included TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT NULL,
  image_url TEXT,

  -- Relations
  guide_id UUID REFERENCES guides(id) ON DELETE SET NULL,
  operator_id UUID REFERENCES operators(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- `itinerary`: Array of daily items: [{day: number, title: string, description: string, highlights?: string[]}]

---

### 12. tour_species
Links tours to the species they target.

```sql
CREATE TABLE public.tour_species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  species_id UUID NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_tour_species UNIQUE (tour_id, species_id)
);
```

**Comments:**
- Used for chase list matching and notifications

---

### 13. reservations
Booking records with deposit/strike system.

```sql
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Status tracking (uses reservation_status enum)
  status reservation_status NOT NULL DEFAULT 'interest',
  -- Valid values: 'interest', 'reserved', 'payment_pending', 'confirmed',
  --               'cancelled', 'abandoned', 'waitlisted', 'refunded'

  -- Payment tracking
  stripe_payment_intent_id TEXT,
  deposit_cents INTEGER NOT NULL DEFAULT 0,
  deposit_charged BOOLEAN NOT NULL DEFAULT FALSE,
  deposit_charged_at TIMESTAMPTZ,
  deposit_refunded_at TIMESTAMPTZ,
  deposit_forfeited_at TIMESTAMPTZ,
  stripe_deposit_charge_id TEXT,
  stripe_balance_charge_id TEXT,
  balance_cents INTEGER,
  balance_paid_at TIMESTAMPTZ,
  payment_due_at TIMESTAMPTZ,

  -- Refund tracking
  refund_requested BOOLEAN DEFAULT FALSE,
  refund_requested_at TIMESTAMPTZ,
  refund_reason TEXT,
  refunded_at TIMESTAMPTZ,
  refund_amount_cents INTEGER,

  -- Booking details
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count > 0),
  special_requirements TEXT,
  waitlist_position INTEGER,
  referral_code TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(tour_id, user_id)
);
```

---

### 14. user_chase_list
Species each user wants to see.

```sql
CREATE TABLE public.user_chase_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  species_id UUID NOT NULL REFERENCES species(id) ON DELETE CASCADE,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('normal', 'high')),
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_species UNIQUE (user_id, species_id)
);
```

**Comments:**
- Used for tour matching and notifications

---

### 15. notification_preferences
User preferences for chase list and tour notifications.

```sql
CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  chase_list_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  email_frequency TEXT NOT NULL DEFAULT 'instant' CHECK (email_frequency IN ('instant', 'daily_digest', 'off')),
  quiet_hours_start TIME NOT NULL DEFAULT '22:00',
  quiet_hours_end TIME NOT NULL DEFAULT '06:00',
  timezone TEXT NOT NULL DEFAULT 'Australia/Melbourne',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 16. notification_log
Log of all notifications sent.

```sql
CREATE TABLE public.notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('chase_list_match', 'tour_confirmed', 'tour_almost_full')),
  matched_species_ids UUID[] DEFAULT '{}',
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email_sent BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT unique_user_tour_notification UNIQUE (user_id, tour_id, notification_type)
);
```

**Comments:**
- Prevents duplicate notifications for same tour

---

### 17. reviews
Verified purchase reviews tied to completed bookings.

```sql
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,

  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  species_count_mentioned INTEGER,

  -- Operator response
  response_text TEXT,
  response_date TIMESTAMPTZ,

  -- Moderation
  flagged_at TIMESTAMPTZ,
  flag_reason TEXT,
  moderated_at TIMESTAMPTZ,
  moderated_by UUID REFERENCES profiles(id),
  is_hidden BOOLEAN DEFAULT FALSE,
  hide_reason TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(booking_id)
);
```

**Comments:**
- One review per booking enforced by unique constraint

---

### 18. messages
Platform-mediated messaging between users and operators.

```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  flagged_at TIMESTAMPTZ,
  flag_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- No public email/phone exposure, protects operators from spam

---

### 19. badges
Achievement badges users can earn.

```sql
CREATE TABLE public.badges (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  criteria JSONB, -- {"tours_required": 3, "quiz_required": true}
  tier_required INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 20. user_badges
Junction table linking users to their earned badges.

```sql
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id INTEGER NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, badge_id)
);
```

---

### 21. guide_ratings
Legacy guide rating system (superseded by reviews).

```sql
CREATE TABLE public.guide_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  etiquette_score INTEGER NOT NULL CHECK (etiquette_score >= 1 AND etiquette_score <= 5),
  punctuality BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(tour_id, user_id)
);
```

---

### 22. fieldcraft_results
Quiz results for tier progression.

```sql
CREATE TABLE public.fieldcraft_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  passed BOOLEAN NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 23. strike_history
Immutable record of user strikes.

```sql
CREATE TABLE public.strike_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  strike_amount DECIMAL(2,1) NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('payment_failed', 'user_cancelled', 'no_show')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Comments:**
- payment_failed: 1.0 strike
- user_cancelled: 0.5 strike
- no_show: 1.0 strike

---

### 24. email_log
Email delivery tracking.

```sql
CREATE TABLE public.email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  email_type TEXT NOT NULL CHECK (email_type IN (
    'reservation_confirmed',
    'threshold_met',
    'payment_reminder',
    'payment_successful',
    'spot_forfeited',
    'waitlist_notification',
    'tour_cancelled'
  )),
  recipient TEXT,
  recipient_email TEXT NOT NULL,
  template TEXT,
  subject TEXT DEFAULT '',
  resend_message_id TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  error TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 25. referrals
User referral tracking.

```sql
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(referred_id)
);
```

---

### 26. waitlist
Tour waitlist management.

```sql
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  notified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  converted_to_reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(tour_id, user_id)
);
```

---

### 27. admin_audit_log
Immutable record of all admin actions.

```sql
CREATE TABLE public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id), -- Nullable for system actions
  action_type admin_action_type NOT NULL,
  target_type admin_target_type NOT NULL,
  target_id UUID NOT NULL,
  details JSONB DEFAULT '{}',
  notes TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Comments:**
- admin_id NULL indicates automated system action

---

### 28. alerts
Exception-based notification system for admins.

```sql
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type alert_type NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  description TEXT,
  target_type admin_target_type,
  target_id UUID,
  action_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  dismissed_at TIMESTAMPTZ,
  dismissed_by UUID REFERENCES profiles(id)
);
```

---

### 29. platform_metrics
Daily aggregated platform metrics.

```sql
CREATE TABLE public.platform_metrics (
  date DATE PRIMARY KEY,

  -- Financial metrics
  escrowed_value_cents BIGINT DEFAULT 0,
  committed_value_cents BIGINT DEFAULT 0,
  platform_revenue_cents BIGINT DEFAULT 0,
  gmv_cents BIGINT DEFAULT 0,

  -- Tour metrics
  tours_listed INTEGER DEFAULT 0,
  tours_confirmed INTEGER DEFAULT 0,
  tours_cancelled INTEGER DEFAULT 0,
  tours_completed INTEGER DEFAULT 0,
  active_tours INTEGER DEFAULT 0,

  -- User metrics
  total_users INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  new_operators INTEGER DEFAULT 0,

  -- Booking metrics
  bookings_created INTEGER DEFAULT 0,
  bookings_cancelled INTEGER DEFAULT 0,

  -- Performance metrics
  avg_response_time_hours DECIMAL(5,2),
  threshold_success_rate DECIMAL(5,2),

  -- Metadata
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 30. api_usage_log
Tracks all Anthropic API calls for cost monitoring.

```sql
CREATE TABLE public.api_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  endpoint TEXT NOT NULL,
  action TEXT NOT NULL,
  model TEXT NOT NULL,
  operator_id UUID REFERENCES operators(id) ON DELETE SET NULL,
  tokens_in INTEGER NOT NULL,
  tokens_out INTEGER NOT NULL,
  cost_cents DECIMAL(10,4) NOT NULL,
  duration_ms INTEGER,
  success BOOLEAN DEFAULT TRUE,
  error TEXT
);
```

**Comments:**
- `endpoint`: API route that made the call (e.g., /api/admin/chat)
- `action`: Type of action (parse, edit, description)
- `model`: Model used (claude-haiku-3-5-20241022, claude-sonnet-4-20250514)
- `cost_cents`: Calculated cost in cents with 4 decimal precision

---

### 31. platform_settings
Platform-wide configuration settings.

```sql
CREATE TABLE public.platform_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);
```

---

## Foreign Key Relationships

### profiles
- `id` → `auth.users(id)` ON DELETE CASCADE
- `flagged_by` → `profiles(id)`
- `linked_operator_id` → `operators(id)` ON DELETE SET NULL

### profile_private
- `user_id` → `profiles(id)` ON DELETE CASCADE

### guides
- `user_id` → `profiles(id)` ON DELETE SET NULL

### operators
- `owner_profile_id` → `profiles(id)` ON DELETE CASCADE
- `approved_by` → `profiles(id)`

### operator_members
- `operator_id` → `operators(id)` ON DELETE CASCADE
- `profile_id` → `profiles(id)` ON DELETE CASCADE

### operator_credentials
- `operator_id` → `operators(id)` ON DELETE CASCADE
- `verified_by` → `profiles(id)`
- `rejected_by` → `profiles(id)`

### operator_media
- `operator_id` → `operators(id)` ON DELETE CASCADE

### regions
- `parent_id` → `regions(id)`

### operator_regions
- `operator_id` → `operators(id)` ON DELETE CASCADE
- `region_id` → `regions(id)` ON DELETE CASCADE

### tours
- `guide_id` → `guides(id)` ON DELETE SET NULL
- `operator_id` → `operators(id)` ON DELETE SET NULL

### tour_species
- `tour_id` → `tours(id)` ON DELETE CASCADE
- `species_id` → `species(id)` ON DELETE CASCADE

### reservations
- `tour_id` → `tours(id)` ON DELETE CASCADE
- `user_id` → `profiles(id)` ON DELETE CASCADE

### user_chase_list
- `user_id` → `auth.users(id)` ON DELETE CASCADE
- `species_id` → `species(id)` ON DELETE CASCADE

### notification_preferences
- `user_id` → `auth.users(id)` ON DELETE CASCADE

### notification_log
- `user_id` → `auth.users(id)` ON DELETE CASCADE
- `tour_id` → `tours(id)` ON DELETE CASCADE

### reviews
- `operator_id` → `operators(id)` ON DELETE CASCADE
- `tour_id` → `tours(id)` ON DELETE CASCADE
- `user_id` → `profiles(id)` ON DELETE CASCADE
- `booking_id` → `reservations(id)` ON DELETE CASCADE
- `moderated_by` → `profiles(id)`

### messages
- `sender_id` → `profiles(id)` ON DELETE CASCADE
- `recipient_operator_id` → `operators(id)` ON DELETE CASCADE
- `tour_id` → `tours(id)` ON DELETE SET NULL

### user_badges
- `user_id` → `profiles(id)` ON DELETE CASCADE
- `badge_id` → `badges(id)` ON DELETE CASCADE

### guide_ratings
- `tour_id` → `tours(id)` ON DELETE CASCADE
- `user_id` → `profiles(id)` ON DELETE CASCADE
- `guide_id` → `guides(id)` ON DELETE CASCADE

### fieldcraft_results
- `user_id` → `profiles(id)` ON DELETE CASCADE

### strike_history
- `user_id` → `profiles(id)` ON DELETE CASCADE
- `reservation_id` → `reservations(id)` ON DELETE SET NULL

### email_log
- `user_id` → `profiles(id)` ON DELETE SET NULL
- `reservation_id` → `reservations(id)` ON DELETE SET NULL
- `tour_id` → `tours(id)` ON DELETE SET NULL

### referrals
- `referrer_id` → `profiles(id)` ON DELETE CASCADE
- `referred_id` → `profiles(id)` ON DELETE CASCADE
- `tour_id` → `tours(id)` ON DELETE SET NULL
- `reservation_id` → `reservations(id)` ON DELETE SET NULL

### waitlist
- `tour_id` → `tours(id)` ON DELETE CASCADE
- `user_id` → `profiles(id)` ON DELETE CASCADE
- `converted_to_reservation_id` → `reservations(id)` ON DELETE SET NULL

### admin_audit_log
- `admin_id` → `profiles(id)` (nullable)

### alerts
- `dismissed_by` → `profiles(id)`

### api_usage_log
- `operator_id` → `operators(id)` ON DELETE SET NULL

### platform_settings
- `updated_by` → `profiles(id)`

---

## Row Level Security (RLS) Policies

### profiles

**SELECT Policies:**
```sql
-- Profile visibility based on privacy settings
CREATE POLICY "Profile visibility based on privacy"
  ON profiles FOR SELECT
  USING (
    -- Always see own profile
    auth.uid() = id
    -- Admins see all
    OR is_admin()
    -- Public profiles visible to everyone
    OR is_public = TRUE
    -- Tour participants can see each other
    OR EXISTS (
      SELECT 1 FROM reservations r1
      JOIN reservations r2 ON r1.tour_id = r2.tour_id
      WHERE r1.user_id = profiles.id
      AND r2.user_id = auth.uid()
      AND r1.status NOT IN ('cancelled', 'refunded', 'abandoned')
      AND r2.status NOT IN ('cancelled', 'refunded', 'abandoned')
    )
  );
```

**UPDATE Policies:**
```sql
-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (is_admin() OR auth.uid() = id);
```

### profile_private

**SELECT Policies:**
```sql
-- Admins can view all profile_private
CREATE POLICY "Admins can view all profile_private"
  ON profile_private FOR SELECT
  USING (is_admin());
```

**INSERT/UPDATE Policies:**
```sql
-- Admins and own user can insert profile_private
CREATE POLICY "Admins can insert profile_private"
  ON profile_private FOR INSERT
  WITH CHECK (is_admin() OR auth.uid() = user_id);

-- Admins and own user can update profile_private
CREATE POLICY "Admins can update profile_private"
  ON profile_private FOR UPDATE
  USING (is_admin() OR auth.uid() = user_id);
```

### guides

**SELECT Policies:**
```sql
-- Guides are publicly readable
CREATE POLICY "Guides are publicly readable"
  ON guides FOR SELECT
  TO authenticated, anon
  USING (true);
```

### species

**SELECT Policies:**
```sql
-- Species are publicly readable
CREATE POLICY "Species are publicly readable"
  ON species FOR SELECT
  USING (TRUE);
```

**ALL Policies:**
```sql
-- Only admins can modify species
CREATE POLICY "Only admins can modify species"
  ON species FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );
```

### operators

**SELECT Policies:**
```sql
-- Public can view active operators
CREATE POLICY "Public can view active operators"
  ON operators FOR SELECT
  USING (is_active = TRUE);
```

**UPDATE Policies:**
```sql
-- Operator admins can update their operator
CREATE POLICY "Operator admins can update"
  ON operators FOR UPDATE
  USING (is_operator_admin(id))
  WITH CHECK (is_operator_admin(id));
```

**ALL Policies:**
```sql
-- Platform admins full access operators
CREATE POLICY "Platform admins full access operators"
  ON operators FOR ALL
  USING (is_admin());
```

### operator_members

**SELECT Policies:**
```sql
-- Members can view their own operator's team
CREATE POLICY "Members can view team"
  ON operator_members FOR SELECT
  USING (is_operator_member(operator_id) OR is_admin());
```

**ALL Policies:**
```sql
-- Operator admins can manage members
CREATE POLICY "Operator admins can manage members"
  ON operator_members FOR ALL
  USING (is_operator_admin(operator_id) OR is_admin());
```

### operator_credentials

**SELECT Policies:**
```sql
-- Only operator admins and platform admins can view credentials
CREATE POLICY "Operator admins can view credentials"
  ON operator_credentials FOR SELECT
  USING (is_operator_admin(operator_id) OR is_admin());
```

**INSERT/UPDATE Policies:**
```sql
-- Operator admins can manage their credentials
CREATE POLICY "Operator admins can manage credentials"
  ON operator_credentials FOR INSERT
  WITH CHECK (is_operator_admin(operator_id) OR is_admin());

CREATE POLICY "Operator admins can update credentials"
  ON operator_credentials FOR UPDATE
  USING (is_operator_admin(operator_id) OR is_admin());
```

### operator_media

**SELECT Policies:**
```sql
-- Public can view operator media
CREATE POLICY "Public can view operator media"
  ON operator_media FOR SELECT
  USING (TRUE);
```

**ALL Policies:**
```sql
-- Operator members can manage their media
CREATE POLICY "Operator members can manage media"
  ON operator_media FOR ALL
  USING (is_operator_member(operator_id) OR is_admin());
```

### regions

**SELECT Policies:**
```sql
-- Public can view regions
CREATE POLICY "Public can view regions"
  ON regions FOR SELECT
  USING (TRUE);
```

**ALL Policies:**
```sql
-- Only admins can manage regions
CREATE POLICY "Admins manage regions"
  ON regions FOR ALL
  USING (is_admin());
```

### operator_regions

**SELECT Policies:**
```sql
-- Public can view operator regions
CREATE POLICY "Public can view operator regions"
  ON operator_regions FOR SELECT
  USING (TRUE);
```

**ALL Policies:**
```sql
-- Operator admins can manage their regions
CREATE POLICY "Operator admins manage regions"
  ON operator_regions FOR ALL
  USING (is_operator_admin(operator_id) OR is_admin());
```

### tours

**SELECT Policies:**
```sql
-- Tours are publicly readable
CREATE POLICY "Tours are publicly readable"
  ON tours FOR SELECT
  TO authenticated, anon
  USING (true);
```

**INSERT/UPDATE/DELETE Policies:**
```sql
-- Admins can insert tours
CREATE POLICY "Admins can insert tours"
  ON tours FOR INSERT
  WITH CHECK (is_admin());

-- Admins can update tours
CREATE POLICY "Admins can update tours"
  ON tours FOR UPDATE
  USING (is_admin());

-- Admins can delete tours
CREATE POLICY "Admins can delete tours"
  ON tours FOR DELETE
  USING (is_admin());
```

### tour_species

**SELECT Policies:**
```sql
-- Anyone can view tour species
CREATE POLICY "Anyone can view tour species"
  ON tour_species FOR SELECT
  USING (TRUE);
```

**ALL Policies:**
```sql
-- Tour owners can manage tour species
CREATE POLICY "Tour owners can manage tour species"
  ON tour_species FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM tours t
      JOIN operators o ON t.operator_id = o.id
      JOIN profiles p ON o.id = p.linked_operator_id
      WHERE t.id = tour_species.tour_id
      AND p.id = auth.uid()
    )
  );
```

### reservations

**SELECT Policies:**
```sql
-- Users can view own reservations
CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT
  USING (is_admin() OR auth.uid() = user_id);
```

**INSERT/UPDATE Policies:**
```sql
-- Users can create own reservations
CREATE POLICY "Users can create own reservations"
  ON reservations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users and admins can update reservations
CREATE POLICY "Users can update own reservations"
  ON reservations FOR UPDATE
  USING (is_admin() OR auth.uid() = user_id);
```

### user_chase_list

**SELECT Policies:**
```sql
-- Users can view their own chase list
CREATE POLICY "Users can view their own chase list"
  ON user_chase_list FOR SELECT
  USING (auth.uid() = user_id);
```

**INSERT/DELETE Policies:**
```sql
-- Users can add to their own chase list
CREATE POLICY "Users can add to their own chase list"
  ON user_chase_list FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can remove from their own chase list
CREATE POLICY "Users can remove from their own chase list"
  ON user_chase_list FOR DELETE
  USING (auth.uid() = user_id);
```

### notification_preferences

**SELECT/UPDATE/INSERT Policies:**
```sql
-- Users can view their own preferences
CREATE POLICY "Users can view their own preferences"
  ON notification_preferences FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update their own preferences"
  ON notification_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can insert their own preferences
CREATE POLICY "Users can insert their own preferences"
  ON notification_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### notification_log

**SELECT Policies:**
```sql
-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications"
  ON notification_log FOR SELECT
  USING (auth.uid() = user_id);
```

### reviews

**SELECT Policies:**
```sql
-- Public can view all reviews
CREATE POLICY "Public can view reviews"
  ON reviews FOR SELECT
  USING (TRUE);
```

**INSERT Policies:**
```sql
-- Users can review completed bookings
CREATE POLICY "Users can review completed bookings"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM reservations r
      WHERE r.id = booking_id
        AND r.user_id = auth.uid()
        AND r.status = 'completed'
    )
  );
```

**UPDATE Policies:**
```sql
-- Users can update own review
CREATE POLICY "Users can update own review"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Operators can respond to reviews
CREATE POLICY "Operators can respond to reviews"
  ON reviews FOR UPDATE
  USING (is_operator_admin(operator_id));
```

**DELETE Policies:**
```sql
-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  USING (is_admin());
```

### messages

**SELECT Policies:**
```sql
-- Senders can view their sent messages
CREATE POLICY "Senders can view sent messages"
  ON messages FOR SELECT
  USING (sender_id = auth.uid());

-- Operator members can view messages to their operator
CREATE POLICY "Operators can view received messages"
  ON messages FOR SELECT
  USING (is_operator_member(recipient_operator_id));
```

**INSERT Policies:**
```sql
-- Authenticated users can send messages
CREATE POLICY "Authenticated users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND sender_id = auth.uid()
  );
```

**UPDATE Policies:**
```sql
-- Operator members can mark messages as read
CREATE POLICY "Operators can mark messages read"
  ON messages FOR UPDATE
  USING (is_operator_member(recipient_operator_id));
```

**ALL Policies:**
```sql
-- Admins full access to messages
CREATE POLICY "Admins full access messages"
  ON messages FOR ALL
  USING (is_admin());
```

### badges

**SELECT Policies:**
```sql
-- Badges are publicly readable
CREATE POLICY "Badges are publicly readable"
  ON badges FOR SELECT
  TO authenticated, anon
  USING (true);
```

### user_badges

**SELECT Policies:**
```sql
-- User badges are readable by authenticated users
CREATE POLICY "User badges are readable by authenticated users"
  ON user_badges FOR SELECT
  TO authenticated
  USING (true);
```

### guide_ratings

**SELECT Policies:**
```sql
-- Users can view own ratings
CREATE POLICY "Users can view own ratings"
  ON guide_ratings FOR SELECT
  USING (auth.uid() = user_id);
```

**INSERT Policies:**
```sql
-- Users can create own ratings
CREATE POLICY "Users can create own ratings"
  ON guide_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### fieldcraft_results

**SELECT Policies:**
```sql
-- Users can view own quiz results
CREATE POLICY "Users can view own quiz results"
  ON fieldcraft_results FOR SELECT
  USING (auth.uid() = user_id);
```

**INSERT Policies:**
```sql
-- Users can submit quiz results
CREATE POLICY "Users can submit quiz results"
  ON fieldcraft_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### strike_history

**SELECT Policies:**
```sql
-- Users can view own strike history
CREATE POLICY "Users can view own strike history"
  ON strike_history FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all strike history
CREATE POLICY "Admins can view all strike history"
  ON strike_history FOR SELECT
  USING (is_admin());
```

### email_log

**SELECT Policies:**
```sql
-- Users can view own email log
CREATE POLICY "Users can view own email log"
  ON email_log FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all email logs
CREATE POLICY "Admins can view all email logs"
  ON email_log FOR SELECT
  USING (is_admin());
```

**INSERT Policies:**
```sql
-- Admins and authenticated users can insert email logs
CREATE POLICY "Admins can insert email logs"
  ON email_log FOR INSERT
  WITH CHECK (is_admin() OR auth.uid() IS NOT NULL);

-- System can insert email log
CREATE POLICY "System can insert email log"
  ON email_log FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

### referrals

**SELECT Policies:**
```sql
-- Users can view own referrals
CREATE POLICY "Users can view own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);
```

### waitlist

**SELECT Policies:**
```sql
-- Users can view own waitlist entries
CREATE POLICY "Users can view own waitlist entries"
  ON waitlist FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all waitlist
CREATE POLICY "Admins can view all waitlist"
  ON waitlist FOR SELECT
  USING (is_admin());
```

**INSERT/DELETE Policies:**
```sql
-- Users can create own waitlist entries
CREATE POLICY "Users can create own waitlist entries"
  ON waitlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete own waitlist entries
CREATE POLICY "Users can delete own waitlist entries"
  ON waitlist FOR DELETE
  USING (auth.uid() = user_id);
```

**UPDATE Policies:**
```sql
-- Admins can update waitlist
CREATE POLICY "Admins can update waitlist"
  ON waitlist FOR UPDATE
  USING (is_admin());
```

### admin_audit_log

**SELECT Policies:**
```sql
-- Admins can view audit log
CREATE POLICY "Admins can view audit log"
  ON admin_audit_log FOR SELECT
  TO authenticated
  USING (is_platform_admin());
```

**INSERT Policies:**
```sql
-- System can insert audit log
CREATE POLICY "System can insert audit log"
  ON admin_audit_log FOR INSERT
  TO authenticated
  WITH CHECK (is_platform_admin());
```

### alerts

**SELECT Policies:**
```sql
-- Admins can view alerts
CREATE POLICY "Admins can view alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (is_platform_admin());
```

**UPDATE Policies:**
```sql
-- Admins can update alerts
CREATE POLICY "Admins can update alerts"
  ON alerts FOR UPDATE
  TO authenticated
  USING (is_platform_admin())
  WITH CHECK (is_platform_admin());
```

**INSERT Policies:**
```sql
-- System can insert alerts
CREATE POLICY "System can insert alerts"
  ON alerts FOR INSERT
  TO authenticated
  WITH CHECK (is_platform_admin());
```

### platform_metrics

**SELECT Policies:**
```sql
-- Admins can view metrics
CREATE POLICY "Admins can view metrics"
  ON platform_metrics FOR SELECT
  TO authenticated
  USING (is_platform_admin());
```

### api_usage_log

**SELECT Policies:**
```sql
-- Admins can view API usage logs
CREATE POLICY "Admins can view API usage logs"
  ON api_usage_log FOR SELECT
  TO authenticated
  USING (is_platform_admin());
```

**INSERT Policies:**
```sql
-- Service role can insert (used by API wrapper)
CREATE POLICY "Service can insert API usage logs"
  ON api_usage_log FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated can insert API usage logs"
  ON api_usage_log FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

### platform_settings

**SELECT Policies:**
```sql
-- Public can read platform settings
CREATE POLICY "Public can read platform settings"
  ON platform_settings FOR SELECT
  USING (TRUE);
```

**ALL Policies:**
```sql
-- Admins can manage platform settings
CREATE POLICY "Admins can manage platform settings"
  ON platform_settings FOR ALL
  USING (is_admin());
```

---

## Database Functions

### Helper Functions

#### `update_updated_at()`
Auto-update updated_at timestamp on UPDATE.
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `is_admin()`
Check if current user is admin (from JWT app_metadata).
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

#### `check_is_admin(user_id UUID)`
Check if specific user is admin (bypasses RLS).
```sql
CREATE OR REPLACE FUNCTION check_is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = user_id),
    FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

#### `is_platform_admin()`
Check if current user is platform admin.
```sql
CREATE OR REPLACE FUNCTION is_platform_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Operator Helper Functions

#### `is_operator_member(op_id UUID, required_roles operator_member_role[])`
Check if user is a member of an operator.
```sql
CREATE OR REPLACE FUNCTION is_operator_member(op_id UUID, required_roles operator_member_role[] DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
  IF required_roles IS NULL THEN
    RETURN EXISTS (
      SELECT 1 FROM public.operator_members
      WHERE operator_id = op_id
        AND profile_id = auth.uid()
        AND is_active = TRUE
    );
  ELSE
    RETURN EXISTS (
      SELECT 1 FROM public.operator_members
      WHERE operator_id = op_id
        AND profile_id = auth.uid()
        AND role = ANY(required_roles)
        AND is_active = TRUE
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `is_operator_admin(op_id UUID)`
Check if user owns/admins an operator.
```sql
CREATE OR REPLACE FUNCTION is_operator_admin(op_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN is_operator_member(op_id, ARRAY['owner', 'admin']::operator_member_role[]);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `get_user_operator_id()`
Get operator ID for current user.
```sql
CREATE OR REPLACE FUNCTION get_user_operator_id()
RETURNS UUID AS $$
DECLARE
  op_id UUID;
BEGIN
  SELECT operator_id INTO op_id
  FROM public.operator_members
  WHERE profile_id = auth.uid() AND is_active = TRUE
  LIMIT 1;
  RETURN op_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### User & Deposit Functions

#### `user_requires_deposit(p_user_id UUID)`
Check if user requires deposit for booking.
```sql
CREATE OR REPLACE FUNCTION user_requires_deposit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_record RECORD;
BEGIN
  SELECT is_flagged, tours_completed INTO user_record
  FROM public.profiles
  WHERE id = p_user_id;

  -- First-time user (0 completed tours)
  IF user_record.tours_completed = 0 THEN
    RETURN TRUE;
  END IF;

  -- Flagged user
  IF user_record.is_flagged THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Strike System Functions

#### `apply_strike(p_user_id UUID, p_reservation_id UUID, p_strike_amount DECIMAL, p_reason TEXT)`
Apply strike to user.
```sql
CREATE OR REPLACE FUNCTION apply_strike(
  p_user_id UUID,
  p_reservation_id UUID,
  p_strike_amount DECIMAL,
  p_reason TEXT
)
RETURNS VOID AS $$
BEGIN
  -- Log the strike
  INSERT INTO public.strike_history (user_id, reservation_id, strike_amount, reason)
  VALUES (p_user_id, p_reservation_id, p_strike_amount, p_reason);

  -- Update user's strike count and flag status
  UPDATE public.profiles
  SET
    strike_count = strike_count + p_strike_amount,
    is_flagged = CASE
      WHEN strike_count + p_strike_amount >= 1 THEN TRUE
      ELSE is_flagged
    END,
    probation_successful_bookings = 0
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `check_probation_clear(p_user_id UUID)`
Check and clear probation after 2 successful bookings.
```sql
CREATE OR REPLACE FUNCTION check_probation_clear(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  user_record RECORD;
BEGIN
  SELECT is_flagged, probation_successful_bookings INTO user_record
  FROM public.profiles
  WHERE id = p_user_id;

  IF user_record.is_flagged AND user_record.probation_successful_bookings >= 2 THEN
    UPDATE public.profiles
    SET is_flagged = FALSE
    WHERE id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `increment_probation_counter(p_user_id UUID)`
Increment probation counter on successful booking.
```sql
CREATE OR REPLACE FUNCTION increment_probation_counter(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET probation_successful_bookings = probation_successful_bookings + 1
  WHERE id = p_user_id AND is_flagged = TRUE;

  PERFORM check_probation_clear(p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Tour Threshold Functions

#### `check_tour_threshold()`
Update tour status when threshold is reached.
```sql
CREATE OR REPLACE FUNCTION check_tour_threshold()
RETURNS TRIGGER AS $$
DECLARE
  booking_count INTEGER;
  tour_record RECORD;
BEGIN
  -- Get current booking count
  SELECT COUNT(*) INTO booking_count
  FROM public.reservations
  WHERE tour_id = NEW.tour_id
    AND status IN ('reserved', 'payment_pending', 'confirmed');

  -- Get tour details
  SELECT threshold, status INTO tour_record
  FROM public.tours
  WHERE id = NEW.tour_id;

  -- Update tour status if threshold reached
  IF booking_count >= tour_record.threshold AND tour_record.status = 'forming' THEN
    UPDATE public.tours
    SET
      status = 'payment_pending',
      payment_window_end = NOW() + INTERVAL '24 hours'
    WHERE id = NEW.tour_id;

    -- Update all reserved reservations to payment_pending
    UPDATE public.reservations
    SET
      status = 'payment_pending',
      payment_due_at = NOW() + INTERVAL '24 hours'
    WHERE tour_id = NEW.tour_id AND status = 'reserved';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `get_next_waitlist_position(p_tour_id UUID)`
Get next waitlist position number.
```sql
CREATE OR REPLACE FUNCTION get_next_waitlist_position(p_tour_id UUID)
RETURNS INTEGER AS $$
DECLARE
  max_position INTEGER;
BEGIN
  SELECT COALESCE(MAX(position), 0) INTO max_position
  FROM public.waitlist
  WHERE tour_id = p_tour_id;

  RETURN max_position + 1;
END;
$$ LANGUAGE plpgsql;
```

### Trust Score & Tier Functions

#### `calculate_trust_score(p_user_id UUID)`
Calculate user trust score based on activity.
```sql
CREATE OR REPLACE FUNCTION calculate_trust_score(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  avg_etiquette NUMERIC;
  punctuality_rate NUMERIC;
  tours_done INTEGER;
  score INTEGER;
BEGIN
  -- Get average etiquette score (weight: 60%)
  SELECT AVG(etiquette_score) INTO avg_etiquette
  FROM public.guide_ratings
  WHERE user_id = p_user_id;

  -- Get punctuality rate (weight: 20%)
  SELECT AVG(CASE WHEN punctuality THEN 1 ELSE 0 END) INTO punctuality_rate
  FROM public.guide_ratings
  WHERE user_id = p_user_id;

  -- Get tours completed (weight: 20%)
  SELECT tours_completed INTO tours_done
  FROM public.profiles
  WHERE id = p_user_id;

  -- Calculate score (0-100)
  IF avg_etiquette IS NULL THEN
    score := 0;
  ELSE
    score := ROUND(
      (avg_etiquette / 5.0 * 60) +
      (COALESCE(punctuality_rate, 1) * 20) +
      (LEAST(tours_done, 10) / 10.0 * 20)
    );
  END IF;

  RETURN score;
END;
$$ LANGUAGE plpgsql;
```

#### `check_tier_upgrade()`
Automatically upgrade user tier based on trust score.
```sql
CREATE OR REPLACE FUNCTION check_tier_upgrade()
RETURNS TRIGGER AS $$
BEGIN
  -- Tier 0 -> Tier 1: trust_score >= 30 AND fieldcraft_quiz_passed = true
  IF NEW.trust_score >= 30 AND NEW.fieldcraft_quiz_passed = TRUE AND NEW.tier = 0 THEN
    NEW.tier := 1;

    -- Award Field Naturalist badge
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT NEW.id, id FROM public.badges WHERE code = 'quiz_passed'
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Tier 1 -> Tier 2: trust_score >= 80 AND tours_completed >= 3
  IF NEW.trust_score >= 80 AND NEW.tours_completed >= 3 AND NEW.tier = 1 THEN
    NEW.tier := 2;

    -- Award Trusted Contributor badge
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT NEW.id, id FROM public.badges WHERE code = 'trusted_contributor'
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `award_badge_on_criteria()`
Award badges when criteria met.
```sql
CREATE OR REPLACE FUNCTION award_badge_on_criteria()
RETURNS TRIGGER AS $$
BEGIN
  -- Award active_birder badge when tours_completed >= 3
  IF NEW.tours_completed >= 3 AND (OLD.tours_completed IS NULL OR OLD.tours_completed < 3) THEN
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT NEW.id, id FROM public.badges WHERE code = 'active_birder'
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Award quiz_passed badge when fieldcraft_quiz_passed = true
  IF NEW.fieldcraft_quiz_passed = TRUE AND (OLD.fieldcraft_quiz_passed IS NULL OR OLD.fieldcraft_quiz_passed = FALSE) THEN
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT NEW.id, id FROM public.badges WHERE code = 'quiz_passed'
    ON CONFLICT (user_id, badge_id) DO NOTHING;

    NEW.trust_score := COALESCE(NEW.trust_score, 0) + 20;
    NEW.fieldcraft_quiz_passed_at := NOW();
  END IF;

  -- Award ebird_verified badge when verified
  IF NEW.ebird_verified = TRUE AND (OLD.ebird_verified IS NULL OR OLD.ebird_verified = FALSE) THEN
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT NEW.id, id FROM public.badges WHERE code = 'ebird_verified'
    ON CONFLICT (user_id, badge_id) DO NOTHING;

    IF NEW.ebird_life_list_count >= 500 THEN
      NEW.trust_score := COALESCE(NEW.trust_score, 0) + 15;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `update_user_tier_on_quiz()`
Update user tier when quiz is passed.
```sql
CREATE OR REPLACE FUNCTION update_user_tier_on_quiz()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.passed = TRUE THEN
    UPDATE public.profiles
    SET
      fieldcraft_quiz_passed = TRUE,
      fieldcraft_quiz_passed_at = NOW(),
      trust_score = trust_score + 20,
      tier = CASE WHEN trust_score + 20 >= 30 THEN GREATEST(tier, 1) ELSE tier END
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Reservation & Review Handlers

#### `handle_reservation_complete()`
Update trust score when reservation is completed.
```sql
CREATE OR REPLACE FUNCTION handle_reservation_complete()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status IS DISTINCT FROM 'confirmed' THEN
    UPDATE public.profiles SET
      tours_completed = tours_completed + 1,
      trust_score = trust_score + 10,
      updated_at = NOW()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `handle_referral_complete()`
Add trust score when referral completes.
```sql
CREATE OR REPLACE FUNCTION handle_referral_complete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles SET
    trust_score = trust_score + 5,
    referrals_count = referrals_count + 1,
    updated_at = NOW()
  WHERE id = NEW.referrer_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `update_operator_rating_stats()`
Update operator rating stats when review is inserted/updated.
```sql
CREATE OR REPLACE FUNCTION update_operator_rating_stats()
RETURNS TRIGGER AS $$
DECLARE
  new_avg DECIMAL(2,1);
  new_count INTEGER;
BEGIN
  SELECT
    COALESCE(ROUND(AVG(rating)::numeric, 1), 0),
    COUNT(*)
  INTO new_avg, new_count
  FROM public.reviews
  WHERE operator_id = COALESCE(NEW.operator_id, OLD.operator_id);

  UPDATE public.operators
  SET
    rating_avg = new_avg,
    rating_count = new_count,
    updated_at = NOW()
  WHERE id = COALESCE(NEW.operator_id, OLD.operator_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `update_operator_tour_stats()`
Update operator tour stats when reservation is completed.
```sql
CREATE OR REPLACE FUNCTION update_operator_tour_stats()
RETURNS TRIGGER AS $$
DECLARE
  op_id UUID;
  guest_count INTEGER;
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    SELECT operator_id INTO op_id FROM public.tours WHERE id = NEW.tour_id;

    IF op_id IS NOT NULL THEN
      guest_count := COALESCE(NEW.guest_count, 1);

      UPDATE public.operators
      SET
        tours_completed = tours_completed + 1,
        guests_served = guests_served + guest_count,
        updated_at = NOW()
      WHERE id = op_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Profile Security Functions

#### `prevent_protected_field_update()`
Prevent non-admins from updating protected fields.
```sql
CREATE OR REPLACE FUNCTION prevent_protected_field_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT is_admin() THEN
    NEW.tier := OLD.tier;
    NEW.trust_score := OLD.trust_score;
    NEW.tours_completed := OLD.tours_completed;
    NEW.fieldcraft_quiz_passed := OLD.fieldcraft_quiz_passed;
    NEW.fieldcraft_quiz_passed_at := OLD.fieldcraft_quiz_passed_at;
    NEW.is_admin := OLD.is_admin;
    NEW.strike_count := OLD.strike_count;
    NEW.is_flagged := OLD.is_flagged;
    NEW.probation_successful_bookings := OLD.probation_successful_bookings;
    NEW.referrals_count := OLD.referrals_count;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### `get_profile_visibility_level(profile_user_id UUID, viewer_user_id UUID)`
Get visibility level for profile based on viewer relationship.
```sql
CREATE OR REPLACE FUNCTION get_profile_visibility_level(
  profile_user_id UUID,
  viewer_user_id UUID
)
RETURNS TEXT AS $$
DECLARE
  is_same_user BOOLEAN;
  is_viewer_admin BOOLEAN;
  is_profile_public BOOLEAN;
  is_tour_participant BOOLEAN;
BEGIN
  is_same_user := profile_user_id = viewer_user_id;
  is_viewer_admin := check_is_admin(viewer_user_id);

  IF is_same_user OR is_viewer_admin THEN
    RETURN 'full';
  END IF;

  SELECT is_public INTO is_profile_public
  FROM public.profiles WHERE id = profile_user_id;

  SELECT EXISTS (
    SELECT 1 FROM public.reservations r1
    JOIN public.reservations r2 ON r1.tour_id = r2.tour_id
    WHERE r1.user_id = profile_user_id
    AND r2.user_id = viewer_user_id
    AND r1.status NOT IN ('cancelled', 'refunded', 'abandoned')
    AND r2.status NOT IN ('cancelled', 'refunded', 'abandoned')
  ) INTO is_tour_participant;

  IF is_tour_participant THEN
    RETURN 'participant';
  END IF;

  IF is_profile_public THEN
    RETURN 'public';
  END IF;

  RETURN 'none';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

### Admin & Alert Functions

#### `log_admin_action(p_action_type, p_target_type, p_target_id, p_details)`
Log admin action to audit log.
```sql
CREATE OR REPLACE FUNCTION log_admin_action(
  p_action_type admin_action_type,
  p_target_type admin_target_type,
  p_target_id uuid,
  p_details jsonb DEFAULT '{}'
)
RETURNS uuid AS $$
DECLARE
  log_id uuid;
BEGIN
  INSERT INTO admin_audit_log (admin_id, action_type, target_type, target_id, details)
  VALUES (auth.uid(), p_action_type, p_target_type, p_target_id, p_details)
  RETURNING id INTO log_id;

  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `generate_threshold_risk_alerts()`
Generate alerts for tours at risk of not reaching threshold.
```sql
CREATE OR REPLACE FUNCTION generate_threshold_risk_alerts()
RETURNS void AS $$
BEGIN
  INSERT INTO alerts (type, severity, title, description, target_type, target_id, action_url, metadata)
  SELECT
    'threshold_risk'::alert_type,
    CASE
      WHEN t.threshold_deadline <= CURRENT_DATE + INTERVAL '3 days' THEN 'urgent'::alert_severity
      ELSE 'warning'::alert_severity
    END,
    t.title || ' needs ' || (t.threshold - COALESCE(t.current_bookings, 0)) || ' more booking(s)',
    'Deadline: ' || TO_CHAR(t.threshold_deadline, 'Mon DD, YYYY'),
    'tour'::admin_target_type,
    t.id,
    '/admin/tours/' || t.id,
    jsonb_build_object(
      'current_bookings', COALESCE(t.current_bookings, 0),
      'threshold', t.threshold,
      'deadline', t.threshold_deadline
    )
  FROM tours t
  WHERE t.threshold_deadline IS NOT NULL
    AND t.threshold_deadline <= CURRENT_DATE + INTERVAL '14 days'
    AND t.threshold_deadline > CURRENT_DATE
    AND t.status = 'forming'
    AND COALESCE(t.current_bookings, 0) < t.threshold
    AND NOT EXISTS (
      SELECT 1 FROM alerts a
      WHERE a.target_id = t.id
        AND a.type = 'threshold_risk'
        AND a.dismissed_at IS NULL
        AND a.created_at > CURRENT_DATE - INTERVAL '1 day'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `check_expired_credentials()`
Check expired credentials and auto-suspend operators.
```sql
CREATE OR REPLACE FUNCTION check_expired_credentials()
RETURNS void AS $$
DECLARE
  expired_cred RECORD;
BEGIN
  FOR expired_cred IN
    SELECT DISTINCT
      c.operator_id,
      o.name as operator_name,
      c.type as credential_type,
      c.expiration_date
    FROM operator_credentials c
    JOIN operators o ON c.operator_id = o.id
    WHERE c.is_critical = true
      AND c.verified = true
      AND c.expiration_date < CURRENT_DATE
      AND o.approval_status = 'approved'
  LOOP
    -- Auto-suspend the operator
    UPDATE operators
    SET approval_status = 'suspended',
        admin_notes = COALESCE(admin_notes || E'\n', '') ||
          '[AUTO] Suspended on ' || TO_CHAR(NOW(), 'YYYY-MM-DD') ||
          ' due to expired ' || expired_cred.credential_type
    WHERE id = expired_cred.operator_id;

    -- Log the action
    INSERT INTO admin_audit_log (admin_id, action_type, target_type, target_id, details)
    VALUES (
      NULL,
      'operator_suspended',
      'operator',
      expired_cred.operator_id,
      jsonb_build_object(
        'reason', 'auto_suspension',
        'credential_type', expired_cred.credential_type,
        'expiration_date', expired_cred.expiration_date
      )
    );

    -- Create urgent alert
    INSERT INTO alerts (type, severity, title, description, target_type, target_id, action_url, metadata)
    VALUES (
      'operator_auto_suspended',
      'urgent',
      expired_cred.operator_name || ' auto-suspended',
      'Critical credential (' || expired_cred.credential_type || ') expired on ' ||
        TO_CHAR(expired_cred.expiration_date, 'Mon DD, YYYY'),
      'operator',
      expired_cred.operator_id,
      '/admin/operators/' || expired_cred.operator_id,
      jsonb_build_object(
        'credential_type', expired_cred.credential_type,
        'expiration_date', expired_cred.expiration_date,
        'auto_suspended', true
      )
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `all_credentials_verified(op_id uuid)`
Check if all required credentials are verified.
```sql
CREATE OR REPLACE FUNCTION all_credentials_verified(op_id uuid)
RETURNS boolean AS $$
DECLARE
  required_types credential_type[] := ARRAY['guide_license', 'insurance']::credential_type[];
  verified_count integer;
  required_count integer;
BEGIN
  required_count := array_length(required_types, 1);

  SELECT COUNT(*) INTO verified_count
  FROM operator_credentials
  WHERE operator_id = op_id
    AND type = ANY(required_types)
    AND verified = true;

  RETURN verified_count >= required_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `maybe_auto_approve_operator()`
Auto-approve operator when all credentials verified.
```sql
CREATE OR REPLACE FUNCTION maybe_auto_approve_operator()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verified = true AND (OLD.verified IS NULL OR OLD.verified = false) THEN
    IF all_credentials_verified(NEW.operator_id) THEN
      UPDATE operators
      SET approval_status = 'approved',
          approved_at = NOW()
      WHERE id = NEW.operator_id
        AND approval_status = 'pending';

      IF FOUND THEN
        INSERT INTO admin_audit_log (admin_id, action_type, target_type, target_id, details)
        VALUES (
          NULL,
          'operator_approved',
          'operator',
          NEW.operator_id,
          jsonb_build_object(
            'reason', 'auto_approval',
            'trigger', 'all_credentials_verified'
          )
        );
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `admin_cancel_tour(p_tour_id, p_reason, p_admin_id)`
Cancel tour and flag reservations for refund.
```sql
CREATE OR REPLACE FUNCTION admin_cancel_tour(
  p_tour_id uuid,
  p_reason text,
  p_admin_id uuid DEFAULT auth.uid()
)
RETURNS void AS $$
BEGIN
  UPDATE tours
  SET status = 'cancelled',
      cancelled_at = NOW(),
      cancellation_reason = p_reason
  WHERE id = p_tour_id;

  UPDATE reservations
  SET refund_requested = true,
      refund_requested_at = NOW(),
      refund_reason = 'Tour cancelled: ' || p_reason
  WHERE tour_id = p_tour_id
    AND status NOT IN ('cancelled', 'refunded');

  INSERT INTO admin_audit_log (admin_id, action_type, target_type, target_id, details)
  VALUES (
    p_admin_id,
    'tour_cancelled',
    'tour',
    p_tour_id,
    jsonb_build_object(
      'reason', p_reason,
      'refunds_flagged', (
        SELECT COUNT(*) FROM reservations
        WHERE tour_id = p_tour_id AND refund_requested = true
      )
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Metrics Functions

#### `calculate_daily_metrics(target_date)`
Calculate and store daily platform metrics.
```sql
CREATE OR REPLACE FUNCTION calculate_daily_metrics(target_date date DEFAULT CURRENT_DATE)
RETURNS void AS $$
DECLARE
  v_escrowed bigint;
  v_committed bigint;
  v_revenue bigint;
  v_gmv bigint;
BEGIN
  SELECT
    COALESCE(SUM(CASE WHEN t.status = 'forming' THEN r.total_cents ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN t.status = 'confirmed' THEN r.total_cents ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN t.status = 'confirmed' THEN (r.total_cents * 0.15)::bigint ELSE 0 END), 0),
    COALESCE(SUM(r.total_cents), 0)
  INTO v_escrowed, v_committed, v_revenue, v_gmv
  FROM reservations r
  JOIN tours t ON r.tour_id = t.id
  WHERE r.status IN ('confirmed', 'reserved', 'payment_pending');

  INSERT INTO platform_metrics (
    date,
    escrowed_value_cents,
    committed_value_cents,
    platform_revenue_cents,
    gmv_cents,
    tours_listed,
    tours_confirmed,
    tours_cancelled,
    tours_completed,
    active_tours,
    total_users,
    new_users,
    new_operators,
    bookings_created,
    bookings_cancelled,
    threshold_success_rate,
    calculated_at
  )
  VALUES (
    target_date,
    v_escrowed,
    v_committed,
    v_revenue,
    v_gmv,
    (SELECT COUNT(*) FROM tours WHERE DATE(created_at) = target_date),
    (SELECT COUNT(*) FROM tours WHERE status = 'confirmed'),
    (SELECT COUNT(*) FROM tours WHERE cancelled_at IS NOT NULL AND DATE(cancelled_at) = target_date),
    (SELECT COUNT(*) FROM tours WHERE status = 'completed' AND DATE(updated_at) = target_date),
    (SELECT COUNT(*) FROM tours WHERE status IN ('confirmed') AND date_start <= CURRENT_DATE AND date_end >= CURRENT_DATE),
    (SELECT COUNT(*) FROM profiles),
    (SELECT COUNT(*) FROM profiles WHERE DATE(created_at) = target_date),
    (SELECT COUNT(*) FROM operators WHERE DATE(created_at) = target_date),
    (SELECT COUNT(*) FROM reservations WHERE DATE(created_at) = target_date),
    (SELECT COUNT(*) FROM reservations WHERE status = 'cancelled' AND DATE(updated_at) = target_date),
    (SELECT
      CASE WHEN COUNT(*) > 0
        THEN (COUNT(*) FILTER (WHERE status = 'confirmed')::decimal / COUNT(*)::decimal) * 100
        ELSE 0
      END
     FROM tours
     WHERE created_at >= target_date - INTERVAL '90 days'),
    NOW()
  )
  ON CONFLICT (date) DO UPDATE SET
    escrowed_value_cents = EXCLUDED.escrowed_value_cents,
    committed_value_cents = EXCLUDED.committed_value_cents,
    platform_revenue_cents = EXCLUDED.platform_revenue_cents,
    gmv_cents = EXCLUDED.gmv_cents,
    tours_listed = EXCLUDED.tours_listed,
    tours_confirmed = EXCLUDED.tours_confirmed,
    tours_cancelled = EXCLUDED.tours_cancelled,
    tours_completed = EXCLUDED.tours_completed,
    active_tours = EXCLUDED.active_tours,
    total_users = EXCLUDED.total_users,
    new_users = EXCLUDED.new_users,
    new_operators = EXCLUDED.new_operators,
    bookings_created = EXCLUDED.bookings_created,
    bookings_cancelled = EXCLUDED.bookings_cancelled,
    threshold_success_rate = EXCLUDED.threshold_success_rate,
    calculated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### API Usage Functions

#### `get_api_usage_summary(p_start_date, p_end_date)`
Get API usage summary for date range.
```sql
CREATE OR REPLACE FUNCTION get_api_usage_summary(
  p_start_date date DEFAULT CURRENT_DATE,
  p_end_date date DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_calls bigint,
  total_cost_cents decimal(12,4),
  total_tokens_in bigint,
  total_tokens_out bigint,
  avg_duration_ms numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::bigint as total_calls,
    COALESCE(SUM(cost_cents), 0)::decimal(12,4) as total_cost_cents,
    COALESCE(SUM(tokens_in), 0)::bigint as total_tokens_in,
    COALESCE(SUM(tokens_out), 0)::bigint as total_tokens_out,
    COALESCE(AVG(duration_ms), 0)::numeric as avg_duration_ms
  FROM api_usage_log
  WHERE DATE(created_at) BETWEEN p_start_date AND p_end_date
    AND success = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Operator Dashboard Functions

#### `get_operator_tours(op_id UUID)`
Get operator's tours with booking stats.
```sql
CREATE OR REPLACE FUNCTION get_operator_tours(op_id UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  status TEXT,
  date_start TIMESTAMPTZ,
  date_end TIMESTAMPTZ,
  capacity INTEGER,
  threshold INTEGER,
  price_cents INTEGER,
  current_bookings BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.title,
    t.status,
    t.date_start,
    t.date_end,
    t.capacity,
    t.threshold,
    t.price_cents,
    COALESCE(COUNT(r.id) FILTER (
      WHERE r.status IN ('reserved', 'payment_pending', 'confirmed')
    ), 0) as current_bookings
  FROM public.tours t
  LEFT JOIN public.reservations r ON t.id = r.tour_id
  WHERE t.operator_id = op_id
  GROUP BY t.id
  ORDER BY t.date_start DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

### Chase List Functions

#### `get_or_create_notification_preferences(p_user_id UUID)`
Get or create notification preferences for user.
```sql
CREATE OR REPLACE FUNCTION get_or_create_notification_preferences(p_user_id UUID)
RETURNS public.notification_preferences AS $$
DECLARE
  prefs public.notification_preferences;
BEGIN
  SELECT * INTO prefs
  FROM public.notification_preferences
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    INSERT INTO public.notification_preferences (user_id)
    VALUES (p_user_id)
    RETURNING * INTO prefs;
  END IF;

  RETURN prefs;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### `find_chase_list_matches(p_tour_id UUID)`
Find users to notify for a tour based on chase list.
```sql
CREATE OR REPLACE FUNCTION find_chase_list_matches(p_tour_id UUID)
RETURNS TABLE (
  user_id UUID,
  email TEXT,
  name TEXT,
  matched_species_ids UUID[],
  matched_species_count INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ucl.user_id,
    p.email,
    p.name,
    array_agg(DISTINCT ucl.species_id) as matched_species_ids,
    COUNT(DISTINCT ucl.species_id)::INT as matched_species_count
  FROM public.tour_species ts
  JOIN public.user_chase_list ucl ON ts.species_id = ucl.species_id
  JOIN public.profiles p ON ucl.user_id = p.id
  JOIN public.notification_preferences np ON ucl.user_id = np.user_id
  WHERE ts.tour_id = p_tour_id
    AND np.chase_list_enabled = TRUE
    AND NOT EXISTS (
      SELECT 1 FROM public.notification_log nl
      WHERE nl.user_id = ucl.user_id
        AND nl.tour_id = p_tour_id
        AND nl.notification_type = 'chase_list_match'
    )
  GROUP BY ucl.user_id, p.email, p.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

#### `is_within_quiet_hours(p_user_id UUID, p_check_time TIMESTAMPTZ)`
Check if current time is within user's quiet hours.
```sql
CREATE OR REPLACE FUNCTION is_within_quiet_hours(
  p_user_id UUID,
  p_check_time TIMESTAMPTZ DEFAULT NOW()
)
RETURNS BOOLEAN AS $$
DECLARE
  prefs RECORD;
  user_local_time TIME;
BEGIN
  SELECT quiet_hours_start, quiet_hours_end, timezone
  INTO prefs
  FROM public.notification_preferences
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  user_local_time := (p_check_time AT TIME ZONE prefs.timezone)::TIME;

  IF prefs.quiet_hours_start > prefs.quiet_hours_end THEN
    RETURN user_local_time >= prefs.quiet_hours_start
        OR user_local_time < prefs.quiet_hours_end;
  ELSE
    RETURN user_local_time >= prefs.quiet_hours_start
       AND user_local_time < prefs.quiet_hours_end;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

#### `count_today_notifications(p_user_id UUID)`
Count notifications sent today for user.
```sql
CREATE OR REPLACE FUNCTION count_today_notifications(p_user_id UUID)
RETURNS INT AS $$
DECLARE
  prefs RECORD;
  user_today_start TIMESTAMPTZ;
BEGIN
  SELECT timezone INTO prefs
  FROM public.notification_preferences
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    prefs.timezone := 'Australia/Melbourne';
  END IF;

  user_today_start := date_trunc('day', NOW() AT TIME ZONE prefs.timezone) AT TIME ZONE prefs.timezone;

  RETURN (
    SELECT COUNT(*)
    FROM public.notification_log
    WHERE user_id = p_user_id
      AND notification_type = 'chase_list_match'
      AND sent_at >= user_today_start
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
```

---

## Triggers

### Updated_at Triggers
```sql
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tours_updated_at
  BEFORE UPDATE ON public.tours
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profile_private_updated_at
  BEFORE UPDATE ON public.profile_private
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_operators_updated_at
  BEFORE UPDATE ON public.operators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Tier & Badge Triggers
```sql
CREATE TRIGGER trigger_check_tier_upgrade
  BEFORE UPDATE OF trust_score, tours_completed, fieldcraft_quiz_passed ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION check_tier_upgrade();

CREATE TRIGGER trigger_award_badges
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION award_badge_on_criteria();

CREATE TRIGGER trigger_update_tier_on_quiz
  AFTER INSERT ON public.fieldcraft_results
  FOR EACH ROW EXECUTE FUNCTION update_user_tier_on_quiz();
```

### Tour Threshold Trigger
```sql
CREATE TRIGGER trigger_check_threshold
  AFTER INSERT OR UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION check_tour_threshold();
```

### Protected Fields Trigger
```sql
CREATE TRIGGER trigger_protect_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION prevent_protected_field_update();
```

### Reservation & Review Triggers
```sql
CREATE TRIGGER trigger_reservation_complete
  AFTER UPDATE OF status ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION handle_reservation_complete();

CREATE TRIGGER trigger_referral_complete
  AFTER INSERT ON public.referrals
  FOR EACH ROW EXECUTE FUNCTION handle_referral_complete();

CREATE TRIGGER trigger_update_operator_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_operator_rating_stats();

CREATE TRIGGER trigger_update_operator_tour_stats
  AFTER UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_operator_tour_stats();
```

### Credential Auto-approval Trigger
```sql
CREATE TRIGGER trigger_maybe_auto_approve_operator
  AFTER UPDATE ON operator_credentials
  FOR EACH ROW
  EXECUTE FUNCTION maybe_auto_approve_operator();
```

---

## Views

### tours_with_bookings
```sql
CREATE VIEW public.tours_with_bookings AS
SELECT
  t.*,
  COALESCE(COUNT(r.id) FILTER (WHERE r.status IN ('reserved', 'payment_pending', 'confirmed')), 0) AS current_bookings,
  COALESCE(COUNT(r.id) FILTER (WHERE r.status = 'waitlisted'), 0) AS waitlist_count
FROM public.tours t
LEFT JOIN public.reservations r ON t.id = r.tour_id
GROUP BY t.id;
```

---

## Indexes

### profiles
```sql
CREATE INDEX idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = TRUE;
CREATE INDEX idx_profiles_is_flagged ON profiles(is_flagged) WHERE is_flagged = TRUE;
CREATE INDEX idx_profiles_tier ON profiles(tier);
CREATE INDEX idx_profiles_is_public ON profiles(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_profiles_experience_level ON profiles(experience_level);
CREATE INDEX idx_profiles_primary_focus ON profiles(primary_focus);
CREATE INDEX idx_profiles_operator_slug ON profiles(operator_slug) WHERE operator_slug IS NOT NULL;
CREATE INDEX idx_profiles_linked_operator ON profiles(linked_operator_id) WHERE linked_operator_id IS NOT NULL;
CREATE INDEX idx_profiles_flagged ON profiles(is_flagged) WHERE is_flagged = TRUE;
```

### operators
```sql
CREATE INDEX idx_operators_slug ON operators(slug);
CREATE INDEX idx_operators_owner ON operators(owner_profile_id);
CREATE INDEX idx_operators_active ON operators(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_operators_verified ON operators(is_verified) WHERE is_verified = TRUE;
CREATE UNIQUE INDEX idx_operators_stripe_account ON operators(stripe_account_id) WHERE stripe_account_id IS NOT NULL;
```

### operator_members
```sql
CREATE INDEX idx_operator_members_operator ON operator_members(operator_id);
CREATE INDEX idx_operator_members_profile ON operator_members(profile_id);
```

### operator_credentials
```sql
CREATE INDEX idx_operator_credentials_operator ON operator_credentials(operator_id);
CREATE INDEX idx_operator_credentials_verified ON operator_credentials(verified) WHERE verified = TRUE;
CREATE INDEX idx_credentials_expiring ON operator_credentials(expiration_date) WHERE expiration_date IS NOT NULL AND verified = true;
CREATE INDEX idx_credentials_critical ON operator_credentials(is_critical, expiration_date) WHERE is_critical = true AND verified = true;
```

### operator_media
```sql
CREATE INDEX idx_operator_media_operator ON operator_media(operator_id);
CREATE UNIQUE INDEX idx_operator_media_hero ON operator_media(operator_id) WHERE is_hero = TRUE;
```

### species
```sql
CREATE INDEX idx_species_common_name ON species USING gin (common_name gin_trgm_ops);
CREATE INDEX idx_species_scientific_name ON species USING gin (scientific_name gin_trgm_ops);
CREATE INDEX idx_species_region ON species(region);
```

### tours
```sql
CREATE INDEX idx_tours_status ON tours(status);
CREATE INDEX idx_tours_date_start ON tours(date_start);
CREATE INDEX idx_tours_tour_type ON tours(tour_type);
CREATE INDEX idx_tours_slug ON tours(slug);
CREATE INDEX idx_tours_operator ON tours(operator_id);
CREATE INDEX idx_tours_threshold_deadline ON tours(threshold_deadline) WHERE threshold_deadline IS NOT NULL;
CREATE INDEX idx_tours_status_deadline ON tours(status, threshold_deadline);
CREATE INDEX idx_tours_payment_window ON tours(payment_window_end) WHERE status = 'payment_pending';
```

### tour_species
```sql
CREATE INDEX idx_tour_species_tour_id ON tour_species(tour_id);
CREATE INDEX idx_tour_species_species_id ON tour_species(species_id);
```

### reservations
```sql
CREATE INDEX idx_reservations_tour_id ON reservations(tour_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_payment_due ON reservations(payment_due_at) WHERE status = 'payment_pending';
CREATE INDEX idx_reservations_refund ON reservations(refund_requested) WHERE refund_requested = true;
```

### user_chase_list
```sql
CREATE INDEX idx_chase_list_user_id ON user_chase_list(user_id);
CREATE INDEX idx_chase_list_species_id ON user_chase_list(species_id);
```

### notification_log
```sql
CREATE INDEX idx_notification_log_user_sent ON notification_log(user_id, sent_at);
CREATE INDEX idx_notification_log_tour ON notification_log(tour_id);
```

### reviews
```sql
CREATE INDEX idx_reviews_operator ON reviews(operator_id);
CREATE INDEX idx_reviews_tour ON reviews(tour_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
CREATE INDEX idx_reviews_flagged ON reviews(flagged_at) WHERE flagged_at IS NOT NULL AND moderated_at IS NULL;
CREATE INDEX idx_reviews_low_rating ON reviews(rating) WHERE rating <= 2 AND is_hidden = false;
```

### messages
```sql
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_operator_id);
CREATE INDEX idx_messages_unread ON messages(recipient_operator_id) WHERE read_at IS NULL;
```

### user_badges
```sql
CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);
```

### email_log
```sql
CREATE INDEX idx_email_log_user ON email_log(user_id);
CREATE INDEX idx_email_log_template ON email_log(template);
CREATE INDEX idx_email_log_status ON email_log(status);
CREATE INDEX idx_email_log_sent_at ON email_log(sent_at DESC);
```

### strike_history
```sql
CREATE INDEX idx_strike_history_user ON strike_history(user_id);
```

### referrals
```sql
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
```

### waitlist
```sql
CREATE INDEX idx_waitlist_tour ON waitlist(tour_id);
```

### admin_audit_log
```sql
CREATE INDEX idx_audit_log_admin ON admin_audit_log(admin_id);
CREATE INDEX idx_audit_log_target ON admin_audit_log(target_type, target_id);
CREATE INDEX idx_audit_log_created ON admin_audit_log(created_at DESC);
CREATE INDEX idx_audit_log_action ON admin_audit_log(action_type);
```

### alerts
```sql
CREATE INDEX idx_alerts_active ON alerts(created_at DESC) WHERE dismissed_at IS NULL;
CREATE INDEX idx_alerts_severity ON alerts(severity) WHERE dismissed_at IS NULL;
CREATE INDEX idx_alerts_type ON alerts(type) WHERE dismissed_at IS NULL;
```

### api_usage_log
```sql
CREATE INDEX idx_api_usage_created_at ON api_usage_log(created_at DESC);
CREATE INDEX idx_api_usage_operator ON api_usage_log(operator_id) WHERE operator_id IS NOT NULL;
CREATE INDEX idx_api_usage_model ON api_usage_log(model);
CREATE INDEX idx_api_usage_action ON api_usage_log(action);
CREATE INDEX idx_api_usage_date_model ON api_usage_log(created_at, model);
```

---

## Extensions

### pg_trgm
Trigram extension for fuzzy text search.
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

---

## Seed Data

### Badges
```sql
INSERT INTO public.badges (code, name, description, icon_name, criteria, tier_required) VALUES
  ('verified_member', 'Verified Member', 'Completed identity and payment verification', 'shield-check', '{"payment_verified": true}', 0),
  ('quiz_passed', 'Field Naturalist', 'Passed the fieldcraft knowledge quiz', 'graduation-cap', '{"quiz_required": true}', 1),
  ('active_birder', 'Active Birder', 'Completed 3 or more tours', 'binoculars', '{"tours_required": 3}', 1),
  ('trusted_contributor', 'Trusted Contributor', 'Established member with excellent track record', 'award', '{"tier_required": 2}', 2),
  ('ebird_verified', 'eBird Connected', 'Linked and verified eBird account', 'link', '{"ebird_verified": true}', 0)
ON CONFLICT (code) DO NOTHING;
```

### Regions
```sql
INSERT INTO public.regions (name, type) VALUES
  ('Victoria', 'state'),
  ('Croajingolong National Park', 'park'),
  ('Mallacoota', 'region'),
  ('East Gippsland', 'region')
ON CONFLICT DO NOTHING;
```

### Platform Settings
```sql
INSERT INTO public.platform_settings (key, value, description)
VALUES ('commission_rate', '{"percentage": 15}'::jsonb, 'Platform commission percentage for Direct Charges')
ON CONFLICT (key) DO NOTHING;
```

### Species
~900 Australian bird species seeded from AviList taxonomy. See migration file `20260118300001_seed_australian_species.sql` for full list.

Priority Mallacoota species include:
- Eastern Bristlebird (endangered)
- Ground Parrot (vulnerable)
- Glossy Black-Cockatoo (vulnerable)
- Azure Kingfisher
- White-bellied Sea-Eagle
- Hooded Plover

---

## Storage Buckets & Policies

*No storage buckets configured in migrations. Storage configuration would be handled through Supabase dashboard.*

---

## Edge Functions

*No edge functions defined in migrations. Edge functions would be deployed separately.*

---

## Rebuild Instructions

To rebuild this schema from scratch:

1. **Create new Supabase project**
2. **Enable extensions:**
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_trgm;
   ```
3. **Run migrations in order:**
   - All `.sql` files in `supabase/migrations/` directory
   - Files are named with timestamps to ensure correct order
4. **Verify seed data:**
   ```sql
   SELECT COUNT(*) FROM species WHERE region = 'AU'; -- Should be ~900
   SELECT COUNT(*) FROM badges; -- Should be 5
   SELECT COUNT(*) FROM regions; -- Should be 4
   ```
5. **Set up service role key** in environment variables
6. **Configure Stripe Connect** credentials

---

**End of Database Schema Export**
