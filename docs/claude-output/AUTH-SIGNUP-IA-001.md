# AUTH-SIGNUP-IA-001 — Signup Page Information Architecture

```
STATUS: PENDING_REVIEW
TASK_ID: AUTH-SIGNUP-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Signup page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/claude-output/AUTH-LOGIN-IA-001.md (format reference, component reuse)
  - docs/claude-output/AUTH-LOGIN-UI-001-APPROVAL.md (existing auth components)
  - docs/context/quorum_tours_shared_operator_user_pain_point_ux_synthesis_claude_build_guide.md
  - claude/protocols/messaging.md
  - claude/design-principles.md
  - claude/rubrics/tls-component-rubrics.md
  - claude/protocols/flow-gates.md (GATE-FLOW-PHASE2-AUTH-SHELL)
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE2-AUTH-SHELL
GATES_PASSED: []
EVIDENCE:
  screenshots: []
  a11y: []
  console: []
  reports: []
FAIL_REASONS: NONE
OUTPUT:
```

## Signup Page — Detailed IA Specification

### Primary Job

Provide a **welcoming, low-friction entry point** for new users to create an account. The signup page must feel accessible to all experience levels—from first-time birders to seasoned wildlife enthusiasts—without gatekeeping language or exclusivity signals. Account creation should feel like unlocking access to a useful tool, not gaining membership to an exclusive club.

### Target Demographics

| User Type | Age Range | Key Concern | Design Response |
|-----------|-----------|-------------|-----------------|
| Tour Operators | 50-70 | Technology frustration, feeling judged | Minimal fields, no expertise questions |
| Birders (new) | 35-55 | Intimidation, not "expert enough" | Welcoming tone, no gatekeeping |
| Birders (experienced) | 45-65 | Payment anxiety, skepticism | Professional execution, clear value |

### Pain Point Mapping

**NW-2 (Intimidation/Gatekeeping):**
- New users worry they aren't "serious enough" for specialized tours
- Signup should not require proving expertise or commitment level
- No questionnaires about birding experience or skill level
- Account is for logistics, not qualification

**OP-8 (Technology Frustration):**
- Older users find multi-step registration intimidating
- Single-page form, no "wizard" steps
- Clear progress through minimal fields
- Immediate feedback on validation

**EL-2 (Payment Anxiety):**
- Users worry about signing up for hidden costs
- Signup is free—make this implicit through simplicity
- No credit card required messaging (don't mention it at all)
- Account enables access, not billing

### User Entry Points

1. **From Login Page:** "Create an account" link
2. **From Tour Detail:** "Sign up to commit" pathway
3. **From Protected Route:** Redirect with context message
4. **Direct Navigation:** /signup URL
5. **Marketing (Future):** Landing page CTAs

### Page Philosophy

Signup is a **utility gateway**, not a conversion funnel. Users arrive ready to create an account—our job is to make this as simple and quick as possible. Every additional field is a barrier; every optional field signals uncertainty about what's actually needed.

**Welcoming, Not Exclusive:**
- No "Join the community" language (implies gatekeeping)
- No "Become a member" (implies exclusivity)
- No expertise or experience questions (implies qualification)
- Simply: "Create an account to commit to tours"

**UI Shell Constraint:** This is Phase 2 frontend only. No backend auth wiring. All forms are visual representations of future functionality.

---

## Section 1: Page Header

**Target TLS:** < 15 (minimal, welcoming)

**Intent:**
- Immediate context: user knows they're creating an account
- Welcoming tone without excessive enthusiasm
- Brief explanation of what an account enables

**Structure:**
- Page title: "Create your account"
- Single-sentence context (what account enables)
- No marketing language

**Content Requirements:**
- Headline: "Create your account" (not "Join Quorum" or "Sign up free")
- Subtext: "Track your tour commitments and get notified when tours confirm."
- No exclamation marks
- No urgency language
- No "free" mentions (implies alternatives aren't free)

**Anti-Template Requirements:**
- NO "Join thousands of birders" social proof
- NO "Get started in seconds" speed claims
- NO decorative illustrations or mascots
- NO hero-style layout with background images
- NO "Welcome!" enthusiasm

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| PageHeader | Minimal container | Pattern from login |
| PageTitle | H1, display font, left-aligned | Pattern from login |
| PageSubtext | Single-sentence context | Pattern from login |

---

## Section 2: Signup Form (Core Fields)

**Target TLS:** < 18 (functional, trustworthy)

**Intent:**
- Collect minimum required information
- Large, accessible input fields
- Clear validation and error handling
- Password requirements shown proactively

**Structure:**
- Email input with visible label
- Password input with visibility toggle + requirements
- Confirm password input with visibility toggle
- Primary submit button

**Form Field Requirements:**

| Field | Label | Placeholder | Validation | Required |
|-------|-------|-------------|------------|----------|
| Email | "Email address" | "you@example.com" | Valid email format | Yes |
| Password | "Create a password" | None | Min 8 chars | Yes |
| Confirm | "Confirm password" | None | Must match | Yes |

**Password Requirements Display:**
Show requirements proactively, not after failure:
- "At least 8 characters"
- Check marks appear as requirements are met (visual feedback)
- Don't require special characters (reduces frustration for older users)

**Why Minimal Fields:**
- Name: Not required for tour commitments (can collect later)
- Phone: Not required (prefer email communication)
- "How did you hear about us": Marketing data, not user value—omit

**Decision: No Optional Fields**
Optional fields signal uncertainty and add cognitive load. If we don't need it for account creation, don't ask. Marketing attribution can be gathered through other means.

**Input Styling Requirements:**
- Minimum height: 48px (touch target compliance)
- Labels above inputs (not placeholder-only)
- Clear focus states with ring outline
- Error states: red border + inline message below field
- Password requirements: subtle checklist below password field

**Button Requirements:**
- Primary: "Create account" (not "Sign up", "Submit", or "Get started")
- Full-width on mobile
- Loading state: spinner + "Creating account..."
- Disabled state when form invalid

**Error Handling Patterns (UI Shell):**

| Error Type | Display Pattern |
|------------|-----------------|
| Invalid email format | Inline below email: "Enter a valid email address" |
| Password too short | Inline below password: "Password must be at least 8 characters" |
| Passwords don't match | Inline below confirm: "Passwords do not match" |
| Email already exists | Alert above form: "An account with this email already exists. Sign in instead?" |
| Network error | Alert above form: "Connection error. Check your internet and try again." |

**Anti-Template Requirements:**
- NO placeholder-only labels
- NO password strength meters (too gamified)
- NO "Strong password!" celebrations
- NO asking for unnecessary information
- NO multi-step wizard forms

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| SignupForm | Form container | New (similar to LoginForm) |
| FormField | Label + input wrapper | Pattern from login |
| TextInput | Email input | Pattern from login |
| PasswordInput | Password input with toggle | Reuse from auth |
| PasswordRequirements | Visual checklist | New |
| PrimaryButton | Submit action | Pattern from login |
| InlineError | Field-level validation | Pattern from login |
| FormAlert | Form-level errors | Reuse from auth |

---

## Section 3: Alternative Signup Methods

**Target TLS:** < 15 (minimal, optional)

**Intent:**
- Support OAuth signup (Google)
- Maintain visual hierarchy (form is primary)
- Reduce friction for users who prefer OAuth

**Structure:**
- Visual divider: "Or continue with"
- OAuth buttons (Google)
- Same patterns as login for consistency

**Divider Requirements:**
- Same styling as login page
- Text: "Or continue with"
- Subdued styling

**OAuth Button Requirements:**
- Google: "Continue with Google"
- Same height and styling as login page
- Outlined style (not filled) to maintain hierarchy

**Why OAuth Matters for Signup:**
- Faster than typing email/password
- No password to remember
- Particularly helpful for less tech-savvy users (OP-8)

**Anti-Template Requirements:**
- NO multiple OAuth providers (keep it simple)
- NO social login overload
- OAuth is alternative, not primary

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| AuthDivider | Visual separator | Reuse from auth |
| OAuthButton | Google signup | Reuse from auth |

---

## Section 4: Terms & Privacy Acknowledgment

**Target TLS:** < 10 (legal requirement, minimal)

**Intent:**
- Legal compliance without friction
- Implicit consent through action (no checkbox)
- Clear link to policies

**Structure:**
- Single line of text below submit button
- Links to Terms of Service and Privacy Policy
- Submission implies acceptance

**Content Requirements:**
- Text: "By creating an account, you agree to our Terms of Service and Privacy Policy."
- Both terms are links
- No checkbox required (creates friction)
- Text appears above submit button

**Why No Checkbox:**
- Checkboxes add friction without legal benefit
- Submission implies acceptance (standard pattern)
- Links are available for those who want to read

**Anti-Template Requirements:**
- NO long legal disclaimers
- NO checkbox for marketing emails
- NO pre-checked newsletter subscription
- Minimal, honest, clear

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| TermsNotice | Legal acknowledgment line | New |
| TermsLink | Link to terms | Standard link |
| PrivacyLink | Link to privacy | Standard link |

---

## Section 5: Sign In Pathway

**Target TLS:** < 15 (minimal, clear)

**Intent:**
- Clear pathway for existing users who landed here by mistake
- No pressure or confusion
- Positioned at bottom

**Structure:**
- Text: "Already have an account?"
- Link: "Sign in"
- Positioned below form card

**Content Requirements:**
- Question format: "Already have an account?"
- Link text: "Sign in" (matches login page)
- No "instead" language

**Anti-Template Requirements:**
- NO "Click here" links
- NO hidden or buried
- Clear, accessible

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| SignInPrompt | Text + link container | Pattern from login (inverse) |

---

## Full Component Inventory (Signup Page)

| Component | TLS Category | Reuse Status | Key Differentiation |
|-----------|--------------|--------------|---------------------|
| PageHeader | Layout | Pattern | Same as login |
| PageTitle | Typography | Pattern | Same as login |
| PageSubtext | Copy | Pattern | Different text |
| AuthCard | Layout | Reuse | Same centered card |
| SignupForm | Layout | New | Similar to LoginForm |
| FormField | DNA | Pattern | Same as login |
| TextInput | DNA | Pattern | Same as login |
| PasswordInput | DNA | Reuse | Exact component |
| PasswordRequirements | DNA | New | Checklist below password |
| PrimaryButton | Interaction | Pattern | Different label |
| InlineError | Copy | Pattern | Same as login |
| FormAlert | Copy | Reuse | Exact component |
| AuthDivider | Layout | Reuse | Exact component |
| OAuthButton | DNA | Reuse | Exact component |
| TermsNotice | Copy | New | Legal compliance |
| SignInPrompt | Copy | Pattern | Inverse of login |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Single form section |
| KL-LAYOUT-004 | PASS | Form left-aligned within card |
| KL-COMP-001 | PASS | No lift+shadow hover on cards |
| KL-COMP-002 | PASS | No 4-icon feature row |
| KL-COMP-005 | PASS | No carousel |
| KL-CONTENT-001 | PASS | No LLM words (join, unlock, seamless) |
| KL-CONTENT-004 | PASS | Specific labels, no generic |
| KL-CONTENT-005 | PASS | Error states visible, not hidden |
| KL-CONTENT-006 | PASS | "Create account" not "Submit" or "Get started" |
| KL-IMAGE-001 | PASS | No Undraw illustrations |
| KL-IMAGE-002 | PASS | No gradient blur blobs |
| KL-TRUST-002 | N/A | No testimonials on auth page |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Page Header | Copy/Layout | < 15 |
| Signup Form | DNA/Interaction | < 18 |
| Alternative Auth | DNA | < 15 |
| Terms Notice | Copy | < 10 |
| Sign In Pathway | Copy | < 15 |

---

## Page Layout Structure

```
┌─────────────────────────────────────────┐
│ GlobalNav                               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Create your account             │    │
│  │ Track your tour commitments...  │    │
│  │                                 │    │
│  │ ┌─────────────────────────────┐ │    │
│  │ │ Email address               │ │    │
│  │ │ ┌─────────────────────────┐ │ │    │
│  │ │ │ you@example.com         │ │ │    │
│  │ │ └─────────────────────────┘ │ │    │
│  │ │                             │ │    │
│  │ │ Create a password           │ │    │
│  │ │ ┌───────────────────┐ [👁] │ │    │
│  │ │ │ ••••••••          │      │ │    │
│  │ │ └───────────────────┘      │ │    │
│  │ │ ✓ At least 8 characters    │ │    │
│  │ │                             │ │    │
│  │ │ Confirm password            │ │    │
│  │ │ ┌───────────────────┐ [👁] │ │    │
│  │ │ │ ••••••••          │      │ │    │
│  │ │ └───────────────────┘      │ │    │
│  │ │                             │ │    │
│  │ │ By creating an account...   │ │    │
│  │ │                             │ │    │
│  │ │ ┌─────────────────────────┐ │ │    │
│  │ │ │    Create account       │ │ │    │
│  │ │ └─────────────────────────┘ │ │    │
│  │ │                             │ │    │
│  │ │ ─────── Or continue with ─────── │ │    │
│  │ │                             │ │    │
│  │ │ [ G Continue with Google  ] │ │    │
│  │ │                             │ │    │
│  │ └─────────────────────────────┘ │    │
│  │                                 │    │
│  │ Already have an account? Sign in│    │
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
| `/signup` | Account creation page |
| `/login` | Sign in (linked from signup) |
| `/terms` | Terms of Service (linked) |
| `/privacy` | Privacy Policy (linked) |

### Global Nav Behavior
- Nav appears normally
- If user is authenticated (future), redirect to account dashboard

### Protected Route Redirect
When user accesses protected route without auth:
1. Redirect to `/login` (not signup)
2. Login page has clear path to signup

### Cross-Page Consistency
- Same GlobalNav as all pages
- Same AuthCard styling as login
- Same form field styling as login
- Same OAuth button styling as login

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Form labels | Visible labels above inputs |
| Error association | `aria-describedby` linking errors to fields |
| Focus management | Logical tab order through form |
| Error announcement | `role="alert"` for form-level errors |
| Password toggle | `aria-label="Show password"` / `"Hide password"` |
| Submit state | `aria-busy="true"` during submission |
| Link purpose | Clear link text ("Sign in", "Terms of Service") |
| Password requirements | Associated with password field via `aria-describedby` |

### WCAG 2.1 AA Targets

| Criterion | Requirement |
|-----------|-------------|
| 1.3.1 Info and Relationships | Labels programmatically associated |
| 1.4.3 Contrast | 4.5:1 for text, 3:1 for inputs |
| 2.1.1 Keyboard | All interactive elements keyboard accessible |
| 2.4.3 Focus Order | Logical top-to-bottom order |
| 2.4.6 Headings and Labels | Descriptive and unique |
| 3.3.1 Error Identification | Errors described in text |
| 3.3.2 Labels or Instructions | All fields have labels + password requirements |
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
| "Create your account" | "Join Quorum" or "Sign up free" |
| "Track your tour commitments" | "Unlock exclusive access" |
| "Email address" | "Your email" |
| "Create a password" | "Choose a secure password" |
| "Passwords do not match" | "Oops! Those don't match" |
| "Already have an account?" | "Been here before?" |

### Welcoming Without Gatekeeping

| Welcoming | Gatekeeping (Avoid) |
|-----------|---------------------|
| "Create your account" | "Join our community of birders" |
| "Track tour commitments" | "Access member-only tours" |
| (No experience questions) | "What's your birding experience level?" |
| (No expertise signals) | "For serious birders" |

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| SignupPage | `src/app/signup/page.tsx` | Page container |
| SignupForm | `src/components/auth/SignupForm.tsx` | Registration form |
| PasswordRequirements | `src/components/auth/PasswordRequirements.tsx` | Visual checklist |
| TermsNotice | `src/components/auth/TermsNotice.tsx` | Legal acknowledgment |

## Components to Reuse (From AUTH-LOGIN-UI-001)

| Component | File | Usage |
|-----------|------|-------|
| AuthCard | `src/components/auth/AuthCard.tsx` | Centered container |
| PasswordInput | `src/components/auth/PasswordInput.tsx` | Both password fields |
| FormAlert | `src/components/auth/FormAlert.tsx` | Form-level errors |
| AuthDivider | `src/components/auth/AuthDivider.tsx` | OAuth separator |
| OAuthButton | `src/components/auth/OAuthButton.tsx` | Google signup |

---

## Example Content (For Implementation Reference)

### Page Header:
```
Create your account
Track your tour commitments and get notified when tours confirm.
```

### Password Requirements (Visual Checklist):
```
✓ At least 8 characters (shown when met)
○ At least 8 characters (shown when not met)
```

### Error States:
```
Invalid email: "Enter a valid email address"
Password too short: "Password must be at least 8 characters"
Passwords don't match: "Passwords do not match"
Email exists: "An account with this email already exists. Sign in instead?"
```

### Terms Notice:
```
By creating an account, you agree to our Terms of Service and Privacy Policy.
```

### Sign In Prompt:
```
Already have an account? Sign in
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
| No gatekeeping or exclusivity | PASS | No expertise questions or "member" language |

---

## Comparison with Login Page

| Aspect | Login | Signup |
|--------|-------|--------|
| Headline | "Sign in to Quorum" | "Create your account" |
| Subtext | "Access your tour commitments..." | "Track your tour commitments..." |
| Email field | Yes | Yes |
| Password field | Yes | Yes |
| Confirm password | No | Yes |
| Remember me | Yes | No |
| Forgot password | Yes | No |
| Password requirements | No | Yes (visual checklist) |
| Terms notice | No | Yes |
| Magic link | Yes | No (simplify signup) |
| OAuth | Yes (Google) | Yes (Google) |
| Bottom link | "Create an account" | "Sign in" |

---

```
COMPLETED_ACTIONS:
  1. Defined page structure and section intent
  2. Specified component inventory with reuse strategy
  3. Addressed NW-2 (intimidation/gatekeeping) throughout
  4. Mapped pain points (NW-2, OP-8, EL-2) to design decisions
  5. Verified Kill-List compliance
  6. Set TLS targets per section
  7. Documented component reuse from AUTH-LOGIN-UI-001

NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. frontend-implementer to receive AUTH-SIGNUP-UI-001 task after approval
  3. Create AUTH-RESET-PASSWORD-IA-001 for password reset page
```
