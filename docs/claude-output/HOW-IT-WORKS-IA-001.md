# HOW-IT-WORKS-IA-001 — How It Works Page Information Architecture

```
STATUS: APPROVED
TASK_ID: HOW-IT-WORKS-IA-001
TASK: Define Information Architecture, section intent, and component inventory for How It Works page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
APPROVED_BY: orchestrator
APPROVED_DATE: 2026-01-20
INPUTS_USED:
  - docs/wireframes.md (PAGE 6 specification)
  - docs/claude-output/HOME-IA-001.md
  - docs/claude-output/TOUR-DETAIL-IA-001.md
  - claude/protocols/kill-list-base.json
  - claude/protocols/tls-component-rubrics.md
  - src/components/home/HowItWorksSection.tsx (existing component)
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
GATES_PASSED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## How It Works Page — Detailed IA Specification

### Primary Job

Serve as a **calm, comprehensive reference** that users can return to whenever they need to understand how Quorum works. Unlike the Home page (which introduces the concept briefly), this page answers every question about the mechanics before users need to ask.

### User Entry Points

1. **Home Page:** "How confirmation works" pathway link
2. **Tour Detail:** Users confused about confirmation status
3. **Global Navigation:** "How It Works" nav item
4. **Direct Link:** Shared when explaining Quorum to others
5. **Search:** Users searching for "how does tour confirmation work"

### Page Philosophy

This is an **explainer**, not a sales page. Users arrive because:
- They don't fully understand the threshold mechanic
- They want to know what happens in edge cases
- They need to explain Quorum to someone else
- They're deciding whether to commit and want full clarity

The tone is: calm, transparent, thorough. No persuasion. No urgency.

### Differentiation from Home Page

| Aspect | Home Page | How It Works Page |
|--------|-----------|-------------------|
| Depth | 3-step overview | Full mechanic explanation |
| Edge Cases | One clarification | All scenarios covered |
| Length | Brief section | Dedicated reference |
| Purpose | Introduce | Educate and reassure |
| Return Visits | Once | As needed |

---

## Section 1: The Problem (Synchronization Gap)

**Target TLS:** < 18 (explanatory, factual)

**Intent:**
- Explain WHY Quorum exists
- Name the problem clearly: demand exists but is invisible
- No blame, no drama—just the structural reality
- User understands the gap before the solution

**Structure:**
- Clear problem statement headline
- 2-3 paragraphs explaining the synchronization gap
- Visual representation of the gap (optional diagram)
- No solutions mentioned yet—problem only

**Content Requirements:**
- Factual explanation of hidden demand
- Acknowledge both sides: birders want tours, operators need commitment
- No villain narrative (operators aren't bad, birders aren't unreasonable)
- Specific example: "4 birders in Brisbane each want a shorebird tour. None knows the others exist."

**Anti-Template Requirements:**
- NO "traditional booking is broken" attack framing
- NO dramatized pain points
- NO LLM words (unlock, seamless, etc.)
- Problem stated neutrally and factually

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ProblemSection | Container with background |
| SectionHeadline | H2, display font, left-aligned |
| ExplanationText | Body paragraphs |
| GapDiagram | Optional visual showing invisible demand |

---

## Section 2: The Quorum Mechanic (Core Explanation)

**Target TLS:** < 15 (educational, visual)

**Intent:**
- Full explanation of how threshold-based confirmation works
- Three stages explained in detail (not just named)
- User understands what happens at each stage
- No ambiguity about when money changes hands

**Structure:**
- Section headline
- Three-stage breakdown with detailed explanations:
  1. **Express Interest** — What it means, what happens, no obligation
  2. **Commit Conditionally** — What you're agreeing to, when you're charged
  3. **Tour Confirms** — Threshold met, everyone notified, tour runs
- Visual flow diagram connecting stages
- Key clarification boxes for common questions

**Stage Detail Requirements:**

| Stage | Must Explain |
|-------|--------------|
| Express Interest | Signal joins aggregate, no account needed, no charge |
| Commit Conditionally | Agreement to join IF threshold met, payment hold (not charge) |
| Tour Confirms | Threshold reached, all commits charged, tour guaranteed |

**Visual Elements:**
- Progress indicator showing stages
- Arrows or connectors between stages
- State indicators (forming → confirmed)

**Anti-Template Requirements:**
- NO 3-column icon grid with default icons
- NO dense text blocks
- NO hidden mechanics in expandable sections
- Each stage is fully visible, not collapsed

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| MechanicSection | Container |
| StageCard | Detailed stage explanation |
| StageNumber | Visual step indicator |
| StageTitle | Action name |
| StageExplanation | Full detail of what happens |
| StageVisual | Simple icon or diagram |
| FlowConnector | Visual connection between stages |
| ClarificationBox | Inline answer to common question |

---

## Section 3: What Happens If a Tour Doesn't Run

**Target TLS:** < 15 (reassurance, transparency)

**Intent:**
- Directly address the primary anxiety
- Clear, unambiguous answer
- User knows exactly what happens in failure case
- No hidden consequences

**Structure:**
- Direct headline ("What if the tour doesn't reach its threshold?")
- Simple, clear answer (not charged, commitment expires)
- Explanation of timeline (when does commitment expire)
- What notification looks like
- No apologies or hedging—just facts

**Content Requirements:**
- Explicit: "You are not charged"
- Timeline: When does commitment expire?
- Notification: How will you know?
- Next steps: Can you commit to another tour?

**Example Content Pattern:**
```
If a tour does not reach its threshold by the commitment deadline:
- Your conditional commitment expires automatically
- You are not charged
- You receive a notification that the tour did not confirm
- You can immediately commit to other forming tours
```

**Anti-Template Requirements:**
- NO burying this in FAQ
- NO vague language ("may be refunded")
- NO conditional statements ("in most cases")
- Absolute clarity

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| FailureCaseSection | Container with distinct styling |
| DirectQuestion | Headline as question |
| DirectAnswer | Clear, unambiguous response |
| OutcomeList | Bulleted consequences |
| TimelineNote | When expiration happens |

---

## Section 4: What Confirmation Means

**Target TLS:** < 18 (definition, reassurance)

**Intent:**
- Define "confirmed" state precisely
- User knows what they get when a tour confirms
- Expectations are set correctly
- No overselling

**Structure:**
- Definition of confirmed state
- What confirmation guarantees:
  - Tour will run
  - Operator is committed
  - Date and logistics are locked
- What confirmation does NOT guarantee:
  - Species sightings (nature is nature)
  - Weather
  - Exact participant count (above threshold, may vary)

**Guarantee Framework:**
| Guaranteed | Not Guaranteed |
|------------|----------------|
| Tour runs on date | Specific species seen |
| Operator attends | Perfect weather |
| Location as described | Exact group size |
| Duration as stated | Photography opportunities |

**Content Requirements:**
- Confirmation = tour runs, not "success"
- Honest about birding uncertainty
- No promises that can't be kept
- Trust through transparency

**Anti-Template Requirements:**
- NO "100% satisfaction guaranteed" claims
- NO overselling the experience
- Factual definition only

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ConfirmationSection | Container |
| DefinitionBlock | What confirmed means |
| GuaranteeList | What's included |
| HonestyBlock | What's not guaranteed |
| ExpectationSetter | Managing realistic expectations |

---

## Section 5: What Quorum Does Not Do

**Target TLS:** < 15 (boundary-setting, trust-building)

**Intent:**
- Set clear expectations
- Prevent misunderstandings
- Build trust through honesty
- User knows the limits

**Structure:**
- Clear headline ("What Quorum doesn't do")
- List of explicit boundaries:
  - Not a booking platform (no instant confirmation)
  - Not a guarantee of sightings
  - Not a rating/review manipulation system
  - Not a discount aggregator
- Each "not" is explained briefly

**Boundary Definitions:**

| Quorum Is Not | Why This Matters |
|---------------|------------------|
| Instant booking | Tours only run when ready |
| Species guarantee | Nature doesn't work that way |
| Review filter | All feedback shown |
| Discount site | Price reflects quality, not volume |

**Content Requirements:**
- Honest about limitations
- No apologies for what it's not
- Focus on why boundaries benefit users
- Prevents future complaints by setting expectations

**Anti-Template Requirements:**
- NO defensive tone
- NO "but we're still great" pivot
- Confident boundary-setting
- Trust through transparency

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| BoundariesSection | Container |
| BoundaryItem | Single limitation with explanation |
| BoundaryIcon | Visual indicator (X or similar) |
| BoundaryExplanation | Why this boundary exists |

---

## Section 6: Ready to Explore (Soft CTA)

**Target TLS:** < 20 (minimal, non-pushy)

**Intent:**
- Natural exit point after reading
- Pathway to browse tours
- No hard sell, just navigation
- User has full context now

**Structure:**
- Brief closing statement
- Two pathways:
  1. Browse tours (primary)
  2. Return to home (secondary)
- Generous whitespace
- No urgency

**CTA Requirements:**
- Action-specific labels (not "Learn More")
- Primary: "Browse forming tours" or "See what's forming"
- Secondary: "Return to home" or link back
- No fake urgency or countdown

**Anti-Template Requirements:**
- NO "Ready to get started?"
- NO urgency framing
- NO multiple competing CTAs
- Calm, confident closure

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ClosingSection | Minimal container |
| ClosingText | Brief statement |
| PrimaryCTA | Action-specific button |
| SecondaryCTA | Subtle link |

---

## Full Component Inventory (How It Works Page)

| Component | TLS Category | Key Differentiation |
|-----------|--------------|---------------------|
| ProblemSection | Copy | Factual, neutral tone |
| SectionHeadline | Typography | H2, display font, left-aligned |
| ExplanationText | Copy | Body paragraphs, no dense blocks |
| GapDiagram | DNA | Custom visual showing invisible demand |
| MechanicSection | Layout | Full-width, visual flow |
| StageCard | DNA | Detailed explanation, not just icon |
| StageNumber | DNA | Visual step indicator |
| FlowConnector | DNA | Connects stages visually |
| ClarificationBox | Proof | Inline Q&A |
| FailureCaseSection | Trust | Distinct styling, reassurance |
| DirectQuestion | Copy | Headline as question |
| DirectAnswer | Copy | Unambiguous response |
| OutcomeList | Copy | Bulleted consequences |
| ConfirmationSection | Trust | Definition + expectations |
| GuaranteeList | Proof | What's included |
| HonestyBlock | Trust | What's not guaranteed |
| BoundariesSection | Trust | Clear limitations |
| BoundaryItem | Copy | Limitation + why |
| ClosingSection | CTA | Minimal, non-pushy |
| PrimaryCTA | CTA | Action-specific |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | No consecutive card grids |
| KL-LAYOUT-004 | PASS | All text left-aligned |
| KL-COMP-001 | PASS | No lift+shadow hover on cards |
| KL-COMP-002 | PASS | No 4-icon row with default icons |
| KL-COMP-005 | PASS | No carousel |
| KL-CONTENT-001 | PASS | No LLM words |
| KL-CONTENT-004 | PASS | Specific explanations, not generic |
| KL-CONTENT-005 | PASS | All conditions visible (failure case explicit) |
| KL-CONTENT-006 | PASS | Action-specific CTAs |
| KL-IMAGE-001 | PASS | No Undraw illustrations |
| KL-IMAGE-002 | PASS | No gradient blur blobs |
| KL-TRUST-002 | PASS | No generic testimonials |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| The Problem | Copy/Explanation | < 18 |
| The Quorum Mechanic | DNA/Visual | < 15 |
| If Tour Doesn't Run | Trust/Reassurance | < 15 |
| What Confirmation Means | Trust/Definition | < 18 |
| What Quorum Does Not Do | Trust/Boundaries | < 15 |
| Ready to Explore | CTA | < 20 |

---

## Page Layout Structure

```
┌─────────────────────────────────────────┐
│ GlobalNav                               │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ THE PROBLEM                         │ │
│ │ (Synchronization Gap)               │ │
│ │                                     │ │
│ │ Explanation of why demand is        │ │
│ │ invisible and tours don't run       │ │
│ │                                     │ │
│ │ [Optional: Gap diagram]             │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ THE QUORUM MECHANIC                 │ │
│ │                                     │ │
│ │ ┌─────┐     ┌─────┐     ┌─────┐    │ │
│ │ │  1  │ ──► │  2  │ ──► │  3  │    │ │
│ │ │     │     │     │     │     │    │ │
│ │ │Express    │Commit     │Tour      │ │
│ │ │Interest   │Conditionally│Confirms │ │
│ │ └─────┘     └─────┘     └─────┘    │ │
│ │                                     │ │
│ │ [Detailed explanation per stage]    │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ WHAT IF THE TOUR DOESN'T RUN?       │ │
│ │                                     │ │
│ │ • Your commitment expires           │ │
│ │ • You are not charged               │ │
│ │ • You receive notification          │ │
│ │ • You can commit elsewhere          │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ WHAT CONFIRMATION MEANS             │ │
│ │                                     │ │
│ │ Guaranteed:        Not Guaranteed:  │ │
│ │ • Tour runs        • Species seen   │ │
│ │ • Operator attends • Weather        │ │
│ │ • Date locked      • Exact count    │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ WHAT QUORUM DOES NOT DO             │ │
│ │                                     │ │
│ │ ✗ Instant booking                   │ │
│ │ ✗ Species guarantees                │ │
│ │ ✗ Review filtering                  │ │
│ │ ✗ Discount aggregation              │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ READY TO EXPLORE                    │ │
│ │                                     │ │
│ │ [Browse forming tours]              │ │
│ │                                     │ │
│ │ or return to home                   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

Desktop: Single column with generous max-width
Mobile: Single column, sections stack vertically

---

## Navigation & Routing

### Route
- Path: `/how-it-works`
- Canonical: `https://quorumtours.com/how-it-works`
- Title: "How It Works — Quorum Tours"

### Global Nav Highlight
- "How It Works" link is active/highlighted on this page

### Internal Links
- From Home: Section 6 "Pathways Forward"
- From Tour Detail: Link in FAQ or confusion state
- From any confusion point in user journey

### Cross-Page Consistency
- Same GlobalNav as all pages
- Same typography and color tokens
- Stage cards consistent with Home page HowItWorksSection style

---

## Accessibility Requirements

- All section headings use proper hierarchy (H1 for page, H2 for sections)
- Stage cards are navigable by keyboard
- Diagrams have alt text or aria-labels
- Lists use proper semantic markup (ul/li)
- Focus management for any interactive elements
- Skip link to main content
- Color is not sole indicator (checkmarks and X have text labels)

---

## Responsive Behavior

| Viewport | Layout | Stage Cards |
|----------|--------|-------------|
| Desktop (1024px+) | Single column, max-width | Horizontal flow |
| Tablet (768-1023px) | Single column | Horizontal or stacked |
| Mobile (<768px) | Single column | Vertical stack with connectors |

---

## Content Tone Guidelines

| Do | Don't |
|----|-------|
| Explain neutrally | Attack traditional booking |
| State facts | Use superlatives |
| Acknowledge limitations | Hide constraints |
| Build trust through transparency | Persuade or sell |
| Use specific examples | Use generic descriptions |
| Answer questions directly | Bury answers in FAQs |

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| ProblemSection | `src/components/how-it-works/ProblemSection.tsx` | Synchronization gap explanation |
| MechanicSection | `src/components/how-it-works/MechanicSection.tsx` | Full 3-stage explanation |
| StageCard | `src/components/how-it-works/StageCard.tsx` | Individual stage detail |
| FailureCaseSection | `src/components/how-it-works/FailureCaseSection.tsx` | What happens if tour doesn't run |
| ConfirmationSection | `src/components/how-it-works/ConfirmationSection.tsx` | What confirmation means |
| BoundariesSection | `src/components/how-it-works/BoundariesSection.tsx` | What Quorum doesn't do |
| BoundaryItem | `src/components/how-it-works/BoundaryItem.tsx` | Single boundary with explanation |
| ClosingCTA | `src/components/how-it-works/ClosingCTA.tsx` | Soft exit with pathways |

## Components to Reuse

| Component | From | Usage |
|-----------|------|-------|
| GlobalNav | Shared | Page navigation |
| Button | UI | CTA buttons |

---

## Example Content (For Implementation Reference)

### Section 1 Example:
**Headline:** "The synchronization problem"

**Body:** "Demand for birding tours exists—but it's invisible. Four birders in Brisbane each want a shorebird tour next month. None knows the others exist. The operator can't justify running a tour without knowing demand. The birders won't commit without knowing the tour will run. Everyone waits. Nothing happens."

### Section 3 Example:
**Headline:** "What if the tour doesn't reach its threshold?"

**Body:** "Your conditional commitment expires. You are not charged. You receive a notification. You can immediately commit to other forming tours."

### Section 5 Example:
**Boundary:** "Quorum is not instant booking"

**Explanation:** "Tours don't confirm the moment you commit. They confirm when enough birders commit. This is the core mechanic—certainty for everyone, not just speed for one."

---

```
COMPLETED_ACTIONS:
  1. orchestrator approved IA specification — 2026-01-20

NEXT_ACTIONS:
  1. frontend-implementer to receive HOW-IT-WORKS-UI-001 task
  2. visual-qa to capture evidence after implementation
  3. a11y-auditor to run baseline checks after implementation
  4. code-reviewer to run GATE-CODE-REVIEW after implementation
```
