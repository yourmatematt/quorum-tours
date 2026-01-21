# Task Completion Checklist

When completing a task in Quorum Tours, follow this checklist:

## 1. Code Quality
- [ ] Run `npm run typecheck` - Zero type errors
- [ ] Run `npm run lint` - No linting errors
- [ ] All CSS uses design tokens (no hardcoded values)
- [ ] `'use client'` only where necessary

## 2. Design System Compliance
- [ ] Colors: `var(--color-*)` tokens only
- [ ] Spacing: `var(--space-*)` tokens only
- [ ] Typography: `var(--text-*)` tokens only
- [ ] Borders/radius: `var(--radius-*)` tokens only

## 3. Kill-List Compliance
- [ ] No LLM words (seamless, unlock, journey, etc.)
- [ ] No template patterns (4-icon rows, generic testimonials)
- [ ] No marketing hype or manipulation
- [ ] Specific, factual content

## 4. Accessibility (A11y)
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (single h1)
- [ ] Labels on all form inputs
- [ ] Focus indicators visible
- [ ] ARIA attributes where needed
- [ ] Touch targets 44px+ on mobile

## 5. Visual QA
- [ ] Desktop viewport verified (1280px)
- [ ] Mobile viewport verified (375px)
- [ ] Console errors: zero implementation-related
- [ ] Screenshots captured to `artifacts/screenshots/`

## 6. Documentation
- [ ] Implementation report in `docs/claude-output/`
- [ ] All gates listed and passed
- [ ] Evidence artifacts referenced

## 7. Gate Requirements
Every page must pass:
- GATE-MSG-STRICT (messaging envelope)
- GATE-KILL-LIST (anti-template)
- GATE-TLS (text load score)
- GATE-VISUAL-QA (browser verification)
- GATE-A11Y-BASELINE (accessibility)
- GATE-CODE-REVIEW (code quality)
