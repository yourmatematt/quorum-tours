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
3. `claude/protocols/research.md` (research retrieval + synthesis) **← NEW**
4. `claude/design-principles.md` + kill-list rules (anti-template + anti-manipulation)
5. `claude/rubrics/tls-component-rubrics.md` (TLS scoring)
6. `claude/protocols/integration-gates.md` (navigation + routing cohesion)
7. `claude/protocols/flow-gates.md` (journey completion; phased)
8. `claude/protocols/responsiveness.md` (desktop, tablet, mobile verification)

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

## 3) Research Context (Enhancement Layer)

Research retrieval is an **optional enhancement**, not a blocking gate.

### When Research Runs
- **IA tasks**: research-lead SHOULD run before web-design-lead
- **UI tasks**: research brief SHOULD be in INPUTS_USED if available
- **Styling tasks**: research-lead SHOULD run for branding/trust context

### When Research Can Be Skipped
- Bug fixes
- Accessibility patches
- Code review fixes
- Tasks where orchestrator explicitly marks `RESEARCH: SKIP`

### Research Does NOT Block
- If research-lead fails or times out, task proceeds without research brief
- Missing research brief is noted in `INPUTS_USED` as "RESEARCH: NOT AVAILABLE"
- Task is not failed for missing research

See `claude/protocols/research.md` for full retrieval protocol.

---

## 4) Build Phases (Frontend-First)

### Phase 1: Public Discovery + Operator Trust Surfaces (MVP)
Required pages/surfaces:
- Home
- Tours Index (listing)
- Tour Detail (threshold clarity + share mechanics UI only)
- Operator Public Profile

### Phase 2: Account Shells + Intent Flows (UI only)
- Auth pages (UI shell only)
- User profile shell
- "Join tour" UI steps (no payments/auth wiring)
- How It Works

### Phase 3: Polishing + QA Hardening
- Accessibility tightening
- Performance budgets + regression checks
- Visual regression discipline
- Design system styling pass

---

## 5) Gate Registry (IDs + Enforcement)

### 5.1 Hard Gates (Always enforced)
- `GATE-MSG-STRICT` — Strict messaging envelope used
- `GATE-KILL-LIST` — No kill-list violations (template patterns, manipulative UX)
- `GATE-TLS` — TLS targets met for each included component type
- `GATE-INTEGRATION-NAV` — Global navigation present and consistent
- `GATE-INTEGRATION-ROUTING` — No dead routes; all pages reachable
- `GATE-VISUAL-QA` — Desktop + mobile screenshots; zero console errors
- `GATE-A11Y-BASELINE` — Readability/contrast/tap targets meet baseline
- `GATE-CODE-REVIEW` — Code review pass (no blocking issues)
- `GATE-RESPONSIVE` — Layout verified at 375px, 768px, 1280px **← NEW**

### 5.2 Soft Gates (Enhancement, not blocking)
- `GATE-RESEARCH` — Research brief provided as context (does not block if unavailable)

### 5.3 Phase Gates (enforced only when a phase includes the flow)
- `GATE-FLOW-PHASE1` — Discovery → Tour Detail → Operator Profile coherent
- `GATE-FLOW-PHASE2` — Auth shell + user profile shell coherence (UI only)
- `GATE-FLOW-PHASE3` — Perf budgets and regression discipline

---

## 6) TLS Targets (Enforce via tls-component-rubrics)

**Default TLS targets (hard gate):**
- Hero: TLS <= 20
- Trust/Proof: TLS <= 18
- How-it-works/Process: TLS <= 18
- Cards: TLS <= 20
- CTA: TLS <= 20

If a page includes these component types, it must meet their TLS target.

---

## 7) Evidence Requirements (Artifacts)

All evidence must be saved under `/artifacts` with consistent naming.

### 7.1 Visual QA Evidence (`GATE-VISUAL-QA`)
For each critical page:
- `artifacts/screenshots/<page>__desktop__fold.png`
- `artifacts/screenshots/<page>__desktop__mid.png` (if needed)
- `artifacts/screenshots/<page>__mobile__fold.png`

Additionally:
- `artifacts/reports/<page>__console.txt` (must show zero errors)

### 7.2 Accessibility Evidence (`GATE-A11Y-BASELINE`)
- `artifacts/a11y/<page>__a11y.md`
Must include:
- Contrast notes
- Font sizing notes
- Tap target notes
- Navigation clarity notes
- Failures as actionable bullet points

### 7.3 Code Review Evidence (`GATE-CODE-REVIEW`)
- `artifacts/reports/<scope>__code-review.md`
Must include:
- PASS/FAIL
- Blocking issues list (if fail)
- Specific files/components implicated

### 7.4 Research Evidence (`GATE-RESEARCH`) — Optional
- `docs/claude-output/TASK-RESEARCH-<ID>.md`
Must include:
- Audiences consulted
- Domains consulted
- Key findings summary
- Design implications

---

## 8) Task Flow (Updated)

Standard task execution order:
```
1. Task assigned to orchestrator
2. research-lead retrieves context (OPTIONAL, does not block)
   → Output: TASK-RESEARCH-{ID}.md
3. web-design-lead creates IA spec
   → Input: research brief (if available)
   → Output: {PAGE}-IA-{ID}.md
4. frontend-implementer builds UI
   → Input: IA spec + research brief (if available)
   → Output: implemented components/pages
5. visual-qa captures evidence
   → Output: screenshots + console logs
6. a11y-auditor runs baseline
   → Output: a11y report
7. code-reviewer reviews implementation
   → Output: code review report
8. orchestrator approves or requests changes
```

---

## 9) Definition of Done (Per Task)

A task is DONE only when:
- Implementation exists and matches wireframe intent
- Required gates are listed in `GATES_REQUIRED`
- Passed gates are listed in `GATES_PASSED`
- Evidence exists under `/artifacts`
- No hard-gate violations are present
- Responsive behavior verified at all breakpoints

Research brief in `INPUTS_USED` is recommended but not required.

---

## 10) Default Vertical Slice Order (Phase 1)

1) Home
2) Tours Index
3) Tour Detail
4) Operator Public Profile

No new pages are added until the current page passes gates.

Claude may write output to disk ONLY when explicitly instructed to do so.
Default behavior is console-only output.

---