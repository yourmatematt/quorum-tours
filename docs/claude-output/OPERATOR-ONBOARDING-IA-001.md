# OPERATOR-ONBOARDING-IA-001
## Information Architecture Specification: /for-operators/get-started

**Date:** 2026-01-22
**Agent:** web-design-lead
**Research Input:** TASK-RESEARCH-OPERATOR-ONBOARDING-IA-001.md

---

## TASK_ID
OPERATOR-ONBOARDING-IA-001

## STATUS
IA_COMPLETE

## ROUTE
/for-operators/get-started

## AUDIENCE
Tour operators aged 50-70, expert naturalists, risk-averse, technology-anxious, concerned about identity theft and financial security. Need hand-holding through verification process. Most (70-80%) have scattered documentation. High scrutiny users who view KYC/KYB as potential scams.

## PAGE INTENT
This page must eliminate verification anxiety before requesting sensitive documents. Operators face identity theft fears from sharing documents online, complexity anxiety from unfamiliar financial/legal processes, and fear of making irreversible mistakes. The page succeeds when an operator thinks: "These people will walk me through this personally, my bank account is safe (deposits only), my documents are secure, and I know exactly what happens next." The page must position verification as a partnership for credibility-building, not bureaucratic gatekeeping, with concierge onboarding as the primary path.

---

## SECTION STRUCTURE

### SECTION_1: Hero — Safety First Promise
**Intent:** Immediately address core fears (identity theft, bank account security) and foreground human support.

**Content Elements:**
- Headline: "Safe, Simple, Supported Verification"
- Subhead: "Get verified in 15 minutes — with a real person walking you through every step"
- Supporting proof: "Most operators verified within 24 hours"
- Trust badges row: Stripe Connect logo + FDIC badge + "Bank-Grade Encryption" badge
- Primary CTA: "Schedule Your Free Verification Call"
- Secondary CTA: "Start Application on Your Own"
- Phone number: Large, clickable: "Questions? Call (XXX) XXX-XXXX"
- Visual: Real operator on video call with Quorum support team (showing concierge onboarding in action)
- Explicit security statement below CTAs: "Your bank account is verified for deposits only. We cannot withdraw funds."

**Component Type:** OnboardingHero (custom)

**Visual Treatment:**
- Full-bleed background (light blue or warm gray to signal trust/safety)
- Left-aligned text block with generous whitespace
- Display serif headline (5x body size)
- Trust badges arranged horizontally with subtle spacing (not uniform)
- Phone number in mono font with phone icon, accent color
- CTAs stacked vertically with distinct visual weight (primary: large pill, secondary: text link)
- Security statement in bordered callout below CTAs (lock icon, smaller text)

**Anti-Patterns to Avoid:**
- DO NOT center text (kill-list #5)
- DO NOT use "Unlock/Transform/Empower" language (kill-list #14)
- DO NOT use generic hero with hard fold line (kill-list #2) — image/content bleeds slightly
- DO NOT hide phone support in footer only (kill-list #18)
- DO NOT use stock photos (kill-list #19) — must show real concierge interaction

---

### SECTION_2: Two-Path Choice — Concierge vs Self-Service
**Intent:** Present concierge onboarding as the recommended path while allowing self-service option.

**Content Elements:**
- Section header: "Two Ways to Get Started"
- **Path A (Concierge — Recommended):**
  - Badge: "95% of operators choose this"
  - Title: "Schedule Your Free Verification Call"
  - Bullet benefits:
    - "15-minute call with our onboarding team"
    - "We'll walk you through every document — zero tech jargon"
    - "Get verified in one conversation"
    - "Next available: Today at [Time]" (dynamic)
  - CTA: "Schedule Call Now" (large, accent color)
- **Path B (Self-Service):**
  - Title: "Verify on Your Own"
  - Bullet benefits:
    - "Self-guided application (15-20 minutes)"
    - "Save and resume anytime"
    - "Call us if you get stuck: [Phone Number]"
  - CTA: "Start Application" (secondary styling)
- Visual: Two-column layout (desktop), stacked (mobile), with Path A visually emphasized (larger, brighter)

**Component Type:** PathChoice (custom dual-CTA comparison)

**Visual Treatment:**
- Light background
- Two-column layout with subtle border separation
- Path A: accent background color (blue or green), larger card
- Path B: white/neutral background, smaller card
- Badge on Path A uses contrasting color
- Phone number repeated in Path B description (mono font)
- Typography: path titles in bold, large (2.5x body)
- Generous padding within each path card

**Anti-Patterns to Avoid:**
- DO NOT make paths visually equal (research: bias toward concierge)
- DO NOT use uniform card heights (kill-list #1, #3)
- DO NOT use generic "Sign Up" language (kill-list #16)
- DO NOT hide social proof (95% stat is critical)
- DO NOT use default shadow-lg (kill-list #9) — use colored shadow or border

---

### SECTION_3: Pre-Start Checklist — "What You'll Need"
**Intent:** Prevent mid-application abandonment by showing document requirements upfront.

**Content Elements:**
- Section header: "Before You Begin, Gather These Documents"
- Subhead: "Estimated time: 15 minutes if you have documents ready"
- **Three document categories:**
  1. **Business Verification:**
     - Tax ID (EIN for businesses, SSN for sole proprietors)
     - Business registration or DBA certificate (if applicable)
     - Proof of address (utility bill, bank statement, lease)
  2. **Identity Verification:**
     - Government-issued photo ID (passport, driver's license)
     - Bank account details for payouts (routing number, account number)
  3. **Professional Credentials (Recommended):**
     - Liability insurance certificate
     - Guide certifications (WFR, First Aid, etc.)
     - eBird profile link or trip report samples
- Reassurance statement: "Don't have everything? Start anyway — you can save and resume anytime."
- Link: "Download Printable Checklist (PDF)"
- **Operator tier guidance:**
  - "Solo operator? No problem. Use your SSN as Tax ID — we'll walk you through it."
  - "Don't have liability insurance yet? Here's what you need and where to get it affordably." (link to insurance partner)

**Component Type:** Checklist (expandable sections for each category)

**Visual Treatment:**
- White background with subtle border
- Three categories as expandable sections with +/- icons (not default arrows) (kill-list #13)
- Checkbox icons for each item (empty checkboxes, not checked)
- Typography: category headers bold, items in regular weight
- Tier guidance in bordered callout boxes below checklist (distinct color)
- Download link styled as secondary button
- Generous vertical spacing between categories

**Anti-Patterns to Avoid:**
- DO NOT use generic accordion arrows (kill-list #13)
- DO NOT hide tier-specific guidance (research: different operator readiness)
- DO NOT make checklist intimidating (reassurance statement is critical)
- DO NOT use uniform section heights (kill-list #3)

---

### SECTION_4: Timeline — "How Long Does This Take?"
**Intent:** Set explicit timeline expectations to reduce "limbo anxiety."

**Content Elements:**
- Section header: "Your Verification Timeline"
- Subhead: "Most operators are verified within 24 hours"
- **4-step visual timeline:**
  1. **Submit Documents** (15 minutes)
     - "Immediate confirmation: 'We received your application'"
  2. **Identity Verification** (Automated, 5-30 minutes)
     - "Stripe verifies your identity and bank account"
     - "Status updates in real-time on your dashboard"
  3. **Profile Review** (1-2 business days)
     - "Our team reviews your guide credentials and profile"
     - "You'll receive an email with next steps"
  4. **Go Live** (Immediate upon approval)
     - "Create your first tour campaign"
     - "Start accepting bookings"
- Proactive communication promise: "You'll get email and SMS updates at every stage. No need to refresh your inbox — we'll reach out when we need something or when you're approved."
- Support reminder: "Questions? Call [Number] — we'll check your status immediately."

**Component Type:** Timeline (horizontal stepper with milestone markers)

**Visual Treatment:**
- Light blue or green background (progress/success color)
- Horizontal timeline with custom milestone markers (not default dots)
- Each step shows step number, title, duration estimate, description
- Connecting lines between milestones (dotted or solid)
- Typography: step titles in bold, durations in mono font
- Icons for each step (checkmark, shield, magnifying glass, rocket)
- Phone number repeated at bottom (mono font, clickable)

**Anti-Patterns to Avoid:**
- DO NOT use default stepper UI (TLS Process DNA concern)
- DO NOT use Lucide icons without customization (TLS rubric)
- DO NOT hide timeline uncertainty (research: "black box" anxiety)
- DO NOT use vague language like "We'll review" without timeframe (kill-list #17, #18)

---

### SECTION_5: Security Explainer — "Your Documents Are Safe"
**Intent:** Address identity theft fears and bank account withdrawal anxiety.

**Content Elements:**
- Section header: "Your Bank Account is 100% Secure"
- **Main security promise:**
  - "We verify your account for DEPOSITS ONLY."
  - "Quorum cannot:"
    - ❌ Withdraw funds from your account
    - ❌ Initiate transfers without your action
    - ❌ Access your account balance or transaction history
    - ❌ Share your banking details with third parties
  - "We can only:"
    - ✅ Send you payouts when you've earned them
    - ✅ Verify your account is real and belongs to you
- **Stripe Connect trust signal:**
  - "Powered by Stripe Connect — the same secure system trusted by Amazon, Shopify, and Lyft to handle billions in payments."
- **Document security:**
  - "Documents encrypted at bank-grade level (256-bit SSL)"
  - "Identity verification powered by Stripe Connect (trusted by millions of businesses)"
  - "Your ID is encrypted and stored securely. We never share it with third parties."
- **Disconnection promise:**
  - "Need to disconnect? You can unlink your bank account anytime from your settings. No penalties, no questions asked."
- Visual: Lock icon, shield icon, green checkmarks for "We can only" items

**Component Type:** SecurityExplainer (custom list section with icons)

**Visual Treatment:**
- Dark background (dark blue or charcoal) to signal importance
- White text for contrast
- Two columns: "Cannot" list on left (red X icons), "Can only" list on right (green check icons)
- Stripe logo with trust stat below
- Typography: "100% Secure" in large display font
- Icons custom-illustrated or heavily styled (not default Lucide)
- Border or accent line separating sections

**Anti-Patterns to Avoid:**
- DO NOT use vague security language (kill-list #17, #18)
- DO NOT hide Stripe partnership (research: name the partner)
- DO NOT use generic icon row (kill-list #8)
- DO NOT minimize operator fears (research: anxiety is real and valid)

---

### SECTION_6: Payout Explainer — "When Do I Get Paid?"
**Intent:** Explain milestone release schedule and FDIC protection.

**Content Elements:**
- Section header: "How You Get Paid"
- **Visual payout timeline:**
  - **Day 1: Tour Reaches Minimum** → 20% released for vendor deposits
  - **30 Days Before Tour** → 30% released for logistics and operational costs
  - **Day of Tour Completion** → Remaining 50% (your profit) released
- Trust statements:
  - "All funds held in FDIC-insured trust account via [Bank Partner Name]"
  - "You receive payouts via direct deposit to your verified bank account"
  - "Typical payout time: 2-3 business days after release"
- Transparency promise: "This schedule is shown clearly in your dashboard so you know exactly when you'll have liquidity for business planning."

**Component Type:** PayoutTimeline (custom horizontal timeline with percentages)

**Visual Treatment:**
- Light background to contrast with previous dark section
- Horizontal timeline with three milestone markers
- Each milestone shows percentage, timing, purpose
- Visual representation of money flow (coins/currency icon or progress bar fill)
- Typography: percentages in large display font (4x body), timing in mono font
- FDIC badge and bank partner logo prominently displayed
- Border or accent color framing the timeline

**Anti-Patterns to Avoid:**
- DO NOT hide payout timing (kill-list #18)
- DO NOT use vague language like "funds released when appropriate" (kill-list #17)
- DO NOT use generic timeline UI (TLS Process DNA concern)
- DO NOT hide bank partner name (research: transparency builds trust)

---

### SECTION_7: FAQ — Pre-Emptive Answers
**Intent:** Address specific verification fears before they become blockers.

**Content Elements:**
- Section header: "Questions from Operators Like You"
- **Eight critical FAQs:**
  1. **"What if I don't have a formal business entity?"**
     - A: "No problem. Many guides operate as sole proprietors. You can use your Social Security Number as your Tax ID, and you don't need a business license in most states."
  2. **"What if I don't have liability insurance?"**
     - A: "Liability insurance isn't required to create an account, but it significantly boosts trust with birders. We've partnered with [Insurance Provider] to offer affordable policies starting at $[Amount]/year."
  3. **"I'm based outside the US. Can I still use Quorum?"**
     - A: "Yes! Stripe Connect supports operators in [X] countries. Verification requirements vary by country — schedule a call and we'll walk you through your specific requirements."
  4. **"What if my WFR certification is expired?"**
     - A: "You can still complete verification. Upload your expired certificate for now, and we'll help you find affordable WFR recertification courses."
  5. **"How do I link my eBird profile?"**
     - A: "Simply paste your eBird profile URL during the 'Professional Credentials' step. We'll verify you're the owner by having you add a specific phrase to your profile bio (we'll provide the phrase)."
  6. **"What if I've never used Stripe before?"**
     - A: "No Stripe account needed! When you click 'Link Bank Account,' Stripe will guide you through a simple bank verification process. It takes 2-3 minutes, and we'll be on the phone with you if you choose the concierge option."
  7. **"What if I upload the wrong document?"**
     - A: "No penalty for mistakes. You can edit your application anytime before final submission. If we receive incorrect documents, we'll contact you to upload the right ones — no application rejection."
  8. **"What if my application is delayed or rejected?"**
     - A: "If verification takes longer than 48 hours, we'll automatically reach out with specific next steps. Rejections are rare and always include a specific explanation and path to resolve. Call us anytime: [Phone Number]"
- Accordion interaction: +/- icons (not default chevrons)

**Component Type:** FAQAccordion (reusable, styled for operators)

**Visual Treatment:**
- White background
- Accordion items with subtle borders between
- +/- icons (not arrows) (kill-list #13)
- Typography: questions in bold (1.5x body), answers in regular weight
- Generous padding within each item
- Phone number repeated in last FAQ answer (mono font)
- Section uses full page width to avoid claustrophobic feeling

**Anti-Patterns to Avoid:**
- DO NOT use generic accordion arrows (kill-list #13)
- DO NOT use generic copy without specifics (kill-list #17)
- DO NOT hide support options (phone number in FAQ 8)
- DO NOT minimize operator concerns (research: forgiving design)

---

### SECTION_8: Post-Approval Preview — "What Happens After You're Approved?"
**Intent:** Reduce "now what?" anxiety by previewing dashboard and first tour creation.

**Content Elements:**
- Section header: "What Happens After You're Approved?"
- **4-step post-approval sequence:**
  1. **Access Your Dashboard**
     - "Log in and see your verified operator profile"
  2. **Create Your First Tour**
     - "Use our step-by-step wizard to set up your first campaign"
     - "Set your minimum participant threshold"
     - "Preview your public tour page before publishing"
  3. **Share & Fill**
     - "Get a shareable link to send to your network"
     - "Track bookings in real-time on your dashboard"
     - "Receive automatic email and SMS updates when someone books"
  4. **Tour Confirms & You Get Paid**
     - "When your threshold is met, bookings lock in"
     - "Deposits released on schedule (20% immediately, 30% at 30 days, 50% on completion)"
     - "Funds sent to your bank account within 2-3 days"
- **Feature teasers:**
  - **Profit Calculator:** "Our built-in calculator helps you set the right threshold and price. Enter your costs, set your profit margin, get your numbers. No more 'back of the napkin' math."
  - **WhatsApp Share:** "Share your tours directly to WhatsApp groups with one click — your birders are already there."
- **Success metrics:**
  - "Most operators create their first tour within 24 hours of approval"
  - "78% of tours launched in 2024 successfully reached their threshold"
  - "On average, tours reach their minimum threshold in 12 days"
- Video link: "Watch: 'Your First 48 Hours on Quorum' (3-minute video)"

**Component Type:** PostApprovalPreview (4-step process + feature teasers + metrics)

**Visual Treatment:**
- Light blue or green background (success/progress color)
- 4 steps in horizontal layout (desktop), vertical stack (mobile)
- Each step with custom icon and number
- Feature teasers as bordered callout boxes below steps (distinct color)
- Screenshots of dashboard/profit calculator embedded
- Success metrics displayed as large stats with icons
- Typography: step titles bold, metrics in display font (3x body)

**Anti-Patterns to Avoid:**
- DO NOT use generic stepper (TLS Process DNA)
- DO NOT hide post-approval experience (research: guided first tour creation)
- DO NOT use vague promises (kill-list #17 — specific hours, percentages, days)
- DO NOT use default shadow-lg (kill-list #9)

---

### SECTION_9: Support Promises — "You're Never Alone"
**Intent:** Reinforce human support availability throughout verification and beyond.

**Content Elements:**
- Section header: "You're Never Alone"
- **Three support pillars in horizontal layout:**
  1. **Phone Support**
     - "Call (XXX) XXX-XXXX"
     - "Monday-Friday: 9 AM - 6 PM EST"
     - "Leave a voicemail after hours — we'll call back within 2 hours the next business day"
     - "Speak to a real person in 30 seconds"
  2. **Concierge Onboarding**
     - "95% of operators choose our guided verification call"
     - "15-minute walkthrough of every step"
     - "Zero tech jargon, maximum hand-holding"
     - "Next available: Today at [Time]"
  3. **Live Chat**
     - "Quick questions? Chat with us now"
     - "Average response time: under 5 minutes"
     - "Prefer to talk? We'll connect you to phone support from chat"
- Photo: Real support team member (not stock)
- Commitment statement: "Technology should serve you, not intimidate you. If you ever feel stuck, confused, or anxious — call us. That's what we're here for."

**Component Type:** SupportPromises (3-column grid with photos)

**Visual Treatment:**
- White background
- Three columns (desktop), stacked (mobile)
- Each pillar with custom icon (phone, calendar, chat bubble)
- Phone number in large mono font, clickable
- Support hours clearly visible (not hidden)
- Photo of support team centered below columns
- Typography: pillar titles in bold, hours in mono font
- Border or subtle background color for each column

**Anti-Patterns to Avoid:**
- DO NOT use generic icon row (kill-list #8)
- DO NOT hide support hours (kill-list #18)
- DO NOT use stock photos (kill-list #19)
- DO NOT make phone support secondary (research: phone-first)

---

### SECTION_10: Final CTA — Low-Commitment Entry
**Intent:** Drive action with emphasis on zero-risk trial and human support.

**Content Elements:**
- Header: "Ready to Get Started? We'll Guide You Through It."
- Supporting copy: "No credit card required. No annual contracts. Cancel anytime with one-click data export."
- Primary CTA: "Schedule Your Free Verification Call"
- Secondary CTA: "Start Application on Your Own"
- Trust signals below CTAs:
  - "95% of operators choose the call option"
  - "Most verified within 24 hours"
  - "Your bank account is verified for deposits only"
- Phone number repeated (large, clickable): "Questions? Call (XXX) XXX-XXXX"

**Component Type:** ClosingCTA (reusable from existing, adapted)

**Visual Treatment:**
- Accent background color (blue or green)
- Centered layout (exception to left-align for final CTA)
- Large CTA buttons (pill style), stacked
- Typography: header in display font (4x body)
- Trust signals in smaller text below CTAs (light color for contrast)
- Phone number in mono font with phone icon
- Generous vertical padding (py-32)

**Anti-Patterns to Avoid:**
- DO NOT use generic "Get Started" (kill-list #16)
- DO NOT hide commitment level (kill-list #18)
- DO NOT use default button styling (TLS CTA Component DNA)
- DO NOT center long text blocks (header is short, so centering allowed)

---

## COMPONENT INVENTORY

### New Components Needed:
1. **OnboardingHero** — Safety-first hero with trust badges, phone number, security statement
2. **PathChoice** — Dual-path comparison (concierge vs self-service) with visual bias
3. **Checklist** — Expandable document checklist with operator tier guidance
4. **Timeline** — 4-step verification timeline with milestone markers
5. **SecurityExplainer** — Bank account security and document encryption explainer
6. **PayoutTimeline** — Milestone release schedule with percentages
7. **PostApprovalPreview** — 4-step post-approval sequence with feature teasers
8. **SupportPromises** — 3-column support pillars with photos

### Reusable Components (from existing codebase):
1. **FAQAccordion** (src/components/ui/FAQAccordion.tsx) — needs +/- icon styling
2. **ClosingCTA** (src/components/how-it-works/ClosingCTA.tsx) — adapt for onboarding context
3. **Button** (src/components/ui/Button.tsx) — use for all CTAs

---

## NAVIGATION INTEGRATION

### Inbound Links:
- **From /for-operators landing page:** "Get Started" CTA → /for-operators/get-started
- **From GlobalNav:** "For Operators" dropdown → "Get Started" link
- **From Footer:** "Get Started" under "For Operators" column

### Primary CTA Destination:
- **"Schedule Your Free Verification Call"** → Calendly/booking system (placeholder: /operators/schedule-call)
- **Alternative:** Contact form at /operators/contact with phone/email/calendar options

### Secondary CTA Destination:
- **"Start Application on Your Own"** → Self-service verification flow (placeholder: /operators/signup)

### Exit Flows:
- **Post-verification:** Email confirmation links to /operators/dashboard
- **Help links:** /operators/support or phone number click-to-call

---

## KILL-LIST COMPLIANCE

### Layout & Structure:
- ✅ **DO NOT use more than 2 consecutive card grids** — No card grids, only process sections
- ✅ **DO NOT end Hero with hard fold line** — Hero bleeds slightly, CTAs encourage scroll
- ✅ **DO NOT use predictable background alternation** — Dark security section breaks pattern
- ✅ **DO NOT center long text blocks** — All body copy left-aligned (except final CTA header)
- ✅ **DO NOT use Symmetric Sandwich** — Asymmetric support pillars, varied section widths

### Components:
- ✅ **DO NOT use Row of 4 Icons** — Support pillars use 3 columns with custom icons
- ✅ **DO NOT use default shadow-lg** — Borders, colored shadows, or accent backgrounds
- ✅ **DO NOT use uniform border radius** — Mix pill CTAs with sharp-edged cards
- ✅ **DO NOT use default Lift and Shadow hover** — Internal element changes (border color, icon transform)
- ✅ **DO NOT use generic accordion arrows** — Use +/- icons for FAQ

### Content & Copy:
- ✅ **DO NOT use banned words** — No "Unlock/Unleash/Elevate/Supercharge/Empower"
- ✅ **DO NOT use exclamation marks in headers** — Use periods for authority
- ✅ **DO NOT use generic copy** — All copy includes numbers, timeframes, names (e.g., "24 hours", "15 minutes", "95%", "Stripe Connect")
- ✅ **DO NOT hide business friction** — Explicit about document requirements, timelines, security mechanics, payout schedule

### Imagery & Visuals:
- ✅ **DO NOT use Undraw or flat vector people** — Real photography of operators on calls
- ✅ **DO NOT use floating gradient blobs** — Sharp, defined sections with clear backgrounds
- ✅ **DO NOT use Inter/Roboto exclusively** — Display serif for headlines, sans-serif for body, mono for phone/prices
- ✅ **DO NOT use stock photos** — Real operators, real support team photos

### Trust & Proof:
- ✅ **DO NOT use grayscale logo wall without context** — Stripe/FDIC logos with trust statements
- ✅ **DO NOT use generic testimonials** — Not using testimonials on this page (saving for landing page)

---

## GATES APPLICABLE

### Hard Gates (Must Pass):
1. **GATE-IA-COMPLETE** — This specification satisfies IA completion
2. **GATE-KILL-LIST** — All kill-list violations explicitly avoided (see compliance section)
3. **GATE-TLS-COMPONENT** — All component types have TLS targets defined:
   - Hero: TLS < 20 (Typography 25%, Copy 25%)
   - Process (Timeline, Payout): TLS < 18 (DNA 30%, Copy 25%)
   - CTA (Final CTA, Path Choice): TLS < 20 (Copy 30%, Interaction 25%)
   - Trust (Security Explainer, Support Promises): TLS < 18 (Proof 35%, Copy 25%)
   - FAQ: TLS < 20 (Interaction 25%, Copy 25%)

### Soft Gates (Enhancement):
- **GATE-RESEARCH** — Research brief TASK-RESEARCH-OPERATOR-ONBOARDING-IA-001.md was used as primary input

---

## DESIGN RATIONALE

### Sequencing Decision:
This page uses **Recipe C: Anxiety Elimination (High-Stakes)** adapted for verification context:

1. **Hero:** Safety promise (security, human support, deposits-only)
2. **Path Choice:** Concierge vs self-service (bias toward human support)
3. **Checklist:** Document requirements transparency (pre-emptive preparation)
4. **Timeline:** Process transparency (eliminate "black box" anxiety)
5. **Security Explainer:** Identity theft and bank account fears addressed explicitly
6. **Payout Explainer:** Financial transparency (when/how money flows)
7. **FAQ:** Pre-emptive objection handling (specific fears)
8. **Post-Approval Preview:** "Now what?" anxiety relief
9. **Support Promises:** Reinforce human availability
10. **Final CTA:** Low-commitment entry with repeated trust signals

### Why This Order:
- **Safety first, not speed:** Operators won't proceed until fears are addressed
- **Human support foregrounded:** Concierge path presented immediately as recommended
- **Process transparency before action:** Timeline and security explainers before CTA
- **Post-approval preview near end:** Reduces "now what?" anxiety after trust is built
- **FAQ catches remaining blockers:** Right before final CTA to remove last objections

### Typography Strategy:
- **Display serif for headlines:** Authority, trust, premium (not tech startup)
- **Sans-serif for body:** Readability for 50-70 age group (minimum 18px, high contrast)
- **Mono for phone numbers, times, percentages:** Functional clarity, scannable

### Proof Depth Strategy:
- **Level 4 (Evidence blocks):** Payout timeline visualization, verification progress tracker
- **Level 3 (Specific outcomes):** "95% choose concierge", "24 hours", "15 minutes"
- **Level 2 (Named partners):** Stripe Connect, FDIC, [Bank Partner], [Insurance Provider]

### Concierge Positioning:
- **Path Choice:** Visually bias toward concierge (larger, brighter, badged)
- **Phone number:** Repeated 6+ times throughout page (hero, path choice, timeline, FAQ, support, final CTA)
- **Support hours:** Always visible, never hidden
- **Video call imagery:** Hero shows real operator on call with support team

---

## INPUTS_USED
- TASK-RESEARCH-OPERATOR-ONBOARDING-IA-001.md (research synthesis)
- OPERATOR-LANDING-IA-001.md (structure and kill-list pattern reference)
- claude/protocols/protocols.md (gate requirements)

---

## NEXT STEPS
1. Hand off to frontend-implementer for component build
2. Implement components in this order (vertical slice):
   - OnboardingHero + PathChoice (above fold, critical conversion)
   - Checklist + Timeline (process transparency)
   - SecurityExplainer + PayoutTimeline (trust-building)
   - FAQ + PostApprovalPreview (objection handling + future vision)
   - SupportPromises + ClosingCTA (final conversion)
3. visual-qa captures desktop/mobile screenshots
4. a11y-auditor validates contrast, font sizing, tap targets for 50-70 demographic
5. code-reviewer checks kill-list compliance and TLS scoring

---

**Specification Status:** COMPLETE
**Ready for Implementation:** YES
**Estimated Component Count:** 8 new + 3 reused = 11 total components
**Critical Success Metric:** 70%+ choose concierge path, <10% abandon mid-application
