# HOME-IA-001 — Home Page Information Architecture

```
STATUS: READY_FOR_REVIEW
TASK_ID: HOME-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Home page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/design-principles.md
  - claude/protocols/tls-component-rubrics.md
  - claude/protocols/integration-gates.md
  - claude/protocols/flow-gates.md
  - claude/protocols/kill-list-base.json
  - docs/wireframes.md
  - docs/context/quorum_tours_frontend_ux_synthesis_claude_build_guide.md
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

## Home Page — Detailed IA Specification

### Primary Job

Explain what Quorum is, why it exists, and how certainty is created — immediately. User should understand the threshold mechanic within first scroll.

---

## Section 1: Hero — What Quorum Solves

**Target TLS:** < 20

**Intent:**
- Communicate the synchronization gap (demand exists but is invisible to operators)
- State that tours only run when ready (certainty as product)
- Establish no-risk commitment model upfront

**Structure:**
- Left-aligned serif headline (aggressive scale 4-6x body)
- Subhead with specific mechanic statement
- Single primary CTA: action-specific label
- Visual: Abstract diagram showing demand aggregation
- Above-fold proof element: aggregate stat

**Anti-Template Requirements:**
- NO centered text blocks
- NO generic welcome messages or LLM words
- NO lift+shadow hover effects
- Content bleeds across fold to encourage scroll
- Asymmetric layout (2/3 + 1/3 split)

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| HeroHeadline | Display serif, clamp() sizing |
| HeroSubhead | Body font, specific mechanic statement |
| HeroCTA | Primary button, action-specific label |
| HeroProofBadge | Inline stat, mono font for numbers |
| HeroVisual | Custom diagram/illustration |

---

## Section 2: How It Works — Visual Mechanic

**Target TLS:** < 18

**Intent:**
- Explain threshold-based confirmation visually
- Distinguish interest → commitment → confirmation states
- Zero dense text blocks

**Structure:**
- Horizontal or diagonal step flow
- Custom icons with visual connectors between steps
- Each step shows outcome, not just action
- Steps:
  1. Express interest → Signal joins aggregate
  2. Commit conditionally → Only charged if tour runs
  3. Tour confirms → Threshold met, everyone goes

**Anti-Template Requirements:**
- NO 3-column process grid with default icons
- NO generic step labels
- Visual connectors between steps
- Each step includes outcome focus

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ProcessStep | Custom icon + outcome headline + supporting text |
| ProcessConnector | Visual flow element between steps |
| ProcessSection | Container with asymmetric layout |

---

## Section 3: Why This Is Different

**Target TLS:** < 18

**Intent:**
- Structural differences vs traditional booking
- Risk reduction emphasis
- Honest acknowledgment of constraints

**Structure:**
- Split panel or comparison layout
- Left: Traditional booking problems (specific)
- Right: Quorum model solutions
- No superlatives or marketing language

**Anti-Template Requirements:**
- NO "Why Choose Us" framing
- NO gradient blur blobs
- NO generic feature icons
- Specific friction acknowledgment included

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ComparisonPanel | Two-column asymmetric layout |
| ProblemStatement | Left-aligned, specific pain point |
| SolutionStatement | Left-aligned, specific resolution |

---

## Section 4: Live Tour States (Example)

**Target TLS:** < 20

**Intent:**
- Demonstrate confirmed vs forming vs not-running states
- Show progress without urgency framing
- Prove the mechanic works with real data patterns

**Structure:**
- 2-3 example tour cards (NOT 4-column grid)
- Each card shows different confirmation state
- Progress indicator: thick bar, non-urgent color
- Participant count: outcome-focused format

**Anti-Template Requirements:**
- NO lift+shadow hover (internal element changes only)
- NO urgency framing
- NO uniform grid layout
- Cards vary by state

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| TourCard | Custom card with state-aware styling |
| ConfirmationStatusBadge | Confirmed/Forming/Not Running |
| ThresholdProgressBar | Thick, calm, non-urgent |
| ParticipantCount | Outcome-focused format |

---

## Section 5: Trust Foundations

**Target TLS:** < 18

**Intent:**
- Operator credibility signals
- Transparent conditions
- No hidden fees or surprise states

**Structure:**
- Asymmetric grid
- Trust signals: verified operator, refund mechanic visibility, transparency statement
- Mini operator preview (human identity)

**Anti-Template Requirements:**
- NO grayscale logo wall
- NO generic testimonials
- NO carousel with dots
- Proof at Level 3+

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| TrustSignal | Icon + specific statement |
| OperatorPreviewCard | Human photo + name + expertise scope |
| TransparencyStatement | Explicit condition visibility |

---

## Section 6: Pathways Forward (CTA Section)

**Target TLS:** < 20

**Intent:**
- Clear next steps for two user intents:
  1. Browse available tours
  2. Understand the mechanic deeper
- No dead ends

**Structure:**
- Two prominent pathways
- Primary: Browse Tours — immediate action
- Secondary: How Confirmation Works — reference page link
- Strategic whitespace, generous padding

**Anti-Template Requirements:**
- NO generic CTA labels
- NO uniform button grid
- Action + outcome in CTA text

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| PathwayCTA | Primary action button |
| SecondaryPathway | Text link or subtle button |
| CTASupportText | Brief context before action |

---

## Full Component Inventory (Home Page)

| Component | TLS Category | Key Differentiation |
|-----------|--------------|---------------------|
| HeroHeadline | Typography | Display serif, 4-6x body, clamp() |
| HeroSubhead | Typography | Body font, mechanic-specific |
| HeroCTA | CTA | Action-specific label |
| HeroProofBadge | Proof | Inline stat, mono numbers |
| HeroVisual | DNA | Custom diagram |
| ProcessStep | DNA | Custom icon, outcome focus |
| ProcessConnector | DNA | Visual flow between steps |
| ProcessSection | Layout | Asymmetric container |
| ComparisonPanel | Layout | Two-column asymmetric |
| ProblemStatement | Copy | Left-aligned, specific |
| SolutionStatement | Copy | Left-aligned, specific |
| TourCard | Interaction | Internal hover changes, state-aware |
| ConfirmationStatusBadge | DNA | Distinct per state |
| ThresholdProgressBar | DNA | Thick, calm, non-urgent |
| ParticipantCount | Copy | Outcome-focused |
| TrustSignal | Proof | Specific statement |
| OperatorPreviewCard | Proof | Human identity, expertise scope |
| TransparencyStatement | Proof | Explicit conditions |
| PathwayCTA | CTA | Action + outcome text |
| SecondaryPathway | CTA | Subtle alternative path |
| CTASupportText | Copy | Brief context |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | No consecutive card grids |
| KL-LAYOUT-002 | PASS | Content bleeds across fold |
| KL-LAYOUT-004 | PASS | No centered long text |
| KL-COMP-001 | PASS | No lift+shadow hover |
| KL-COMP-002 | PASS | No row of 4 default icons |
| KL-CONTENT-001 | PASS | No LLM words |
| KL-CONTENT-006 | PASS | No generic CTA labels |
| KL-IMAGE-001 | PASS | No Undraw illustrations |
| KL-IMAGE-002 | PASS | No gradient blur blobs |
| KL-TRUST-001 | PASS | No grayscale logo wall |
| KL-TRUST-002 | PASS | No generic testimonials |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Hero | Hero | < 20 |
| How It Works | Process | < 18 |
| Why Different | Trust | < 18 |
| Tour States | Cards | < 20 |
| Trust Foundations | Trust | < 18 |
| Pathways | CTA | < 20 |

---

```
NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. If approved: frontend-implementer receives HOME-UI-001 task
  3. visual-qa to capture evidence after implementation
  4. a11y-auditor to run baseline checks after implementation
```
