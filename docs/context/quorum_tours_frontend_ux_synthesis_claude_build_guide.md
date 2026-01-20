# Quorum Tours – Frontend UX & Content Synthesis Guide

**Purpose**  
This document synthesizes prior research on chase lists, species-driven discovery, and notification behavior into a **frontend UI/UX and content guidance framework** for Quorum Tours. It is explicitly written for **Claude Code** to reference during website and product UI construction.

**Critical constraints**  
- This file defines *what to build and how to judge it*, **not the copy itself**.  
- Do **not** implement or reference backend architecture, databases, APIs, queues, or schemas.  
- Do **not** include place-specific, operator-specific, or founder-specific references.  
- Focus on **user mental models, interface patterns, interaction design, and content structure** only.

---

## 1. Core User Mental Model (Chase Lists & Tours)

### 1.1 Chase Lists Are Contextual, Not Static
- Treat chase lists as *temporary, situational artifacts* (trip-scoped, season-scoped, goal-scoped).
- Avoid framing chase lists as a single lifelong “wishlist.”
- UI must emphasize *generation, filtering, and pruning* over long-term maintenance.

### 1.2 Priority Hierarchies Are Mandatory
- Users implicitly rank species by urgency and emotional value.
- Frontend must visibly support **tiering / prioritization**, not flat lists.
- Priority affects:
  - Visual emphasis
  - Notification prominence
  - Tour matching weight

### 1.3 Certainty vs Chance Must Be Legible
- Users understand that tours cannot guarantee sightings.
- UI must clearly differentiate:
  - Core target species
  - Reliable secondary species
  - Opportunistic / chance species
- Ambiguity must be explicit, not hidden.

---

## 2. Species Interaction & Discovery UX

### 2.1 Species Input Patterns
The interface should support multiple *coexisting* entry modes:
- Search-driven entry (autocomplete-first)
- Expert shorthand entry (power-user flows)
- Browsing by structured categories
- Visual recognition reinforcement (thumbnails)

Cold-start experiences must never present an empty state without guidance.

### 2.2 Species Cards (UI Atom)
Each species reference in the UI should be treated as a reusable component with:
- Name hierarchy (primary name + secondary identifiers)
- Visual reference
- Seasonality signal
- Recency signal
- Confidence/likelihood cues

Density should scale based on user intent (browse vs evaluate vs commit).

### 2.3 List Size Management
- The UI must actively discourage unbounded lists.
- Visual affordances should nudge users toward *short, high-signal* lists.
- Long lists should collapse, summarize, or degrade gracefully.

---

## 3. Tour Discovery Through Species Matching

### 3.1 Species-First Discovery Mode
- Tours should be discoverable *through species intent*, not only date/location.
- Users should be able to see:
  - “Tours that match X of my species”
  - “Tours designed around this species”

### 3.2 Match Transparency
- The interface must explain *why* a tour is being shown.
- Matching should be legible via badges, counts, or inline explanations.

### 3.3 Comparative Evaluation
- Users should be able to compare tours based on:
  - Species overlap
  - Likelihood signals
  - Timing alignment
- Avoid opaque ranking without rationale.

---

## 4. Notification & Alert UX (Frontend Only)

### 4.1 Relevance Over Volume
- Notification settings must be visible, understandable, and adjustable.
- UI must support:
  - Immediate alerts
  - Digest-style summaries
  - Muting / snoozing without full opt-out

### 4.2 Alert Framing
Notifications should visually encode:
- Why the alert exists (species match, urgency, confirmation)
- What action is expected
- How time-sensitive it is

### 4.3 Quiet Hours & Respectful Timing
- The frontend should communicate when and how notifications are sent.
- Users should feel *protected from spam by default*.

---

## 5. Information Density & Visual Hierarchy

### 5.1 Default Ordering Principles
- Default ordering should reflect domain norms, not generic UX conventions.
- Sorting and filtering controls must be discoverable but not dominant.

### 5.2 Progressive Disclosure
- High-level scans first
- Details on demand
- No forced modal deep-dives for routine evaluation

### 5.3 Accessibility for Expert Users
- Avoid over-simplification that removes signal.
- Avoid playful gamification that undermines credibility.

---

## 6. Trust, Privacy, and Data Ethics (UI Perspective)

### 6.1 Privacy-First Defaults
- Lists should be private by default.
- Sharing must always be intentional and explicit.

### 6.2 Aggregate vs Individual Signals
- Demand indicators should be aggregate and anonymized.
- UI must never imply that individual user intent is exposed.

### 6.3 Sensitive Content Handling
- The interface should visibly signal sensitivity and uncertainty.
- Avoid promotional framing for ethically sensitive targets.

---

## 7. Anti-Patterns to Explicitly Avoid

The following patterns should be considered **design failures**:
- Gamification mechanics (points, streaks, badges)
- Empty-state screens with no guidance
- Flat species lists without prioritization
- Opaque matching logic
- Forced social sharing
- Overly playful or juvenile visual language
- Lock-in behaviors (no export, no visibility into data use)

---

## 8. Pass / Fail Rubric (Claude Build Evaluation)

### 8.1 Chase List UX
**Pass if:**
- Users can easily generate, prioritize, and prune species lists
- Lists are contextual and clearly scoped

**Fail if:**
- Lists feel static, unbounded, or administrative

### 8.2 Species Representation
**Pass if:**
- Species cards convey likelihood, timing, and relevance at a glance

**Fail if:**
- Species appear as plain text labels or decorative elements only

### 8.3 Tour Matching Transparency
**Pass if:**
- Users can clearly understand *why* a tour is recommended

**Fail if:**
- Matching feels algorithmic, hidden, or arbitrary

### 8.4 Notification UX
**Pass if:**
- Users feel informed but not interrupted
- Frequency and relevance are controllable

**Fail if:**
- Notifications feel spammy, unexplained, or excessive

### 8.5 Credibility & Tone
**Pass if:**
- Interface respects expertise and domain seriousness

**Fail if:**
- UI relies on novelty, gimmicks, or generic marketplace tropes

---

## 9. Final Instruction to Claude Code

When in doubt:
- Optimize for *clarity over cleverness*
- Prefer *explicit signals over hidden logic*
- Respect that users already understand the domain
- Treat the interface as a **decision-support tool**, not a content feed

If a UI choice cannot be explained in terms of helping a user decide **whether this tour is worth their time**, it likely does not belong in the product.

