# Messaging Protocol — Strict Envelope

This protocol defines the REQUIRED message structure for all agents.
Any response that does not conform is INVALID and must be rejected by the Orchestrator.

This protocol exists to make agent behavior deterministic, auditable, and gateable.

---

## 1. Scope

Applies to:
- Orchestrator
- All specialist agents
- All build, review, verification, and approval steps

This protocol overrides conversational or free-form responses.

---

## 2. Required Envelope (ALL responses)

Every agent response MUST contain the following top-level fields, in this order:

STATUS:
TASK_ID:
TASK:
ASSIGNED_AGENT:
REPORTS_TO:
INPUTS_USED:
GATES_REQUIRED:
GATES_PASSED:
EVIDENCE:
FAIL_REASONS:
OUTPUT:
NEXT_ACTIONS:

---

## 3. Field Definitions

### STATUS
One of:
- BLOCKED
- IN_PROGRESS
- READY_FOR_QA
- READY_FOR_REVIEW
- APPROVED

No other values are permitted.

---

### TASK_ID
A stable identifier provided by the Orchestrator.
Example:
- HOME-IA-001
- TOUR-DETAIL-UI-002

---

### TASK
Plain-English description of what was attempted.

---

### ASSIGNED_AGENT
The agent completing the task.
Examples:
- web-design-lead
- frontend-implementer
- visual-qa

---

### REPORTS_TO
Always:
- orchestrator

No other value is allowed.

---

### INPUTS_USED
Explicit list of files and references used.
Examples:
- docs/wireframes.md
- claude/protocols/protocols.md
- claude/rubrics/tls-component-rubrics.md

This prevents hallucinated inputs.

---

### GATES_REQUIRED
List of gate IDs that must pass for this task.
Example:
- GATE-MSG-STRICT
- GATE-TLS-HERO
- GATE-INTEGRATION-NAV
- GATE-VISUAL-QA

---

### GATES_PASSED
List of gate IDs that have been satisfied.
Must be a subset of GATES_REQUIRED.

If empty, STATUS must be BLOCKED or IN_PROGRESS.

---

### EVIDENCE
Structured object pointing to files under `/artifacts`.

Required keys:
- screenshots: []
- a11y: []
- console: []
- reports: []

Each entry must be a valid relative file path.

---

### FAIL_REASONS
If STATUS is BLOCKED or READY_FOR_QA with failures:
- Explicit bullet list of failures
- Each failure must reference a gate ID

If no failures, use:
- NONE

---

### OUTPUT
The actual deliverable:
- wireframe notes
- code summary
- QA findings
- review decision

Do not embed evidence here; reference it above.

---

### NEXT_ACTIONS
Clear, ordered list of what happens next.
Example:
1. visual-qa to capture screenshots
2. a11y-auditor to run baseline checks

---

## 4. Hard Rules

- No agent may self-approve its own work.
- No agent may omit GATES_REQUIRED.
- No agent may claim PASS without evidence.
- Any missing field = automatic failure.

---

## 5. Orchestrator Authority

The Orchestrator:
- validates envelope compliance
- rejects malformed responses
- blocks progress on gate failure
- is the sole authority for APPROVED status

---
