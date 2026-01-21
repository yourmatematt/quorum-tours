# USER-PROFILE-IA-001 — User Profile Page Information Architecture

```
STATUS: APPROVED
TASK_ID: USER-PROFILE-IA-001
TASK: Define Information Architecture, section intent, and component inventory for User Profile page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/context/quorum_tours_user_profile_progression_ux_synthesis_claude_build_guide.md
  - docs/context/quorum_tours_shared_operator_user_pain_point_ux_synthesis_claude_build_guide.md
  - docs/claude-output/AUTH-SIGNUP-IA-001.md (format reference)
  - docs/claude-output/AUTH-LOGIN-UI-001-APPROVAL.md (auth components)
  - claude/protocols/messaging.md
  - claude/protocols/flow-gates.md (GATE-FLOW-PHASE2-AUTH-SHELL)
  - claude/rubrics/tls-component-rubrics.md
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

## User Profile Page — Detailed IA Specification

### Primary Job

Provide users a **calm, functional dashboard** to manage their tour commitments and account. The profile page is a management surface, not a social profile or achievement display. Its core purpose is answering:

- What tours have I committed to?
- What is the confirmation status of each tour?
- How do I manage my account?

### Profile Philosophy

The user profile is a **trust instrument**, not a social feed or gamified dashboard. Per the UX synthesis guide:

- Profile exists to manage commitments, not display status
- No progression bars, levels, XP, or achievement badges
- No social comparison or peer visibility
- Institutional, understated visual treatment
- Optimized for users 45-65+ (large text, high contrast, minimal density)

**UI Shell Constraint:** This is Phase 2 frontend only. No backend data fetching. All content is placeholder/example data representing future functionality.

---

### Target Demographics

| User Type | Age Range | Key Concern | Design Response |
|-----------|-----------|-------------|-----------------|
| Active Birders | 45-65 | Tracking multiple tour commitments | Clear commitment list with status |
| Occasional Users | 35-55 | Finding past bookings, account management | Simple navigation, logical sections |
| First-time Users | 35-55 | Understanding what happens next | Clear guidance, no overwhelm |

### Pain Point Mapping

**Confirmation Certainty (Core Value):**
- Users need instant clarity on tour confirmation status
- Threshold progress visible without scrolling
- No vague states like "pending" or "processing"

**Financial Risk Transparency:**
- Clear indication of what has been charged vs conditional
- Refund/no-charge concept visible on pending tours
- No hidden fees or unclear obligations

**Cognitive Load Management:**
- Calm layout, minimal information density
- Predictable interaction patterns
- Clear section hierarchy

---

## Section 1: Profile Header

**Target TLS:** < 15 (minimal, identity-focused)

**Intent:**
- Confirm user identity (they're in the right place)
- Provide navigation context
- No vanity metrics or social signals

**Structure:**
- User's display name (first name or chosen name)
- Email address (account identifier)
- Member since date (factual, not celebratory)
- Edit profile link

**Content Requirements:**
- Display name prominently (not username or email as primary)
- Email shown smaller, as account identifier
- "Member since [Month Year]" — factual timestamp, no tenure celebration
- No profile photo required (reduces friction, maintains focus)
- No "Welcome back!" or enthusiasm language

**Anti-Template Requirements:**
- NO avatar with gamified border or level indicator
- NO "Gold Member" or tier badges
- NO activity stats (tours taken, species seen)
- NO progress towards next level
- NO personalized greeting with time of day

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| ProfileHeader | Identity container | New |
| DisplayName | Primary name display | New |
| AccountIdentifier | Email, member date | New |
| EditProfileLink | Settings navigation | New |

---

## Section 2: Active Commitments

**Target TLS:** < 18 (functional, status-focused)

**Intent:**
- Show all tours user has committed to
- Make confirmation status immediately visible
- Provide clear next steps for each commitment

**Structure:**
- Section heading: "Your Commitments"
- List of commitment cards (or empty state)
- Each card shows: tour name, dates, confirmation status, threshold progress

**Commitment States (Visual Hierarchy):**

| State | Visual Treatment | User Understanding |
|-------|------------------|-------------------|
| Confirmed | Green indicator, "Confirmed" label | Tour is running, prepare to attend |
| Progressing | Amber indicator, threshold bar | Gathering participants, not yet confirmed |
| Not Met (Past Deadline) | Muted, "Did not confirm" | Tour cancelled, no charge |

**Card Content Requirements:**

Each commitment card displays:
- Tour name (linked to tour detail)
- Tour dates (specific: "Mar 15-18, 2026")
- Operator name (linked to operator profile)
- Location summary
- Confirmation status badge
- Threshold progress (X of Y participants)
- "What happens next" mini-explanation

**Threshold Progress Display:**
- Simple progress indicator (not gamified)
- Format: "4 of 6 participants" — human-readable, not "67%"
- For confirmed tours: "Confirmed with X participants"
- No countdown pressure or urgency framing

**Empty State:**
When user has no active commitments:
- Clear message: "No active commitments"
- Brief explanation: "When you commit to tours, they'll appear here."
- CTA: "Browse tours" (link to /tours)
- No sad illustrations or "you're missing out" language

**Anti-Template Requirements:**
- NO countdown timers ("3 days left to confirm!")
- NO urgency language ("Hurry, almost full!")
- NO social pressure ("Join 4 others waiting")
- NO gamified progress animations
- NO "nudge" notifications inline

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| CommitmentsSection | Section container | New |
| CommitmentCard | Individual commitment display | New |
| ConfirmationStatusBadge | Status indicator | Reuse from ui/ |
| ThresholdProgress | Participant count display | Pattern from tour detail |
| EmptyState | No commitments message | Reuse from ui/ |

---

## Section 3: Past Tours

**Target TLS:** < 15 (archival, reference)

**Intent:**
- Provide access to tour history
- Enable finding booking details for completed tours
- No celebration or achievement framing

**Structure:**
- Section heading: "Past Tours"
- Collapsed by default (most users focus on active)
- Expandable list of completed tours
- Each entry minimal: name, date, operator

**Content Requirements:**
- Tour name (linked to tour detail if still available)
- Tour date range
- Operator name
- Status: "Completed" or "Cancelled"
- No ratings, reviews, or feedback prompts in this surface

**Why Collapsed:**
- Reduces cognitive load on primary view
- Most users visit profile for active commitments
- Past tours are reference, not primary action

**Anti-Template Requirements:**
- NO "You've completed X tours!" celebration
- NO achievement badges for attendance
- NO "Leave a review" prompts
- NO species count or life list integration
- NO comparison to other users

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| PastToursSection | Collapsible container | New |
| PastTourItem | Minimal tour reference | Reuse from ui/ |
| CollapsibleSection | Expand/collapse pattern | New or pattern |

---

## Section 4: Account Settings

**Target TLS:** < 15 (utility, management)

**Intent:**
- Provide access to account management functions
- Keep settings separate from commitment view
- Clear, organized options

**Structure:**
- Section heading: "Account Settings"
- Settings grouped by category
- Links to dedicated settings pages/modals

**Settings Categories:**

| Category | Options | Notes |
|----------|---------|-------|
| Profile | Edit name, location, preferences | Basic profile info |
| Email & Password | Change email, update password | Security settings |
| Notifications | Email preferences, tour updates | Communication control |
| Account | Sign out, delete account | Account actions |

**Settings Display:**
- Category headings with brief description
- Link/button for each action
- No inline forms (navigate to dedicated views)
- "Sign out" clearly accessible

**Account Deletion:**
- Available but not prominent
- Links to separate confirmation flow
- No dark patterns to discourage

**Anti-Template Requirements:**
- NO gamified settings completion percentage
- NO "Complete your profile" pressure
- NO marketing opt-in pre-selected
- NO social media connection prompts
- NO referral program CTAs

**Component Inventory:**
| Component | Purpose | Reuse |
|-----------|---------|-------|
| SettingsSection | Settings container | New |
| SettingsCategory | Grouped settings | New |
| SettingsLink | Individual setting action | New |
| SignOutButton | Session termination | New |

---

## Section 5: Notification Preferences (Sub-page or Modal)

**Target TLS:** < 12 (utility, minimal)

**Intent:**
- Give users control over communications
- Default to respectful, minimal notifications
- Clear opt-out for non-essential

**Structure:**
- Notification type list
- Toggle for each category
- Save confirmation

**Notification Categories:**

| Category | Default | Description |
|----------|---------|-------------|
| Tour Confirmations | On (required) | When your committed tours confirm |
| Tour Updates | On | Changes to tours you've committed to |
| Tour Reminders | On | Upcoming tour reminders |
| New Tours | Off | Tours matching your interests |

**Content Requirements:**
- Each toggle has clear label and brief description
- Required notifications clearly marked (cannot disable)
- Changes save automatically or with clear save button
- Confirmation of successful save

**Anti-Template Requirements:**
- NO pre-selected marketing emails
- NO guilt-trip language for opting out
- NO "Are you sure?" friction for reducing notifications
- NO manipulative toggle placement

---

## Full Component Inventory (User Profile Page)

| Component | TLS Category | Reuse Status | Key Differentiation |
|-----------|--------------|--------------|---------------------|
| ProfileHeader | Layout | New | Identity, not vanity |
| DisplayName | Typography | New | Institutional tone |
| AccountIdentifier | Copy | New | Minimal metadata |
| EditProfileLink | Interaction | New | Navigation action |
| CommitmentsSection | Layout | New | Primary focus area |
| CommitmentCard | Card | New | Status-focused |
| ConfirmationStatusBadge | DNA | Reuse | From tour detail |
| ThresholdProgress | DNA | Pattern | Human-readable format |
| EmptyState | Copy | Reuse | From ui/ components |
| PastToursSection | Layout | New | Collapsible archive |
| PastTourItem | DNA | Reuse | Minimal reference |
| CollapsibleSection | Interaction | New/Pattern | Expand/collapse |
| SettingsSection | Layout | New | Organized options |
| SettingsCategory | Layout | New | Grouped settings |
| SettingsLink | Interaction | New | Action navigation |
| SignOutButton | Interaction | New | Session action |

---

## Page Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ GlobalNav                                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Profile Header                               │    │
│  │ ┌─────────────────────────────────────────┐ │    │
│  │ │ Sarah Mitchell                          │ │    │
│  │ │ sarah.mitchell@email.com                │ │    │
│  │ │ Member since January 2025               │ │    │
│  │ │                           [Edit profile] │ │    │
│  │ └─────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Your Commitments                             │    │
│  │ ┌─────────────────────────────────────────┐ │    │
│  │ │ Kakadu Wetlands Expedition              │ │    │
│  │ │ Mar 15-18, 2026 · Outback Birding Co    │ │    │
│  │ │ ┌──────────────────┐                    │ │    │
│  │ │ │ ● Confirmed      │                    │ │    │
│  │ │ └──────────────────┘                    │ │    │
│  │ │ Confirmed with 8 participants           │ │    │
│  │ └─────────────────────────────────────────┘ │    │
│  │ ┌─────────────────────────────────────────┐ │    │
│  │ │ Tasmania Raptor Circuit                 │ │    │
│  │ │ Apr 22-25, 2026 · Wings & Wilderness    │ │    │
│  │ │ ┌──────────────────┐                    │ │    │
│  │ │ │ ○ Gathering      │                    │ │    │
│  │ │ └──────────────────┘                    │ │    │
│  │ │ 4 of 6 participants                     │ │    │
│  │ │ Your card is not charged until tour     │ │    │
│  │ │ confirms.                               │ │    │
│  │ └─────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Past Tours                            [▼]   │    │
│  │ (collapsed by default)                       │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Account Settings                             │    │
│  │                                             │    │
│  │ Profile                                     │    │
│  │   Edit name, location, preferences →        │    │
│  │                                             │    │
│  │ Email & Password                            │    │
│  │   Update your sign-in credentials →         │    │
│  │                                             │    │
│  │ Notifications                               │    │
│  │   Manage email preferences →                │    │
│  │                                             │    │
│  │ ─────────────────────────────────────────── │    │
│  │                                             │    │
│  │ [Sign out]                                  │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Desktop:** Max-width container (800px), centered, generous vertical spacing
**Mobile:** Full-width with padding, stacked sections

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Clear sections, no template grid patterns |
| KL-LAYOUT-004 | PASS | Left-aligned content within sections |
| KL-COMP-001 | PASS | No lift+shadow hover on cards |
| KL-COMP-002 | PASS | No 4-icon feature row |
| KL-COMP-005 | PASS | No carousel |
| KL-CONTENT-001 | PASS | No LLM words (unlock, journey, etc.) |
| KL-CONTENT-004 | PASS | Specific labels, factual status |
| KL-CONTENT-006 | PASS | Clear action labels |
| KL-IMAGE-001 | PASS | No Undraw illustrations |
| KL-TRUST-002 | N/A | No testimonials on profile |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Profile Header | Layout/Copy | < 15 |
| Active Commitments | Card/Status | < 18 |
| Past Tours | Layout/Copy | < 15 |
| Account Settings | Layout/Copy | < 15 |

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Heading hierarchy | h1 for page, h2 for sections, h3 for cards |
| Status indication | Color + text label (not color alone) |
| Collapsible sections | `aria-expanded`, `aria-controls` |
| Focus management | Logical tab order through sections |
| Link purpose | Clear link text ("Edit profile", not "Click here") |
| Touch targets | Minimum 44px on all interactive elements |

### WCAG 2.1 AA Targets

| Criterion | Requirement |
|-----------|-------------|
| 1.3.1 Info and Relationships | Section structure programmatically determinable |
| 1.4.3 Contrast | 4.5:1 for text, 3:1 for UI components |
| 2.1.1 Keyboard | All functions available via keyboard |
| 2.4.3 Focus Order | Logical top-to-bottom, section-to-section |
| 2.4.6 Headings and Labels | Descriptive section headings |

---

## Responsive Behavior

| Viewport | Layout | Container Width |
|----------|--------|-----------------|
| Desktop (1024px+) | Centered container | 800px max |
| Tablet (768-1023px) | Centered container | 700px max |
| Mobile (<768px) | Full-width | 100% - 32px padding |

### Mobile-Specific Adjustments
- Commitment cards stack vertically
- Settings categories full-width
- Touch-friendly toggle controls
- Increased tap target spacing

---

## Navigation & Routing

### Routes

| Route | Purpose |
|-------|---------|
| `/profile` | User profile dashboard |
| `/profile/settings` | Account settings (optional sub-route) |
| `/profile/notifications` | Notification preferences (optional) |

### Protected Route

- `/profile` requires authentication
- Unauthenticated users redirect to `/login` with return URL
- After login, redirect back to profile

### Cross-Page Links

| From Profile | Target | Purpose |
|--------------|--------|---------|
| Commitment card | `/tours/[id]` | View tour details |
| Operator name | `/operators/[id]` | View operator profile |
| "Browse tours" | `/tours` | Discover tours |
| Sign out | `/` | Return to home |

---

## Content Tone Guidelines

| Do | Don't |
|----|-------|
| "Your Commitments" | "Your Journey" |
| "4 of 6 participants" | "67% full!" |
| "Tour confirmed" | "You're in!" |
| "Did not confirm" | "Tour failed" |
| "Member since January 2025" | "1 year badge earned!" |
| "Past Tours" | "Your Adventures" |
| "Sign out" | "Leave" |

### Institutional Tone

| Appropriate | Avoid |
|-------------|-------|
| Factual status descriptions | Celebratory language |
| Clear next-step guidance | Motivational messaging |
| Straightforward labels | Playful or casual tone |

---

## Example Content (For Implementation Reference)

### Profile Header:
```
Sarah Mitchell
sarah.mitchell@email.com
Member since January 2025
                                    [Edit profile]
```

### Commitment Card (Confirmed):
```
Kakadu Wetlands Expedition
Mar 15-18, 2026 · Outback Birding Co · Northern Territory
● Confirmed
Confirmed with 8 participants

View tour details →
```

### Commitment Card (Progressing):
```
Tasmania Raptor Circuit
Apr 22-25, 2026 · Wings & Wilderness · Tasmania
○ Gathering participants
4 of 6 participants

Your card is not charged until tour confirms.

View tour details →
```

### Empty State:
```
No active commitments

When you commit to tours, they'll appear here.
Your commitments show tour status and confirmation progress.

Browse tours →
```

---

## GATE-FLOW-PHASE2-AUTH-SHELL Compliance

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Auth pages exist as UI shells | PASS | Profile uses placeholder data |
| Clear explanation of why account is needed | PASS | Profile shows commitment value |
| No backend logic implemented | PASS | All data is example/placeholder |
| No forced auth without explanation | PASS | Login redirect explains context |
| No gamification or progression | PASS | No levels, badges, or achievements |

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| ProfilePage | `src/app/profile/page.tsx` | Page container |
| ProfileHeader | `src/components/profile/ProfileHeader.tsx` | Identity section |
| CommitmentsSection | `src/components/profile/CommitmentsSection.tsx` | Active commitments |
| CommitmentCard | `src/components/profile/CommitmentCard.tsx` | Individual commitment |
| PastToursSection | `src/components/profile/PastToursSection.tsx` | Collapsible archive |
| SettingsSection | `src/components/profile/SettingsSection.tsx` | Account settings |

## Components to Reuse

| Component | File | Usage |
|-----------|------|-------|
| ConfirmationStatusBadge | `src/components/ui/ConfirmationStatusBadge.tsx` | Status indicator |
| ThresholdProgressBar | `src/components/ui/ThresholdProgressBar.tsx` | Participant count |
| EmptyState | `src/components/ui/EmptyState.tsx` | No commitments state |
| PastTourItem | `src/components/ui/PastTourItem.tsx` | Past tour reference |

---

## Explicit Anti-Patterns (From UX Synthesis)

The following patterns are **automatic failures**:

- Levels, XP, streaks, or progress meters
- Leaderboards or public ranking
- One-click endorsements or peer "likes"
- Cartoon badges or playful iconography
- Social pressure cues ("others are ahead of you")
- Achievement celebrations for routine actions
- Species count or life list gamification
- "Complete your profile" progress bars

---

```
COMPLETED_ACTIONS:
  1. Defined page structure and section intent
  2. Specified component inventory with reuse strategy
  3. Mapped pain points to design decisions
  4. Verified Kill-List compliance
  5. Set TLS targets per section
  6. Applied user profile UX synthesis guidelines
  7. Ensured non-gamified, institutional treatment

NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. frontend-implementer to receive USER-PROFILE-UI-001 task after approval
```
