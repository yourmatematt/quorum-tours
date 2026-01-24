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
```
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
```

---

## 3. Field Definitions

### STATUS
One of (in progression order):
- BLOCKED — Cannot proceed, missing dependencies or failed gate
- IN_PROGRESS — Work actively being done
- READY_FOR_QA — Implementation complete, awaiting visual-qa + a11y-auditor
- QA_IN_PROGRESS — visual-qa and a11y-auditor actively reviewing
- READY_FOR_REVIEW — QA passed, awaiting code-reviewer
- APPROVED — All gates passed, all evidence verified

**No other values are permitted.**

**Status Ownership:**
| STATUS | Who Can Set It |
|--------|----------------|
| BLOCKED | Any agent |
| IN_PROGRESS | Assigned build agent |
| READY_FOR_QA | frontend-implementer ONLY |
| QA_IN_PROGRESS | orchestrator ONLY |
| READY_FOR_REVIEW | orchestrator ONLY (after QA pass) |
| APPROVED | orchestrator ONLY (after all evidence) |

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
- a11y-auditor
- code-reviewer

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
- GATE-A11Y-BASELINE
- GATE-CODE-REVIEW

---

### GATES_PASSED
List of gate IDs that have been satisfied.
Must be a subset of GATES_REQUIRED.

**Rules:**
- If GATES_PASSED ≠ GATES_REQUIRED, STATUS cannot be APPROVED
- Each gate in GATES_PASSED must have corresponding evidence

---

### EVIDENCE
Structured object pointing to files under `/artifacts`.

Required keys:
```
screenshots: []
a11y: []
console: []
reports: []
```

Each entry must be a valid relative file path.

**Evidence is MANDATORY for gate claims:**
- GATE-VISUAL-QA requires entries in `screenshots` + `console`
- GATE-A11Y-BASELINE requires entries in `a11y`
- GATE-CODE-REVIEW requires entries in `reports`

---

### FAIL_REASONS
If STATUS is BLOCKED or any gate failed:
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
1. orchestrator to invoke visual-qa
2. orchestrator to invoke a11y-auditor
3. After QA pass, orchestrator to invoke code-reviewer

---

## 4. Hard Rules

- No agent may self-approve its own work.
- No agent may omit GATES_REQUIRED.
- No agent may claim PASS without evidence files existing.
- Any missing field = automatic BLOCKED status.
- frontend-implementer CANNOT set status beyond READY_FOR_QA.
- APPROVED requires ALL gates in GATES_REQUIRED to be in GATES_PASSED.

---

## 5. Orchestrator Authority

The Orchestrator:
- Validates envelope compliance
- Rejects malformed responses
- Blocks progress on gate failure
- Is the SOLE authority for APPROVED status
- MUST invoke QA agents explicitly (cannot skip)
- MUST verify evidence exists before approval

---

## 6. Status Transition Rules
```
BLOCKED ←──────────────────────────────────┐
    ↓                                      │
IN_PROGRESS                                │
    ↓ (frontend-implementer completes)     │
READY_FOR_QA                               │
    ↓ (orchestrator invokes QA agents)     │
QA_IN_PROGRESS                             │
    ↓ (visual-qa + a11y-auditor PASS)      │
    ├── FAIL ──────────────────────────────┘
    ↓
READY_FOR_REVIEW
    ↓ (orchestrator invokes code-reviewer)
    ├── FAIL ──────────────────────────────┘
    ↓ (code-reviewer PASS)
APPROVED
```

**Transitions that are FORBIDDEN:**
- READY_FOR_QA → APPROVED (skips QA)
- READY_FOR_QA → READY_FOR_REVIEW (skips QA)
- IN_PROGRESS → APPROVED (skips everything)
- Any agent setting APPROVED except orchestrator