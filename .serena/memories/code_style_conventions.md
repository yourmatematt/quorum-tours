# Code Style & Conventions

## TypeScript
- **Strict mode enabled** - All types must be explicit or inferred
- Use interfaces for component props (e.g., `interface ButtonProps {}`)
- Export types/interfaces where needed for reuse

## React Components
- Functional components only (no class components)
- Use `'use client'` directive only when needed (useState, event handlers)
- Server components by default in App Router

## File Naming
- Components: `PascalCase.tsx` (e.g., `TourCard.tsx`)
- Pages: `page.tsx` in route directories
- Barrel exports: `index.ts` for component groups

## CSS & Styling
- **Design system tokens required** - No hardcoded values
- Use CSS custom properties: `var(--color-ink)`, `var(--space-md)`, etc.
- Tailwind with design tokens: `text-[var(--color-ink)]`
- All spacing, colors, typography via tokens in `src/styles/tokens.css`

## Component Structure
```tsx
interface ComponentProps {
  // Props here
}

/**
 * ComponentName - Brief description
 * 
 * Design considerations or notes
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  return (
    // JSX
  );
}
```

## Import Conventions
- Path alias: `@/*` maps to `./src/*`
- Group imports: React, then external, then internal
- Use barrel exports: `import { Component } from '@/components'`

## Kill-List Rules (Anti-Patterns)
- NO LLM words: "seamless", "unlock", "journey", "elevate"
- NO template patterns: 4-icon rows, generic testimonials
- NO marketing hype or fake urgency
- NO lift+shadow hover effects on cards
