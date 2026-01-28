# Quorum Tours Transactional Email Templates

This directory contains all transactional email templates for Quorum Tours. These emails are designed around the platform's core philosophy: **trust-first, anti-marketing, radical clarity**.

## Design Philosophy

### What These Emails Are NOT
- Persuasive or manipulative ("Don't miss out!")
- Filled with marketing jargon ("seamless," "unlock," "empower")
- Vague about consequences or mechanics
- Designed to create artificial urgency
- Template-like or generic in tone

### What These Emails ARE
- Clear, specific, honest
- Institutional and professional but warm
- Direct about both benefits AND consequences
- Educational (explaining system mechanics)
- Focused on removing ambiguity

### Brand Voice Principles
1. **Clarity over persuasion.** Say exactly what is happening.
2. **Specific over generic.** Include concrete details and numbers.
3. **Institutional tone.** Like a trusted advisor, not a brand trying to be your friend.
4. **Honest about friction.** Don't hide the deposit system, the 24-hour deadline, or the strike mechanism.
5. **No pressure.** Users control their own pace and commitment level.

---

## Email Inventory

### User-Facing Emails (9)

#### 1. Welcome (`welcome`)
**Trigger:** User completes signup
**Purpose:** Onboard new users, explain system mechanics, introduce deposits without fear
**Key Message:** Tours work differently here. Here's how.
**Tone:** Educational, warm, no pressure

#### 2. Tour Committed (`tour_committed`)
**Trigger:** User commits to a forming tour
**Purpose:** Confirm commitment, explain conditional nature, manage expectations
**Key Message:** You're committed IF the tour reaches quorum.
**Tone:** Confirmatory, clear about next steps

#### 3. Quorum Reached (`quorum_reached`)
**Trigger:** Tour reaches quorum
**Purpose:** Confirm tour is guaranteed, create urgency around deadline, explain consequences
**Key Message:** Tour is confirmed. You have 24 hours to pay or lose your spot.
**Tone:** Urgent but fair, consequences clearly stated

#### 4. Payment Reminder (`payment_reminder`)
**Trigger:** 12 hours before payment deadline
**Purpose:** Final nudge, reiterate deadline and consequences
**Key Message:** 12 hours left. No extensions.
**Tone:** Direct, factual

#### 5. Payment Confirmed (`payment_confirmed`)
**Trigger:** Balance payment processed successfully
**Purpose:** Celebrate confirmation, provide tour logistics
**Key Message:** You're in. Here's what to know.
**Tone:** Warm, helpful, practical

#### 6. Strike Applied (`strike_applied`)
**Trigger:** User misses payment deadline
**Purpose:** Inform about strike, explain impact, outline appeal process
**Key Message:** This happened because of your missed payment. Here's what it means.
**Tone:** Direct but not punitive, explain the "why," offer appeal path

#### 7. Waitlist Spot (`waitlist_spot`)
**Trigger:** Spot opens from cancellation, user is next on waitlist
**Purpose:** Quick claim option, same deadline mechanics as original
**Key Message:** A spot opened. You have 24 hours to take it.
**Tone:** Time-sensitive but straightforward

#### 8. Tour Cancelled (`tour_cancelled`)
**Trigger:** Tour doesn't reach quorum by commitment deadline
**Purpose:** Clear explanation, refund confirmation, encouragement without pressure
**Key Message:** Tour didn't reach quorum. No charges, no impact to your account.
**Tone:** Empathetic but matter-of-fact

#### 9. Tour Reminder (`tour_reminder`)
**Trigger:** 48 hours before tour start
**Purpose:** Logistics reminder, operator contact, final prep
**Key Message:** Here's everything you need to know to show up.
**Tone:** Helpful, practical, brief

---

### Operator-Facing Emails (5)

#### 10. New Booking (`new_booking`)
**Trigger:** User commits to operator's tour
**Purpose:** Alert to new commitment, show participant status and trust tier
**Key Message:** [Birder] just committed. You're at [X]/[quorum].
**Tone:** Informative, progress-focused

#### 11. Quorum Reached—Operator (`quorum_reached_operator`)
**Trigger:** Tour reaches quorum
**Purpose:** Confirm quorum reached, explain payment window, next steps
**Key Message:** Tour confirmed. Participants have 24 hours to pay.
**Tone:** Celebratory but clear on next actions

#### 12. Deposit Forfeited (`deposit_forfeited`)
**Trigger:** User misses payment deadline
**Purpose:** Alert to missed payment, provide deposit payout info, announce open spot
**Key Message:** [Birder] missed payment. Deposit received and payout scheduled.
**Tone:** Factual, focused on operator's position

#### 13. Tour Confirmed (`tour_confirmed`)
**Trigger:** All committed participants have paid
**Purpose:** Final confirmation, complete participant info, tour is locked in
**Key Message:** All payments received. You're fully booked and ready to go.
**Tone:** Confirmatory, practical, celebratory

#### 14. Payout Sent (`payout_sent`)
**Trigger:** Tour completed and payout processed
**Purpose:** Confirm earnings, thank them, encourage future tours
**Key Message:** Your payout is on the way. Thank you for leading great tours.
**Tone:** Grateful, encouraging

---

## Implementation Guidelines

### Dynamic Content Placeholders

All templates use `[PLACEHOLDER]` notation for dynamic content. Examples:

- `[FIRST_NAME]` — Recipient's first name
- `[TOUR_NAME]` — Official tour name/title
- `[TOUR_DATE]` — Tour date (formatted: "March 15, 2026")
- `[TOUR_PRICE]` — Full tour price (formatted as currency)
- `[DEPOSIT_AMOUNT]` — Deposit amount (formatted as currency)
- `[DEADLINE_DATETIME]` — Full deadline with date and time (formatted: "March 10, 2026 at 2:15 PM")
- `[LINK]` — Any system-generated link (e.g., `[PAYMENT_LINK]`, `[TOURS_LINK]`)

### Email Design Standards

#### Subject Lines
- **Tone:** Clear, specific, honest (never clickbait)
- **Length:** Under 50 characters when possible
- **Avoid:** Exclamation marks, urgency triggers ("Act now!"), vague language
- **Do include:** Concrete information (tour name, deadline, action)

**Examples:**
- ✓ "Tour confirmed — Pay within 24 hours"
- ✗ "Urgent: Your Tour Awaits!"
- ✓ "Your booking is confirmed — [TOUR_NAME]"
- ✗ "Don't Miss Out!"

#### Preview Text
- **Tone:** Matter-of-fact, continues the subject line
- **Length:** Under 50 characters
- **Purpose:** Should make sense if someone only reads subject + preview

**Examples:**
- ✓ "Tours only run when you commit. Here's what that means."
- ✗ "Unlock exclusive birding experiences!"

#### Body Copy
- **Line length:** Max 72 characters for readability (especially on mobile)
- **Paragraphs:** Short (2-3 sentences max)
- **Emphasis:** Use bold for key deadlines, amounts, and actions—never ALL CAPS
- **Links:** Descriptive anchor text, not "click here"
- **Footer:** Standard sign-off (no marketing footer, no unsubscribe legal text)

#### Structure
Most transactional emails follow this pattern:
1. **Greeting** (personalized when possible)
2. **Main news** (one sentence, clear)
3. **Explanation** (what just happened and why)
4. **Next steps** (what happens now, what the recipient should do)
5. **Deadline or timeline** (when relevant)
6. **Call to action** (specific, necessary action with link)
7. **Clarification** (addressing common confusion points)
8. **Support path** (how to get help if needed)
9. **Sign-off** (warm but professional)

---

## Trust System Terminology

These emails consistently refer to the trust system. Maintain alignment with these definitions:

### Trust Tiers
- **New:** First tour, operator-set deposit required
- **Trusted:** 1+ completed tours, no strikes, no deposit required
- **Strike 1:** 1 missed payment, operator-set deposit required
- **Strike 2:** 2 missed payments, 50% deposit required
- **Suspended:** 3+ missed payments, cannot book

### Deposit Language
- **Deposit is applied to tour price:** Not an extra fee
- **Deposit is forfeited (minus 3% platform fee):** Accurate, specific fee mentioned
- **Operator sets deposit amount:** For New and Strike 1 users only
- **Deposit compensates for disruption:** Explains the "why" without being punitive

### Consequences Language
- **Strike:** Permanent but appealable
- **Spot goes to waitlist:** Clear what happens to the open seat
- **24-hour deadline:** Non-negotiable, explain why (operator certainty)
- **No extensions:** Simple, factual

---

## Testing Checklist

Before deploying any email:

- [ ] Subject line is clear and specific, not clickbait
- [ ] Preview text makes sense on its own
- [ ] All dynamic placeholders are correctly marked with `[BRACKETS]`
- [ ] Key dates/times are formatted consistently
- [ ] Key amounts are formatted as currency with proper symbols
- [ ] Links are descriptive, not generic "click here"
- [ ] Deadline language is clear (date, time, timezone if needed)
- [ ] Consequences are stated clearly but not threateningly
- [ ] No LLM words ("seamless," "unlock," "empower," "elevate," etc.)
- [ ] No fake urgency ("Act now!", "Limited spots!", "Don't miss out")
- [ ] Tone is institutional but warm
- [ ] Email is scannable (short paragraphs, bold emphasis)
- [ ] Support path is clear (email, link, FAQ reference)
- [ ] Sign-off is consistent with brand voice

---

## Customization by Audience

### New vs. Returning Users
- New users receive more explanation (Welcome email)
- Returning users can use shorter language
- Use past success as context when appropriate (e.g., "You've booked [X] tours successfully")

### Trust Tier Context
Operator emails should note participant trust tier so operators can adjust deposit requirements. Use language like:
- "Trust tier: New — [Consider requiring a deposit]"
- "Trust tier: Trusted — [No deposit required]"
- "Trust tier: Strike 1 — [You can require a deposit]"

### High-Stakes Emails
Emails about missed payments or strikes should:
- Be factual and clear
- Avoid emotional language (no shame, no "We're disappointed")
- Explain the "why" (operators need certainty, other birders depend on commitment)
- Offer an appeal path (acknowledge extenuating circumstances may apply)

---

## Common Pitfalls to Avoid

1. **Vague deadlines.** ✗ "Soon" ✓ "March 10, 2026 at 2:15 PM"
2. **Hidden terms.** ✗ Don't bury consequence language ✓ State consequences upfront
3. **Jargon.** ✗ "Comprehensive birding solution" ✓ "Birding tours"
4. **Unnecessary marketing.** ✗ Testimonials, social proof ✓ Just facts
5. **Ambiguous CTAs.** ✗ "Learn more" ✓ "Pay now" or "Claim your spot"
6. **Inconsistent tone.** ✗ Switching between formal and casual ✓ Consistent institutional warmth
7. **Too much information.** ✗ Overwhelming detail ✓ Essential info + link to help
8. **Missing the "why."** ✗ "You have 24 hours" ✓ "You have 24 hours. Operators need certainty."

---

## File Organization

```
docs/email-templates/
├── README.md                    # This file
├── 01-welcome.md
├── 02-tour_committed.md
├── 03-quorum_reached.md
├── 04-payment_reminder.md
├── 05-payment_confirmed.md
├── 06-strike_applied.md
├── 07-waitlist_spot.md
├── 08-tour_cancelled.md
├── 09-tour_reminder.md
├── 10-new_booking.md
├── 11-quorum_reached_operator.md
├── 12-deposit_forfeited.md
├── 13-tour_confirmed.md
└── 14-payout_sent.md
```

---

## Version Control

These templates are source-of-truth documents. When updating:

1. Update the relevant `.md` file
2. Note the change in a commit message
3. Test the email in your email service provider (ESP)
4. Deploy to production only after QA approval

---

## Localization Notes

If expanding to other regions/languages, maintain:
- The same email sequence and triggers
- The same trust system terminology
- The same emphasis on clarity and honesty
- The same tone (institutional, warm, trustworthy)

Do NOT:
- Add marketing language in other languages to make it "fit"
- Soften consequences to avoid friction
- Use flowery or emotional language
- Remove specific numbers or dates

---

## Support & Questions

For questions about email copy, design, or implementation:
- Check the tone guidelines in this README
- Reference the How It Works page on quorum-tours.com for system mechanics
- Review existing similar emails for consistency
- Ask: "Does this help users understand what's happening?" not "Does this convince them to act?"

---

**Last Updated:** 2026-01-25
**Version:** 1.0
