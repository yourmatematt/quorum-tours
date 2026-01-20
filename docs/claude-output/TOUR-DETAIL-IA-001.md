# TOUR-DETAIL-IA-001 — Tour Detail Page Information Architecture

```
STATUS: READY_FOR_REVIEW
TASK_ID: TOUR-DETAIL-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Tour Detail page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/wireframes.md
  - docs/claude-output/TOURS-IA-001.md
  - docs/claude-output/HOME-IA-001.md
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/tls-component-rubrics.md
  - claude/protocols/kill-list-base.json
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE1-DISCOVERY
GATES_PASSED:
  - GATE-MSG-STRICT
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## Tour Detail Page — Detailed IA Specification

### Primary Job

Eliminate anxiety before commitment. Users arrive from the Tours Index to evaluate a specific tour. Every element must reduce uncertainty about what they're committing to, what happens if thresholds aren't met, and who is leading the experience.

### User Entry Points

1. Tours Index: Click on TourCard
2. Direct link: Shared URL from another user
3. Operator Profile: Link from operator's tour list
4. Search engine: Indexed tour detail page

### Page Structure Philosophy

This is an **anxiety-reduction surface**, not a sales page. Users arrive with interest but need:
- Certainty about the tour's confirmation status
- Clarity about what they're committing to
- Confidence in the operator's credibility
- Understanding of what happens in all scenarios

The page answers: "What am I getting into, and what could go wrong?"

---

## Section 1: Tour Confirmation Status (Above the Fold)

**Target TLS:** < 18 (trust-first, no persuasion)

**Intent:**
- Confirmation state is THE dominant visual element
- Threshold clarity: how many needed, how many committed
- What happens next explained visually
- User knows immediately if this tour is viable

**Structure:**
- Full-width status banner at top of content
- Three-state design: Confirmed / Forming / Not Running
- Progress indicator with exact numbers
- Next-step explanation per state

**State-Specific Content:**

| State | Banner | Progress Display | Next Step |
|-------|--------|------------------|-----------|
| Confirmed | "This tour is confirmed" (green) | "X birders committed · Tour is running" | "Join X others" |
| Forming | "This tour is forming" (amber) | "X of Y birders committed" | "Y more needed to confirm" |
| Not Running | "This tour did not reach threshold" (gray) | "X of Y needed" | "This tour is closed" |

**Anti-Template Requirements:**
- NO urgency language ("Only X spots left!")
- NO countdown timers
- NO animated progress bars
- Calm, factual presentation
- Numbers are informational, not pressure tactics

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ConfirmationBanner | Full-width, state-colored header |
| ThresholdProgress | Large format progress with numbers |
| StatusExplanation | What this status means for the user |
| NextStepIndicator | Clear path forward per state |

---

## Section 2: Core Tour Overview

**Target TLS:** < 18

**Intent:**
- What this tour is designed to achieve
- Set expectations without overpromising
- Explicit uncertainty acknowledgment

**Structure:**
- Tour title (H1, display font)
- Operator attribution (links to operator profile)
- Date and duration
- Location with map reference (static, not interactive)
- Tour description (what users will experience)
- Explicit "no guarantees" acknowledgment

**Content Requirements:**
- Description focuses on experience, not promises
- Uncertainty is explicit: "Sightings depend on conditions"
- No superlatives or marketing language
- Practical information first

**Anti-Template Requirements:**
- NO "once in a lifetime" language
- NO hero image carousel
- NO testimonial snippets in overview
- Factual, not aspirational

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| TourTitle | H1, display font, no subtitle |
| OperatorAttribution | Name + link to profile |
| TourMeta | Date, duration, location |
| LocationIndicator | Region/area, optional static map |
| TourDescription | 2-3 paragraphs max |
| ExpectationsDisclaimer | Explicit uncertainty statement |

---

## Section 3: Species Focus & Likelihood

**Target TLS:** < 15

**Intent:**
- Core vs secondary vs opportunistic targets
- Confidence signals without promises
- Help users understand realistic expectations

**Structure:**
- Primary target species (1-3, high likelihood)
- Secondary targets (3-5, moderate likelihood)
- Opportunistic species (expandable list)
- Likelihood indicated visually, not numerically

**Likelihood Framework:**
| Category | Visual Treatment | Language |
|----------|------------------|----------|
| Primary | Prominent, above fold | "Core focus of this tour" |
| Secondary | Listed, visible | "Commonly observed" |
| Opportunistic | Collapsed, expandable | "Possible depending on conditions" |

**Anti-Template Requirements:**
- NO percentage likelihood claims
- NO "guaranteed sightings"
- NO species counts as selling point
- Honest about variability

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| SpeciesGroup | Container for species category |
| SpeciesItem | Individual species with likelihood indicator |
| LikelihoodBadge | Visual indicator (not numeric) |
| ExpandableList | Show more for opportunistic species |

---

## Section 4: Operator Summary (Preview)

**Target TLS:** < 18

**Intent:**
- Human identity establishes trust
- Expertise snapshot before commitment
- Clear path to full profile

**Structure:**
- Operator photo (real, not avatar)
- Name and brief title/specialization
- Experience summary (years, specialty areas)
- Verification status (if applicable)
- "View full profile" link

**Content Requirements:**
- Focus on relevant expertise for this tour
- No marketing copy or self-promotion
- Credentials stated factually
- Link to full profile for deep audit

**Anti-Template Requirements:**
- NO testimonial snippets in preview
- NO "trusted by X users" claims
- NO badges or awards in preview
- Preview only, full profile available

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| OperatorPreview | Compact card format |
| OperatorPhoto | Real photo, not placeholder |
| OperatorCredentials | Title, experience summary |
| VerificationBadge | Binary, restrained |
| ProfileLink | CTA to full operator profile |

---

## Section 5: Logistics & Reassurance

**Target TLS:** < 15

**Intent:**
- Anxiety-reducing details only
- Capacity, comfort, safety
- Practical information that affects decision

**Structure:**
- Group size (max participants)
- Physical requirements / accessibility
- What's included / not included
- Meeting point and timing
- Cancellation / refund conditions
- Weather contingencies

**Content Categories:**
1. **Capacity & Group**
   - Max group size
   - Current committed (links to status)
   - Group composition notes (if relevant)

2. **Physical Requirements**
   - Fitness level needed
   - Accessibility accommodations
   - Equipment provided vs required

3. **Inclusions**
   - What's covered (transport, meals, etc.)
   - What's NOT covered (explicit)
   - Equipment provided

4. **Conditions & Policies**
   - Cancellation terms (clear, not buried)
   - Weather policy
   - What happens if tour doesn't confirm

**Anti-Template Requirements:**
- NO hidden conditions in expandable FAQ
- NO vague "contact us for details"
- All decision-affecting info visible
- Policies stated plainly, not legally

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| LogisticsSection | Container with icon + content |
| InclusionsList | What's included/excluded |
| RequirementsList | Physical/equipment requirements |
| PolicyBlock | Clear statement of terms |
| ConditionsDisclosure | Weather, cancellation, threshold |

---

## Section 6: Commitment Path (UI Only)

**Target TLS:** < 20 (CTA section)

**Intent:**
- Expression of interest
- Conditional commitment explanation
- No payment implementation (Phase 1)

**Structure:**
- Primary CTA: "Express Interest" or "Join This Tour"
- Explanation of what commitment means
- What happens after expressing interest
- Price/contribution display (informational)

**CTA States:**
| Tour State | CTA Text | Explanation |
|------------|----------|-------------|
| Confirmed | "Join This Tour" | "This tour is running. Your spot will be confirmed." |
| Forming | "Express Interest" | "You'll be notified when this tour confirms." |
| Not Running | No CTA (disabled) | "This tour did not reach threshold." |

**Commitment Explanation:**
- "Expressing interest is not a binding commitment"
- "You'll be notified when the tour reaches threshold"
- "Payment is only collected after confirmation"
- No hidden obligations

**Anti-Template Requirements:**
- NO "Book Now" urgency
- NO fake scarcity ("Only X spots!")
- NO payment forms (UI shell only)
- Commitment is explained, not assumed

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| CommitmentCard | Sticky or inline CTA container |
| PriceDisplay | Amount, what it covers |
| CTAButton | State-aware primary action |
| CommitmentExplanation | What happens after click |
| InterestIndicator | Show current interest count |

---

## Section 7: FAQs (Strictly Secondary)

**Target TLS:** < 12 (minimal, utility)

**Intent:**
- Edge-case clarification only
- NOT a place to hide important info
- Supplements, doesn't replace, main content

**Structure:**
- Accordion format
- 4-6 questions maximum
- Tour-specific, not generic
- Links to relevant policies if needed

**Appropriate FAQ Content:**
- "What if I need to cancel after the tour confirms?"
- "Can I bring my own equipment?"
- "What happens if weather forces a reschedule?"
- "Are there age restrictions?"

**Anti-Template Requirements:**
- NO core mechanics hidden in FAQ
- NO "Contact us for pricing"
- NO generic questions
- If a question is common, info belongs in main content

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| FAQSection | Container with heading |
| FAQAccordion | Expandable question/answer |
| FAQItem | Individual Q&A pair |

---

## Full Component Inventory (Tour Detail Page)

| Component | TLS Category | Key Differentiation |
|-----------|--------------|---------------------|
| ConfirmationBanner | Trust | State-colored, full-width |
| ThresholdProgress | Proof | Large format, exact numbers |
| StatusExplanation | Copy | Plain language per state |
| TourTitle | Typography | H1, display font |
| OperatorAttribution | Trust | Links to full profile |
| TourMeta | Layout | Date, duration, location |
| TourDescription | Copy | Experience-focused, no promises |
| ExpectationsDisclaimer | Trust | Explicit uncertainty |
| SpeciesGroup | Layout | Categorized by likelihood |
| SpeciesItem | DNA | Custom likelihood indicators |
| OperatorPreview | Trust | Compact credibility snapshot |
| LogisticsSection | Layout | Icon + content pattern |
| InclusionsList | Copy | Clear included/excluded |
| PolicyBlock | Trust | Visible conditions |
| CommitmentCard | CTA | State-aware, explained |
| PriceDisplay | Copy | Transparent, informational |
| CTAButton | Interaction | No urgency, state-aware |
| FAQAccordion | Interaction | Custom expand, not chevrons |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Single column primary, no card grids |
| KL-LAYOUT-004 | PASS | All text left-aligned |
| KL-COMP-001 | PASS | No lift+shadow hover |
| KL-COMP-005 | PASS | No carousel testimonials |
| KL-COMP-006 | ADVISORY | FAQ uses +/- not chevrons |
| KL-CONTENT-001 | PASS | No LLM words |
| KL-CONTENT-004 | PASS | Specific details, not generic |
| KL-CONTENT-005 | PASS | All conditions visible |
| KL-CONTENT-006 | PASS | No "Learn More" CTAs |
| KL-IMAGE-001 | PASS | No undraw illustrations |
| KL-TRUST-002 | PASS | No generic testimonials |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Confirmation Status | Trust/Proof | < 18 |
| Core Overview | Layout/Copy | < 18 |
| Species Focus | Cards/DNA | < 15 |
| Operator Preview | Trust | < 18 |
| Logistics | Layout | < 15 |
| Commitment Path | CTA | < 20 |
| FAQs | Utility | < 12 |

---

## Page Layout Structure

```
┌─────────────────────────────────────────┐
│ GlobalNav                               │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ CONFIRMATION STATUS BANNER          │ │
│ │ Status · Progress · Next Step       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│                                         │
│ ┌───────────────────┐ ┌───────────────┐ │
│ │ CORE OVERVIEW     │ │ COMMITMENT    │ │
│ │ Title             │ │ CARD          │ │
│ │ Operator          │ │ (Sticky)      │ │
│ │ Date/Location     │ │               │ │
│ │ Description       │ │ Price         │ │
│ └───────────────────┘ │ CTA           │ │
│                       │ Explanation   │ │
│ ┌───────────────────┐ └───────────────┘ │
│ │ SPECIES FOCUS     │                   │
│ │ Primary/Secondary │                   │
│ └───────────────────┘                   │
│                                         │
│ ┌───────────────────┐                   │
│ │ OPERATOR PREVIEW  │                   │
│ └───────────────────┘                   │
│                                         │
│ ┌───────────────────┐                   │
│ │ LOGISTICS         │                   │
│ └───────────────────┘                   │
│                                         │
│ ┌───────────────────┐                   │
│ │ FAQs              │                   │
│ └───────────────────┘                   │
│                                         │
└─────────────────────────────────────────┘
```

Desktop: Two-column layout with sticky commitment card
Mobile: Single column, commitment card at bottom (fixed or inline)

---

## Integration Requirements

### Navigation
- Breadcrumb: Home > Tours > [Tour Name]
- Back link to Tours Index
- GlobalNav persistent

### Routing
- Route: `/tours/[id]`
- Canonical URL with tour slug
- Social sharing meta tags

### Cross-Page Consistency
- ConfirmationStatusBadge reused from Tours Index
- ThresholdProgressBar reused (larger variant)
- OperatorPreview links to Operator Profile page
- TourCard in "Related Tours" (if implemented)

### Data Requirements (UI Only)
```typescript
interface TourDetail {
  id: string;
  title: string;
  status: 'confirmed' | 'forming' | 'not-running';
  currentParticipants: number;
  threshold: number;
  date: string;
  duration: string;
  location: string;
  description: string;
  operator: OperatorPreview;
  species: SpeciesGroup[];
  logistics: LogisticsInfo;
  price: PriceInfo;
  faqs: FAQItem[];
}
```

---

## Accessibility Requirements

- Confirmation status announced on page load
- All interactive elements keyboard accessible
- Status banner uses appropriate ARIA roles
- FAQ accordion follows WAI-ARIA pattern
- Sticky commitment card doesn't trap focus
- Clear focus management for state changes
- Alt text for operator photo
- Skip link to main content

---

## Responsive Behavior

| Viewport | Layout | Commitment Card |
|----------|--------|-----------------|
| Desktop (1024px+) | Two-column, sticky sidebar | Sticky in right column |
| Tablet (768-1023px) | Single column | Inline after overview |
| Mobile (<768px) | Single column | Fixed bottom bar or inline |

---

```
NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. If approved: frontend-implementer receives TOUR-DETAIL-UI-001 task
  3. visual-qa to capture evidence after implementation
  4. a11y-auditor to run baseline checks after implementation
```
