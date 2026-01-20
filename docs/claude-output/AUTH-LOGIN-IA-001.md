# AUTH-LOGIN-IA-001 — Login Page Information Architecture

```
STATUS: APPROVED
TASK_ID: AUTH-LOGIN-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Login page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
APPROVED_BY: orchestrator
APPROVED_DATE: 2026-01-21
INPUTS_USED:
  - docs/wireframes.md (Global rules, Phase 2 context)
  - docs/context/quorum_tours_shared_operator_user_pain_point_ux_synthesis_claude_build_guide.md
  - claude/protocols/messaging.md
  - claude/protocols/design-principles.md
  - claude/protocols/tls-component-rubrics.md
  - claude/protocols/flow-gates.md (GATE-FLOW-PHASE2-AUTH-SHELL)
  - docs/claude-output/HOW-IT-WORKS-IA-001.md (format reference)
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE2-AUTH-SHELL
GATES_PASSED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE2-AUTH-SHELL
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## Login Page — Detailed IA Specification

### Primary Job

Provide a **calm, trustworthy entry point** for returning users to access their account. The login page must feel secure enough for $3,500 tour transactions without relying on security badges or reassurance copy. Trust emerges from simplicity, clarity, and professional restraint.

### Target Demographics

| User Type | Age Range | Key Concern | Design Response |
|-----------|-----------|-------------|-----------------|
| Tour Operators | 50-70 | Technology frustration (OP-8) | Large inputs, clear labels, no jargon |
| Birders | 45-65 | Payment anxiety (EL-2) | Professional tone, no pressure, visible security |

### Pain Point Mapping

**EL-2 (Payment Anxiety):**
- Users worry about hidden charges and unclear commitments
- Login page must feel institutional, not startup-casual
- No gamification, no urgency, no surprise states

**OP-8 (Technology Frustration):**
- Older users find auth flows intimidating
- Clear, generous input fields
- Explicit labels (not placeholder-only)
- Visible password toggle
- Error states that explain, not blame

### User Entry Points

1. **Protected Route Redirect:** User tries to access account-required feature
2. **Global Navigation:** Account/Sign In link
3. **Tour Detail CTA:** "Sign in to commit" pathway
4. **Direct Link:** Bookmarked login URL
5. **Create Account Flow:** Returning from registration

### Page Philosophy

This is a **utility surface**, not a marketing page. Users arrive with intent to sign in. Every element exists to:
- Reduce friction
- Build trust through restraint
- Accommodate varying tech comfort levels
- Support Supabase Auth UI patterns (email/password, magic link, OAuth)

**UI Shell Constraint:** This is Phase 2 frontend only. No backend auth wiring. All forms are visual representations of future functionality.

---

## Section 1: Page Header

**Target TLS:** < 15 (minimal, functional)

**Intent:**
- Immediate context: user knows they're on the login page
- Calm reassurance without excessive copy
- Brief explanation of why account exists

**Structure:**
- Page title: "Sign in to Quorum"
- Single-sentence context (why accounts exist)
- No marketing language

**Content Requirements:**
- Headline: "Sign in to Quorum" (not "Welcome back!" or "Log in to unlock...")
- Subtext: "Access your tour commitments and booking history."
- No exclamation marks
- No urgency language

**Anti-Template Requirements:**
- NO "Welcome back!" enthusiasm
- NO "Unlock your account" language
- NO decorative illustrations
- NO hero-style layout

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| PageHeader | Minimal container |
| PageTitle | H1, display font, left-aligned |
| PageSubtext | Single-sentence context |

---

## Section 2: Primary Login Form

**Target TLS:** < 18 (functional, trustworthy)

**Intent:**
- Email/password authentication pattern
- Large, accessible input fields
- Clear error handling patterns
- Password visibility toggle for older users

**Structure:**
- Email input with visible label
- Password input with visible label + visibility toggle
- "Remember me" checkbox (optional)
- Primary submit button
- Forgot password link (below password field)

**Form Field Requirements:**

| Field | Label | Placeholder | Validation |
|-------|-------|-------------|------------|
| Email | "Email address" | "you@example.com" | Valid email format |
| Password | "Password" | None (security) | Minimum 8 characters |

**Input Styling Requirements:**
- Minimum height: 48px (touch target compliance)
- Labels above inputs (not placeholder-only)
- Clear focus states with ring outline
- Error states: red border + inline message below field
- Success state: subtle green checkmark (optional)

**Password Field Special Requirements:**
- Visibility toggle button (eye icon)
- Toggle label: "Show" / "Hide"
- Default state: hidden (dots)
- Toggle is focusable and keyboard-accessible

**Button Requirements:**
- Primary: "Sign in" (not "Log in", "Submit", or "Continue")
- Full-width on mobile
- Loading state: spinner + "Signing in..."
- Disabled state when form invalid

**Error Handling Patterns (UI Shell):**

| Error Type | Display Pattern |
|------------|-----------------|
| Invalid email format | Inline below email: "Enter a valid email address" |
| Wrong credentials | Alert above form: "Email or password is incorrect" |
| Account locked | Alert above form: "Account temporarily locked. Try again in 15 minutes." |
| Network error | Alert above form: "Connection error. Check your internet and try again." |

**Anti-Template Requirements:**
- NO placeholder-only labels
- NO tiny input fields
- NO hidden error states
- NO "Oops!" or casual error language
- NO blame-shifting ("You entered...")

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| LoginForm | Form container |
| FormField | Label + input wrapper |
| TextInput | Email input |
| PasswordInput | Password input with toggle |
| VisibilityToggle | Show/hide password |
| Checkbox | Remember me option |
| PrimaryButton | Submit action |
| InlineError | Field-level validation |
| FormAlert | Form-level errors |
| ForgotPasswordLink | Recovery pathway |

---

## Section 3: Alternative Authentication Methods

**Target TLS:** < 18 (functional, unobtrusive)

**Intent:**
- Support passwordless login (magic link)
- OAuth placeholders (Google, Apple)
- Clear separation from primary form
- No hierarchy confusion

**Structure:**
- Visual divider: "Or continue with"
- Magic link option (email-based, no password)
- OAuth buttons (Google, Apple placeholders)
- Each method clearly labeled

**Divider Requirements:**
- Horizontal rule with centered text
- Text: "Or continue with" (not "Or")
- Subdued styling (not prominent)

**Magic Link Requirements:**
- Button: "Email me a sign-in link"
- Explanation: "We'll send a one-time link to your email. No password needed."
- Click opens modal or inline expansion with email input
- Success state: "Check your inbox for a sign-in link."

**OAuth Button Requirements:**
- Google: "Continue with Google"
- Apple: "Continue with Apple" (optional)
- Brand icons (monochrome for consistency)
- Same height as primary button
- Outlined style (not filled) to maintain hierarchy

**Why Magic Link Matters:**
- Reduces password frustration for older users (OP-8)
- No password to remember
- Feels more secure (no password exposure)

**Anti-Template Requirements:**
- NO social login overload (max 2-3 options)
- NO tiny OAuth icons
- NO "Sign in with..." for every platform
- OAuth is secondary, not primary

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| Divider | Visual separator with text |
| MagicLinkOption | Passwordless alternative |
| OAuthButton | Third-party auth placeholder |
| OAuthIcon | Brand icon (monochrome) |

---

## Section 4: Account Recovery Pathway

**Target TLS:** < 15 (minimal, helpful)

**Intent:**
- Clear path to password reset
- No shame or frustration language
- Accessible from password field

**Structure:**
- Link below password field: "Forgot your password?"
- Leads to separate password reset page (or modal)
- No inline form (reduce cognitive load)

**Link Requirements:**
- Text: "Forgot your password?" (question format, not accusatory)
- Positioned below password field, right-aligned
- Subdued styling (text link, not button)
- Focus state visible

**Password Reset Page (Separate Route):**
- Route: `/reset-password`
- Email input only
- Submit: "Send reset link"
- Success: "If an account exists for this email, you'll receive a reset link."
- Security note: Don't confirm account existence

**Anti-Template Requirements:**
- NO "Forgot password?" as afterthought
- NO buried in footer
- NO "Click here" links
- Clear, visible, accessible

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ForgotPasswordLink | Recovery pathway |
| PasswordResetPage | Separate route (UI shell) |

---

## Section 5: Create Account Pathway

**Target TLS:** < 15 (minimal, clear)

**Intent:**
- Clear pathway to registration
- Positioned after login form (returning users are primary)
- No pressure or urgency

**Structure:**
- Text: "New to Quorum?"
- Link: "Create an account"
- Positioned at bottom of form card
- Generous spacing from login form

**Why Account Required (Contextual):**
Brief explanation if user arrived from protected route:
- "An account lets you commit to tours, track confirmations, and manage your bookings."
- No overselling
- Factual utility statement

**Link Requirements:**
- Text: "Create an account" (not "Sign up" or "Join now")
- Styled as text link with underline on hover
- Focus state visible

**Anti-Template Requirements:**
- NO "Join thousands of..." social proof
- NO "Free forever" pricing reassurance
- NO urgency or scarcity
- Clean, factual pathway

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| CreateAccountPrompt | Text + link container |
| ContextExplanation | Why account is needed (conditional) |

---

## Section 6: Trust & Security Signals (Implicit)

**Target TLS:** < 10 (invisible, structural)

**Intent:**
- Trust communicated through design, not badges
- Security implied by professionalism
- No explicit "secure" claims

**Trust Through Design:**

| Signal | Implementation |
|--------|----------------|
| HTTPS | Browser indicates (not our badge) |
| Professional typography | Fraunces display, clean hierarchy |
| Generous whitespace | Institutional, not startup |
| Consistent patterns | Same as tour booking forms |
| Error handling | Informative, not dismissive |

**What We Do NOT Include:**
- "Secure login" badges
- Lock icons next to password
- "Your data is safe with us" copy
- Trust seals or certifications
- "Bank-level encryption" claims

**Why No Explicit Security Claims:**
- $3,500 transaction users are sophisticated
- Security badges signal insecurity
- Trust emerges from consistent, professional execution
- Explicit claims invite scrutiny

**Anti-Template Requirements:**
- NO trust badges
- NO "secure" in headlines
- NO lock icons (browser handles this)
- NO reassurance copy

---

## Full Component Inventory (Login Page)

| Component | TLS Category | Key Differentiation |
|-----------|--------------|---------------------|
| PageHeader | Layout | Minimal, left-aligned |
| PageTitle | Typography | H1, display font |
| PageSubtext | Copy | Single sentence, factual |
| LoginForm | Layout | Centered card, generous padding |
| FormField | DNA | Label above input |
| TextInput | DNA | 48px height, clear focus |
| PasswordInput | DNA | Visibility toggle |
| VisibilityToggle | Interaction | Show/Hide with icon |
| Checkbox | DNA | Remember me option |
| PrimaryButton | Interaction | Full-width mobile, loading state |
| InlineError | Copy | Field-level, red, explanatory |
| FormAlert | Copy | Form-level, prominent |
| ForgotPasswordLink | Copy | Below password, subdued |
| Divider | Layout | "Or continue with" |
| MagicLinkOption | DNA | Passwordless alternative |
| OAuthButton | DNA | Outlined, brand icon |
| CreateAccountPrompt | Copy | Bottom of card, text link |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Single form section |
| KL-LAYOUT-004 | PASS | Form left-aligned within card |
| KL-COMP-001 | PASS | No lift+shadow hover on cards |
| KL-COMP-002 | PASS | No 4-icon feature row |
| KL-COMP-005 | PASS | No carousel |
| KL-CONTENT-001 | PASS | No LLM words (unlock, seamless) |
| KL-CONTENT-004 | PASS | Specific labels, no generic |
| KL-CONTENT-005 | PASS | Error states visible, not hidden |
| KL-CONTENT-006 | PASS | "Sign in" not "Submit" or "Continue" |
| KL-IMAGE-001 | PASS | No Undraw illustrations |
| KL-IMAGE-002 | PASS | No gradient blur blobs |
| KL-TRUST-002 | N/A | No testimonials on auth page |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Page Header | Copy/Layout | < 15 |
| Primary Login Form | DNA/Interaction | < 18 |
| Alternative Auth | DNA/Interaction | < 18 |
| Account Recovery | Copy | < 15 |
| Create Account | Copy | < 15 |
| Trust Signals | Structural | < 10 |

---

## Page Layout Structure

```
┌─────────────────────────────────────────┐
│ GlobalNav                               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Sign in to Quorum               │    │
│  │ Access your tour commitments... │    │
│  │                                 │    │
│  │ ┌─────────────────────────────┐ │    │
│  │ │ Email address               │ │    │
│  │ │ ┌─────────────────────────┐ │ │    │
│  │ │ │ you@example.com         │ │ │    │
│  │ │ └─────────────────────────┘ │ │    │
│  │ │                             │ │    │
│  │ │ Password                    │ │    │
│  │ │ ┌───────────────────┐ [👁] │ │    │
│  │ │ │ ••••••••          │      │ │    │
│  │ │ └───────────────────┘      │ │    │
│  │ │           Forgot password? │ │    │
│  │ │                             │ │    │
│  │ │ ☐ Remember me               │ │    │
│  │ │                             │ │    │
│  │ │ ┌─────────────────────────┐ │ │    │
│  │ │ │       Sign in           │ │ │    │
│  │ │ └─────────────────────────┘ │ │    │
│  │ │                             │ │    │
│  │ │ ─────── Or continue with ─────── │ │    │
│  │ │                             │ │    │
│  │ │ [ Email me a sign-in link ] │ │    │
│  │ │                             │ │    │
│  │ │ [ G Continue with Google  ] │ │    │
│  │ │                             │ │    │
│  │ └─────────────────────────────┘ │    │
│  │                                 │    │
│  │ New to Quorum? Create an account│    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

**Desktop:** Centered card, max-width 420px
**Mobile:** Full-width with padding, same vertical structure

---

## Navigation & Routing

### Routes

| Route | Purpose |
|-------|---------|
| `/login` | Primary login page |
| `/signup` | Create account (separate IA spec) |
| `/reset-password` | Password reset (linked from login) |

### Global Nav Behavior
- "Sign In" link in nav leads to this page
- If user is authenticated (future), redirect to account dashboard

### Protected Route Redirect
When user accesses protected route without auth:
1. Redirect to `/login?redirect={originalPath}`
2. Display context message: "Sign in to access your tour commitments."
3. After successful login, redirect to original path

### Cross-Page Consistency
- Same GlobalNav as all pages
- Same typography and color tokens
- Form styling consistent with tour commitment forms

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Form labels | Visible labels above inputs, not placeholder-only |
| Error association | `aria-describedby` linking error messages to fields |
| Focus management | Focus trapped in form, logical tab order |
| Error announcement | `role="alert"` for form-level errors |
| Password toggle | Button with `aria-label="Show password"` / `"Hide password"` |
| Submit state | `aria-busy="true"` during submission |
| Link purpose | Clear link text ("Forgot your password?", not "Click here") |

### WCAG 2.1 AA Targets

| Criterion | Requirement |
|-----------|-------------|
| 1.3.1 Info and Relationships | Labels programmatically associated |
| 1.4.3 Contrast | 4.5:1 for text, 3:1 for inputs |
| 2.1.1 Keyboard | All interactive elements keyboard accessible |
| 2.4.3 Focus Order | Logical top-to-bottom order |
| 2.4.6 Headings and Labels | Descriptive and unique |
| 3.3.1 Error Identification | Errors described in text |
| 3.3.2 Labels or Instructions | All fields have labels |
| 3.3.3 Error Suggestion | Error messages suggest fixes |

---

## Responsive Behavior

| Viewport | Layout | Card Width | Input Height |
|----------|--------|------------|--------------|
| Desktop (1024px+) | Centered card | 420px | 48px |
| Tablet (768-1023px) | Centered card | 400px | 48px |
| Mobile (<768px) | Full-width | 100% - 32px | 52px (larger tap target) |

### Mobile-Specific Adjustments
- Full-width buttons
- Increased input height (52px)
- Touch-friendly toggle buttons
- Generous spacing between elements

---

## Content Tone Guidelines

| Do | Don't |
|----|-------|
| "Sign in to Quorum" | "Welcome back!" |
| "Email address" | "Your email" |
| "Enter a valid email address" | "Oops! That doesn't look right" |
| "Email or password is incorrect" | "Wrong credentials" |
| "Forgot your password?" | "Can't remember?" |
| "Create an account" | "Join now!" |

---

## Supabase Auth UI Pattern Support

This IA specification supports the following Supabase Auth UI patterns (UI shell only):

| Pattern | Supported | Component |
|---------|-----------|-----------|
| Email/Password | Yes | LoginForm |
| Magic Link | Yes | MagicLinkOption |
| OAuth (Google) | Yes | OAuthButton |
| OAuth (Apple) | Optional | OAuthButton |
| Password Reset | Yes | PasswordResetPage (separate) |
| Sign Up | Yes | Linked to /signup |

**Implementation Note:** All forms are UI shells. Supabase integration will be wired in a later phase.

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| LoginPage | `src/app/login/page.tsx` | Page container |
| LoginForm | `src/components/auth/LoginForm.tsx` | Email/password form |
| PasswordInput | `src/components/auth/PasswordInput.tsx` | Password field with toggle |
| FormAlert | `src/components/auth/FormAlert.tsx` | Form-level error/success |
| AuthDivider | `src/components/auth/AuthDivider.tsx` | "Or continue with" |
| MagicLinkOption | `src/components/auth/MagicLinkOption.tsx` | Passwordless option |
| OAuthButton | `src/components/auth/OAuthButton.tsx` | Third-party auth button |
| AuthCard | `src/components/auth/AuthCard.tsx` | Centered card container |

## Components to Reuse

| Component | From | Usage |
|-----------|------|-------|
| GlobalNav | Shared | Page navigation |
| Button | UI | Form submit, OAuth buttons |
| TextInput | UI (if exists) | Email input |

---

## Example Content (For Implementation Reference)

### Page Header:
```
Sign in to Quorum
Access your tour commitments and booking history.
```

### Error States:
```
Invalid email: "Enter a valid email address"
Wrong credentials: "Email or password is incorrect. Check your details and try again."
Account locked: "Account temporarily locked after too many attempts. Try again in 15 minutes."
```

### Magic Link Success:
```
Check your inbox
We sent a sign-in link to {email}. Click the link to continue.
```

### Create Account Prompt:
```
New to Quorum? Create an account
```

---

## GATE-FLOW-PHASE2-AUTH-SHELL Compliance

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Auth pages exist as UI shells | PASS | No backend logic |
| Clear explanation of why account is needed | PASS | Subtext explains utility |
| No backend logic implemented | PASS | Forms are visual only |
| No forced auth without explanation | PASS | Context shown on redirect |
| No technical auth concepts exposed | PASS | No "OAuth", "JWT", "tokens" in UI |

---

```
COMPLETED_ACTIONS:
  1. Defined page structure and section intent
  2. Specified component inventory
  3. Mapped pain points (EL-2, OP-8) to design decisions
  4. Verified Kill-List compliance
  5. Set TLS targets per section
  6. Documented Supabase Auth UI pattern support

NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. Create AUTH-SIGNUP-IA-001 for registration page
  3. Create AUTH-RESET-PASSWORD-IA-001 for password reset
  4. frontend-implementer to receive AUTH-LOGIN-UI-001 task after approval
```
