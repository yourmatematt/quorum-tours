# Re-Engagement Email Series: Implementation Guide

## Quick Start

**Files Created:**
- `RE-ENGAGEMENT-SERIES.md` - Strategy document with all copy
- `email-1-month-inactive.html` - HTML template
- `email-3-months-inactive.html` - HTML template
- `email-6-months-inactive.html` - HTML template
- `email-12-months-inactive.html` - HTML template
- `PLAINTEXT-VERSIONS.md` - Plain text fallbacks
- `IMPLEMENTATION-GUIDE.md` - This file

---

## Architecture Overview

### Email Service Integration

Use **Resend** (already configured in Quorum Tours) with the existing `supabase/functions/send-email/` Edge Function.

**Current Status:**
- ✓ Domain verified in Resend (`quorumtours.com`)
- ✓ RESEND_API_KEY configured
- ✓ EMAIL_FROM configured as `tours@quorumtours.com`
- ✓ send-email Edge Function deployed

### Trigger Mechanism

**Option A: Scheduled Job (Recommended)**
- Create a Supabase cron job that runs daily
- Checks for users who haven't logged in at 30, 90, 180, 365 days
- Triggers the appropriate email send

**Option B: Database Trigger**
- Monitor `auth.users` last_sign_in_at timestamp
- Fire trigger when inactivity intervals are reached

**Option C: Manual + Scheduled Hybrid**
- Admin panel to manually queue re-engagement emails
- Daily cron validates and sends queued emails

---

## Database Schema Requirements

### Add to `users` table

```sql
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS (
  last_login_date timestamp with time zone,
  reengagement_email_1_sent_at timestamp with time zone,
  reengagement_email_2_sent_at timestamp with time zone,
  reengagement_email_3_sent_at timestamp with time zone,
  reengagement_email_4_sent_at timestamp with time zone,
  unsubscribe_reengagement BOOLEAN DEFAULT false
);
```

**Purpose:**
- `last_login_date` - Determine inactivity duration
- `reengagement_email_X_sent_at` - Prevent duplicate sends
- `unsubscribe_reengagement` - Allow users to opt out of campaign

### Add to `audit_log` or create `email_log` table

```sql
CREATE TABLE email_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  template_name VARCHAR(50),
  subject_line_variant VARCHAR(1),
  sent_at timestamp with time zone DEFAULT now(),
  opened_at timestamp with time zone,
  clicked_at timestamp with time zone,
  unsubscribed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);
```

**Purpose:** Track campaign performance for A/B testing

---

## Resend Template Setup

### Register Templates in Resend Dashboard

Create templates in Resend with dynamic variables (handlebars syntax):

```
Template Name: reengagement-1-month
Subject: {{first_name}}, {{tours_new_count}} new birding tours just arrived
From: tours@quorumtours.com
HTML: [content from email-1-month-inactive.html]
Text: [content from PLAINTEXT-VERSIONS.md - Email #1]
```

Repeat for all 4 emails.

### Template IDs

Once created, Resend will assign template IDs:
- `reengagement-1-month` → `tmpl_1234abcd...`
- `reengagement-3-months` → `tmpl_5678efgh...`
- `reengagement-6-months` → `tmpl_9012ijkl...`
- `reengagement-12-months` → `tmpl_3456mnop...`

Store these in environment variables or your Edge Function config.

---

## Edge Function Implementation

### Location: `supabase/functions/send-reengagement-email/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ReengagementEmailRequest {
  user_id: string;
  email_type: 'month-1' | 'month-3' | 'month-6' | 'month-12';
  test_mode?: boolean;
}

serve(async (req: Request) => {
  // Only POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload: ReengagementEmailRequest = await req.json();
    const { user_id, email_type, test_mode = false } = payload;

    // 1. Fetch user and related data
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("*, auth.users!inner(email, last_sign_in_at)")
      .eq("id", user_id)
      .single();

    if (userError || !user) {
      throw new Error(`User not found: ${userError?.message}`);
    }

    // 2. Check inactivity interval
    const lastLogin = new Date(user.auth.users.last_sign_in_at);
    const daysSinceLogin = Math.floor(
      (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
    );

    const inactivityDays: Record<string, number> = {
      'month-1': 30,
      'month-3': 90,
      'month-6': 180,
      'month-12': 365,
    };

    if (daysSinceLogin < inactivityDays[email_type]) {
      return new Response(
        JSON.stringify({ error: "User inactivity interval not met" }),
        { status: 400 }
      );
    }

    // 3. Fetch dynamic content
    const tourData = await getTourStats(user_id, user.region);
    const sightingData = await getSightingData(user.region);
    const yearInReview = await getYearInReviewStats();

    // 4. Prepare email variables (handlebars)
    const emailVariables = {
      first_name: user.first_name,
      email: user.email,
      region: user.region,
      signup_date: new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      tours_new_count: tourData.newCount,
      tours_region_count: tourData.regionCount,
      tours_missed_count: tourData.missedCount,
      sightings_lifers_count: sightingData.lifersCount,
      sightings_region_examples: sightingData.examples,
      chase_list_spotted: sightingData.chaseListSpotted,
      stats_year_in_review: yearInReview,
      unsubscribe_link: `${Deno.env.get("SITE_URL")}/unsubscribe?user_id=${user_id}&campaign=reengagement`,
    };

    // 5. Select template and variant
    const templateMap: Record<string, string> = {
      'month-1': 'tmpl_reengagement_1month',
      'month-3': 'tmpl_reengagement_3months',
      'month-6': 'tmpl_reengagement_6months',
      'month-12': 'tmpl_reengagement_12months',
    };

    const templateId = templateMap[email_type];

    // 6. Send email via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "tours@quorumtours.com",
        to: test_mode ? "test@example.com" : user.email,
        template_id: templateId,
        template_data: emailVariables,
        tags: [
          { name: "campaign", value: "reengagement" },
          { name: "email_type", value: email_type },
          { name: "user_id", value: user_id },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend API error: ${JSON.stringify(error)}`);
    }

    const result = await response.json();

    // 7. Log email send
    await supabase.from("email_log").insert({
      user_id,
      template_name: `reengagement_${email_type}`,
      subject_line_variant: "A", // TODO: A/B test variant
      sent_at: new Date().toISOString(),
    });

    // 8. Update user tracking field
    const columnMap: Record<string, string> = {
      'month-1': 'reengagement_email_1_sent_at',
      'month-3': 'reengagement_email_2_sent_at',
      'month-6': 'reengagement_email_3_sent_at',
      'month-12': 'reengagement_email_4_sent_at',
    };

    await supabase
      .from("profiles")
      .update({ [columnMap[email_type]]: new Date().toISOString() })
      .eq("id", user_id);

    return new Response(
      JSON.stringify({
        success: true,
        email_id: result.id,
        user_email: user.email,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Re-engagement email error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

// Helper functions
async function getTourStats(userId: string, region: string) {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_ANON_KEY") || ""
  );

  const user = await supabase
    .from("profiles")
    .select("created_at")
    .eq("id", userId)
    .single();

  const { count: newCount } = await supabase
    .from("tours")
    .select("id", { count: "exact" })
    .gt("created_at", user.data?.created_at);

  const { count: regionCount } = await supabase
    .from("tours")
    .select("id", { count: "exact" })
    .eq("region", region)
    .gt("created_at", user.data?.created_at);

  const { count: missedCount } = await supabase
    .from("tours")
    .select("id", { count: "exact" })
    .gt("created_at", user.data?.created_at);

  return {
    newCount: newCount || 0,
    regionCount: regionCount || 0,
    missedCount: missedCount || 0,
  };
}

async function getSightingData(region: string) {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_ANON_KEY") || ""
  );

  // Fetch top sightings from tours in this region
  const { data: sightings } = await supabase
    .from("tour_sightings")
    .select(
      `
      bird_name,
      tour_id,
      tours(title, date, region, participant_count)
    `
    )
    .eq("tours.region", region)
    .order("is_lifer", { ascending: false })
    .limit(3);

  return {
    examples: sightings?.slice(0, 2) || [],
    lifersCount: sightings?.filter((s: any) => s.is_lifer).length || 0,
    chaseListSpotted: 0, // TODO: implement chase list logic
  };
}

async function getYearInReviewStats() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_ANON_KEY") || ""
  );

  const { count: totalTours } = await supabase
    .from("tours")
    .select("id", { count: "exact" })
    .gte("created_at", oneYearAgo.toISOString());

  // Stub for now - implement actual logic
  return {
    total_tours: totalTours || 47,
    total_sightings: 284,
    new_lifers: 12,
    top_region: "Gulf Coast",
    rarest_sighting: "Painted Bunting",
  };
}
```

### Deploy

```bash
supabase functions deploy send-reengagement-email
```

---

## Scheduled Job Setup

### Using Supabase Cron

Create a PostgreSQL cron job:

```sql
-- Install pg_cron extension (if not already installed)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Check for 30-day inactive users daily at 2 AM UTC
SELECT cron.schedule('reengagement-30-day-check', '0 2 * * *', $$
  SELECT
    http_post(
      'https://[PROJECT-ID].supabase.co/functions/v1/send-reengagement-email',
      json_build_object(
        'user_id', p.id,
        'email_type', 'month-1'
      )::jsonb,
      ('Authorization: Bearer ' || current_setting('app.jwt_token'))::jsonb
    )
  FROM profiles p
  WHERE
    NOT p.unsubscribe_reengagement
    AND p.reengagement_email_1_sent_at IS NULL
    AND EXTRACT(DAY FROM (NOW() - p.created_at)) >= 30
    AND EXTRACT(DAY FROM (NOW() - COALESCE(p.last_login_date, p.created_at))) >= 30
  LIMIT 100;  -- Batch size
$$);

-- Repeat for 90, 180, 365 day checks
```

### Alternative: External Cron (Vercel Crons or similar)

Create a `cron.ts` route in Next.js:

```typescript
// app/api/cron/reengagement/route.ts
export async function GET(req: Request) {
  // Verify secret token
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const emailType = new URLSearchParams(new URL(req.url).search).get("type") || "month-1";

  // Call Supabase function
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-reengagement-email`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_type: emailType,
      batch_run: true,
    }),
  });

  return response;
}
```

Then configure in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/reengagement?type=month-1",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/reengagement?type=month-3",
      "schedule": "0 3 * * *"
    },
    {
      "path": "/api/cron/reengagement?type=month-6",
      "schedule": "0 4 * * *"
    },
    {
      "path": "/api/cron/reengagement?type=month-12",
      "schedule": "0 5 * * *"
    }
  ]
}
```

---

## Testing Strategy

### Pre-Launch Testing

1. **Template Rendering Test**
   - Send test email to yourself
   - Check all breakpoints (mobile, tablet, desktop)
   - Verify all dynamic variables render correctly
   - Check dark mode rendering

2. **Email Client Compatibility**
   - Test in Gmail, Outlook, Apple Mail, mobile Gmail
   - Check for broken images, misaligned text
   - Verify links work correctly

3. **Data Accuracy Test**
   ```bash
   # Manually test with a specific user
   curl -X POST https://[PROJECT-ID].supabase.co/functions/v1/send-reengagement-email \
     -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "user_id": "test-user-id",
       "email_type": "month-1",
       "test_mode": true
     }'
   ```

4. **Unsubscribe Test**
   - Verify unsubscribe links work
   - Confirm `unsubscribe_reengagement` flag is set
   - Test that subsequent emails are not sent

### A/B Testing Setup

Start with Email #1:

```sql
-- Create test cohorts (50/50 split)
UPDATE profiles p
SET email_subject_variant = (
  CASE WHEN (md5(p.id::text)::bit(8)::int % 2 = 0)
  THEN 'A'  -- "{{user.first_name}}, {{tours.new_count}} new birding tours just arrived"
  ELSE 'B'  -- "What's happening on Quorum Tours (you haven't seen yet)"
  END
)
WHERE
  p.created_at < NOW() - INTERVAL '30 days'
  AND p.unsubscribe_reengagement = false
  AND p.reengagement_email_1_sent_at IS NULL;
```

### Performance Tracking

Query `email_log` to track:

```sql
SELECT
  subject_line_variant,
  COUNT(*) as sent,
  COUNT(opened_at) as opens,
  COUNT(opened_at)::float / COUNT(*) as open_rate,
  COUNT(clicked_at) as clicks,
  COUNT(clicked_at)::float / COUNT(*) as ctr
FROM email_log
WHERE template_name = 'reengagement_1month'
GROUP BY subject_line_variant;
```

---

## Monitoring & Alerts

### CloudWatch / Supabase Logs

Monitor for:
- Failed email sends (Resend API errors)
- Users receiving multiple emails
- High bounce rates (>5%)
- High complaint rates (>0.3%)

### Email Deliverability

Use Resend dashboard to monitor:
- Bounce rate
- Spam complaint rate
- Open rates by template
- Click-through rates by link

---

## Compliance & Legal

### CAN-SPAM / GDPR Compliance

✓ Clear unsubscribe mechanism in every email
✓ Accurate "From" address
✓ Plain language subject line
✓ Physical address in footer (add to email footer)
✓ Prompt honor of unsubscribe requests (within 10 days)

### Add to Email Footer

```html
<p style="font-size: 11px; color: #999;">
  Quorum Tours Inc.<br>
  [PHYSICAL ADDRESS]<br>
  Contact: support@quorumtours.com
</p>
```

---

## Rollout Plan

### Phase 1: Internal Testing (Week 1)
- [ ] Deploy Edge Function
- [ ] Register templates in Resend
- [ ] Test with team email addresses
- [ ] Verify data accuracy

### Phase 2: Pilot Cohort (Week 2)
- [ ] Select 100 inactive users (30 days)
- [ ] Send Email #1 to pilot
- [ ] Monitor opens, clicks, bounces
- [ ] Gather feedback from any replies
- [ ] Optimize subject lines if needed

### Phase 3: Full Rollout (Week 3)
- [ ] Enable cron jobs
- [ ] Monitor daily sends
- [ ] Track performance metrics
- [ ] Prepare Email #2 trigger

### Phase 4: Ongoing Monitoring (Ongoing)
- [ ] Weekly performance reviews
- [ ] Monthly cohort analysis
- [ ] Adjust copy based on engagement data
- [ ] Honor unsubscribe requests immediately

---

## Cost Estimate

**Resend Pricing:**
- $20/month for up to 100 emails/day
- Email #1: ~100-200 emails on day 30
- Email #2: ~50-100 emails on day 90
- Email #3: ~25-50 emails on day 180
- Email #4: ~10-25 emails on day 365
- **Total monthly cost: ~$20-30** (well within free tier for early stage)

---

## Success Metrics

**Target Performance (from strategy doc):**

| Metric | Email #1 | Email #2 | Email #3 | Email #4 |
|--------|----------|----------|----------|----------|
| Open rate | 25%+ | 28%+ | 26%+ | 22%+ |
| CTR | 3%+ | 3.5%+ | 3.2%+ | 2.5%+ |
| Login within 30d | 8%+ | 10%+ | 12%+ | 8%+ |
| Commit to tour | 1%+ | 1.5%+ | 2%+ | 1%+ |

**Guardrails:**
- Stop campaign if complaint rate > 0.5%
- Dial back intensity if unsubscribe > 1%
- Monitor support inquiries mentioning "aggressive emails"

---

## Post-Campaign Analysis

After Email #4 completes:

1. **Generate cohort report**
   ```sql
   SELECT
     email_type,
     COUNT(*) as total_sent,
     COUNT(opened_at) as opened,
     COUNT(clicked_at) as clicked,
     COUNT(DISTINCT user_id) as unique_users_who_logged_in
   FROM email_log
   WHERE template_name LIKE 'reengagement%'
   GROUP BY email_type;
   ```

2. **Calculate ROI**
   - Cost per email sent
   - Cost per click
   - Cost per login
   - Cost per new commit
   - Revenue from re-engaged users

3. **Iterate**
   - Identify highest/lowest performing emails
   - Update copy for next cohort
   - Test new subject lines
   - Expand to other inactive segments

