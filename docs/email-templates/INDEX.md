# Quorum Tours Email Templates — Complete Index

**Version:** 1.0
**Last Updated:** 2026-01-25
**Status:** Production-Ready

---

## Quick Start

1. **Read first:** [`BRAND_VOICE_GUIDE.md`](BRAND_VOICE_GUIDE.md) — Understand the voice and tone
2. **Review structure:** [`README.md`](README.md) — Overview of all 14 emails and design philosophy
3. **For implementation:** [`IMPLEMENTATION_GUIDE.md`](IMPLEMENTATION_GUIDE.md) — Technical setup and database mappings
4. **Email templates:** Individual `.md` files (01-14)

---

## Email Templates (14 Total)

### User-Facing Emails (9)

#### Confirmation & Onboarding
- **[`01-welcome.md`](01-welcome.md)** — New user signup
  Subject: _Welcome to Quorum Tours — Here's how it works_

- **[`02-tour_committed.md`](02-tour_committed.md)** — User commits to forming tour
  Subject: _Your commitment to [TOUR_NAME] is confirmed_

- **[`05-payment_confirmed.md`](05-payment_confirmed.md)** — Balance payment received
  Subject: _Your booking is confirmed — [TOUR_NAME]_

#### Decision & Action
- **[`03-quorum_reached.md`](03-quorum_reached.md)** — Tour reaches quorum, 24-hr payment deadline
  Subject: _Tour confirmed — Pay within 24 hours_

- **[`04-payment_reminder.md`](04-payment_reminder.md)** — 12 hours before payment deadline
  Subject: _Reminder: Pay by [DEADLINE_TIME] or lose your spot_

- **[`07-waitlist_spot.md`](07-waitlist_spot.md)** — Spot available from cancellation
  Subject: _A spot just opened up on [TOUR_NAME] — Claim it within 24 hours_

#### System Events & Communication
- **[`06-strike_applied.md`](06-strike_applied.md)** — User missed payment deadline
  Subject: _Your account has received a strike_

- **[`08-tour_cancelled.md`](08-tour_cancelled.md)** — Tour doesn't reach quorum
  Subject: _[TOUR_NAME] did not reach quorum_

- **[`09-tour_reminder.md`](09-tour_reminder.md)** — 48 hours before tour date
  Subject: _Your tour is in 2 days — [TOUR_NAME]_

---

### Operator-Facing Emails (5)

#### Booking & Confirmation
- **[`10-new_booking.md`](10-new_booking.md)** — New user commits to operator's tour
  Subject: _New commitment on [TOUR_NAME]_

- **[`11-quorum_reached_operator.md`](11-quorum_reached_operator.md)** — Tour reaches quorum
  Subject: _[TOUR_NAME] has reached quorum_

- **[`13-tour_confirmed.md`](13-tour_confirmed.md)** — All participants have paid
  Subject: _[TOUR_NAME] — All payments received. Tour is confirmed._

#### System Events
- **[`12-deposit_forfeited.md`](12-deposit_forfeited.md)** — User missed payment deadline
  Subject: _Deposit received — [BIRDER_NAME] missed payment deadline_

- **[`14-payout_sent.md`](14-payout_sent.md)** — Tour completed, payout processed
  Subject: _Your payout for [TOUR_NAME] has been transferred_

---

## Documentation Files

### [`README.md`](README.md) — Master Documentation
**Contains:** Design philosophy, email inventory, terminology, testing checklist, common pitfalls

**Key sections:**
- Design philosophy (what these emails are and aren't)
- Brand voice principles (5 core tenets)
- Complete email inventory with metadata
- Trust system terminology (consistent language)
- Testing checklist
- Common pitfalls to avoid
- Localization notes

**When to use:** Reference when creating new emails or understanding the overall strategy

---

### [`BRAND_VOICE_GUIDE.md`](BRAND_VOICE_GUIDE.md) — Voice & Tone Standards
**Contains:** Detailed voice guidance, prohibited language, tone by context, accessibility

**Key sections:**
- 5 voice pillars (clarity, institutional trust, honesty, specificity, explicit confirmation)
- Prohibited language (vague promises, artificial urgency, emotional manipulation)
- What to use instead (specific alternatives)
- Tone in different contexts (deposits, deadlines, celebrations, consequences)
- Consistency guidelines (terminology, formatting, structure)
- Personalization strategy
- Common mistakes
- Accessibility & inclusivity
- Sign-off guidelines
- Pre-send checklist

**When to use:** Reference when writing or editing email copy to ensure consistent voice

---

### [`IMPLEMENTATION_GUIDE.md`](IMPLEMENTATION_GUIDE.md) — Technical Setup
**Contains:** Database fields, template rendering, logic, ESP configuration

**Key sections:**
- Email trigger map (14 emails, triggers, timing, priority)
- Database fields required (by entity type)
- Template rendering checklist
- Key content mappings (deposit logic, balance calculations, commission math)
- Testing strategy (unit, integration, manual QA)
- Common placeholder values (dates, amounts, numbers)
- ESP configuration (SendGrid example)
- Compliance notes (GDPR, email best practices, accessibility)
- Monitoring & analytics

**When to use:** Reference when implementing email delivery system and integrating with backend

---

## Design Principles

All 14 emails follow these core principles:

1. **Clarity over persuasion.** State what's happening, not what you want them to feel.
2. **Trust as the foundation.** Be honest about friction, explain the why, offer appeal paths.
3. **No marketing hype.** No "seamless," "unlock," "elevate," or fake urgency.
4. **Institutional tone.** Professional but warm, like a trusted advisor.
5. **Specific over generic.** Include concrete details: dates, amounts, names, locations.

---

## Terminology (Use Consistently)

| Term | Definition | Not this |
|------|-----------|----------|
| Deposit | Amount held by user, applied to tour price, forfeited if payment deadline missed | Security deposit, commitment fee |
| Quorum | Minimum participants needed for tour to run | Minimum, threshold, target |
| Commitment | User agrees to join tour if quorum is reached | Booking, registration, enrollment |
| Strike | Account mark for missed payment; impacts future deposit requirements | Violation, mark, flag |
| Tour confirms | Tour reaches quorum and is guaranteed to run | Tour locked in, tour secured |
| Forfeited | Deposit lost to operator for missed payment (minus 3% fee) | Charged, taken, penalty |

---

## Email Triggers & Timing

### Critical/Immediate Triggers
- `welcome` — Immediately after signup
- `tour_committed` — Immediately after commitment
- `quorum_reached` — Immediately when quorum reached
- `quorum_reached_operator` — Immediately when quorum reached
- `payment_confirmed` — Immediately upon successful charge
- `strike_applied` — Immediately after deadline passes
- `deposit_forfeited` — Immediately after deadline passes
- `new_booking` — Immediately after user commitment
- `waitlist_spot` — Immediately when spot opens

### Scheduled Triggers
- `payment_reminder` — 12 hours before deadline
- `tour_cancelled` — End of day on commitment deadline
- `tour_reminder` — 48 hours before tour date
- `payout_sent` — 1-2 business days after tour completion

---

## Key Numbers & Details

### Deposit Math
- **New/Strike 1 users:** Operator-set amount
- **Strike 2 users:** 50% of tour price (system-enforced)
- **Trusted users:** No deposit required
- **Platform fee on forfeited deposits:** 3% (operator receives 97%)

### Deadlines
- **Payment deadline after quorum:** 24 hours (non-negotiable)
- **Payment reminder:** 12 hours before deadline
- **Tour reminder:** 48 hours before tour date
- **Waitlist claim deadline:** 24 hours from offer
- **Strike appeal window:** Contact support immediately

### Strike Progression
- **Strike 1:** Operator-set deposit required on next booking
- **Strike 2:** 50% deposit required on all bookings
- **Strike 3+:** Account suspended, cannot book

---

## Quality Assurance Checklist

Before deploying any email:

- [ ] Subject line is clear and specific (not clickbait)
- [ ] All dynamic placeholders use `[BRACKET]` notation
- [ ] Dates formatted as "Month DD, YYYY" (March 15, 2026)
- [ ] Times formatted as "H:MM AM/PM" (2:15 PM)
- [ ] Currency formatted as "$XXX.XX" ($189.00)
- [ ] Deadline includes date AND time (never just "24 hours")
- [ ] Consequences are stated clearly but not threateningly
- [ ] No prohibited language (vague, hype, manipulation)
- [ ] Tone is institutional, not casual or trendy
- [ ] Support/help path is clear
- [ ] Email is scannable (short paragraphs, bold emphasis)
- [ ] Works on mobile (375px width)
- [ ] No spelling or grammar errors

---

## File Structure

```
docs/email-templates/
├── INDEX.md                           # This file
├── README.md                          # Master documentation (26 KB)
├── BRAND_VOICE_GUIDE.md              # Voice & tone standards (15 KB)
├── IMPLEMENTATION_GUIDE.md           # Technical setup (9.5 KB)
│
├── 01-welcome.md                     # User signup
├── 02-tour_committed.md              # User commits
├── 03-quorum_reached.md              # Tour reaches quorum
├── 04-payment_reminder.md            # 12 hrs before deadline
├── 05-payment_confirmed.md           # Payment received
├── 06-strike_applied.md              # Missed payment
├── 07-waitlist_spot.md               # Waitlist offer
├── 08-tour_cancelled.md              # Tour doesn't run
├── 09-tour_reminder.md               # 48 hrs before tour
│
├── 10-new_booking.md                 # Operator: new commitment
├── 11-quorum_reached_operator.md     # Operator: quorum reached
├── 12-deposit_forfeited.md           # Operator: missed payment
├── 13-tour_confirmed.md              # Operator: all paid
└── 14-payout_sent.md                 # Operator: earnings sent
```

---

## Implementation Roadmap

### Phase 1: Setup (Week 1)
- [ ] Configure email service provider (SendGrid/Mailgun)
- [ ] Set up email templates in ESP
- [ ] Map database fields to placeholders
- [ ] Create test data set

### Phase 2: Integration (Weeks 2-3)
- [ ] Wire up email triggers to backend
- [ ] Implement scheduling (payment_reminder, tour_cancelled, etc.)
- [ ] Test each email flow end-to-end
- [ ] Set up email logging and monitoring

### Phase 3: QA (Week 4)
- [ ] Manual testing on all email clients
- [ ] Mobile/desktop responsive testing
- [ ] Dark mode testing
- [ ] Spam compliance checks (DKIM, SPF, DMARC)

### Phase 4: Launch & Monitor (Week 5+)
- [ ] Deploy to production
- [ ] Monitor delivery and bounce rates
- [ ] Track open/click rates
- [ ] Collect user feedback
- [ ] Iterate on copy if needed

---

## Common Questions

### Q: Can I add a marketing email to this list?
**A:** No. These are transactional emails only. Marketing emails belong in a separate system with different unsubscribe mechanics.

### Q: What if I need to personalize beyond the templates?
**A:** See BRAND_VOICE_GUIDE.md section "Personalization Strategy." Only personalize data, not tone/voice.

### Q: Can I change the copy to be more marketing-focused?
**A:** No. This conflicts with the Quorum brand principle of radical clarity and anti-marketing. All copy must follow BRAND_VOICE_GUIDE.md.

### Q: What if a deadline needs to be extended?
**A:** The 24-hour payment deadline is not extensible by policy. If a user contacts support about extenuating circumstances, they can appeal their strike afterward.

### Q: How do I handle edge cases (tour oversells, double bookings, etc.)?
**A:** Those warrant new emails. Create them following the templates and voice guide, then add to this documentation.

---

## Support & Maintenance

### Questions about copy/voice?
Reference: `BRAND_VOICE_GUIDE.md`

### Questions about implementation/technical setup?
Reference: `IMPLEMENTATION_GUIDE.md`

### Questions about system mechanics/trust system?
Reference: `README.md` or quorum-tours.com/how-it-works

### Found a typo or inconsistency?
Update the template file and this INDEX.md

### Need to add a new email?
1. Create template file with same naming convention (##-name.md)
2. Add to README.md inventory
3. Update IMPLEMENTATION_GUIDE.md trigger map
4. Update INDEX.md file structure
5. Test using QA checklist

---

## References

- **How It Works:** quorum-tours.com/how-it-works
- **Trust System:** quorum-tours.com/how-it-works#trust-system
- **For Operators:** quorum-tours.com/for-operators
- **Project Guidelines:** CLAUDE.md

---

**Maintained by:** Content & Product Teams
**Last Review:** 2026-01-25
**Status:** Production-Ready
**Distribution:** Internal—Use in backend email system only
