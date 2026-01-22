## Responsive Implementation Requirements

All layout components MUST include breakpoint behavior:

### Required Breakpoints
- Mobile: default (< 768px)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

### Testing Requirement
Before marking UI task complete, verify layout at:
- 375px width (mobile)
- 768px width (tablet)
- 1280px width (desktop)

### Common Patterns
- Horizontal flows: `flex-col md:flex-row`
- Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Side-by-side comparisons: `flex-col md:flex-row`

### Visual QA Gate
GATE-VISUAL-QA must include screenshots at mobile AND desktop widths.