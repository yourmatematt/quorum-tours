# Re-Engagement Email Series: Quick Reference

## Campaign at a Glance

**Purpose:** Reactivate users who signed up but never logged in
**Target:** Birders aged 45-70
**Approach:** Authentic FOMO based on real tour data
**Duration:** 1 year (30/90/180/365 day triggers)

---

## The 4 Emails

| # | When | Tone | Hook | Subject | Key Message |
|---|------|------|------|---------|------------|
| 1 | Day 30 | Helpful | Soft | "{{tours.new_count}} new tours" | Reintroduce value |
| 2 | Day 90 | Direct | Medium | "{{region}} tours. Real birds spotted" | Regional proof |
| 3 | Day 180 | Factual | Strong | "You missed {{lifers}} lifers. Proof inside." | Specific sightings |
| 4 | Day 365 | Candid | Maximum | "12 lifers. 47 tours. 0 with you." | Year in review |

---

## Core Principle: Authentic FOMO

✓ Real tours that ran
✓ Real birds spotted
✓ Real participant counts
✓ Real sighting reports
✓ Real regional data

✗ NO fake scarcity
✗ NO manufactured urgency
✗ NO dark patterns
✗ NO manipulative language

---

## Dynamic Personalization

Every email includes:
- User's first name
- User's region
- Count of tours added since signup
- Count of tours in their region
- Specific bird sightings from their region
- Participant counts
- Links to sighting reports

---

## Subject Lines (A/B Tested)

### Email #1
**A:** "{{user.first_name}}, {{tours.new_count}} new birding tours just arrived"
**B:** "What's happening on Quorum Tours (you haven't seen yet)"
**C:** "Your birding app is waiting"

### Email #2
**A:** "8 birders spotted {{bird}} in {{region}}. You could have been there."
**B:** "{{region_count}} tours ran in {{region}} while you were gone"
**C:** "{{tours.region_count}} {{region}} tours. {{sightings}} sightings you missed."

### Email #3
**A:** "You missed {{lifers}} potential lifers in {{region}}. Here's proof."
**B:** "A {{bird}} was spotted on {{date}}. {{participants}} people saw it. You didn't."
**C:** "{{missed_tours}} tours. 0 with you on them."

### Email #4
**A:** "12 lifers. 47 tours. 0 with you."
**B:** "Your year in review: 0 birds seen on Quorum Tours"
**C:** "One year later. Still haven't logged in?"

---

## File Manifest

```
docs/email-templates/
├── RE-ENGAGEMENT-SERIES.md          [Full strategy document]
├── email-1-month-inactive.html      [Day 30 template]
├── email-3-months-inactive.html     [Day 90 template]
├── email-6-months-inactive.html     [Day 180 template]
├── email-12-months-inactive.html    [Day 365 template]
├── PLAINTEXT-VERSIONS.md            [Text fallbacks for all 4]
├── IMPLEMENTATION-GUIDE.md          [Technical setup steps]
├── STRATEGY-SUMMARY.md              [Strategic overview]
└── QUICK-REFERENCE.md               [This file]
```

---

## Implementation Checklist

### Pre-Launch (Week 1)
- [ ] Add columns to `profiles` table (last_login_date, reengagement_email_X_sent_at, unsubscribe_reengagement)
- [ ] Create `email_log` table for tracking
- [ ] Deploy `send-reengagement-email` Edge Function
- [ ] Register 4 templates in Resend dashboard
- [ ] Get template IDs from Resend

### Testing (Week 2)
- [ ] Test Email #1 with 10 team members
- [ ] Verify HTML rendering in Gmail, Outlook, Apple Mail
- [ ] Check mobile rendering at 375px width
- [ ] Test unsubscribe flow
- [ ] Verify all dynamic variables populate correctly

### Pilot (Week 2-3)
- [ ] Send Email #1 to 100 inactive users
- [ ] Monitor opens, clicks, bounces for 7 days
- [ ] Collect feedback from any replies
- [ ] Analyze which subject line (A/B) performs better

### Full Rollout (Week 3+)
- [ ] Enable cron jobs for all 4 email triggers
- [ ] Start sending Email #1 to all inactive users
- [ ] Schedule Email #2 for 90-day trigger
- [ ] Monitor daily performance metrics
- [ ] Prepare for Email #2 launch

### Ongoing
- [ ] Weekly performance review (opens, CTR, logins)
- [ ] Monthly cohort analysis
- [ ] Honor unsubscribe requests within 24 hours
- [ ] Track A/B test results

---

## Success Metrics

### Target Performance

| Metric | Email #1 | Email #2 | Email #3 | Email #4 |
|--------|----------|----------|----------|----------|
| Open rate | 25%+ | 28%+ | 26%+ | 22%+ |
| Click rate | 3%+ | 3.5%+ | 3.2%+ | 2.5%+ |
| Login rate (30d) | 8%+ | 10%+ | 12%+ | 8%+ |
| Commit rate | 1%+ | 1.5%+ | 2%+ | 1%+ |

### Red Flags

Stop/pause if:
- Complaint rate > 0.5%
- Unsubscribe rate > 1%
- Open rate < 15%
- Bounce rate > 5%

---

## Dynamic Variables Reference

```
{{user.first_name}}           // "John"
{{user.email}}                // "john@example.com"
{{user.region}}               // "Gulf Coast", "Rocky Mountains", etc.
{{user.signup_date}}          // "January 2024"

{{tours.new_count}}           // 47
{{tours.region_count}}        // 14
{{tours.missed_count}}        // 47

{{sightings.lifers_count}}    // 12
{{sightings.region_examples[0].bird_name}}    // "Painted Bunting"
{{sightings.region_examples[0].tour_title}}   // "Gulf Coast Spring Chase"
{{sightings.region_examples[0].tour_date}}    // "May 15, 2024"
{{sightings.region_examples[0].participants}} // 8

{{chase_list.spotted}}        // 12

{{stats.year_in_review.total_tours}}          // 47
{{stats.year_in_review.total_sightings}}      // 284
{{stats.year_in_review.new_lifers}}           // 12
{{stats.year_in_review.top_region}}           // "Gulf Coast"
{{stats.year_in_review.rarest_sighting}}      // "Painted Bunting"

{{unsubscribe_link}}          // Full unsubscribe URL
```

---

## Integration Points

### Resend Configuration
- Domain: quorumtours.com (already verified)
- From: tours@quorumtours.com
- API Key: RESEND_API_KEY (environment variable)

### Database Tables
- `profiles` - Add 5 new columns
- `email_log` - Track sends, opens, clicks
- `tours` - Source for tour stats
- `tour_sightings` - Source for bird data

### Edge Functions
- `send-reengagement-email` - Main handler
- `process-unsubscribe` - Handle opt-outs

### Cron Jobs
- 30-day check: Daily at 2:00 AM UTC
- 90-day check: Daily at 3:00 AM UTC
- 180-day check: Daily at 4:00 AM UTC
- 365-day check: Daily at 5:00 AM UTC

---

## Common Issues & Solutions

### Issue: Email doesn't render correctly
**Solution:** Test in Email on Acid (emailonacid.com) before full rollout

### Issue: Dynamic variables show as {{placeholder}}
**Solution:** Check Resend template variable syntax uses handlebars format

### Issue: Low open rates
**Solution:** Review subject lines, test different approaches with next cohort

### Issue: High unsubscribe rate
**Solution:** Dial back FOMO language in next cohort, add preference center

### Issue: Users clicking but not logging in
**Solution:** A/B test CTA button text ("Log In" vs "Explore Tours" vs "See What You Missed")

---

## Cost & ROI

**Estimated monthly cost:** $20-50 (Resend)

**Expected re-engagement rate:** 8-12% login, 1-2% commit

**Revenue impact (5,000 inactive users):**
- Email #1: 40-50 logins, 4-5 commits
- Email #2: 50-60 logins, 7-10 commits
- Email #3: 60-70 logins, 12-15 commits
- Email #4: 30-40 logins, 3-5 commits
- **Total:** 180-220 new commits, $5,000-11,000 revenue
- **ROI:** 100-500x

---

## Next Steps

1. **This week:** Set up Supabase schema
2. **Next week:** Deploy Edge Function & Resend templates
3. **Week 3:** Pilot test with 100 users
4. **Week 4:** Full rollout with cron jobs
5. **Month 2:** Analyze results & prepare Email #2
6. **Ongoing:** A/B test & optimize

---

## Support & Questions

All strategic details: **RE-ENGAGEMENT-SERIES.md**
All technical details: **IMPLEMENTATION-GUIDE.md**
Strategic overview: **STRATEGY-SUMMARY.md**

Resend docs: https://resend.com/docs
Supabase Edge Functions: https://supabase.com/docs/guides/functions

