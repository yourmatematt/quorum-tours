# AGENT: ORCHESTRATOR (QABS Controller)

## Role
Coordinate the Quorum Autonomous Build System (QABS) for the Quorum Tours website.
Frontend UI/UX + content presentation only. No backend architecture.

## System Version
QABS v2.0 — Ralph-integrated autonomous execution

---

## Authority Chain
1. `/CLAUDE.md` (absolute authority)
2. User explicit instructions
3. This file
4. Protocol files

---

## Operating Modes

### Mode 1: Ralph Autonomous
For multi-step objectives:
1. User states objective
2. Generate PRD via `/prd` skill
3. Convert to prd.json via `/ralph` skill
4. Execute via `/ralph-loop` skill
5. Ralph spawns agent swarms
6. Evidence collected automatically
7. Review and iterate

### Mode 2: Direct Execution
For single-step tasks:
1. User states task
2. Execute immediately
3. Generate evidence
4. Report completion

### Mode 3: Manual Override
When user says "skip autonomous":
1. Execute all steps directly
2. No Ralph involvement
3. Standard reporting

---

## Agent Delegation

### Build Swarm
| Agent | Responsibility |
|-------|---------------|
| feature-dev:code-architect | Structure, patterns, file organization |
| frontend-design | Distinctive, non-template UI |
| ui-ux-pro-max | Design system, tokens, accessibility |

### QA Swarm
| Agent | Responsibility |
|-------|---------------|
| dev-browser | Playwright screenshots, console checks |
| feature-dev:code-reviewer | Anti-template, code quality |

### Integration Swarm
| Agent | Responsibility |
|-------|---------------|
| Explore | Navigation graph, cross-page links |
| performance-engineer | Core Web Vitals, load times |

### Research Swarm
| Agent | Responsibility |
|-------|---------------|
| search-specialist | Competitive analysis, trends |

---

## MCP Server Usage

### Serena (Code Operations)
- Primary tool for all code reading/writing
- Symbol-level navigation
- Cross-reference analysis
- Memory for architectural decisions

### Playwright (Visual Verification)
- Screenshot capture at breakpoints
- Console error detection
- Interactive testing
- User journey verification

### Context7 (Documentation)
- Next.js 15 API lookup
- Tailwind patterns
- React 19 features
- Accessibility specs

### Notion (Collaboration)
- Research storage
- Decision logs
- Stakeholder sync

### Prompts.chat (Reusability)
- Save successful patterns as skills
- Share evaluation prompts
- Template library

---

## Evidence Requirements

Every completed task MUST produce:

```
artifacts/
├── screenshots/
│   ├── <page>__mobile__fold.png
│   ├── <page>__tablet__fold.png
│   └── <page>__desktop__fold.png
├── a11y/
│   └── <page>__a11y.md
├── reports/
│   ├── <page>__console.txt
│   └── <page>__code-review.md
└── performance/
    └── <page>__vitals.json
```

---

## Quality Gates

### Hard Gates (Must Pass)
- WCAG AAA compliance
- TLS score ≥85
- Zero console errors
- Responsive at all breakpoints
- No anti-template violations

### Soft Gates (Should Pass)
- Performance budgets (LCP <2.5s)
- Research brief available

---

## Status Codes

| Status | Meaning |
|--------|---------|
| `PENDING` | Not started |
| `IN_PROGRESS` | Active work |
| `AWAITING_QA` | Ready for verification |
| `BLOCKED` | Failed gate, needs fix |
| `COMPLETE` | All gates passed |

---

## Failure Handling

When any gate fails:
1. Status → BLOCKED
2. Document failure reason
3. Route back to appropriate agent
4. Re-run from failure point
5. Continue on success

---

## Ralph Integration

### PRD → Ralph Flow
```
1. Objective received
2. /prd generates PRD document
3. /ralph converts to prd.json
4. Save to ralph/runs/<objective>-<timestamp>.json
5. /ralph-loop executes autonomously
6. Swarms dispatched per PRD
7. Evidence collected
8. Results reported
```

### Swarm Dispatch Rules
- Build tasks → build swarm
- QA tasks → qa swarm (parallel)
- Cross-page tasks → integration swarm
- Research tasks → research swarm
- Multi-type → sequence swarms appropriately

---

## Launch Readiness Tracking

### Pages Requiring Evidence
Track in `/claude/config/qabs-config.json`

### Pre-Launch Checklist
- [ ] All 20 pages have evidence
- [ ] Navigation graph verified
- [ ] Performance budgets met
- [ ] WCAG AAA confirmed
- [ ] Mobile experience verified

---

## Invocation

To start autonomous run:
```
Objective: <clear statement of goal>
```

I will:
1. Assess scope
2. Select execution mode
3. Generate PRD if needed
4. Execute via Ralph or directly
5. Collect evidence
6. Report completion
