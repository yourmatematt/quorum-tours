# Quorum Tours: Re-Engagement Email Series

**Target Audience:** Birders aged 45-70 who signed up but haven't logged in
**Campaign Goal:** Reactivate dormant users through authentic FOMO based on real tours and sightings
**Key Principle:** No fake urgency. All FOMO is rooted in actual tours, sightings, and regional missed opportunities.

---

## Campaign Overview

| Email | Trigger | Days Inactive | Tone | Hook Level | Primary Goal |
|-------|---------|---------------|------|------------|--------------|
| #1 | 30 days no login | 30 | Gentle, helpful | Soft | Reintroduce value |
| #2 | 90 days no login | 90 | Direct, curious | Medium | Regional relevance |
| #3 | 180 days no login | 180 | Factual, FOMO | Strong | Specific sightings |
| #4 | 365 days no login | 365 | Candid, final | Maximum | Year-in-review |

---

## Dynamic Content Placeholders

All emails use these variables for personalization:

```
User Data:
{{user.first_name}}
{{user.email}}
{{user.region}}           // e.g., "Gulf Coast", "Rocky Mountains"
{{user.signup_date}}      // e.g., "January 2024"

Tour & Sighting Data:
{{tours.new_count}}       // Count added since signup
{{tours.region_count}}    // Tours in their region since signup
{{sightings.lifers_count}}    // New lifer-potential sightings
{{sightings.region_examples}} // JSON array of 2-3 notable sightings
{{tours.missed_count}}    // Total tours they could have joined
{{chase_list.spotted}}    // Count of species from their chase list spotted
{{stats.year_in_review}}  // Year summary object

Example sightings array structure:
[
  {
    "bird_name": "Painted Bunting",
    "tour_region": "Gulf Coast",
    "tour_date": "May 2024",
    "participants": 8,
    "tour_title": "Gulf Coast Spring Warbler Chase"
  },
  {
    "bird_name": "Cerulean Warbler",
    "tour_region": "Appalachian",
    "tour_date": "June 2024",
    "participants": 5,
    "tour_title": "Breeding Warbler Survey - Central PA"
  }
]

Year in review object:
{
  "total_tours": 47,
  "total_sightings": 284,
  "new_lifers": 12,
  "top_region": "Gulf Coast",
  "rarest_sighting": "Painted Bunting",
  "most_popular_tour": "Spring Migration Blitz"
}
```

---

## Email #1: 1 Month Inactive
**Subject of series:** The gentle reminder
**Send:** 30 days after signup with no login

### Subject Lines (A/B Test)

**A (Helpful):** "{{user.first_name}}, {{tours.new_count}} new birding tours just arrived"

**B (Curious):** "What's happening on Quorum Tours (you haven't seen yet)"

**C (Direct):** "Your birding app is waiting"

### Preview Text
"We've added {{tours.new_count}} tours since you joined. Here's what you can explore right now."

### Body Copy

---

**From:** Quorum Tours `<tours@quorumtours.com>`
**To:** {{user.email}}

---

Hi {{user.first_name}},

We noticed you haven't logged into Quorum Tours since {{user.signup_date}}. No judgment—we know life gets busy. But a lot has happened since you signed up.

**Here's what's new:**

Since you joined, we've added {{tours.new_count}} tours across your region. {{tours.region_count}} of them are in {{user.region}}—the exact area you'd want to explore.

Some highlights:

- **Search by species.** You can now filter tours by the exact birds you're chasing. If you're looking for a Scarlet Tanager, Prothonotary Warbler, or any other target, you can find tours specifically designed around them.

- **Real sightings.** Every tour comes with a review showing exactly what was spotted. You can see participant reviews and photos—real data from real tours.

- **Your region's schedule.** {{tours.region_count}} tours are planned for {{user.region}} over the next few months. That's {{tours.region_count}} opportunities to get out there.

**What can you do right now?**

Log back in and browse tours in your area. When you commit to a tour, that's when the commitment system kicks in—but you can explore, filter, and plan without any pressure.

[LOG IN AND EXPLORE TOURS]
Button: #2E8B57 (forest green)
Link: https://quorumtours.com/tours

Questions about how the platform works? Check out our [How It Works] page.

Happy birding,
**The Quorum Tours Team**

---

P.S. — You can check the tours running in {{user.region}} without logging in. Browse first, commit when you find something you love.

---

## Email #2: 3 Months Inactive
**Subject of series:** The medium-heat regional hook
**Send:** 90 days after signup with no login

### Subject Lines (A/B Test)

**A (Specific):** "8 birders spotted {{sightings.region_examples[0].bird_name}} in {{user.region}}. You could have been there."

**B (Data-driven):** "{{tours.region_count}} tours ran in {{user.region}} while you were gone"

**C (FOMO, factual):** "{{tours.region_count}} {{user.region}} tours. {{tours.region_count}} sightings you missed."

### Preview Text
"Real tours, real birds. {{tours.region_count}} happened in your area since you joined."

### Body Copy

---

**From:** Quorum Tours `<tours@quorumtours.com>`
**To:** {{user.email}}

---

Hi {{user.first_name}},

Three months ago, you signed up for Quorum Tours. Since then, {{tours.region_count}} tours have run successfully in {{user.region}}. And they all produced real sightings from real birders.

**What ran while you were away:**

**{{sightings.region_examples[0].bird_name}}** was spotted on the {{sightings.region_examples[0].tour_title}} in {{sightings.region_examples[0].tour_date}}. {{sightings.region_examples[0].participants}} birders saw it.

**{{sightings.region_examples[1].bird_name}}** was documented on another {{user.region}} tour last month. Participants posted photos. The sighting report is live on the platform.

These aren't theoretical tours. These are real trips that ran with real birders who found real birds—in the area you're interested in.

**How the quorum system works (a reminder):**

Quorum Tours is different from typical booking platforms. Tours only confirm when enough birders commit. This solves a real problem: small groups (4-5 people) rarely happen on traditional platforms, but they're actually when good birding *happens*. You see more, discuss more, move more deliberately.

When you commit to a tour, you're joining a group that *will* go. No tour leaves if it doesn't have enough people. That's the quorum: the minimum number of participants needed to make a tour viable.

**Why this matters for {{user.region}}:**

{{user.region}} is a prime birding zone right now, and tours are filling up. {{tours.region_count}} have run successfully since you joined. More are scheduled for the coming months.

If you're serious about adding {{user.region}} birds to your list, now's the time to get back in.

[BROWSE TOURS IN {{user.region}}]
Button: #2E8B57
Link: https://quorumtours.com/tours?region={{user.region}}

Have questions about how commitments work? Read our [How It Works] guide.

Happy birding,
**The Quorum Tours Team**

---

P.S. — If you're waiting for a specific tour in {{user.region}}, reach out. We can help you find (or request) exactly what you're looking for.

---

## Email #3: 6 Months Inactive
**Subject of series:** The strong FOMO hook (but factual)
**Send:** 180 days after signup with no login

### Subject Lines (A/B Test)

**A (Stark, honest):** "You missed {{sightings.lifers_count}} potential lifers in {{user.region}}. Here's proof."

**B (Specific sighting):** "A {{sightings.region_examples[0].bird_name}} was spotted on {{sightings.region_examples[0].tour_date}}. {{sightings.region_examples[0].participants}} people saw it. You didn't."

**C (Numbers):** "{{tours.missed_count}} tours. 0 with you on them."

### Preview Text
"Real sightings from real tours in {{user.region}}. You weren't there."

### Body Copy

---

**From:** Quorum Tours `<tours@quorumtours.com>`
**To:** {{user.email}}

---

Hi {{user.first_name}},

Six months. That's how long it's been since you signed up for Quorum Tours.

In that time, {{tours.missed_count}} tours ran successfully across the platform. {{tours.region_count}} of them were in {{user.region}}—your region. And they all found birds.

**Here's what actually got spotted:**

A **{{sightings.region_examples[0].bird_name}}** was documented on {{sightings.region_examples[0].tour_date}} on the {{sightings.region_examples[0].tour_title}}.
**{{sightings.region_examples[0].participants}} birders were there.** You weren't.

Sighting report: [VIEW REPORT]
Link: https://quorumtours.com/tours/[tour-id]/reviews

A **{{sightings.region_examples[1].bird_name}}** was spotted in the same region a month later. {{sightings.region_examples[1].participants}} participants. Real photos. Real notes. All documented.

If you had been on either of these tours—if you had a spot and had committed—you would have seen these birds firsthand.

**Your chase list could have grown.**

We don't know your specific target species, but if you had a chase list when you signed up, birds from it were almost certainly spotted on tours you could have joined.

This isn't about the tours that *might* happen. This is about the tours that *did* happen. The sightings are real. The photos are there. The participants' notes are live on the platform.

And you weren't there.

**What happens next is up to you.**

You can log back in right now. Browse tours in {{user.region}}. Read what people saw. Check upcoming trips. The quorum system means you're never paying for a tour that won't happen—only tours with confirmed participant numbers go forward.

Or you can keep checking your email in another six months, wondering what you missed this time.

[LOG IN AND SEE WHAT YOU MISSED]
Button: #2E8B57
Link: https://quorumtours.com/login

Questions? [How It Works] explains everything.

Happy birding,
**The Quorum Tours Team**

---

P.S. — If you're still interested but uncertain about the platform, reach out. We're happy to explain how the quorum system works and why it actually means better birding trips for everyone.

---

## Email #4: 12 Months Inactive
**Subject of series:** The final, maximum-intensity hook
**Send:** 365 days after signup with no login

### Subject Lines (A/B Test)

**A (Maximum FOMO):** "12 lifers. 47 tours. 0 with you."

**B (Year in review):** "Your year in review: 0 birds seen on Quorum Tours"

**C (Direct):** "One year later. Still haven't logged in?"

### Preview Text
"A year on Quorum Tours. Here's everything you didn't see."

### Body Copy

---

**From:** Quorum Tours `<tours@quorumtours.com>`
**To:** {{user.first_name}}

---

Hi {{user.first_name}},

Exactly one year ago today, you signed up for Quorum Tours.

You never came back.

**Here's what happened in the year you were gone:**

{{stats.year_in_review.total_tours}} tours ran across the platform.
{{stats.year_in_review.total_sightings}} birds were spotted by participants.
{{stats.year_in_review.new_lifers}} of them were lifers.

In {{user.region}}?
{{tours.region_count}} tours.
{{sightings.lifers_count}} potential lifers spotted.

**Not a single one with you.**

**The specific birds you could have seen:**

**{{sightings.region_examples[0].bird_name}}** — Spotted {{sightings.region_examples[0].tour_date}} on the {{sightings.region_examples[0].tour_title}}. {{sightings.region_examples[0].participants}} people saw it in person. Reviewed and documented on our platform.

**{{sightings.region_examples[1].bird_name}}** — {{sightings.region_examples[1].tour_date}}, {{user.region}}, {{sightings.region_examples[1].participants}} participants. Real sightings. Real photos. Real memories you don't have.

**The bigger picture:**

If you had a chase list when you signed up:
**{{chase_list.spotted}} species from it were spotted on tours** between now and then.

That's {{chase_list.spotted}} ticks you don't have.

{{chase_list.spotted}} reasons you might be frustrated with yourself right now.

**Why am I sending this?**

Because a year is a long time. Because you clearly had interest in birding when you signed up. And because the platform is genuinely better than when you joined—more tours, better reviews, real data on what gets spotted where.

And because you're missing out on real experiences with real birders in real places.

**One more option:**

Log in. Browse what's coming next. See a tour that speaks to you. Commit. That's it. The quorum system means the tour only charges you when it reaches minimum participants. You're never stuck paying for something that might not happen.

You've been away a year. The platform is ready whenever you are.

[LOG IN AND GET BACK IN THE FIELD]
Button: #2E8B57
Link: https://quorumtours.com/login

Or if you'd rather not come back—that's okay too. Hit reply and let us know. We'll remove you from future emails.

Happy birding (or at least, the chance to go),
**The Quorum Tours Team**

---

P.S. — No hard feelings. We know life happens. But you signed up for a reason. That reason probably hasn't changed. Log back in.

---

## Implementation Notes

### Email Rendering & Testing

- **Template engine:** Resend with React Email components (or raw HTML)
- **Rendering:** All templates must be tested in:
  - Gmail (desktop, mobile)
  - Outlook (desktop)
  - Apple Mail
  - Mobile Gmail, Apple Mail
- **Fallback:** Plain text versions for all emails

### Sending Schedule

```
User Signs Up → No login detected
  ↓
30 days no login → Send Email #1
  ↓
If still inactive, +60 days (90 total) → Send Email #2
  ↓
If still inactive, +90 days (180 total) → Send Email #3
  ↓
If still inactive, +185 days (365 total) → Send Email #4
  ↓
If still inactive → Remove from list or move to quarterly digest
```

### Unsubscribe & Preference Management

- Every email includes unsubscribe link (legal requirement)
- After Email #4, honor full unsubscribe
- Consider: Post-Email #4 users → optional quarterly digest ("What happened on Quorum Tours")

### Data Requirements for Dynamic Content

The email system needs access to:

1. **User profile:** First name, email, region, signup date
2. **Tour data:**
   - Count of tours added since user signup
   - Count of tours in user's region since signup
   - List of tours user could have joined (not on wait list)
3. **Sighting data:**
   - Top 2-3 sightings from tours in user's region (with tour title, date, participant count)
   - Lifer count from tours in user's region
4. **Chase list cross-reference** (if available):
   - Count of birds from user's chase list spotted on tours
5. **Year-in-review stats:**
   - Total tours run
   - Total sightings documented
   - Total lifers spotted
   - Top region
   - Rarest sighting

### Compliance & Tone Guardrails

- No fake scarcity ("Only 2 spots left!") unless literally true
- No false urgency ("Sign up before midnight!") unless tour actually closes
- All FOMO is rooted in documented sightings and real tours
- No manipulative language (dark patterns forbidden)
- Tone remains respectful and honest even at "maximum" hook level

---

## A/B Testing Strategy

### Test Schedule

**Phase 1 (Email #1):**
- Split test A vs. B subject lines
- Track: Open rate, click-through rate, login rate
- Duration: 7 days, then send version C to non-openers
- Winner: Use for replication to future cohorts

**Phase 2 (Email #2):**
- A/B: Geographic specificity (Email A names specific bird, Email B names count)
- Track: Open, CTR, login rate
- Variant: Include one vs. two sighting examples

**Phase 3 (Email #3):**
- Test: Tone intensity (B is harsher than A)
- Track: Open, CTR, login rate, complaint rate
- If complaint rate > 0.5%, dial back to A

**Phase 4 (Email #4):**
- Single send (subject line A is the winner from earlier tests)
- Track: Open, CTR, login rate, unsubscribe rate

### Key Metrics

| Metric | Goal | Action if Below |
|--------|------|-----------------|
| Open rate (Email #1) | 25%+ | Soften subject line |
| Click-through rate | 3%+ | Add more specific CTA or sighting data |
| Login rate (30 days post-send) | 8%+ | Rethink value proposition |
| Unsubscribe rate | <0.8% | Tone is too aggressive |
| Complaint rate ("This is spam") | <0.3% | Check subject line accuracy |

---

## Examples: Populated Emails

### Example Email #3 Fully Populated

**Recipient:** Sarah Mitchell, signed up January 2024, based in Gulf Coast

---

**Subject:** "You missed 3 potential lifers in the Gulf Coast. Here's proof."

**From:** Quorum Tours `<tours@quorumtours.com>`

---

Hi Sarah,

Six months. That's how long it's been since you signed up for Quorum Tours.

In that time, 47 tours ran successfully across the platform. 14 of them were in the Gulf Coast—your region. And they all found birds.

**Here's what actually got spotted:**

A **Painted Bunting** was documented on May 15th on the Gulf Coast Spring Warbler Chase.
**8 birders were there.** You weren't.

Sighting report: [VIEW REPORT]

A **Cerulean Warbler** was spotted in the same region a month later. 5 participants. Real photos. Real notes. All documented.

If you had been on either of these tours—if you had a spot and had committed—you would have seen these birds firsthand.

**Your chase list could have grown.**

We don't know your specific target species, but if you had a chase list when you signed up, birds from it were almost certainly spotted on tours you could have joined.

This isn't about the tours that *might* happen. This is about the tours that *did* happen. The sightings are real. The photos are there. The participants' notes are live on the platform.

And you weren't there.

**What happens next is up to you.**

You can log back in right now. Browse tours in the Gulf Coast. Read what people saw. Check upcoming trips. The quorum system means you're never paying for a tour that won't happen—only tours with confirmed participant numbers go forward.

Or you can keep checking your email in another six months, wondering what you missed this time.

[LOG IN AND SEE WHAT YOU MISSED]

Questions? [How It Works] explains everything.

Happy birding,
**The Quorum Tours Team**

---

P.S. — If you're still interested but uncertain about the platform, reach out. We're happy to explain how the quorum system works and why it actually means better birding trips for everyone.

---

## Notes for Implementation

### Email Service Integration (Resend)

Add to `supabase/functions/send-email/index.ts`:

```typescript
// Re-engagement campaign logic
async function checkAndSendReengagementEmail(userId: string) {
  const user = await getUser(userId);
  const lastLogin = await getLastLoginDate(userId);
  const daysSinceSignup = getDaysBetween(user.created_at, new Date());

  if (daysSinceSignup === 30 && !hasLoggedIn(user)) {
    return await sendEmail(userId, 'reengagement-1-month');
  }

  if (daysSinceSignup === 90 && !hasLoggedIn(user)) {
    return await sendEmail(userId, 'reengagement-3-months');
  }

  // ... etc
}
```

Trigger via scheduled function or database trigger when 30/90/180/365 day intervals are reached.

---

## Success Metrics & Guardrails

**Success = login + tour browse (not necessarily commit on first re-engagement)**

| Metric | Email #1 Target | Email #2 Target | Email #3 Target | Email #4 Target |
|--------|-----------------|-----------------|-----------------|-----------------|
| Open rate | 25% | 28% | 26% | 22% |
| CTR | 3% | 3.5% | 3.2% | 2.5% |
| Login within 30d | 8% | 10% | 12% | 8% |
| Commit to tour | 1% | 1.5% | 2% | 1% |

**Guardrails:**
- If complaint rate exceeds 0.5%, pause campaign pending review
- If unsubscribe rate exceeds 1%, reduce FOMO intensity
- Monitor manual support inquiries mentioning "aggressive emails"

