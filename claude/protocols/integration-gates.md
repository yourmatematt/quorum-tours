# Integration Gates — Frontend Only

These gates ensure the site functions as a coherent product, not isolated pages.

No backend architecture is permitted.

---

## GATE-INTEGRATION-NAV
### Navigation Cohesion Gate

Purpose:
Ensure global navigation is present, consistent, and recoverable.

PASS conditions:
- Global nav exists on all public pages
- Navigation links are consistent across pages
- Logo or primary link returns to Home
- User can always recover from deep pages

FAIL conditions:
- Page exists without navigation
- Nav differs materially between pages
- Dead-end pages

---

## GATE-INTEGRATION-ROUTING
### Routing & Reachability Gate

Purpose:
Ensure all pages are reachable and intentional.

PASS conditions:
- All routes linked from at least one other page
- No orphaned pages
- URLs match mental model (no random slugs)

FAIL conditions:
- Manual URL entry required to reach a page
- Broken links
- Placeholder routes exposed unintentionally

---

## GATE-INTEGRATION-AUTH-UI
### Authentication UI Gate (Frontend Only)

Purpose:
Allow auth-related UI without backend implementation.

PASS conditions:
- Login/signup pages exist as UI shells (if included)
- Clear explanation of what auth enables
- Protected routes show a clean “Sign in required” UI

FAIL conditions:
- Auth provider configuration
- Middleware / guards / session logic
- Database or token architecture

---

## GATE-INTEGRATION-STATE-CLARITY
### State Communication Gate

Purpose:
Ensure users always understand where they are and what happens next.

PASS conditions:
- Confirmation / threshold states are visible
- Pending vs confirmed states are distinguishable
- Error/empty states are explained in plain language

FAIL conditions:
- Ambiguous states
- Hidden mechanics
- Relying on tooltips for core understanding

---
