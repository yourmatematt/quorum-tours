# CLAUDE.md — Quorum Tours Frontend Build System

This file defines how Claude Code must operate for the Quorum Tours project.
It is authoritative and must be followed at all times.

This project uses a **strict, orchestrated, gate-driven system**.
Free-form responses, ad-hoc builds, or backend architecture are not allowed.

---

## 1) Scope (Hard Constraint)

This project is **FRONTEND UI/UX AND CONTENT PRESENTATION ONLY**.

You MUST NOT:
- design backend architecture
- define databases or schemas
- configure authentication providers
- implement payments
- design APIs or middleware
- introduce infrastructure or deployment logic

You MAY:
- create frontend UI shells for future flows (auth, join, checkout)
- show clear user-facing explanations of system mechanics
- stub states visually (e.g. “Sign in required” screens)

If backend logic appears in output, the task automatically FAILS.

---

## 2) System Entry Point (Order of Authority)

When executing any task, follow this order:

1. `claude/protocols/protocols.md`  
   → master scope, gate registry, evidence rules  
2. `claude/protocols/messaging.md`  
   → strict messaging envelope (MANDATORY)  
3. `claude/design-principles.md` + kill-list rules  
   → anti-template, anti-manipulation  
4. `claude/rubrics/tls-component-rubrics.md`  
   → TLS scoring by component type  
5. `claude/protocols/integration-gates.md`  
   → navigation + routing cohesion  
6. `claude/protocols/flow-gates.md`  
   → phased journey validation  
7. `claude/protocols/responsiveness.md`  
   → desktop, tablet, mobile verification  

If instructions conflict, **higher items override lower ones**.

---

## 3) Orchestrated Agent System (Mandatory)

You MUST operate through the orchestrator.

### Orchestrator
- `claude/agents/orchestrator.md`
- Owns task delegation, gate enforcement, and approval

### Specialist Agents
- `web-design-lead` — IA, wireframes, section intent
- `frontend-implementer` — build components/pages
- `visual-qa` — browser screenshots + console checks
- `a11y-auditor` — readability and accessibility
- `code-reviewer` — anti-template + quality enforcement

You MUST NOT:
- self-approve your own work
- skip agents
- bypass gates

---

## 4) Strict Messaging Envelope (Non-Negotiable)

ALL responses MUST comply with:

`claude/protocols/messaging.md`

This includes:
- required fields
- fixed field order
- explicit gate tracking
- artifact-based evidence

Any response missing a required field is INVALID.

---

## 5) Build Phases (Enforcement Rules)

### Phase 1 — Public Discovery & Trust (ACTIVE)
You may only work on:
- Home
- Tours Index
- Tour Detail
- Operator Public Profile

Phase 1 gates are fully enforced.

### Phase 2 — Account & Intent (LOCKED)
Auth and user profile pages may exist as UI shells only.
Phase 2 gates are NOT enforced yet.

### Phase 3 — Polish & Hardening (LOCKED)
Accessibility tightening, performance budgets, regressions.
Phase 3 gates are NOT enforced yet.

Do NOT jump phases.

---

## 6) Default Build Order (Vertical Slice)

You MUST follow this order:

1. Home
2. Tours Index
3. Tour Detail
4. Operator Public Profile

Each page must PASS gates before moving on.

---

## 7) Evidence Is Required

Any claim of progress or completion MUST include evidence stored under:

- `/artifacts/screenshots`
- `/artifacts/a11y`
- `/artifacts/reports`

No screenshots = no approval  
No a11y notes = no approval  
No review notes = no approval  

---

## 8) UX Integrity Rules (Hard)

You MUST:
- prioritize clarity over persuasion
- make confirmation mechanics explicit
- avoid fake urgency or scarcity
- treat trust as the primary conversion surface
- design for high-scrutiny users

You MUST NOT:
- use marketing hype
- imitate generic SaaS layouts
- hide mechanics in FAQs
- use dark patterns

Violations trigger kill-list failure.

---

## 9) Definition of “Done”

A task is DONE only when:
- implementation exists
- strict messaging envelope is satisfied
- required gates are listed
- required gates are passed
- evidence exists under `/artifacts`
- orchestrator marks STATUS = APPROVED

Anything else is NOT DONE.

---

## 10) How to Start a Task (Required Pattern)

When beginning work, you MUST:
1. Identify the target page/component
2. Ask the orchestrator to assign the task
3. Follow the runbook:
   `claude/runbooks/build-runbook.md`

Ad-hoc prompting is not allowed.

---

## Final Rule

If you are unsure:
- STOP
- refer back to `protocols.md`
- ask the orchestrator for clarification

This system exists to prevent drift.
Respect it.

---
