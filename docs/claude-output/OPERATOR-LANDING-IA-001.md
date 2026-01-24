# OPERATOR-LANDING-IA-001
## Information Architecture Specification: /for-operators

**Date:** 2026-01-22
**Agent:** web-design-lead
**Research Input:** TASK-RESEARCH-OPERATOR-LANDING-IA-001.md

---

## TASK_ID
OPERATOR-LANDING-IA-001

## STATUS
IA_COMPLETE

## ROUTE
/for-operators

## AUDIENCE
Tour operators aged 50-70, expert naturalists, risk-averse, protecting business reputation, currently using manual booking methods (spreadsheets, email invoicing). High scrutiny users with technology anxiety and platform distrust from past failures.

## PAGE INTENT
This page must eliminate the trust barrier before introducing the threshold mechanic. Operators face financial risk from upfront vendor commitments, technology anxiety from age-related digital hesitancy, and skepticism from past platform failures. The page succeeds when an operator thinks: "These people understand my business, my pain, and my birds — and they'll walk me through this without making me feel stupid or exposed." The page must position Quorum as a concierge service and professional financial infrastructure, not as software or a charity platform.

---

## SECTION STRUCTURE

### SECTION_1: Hero — Risk Elimination Promise
**Intent:** Immediately address the core pain (breakeven anxiety) and signal birding expertise.

**Content Elements:**
- Headline: "Never Bet the Farm on a Tour Again" (direct address to financial risk)
- Subhead: "Launch birding tours with zero upfront risk. Commit to suppliers when birders commit to you — not before."
- Supporting proof stat: "200+ guides stopped losing sleep over minimum group sizes"
- Primary CTA: "Schedule Your Free Onboarding Call"
- Secondary CTA: "See How It Works" (video)
- Trust signal: Phone number prominently displayed (large, clickable)
- Visual: Real operator with binoculars/scope in field (NOT stock photo), image bleeds across fold
- Birding-specific badge: eBird integration icon or BirdLife partnership logo

**Component Type:** OperatorHero (custom)

**Visual Treatment:**
- Full-bleed background image (real birding tour scene)
- Left-aligned text block with generous whitespace
- Display serif headline (6x body size, tight leading)
- Phone number in contrasting color with phone icon
- CTAs stacked vertically with distinct hierarchy (primary: large pill button, secondary: text link with arrow)
- Image bleeds down into next section to encourage scroll

**Anti-Patterns to Avoid:**
- DO NOT center text (kill-list #5)
- DO NOT use "Unlock/Elevate/Empower" language (kill-list #14)
- DO NOT use generic hero with hard fold line (kill-list #2)
- DO NOT use Inter/Roboto only (kill-list #22)
- DO NOT hide business friction — show phone number, no "Contact Us" vagueness (kill-list #18)

---

### SECTION_2: Human Support Signal — Concierge Promise
**Intent:** Immediately address technology anxiety by foregrounding human support.

**Content Elements:**
- Mini-section header: "Built for Birders, Not IT Departments"
- Three trust signals in horizontal layout:
  1. Phone support badge: "Call us at (XXX) XXX-XXXX — Real humans, not chatbots"
  2. Concierge onboarding: "We walk you through setup — 30-minute call, zero tech jargon"
  3. Response time commitment: "Support response within 2 hours during business hours"
- Small photo of support team member (real person, not stock)

**Component Type:** TrustSignalGrid (3-column, compact)

**Visual Treatment:**
- Light background to differentiate from hero
- Icons: custom-illustrated (phone handset, calendar with person, clock)
- Typography: phone number in mono font, larger than body text
- Horizontal rule or subtle border separation from hero

**Anti-Patterns to Avoid:**
- DO NOT use "Row of 4 Icons" pattern with generic icons (kill-list #8)
- DO NOT use stock photos (kill-list #19)
- DO NOT hide response times or support hours (kill-list #18)

---

### SECTION_3: The Financial Risk Problem — Pain Agitation
**Intent:** Emotionally validate the operator's current pain before introducing the solution.

**Content Elements:**
- Section header: "You Didn't Become a Naturalist to Be a Debt Collector"
- Three pain points in "before" format:
  1. **Breakeven Anxiety:** "You've put $8,000 down on the boat charter. The lodge wants another $4,000. And you've got three signups for a trip that needs eight. Now you're lying awake at 2 AM doing math."
  2. **Payment Chasing:** "It feels like begging. You email an invoice and wait. Send gentle reminders. Call clients who promise 'I'll pay tonight' — then silence."
  3. **Cancellation Calls:** "Every near-empty list is a pounding heart. Cancel on clients and destroy your reputation. Or run the tour at a loss and destroy your business."
- Visual: Dark background section to signal "problem zone"
- Supporting stat: "33% of traditional tour bookings get cancelled — costing operators reputation and revenue"

**Component Type:** ProblemAgitationSection (custom, similar to existing ProblemSection in how-it-works)

**Visual Treatment:**
- Dark background (dark blue or charcoal, not black)
- Pain points as large pull quotes with em-dash attribution format
- Typography: serif pull quotes, sans-serif supporting text
- Generous vertical padding (py-32)
- Single column, left-aligned text blocks

**Anti-Patterns to Avoid:**
- DO NOT use generic copy without emotional truth (kill-list #17)
- DO NOT use centered text for long blocks (kill-list #5)
- DO NOT use exclamation marks in headers (kill-list #15)
- DO NOT use predictable background alternation (this dark section breaks the pattern) (kill-list #4)

---

### SECTION_4: The Threshold Mechanic — Solution Reveal
**Intent:** Explain how Quorum solves the financial risk problem with the threshold model.

**Content Elements:**
- Section header: "How Quorum Protects Your Business"
- Subhead: "The threshold mechanic means every tour that launches is a tour that runs"
- 3-step visual process:
  1. **Set Your Minimum:** "Post your tour. Set minimum birders needed (e.g., 6 for pelagic boat charter)."
  2. **Collect Commitments:** "Birders commit deposits — held in FDIC-insured escrow until threshold is met."
  3. **Tour Confirms or Refunds:** "Reach 6 birders? Tour confirms, funds release. Don't reach 6? Everyone gets 100% refund, zero reputation damage."
- Visual: Custom illustrated progress bar showing 4/6 → 6/6 → "CONFIRMED"
- Trust proof: "FDIC-insured escrow via [Bank Partner Name]"
- Gap Negotiation callout: "Tour at 5/6? Operators can absorb shortfall OR poll birders to split the difference — saving revenue."

**Component Type:** MechanicExplanationSection (custom, similar to MechanicSection but operator-focused)

**Visual Treatment:**
- Light background to contrast with previous dark section
- Steps presented horizontally with visual connectors (arrows or dotted lines)
- Each step includes custom icon (calendar, shield/lock, checkmark)
- Progress bar visualization prominent and branded (thick bar, animated)
- Typography: step numbers as large design elements (display font)

**Anti-Patterns to Avoid:**
- DO NOT use generic stepper UI (kill-list component DNA concern)
- DO NOT use standard 3-column grid (kill-list #11 — force visual flow instead)
- DO NOT use Lucide icons without customization (TLS rubric: Process DNA 7-15)
- DO NOT hide financial mechanics (kill-list #18 — escrow must be explicit)

---

### SECTION_5: Financial Transparency — Payout Timeline & Pricing
**Intent:** Pre-emptively answer "When do I get paid?" and "What does this cost?"

**Content Elements:**
- Section header: "Your Money, Your Timeline, Your Price"
- **Payout Timeline Visualization:**
  - Milestone 1: "Threshold Met → 20% released for vendor deposits"
  - Milestone 2: "30 Days Before Tour → 30% released for logistics"
  - Milestone 3: "Tour Completion → Remaining 50% released"
  - Visual: horizontal timeline with milestone markers
- **Pricing Table:**
  - Tier 1: Free (1 tour listing, test the platform)
  - Tier 2: $49/month + 2% booking fee (unlimited tours, automated payments)
  - Tier 3: $99/month + 1.5% booking fee (priority support, gap negotiation tools)
  - Comparison footnote: "FareHarbor charges 6% + hidden fees. We charge 2% and show it upfront."
- Trust statement: "Your price is what birders pay. No surprise fees added at checkout."

**Component Type:** FinancialTransparencySection (custom: timeline + pricing table)

**Visual Treatment:**
- Split layout: timeline on left, pricing on right (desktop), stacked (mobile)
- Timeline uses custom milestone markers (not default dots)
- Pricing table with colored shadows (not default shadow-lg) (kill-list #9)
- Typography: prices in mono font, large and bold
- Border or accent color to frame the section

**Anti-Patterns to Avoid:**
- DO NOT hide payout timing (kill-list #18)
- DO NOT use vague pricing ("Starting at...") (kill-list #17)
- DO NOT use default shadow-lg (kill-list #9)
- DO NOT use generic "Contact for Pricing" (kill-list #16)

---

### SECTION_6: Before/After Transformation — Pain → Relief
**Intent:** Show the operational transformation in concrete terms.

**Content Elements:**
- Section header: "What Changes for You"
- Four before/after pairs in two-column layout:
  1. **Payment Collection:** "Before: Chasing invoices, writing card numbers on sticky notes → After: Automated collection, secure processing"
  2. **Cash Flow:** "Before: $8,000 out-of-pocket months before revenue → After: Vendor deposits released when tour confirms"
  3. **Cancellation Anxiety:** "Before: Answering 50-100 emails only to cancel → After: Transparent progress, fair refunds if threshold not met"
  4. **Admin Burden:** "Before: 24/7 tether to WhatsApp, email, phone → After: Centralized dashboard, automated reminders"
- Supporting stat per pair (e.g., "Operators report saving 15 hours/week on admin")

**Component Type:** BeforeAfterGrid (2x4 grid)

**Visual Treatment:**
- Before column: muted color (gray or desaturated)
- After column: accent color (green or blue for success)
- Arrow or transition icon between columns
- Typography: "Before" and "After" labels in small caps
- Varied card heights to avoid perfect grid uniformity (kill-list #3)

**Anti-Patterns to Avoid:**
- DO NOT use identical card heights (kill-list #1, #3)
- DO NOT use generic copy (kill-list #17 — need specific hours saved, specific friction)
- DO NOT use more than 2 consecutive card grids (this is the only card grid section)

---

### SECTION_7: Platform Legitimacy — Birding Expertise & Partnerships
**Intent:** Prove that Quorum understands birding (not just generic travel) and has institutional backing.

**Content Elements:**
- Section header: "Built for Birders, Backed by the Community"
- **Birding Expertise Signals:**
  - "We speak birding: Endemics, target species, pelagic charters, trip reports, eBird integration"
  - "We're not generic travel software — we're built for the specific mechanics of birding tours"
- **Partnership Logos (with context):**
  - eBird (Cornell Lab of Ornithology): "Integrated trip planning and species reporting"
  - BirdLife International: "1% of booking fees support bird conservation"
  - American Birding Association: "Aligned with ABA ethical guiding standards"
  - ATTA (Adventure Travel Trade Association): "Verified operator protection standards"
  - Trust My Travel: "UK-based tour escrow partner with 15+ years protecting travelers and operators"
- **Data Ownership Guarantee:**
  - "Your customers remain your customers. Your data stays your data. Export anytime, cancel anytime, zero lock-in."

**Component Type:** LegitimacySection (text + logo grid + guarantee card)

**Visual Treatment:**
- Light background
- Partnership logos arranged in asymmetric layout (not uniform grid) (kill-list #23)
- Each logo has caption explaining relationship (kill-list #23 — add context)
- Data ownership guarantee in bordered callout box with shield icon
- Typography: partnership captions in smaller, lighter font

**Anti-Patterns to Avoid:**
- DO NOT use grayscale logo wall without context (kill-list #23)
- DO NOT use generic travel terms (kill-list domain expertise from research)
- DO NOT hide data ownership policies (kill-list #18)

---

### SECTION_8: Social Proof — Operator Testimonials
**Intent:** Provide peer validation from recognizable birding guides.

**Content Elements:**
- Section header: "200+ Guides Stopped Losing Sleep Over Minimum Group Sizes"
- Three detailed testimonials with:
  1. **Full attribution:** Name, credentials (e.g., "John Smith, WFR Certified, 20 years guiding Neotropical tours")
  2. **Photo:** Real operator in field with binoculars/scope
  3. **Specific outcome:** "Saved 15 hours/week on admin" OR "Launched 3 new routes risk-free in 2025"
  4. **Story snippet:** 2-3 sentences describing their pain and relief
- Visual: asymmetric grid (not uniform cards) (kill-list #23, TLS Trust Section 0-3)
- Video testimonial option: "Watch Maria's Story" link to 2-minute video

**Component Type:** OperatorTestimonialGrid (custom, asymmetric)

**Visual Treatment:**
- Asymmetric layout: first testimonial larger, second and third smaller but different sizes
- Photos break grid boundaries slightly (overlap or bleed)
- Pull quote styling: serif font for quote, sans-serif for attribution
- Credentials in distinct color or badge treatment
- Background: light or white

**Anti-Patterns to Avoid:**
- DO NOT use generic testimonials without outcomes (kill-list #24)
- DO NOT use grayscale or anonymous quotes (kill-list #23, #24)
- DO NOT use uniform grid of identical cards (kill-list #1, TLS Trust Layout 9-12)
- DO NOT use stock photos (kill-list #19)

---

### SECTION_9: Verification & Onboarding — Positioning as Partnership
**Intent:** Reframe KYC/KYB as credibility-building, not bureaucratic hassle.

**Content Elements:**
- Section header: "Getting Started: Partnership, Not Paperwork"
- **Pre-Submission Checklist:**
  - Business License or Tour Operator Permit
  - Liability Insurance Certificate
  - Guide Certifications (WFR, First Aid, or regional equivalents)
  - Bank Account for Payouts (deposits only — Quorum cannot withdraw)
- **Two-Path Onboarding:**
  - Path A (Self-Service): "Upload documents yourself — live in 48 hours"
  - Path B (Concierge): "Schedule a 30-minute verification call — we'll walk you through it"
- **Security Reassurance:**
  - "Your bank account is verified for deposits only. Quorum cannot withdraw funds."
  - "Documents encrypted and stored securely. Identity verification via Stripe Connect."
- Visual: Checklist with checkboxes, two CTA buttons for Path A and Path B

**Component Type:** OnboardingPathSection (custom: checklist + dual CTA)

**Visual Treatment:**
- Split layout: checklist on left, onboarding paths on right
- Checklist items with checkbox icons (green checks)
- Security reassurance in bordered callout with lock icon
- Typography: checklist items in clear, legible sans-serif
- CTAs side-by-side (desktop) or stacked (mobile)

**Anti-Patterns to Avoid:**
- DO NOT hide security mechanics (kill-list #18 — deposits-only must be explicit)
- DO NOT use generic "Sign Up" language (kill-list #16 — use "Schedule Verification Call")
- DO NOT present verification as scary (research: frame as partnership)

---

### SECTION_10: FAQ — Addressing Specific Fears
**Intent:** Pre-emptively answer the top 6 objections that prevent signup.

**Content Elements:**
- Section header: "Questions from Operators Like You"
- Six questions with detailed answers:
  1. **"What happens to my data if I leave?"** → "You own it. One-click export. Zero hostage-holding."
  2. **"How is my banking information protected?"** → "Verified for deposits only via Stripe Connect. Quorum cannot withdraw funds. Bank-level encryption."
  3. **"What if I don't understand the technology?"** → "That's why we offer concierge onboarding. 30-minute call, zero jargon. Plus phone support within 2 hours."
  4. **"How do you compare to FareHarbor/Rezdy?"** → "They charge 6%+ fees. We charge 2%. They add surprise fees at checkout. We don't. They lock you in. We don't."
  5. **"What fees do birders see?"** → "Your price. That's it. No convenience fees, no processing fees. You set the price, birders pay the price."
  6. **"What if my tour doesn't reach the threshold?"** → "Everyone gets 100% refund. Zero cost to you. Zero reputation damage. You can also use Gap Negotiation to save the tour."
- Accordion interaction: +/- icons (not generic arrows) (kill-list #13)

**Component Type:** FAQAccordion (reuse existing component, styled for operators)

**Visual Treatment:**
- Light background
- Accordion items with subtle borders
- +/- icons (not default chevrons) (kill-list #13)
- Typography: questions in bold, answers in regular weight
- Generous padding between items

**Anti-Patterns to Avoid:**
- DO NOT use generic accordion arrows (kill-list #13)
- DO NOT use generic FAQ copy (kill-list #17 — need specific answers)
- DO NOT hide friction (kill-list #18 — be explicit about costs, timelines, constraints)

---

### SECTION_11: Final CTA — Low-Commitment Entry
**Intent:** Drive action with emphasis on human contact and zero-risk trial.

**Content Elements:**
- Header: "Start Your First Tour Risk-Free"
- Supporting copy: "Free tier: 1 tour listing, zero payment required. Test the platform. Talk to a human. See if it fits."
- Primary CTA: "Schedule Your Free Onboarding Call"
- Secondary CTA: "Start Self-Service Setup"
- Trust signals below CTAs:
  - "No credit card required"
  - "Cancel anytime — your data exports in one click"
  - "Month-to-month billing — no annual lock-in"
- Phone number repeated (large, clickable)

**Component Type:** ClosingCTA (reuse existing component from how-it-works, adapted)

**Visual Treatment:**
- Accent background color (blue or green)
- Centered layout (exception to left-align rule for final CTA)
- Large CTA buttons (pill style)
- Typography: header in display font, large (4x body)
- Trust signals in smaller, lighter text below CTAs
- Phone number in mono font with phone icon

**Anti-Patterns to Avoid:**
- DO NOT use generic "Get Started" or "Sign Up" (kill-list #16 — use specific action)
- DO NOT hide commitment level (kill-list #18 — "No credit card required" is critical)
- DO NOT use default button styling (TLS CTA Component DNA 0-2)

---

## COMPONENT INVENTORY

### New Components Needed:
1. **OperatorHero** — Full-bleed hero with left-aligned text, phone number prominence, image bleed
2. **TrustSignalGrid** — 3-column support signals (phone, concierge, response time)
3. **ProblemAgitationSection** — Dark background pain point section with pull quotes
4. **MechanicExplanationSection** — 3-step threshold process with custom icons and progress bar
5. **FinancialTransparencySection** — Payout timeline + pricing table split layout
6. **BeforeAfterGrid** — 2x4 transformation grid with before/after columns
7. **LegitimacySection** — Birding expertise + partnership logos + data guarantee
8. **OperatorTestimonialGrid** — Asymmetric testimonial layout with credentials
9. **OnboardingPathSection** — Checklist + dual-path CTAs (self-service vs concierge)

### Reusable Components (from existing codebase):
1. **FAQAccordion** (src/components/ui/FAQAccordion.tsx) — needs +/- icon styling
2. **ClosingCTA** (src/components/how-it-works/ClosingCTA.tsx) — adapt for operator context
3. **Button** (src/components/ui/Button.tsx) — use for all CTAs

---

## NAVIGATION INTEGRATION

### Inbound Links:
- **GlobalNav:** Add "For Operators" to primary navigation (desktop: horizontal nav item, mobile: hamburger menu)
- **Home Page:** Add operator CTA in "Pathways" section or dedicated "Are You a Guide?" section
- **Footer:** Add "For Operators" under "Platform" or "Get Started" column
- **Tours Index:** Optional banner at top: "Tour operators: Launch your own tours risk-free →"

### Primary CTA Destination:
- **Schedule Onboarding Call:** Links to Calendly or booking system (placeholder: /operators/schedule-call)
- **Alternative:** Contact form at /operators/contact with phone/email options
- **Self-Service Path:** Links to operator signup flow (placeholder: /operators/signup)

### Secondary CTA Destination:
- **"See How It Works" video:** Modal with video embed or link to /operators/demo

---

## KILL-LIST COMPLIANCE

### Layout & Structure:
- ✅ **DO NOT use more than 2 consecutive card grids** — Only one card grid (Before/After section)
- ✅ **DO NOT end Hero with hard fold line** — Image bleeds into next section
- ✅ **DO NOT use predictable background alternation** — Dark problem section breaks pattern
- ✅ **DO NOT center long text blocks** — All body copy left-aligned
- ✅ **DO NOT use Symmetric Sandwich** — Asymmetric layouts throughout (testimonials, partnerships)

### Components:
- ✅ **DO NOT use Row of 4 Icons** — Trust signals use custom illustrations, not generic icon row
- ✅ **DO NOT use default shadow-lg** — Colored shadows or borders for separation
- ✅ **DO NOT use uniform border radius** — Mix pill buttons with sharp cards
- ✅ **DO NOT use default Lift and Shadow hover** — Internal element changes (border color, text reveal)
- ✅ **DO NOT use generic accordion arrows** — Use +/- icons

### Content & Copy:
- ✅ **DO NOT use banned words** — No "Unlock/Unleash/Elevate/Supercharge/Empower"
- ✅ **DO NOT use exclamation marks in headers** — Use periods for authority
- ✅ **DO NOT use generic copy** — All copy includes numbers, dates, or proper nouns (e.g., "200+ guides", "2% booking fee", "FDIC-insured")
- ✅ **DO NOT hide business friction** — Explicit about pricing, payout timing, verification requirements

### Imagery & Visuals:
- ✅ **DO NOT use Undraw or flat vector people** — Real photography of operators
- ✅ **DO NOT use floating gradient blobs** — Sharp, defined shapes and real photos
- ✅ **DO NOT use Inter/Roboto exclusively** — Display serif for headlines, sans-serif for body

### Trust & Proof:
- ✅ **DO NOT use grayscale logo wall without context** — All logos have captions explaining relationship
- ✅ **DO NOT use generic testimonials** — Full attribution (name, credentials, outcome)

---

## GATES APPLICABLE

### Hard Gates (Must Pass):
1. **GATE-IA-COMPLETE** — This specification satisfies IA completion
2. **GATE-KILL-LIST** — All kill-list violations explicitly avoided (see compliance section above)
3. **GATE-TLS-COMPONENT** — All component types have TLS targets defined:
   - Hero: TLS < 20 (Typography 25%, Copy 25%)
   - Trust/Proof (Testimonials, Legitimacy): TLS < 18 (Proof 35%, Copy 25%)
   - Process (Mechanic Explanation): TLS < 18 (DNA 30%, Copy 25%)
   - CTA (Final CTA): TLS < 20 (Copy 30%, Interaction 25%)
   - Cards (Before/After): TLS < 20 (Interaction 25%, Proof 20%)

### Soft Gates (Enhancement):
- **GATE-RESEARCH** — Research brief TASK-RESEARCH-OPERATOR-LANDING-IA-001.md was used as primary input

---

## DESIGN RATIONALE

### Sequencing Decision:
This page uses **Recipe B: Problem-Agitation (SaaS, B2B)** from design-principles.md, adapted for operator audience:

1. **Hero:** Risk elimination promise (not interactive demo, given technology anxiety)
2. **Human Support Signal:** Immediate technology anxiety relief
3. **Agitation Block:** Dark section highlighting financial pain points
4. **Solution Reveal:** Threshold mechanic explained with visual proof
5. **Financial Transparency:** Pricing and payout timing (trust-building)
6. **Before/After:** Transformation evidence
7. **Platform Legitimacy:** Birding expertise and partnerships
8. **Social Proof:** Peer testimonials
9. **Onboarding Path:** Addressing verification friction
10. **FAQ:** Pre-emptive objection handling
11. **Final CTA:** Low-commitment entry

### Why This Order:
- **Trust before features:** Operators need to trust Quorum before they care about mechanics
- **Pain agitation early:** Validates their experience, builds emotional connection
- **Financial transparency mid-page:** Answers "What does this cost?" before social proof
- **Social proof late:** Once they trust the platform, peer validation converts
- **FAQ near end:** Catches remaining objections before final CTA

### Typography Strategy:
- **Display serif for headlines:** Signals premium, bespoke (not SaaS template)
- **Sans-serif for body:** Readability for 50-70 age group (minimum 18px)
- **Mono for prices and phone numbers:** Functional clarity, breaks rhythm

### Proof Depth Strategy:
- **Level 4 (Evidence blocks):** Payout timeline visualization, progress bar mockup
- **Level 3 (Specific outcomes):** Testimonials with "Saved 15 hours/week"
- **Level 2 (Full attribution):** All testimonials have name, credentials, photo

---

## INPUTS_USED
- TASK-RESEARCH-OPERATOR-LANDING-IA-001.md (research synthesis)
- claude/protocols/design-principles.md (kill-list rules)
- claude/protocols/tls-component-rubrics.md (TLS targets)
- claude/protocols/protocols.md (gate requirements)

---

## NEXT STEPS
1. Hand off to frontend-implementer for component build
2. Implement components in this order (vertical slice):
   - OperatorHero + TrustSignalGrid (above fold)
   - ProblemAgitationSection + MechanicExplanationSection (core value prop)
   - FinancialTransparencySection (trust-building)
   - Remaining sections (social proof, onboarding, FAQ, CTA)
3. visual-qa captures desktop/mobile screenshots
4. a11y-auditor validates contrast, font sizing, tap targets for 50-70 demographic
5. code-reviewer checks kill-list compliance and TLS scoring

---

**Specification Status:** COMPLETE
**Ready for Implementation:** YES
**Estimated Component Count:** 9 new + 3 reused = 12 total components
