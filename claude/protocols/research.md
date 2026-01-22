# Quorum Tours — Research Protocol

This protocol governs research retrieval and synthesis.
Research is an **enhancement layer** that provides context—it does not block task execution.

---

## 1) Purpose

Ensure that implementation decisions are informed by existing research on:
- Audience needs (operators, established listers, new wave birders)
- Domain knowledge (branding, trust, UX patterns, data architecture)
- Feature-specific findings (page/component level research)

---

## 2) Research is Optional, Not Blocking

### Research SHOULD Run
- Before IA tasks (web-design-lead)
- Before major UI tasks (new pages, significant features)
- Before styling/branding tasks

### Research MAY Be Skipped
- Bug fixes
- Accessibility patches
- Code review remediation
- When orchestrator marks `RESEARCH: SKIP`
- When time constraints require immediate implementation

### Research Does NOT Block
- Task proceeds if research-lead fails or times out
- Missing research noted as `RESEARCH: NOT AVAILABLE` in INPUTS_USED
- No task fails solely due to missing research

---

## 3) Research Agent Hierarchy
```
research-lead (orchestrator for research)
    │
    ├── Audience Specialists
    │   ├── audience-operators.md
    │   ├── audience-established-listers.md
    │   └── audience-new-wave.md
    │
    ├── Domain Specialists
    │   ├── domain-branding.md
    │   ├── domain-trust.md
    │   ├── domain-ux.md
    │   └── domain-data.md
    │
    └── Feature Specialists
        ├── feature-home.md
        ├── feature-operator-profile.md
        ├── feature-tour-detail.md
        ├── feature-how-it-works.md
        └── feature-dashboards.md
```

All specialist agents located in `/claude/agents/research/`

---

## 4) Research Index

The research index at `/research/RESEARCH-INDEX.md` maps documents to:
- Audiences
- Domains
- Features/pages

Specialists consult this index to identify relevant documents.

---

## 5) Research-Lead Process

### Step 1: Parse Task
From task specification, extract:
- Page/feature being built
- Primary audience(s) affected
- Secondary audience(s) affected
- Relevant domain(s)

### Step 2: Delegate to Specialists
Call relevant sub-agents based on parsing:
```
IF page specified:
  CALL feature-{page} specialist

FOR EACH audience affected:
  CALL audience-{audience} specialist

FOR EACH domain relevant:
  CALL domain-{domain} specialist
```

### Step 3: Synthesize
Combine specialist outputs into unified brief.

### Step 4: Output
Write to: `/docs/claude-output/TASK-RESEARCH-{TASK_ID}.md`

---

## 6) Research Brief Format
```markdown
# TASK-RESEARCH-{TASK_ID}

## Task Context
[What is being built and why research was retrieved]

## Specialists Consulted
- audience-operators: YES/NO
- audience-established-listers: YES/NO
- audience-new-wave: YES/NO
- domain-branding: YES/NO
- domain-trust: YES/NO
- domain-ux: YES/NO
- feature-{page}: YES/NO

## Audience Research

### Operators (if consulted)
[Key findings relevant to task]

### Established Listers (if consulted)
[Key findings relevant to task]

### New Wave Birders (if consulted)
[Key findings relevant to task]

## Domain Research

### [Domain Name] (if consulted)
[Key findings relevant to task]

## Feature-Specific Research (if consulted)
[Page/component specific findings]

## Design Implications
[Synthesis: what this research means for implementation]

## Anti-Patterns from Research
[What to avoid based on research]

## Key Citations
[Document references for audit trail]
```

---

## 7) Specialist Agent Format

Each specialist agent follows this structure:
```markdown
# {specialist-name} Research Specialist

## Scope
[What this specialist covers]

## Index Files
Primary: [list of primary research files]
Secondary: [list of secondary research files]

## Extraction Focus
When called, extract:
- [specific type of insight 1]
- [specific type of insight 2]
- [specific type of insight 3]

## Output Format
{SPECIALIST-TYPE}-{TASK_ID}.md
```

---

## 8) Integration with Task Flow

Research integrates at the START of task flow:
```
Task Assigned
     │
     ▼
┌─────────────────┐
│ research-lead   │ ← OPTIONAL ENHANCEMENT
│ (if applicable) │
└────────┬────────┘
         │ TASK-RESEARCH-{ID}.md
         ▼
┌─────────────────┐
│ web-design-lead │ ← Receives research as INPUT
└────────┬────────┘
         │
         ▼
    [Rest of flow]
```

---

## 9) When to Update Research Index

Update `/research/RESEARCH-INDEX.md` when:
- New research documents added to `/research/`
- New pages/features added requiring feature-specialists
- Research relevance mappings change

---

## 10) Failure Handling

### If Specialist Cannot Find Relevant Research
- Specialist outputs: "No relevant research found for {task}"
- research-lead notes gap in brief
- Task proceeds without that specialist's input

### If research-lead Times Out
- Task proceeds with `RESEARCH: TIMEOUT` in INPUTS_USED
- No blocking, no failure

### If Research Index Missing
- research-lead outputs: "RESEARCH-INDEX.md not found"
- Task proceeds with `RESEARCH: INDEX MISSING` in INPUTS_USED

---