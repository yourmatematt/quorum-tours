# Quorum Tours - Project Overview

## Purpose
Quorum Tours is a **frontend-only** web application for a birding tour marketplace. It connects tour operators with birders through a quorum-based booking system where tours only confirm when enough participants commit.

**Critical constraint:** This is a UI/UX frontend build only. No backend architecture, databases, auth providers, or API implementations.

## Tech Stack
- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5.3 (strict mode)
- **Styling:** Tailwind CSS 3.4 with CSS custom properties (design tokens)
- **React:** 18.2

## Key Directories
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/styles/tokens.css` - Design system CSS variables
- `claude/` - Build system protocols, agents, and rubrics
- `docs/` - Specifications and output documents
- `artifacts/` - Screenshots, a11y reports, evidence

## Build System
This project uses an **orchestrated, gate-driven build system** defined in:
- `CLAUDE.md` - Master instructions
- `claude/protocols/protocols.md` - Gate registry and rules
- `claude/agents/orchestrator.md` - Multi-agent coordination

## Current Status
- **Phase 1 (Public Discovery):** Complete (4/4 pages)
- **Phase 2 (Account & Intent):** In progress (4/5 pages)
