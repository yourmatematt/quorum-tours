# Operator Onboarding Architecture

**Status:** DEFERRED (Pre-launch: Manual onboarding via Calendly)
**Last Updated:** 2026-01-24

---

## Current Approach (Pre-Launch)

First operators will be manually onboarded via Calendly. This is intentional:
- Builds relationships with early adopters
- Gathers feedback on pain points
- Validates assumptions before building automation
- Target audience (50-70 year olds) appreciates personal touch

**CTA on /for-operators links to Calendly booking page.**

**Calendly URL Location (update before launch):**
- `src/components/for-operators/OperatorHero.tsx` - `CALENDLY_URL` constant
- `src/components/for-operators/OperatorCTA.tsx` - `CALENDLY_URL` constant

---

## Future Implementation (When Ready)

### Route
`/operator/onboarding`

### Flow
```
/for-operators → CTA "List Your First Tour"
    ↓
/signup?intent=operator → creates account
    ↓
/operator/onboarding → 6-step wizard
    ↓
/operator/onboarding/pending → verification status
    ↓
/operator → dashboard (can create tours)
```

### Step Structure (6 Steps + Review)

| Step | Content | Time | Required |
|------|---------|------|----------|
| 1. Identity | Name, business type, tax ID, location | 3 min | ✅ MVP |
| 2. Banking | Stripe Connect iframe | 5-7 min | ✅ MVP |
| 3. Documents | Photo ID, proof of address, business docs | 10-15 min | ✅ MVP |
| 4. Profile | Headline, bio, experience, specializations | 5-8 min | ✅ MVP |
| 5. Credentials | Insurance, certifications, eBird, affiliations | 10-15 min | Enhanced |
| 6. Photos | Profile photo, gallery (target 20+) | 10-15 min | Enhanced |
| 7. Review | Preview all, confirm, submit | 3-5 min | ✅ |

### Data to Collect

**Identity & Business (Step 1):**
- Full legal name
- Operating structure (Individual Guide / Registered Company)
- Business/company name
- Tax ID (EIN for businesses, SSN for sole proprietors)
- Primary location (city, state/province, country)

**Banking (Step 2):**
- Stripe Connect embedded onboarding
- Bank account verification
- Account holder name verification

**Documents (Step 3):**
- Government-issued photo ID
- Proof of address
- Business registration (if applicable)

**Profile (Step 4):**
- Expertise/Headline (50 char max)
- Bio (500 char max)
- Philosophy statement (optional, 200 char)
- Years of experience
- Specializations (tags)
- Languages spoken

**Credentials (Step 5):**
- Liability insurance certificate (STRONGLY RECOMMENDED)
- Guide certifications
- eBird profile URL
- Affiliations

**Capabilities (Step 6):**
- Equipment available
- Typical/maximum group size
- Private tour availability
- Accessibility accommodations
- Profile photo + gallery (target 20+ photos)

### Design Requirements (50-70 Year Old Operators)

- Save-and-resume every 30 seconds
- Phone number repeated throughout ("Stuck? Call us")
- Safety-first messaging ("Deposits only, we cannot withdraw")
- 18px+ fonts, AAA contrast, 44px touch targets
- Forgiving error handling
- Clear timeline expectations (24 hour verification)

### Pattern Match

Follow existing `CreateTourWizard` component architecture:
- Progress stepper with visual indicators
- Step validation before proceeding
- Field-level error handling
- State management with useState
- Accessible with ARIA attributes

### File Structure (When Built)

```
src/
├── app/operator/onboarding/
│   ├── page.tsx
│   └── pending/page.tsx
└── components/operator/onboarding/
    ├── OnboardingWizard.tsx
    ├── IdentityStep.tsx
    ├── BankingStep.tsx
    ├── DocumentsStep.tsx
    ├── ProfileStep.tsx
    ├── CredentialsStep.tsx
    ├── CapabilitiesStep.tsx
    ├── ReviewStep.tsx
    └── ProgressStepper.tsx
```

---

## Success Metrics (Future)

- 70%+ completion rate
- 80% verified within 24 hours
- <10% call support during onboarding
- 80% create first tour within 48 hours of approval
