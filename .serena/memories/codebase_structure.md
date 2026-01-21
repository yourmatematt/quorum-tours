# Codebase Structure

## Root Directory
```
quorum-tours/
├── src/                    # Source code
├── claude/                 # Build system protocols
├── docs/                   # Specifications and outputs
├── artifacts/              # QA evidence (screenshots, reports)
├── CLAUDE.md              # Master build instructions
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Source Code (`src/`)
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home (/)
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles + token imports
│   ├── tours/
│   │   ├── page.tsx       # Tours Index (/tours)
│   │   └── [id]/page.tsx  # Tour Detail (/tours/[id])
│   ├── operators/
│   │   ├── page.tsx       # Operators Index (/operators)
│   │   └── [id]/page.tsx  # Operator Profile (/operators/[id])
│   ├── how-it-works/
│   │   └── page.tsx       # How It Works (/how-it-works)
│   ├── login/
│   │   └── page.tsx       # Login (/login) - UI shell
│   └── signup/
│       └── page.tsx       # Signup (/signup) - UI shell
├── components/
│   ├── index.ts           # Barrel exports
│   ├── GlobalNav.tsx      # Site navigation
│   ├── TourCard.tsx       # Tour listing card
│   ├── auth/              # Auth components (UI shells)
│   ├── home/              # Home page sections
│   ├── how-it-works/      # How It Works sections
│   └── ui/                # Reusable UI components
└── styles/
    └── tokens.css         # Design system CSS variables
```

## Claude Build System (`claude/`)
```
claude/
├── agents/                # Agent definitions
│   ├── orchestrator.md    # Build controller
│   ├── frontend-implementer.md
│   ├── visual-qa.md
│   ├── a11y-auditor.md
│   └── code-reviewer.md
├── protocols/             # Rules and gates
│   ├── protocols.md       # Master protocol
│   ├── messaging.md       # Response envelope
│   ├── kill-list-base.json
│   └── tls-component-rubrics.md
└── runbooks/
    └── build-runbook.md   # Build workflow
```

## Key Component Groups

### Auth Components (`src/components/auth/`)
- AuthCard, PasswordInput, FormAlert
- LoginForm, SignupForm
- OAuthButton, MagicLinkOption

### UI Components (`src/components/ui/`)
- FilterDropdown, FilterChip, EmptyState
- OperatorCard, ReviewCard
- FAQAccordion, ConfirmationBanner
