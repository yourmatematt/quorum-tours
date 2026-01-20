# Flow Gates — Phased Enforcement

Flow gates validate that user journeys make sense end-to-end.
They are enforced by phase.

Backend execution is out of scope.

---

## Phase 1 — Public Discovery & Trust (ENFORCED)

### GATE-FLOW-PHASE1-DISCOVERY

Required flow:
Home → Tours Index → Tour Detail → Operator Profile

PASS conditions:
- Home clearly explains what Quorum is
- Tours Index shows available tours with confirmation state
- Tour Detail explains:
  - threshold mechanic
  - what happens if threshold is not met
  - refund / non-charge concept (UI only)
- Operator Profile accessible from Tour Detail
- User can navigate backward at every step

FAIL conditions:
- Core mechanics buried in FAQ
- Fake urgency (“only X spots left”)
- User cannot understand commitment risk from UI

---

## Phase 2 — Account & Intent (NOT enforced until Phase 2)

### GATE-FLOW-PHASE2-AUTH-SHELL

PASS conditions:
- Auth pages exist as UI shells
- Clear explanation of why account is needed
- No backend logic implemented

FAIL conditions:
- Forced auth without explanation
- Technical auth concepts exposed

---

## Phase 3 — Completion & Polish (NOT enforced until Phase 3)

### GATE-FLOW-PHASE3-QA

PASS conditions:
- Visual regressions controlled
- Accessibility tightened
- Performance budgets respected

FAIL conditions:
- Regressions without justification
- Accessibility deferred indefinitely

---

## General Flow Rules (All Phases)

- Users must never feel tricked or rushed
- Confirmation mechanics must be explicit
- “What happens next” must always be visible

---
