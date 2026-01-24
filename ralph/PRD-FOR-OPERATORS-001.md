# Product Requirements Document: /for-operators Landing Page

## Document Info
- **Document ID:** PRD-FOR-OPERATORS-001
- **Version:** 1.0
- **Date:** January 24, 2026
- **Author:** Claude (PA Agent)
- **Status:** Draft for Review

---

## 1. Executive Summary

### 1.1 Purpose
This PRD defines the complete rebuild of the `/for-operators` landing page for Quorum Tours. The current page fails to address the core emotional and business needs of wildlife tour operators. This document synthesizes insights from extensive research across three AI models (ChatGPT, Gemini, Claude), the Mallacoota feasibility study, and past conversations with Matt about operator Dale.

### 1.2 The Core Problem
The current page treats operators as software buyers. They are not.

Wildlife tour operators are **expert naturalists aged 50-70** who:
- Entered this field out of passion for wildlife and guiding
- Now spend 30+ hours/week on administration instead of in the field
- Are risk-averse with their reputation and finances
- Have been burned by technology that promised simplicity and delivered complexity
- Are actively losing money gambling on tour viability

### 1.3 The Transformation We're Selling
**FROM:** "I built a beautiful trip. Promoted it for months. Four people signed up. I needed six to break even. Now I'm calling each one, apologizing—damaging relationships I spent years building."

**TO:** "Tours only run when they're ready to run. I commit to suppliers when birders commit to me. I spend my time doing what I love."

### 1.4 Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Time on page | >2 minutes | Analytics |
| Scroll depth | >75% | Analytics |
| CTA click rate | >8% | Analytics |
| Operator inquiry rate | >3% | Form submissions |
| Page load time | <2s | Lighthouse |
| Mobile experience score | >90 | Lighthouse |

---

## 2. Target Audience Profile

### 2.1 Primary Persona: The Expert Naturalist Operator

**Demographics:**
- Age: 50-70 years
- Gender: Mixed (slight male skew)
- Background: Former park rangers, retired ornithologists, marine biologists, natural history enthusiasts
- Location: Regional/rural areas (close to the wildlife)
- Tech comfort: Low to moderate
- Business structure: Solo operator or small team (1-3 people)

**Current Workflow:**
- Marketing: Facebook posts, word-of-mouth, birding society newsletters
- Booking: Email, phone calls, PDF forms, manual spreadsheets
- Payments: Bank transfers, PayPal, checks, Stripe payment links
- Communication: WhatsApp groups, email chains

**Psychographics:**
- Deeply passionate about wildlife and conservation
- Takes pride in expertise and reputation
- Frustrated by administrative burden
- Risk-averse with business decisions
- Skeptical of "tech startups" and hype language
- Values relationships over transactions
- Prefers human support to chatbots

### 2.2 What They Fear
1. **Technology complexity** - "Dashboard that looks like a 747 cockpit"
2. **Platform lock-in** - "Built my business on rented land"
3. **Hidden fees** - Surprise charges that destroy margins
4. **Reputation damage** - Platform failure reflects on them
5. **Loss of control** - Someone else managing their customer relationships
6. **Being scammed** - Sending money to wire transfers that disappear

### 2.3 What They Want
1. **Time back** - "You became a guide to guide. Let the system handle the rest."
2. **Financial certainty** - Know tours will run before committing to suppliers
3. **Simple technology** - "Built for birders, not IT departments"
4. **Human support** - Real people who understand their business
5. **Fair pricing** - Transparent, no surprises, aligned with their success

---

## 3. Research-Backed Pain Points (Priority Order)

Based on the Master Pain Points Synthesis, these are the BURNING pain points that should drive messaging:

### 3.1 CRITICAL: Financial Risk / Vendor Deposits Before Confirmation
**Research confidence:** ALL THREE sources flagged this as critical

> "You've put $8,000 down on the boat charter. The lodge wants another $4,000. And you've got three signups for a trip that needs eight. Now you're lying awake at 2 AM doing math, praying four strangers find your Facebook post."

**Platform Solution:** Threshold-based mechanics. Operators commit to suppliers WHEN birders commit to them. No more gambling.

**Emotional Weight:** This is existential. A few bad seasons can bankrupt small operators.

### 3.2 CRITICAL: Tour Cancellation Anxiety / The "Will It Run?" Problem
**Research confidence:** ALL THREE sources flagged this as critical

> "You've built a beautiful trip. Promoted it for months. Four people signed up. You need six to break even. Now you're calling each one, apologizing—damaging relationships you spent years building."

**Platform Solution:** Transparent thresholds visible to all. Tours only launch when viable. No cancellation apologies.

**Emotional Weight:** Every cancellation chips away at hard-won reputation.

### 3.3 BURNING: Payment Chasing / Debt Collection
**Research confidence:** ALL THREE sources flagged this

> "You send the invoice. You wait. You send a reminder. You wait. You call. They say they'll pay tonight. They don't. Now you're chasing money instead of scouting locations."

**Platform Solution:** Automated deposits. Cards captured at booking, charged at threshold. No chasing.

**The Line:** "Stop chasing payments. Start chasing birds."

### 3.4 BURNING: Admin Drowns the Guiding
**Research confidence:** ALL THREE sources flagged this

> "You spent thirty years learning to identify every warbler by ear. Now you spend thirty hours a week in Gmail."

**Platform Solution:** Centralized booking management. Automated communications. Pre-trip info automated.

**The Line:** "You became a guide to guide. Let the system handle the rest."

### 3.5 BURNING: Marketing Invisibility
**Research confidence:** ALL THREE sources flagged this

> "You know you need to post more. Update the website. Engage with birding groups. But after answering emails, processing payments, and coordinating logistics, it's 6 PM. Marketing can wait. Again."

**Platform Solution:** Species-based discovery. Chase list notifications. Platform brings birders looking for their expertise.

**The Line:** "Be found by birders ready to book."

### 3.6 SIMMERING: Technology Frustration
**Research confidence:** ALL THREE sources flagged this

> "You've spent three hours trying to figure out why the calendar isn't syncing. Support sent a knowledge base article that assumes you know what an API is. You give up and go back to the spreadsheet."

**Platform Solution:** Radical simplicity. No dashboards with 47 fields. Human support.

**The Line:** "Built for birders, not IT departments."

### 3.7 SIMMERING: Hidden Platform Fees
**Research confidence:** Claude research specific

> "You price your tour carefully—$3,500 covers expenses, pays fairly, leaves modest margin. Then your booking platform adds $450 in 'convenience fees' at checkout. Your customer emails, furious."

**Platform Solution:** Your price is the price. 6% commission only on successful bookings.

**The Line:** "Your price. No surprises."

---

## 4. Key Messaging Framework

### 4.1 Primary Value Proposition
**Hero headline option 1:** "Stop Gambling on Tour Viability. Start Guiding."

**Hero headline option 2:** "Tours That Run When They're Ready to Run."

**Hero headline option 3:** "Never Bet the Farm on a Tour Again."

### 4.2 Support Statement
"List your tour. Set your minimum. We handle the rest—collecting deposits, tracking progress, and only charging cards when your threshold is met. You commit to suppliers when birders commit to you."

### 4.3 Audience-Specific Hooks
| Pain Point | Hook |
|------------|------|
| Financial risk | "Commit to suppliers when birders commit to you." |
| Cancellation anxiety | "Every tour that launches is a tour that runs." |
| Payment chasing | "Stop chasing payments. Start chasing birds." |
| Admin burden | "You became a guide to guide. Let the system handle the rest." |
| Marketing invisibility | "Be found by birders ready to book." |
| Tech frustration | "Built for birders, not IT departments." |

### 4.4 Trust Signals That Matter
Based on research:
1. **Commission transparency** - 6% only on successful bookings (research shows 6%+ triggers "expensive" reflex, but justified with value)
2. **No upfront costs** - Free to list, no monthly fees
3. **Payment protection** - Cards held, not charged, until threshold met
4. **Human support** - Real people who understand birding tourism
5. **Operator control** - Set your prices, your minimums, your cancellation policies
6. **Data ownership** - Export your customer data anytime

### 4.5 Language to Avoid (Kill List)
- "Revolutionary" / "Disruptive" / "Game-changing"
- "AI-powered" (operators don't care, may distrust)
- "Seamless" / "Effortless" (overused, rings hollow)
- "World's leading" / "Best-in-class" (unverifiable)
- "Limited time" / "Act now" / urgency language
- Startup jargon: "scale," "leverage," "synergy"
- Generic stock photos of "business people"
- Fake testimonials or placeholder quotes

---

## 5. Page Structure & Information Architecture

### 5.1 Section Order (Scroll Journey)

The page follows the operator's mental journey:
1. **Recognition** - "This page understands my problem"
2. **Interest** - "This could solve it"
3. **Understanding** - "Here's how it works"
4. **Trust** - "Others like me use it"
5. **Evaluation** - "What does it cost?"
6. **Action** - "How do I start?"

### 5.2 Section Breakdown

---

#### SECTION 1: Hero (Above the Fold)
**Purpose:** Instant recognition that this platform understands operator pain. Hook them emotionally.

**Content:**
- **Headline:** "Stop Gambling on Tour Viability. Start Guiding."
- **Subhead:** "List your tour with a minimum threshold. We collect deposits, track progress, and only charge cards when you're ready to run. You commit to suppliers when birders commit to you."
- **Primary CTA:** "List Your First Tour" → links to /operator/onboarding
- **Secondary CTA:** "See How It Works" → smooth scroll to How It Works section
- **Visual:** Photo of operator in the field (NOT at a computer). Ideally Dale or a real operator.

**Design Notes:**
- Clean, uncluttered
- Large readable text (18px+ body, 48px+ headline)
- High contrast for 50-70 demographic
- No animations or distracting elements
- Mobile: Stack vertically, CTA buttons full-width

---

#### SECTION 2: Problem Statement (The Emotional Hook)
**Purpose:** Deepen recognition. Show we understand their specific frustrations.

**Content Structure:**
Three pain points, each with:
- **Pain headline** (the problem)
- **Reality description** (2-3 sentences of emotional truth)
- **Platform solution** (1 sentence)

**Pain Point 1: The Deposit Gamble**
> "You've paid the boat. The lodge. The catering. You need six participants. You have three. Now you're praying strangers find your Facebook post before you lose $4,000."
>
> **On Quorum:** Tours only go live when they hit your minimum. Cards aren't charged until you're ready to run.

**Pain Point 2: The Admin Trap**
> "You spent thirty years learning to identify every warbler by ear. Now you spend thirty hours a week in Gmail, chasing payments, answering the same questions, updating spreadsheets."
>
> **On Quorum:** Bookings, deposits, pre-trip info, and confirmations—all automated. You focus on guiding.

**Pain Point 3: The Invisible Expert**
> "There are birders right now searching for exactly what you offer. But they can't find you. You're not on the first page of Google. You're posting to Facebook and hoping."
>
> **On Quorum:** Birders search by species. They get notified when you list a tour matching their chase list.

**Design Notes:**
- Cards or alternating layout
- Icons that represent each problem (NOT generic "business" icons)
- Subtle, warm color palette
- Real photography, not illustrations

---

#### SECTION 3: How It Works (Process Explanation)
**Purpose:** Show the simple mechanics. Remove mystery. Build confidence.

**Content Structure:**
Four steps, clearly numbered:

**Step 1: List Your Tour**
> Tell us what you're running—species, dates, price, minimum participants. No complex forms. No 47-field dashboards.

**Step 2: Birders Commit**
> Your tour appears in search. Birders who want your target species get notified. When they book, their card is held—not charged.

**Step 3: Threshold Reached**
> When you hit your minimum, the tour goes green. All participants are notified. Cards are charged simultaneously.

**Step 4: You Guide**
> Commit to your suppliers with confidence. The participants are confirmed. The deposits are in. Do what you love.

**Supporting Element:** Progress indicator mockup showing "5/8 spots filled - 3 to confirmation"

**Design Notes:**
- Horizontal timeline on desktop, vertical on mobile
- Clear visual progression
- Each step has an icon
- No technical jargon

---

#### SECTION 4: Trust & Transparency (Financial Details)
**Purpose:** Address the "what's the catch?" question directly.

**Content Structure:**

**Pricing Model:**
- **Commission:** 6% only on successful bookings
- **No monthly fees**
- **No setup costs**
- **No charge if tour doesn't reach threshold**

**How Money Flows:**
> When your tour threshold is met, participant cards are charged. Funds are held securely. Your payout arrives within 3-5 business days of tour completion, minus our 6% commission.

**What's Included:**
- Booking management dashboard
- Automated deposit collection
- Pre-trip communication tools
- Species-based tour discovery
- Real human support

**Comparison (if appropriate):**
| | Quorum Tours | FareHarbor | DIY (Spreadsheets) |
|---|---|---|---|
| Commission | 6% | 6%+ | 0% |
| Monthly fee | $0 | $0-$199 | $0 |
| Threshold mechanics | ✓ | ✗ | ✗ |
| Species-based discovery | ✓ | ✗ | ✗ |
| Payment chasing | None | Manual | All manual |

**Design Notes:**
- Clean table layout
- No "most popular" badges or fake urgency
- Honest comparison, don't trash competitors
- Link to full terms/FAQ

---

#### SECTION 5: Social Proof (Operator Testimonials)
**Purpose:** Show that real operators like them use and trust the platform.

**Content Structure:**

**If testimonials available:**
- 2-3 operator quotes with:
  - Name and business
  - Location
  - Photo (real, in the field)
  - Specific outcome quote ("I used to spend 10 hours/week on admin...")

**If testimonials not yet available (placeholder structure):**
> "We're currently onboarding our first operators. Want to be among them? [Get early access]"

**Alternative Social Proof:**
- Number of tours listed
- Number of operators on platform
- Total bookings processed
- Species covered

**Design Notes:**
- Real photos only
- Authentic quotes (not marketing speak)
- Location helps (shows geographic reach)
- Keep testimonials brief and outcome-focused

---

#### SECTION 6: FAQ (Address Objections)
**Purpose:** Answer the questions they're thinking but not asking.

**Content Structure:**

**Q: What happens if my tour doesn't reach the minimum?**
> A: Nothing. No cards are charged. You're not out anything except the listing time. You can re-run the tour with different dates or a lower minimum.

**Q: How do participants know the tour might not run?**
> A: Complete transparency. They see exactly how many spots are filled and how many are needed. They know their card won't be charged until the threshold is met.

**Q: Can I set my own cancellation policy?**
> A: Yes. You set your minimum threshold, deadline, and what happens if participants cancel after the tour is confirmed.

**Q: How do I get paid?**
> A: When your tour is complete, funds are released to your account within 3-5 business days, minus our 6% commission. You connect your bank account during onboarding.

**Q: What if I already have my own website and booking system?**
> A: Many operators use Quorum for the threshold mechanics and species-based discovery, then link back to their own site for additional tours. You control how much you use us.

**Q: How is this different from Viator or GetYourGuide?**
> A: Those platforms take 20-30% commission and bury small operators under big companies. We're built specifically for independent wildlife tour operators with fair commission and a booking model that reduces your risk.

**Q: What kind of support do you offer?**
> A: Real humans who understand birding tourism. Email support with response within 24 hours. Phone/video calls available for complex questions. We don't hide behind chatbots.

**Design Notes:**
- Accordion/expandable format
- Grouped by topic if >6 questions
- Link to full FAQ/Help Center
- No hiding important info here (that's a kill-list violation)

---

#### SECTION 7: CTA (Final Conversion)
**Purpose:** Clear call to action. Make it easy to start.

**Content Structure:**

**Headline:** "Ready to List Your First Tour?"

**Subhead:** "Join [X] operators who've stopped gambling on tour viability."

**Primary CTA:** "List Your First Tour" → /operator/onboarding

**Alternate path:** "Have questions? Talk to us" → /contact or mailto:hello@quorumtours.com

**Reassurance line:** "No credit card required. No commitment. Just tell us about your tours."

**Design Notes:**
- High contrast background (dark with light text, or accent color)
- Large CTA button (48px+ touch target)
- No form on this page—just the click-through
- Phone number visible for those who prefer calling

---

### 5.3 Footer
Standard global footer with:
- Contact information (email, potentially phone)
- Legal links (Terms, Privacy)
- Social links (@quorumtours)
- Navigation to main site sections

---

## 6. User Stories

### 6.1 Operator Discovery Stories

**US-OP-001: First Impression**
> As a tour operator visiting this page for the first time,
> I want to immediately understand what problem this platform solves,
> So that I can decide if it's worth my time to learn more.

**Acceptance Criteria:**
- [ ] Hero headline communicates core value proposition within 5 seconds
- [ ] No jargon or startup language that confuses
- [ ] Visual shows someone like me (operator in field, not office worker)

---

**US-OP-002: Understanding the Financial Model**
> As a tour operator concerned about profitability,
> I want to clearly understand what this platform costs,
> So that I can calculate whether it makes sense for my business.

**Acceptance Criteria:**
- [ ] Commission rate (6%) is clearly stated
- [ ] "No monthly fees" is explicit
- [ ] "Only pay on successful bookings" is explicit
- [ ] Comparison to alternatives helps contextualize

---

**US-OP-003: Understanding the Threshold Mechanic**
> As a tour operator who has lost money on unfilled tours,
> I want to understand exactly how the threshold system works,
> So that I can see how it protects me from financial risk.

**Acceptance Criteria:**
- [ ] "How It Works" section explains the 4-step process
- [ ] Progress indicator visual makes the concept concrete
- [ ] FAQ addresses "what if tour doesn't fill"
- [ ] Clear that cards aren't charged until threshold is met

---

**US-OP-004: Evaluating Trust & Legitimacy**
> As a tour operator who has been burned by technology before,
> I want to see that this platform is legitimate and trustworthy,
> So that I can feel confident putting my business here.

**Acceptance Criteria:**
- [ ] Real operator testimonials (or clear "early stage" messaging)
- [ ] Human support promised, not chatbot
- [ ] Contact information visible (email at minimum)
- [ ] No fake urgency or pressure tactics

---

**US-OP-005: Starting the Onboarding Journey**
> As a tour operator ready to try the platform,
> I want a clear, low-pressure way to get started,
> So that I can evaluate it without major commitment.

**Acceptance Criteria:**
- [ ] CTA is prominent and clear
- [ ] "No credit card required" reassurance
- [ ] Alternative contact path for questions
- [ ] Phone number for those who prefer calling

---

### 6.2 Emotional Journey Stories

**US-OP-006: Feeling Understood**
> As a tour operator frustrated by admin burden,
> I want to read content that reflects my actual daily experience,
> So that I feel this platform was built by people who understand me.

**Acceptance Criteria:**
- [ ] Problem Statement section uses specific, emotional language
- [ ] References real pain points (spreadsheets, payment chasing, Facebook posting)
- [ ] Avoids generic "streamline your operations" language

---

**US-OP-007: Seeing Myself in the Solution**
> As a non-technical tour operator,
> I want to see that this platform is simple enough for me,
> So that I don't fear a steep learning curve.

**Acceptance Criteria:**
- [ ] "Built for birders, not IT departments" messaging
- [ ] Visual of dashboard is clean and simple (if shown)
- [ ] FAQ addresses "I'm not technical" concern
- [ ] No jargon (API, integration, sync, etc.)

---

**US-OP-008: Comparing to Alternatives**
> As a tour operator evaluating multiple options,
> I want to understand how this differs from other platforms,
> So that I can make an informed choice.

**Acceptance Criteria:**
- [ ] Comparison table or section explains differentiators
- [ ] Honest about limitations (not "best at everything")
- [ ] Species-based discovery highlighted as unique
- [ ] Threshold mechanics positioned as core differentiator

---

### 6.3 Technical User Stories

**US-OP-009: Mobile Accessibility**
> As a tour operator who primarily uses mobile devices,
> I want the page to work perfectly on my phone,
> So that I can evaluate and potentially sign up from anywhere.

**Acceptance Criteria:**
- [ ] All content readable at 375px width
- [ ] Touch targets 48px minimum
- [ ] No horizontal scroll
- [ ] CTA buttons full-width on mobile
- [ ] Page loads in <3 seconds on 4G

---

**US-OP-010: Accessibility for Older Users**
> As a tour operator with vision concerns,
> I want the page to be highly readable,
> So that I don't struggle to understand the content.

**Acceptance Criteria:**
- [ ] Body text 18px minimum
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] No light gray text on white backgrounds
- [ ] Interactive elements clearly distinguishable
- [ ] Page works with screen reader

---

**US-OP-011: Fast Loading**
> As a tour operator in a regional area with slow internet,
> I want the page to load quickly,
> So that I don't abandon before seeing the content.

**Acceptance Criteria:**
- [ ] Largest Contentful Paint <2.5 seconds
- [ ] No render-blocking resources
- [ ] Images optimized and lazy-loaded below fold
- [ ] Total page weight <2MB

---

### 6.4 Conversion User Stories

**US-OP-012: Finding Contact Information**
> As a tour operator who prefers phone conversations,
> I want to easily find a way to call or email,
> So that I can ask questions before committing.

**Acceptance Criteria:**
- [ ] Email address visible (hello@quorumtours.com)
- [ ] Phone number if available
- [ ] Contact option near CTA
- [ ] Response time expectation set

---

**US-OP-013: Learning More Before Signing Up**
> As a cautious tour operator,
> I want access to additional information,
> So that I can research thoroughly before committing.

**Acceptance Criteria:**
- [ ] FAQ section addresses common objections
- [ ] Link to full Terms of Service
- [ ] Link to Privacy Policy
- [ ] "How It Works" for birders link (so they can see customer experience)

---

## 7. Component Inventory

### 7.1 New Components Required

| Component | Description | Location |
|-----------|-------------|----------|
| `OperatorHero` | Hero section with headline, subhead, CTAs, operator photo | Section 1 |
| `PainPointCard` | Card displaying problem headline, description, solution | Section 2 |
| `ProcessStep` | Numbered step with icon, title, description | Section 3 |
| `PricingTransparency` | Pricing details with included features | Section 4 |
| `ComparisonTable` | Feature comparison vs alternatives | Section 4 |
| `OperatorTestimonial` | Testimonial card with photo, quote, name, location | Section 5 |
| `FAQAccordion` | Expandable FAQ items | Section 6 |
| `OperatorCTA` | Final CTA section with headline, button, reassurance | Section 7 |

### 7.2 Existing Components to Reuse

| Component | From | Notes |
|-----------|------|-------|
| `Button` | Design system | Primary and secondary variants |
| `Container` | Design system | Max-width wrapper |
| `Footer` | Global | Standard footer |
| `GlobalNav` | Global | Standard navigation |

### 7.3 Design System Tokens

Reference existing design system. Key requirements:
- Primary color: Brand green
- Background: White or very light neutral
- Text: Dark (high contrast)
- Accent: Used sparingly for CTAs
- Typography: System font stack, 18px body minimum

---

## 8. Anti-Patterns & Kill List

### 8.1 Content Kill List
Based on research, the following MUST NOT appear:

| Pattern | Reason |
|---------|--------|
| "Revolutionary" / "Disruptive" | Startup hype, triggers skepticism |
| "AI-powered" | Operators don't care, may distrust |
| "Limited time offer" | Fake urgency |
| Stock photos of offices/suits | Disconnected from operator reality |
| Fake testimonials | Trust killer |
| "Schedule a demo" as primary CTA | Too high commitment |
| Hidden pricing | Trust killer |
| Complex dashboards in screenshots | Intimidating |
| Generic SaaS pricing cards | Looks template-y |
| Feature walls (long lists) | Overwhelming |
| Chatbot/automated support promises | Operators want humans |
| "Best-in-class" / "World's leading" | Unverifiable claims |

### 8.2 Design Kill List

| Pattern | Reason |
|---------|--------|
| Light gray text | Fails accessibility, hard for 50-70 demo |
| Small touch targets | Mobile usability |
| Carousel testimonials | Content hidden, frustrating |
| Autoplaying video | Unexpected, data-heavy |
| Pop-ups/modals on entry | Annoying, disruptive |
| Excessive animation | Distracting, slows page |
| Multi-column layouts on mobile | Broken responsiveness |
| "Most Popular" badges on pricing | Manipulative |

### 8.3 Template-Likeness Score (TLS) Targets
Per project protocols:
- Overall TLS: <25 (must not look like generic template)
- No more than 2 standard SaaS patterns per section
- Every section must have at least one custom element

---

## 9. Technical Requirements

### 9.1 Performance
- Lighthouse Performance Score: >90
- LCP: <2.5s
- FID: <100ms
- CLS: <0.1
- Total page weight: <2MB

### 9.2 Accessibility
- WCAG 2.1 AA compliance target
- Color contrast: 4.5:1 minimum (text)
- Touch targets: 48px minimum
- Keyboard navigation: All interactive elements focusable
- Screen reader: Semantic HTML, ARIA where needed

### 9.3 SEO
- Title: "For Tour Operators | Quorum Tours - Tours That Run When Ready"
- Meta description: "Stop gambling on tour viability. Quorum Tours helps wildlife tour operators list tours with minimum thresholds—cards aren't charged until you're ready to run."
- H1: Hero headline
- Proper heading hierarchy (H1 → H2 → H3)
- Image alt text on all images

### 9.4 Mobile Requirements
- Responsive from 375px to 1920px
- Touch-friendly interface
- No hover-dependent interactions
- Sticky CTA on mobile (consider)

---

## 10. Success Validation

### 10.1 Pre-Launch Checklist
- [ ] All user stories pass acceptance criteria
- [ ] Page passes Lighthouse audits (Performance >90, Accessibility >90)
- [ ] Kill list violations: 0
- [ ] TLS score: <25
- [ ] Mobile tested on real devices (iOS + Android)
- [ ] Browser tested (Chrome, Firefox, Safari)
- [ ] Copy reviewed for tone alignment
- [ ] Legal links present and working

### 10.2 Post-Launch Metrics
| Metric | Measurement | Target | Timeframe |
|--------|-------------|--------|-----------|
| Page views | Analytics | Baseline | Week 1 |
| Avg time on page | Analytics | >2 min | Month 1 |
| CTA click rate | Analytics | >8% | Month 1 |
| Inquiry/signup rate | Forms | >3% | Month 1 |
| Operator feedback | Qualitative | Positive | Ongoing |

---

## 11. Dependencies & Risks

### 11.1 Dependencies
| Dependency | Status | Impact |
|------------|--------|--------|
| Operator onboarding flow | Built | CTA must link correctly |
| Design system tokens | Defined | Consistent styling |
| Photography assets | TBD | Need real operator photos |
| Testimonials | TBD | May need placeholder |

### 11.2 Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| No operator photos available | Medium | High | Use landscape/wildlife photos, avoid people |
| No testimonials yet | High | Medium | Clear "early access" messaging |
| Page too long | Low | Medium | Test scroll depth, optimize |
| Copy doesn't resonate | Low | High | Test with Dale for feedback |

---

## 12. Appendix

### 12.1 Research Sources
- Quorum Pain Points Master Synthesis (ChatGPT, Gemini, Claude)
- Mallacoota Feasibility Study
- Phase 5 Master Research Synthesis
- Operator Profile Research
- Commission Rate Analysis

### 12.2 Related Documents
- `/mnt/project/quorum-pain-points-master-synthesis.md`
- `/mnt/project/quorum_tours_claude_code_master_system_document.md`
- Notion: Quorum Tours — Build Control

### 12.3 Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 24, 2026 | Claude | Initial PRD |

---

*End of PRD-FOR-OPERATORS-001*