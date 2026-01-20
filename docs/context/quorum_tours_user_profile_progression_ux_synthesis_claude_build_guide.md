# Quorum Tours – User Profile & Progression UX Synthesis Guide

**Purpose**  
This document synthesizes research on user profiles, progression, trust, and credibility for a serious birdwatching audience into a **frontend UI/UX and content-design framework**. It is written explicitly for **Claude Code** to reference when building user profiles, progression indicators, and social compatibility surfaces for Quorum Tours.

**Critical constraints**  
- This document defines *interface structure, interaction patterns, and evaluation criteria only*.  
- Do **not** write UI copy, onboarding text, or marketing language.  
- Do **not** reference backend systems, data models, APIs, or integrations.  
- Do **not** reference real people, operators, or locations.  
- Treat all progression as **trust- and competence-based**, never gamified.

---

## 1. Role of the User Profile

### 1.1 Profile as a Trust Instrument
- The user profile functions as a **credibility and compatibility signal**, not a social feed.
- Its primary purpose is to answer, quickly and implicitly:
  - Is this person competent?
  - Is this person reliable?
  - Will this person be compatible with the group and pace?

Profiles must reduce social risk for both other participants and tour operators.

### 1.2 Progression as Earned Standing
- Progression should feel like **earned standing within a serious community**, not advancement in a game.
- Visual and structural cues must signal *recognition*, not *reward*.

---

## 2. Progression Philosophy (Non-Gamified)

### 2.1 Competence Over Participation
- Recognition should be tied to **demonstrated behavior and experience**, not activity volume alone.
- Avoid mechanics that reward mere frequency, streaks, or attendance.

### 2.2 Language-Agnostic Design
- Even without visible copy, UI elements must avoid game-like affordances:
  - No progress bars framed as “levels”
  - No celebratory animations for routine actions
  - No cartoon iconography or playful metaphors

Progression indicators should feel institutional and understated.

---

## 3. Core Profile Information Architecture

### 3.1 Identity & Context (Always Visible)
The primary profile view should clearly surface:
- Human identity (first name or chosen display name)
- General location context (region-level, not precise)
- Experience classification (broad, non-judgmental)
- Primary participation mode (birding-focused vs photography-focused)

### 3.2 Behavioral Preferences
Profiles must surface **behavioral compatibility signals**, including:
- Pace preference (slow / moderate / fast)
- Primary motivation (species listing vs experience vs mixed)

These attributes reduce friction and mismatched expectations in group tours.

---

## 4. Credibility Signals (User-Side)

### 4.1 Evidence-Based Credibility
- Credibility should be inferred from **documented experience**, not self-assertion.
- Structured evidence (counts, history, verified participation) should visually outweigh free-form bio content.

### 4.2 External Credibility Anchors
- Where external systems are referenced, they should appear as **verifiable anchors**, not competitive leaderboards.
- External data must be presented minimally and tastefully, without encouraging comparison or status anxiety.

---

## 5. Progression & Tier Visibility

### 5.1 Tiering as Access Control
- Tiers should function as *access qualifiers*, not achievement trophies.
- Visual treatment should be restrained:
  - Simple badges or labels
  - Muted color palettes
  - Clear hierarchy without visual noise

### 5.2 Asymmetric Reputation Display
- Positive recognition may be visible.
- Negative signals, penalties, or enforcement mechanisms must never be surfaced in the UI.

Absence of recognition should be the only visible consequence of negative behavior.

---

## 6. Tour Compatibility & Group Formation

### 6.1 Compatibility Over Popularity
- Profiles should help users self-sort into compatible groups rather than compete for status.
- Aggregate indicators (e.g., mix of experience levels) are preferable to individual ranking.

### 6.2 Visibility by Context
Information visibility should increase with commitment:
- Browsing: anonymized, aggregated signals only
- After commitment: limited peer context
- Post-confirmation: fuller profiles for coordination and trust

This staged disclosure protects privacy while supporting group cohesion.

---

## 7. Accessibility & Cognitive Load

### 7.1 Age-Aware Design
- Base assumptions should accommodate users 45–65+:
  - Large readable typography
  - High contrast
  - Minimal simultaneous information density

### 7.2 Stability Over Delight
- Interfaces should feel calm, predictable, and serious.
- Avoid motion, novelty, or interaction patterns that create uncertainty.

---

## 8. Explicit Anti-Patterns

The following patterns should be treated as **automatic failures**:
- Levels, XP, streaks, or progress meters
- Leaderboards or public ranking tables
- One-click endorsements or peer “likes”
- Cartoon badges or playful iconography
- Social pressure cues (e.g., “others are ahead of you”)
- Quantifying outdoor experiences into meaningless scores

---

## 9. Pass / Fail Rubric (User Profile & Progression)

### 9.1 Trust Signaling
**Pass if:**
- Credibility is inferred through structure and evidence

**Fail if:**
- Credibility depends on self-description or marketing tone

### 9.2 Progression Integrity
**Pass if:**
- Progression feels earned, rare, and meaningful

**Fail if:**
- Progression feels automatic, frequent, or playful

### 9.3 Compatibility Clarity
**Pass if:**
- Users can easily assess fit with others before committing

**Fail if:**
- Mismatched expectations are likely due to hidden preferences

### 9.4 Accessibility
**Pass if:**
- Interface is comfortable for long evaluation and reading

**Fail if:**
- Visual strain or cognitive overload is evident

---

## 10. Final Instruction to Claude Code

When implementing user profiles and progression:
- Assume the user is experienced, skeptical, and values authenticity
- Treat recognition as a scarce institutional signal
- Remove any element that feels performative, competitive, or juvenile

If a component does not increase trust, clarity, or compatibility, it does not belong in the interface.