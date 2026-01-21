# JOIN-TOUR-IA-001 — Join Tour Flow Information Architecture

```
STATUS: READY_FOR_REVIEW
TASK_ID: JOIN-TOUR-IA-001
TASK: Define Information Architecture, flow structure, and component inventory for Join Tour commitment flow
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/claude-output/TOUR-DETAIL-IA-001.md (entry point context)
  - docs/claude-output/AUTH-SIGNUP-IA-001.md (auth flow patterns)
  - docs/claude-output/USER-PROFILE-IA-001.md (commitment tracking destination)
  - docs/context/quorum_tours_shared_operator_user_pain_point_ux_synthesis_claude_build_guide.md
  - src/components/ui/CommitmentCard.tsx (existing entry component)
  - claude/protocols/messaging.md
  - claude/protocols/protocols.md
  - claude/protocols/kill-list-base.json
  - claude/rubrics/tls-component-rubrics.md
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE2
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

## Join Tour Flow — Detailed IA Specification

### Primary Job

Enable users to commit to a tour in a way that feels **safe, reversible, and fully understood**. The commitment flow exists to reduce anxiety, not create urgency. Every screen must answer: "What am I agreeing to, and what happens next?"

### Flow Philosophy

**Commitment is Conditional, Not Binding**

The quorum-based booking model means user commitment is fundamentally different from traditional booking:
- Users express interest; payment is deferred until tour confirms
- Commitment is reversible until tour confirmation
- Users are committing to a *potential* tour, not a guaranteed one

This must be communicated at every step without legal jargon or buried disclaimers.

**UI Shell Constraint:** This is Phase 2 frontend only. No payment processing, no auth integration, no backend wiring. All forms and flows are visual representations of future functionality.

---

### User Entry Points

| Entry State | Source | CTA Text | Tour Status |
|-------------|--------|----------|-------------|
| Join Confirmed | Tour Detail (CommitmentCard) | "Join This Tour" | confirmed |
| Express Interest | Tour Detail (CommitmentCard) | "Express Interest" | forming |
| Return Visitor | User Profile commitment list | "View Details" | any |

### Target Demographics & Pain Points

| Pain Point | User Concern | Design Response |
|------------|--------------|-----------------|
| EL-2 (Payment Anxiety) | "Will I be charged immediately?" | Explicit: "Card held, not charged until confirmation" |
| EL-3 (Cancellation Fear) | "What if I need to back out?" | Clear: "Withdraw anytime before tour confirms" |
| NW-2 (Intimidation) | "Am I qualified for this tour?" | No expertise questions or gatekeeping |
| OP-8 (Technology Frustration) | "Is this too complicated?" | Single-page flow, minimal fields |

---

## Flow Architecture

### Flow States Overview

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Tour Detail Page                                       │
│  ├─> [Confirmed Tour] ─> Join Flow ─> Confirmation      │
│  └─> [Forming Tour] ──> Interest Flow ─> Confirmation   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Two Distinct Flows (Same Page, Different Content)

| Flow Type | Entry CTA | Auth Required | Payment Info | Primary Outcome |
|-----------|-----------|---------------|--------------|-----------------|
| Join Confirmed | "Join This Tour" | Yes | Card required | Spot reserved |
| Express Interest | "Express Interest" | Yes | Optional | Interest registered |

---

## Section 1: Auth Gate (If Not Signed In)

**Target TLS:** < 15 (utility, minimal friction)

**Intent:**
- Explain why an account is needed (not gatekeeping)
- Preserve tour context through auth flow
- Return user to commitment flow after auth

**Structure:**
- Single-screen modal or inline message
- Tour context preserved in view
- Clear "Sign in" and "Create account" paths
- Explanation of why auth is needed

**Content Requirements:**
```
To commit to this tour, you'll need an account.
This lets us notify you when the tour confirms and track your commitments.

[Sign in] [Create account]
```

**Why Account Required:**
- Notifications when tour status changes
- Track commitments in user profile
- Payment information (for confirmed joins)
- Communication with operator

**Anti-Template Requirements:**
- NO "Join our community" language
- NO benefits list or marketing pitch
- Simple utility explanation
- Auth is a requirement, not an upsell

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| AuthGateModal | Modal/inline auth prompt | New |
| AuthGateMessage | Explanation text | New |
| SignInButton | Primary auth path | Pattern from auth |
| CreateAccountButton | Secondary auth path | Pattern from auth |

---

## Section 2: Tour Confirmation Summary

**Target TLS:** < 15 (trust, clarity)

**Intent:**
- Confirm user is committing to the right tour
- Show current confirmation status
- Reinforce what they're joining

**Structure:**
- Tour name, dates, location
- Operator name
- Current confirmation status
- Participant count / threshold progress

**Content Display:**

| For Confirmed Tours | For Forming Tours |
|---------------------|-------------------|
| "This tour is confirmed" | "This tour is forming" |
| "X participants · Running" | "X of Y needed to confirm" |
| "Your spot will be reserved" | "You'll be notified when confirmed" |

**Anti-Template Requirements:**
- NO urgency language ("Book now before it fills!")
- NO countdown timers
- Factual confirmation status only

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| TourConfirmationSummary | Tour context card | New |
| ConfirmationStatusBadge | Status indicator | Reuse from UI |
| ParticipantProgress | Threshold visualization | Reuse from Tour Detail |

---

## Section 3: Commitment Information Collection

**Target TLS:** < 18 (functional, minimal)

**Intent:**
- Collect only information necessary for commitment
- Reduce friction with minimal fields
- Pre-fill from account where possible

**Structure (For Confirmed Tours):**
- Contact confirmation (email, pre-filled)
- Emergency contact (optional for now)
- Payment information (card hold, not charge)
- Dietary/accessibility notes (optional, free text)

**Structure (For Forming Tours):**
- Contact confirmation (email, pre-filled)
- No payment required
- Optional: notification preferences

### Form Fields (Confirmed Tour - Full Join)

| Field | Label | Required | Pre-fill | Notes |
|-------|-------|----------|----------|-------|
| Email | "Email address" | Yes | From account | Confirmation sent here |
| Phone | "Phone number" | Optional | From account | For day-of coordination |
| Emergency Contact | "Emergency contact" | Optional | — | Name + phone |
| Dietary/Access | "Any requirements?" | Optional | — | Free text, 200 char max |

### Form Fields (Forming Tour - Express Interest)

| Field | Label | Required | Pre-fill | Notes |
|-------|-------|----------|----------|-------|
| Email | "Email address" | Yes | From account | Notifications sent here |
| Notify Preferences | "How should we notify you?" | Optional | Email default | Email / SMS toggle |

**Why Minimal Fields:**
- Name: Already in account
- Experience level: Gatekeeping signal—omit
- "How did you hear about us?": Marketing data—omit
- Full payment: Deferred until confirmation

**Anti-Template Requirements:**
- NO multi-step wizard
- NO progress bars (single step)
- NO optional marketing fields
- NO expertise or experience questions

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| JoinForm | Form container (full join) | New |
| InterestForm | Form container (express interest) | New |
| FormField | Label + input wrapper | Pattern from auth |
| TextInput | Standard input | Reuse from auth |
| PhoneInput | Phone with formatting | New |
| TextArea | Free text (requirements) | Pattern |
| NotificationToggle | Email/SMS preference | New |

---

## Section 4: Payment Information (Confirmed Tours Only)

**Target TLS:** < 20 (trust, transparency)

**Intent:**
- Collect payment method without charging
- Explain hold vs charge distinction clearly
- Build trust through explicit process

**Structure:**
- Price confirmation
- Card input (standard secure form)
- Clear "hold, not charge" explanation
- What triggers actual charge

**Payment Explanation Requirements:**

```
Your card will be held but NOT charged today.

When: Your card is charged when the tour runs
Amount: $[price] per person
Refund: Full refund if you withdraw before tour confirmation

If the tour doesn't reach its threshold, your hold is released automatically.
```

**State-Specific Content:**

| State | Message |
|-------|---------|
| Confirmed tour | "Your card will be charged for $[price]" |
| Forming tour | No payment section (interest only) |

**Card Input Requirements:**
- Standard card number, expiry, CVC
- Secure input indicators
- No CVV explanation tooltip (trust standard patterns)
- Error states inline

**Anti-Template Requirements:**
- NO "Secure checkout" badges (trust through design)
- NO "100% satisfaction guarantee" claims
- NO urgency around payment
- Explanation is factual, not reassuring

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| PaymentSection | Container | New |
| PriceConfirmation | Price summary | Pattern from CommitmentCard |
| CardInput | Secure card fields | New (standard pattern) |
| PaymentExplanation | Hold vs charge copy | New |
| SecurityIndicator | Subtle secure input signal | New |

---

## Section 5: Commitment Explanation & Terms

**Target TLS:** < 15 (trust, legal)

**Intent:**
- Crystal clear explanation of what user is agreeing to
- No hidden terms or buried conditions
- Cancellation policy front and center

**Structure:**
- "What you're agreeing to" summary
- Cancellation terms (explicit)
- What happens in each scenario
- Terms & conditions acknowledgment

**Commitment Summary (Confirmed Tour):**

```
What you're agreeing to:
• Your spot on [Tour Name] on [Date] is reserved
• Your card will be charged [X days before / on confirmation]
• You can cancel with full refund until [cancellation deadline]

If you need to cancel:
• Before [deadline]: Full refund
• After [deadline]: [Policy - e.g., 50% refund, no refund, etc.]
```

**Commitment Summary (Forming Tour):**

```
What you're agreeing to:
• Your interest in [Tour Name] is registered
• You'll be notified when the tour reaches its threshold
• You can withdraw your interest anytime before confirmation
• No payment is required until the tour confirms

If the tour confirms:
• You'll receive an email to complete your booking
• You'll have [X days] to confirm or release your spot
```

**Scenario Table:**

| Scenario | What Happens | User Action Required |
|----------|--------------|----------------------|
| Tour confirms | Notification sent, card charged (if applicable) | None (auto-proceed) or confirm email |
| Tour doesn't confirm | Hold released, notification sent | None |
| User withdraws (forming) | Interest removed | Click "Withdraw" in profile |
| User cancels (confirmed) | Refund per policy | Contact support or profile action |

**Anti-Template Requirements:**
- NO "By clicking you agree to..." buried link
- Terms visible, not behind expand
- Cancellation policy is ABOVE the submit button
- No legal jargon—plain English

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| CommitmentSummary | What user agrees to | New |
| CancellationPolicy | Clear policy display | New |
| ScenarioList | What happens when | New |
| TermsAcknowledgment | Inline terms link | Pattern from signup |

---

## Section 6: Confirm Action

**Target TLS:** < 20 (CTA, trust)

**Intent:**
- Clear, confident action button
- Reinforce what clicking does
- No ambiguity about outcome

**Structure:**
- Primary CTA button
- Brief confirmation of action
- Loading state during submission

**CTA Content:**

| Tour State | Button Text | Below Text |
|------------|-------------|------------|
| Confirmed | "Reserve My Spot" | "You'll receive confirmation at [email]" |
| Forming | "Express Interest" | "We'll notify you when this tour confirms" |

**Button States:**
- Default: Primary color, clear text
- Loading: Spinner + "Reserving..." or "Registering..."
- Success: Redirect to confirmation
- Error: Inline error message, button re-enabled

**Anti-Template Requirements:**
- NO "Complete Booking" (not a completed booking yet)
- NO "Submit" (too generic)
- NO double-click prevention as visible UX
- Action verb matches actual outcome

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| ConfirmButton | Primary action | Pattern from auth |
| ButtonLoadingState | Spinner + text | Pattern |
| ConfirmationText | Below-button explanation | New |

---

## Section 7: Success Confirmation

**Target TLS:** < 18 (trust, next steps)

**Intent:**
- Confirm action was successful
- Set clear expectations for what happens next
- Provide clear path to manage commitment

**Structure:**
- Success message with tour name
- What happens next (timeline)
- Link to view commitment in profile
- Link to return to tours

**Success Content (Confirmed Tour):**

```
You're in!

Your spot on [Tour Name] is reserved.

What's next:
• Confirmation email sent to [email]
• Your card will be charged on [date/trigger]
• Tour details and instructions will be sent [X days] before

[View in Your Profile] [Browse More Tours]
```

**Success Content (Forming Tour):**

```
Interest registered!

You've expressed interest in [Tour Name].

What's next:
• We'll email you when this tour reaches [threshold] participants
• Current progress: [X] of [Y] participants
• You can withdraw anytime from your profile

[View in Your Profile] [Browse More Tours]
```

**Anti-Template Requirements:**
- NO confetti or celebration animations
- NO "Share with friends" social prompts
- NO upsell of other tours
- Calm, informative confirmation

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| SuccessPage | Full-page confirmation | New |
| SuccessMessage | Primary confirmation | New |
| NextStepsList | What happens timeline | New |
| ProfileLink | View commitment | Pattern |
| ToursLink | Return to browse | Pattern |

---

## Full Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ TOUR DETAIL PAGE                                                │
│ [CommitmentCard: "Join This Tour" / "Express Interest"]         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ AUTH CHECK                                                      │
│ ├─ Signed in? ──> Continue to flow                              │
│ └─ Not signed in? ──> Auth Gate Modal ──> Sign in / Create      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ JOIN TOUR PAGE: /tours/[id]/join                                │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Section 2: Tour Confirmation Summary                        │ │
│ │ [Tour name, dates, status, operator]                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Section 3: Information Collection                           │ │
│ │ [Email, phone, requirements - minimal fields]               │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Section 4: Payment (Confirmed tours only)                   │ │
│ │ [Card input, hold explanation]                              │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Section 5: Commitment Explanation                           │ │
│ │ [What you agree to, cancellation policy]                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Section 6: Confirm Action                                   │ │
│ │ [Reserve My Spot / Express Interest]                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ SUCCESS PAGE: /tours/[id]/join/success                          │
│                                                                 │
│ Section 7: Success Confirmation                                 │
│ [Confirmation, what's next, profile link]                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Page Layout Structure

### Join Page (Desktop)

```
┌─────────────────────────────────────────┐
│ GlobalNav                               │
├─────────────────────────────────────────┤
│ Breadcrumb: Tours > [Tour] > Join       │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ TOUR SUMMARY                    │    │
│  │ [Name, dates, status]           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ YOUR INFORMATION                │    │
│  │ [Form fields]                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ PAYMENT (if confirmed tour)     │    │
│  │ [Card input, explanation]       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ WHAT YOU'RE AGREEING TO         │    │
│  │ [Summary, cancellation policy]  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ [Reserve My Spot]               │    │
│  │ Confirmation sent to [email]    │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

**Desktop:** Single column, max-width 600px, centered
**Mobile:** Full-width with padding, same vertical structure

---

## Full Component Inventory (Join Tour Flow)

| Component | TLS Category | Reuse Status | Key Differentiation |
|-----------|--------------|--------------|---------------------|
| AuthGateModal | DNA | New | Contextual auth prompt |
| TourConfirmationSummary | Trust | New | Tour context in flow |
| ConfirmationStatusBadge | Trust | Reuse | From UI library |
| ParticipantProgress | Trust | Reuse | From Tour Detail |
| JoinForm | DNA | New | Confirmed tour form |
| InterestForm | DNA | New | Forming tour form |
| FormField | DNA | Pattern | From auth components |
| TextInput | DNA | Reuse | From auth |
| PhoneInput | DNA | New | Phone formatting |
| TextArea | DNA | Pattern | Requirements field |
| NotificationToggle | DNA | New | Email/SMS preference |
| PaymentSection | Trust | New | Card collection |
| CardInput | DNA | New | Secure card fields |
| PaymentExplanation | Copy | New | Hold vs charge |
| CommitmentSummary | Copy | New | Agreement summary |
| CancellationPolicy | Copy | New | Policy display |
| ConfirmButton | CTA | Pattern | From auth |
| SuccessPage | Layout | New | Confirmation page |
| SuccessMessage | Copy | New | Success text |
| NextStepsList | Copy | New | What happens next |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Single column flow |
| KL-LAYOUT-004 | PASS | All text left-aligned |
| KL-COMP-001 | PASS | No lift+shadow hover |
| KL-COMP-005 | PASS | No carousels |
| KL-CONTENT-001 | PASS | No LLM words (unlock, seamless, etc.) |
| KL-CONTENT-004 | PASS | Specific content, no generic |
| KL-CONTENT-005 | PASS | No hidden conditions |
| KL-CONTENT-006 | PASS | "Reserve My Spot" not "Submit" |
| KL-IMAGE-001 | PASS | No illustrations |
| KL-IMAGE-002 | PASS | No gradient blobs |
| KL-TRUST-001 | PASS | No logo walls |
| KL-TRUST-002 | N/A | No testimonials in flow |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Auth Gate | DNA | < 15 |
| Tour Summary | Trust | < 15 |
| Information Form | DNA | < 18 |
| Payment | Trust/DNA | < 20 |
| Commitment Summary | Copy/Trust | < 15 |
| Confirm CTA | CTA | < 20 |
| Success | Copy | < 18 |

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Form labels | Visible labels above all inputs |
| Error association | `aria-describedby` linking errors to fields |
| Focus management | Focus moves to first error on submission failure |
| Payment security | Secure input indicators for card fields |
| Progress indication | `aria-live` region for submission status |
| Success announcement | Focus moves to success message |
| Skip navigation | Skip link to main content |

### WCAG 2.1 AA Targets

| Criterion | Requirement |
|-----------|-------------|
| 1.3.1 Info and Relationships | Labels programmatically associated |
| 1.4.3 Contrast | 4.5:1 for text, 3:1 for inputs |
| 2.1.1 Keyboard | All form elements keyboard accessible |
| 2.4.3 Focus Order | Logical form field order |
| 3.3.1 Error Identification | Errors described in text |
| 3.3.2 Labels or Instructions | All fields have visible labels |
| 3.3.3 Error Suggestion | Error messages suggest fixes |
| 3.3.4 Error Prevention | Confirmation before financial commitment |

---

## Responsive Behavior

| Viewport | Layout | Form Width |
|----------|--------|------------|
| Desktop (1024px+) | Centered column | 600px max |
| Tablet (768-1023px) | Centered column | 540px max |
| Mobile (<768px) | Full-width | 100% - 32px |

---

## Navigation & Routing

### Routes

| Route | Purpose |
|-------|---------|
| `/tours/[id]` | Tour Detail (entry point) |
| `/tours/[id]/join` | Join Tour flow page |
| `/tours/[id]/join/success` | Success confirmation |
| `/profile` | View commitments |

### Navigation Behavior

- Back navigation: Returns to Tour Detail
- Breadcrumb: Tours > [Tour Name] > Join
- After success: Links to Profile or Tours

---

## Content Tone Guidelines

| Do | Don't |
|----|-------|
| "Reserve my spot" | "Book now" |
| "Express interest" | "Secure your place" |
| "Your card will be held, not charged" | "Risk-free booking" |
| "Withdraw anytime before confirmation" | "Cancel hassle-free" |
| "You'll be notified when..." | "Don't miss out!" |

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| JoinTourPage | `src/app/tours/[id]/join/page.tsx` | Main flow page |
| JoinSuccessPage | `src/app/tours/[id]/join/success/page.tsx` | Success page |
| AuthGateModal | `src/components/join/AuthGateModal.tsx` | Auth prompt |
| TourConfirmationSummary | `src/components/join/TourConfirmationSummary.tsx` | Tour context |
| JoinForm | `src/components/join/JoinForm.tsx` | Confirmed tour form |
| InterestForm | `src/components/join/InterestForm.tsx` | Forming tour form |
| PaymentSection | `src/components/join/PaymentSection.tsx` | Card collection |
| CommitmentSummary | `src/components/join/CommitmentSummary.tsx` | Agreement display |
| SuccessMessage | `src/components/join/SuccessMessage.tsx` | Confirmation |

## Components to Reuse

| Component | Source | Usage |
|-----------|--------|-------|
| ConfirmationStatusBadge | `src/components/ui/` | Status indicator |
| FormField | `src/components/auth/` | Form pattern |
| TextInput | `src/components/auth/` | Input fields |
| Button | `src/components/ui/` | CTA buttons |
| FormAlert | `src/components/auth/` | Error display |

---

```
COMPLETED_ACTIONS:
  1. Defined flow architecture for two entry states (confirmed/forming)
  2. Specified section intent and content requirements
  3. Addressed pain points (EL-2, EL-3, NW-2, OP-8)
  4. Documented component inventory with reuse strategy
  5. Verified Kill-List compliance
  6. Set TLS targets per section
  7. Defined accessibility requirements

NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. If approved: frontend-implementer receives JOIN-TOUR-UI-001 task
  3. visual-qa to capture evidence after implementation
  4. a11y-auditor to verify form accessibility patterns
```
