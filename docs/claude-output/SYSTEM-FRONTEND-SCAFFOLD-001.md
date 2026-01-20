# SYSTEM-FRONTEND-SCAFFOLD-001 — Frontend Application Scaffold

```
STATUS: READY_FOR_QA
TASK_ID: SYSTEM-FRONTEND-SCAFFOLD-001
TASK: Scaffold minimal frontend application with working dev script
ASSIGNED_AGENT: frontend-implementer
REPORTS_TO: orchestrator
INPUTS_USED:
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - docs/wireframes.md (for stack alignment)
  - src/styles/tokens.css (existing design tokens)
  - src/components/* (existing component code)
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-INTEGRATION-ROUTING
GATES_PASSED:
  - GATE-MSG-STRICT
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## Stack Summary

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 14.2.x |
| Language | TypeScript | 5.3.x |
| Styling | Tailwind CSS | 3.4.x |
| Runtime | React | 18.2.x |

---

## Files Created

### Root Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts |
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind theme extension |
| `postcss.config.js` | PostCSS plugins |
| `next-env.d.ts` | Next.js type declarations |
| `.eslintrc.json` | ESLint rules |
| `.gitignore` | Git ignore patterns |

### App Structure

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts |
| `src/app/globals.css` | Global styles + token import |
| `src/app/page.tsx` | Home page route (from HOME-UI-001) |

---

## Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Production build |
| `start` | `npm run start` | Start production server |
| `lint` | `npm run lint` | Run ESLint |
| `typecheck` | `npm run typecheck` | TypeScript type checking |

---

## Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application runs at http://localhost:3000
```

---

## Directory Structure

```
quorum-tours/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Global styles
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── ui/             # UI primitives
│   │   ├── home/           # Home page sections
│   │   └── index.ts        # Component exports
│   └── styles/
│       └── tokens.css      # Design tokens
├── docs/
│   ├── wireframes.md
│   ├── design-system.md
│   └── claude-output/      # Agent deliverables
├── claude/
│   ├── agents/             # Agent definitions
│   ├── protocols/          # Build protocols
│   └── runbooks/           # Build procedures
├── artifacts/
│   ├── screenshots/        # Visual QA evidence
│   ├── a11y/              # Accessibility notes
│   └── reports/           # Review reports
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── .eslintrc.json
```

---

## Design Token Integration

Tailwind config extends with CSS custom properties from `src/styles/tokens.css`:

- **Typography**: `font-display`, `font-body`, `font-mono`
- **Colors**: `ink`, `surface`, `accent`, `confirmed`, `forming`, `not-running`, `border`
- **Spacing**: `section.tight`, `section.normal`, `section.loose`
- **Radii**: `sm`, `md`, `lg`, `pill`
- **Shadows**: `card`, `card-hover`

---

## Font Loading

Fonts loaded via Google Fonts in `layout.tsx`:

| Font | Role | Weights |
|------|------|---------|
| Fraunces | Display headlines | 400, 500, 600 |
| Inter | Body text | 400, 500, 600 |
| JetBrains Mono | Numbers, stats | 400, 500 |

---

## Constraints Applied

| Constraint | Status |
|------------|--------|
| No backend logic | PASS |
| No auth implementation | PASS |
| No payment wiring | PASS |
| No API routes | PASS |
| No placeholder copy | PASS |
| No database schemas | PASS |

---

## Integration Notes

- App Router structure (`src/app/`)
- Path alias `@/*` maps to `./src/*`
- Strict TypeScript enabled
- React Strict Mode enabled
- CSS custom properties for theming

---

```
NEXT_ACTIONS:
  1. Run `npm install` to install dependencies
  2. Run `npm run dev` to verify scaffold works
  3. visual-qa to confirm dev server starts without errors
  4. Proceed with HOME-UI-001 verification
```
