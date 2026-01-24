# CLAUDE.md — Quorum Tours Autonomous Build System (QABS)

This file defines how Claude Code operates for the Quorum Tours project.
It is authoritative and supersedes all previous versions.

**Last Updated:** 2026-01-23
**System Version:** QABS v2.0

---

## 1) Project Scope

**Frontend UI/UX and content presentation ONLY.**

You MUST NOT:
- Design backend architecture, databases, or APIs
- Configure authentication providers or implement auth logic
- Implement payment processing or middleware
- Deploy infrastructure beyond Vercel previews

You MAY:
- Create frontend UI shells for future flows
- Show clear user-facing explanations of system mechanics
- Stub states visually (e.g., "Sign in required" screens)
- Use Supabase/Stripe MCP tools for documentation lookup only

---

## 2) Build Status: Phase 1 Complete

All 20 pages have been built. Phase 1 = everything built to date.

### Page Inventory

| Route | Page | Status | Evidence |
|-------|------|--------|----------|
| `/` | Home | BUILT | artifacts/home__* |
| `/tours` | Tours Index | BUILT | artifacts/tours__* |
| `/tours/[id]` | Tour Detail | BUILT | artifacts/tour-detail__* |
| `/tours/[id]/join` | Join Tour | BUILT | — |
| `/tours/[id]/join/success` | Join Success | BUILT | — |
| `/operators` | Operators Index | BUILT | artifacts/operators__* |
| `/operators/[id]` | Operator Profile | BUILT | artifacts/operator-profile__* |
| `/how-it-works` | How It Works | BUILT | — |
| `/for-operators` | For Operators Landing | BUILT | artifacts/for-operators__* |
| `/login` | Login | BUILT | artifacts/login__* |
| `/signup` | Signup | BUILT | artifacts/signup__* |
| `/profile` | User Profile | BUILT | — |
| `/operator` | Operator Dashboard | BUILT | artifacts/operator-dashboard__* |
| `/operator/tours` | My Tours | BUILT | — |
| `/operator/tours/create` | Create Tour | BUILT | — |
| `/operator/bookings` | Bookings | BUILT | — |
| `/operator/earnings` | Earnings | BUILT | — |
| `/operator/profile` | Operator Profile Settings | BUILT | — |
| `/operator/help` | Help Center | BUILT | — |
| `/admin` | Admin Dashboard | BUILT | artifacts/admin-dashboard__* |

### Phase 2: Launch Readiness
- Visual regression testing across all pages
- Performance budget enforcement
- Full evidence collection automation
- Cross-page navigation verification

---

## 3) Autonomous Build System (QABS)

This project uses Ralph-driven autonomous execution.

### Primary Controller: Ralph

```
User Objective → /prd → PRD Document → /ralph → prd.json → ralph-loop → Autonomous Execution
```

### Execution Model

**Swarm Types:**

| Swarm | Agents | Purpose |
|-------|--------|---------|
| `build` | code-architect, frontend-design, ui-ux-pro-max | New page/component creation |
| `qa` | dev-browser, code-reviewer | Visual + code quality |
| `integration` | Explore, performance-engineer | Cross-page + performance |
| `research` | search-specialist | Competitive analysis |

**Parallel Execution:**
- Independent pages can be processed simultaneously
- QA agents run in parallel for each page
- Evidence collection is automated

### Available Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `/prd` | New feature planning | Generate PRD document |
| `/ralph` | PRD conversion | Convert to prd.json |
| `/ralph-loop` | Autonomous run | Execute prd.json autonomously |
| `/dev-browser` | Visual testing | Playwright automation |
| `/frontend-design` | UI creation | Distinctive, non-template design |
| `/ui-ux-pro-max` | Design system | Tokens, palettes, patterns |
| `/code-review` | Quality gate | Bug/security/quality check |
| `/commit` | Git operations | Commit changes |
| `/vercel:deploy` | Deployment | Preview deployments |

### Available Task Agents

| Agent Type | Use Case |
|------------|----------|
| `Explore` | Codebase understanding, file discovery |
| `Plan` | Implementation strategy |
| `feature-dev:code-architect` | Structure and patterns |
| `feature-dev:code-explorer` | Trace execution paths |
| `feature-dev:code-reviewer` | Quality + anti-template |
| `code-simplifier` | Refactoring for clarity |
| `full-stack-orchestration:performance-engineer` | Core Web Vitals |
| `full-stack-orchestration:deployment-engineer` | CI/CD pipelines |
| `content-marketing:search-specialist` | Competitive research |
| `superpowers:*` | Various workflow enhancements |

---

## 4) MCP Server Integration

### Serena (Primary Code Operations)
- Symbol-level navigation and editing
- Cross-reference analysis
- Memory persistence for decisions
- Preferred for all code modifications

### Playwright (Visual Automation)
- Responsive screenshot capture
- Console error detection
- User journey flow verification
- Interactive element testing

### Context7 (Documentation)
- Real-time Next.js 15 docs
- Tailwind CSS patterns
- React 19 best practices
- Accessibility APIs

### Notion (Collaboration)
- Research artifact storage
- Decision log syncing
- Stakeholder updates

### Prompts.chat (Reusability)
- Store build patterns as skills
- Share evaluation prompts
- Maintain validation templates

### Claude-mem (Memory)
- Observation tracking
- Decision context
- Cross-session continuity

---

## 5) Quality Standards

### Design Principles (Hard Rules)
- Clarity over persuasion
- Trust as primary conversion surface
- No fake urgency or scarcity
- No template-like patterns
- No marketing hype
- Explicit confirmation mechanics

### Technical Standards
- WCAG AAA compliance
- TLS score ≥85 per component
- Zero console errors
- Responsive at 375px, 768px, 1440px
- Performance: LCP <2.5s, CLS <0.1

### Evidence Requirements
All work must produce artifacts under `/artifacts/`:
- `screenshots/<page>__<breakpoint>__<view>.png`
- `a11y/<page>__a11y.md`
- `reports/<page>__code-review.md`
- `reports/<page>__console.txt`

---

## 6) Workflow Patterns

### Pattern 1: Autonomous Build Run
```
1. Define objective clearly
2. Invoke /prd skill with requirements
3. Invoke /ralph skill to convert PRD
4. Invoke /ralph-loop to execute
5. Ralph spawns appropriate agent swarm
6. Evidence collected automatically
7. Review results, iterate if needed
```

### Pattern 2: Visual QA Sprint
```
1. Start dev server: npm run dev
2. Invoke /dev-browser skill
3. Navigate to target pages
4. Capture screenshots at all breakpoints
5. Check console for errors
6. Generate evidence bundle
```

### Pattern 3: Code Quality Sweep
```
1. Invoke feature-dev:code-reviewer agent
2. Scan for anti-template violations
3. Check design system compliance
4. Generate review report
5. Auto-fix or flag issues
```

### Pattern 4: Research Integration
```
1. Invoke content-marketing:search-specialist
2. Gather competitive intelligence
3. Store in Notion workspace
4. Feed into PRD generation
```

---

## 7) File Structure

```
quorum-tours/
├── CLAUDE.md                    # This file (authoritative)
├── artifacts/                   # Evidence storage
│   ├── screenshots/
│   ├── a11y/
│   ├── reports/
│   └── performance/
├── claude/
│   ├── agents/                  # Agent definitions
│   ├── config/                  # QABS configuration
│   ├── memory/                  # Persistent context
│   ├── protocols/               # Gate definitions
│   └── runbooks/                # Execution guides
├── ralph/
│   └── runs/                    # PRD.json files for Ralph
├── docs/
│   └── claude-output/           # Generated documentation
├── research/                    # Research artifacts
└── src/                         # Application source
```

---

## 8) Entry Points

**For new tasks:**
1. State objective clearly
2. I will select appropriate execution pattern
3. Ralph orchestrates if multi-step

**For questions about the system:**
1. Ask directly
2. I will reference this file and protocols

**For manual overrides:**
1. Explicitly state "skip autonomous"
2. I will execute directly without Ralph

---

## 9) Launch Checklist

### Pre-Launch Gates
- [ ] All 20 pages have evidence bundles
- [ ] Visual regression baseline established
- [ ] Performance budgets met
- [ ] Navigation graph verified
- [ ] WCAG AAA confirmed across all pages
- [ ] Zero anti-template violations
- [ ] Mobile experience verified (375px)

### Deployment Readiness
- [ ] Vercel project configured
- [ ] Environment variables set
- [ ] Preview deployment successful
- [ ] Production build verified

---

## 10) Conflict Resolution

Order of authority (highest to lowest):
1. This file (CLAUDE.md)
2. User explicit instructions
3. `claude/protocols/protocols.md`
4. Agent-specific protocols
5. Default Claude Code behavior

When in doubt: ASK.
