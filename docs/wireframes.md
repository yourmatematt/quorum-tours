# Quorum Tours — Wireframes & Page Structure (Frontend Only)

This document defines the **information architecture, page structure, section ordering, and component intent** for the Quorum Tours website and core product surfaces.

It is written explicitly for **Claude Code** to reference during build execution.

**Hard constraints**

* Frontend UI/UX only — no backend architecture, logic, schemas, or APIs
* No marketing copy or example text
* No operator-, founder-, or location-specific references
* Every section must exist to reduce risk, increase certainty, or support expert decision-making

---

## Global Layout & System Rules (All Pages)

### Persistent Elements

* Global navigation (Home, Tours, How It Works, Operators)
* Clear return-to-home affordance
* Calm, stable layout with minimal motion

### Visual Hierarchy Rules

* Confirmation / certainty states are always visually dominant
* Trust signals precede persuasion or narrative
* Progressive disclosure: scan → evaluate → audit

### Anti-Patterns (Global Failures)

* Fake urgency or countdowns
* Hidden mechanics in FAQs
* Stock imagery or decorative-only visuals
* Gamified UI elements

---

## PAGE 1 — Home (Public Discovery)

**Primary job:** Explain what Quorum is, why it exists, and how certainty is created — immediately.

### Section Order & Intent

1. **Hero: What Quorum Solves**

   * Communicates the synchronization gap
   * States that tours only run when ready
   * Establishes certainty as the core product

2. **How It Works (Visual Mechanic)**

   * Threshold-based confirmation explained visually
   * Clear distinction between interest, commitment, and confirmation
   * No dense text blocks

3. **Why This Is Different**

   * Structural differences vs traditional booking platforms
   * Emphasis on risk reduction, not savings or deals

4. **Live / Example Tour States**

   * Demonstrates confirmed vs forming vs not-running states
   * Shows progress without urgency framing

5. **Trust Foundations**

   * Operator credibility
   * Transparent conditions
   * No hidden fees or surprise states

6. **Pathways Forward**

   * Browse tours
   * Learn how confirmation works

---

## PAGE 2 — Tours Index (Discovery & Comparison)

**Primary job:** Allow users to evaluate tours without guesswork.

### Section Order & Intent

1. **Tours List (Primary Surface)**

   * Structured cards
   * Comparable attributes
   * Confirmation state always visible

2. **Filtering & Sorting Controls**

   * Species-driven, timing-driven, and confidence-driven filters
   * Controls are available but not dominant

3. **Aggregate Signals**

   * Group-level indicators only
   * No individual exposure or ranking

4. **Empty / No-Match States**

   * Explain why nothing is shown
   * Offer refinement paths

---

## PAGE 3 — Tour Detail

**Primary job:** Eliminate anxiety before commitment.

### Section Order & Intent

1. **Tour Confirmation Status (Above the Fold)**

   * Confirmed / forming / not running
   * Minimum threshold clarity
   * What happens next explained visually

2. **Core Tour Overview**

   * What this tour is designed to achieve
   * Explicit uncertainty acknowledgment (no guarantees)

3. **Species Focus & Likelihood**

   * Core vs secondary vs opportunistic targets
   * Confidence signals without promises

4. **Operator Summary (Preview)**

   * Human identity
   * Expertise snapshot
   * Link to full operator profile

5. **Logistics & Reassurance**

   * Capacity, comfort, safety
   * Only anxiety-reducing details

6. **Commitment Path (UI Only)**

   * Expression of interest
   * Conditional commitment explanation
   * No payment implementation

7. **FAQs (Strictly Secondary)**

   * Only edge-case clarification

---

## PAGE 4 — Operator Public Profile

**Primary job:** Act as a credibility dossier, not a marketing page.

### Section Order & Intent

1. **Identity & Legitimacy (Above the Fold)**

   * Real human or defined entity
   * Verification status (binary, restrained)
   * Scope of expertise

2. **Authority Signals**

   * Experience markers
   * Contextual credibility
   * No slogans or superlatives

3. **Narrative (Minimal, Informational)**

   * Method or philosophy
   * Domain-specific background
   * Humanizing detail only after authority

4. **Reviews & Feedback**

   * Distribution visible
   * Dates and context
   * No filtering or hiding

5. **Assets & Capabilities**

   * Visual proof over claims
   * Collapsible technical detail

6. **Active & Past Tours**

   * Consistent structure with Tours Index
   * Confirmation outcomes visible

---

## PAGE 5 — User Profile (Phase 2 UI Shell)

**Primary job:** Signal credibility and compatibility.

### Section Order & Intent

1. **Identity & Context**

   * Display name
   * Region-level location

2. **Experience & Participation Summary**

   * Evidence-based indicators
   * No self-asserted claims

3. **Behavioral Preferences**

   * Pace
   * Motivation

4. **Recognition / Tiering (Restrained)**

   * Institutional, muted signals
   * No gamification

---

## PAGE 6 — How It Works (Reference Page)

**Primary job:** Serve as a calm explainer users can return to.

### Section Order & Intent

1. **The Problem (Synchronization Gap)**
2. **The Quorum Mechanic**
3. **What Happens If a Tour Doesn’t Run**
4. **What Confirmation Means**
5. **What Quorum Does *Not* Do**

---

## PAGE 7 — Platform Admin Dashboard (Internal Tool)

**Primary job:** Maintain marketplace integrity and operational health.

**Access:** Platform administrators only (authentication required).

**Design constraints:**
* Operational tool, not a public-facing surface
* No marketing language or persuasive elements
* High contrast, large fonts (accessibility-first for 45-65+ demographic)
* Calm information density
* No gamification or achievement language
* Revenue/metrics are operational data, not celebrations

### Section Order & Intent

1. **Dashboard Overview (Above the Fold)**

   * Critical alerts requiring immediate attention
   * Platform health summary (tours active, operators pending, system status)
   * Quick action shortcuts (approve pending operator, review flagged content)

2. **Operator Verification Queue**

   * Pending operator applications with status workflow
   * Credential document review interface
   * Approval/rejection actions with reason tracking
   * Expiring credentials visibility

3. **Tour Oversight**

   * All tours with threshold progress monitoring
   * Tours approaching deadline without reaching threshold
   * Dispute/issue flagging and resolution tracking
   * Tour status distribution (forming/confirmed/cancelled)

4. **User Management**

   * User search and profile access
   * Tier adjustment interface (manual override capability)
   * Moderation actions (strikes, suspension)
   * User activity patterns and trust metrics

5. **Platform Metrics**

   * Revenue tracking (escrowed vs paid out)
   * Tour success rates (threshold reached %)
   * User growth and retention curves
   * Operator onboarding funnel
   * Platform commission tracking

6. **Alerts & Monitoring**

   * System health indicators
   * Fraud detection flags
   * Payment processing issues
   * User-reported issues queue

7. **Audit Log**

   * Admin action history (who did what, when)
   * Compliance trail for legal requirements
   * Filterable by admin, action type, date range

### Component Inventory (Admin-Specific)

* **Status Workflow UI** — Multi-step approval flows with reason tracking
* **Document Viewer** — Inline PDF/image viewer for credential verification
* **Action Audit Trail** — Timestamped history of admin decisions
* **Metrics Dashboard Cards** — Operational KPIs with trend indicators
* **Alert Priority Queue** — Triaged list by urgency (critical/warning/info)
* **Search & Filter** — Multi-criteria search for operators/users/tours
* **Approval Actions** — Approve/reject with mandatory reason fields
* **Timeline View** — Chronological events for dispute resolution

### Critical UX Requirements

* **Binary status indicators** — Verified/Unverified, Active/Suspended (no ambiguous states)
* **Mandatory reason fields** — All rejection/suspension actions require explanation
* **Audit trail visibility** — All actions logged and visible to other admins
* **No dark patterns** — Admin tools must be transparent and reversible where possible
* **Financial clarity** — Held vs charged, escrowed vs paid always explicit
* **Date/time precision** — All timestamps with timezone awareness
* **Error state visibility** — Payment failures, system issues surfaced prominently

### Pass / Fail (Admin Dashboard)

**PASS if:**
* Admin can complete verification workflow without ambiguity
* All actions are auditable and reversible
* Critical issues surface above informational data
* Financial state is always explicit

**FAIL if:**
* Metrics use gamification language ("Level up!", achievement badges)
* Revenue displays as celebration rather than operational data
* Approval workflows lack reason tracking
* Actions cannot be traced in audit log

---

## PAGE 8 — Operator Dashboard (Internal Tool)

**Primary job:** Tour operation and business management for verified operators.

**Access:** Verified operators only (authentication + verification required).

**Design constraints:**
* Operational tool for tour business management
* No marketing language or persuasive elements
* High contrast, large fonts (accessibility-first for 50-70 demographic)
* Calm information density
* No gamification or achievement language
* Revenue/bookings are operational data, not celebrations
* Financial clarity paramount (escrowed vs paid vs pending)

### Section Order & Intent

1. **Tour Management (Primary Surface)**

   * Active tours list with status (forming/confirmed/completed/cancelled)
   * Create new tour action (prominent)
   * Threshold and capacity settings visibility
   * Quick view of booking progress per tour
   * Tour status workflow controls

2. **Booking Progress Dashboard**

   * Real-time threshold visualization for active tours
   * "4 of 6 committed" progress indicators
   * Days until booking deadline
   * Recent commitment activity timeline
   * Participant count trends

3. **Participant List**

   * Committed participants per tour
   * User compatibility signals (pace preference, experience level, birding vs photography)
   * Contact capabilities (platform-mediated messaging)
   * Participant tier indicators (Explorer, Field Naturalist, Trusted Contributor)
   * Dietary restrictions and accessibility needs visibility

4. **Revenue Dashboard**

   * Escrowed deposits by tour (held, not yet charged)
   * Confirmed revenue (charged after threshold reached)
   * Payout schedule and status
   * Stripe Connect balance
   * Transaction history
   * Platform commission breakdown

5. **Profile Management**

   * Operator bio and credentials editor
   * Photo gallery management (20+ photos target)
   * Verification document upload
   * Credential expiration tracking
   * Public profile preview link

6. **Reviews & Reputation**

   * Recent reviews with rating distribution
   * Operator response interface
   * Average rating trend over time
   * Response rate tracking
   * Review analytics (sentiment, common themes)

### Component Inventory (Operator-Specific)

* **Tour Status Workflow** — Visual pipeline (forming → confirmed → running → completed)
* **Threshold Progress Bar** — Non-urgent progress indicator with count
* **Participant Card** — User profile summary with compatibility signals
* **Revenue Breakdown Card** — Escrowed vs confirmed vs paid with explicit labels
* **Payout Schedule Timeline** — Expected payout dates with Stripe status
* **Review Response Editor** — Text input with character limit and submission
* **Credential Upload Interface** — Document upload with status tracking
* **Tour Creation Form** — Multi-step form with threshold, capacity, dates, species

### Critical UX Requirements

* **Threshold status always visible** — Operators need constant awareness of tour viability
* **Financial state explicit** — "Escrowed: $2,400 (4 × $600)" not just "$2,400"
* **No celebration language** — "6 participants committed" not "You got 6 bookings!"
* **Payout transparency** — Exact dates, amounts, Stripe status visible
* **Participant privacy** — Contact via platform only, no email/phone exposure
* **Tour creation guidance** — Clear minimum threshold requirements
* **Cancellation consequences** — Explicit explanation of what happens if threshold not met

### Pass / Fail (Operator Dashboard)

**PASS if:**
* Operator can assess tour viability at a glance
* Financial state is always unambiguous (escrowed vs paid)
* Threshold progress is prominent and non-urgent
* All business operations accessible without friction

**FAIL if:**
* Revenue uses gamification ("You earned $5K!")
* Threshold progress creates fake urgency
* Participant contact bypasses platform mediation
* Tour status is ambiguous or requires interpretation

---

## Cross-Page Component Inventory

### Core Components

* Confirmation Status Banner
* Threshold Progress Indicator (non-urgent)
* Tour Card
* Operator Snapshot Card
* Species Card
* Review Block (context-first)

### Global UI Atoms

* Status labels (confirmed / forming / not running)
* Disclosure toggles
* Aggregated indicators

---

## Pass / Fail Alignment (Wireframe-Level)

**PASS if:**

* A user can understand certainty, risk, and next steps without reading policies
* Trust emerges from structure and visibility

**FAIL if:**

* Core mechanics require explanation text
* Any section exists primarily to persuade rather than inform

---

## Final Instruction

When implementing these wireframes:

* Treat every section as a decision-support surface
* Remove anything that does not reduce uncertainty or increase trust
* If a component does not justify its existence structurally, it should not be built
