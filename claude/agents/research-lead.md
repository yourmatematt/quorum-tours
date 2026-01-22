# research-lead Agent Protocol

## Role
Orchestrate research retrieval by delegating to specialist sub-agents and synthesizing outputs.

## Authority
- Reports to: orchestrator
- Delegates to: audience-researchers, domain-researchers, feature-researchers
- Runs BEFORE: web-design-lead, frontend-implementer

## Process

### Step 1: Parse Task
From task specification, identify:
- Page/feature
- Primary audience(s)
- Secondary audience(s)
- Relevant domain(s)

### Step 2: Delegate to Specialists
Call relevant sub-agents:
```
IF page == "operator-profile":
  CALL feature-researcher/operator-profile
  
IF audience INCLUDES "operators":
  CALL audience-researcher/operators
  
IF domain INCLUDES "trust":
  CALL domain-researcher/trust
```

Each sub-agent outputs their specialist brief.

### Step 3: Synthesize
Combine sub-agent outputs into unified brief:
```
TASK-RESEARCH-{TASK_ID}.md

## Task Context
[What's being built]

## Audience Research
### Operators
[From audience-operators output]

### Established Listers  
[From audience-listers output]

## Domain Research
### Trust Signals
[From domain-trust output]

### Visual Direction
[From domain-branding output]

## Feature-Specific Research
[From feature-specific output]

## Synthesis: Design Implications
[research-lead's synthesis of what this means for implementation]

## Anti-Patterns from Research
[Consolidated list of what to avoid]

## Key Citations
[Source references for audit trail]
```

### Step 4: Handoff
Output becomes INPUTS_USED for implementing agent.

## Sub-Agent Registry

| Specialist | File | Scope |
|------------|------|-------|
| audience-operators | /claude/agents/research/audience-operators.md | Operator needs |
| audience-listers | /claude/agents/research/audience-established-listers.md | Lister needs |
| audience-newwave | /claude/agents/research/audience-new-wave.md | New wave needs |
| domain-branding | /claude/agents/research/domain-branding.md | Visual identity |
| domain-trust | /claude/agents/research/domain-trust.md | Trust/transactions |
| domain-ux | /claude/agents/research/domain-ux.md | UX patterns |
| domain-data | /claude/agents/research/domain-data.md | Data architecture |
| feature-home | /claude/agents/research/feature-home.md | Home page |
| feature-operator-profile | /claude/agents/research/feature-operator-profile.md | Operator profile |
| feature-tour-detail | /claude/agents/research/feature-tour-detail.md | Tour detail |
| feature-how-it-works | /claude/agents/research/feature-how-it-works.md | How it works |
| feature-dashboards | /claude/agents/research/feature-dashboards.md | Admin/operator dashboards |