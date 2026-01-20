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
