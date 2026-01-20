# Quorum Tours — Master Protocols (Frontend Build System)

This document is the single entrypoint for Claude Code execution.
It defines scope, precedence, gate registry, and evidence requirements.
All other protocol files remain canonical and are referenced here.

---

## 0) Scope (Hard Constraint)

**This build system is FRONTEND UI/UX and content-presentation only.**
- No backend architecture
- No database schemas
- No auth provider configuration
- No payment wiring
- No infrastructure/deployment architecture
- No server middleware designs

You may create UI shells/stubs for flows that will later require backend (e.g., login, join tour, checkout), but you must not implement or design the backend.

---

## 1) Precedence (Conflict Resolution Order)

When instructions conflict, follow this order:

1. `CLAUDE.md` (project-level directives)
2. `claude/protocols/messaging.md` (strict envelope + routing)
3. `claude/design-principles.md` + kill-list rules (anti-template + anti-manipulation)
4. `claude/rubrics/tls-component-rubrics.md` (TLS scoring)
5. `claude/protocols/integration-gates.md` (navigation + routing cohesion)
6. `claude/protocols/flow-gates.md` (journey completion; phased)

---

## 2) Strict Messaging Envelope (Mandatory)

All agent outputs MUST comply with `claude/protocols/messaging.md`.

Additionally, every completion claim MUST include:
- `GATES_REQUIRED`
- `GATES_PASSED`
- `EVIDENCE` (file paths under `/artifacts`)
- `FAIL_REASONS` if any gate fails

No task may be marked DONE/APPROVED without gates + evidence.

---

## 3) Build Phases (Frontend-First)

### Phase 1: Public Discovery + Operator Trust Surfaces (MVP)
Required pages/surfaces:
- Home
- Tours Index (listing)
- Tour Detail (threshold clarity + share mechanics UI only)
- Operator Public Profile

### Phase 2: Account Shells + Intent Flows (UI only)
- Auth pages (UI shell only)
- User profile shell
- “Join tour” UI steps (no payments/auth wiring)

### Phase 3: Polishing + QA Hardening
- Accessibility tightening
- Performance budgets + regression checks
- Visual regression discipline

---

## 4) Gate Registry (IDs + Enforcement)

### 4.1 Hard Gates (Always enforced)
- `GATE-MSG-STRICT` — Strict messaging envelope used
- `GATE-KILL-LIST` — No kill-list violations (template patterns, manipulative UX)
- `GATE-TLS` — TLS targets met for each included component type
- `GATE-INTEGRATION-NAV` — Global navigation present and consistent
- `GATE-INTEGRATION-ROUTING` — No dead routes; all pages reachable
- `GATE-VISUAL-QA` — Desktop + mobile screenshots; zero console errors
- `GATE-A11Y-BASELINE` — Readability/contrast/tap targets meet baseline
- `GATE-CODE-REVIEW` — Code review pass (no blocking issues)

### 4.2 Phase Gates (enforced only when a phase includes the flow)
- `GATE-FLOW-PHASE1` — Discovery → Tour Detail → Operator Profile coherent
- `GATE-FLOW-PHASE2` — Auth shell + user profile shell coherence (UI only)
- `GATE-FLOW-PHASE3` — Perf budgets and regression discipline

---

## 5) TLS Targets (Enforce via tls-component-rubrics)

**Default TLS targets (hard gate):**
- Hero: TLS <= 20
- Trust/Proof: TLS <= 18
- How-it-works/Process: TLS <= 18
- Cards: TLS <= 20
- CTA: TLS <= 20

If a page includes these component types, it must meet their TLS target.

---

## 6) Evidence Requirements (Artifacts)

All evidence must be saved under `/artifacts` with consistent naming.

### 6.1 Visual QA Evidence (`GATE-VISUAL-QA`)
For each critical page:
- `artifacts/screenshots/<page>__desktop__fold.png`
- `artifacts/screenshots/<page>__desktop__mid.png` (if needed)
- `artifacts/screenshots/<page>__mobile__fold.png`

Additionally:
- `artifacts/reports/<page>__console.txt` (must show zero errors)

### 6.2 Accessibility Evidence (`GATE-A11Y-BASELINE`)
- `artifacts/a11y/<page>__a11y.md`
Must include:
- Contrast notes
- Font sizing notes
- Tap target notes
- Navigation clarity notes
- Failures as actionable bullet points

### 6.3 Code Review Evidence (`GATE-CODE-REVIEW`)
- `artifacts/reports/<scope>__code-review.md`
Must include:
- PASS/FAIL
- Blocking issues list (if fail)
- Specific files/components implicated

---

## 7) Definition of Done (Per Task)

A task is DONE only when:
- Implementation exists and matches wireframe intent
- Required gates are listed in `GATES_REQUIRED`
- Passed gates are listed in `GATES_PASSED`
- Evidence exists under `/artifacts`
- No hard-gate violations are present

---

## 8) Default Vertical Slice Order (Phase 1)

1) Home
2) Tours Index
3) Tour Detail
4) Operator Public Profile

No new pages are added until the current page passes gates.

Claude may write output to disk ONLY when explicitly instructed to do so.
Default behavior is console-only output.
---
