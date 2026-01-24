# Quorum Tours Content Structure & SEO Architecture Audit

**Analysis Date:** January 24, 2026
**Scope:** Consumer-facing pages (9 pages)
**Status:** PLANNING/ANALYSIS ONLY — No changes made

---

## Executive Summary

Quorum Tours demonstrates **strong foundational structure** with clear intent-based organization, but **lacks explicit schema markup** and has **inconsistent semantic header hierarchy** across pages. The site follows good sectioning patterns for accessibility but needs optimization for:

1. **Schema markup implementation** (no JSON-LD detected)
2. **Header hierarchy consistency** (H1/H2/H3 variations)
3. **Internal linking strategy** (minimal contextual links between related content)
4. **Featured snippet positioning** (process and list-based content scattered)

### Current State
- ✓ Clean semantic sectioning
- ✓ Logical content flow (customer journey-based)
- ✓ Breadcrumb implementation on detail pages
- ✓ Clear CTAs and conversion pathways
- ✗ No detected JSON-LD schema
- ✗ Inconsistent H2/H3 usage across pages
- ✗ Minimal cross-page linking strategy
- ✗ No FAQ schema markup (FAQs present but unstructured)

---

## Page-by-Page Header Hierarchy Analysis

### 1. HOME PAGE (`/`)
**File:** `src/app/page.tsx`

**Current Structure:**
```
<main>
  ├── HeroSection (no explicit H1, badge + value prop only)
  ├── HowItWorksSection (H2: "How confirmation works.")
  ├── ComparisonSection (H2: detected in component)
  ├── TourStatesSection (H2 in component)
  ├── TrustSection
  │   ├── H2: "Built on trust, not persuasion."
  │   └── H3: "Featured operators" (uppercase label)
  └── PathwaysSection (CTAs)
```

**Issues:**
1. **Missing H1**: Hero has compelling value prop ("Tours that run when birders commit") but no H1 tag
2. **H1 Placement**: Should wrap the main headline in HeroSection
3. **Section Headers**: Using clamp font sizing but need explicit H2 tags
4. **H3 Hierarchy**: "Featured operators" uses H3 but is a subsection of H2 context

**Recommended Structure:**
```
H1: Tours that run when birders commit.

H2: How confirmation works.
├── Step 1: Express interest
├── Step 2: Commit conditionally
└── Step 3: Tour confirms

H2: Why Quorum is different.

H2: See how tours run.
├── (Visual tour states)

H2: Built on trust, not persuasion.
├── H3: Verified operators only
├── H3: No charge until confirmed
├── H3: Transparent conditions
└── H3: Featured operators
    ├── Featured operator 1
    └── Featured operator 2

H2: Start exploring tours.
```

---

### 2. TOURS INDEX (`/tours`)
**File:** `src/app/tours/page.tsx`

**Current Structure:**
```
<main>
  ├── header
  │   └── H1: "Find Your Next Tour"
  ├── Filtering & Sorting Controls (no H2, functional UI)
  ├── Tours Grid
  │   └── (TourCard components, no heading wrapper)
  └── Load More (no heading context)
```

**Issues:**
1. ✓ **H1 present and semantic** — Good
2. **Missing section headers**: Filter/sort UI lacks descriptive H2
3. **No logical subsections**: Cards lack thematic grouping
4. **Results context**: Aggregate stats shown but not under a heading

**Recommended Structure:**
```
H1: Find Your Next Tour
[Subheading: Compare tours by confirmation status, timing, and region]

H2: Filter and refine your search
└── [Filter UI components]

H2: Available tours
├── H3: Showing [X] tours
└── (Grid of TourCards)

H2: Tips for choosing a tour
├── H3: Confirmation status explained
├── H3: How to read the threshold progress
└── H3: What "forming" means
```

**Snippet Opportunity**: Table of confirmation statuses (Confirmed, Forming, Not Running) with definitions.

---

### 3. TOUR DETAIL (`/tours/[id]`)
**File:** `src/app/tours/[id]/page.tsx`

**Current Structure:**
```
<main>
  ├── Breadcrumb nav (no heading context)
  ├── H1: {tour.title}
  │   └── Operator link
  ├── Meta (date, duration, location — no heading wrapper)
  ├── Description (free text, no H2)
  ├── H3: "Your Guide" (operator preview)
  ├── LogisticsSection (component, likely H2 internally)
  ├── FAQAccordion
  │   └── FAQs (no heading wrapper visible)
  └── CommitmentCard (sticky, no heading)
```

**Issues:**
1. ✓ **H1 present** — Tour title as main heading (good)
2. **No H2 sections**: Content is logically grouped but lacks semantic headers
3. **FAQ not structured**: FAQAccordion likely lacks proper heading hierarchy
4. **Your Guide should be H2**, not H3 (it's a major section)
5. **Species section** likely lacks header structure

**Recommended Structure:**
```
H1: {Tour Title}
[Breadcrumb]
[Meta: Date, Duration, Location]

H2: About this tour
└── [Description paragraphs]

H2: What you'll see
├── H3: Primary species (expected to see)
├── H3: Secondary species (likely to see)
└── H3: Opportunistic species (possible)

H2: Your guide: {Operator Name}
└── [Guide credentials and expertise]

H2: Tour details
├── H3: Group size
├── H3: Physical requirements
├── H3: Schedule
├── H3: What's included
└── H3: Cancellation policy

H2: Frequently asked questions
├── H3: [Question 1]
├── H3: [Question 2]
└── H3: [Question 3]

[Right sidebar]
H3: Confirm your spot
└── [Commitment card with pricing]
```

**Schema Opportunity**: Event schema for tour + Person schema for operator.

---

### 4. HOW IT WORKS (`/how-it-works`)
**File:** `src/app/how-it-works/page.tsx`

**Current Structure:**
```
<main id="birders">
  ├── HowItWorksHero (component, H1 location unknown)
  ├── ProblemSection
  ├── MechanicSection
  │   └── H2: "For Birders: Your Journey"
  │       └── 5 StageCard components (likely H3)
  ├── FailureCaseSection
  ├── ConfirmationSection
  ├── BoundariesSection
  │   └── H2: "What Quorum Does Not Do"
  │       └── H3: Boundary items
  └── ClosingCTA
```

**Issues:**
1. **Inconsistent audience framing**: "For Birders" is only in Mechanic section — should frame entire page
2. **Missing H1**: Hero section likely missing explicit H1
3. **Problem section**: No visible heading structure
4. **Section interconnection**: Stages are numbered (1-5) but may not reflect in heading hierarchy
5. **Boundaries section**: Important clarifications but positioned as afterthought

**Recommended Structure:**
```
H1: How Quorum Works for Birders
[Hero explanation]

H2: The problem Quorum solves
├── H3: Uncertainty in tour booking
├── H3: Financial risk
└── H3: Lack of transparency

H2: Your journey: 5 clear steps
├── H3: Step 1: Browse and find a tour
├── H3: Step 2: Express interest (no charge)
├── H3: Step 3: Commit conditionally
├── H3: Step 4: Tour confirms when threshold met
└── H3: Step 5: You go birding

H2: What happens if the tour doesn't run?
└── [Explanation + guarantee]

H2: What confirmed means
├── H3: Certainty
├── H3: No last-minute cancellations
└── H3: What you're committing to

H2: What Quorum does NOT do
├── H3: We don't charge speculatively
├── H3: We don't pressure you to commit early
├── H3: We don't hide thresholds
└── H3: We don't handle operator payments

H2: Start exploring tours
└── [CTA]
```

**Snippet Opportunity**: Steps (1-5) as featured snippet via ordered list.

---

### 5. OPERATORS INDEX (`/operators`)
**File:** `src/app/operators/page.tsx`

**Current Structure:**
```
<main>
  ├── header
  │   └── H1: "Verified Guides"
  │       └── Description
  ├── Filtering & Sorting Controls (no H2)
  ├── Operators Grid
  │   └── (OperatorCard components)
  └── Empty state handling
```

**Issues:**
1. ✓ **H1 present** — "Verified Guides" (good)
2. **Missing H2 for filter section**: UX feature lacks semantic structure
3. **No grid heading**: "Available operators" or similar missing
4. **Grid lacks subsectioning**: 6 operators shown but no thematic grouping

**Recommended Structure:**
```
H1: Verified Guides
[Subheading: Every operator on Quorum is verified for credentials, experience, and professionalism]

H2: Filter and compare operators
└── [Filter UI: Region, Specialization, Sort]

H2: Featured operators ({N} total)
├── H3: Operators in {Region}
└── [OperatorCard grid]

H2: How operators are verified
├── H3: Credentials review
├── H3: Experience assessment
└── H3: Community feedback

H2: Start planning with a guide
└── [CTA]
```

---

### 6. OPERATOR PROFILE (`/operators/[id]`)
**File:** `src/app/operators/[id]/page.tsx`

**Current Structure:**
```
<main>
  ├── Breadcrumb
  ├── OperatorHero (component, H1 location unclear)
  ├── AuthoritySection
  │   └── H2: "Authority Signals" (inferred)
  │       ├── H3: Specializations
  │       ├── H3: Credentials
  │       └── H3: Affiliations
  ├── H2: "About"
  │   └── Bio paragraphs + philosophy quote
  ├── H2: "Reviews"
  │   ├── RatingDistribution
  │   └── ReviewCard components
  ├── CapabilitiesSection
  │   └── H2 (likely)
  │       ├── H3: Equipment
  │       ├── H3: Capacity
  │       ├── H3: Accessibility
  │       └── H3: Languages
  ├── H2: "Tours"
  │   ├── TrackRecordSummary
  │   ├── H3: "Active Tours"
  │   └── H3: "Past Tours"
  └── [Tour cards or past tour list]
```

**Issues:**
1. **H1 location unclear**: Likely in OperatorHero but not explicit in code review
2. **"Authority Signals" is awkward**: Should be "Expertise and Credentials"
3. **Subsection balance**: Some sections have clear H3s, others missing
4. **Review section**: Rating distribution + individual reviews lack clear structure
5. **Track Record**: Summary section lacks heading context

**Recommended Structure:**
```
H1: {Operator Name}
[Breadcrumb]
[Verified badge + expertise + location + years]

H2: Expertise and credentials
├── H3: Specializations
├── H3: Certifications
└── H3: Affiliations

H2: About {Operator Name}
└── [Bio paragraphs]

H2: Guest reviews
├── H3: Overall rating ({X} reviews)
├── H3: Rating distribution
└── H3: Individual guest reviews
    ├── [Review 1]
    ├── [Review 2]
    └── [Review 3+]

H2: Tour capabilities
├── H3: Equipment provided
├── H3: Group size and capacity
├── H3: Accessibility options
└── H3: Languages spoken

H2: Tours
├── H3: Track record
├── H3: Active tours
└── H3: Past tours
    ├── [Completed tour]
    ├── [Completed tour]
    └── [Cancelled tour]
```

**Schema Opportunity**: Person schema + AggregateRating schema.

---

### 7. FOR OPERATORS (`/for-operators`)
**File:** `src/app/for-operators/page.tsx`

**Current Structure:**
```
<main>
  ├── OperatorHero (H1 location unclear)
  ├── ProblemStatement
  │   └── H2: Problem-focused
  ├── HowItWorks
  │   └── H2: Process steps
  ├── TrustTransparency
  │   └── H2: Pricing and flow
  ├── SocialProof
  │   └── H2: Testimonials
  ├── FAQSection
  │   └── H2: FAQ with accordion
  └── OperatorCTA
      └── H2: Final CTA
```

**Issues:**
1. **H1 missing or unclear**: Hero component doesn't have visible H1
2. **Audience clarity**: Page targets "For Tour Operators" but not explicitly stated as H1
3. **FAQ structure**: FAQs present but not marked up as schema
4. **Parallel structure to home page**: May confuse cross-audience expectations

**Recommended Structure:**
```
H1: Stop gambling on tour viability
[Hero section for tour operators]

H2: The operator's dilemma
├── H3: Financial uncertainty
├── H3: Cancellation risk
└── H3: Variable demand

H2: How Quorum solves this
├── H3: List with minimum thresholds
├── H3: No upfront risk
├── H3: Only 6% commission on successful bookings

H2: Pricing and money flow
├── H3: How much does Quorum cost?
├── H3: When do I get paid?
└── H3: What if a tour doesn't run?

H2: Operators using Quorum
├── [Testimonial 1]
├── [Testimonial 2]
└── [Testimonial 3]

H2: Frequently asked questions
├── H3: Can I set my own thresholds?
├── H3: What if I cancel a tour?
├── H3: How is payment handled?
└── [Additional FAQs]

H2: Ready to list your first tour?
└── [CTA]
```

---

### 8. LOGIN (`/login`)
**File:** `src/app/login/page.tsx`

**Current Structure:**
```
<main>
  ├── H1: "Welcome back"
  ├── Description paragraph
  ├── AuthCard
  │   └── LoginForm (visual UI shell)
  └── Sign-up link
```

**Status:** ✓ Minimal but correct. Authentication pages typically have minimal structure.

**Suggested Enhancement:**
```
H1: Welcome back

H2: Sign in to your account
└── [Login form]

H2: Troubleshooting
├── H3: Forgot your password?
└── H3: Don't have an account yet?
```

---

### 9. SIGNUP (`/signup`)
**File:** `src/app/signup/page.tsx`

**Current Structure:**
```
<main>
  ├── H1: "Join Quorum"
  ├── Description paragraph
  ├── AuthCard
  │   └── SignupForm (visual UI shell)
  └── Sign-in link
```

**Status:** ✓ Minimal but correct.

**Suggested Enhancement:**
```
H1: Join Quorum

H2: Create your account
└── [Signup form]

H2: What you'll get
├── H3: Track your tour commitments
├── H3: Get notified when tours confirm
└── H3: Manage your bookings in one place

H2: Already have an account?
└── [Sign-in link]
```

---

## Schema Markup Opportunities

### 1. HIGH PRIORITY: Homepage

**Schema Types to Implement:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Quorum Tours",
  "description": "Threshold-based birding tour booking platform",
  "url": "https://quorumtours.com",
  "logo": "https://quorumtours.com/logo.png",
  "sameAs": [
    "https://twitter.com/quorumtours",
    "https://facebook.com/quorumtours"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "ratingCount": "347"
  }
}
```

### 2. HIGH PRIORITY: Tour Detail Pages (`/tours/[id]`)

**Schema Types:**

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "{Tour Title}",
  "description": "{Tour description}",
  "startDate": "{Date in ISO format}",
  "endDate": "{Date in ISO format}",
  "eventAttendanceMode": "OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "{Location name}",
    "address": "{Full address}"
  },
  "organizer": {
    "@type": "Person",
    "name": "{Operator name}",
    "url": "https://quorumtours.com/operators/{operatorId}"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://quorumtours.com/tours/{tourId}",
    "price": "{price}",
    "priceCurrency": "AUD",
    "availability": "https://schema.org/PreOrder",
    "validFrom": "{Today's date}"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{Operator rating}",
    "ratingCount": "{Review count}"
  }
}
```

### 3. HIGH PRIORITY: Operator Profile (`/operators/[id]`)

**Schema Types:**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{Operator name}",
  "jobTitle": "Tour Guide / Birding Specialist",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "{City}",
    "addressRegion": "{State}",
    "addressCountry": "AU"
  },
  "knowsAbout": [
    "Birding",
    "Wildlife tours",
    "{Specialization 1}",
    "{Specialization 2}"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{Average rating}",
    "ratingCount": "{Review count}"
  },
  "credentials": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "{Certification}",
      "issuedBy": {
        "@type": "Organization",
        "name": "{Issuing organization}"
      },
      "dateCreated": "{Year}"
    }
  ]
}
```

### 4. MEDIUM PRIORITY: How It Works (`/how-it-works`)

**Schema Types:** HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Quorum Tours Works for Birders",
  "step": [
    {
      "@type": "HowToStep",
      "position": "1",
      "name": "Browse and find a tour",
      "text": "Explore curated tours led by verified guides. Each displays threshold, spots, and interest."
    },
    {
      "@type": "HowToStep",
      "position": "2",
      "name": "Express interest (no charge)",
      "text": "Signal you want the tour. Your interest joins the aggregate count visible to everyone."
    },
    {
      "@type": "HowToStep",
      "position": "3",
      "name": "Commit conditionally",
      "text": "Agree to join if threshold is met. Payment not charged until confirmation."
    },
    {
      "@type": "HowToStep",
      "position": "4",
      "name": "Tour confirms when threshold met",
      "text": "Threshold reached. Tour guaranteed to run. All conditional commits are charged."
    },
    {
      "@type": "HowToStep",
      "position": "5",
      "name": "You go birding",
      "text": "Join confirmed tour with guide and fellow birders. Tour runs as scheduled."
    }
  ]
}
```

### 5. MEDIUM PRIORITY: Operators Index (`/operators`)

**Schema Types:** ItemList + LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Verified Guides - Quorum Tours",
  "description": "Browse verified tour operators",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "LocalBusiness",
          "name": "{Operator name}",
          "description": "{Expertise}",
          "url": "https://quorumtours.com/operators/{id}"
        }
      }
      // ... repeated for each operator
    ]
  }
}
```

### 6. MEDIUM PRIORITY: FAQ Pages (Home, For Operators)

**Schema Types:** FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What happens if I need to cancel after the tour confirms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can cancel up to 7 days before for a full refund. Within 7 days may result in partial refund or credit."
      }
    },
    {
      "@type": "Question",
      "name": "What equipment should I bring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bring your own binoculars if available. Wear comfortable walking shoes and layers. Sun protection recommended."
      }
    }
    // ... additional FAQs
  ]
}
```

### 7. BREADCRUMB NAVIGATION

**Present on detail pages** — add schema to make explicit:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://quorumtours.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tours",
      "item": "https://quorumtours.com/tours"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{Tour title}",
      "item": "https://quorumtours.com/tours/{id}"
    }
  ]
}
```

---

## Internal Linking Strategy

### Current State
- ✓ **Navigation**: Global nav provides main pathways
- ✓ **Cross-tour linking**: Tour detail → Operator profile (good)
- ✓ **CTAs**: Clear next-step links (Browse Tours, How It Works)
- ✗ **Contextual linking**: Minimal related-content connections
- ✗ **Content clustering**: No thematic link patterns

### Recommended Linking Architecture

**Tier 1: Primary pathways** (already implemented)
```
Home → Tours Index
Home → Operators Index
Home → How It Works
Home → For Operators

Tours Index → Tour Detail
Tour Detail → Operator Profile
Operators Index → Operator Profile
```

**Tier 2: Contextual cross-linking** (MISSING)
```
Tour Detail:
  - "See other tours from this operator" → [Operator's active tours]
  - "What is confirmation?" → /how-it-works#confirmation
  - "Need help with payment?" → /how-it-works#payment
  - "Browse other tours in this region" → /tours?region={region}

Operator Profile:
  - "See all tours in {region}" → /tours?region={region}&sort=region
  - "Learn how Quorum works" → /how-it-works
  - "Browse similar operators" → /operators?spec={specialization}

How It Works:
  - "Ready to book?" → /tours
  - "For operators" → /for-operators
  - "See a specific tour" → /tours/1 (featured example)

Tours Index:
  - "How does Quorum work?" → /how-it-works
  - "Meet our guides" → /operators
```

**Tier 3: Topic cluster links** (NEW)
```
Create landing pages for topic clusters:
- /guides/birding-for-beginners (links: operators, tours, how-it-works)
- /guides/shorebird-watching (links: specialist operators, relevant tours)
- /guides/region-guides (per region: local operators, local tours)
```

---

## Featured Snippet Opportunities

### 1. Ordered List (Steps)

**How It Works:** 5-step process
```
How Quorum Works (5 Steps):
1. Browse and find a tour
2. Express interest (no charge)
3. Commit conditionally
4. Tour confirms when threshold met
5. You go birding
```
**Target Position:** /how-it-works
**Snippet Type:** Ordered List
**Opportunity:** High (educational, procedural content)

### 2. Table

**Confirmation Statuses**
```
Tour Status | Meaning | Your Obligation
Confirmed  | Meets threshold | Commit payment charged
Forming    | Building interest | No charge yet
Not Running| Below threshold | Tour won't run
```
**Target Position:** /tours (filter help section)
**Opportunity:** Medium (definitional, currently missing)

### 3. Definition / Single Answer

**Q: What happens if a tour doesn't run?**
A: If a tour doesn't reach its threshold by the commitment deadline, it will not run. Your conditional commitment expires, and you are not charged. No payment, no obligation.

**Target Position:** /how-it-works#failure-case, /tours (info box)
**Opportunity:** Medium

### 4. List (Unordered)

**What Quorum Does Not Do**
- We don't charge speculatively
- We don't pressure you to commit early
- We don't hide thresholds
- We don't handle operator payments

**Target Position:** /how-it-works#boundaries
**Opportunity:** High (currently well-positioned)

### 5. Key Facts Box

**Operator Trust Signals**
```
✓ Verified credentials
✓ Years of experience
✓ Guest reviews and ratings
✓ Equipment provided
✓ Accessibility options
```
**Target Position:** /operators (index header)
**Opportunity:** High (helps users understand verification)

---

## Content Silo / Topic Cluster Map

### Current Silos (Implicit)

```
BIRDER EXPERIENCE
├── Home (value prop for birders)
├── /tours (discovery & comparison)
├── /tours/[id] (detailed decision-making)
├── /operators (guide discovery)
├── /operators/[id] (guide evaluation)
├── /how-it-works (process understanding)
└── /login & /signup (account management)

OPERATOR EXPERIENCE
├── /for-operators (value prop for operators)
└── [Operator dashboard - in /operator/* - EXCLUDED from this audit]
```

### Recommended Siloing Improvements

**Create explicit topic clusters:**

```
SILO 1: GETTING STARTED
├── /how-it-works (core mechanic)
├── /tours (discovery)
├── /tours/[id] (evaluation)
└── Internal link pattern: "First time?" → /how-it-works

SILO 2: GUIDE EVALUATION
├── /operators (discovery)
├── /operators/[id] (detailed profile)
├── /tours?operator={id} (their specific tours)
└── Internal link pattern: Operator mentions → profile link

SILO 3: REGIONAL GUIDES
├── /tours?region={region}
├── /operators?region={region}
├── /guides/{region} (NEW - landing page)
└── Cluster links: All region-specific content interconnected

SILO 4: BIRD TYPE SPECIALTY
├── /tours?specialty={shorebirds|rainforest|etc}
├── /operators?specialty={...}
├── /guides/{bird-type} (NEW - landing page)
└── Example: "Shorebird tours" → list operators + tours
```

---

## Accessibility & Landmark Improvements

### Current Strengths
- ✓ Semantic `<main>` usage
- ✓ Breadcrumb nav as `<nav aria-label="Breadcrumb">`
- ✓ Section landmarks present
- ✓ ErrorBoundary wrappers

### Gaps

1. **Missing `<section role="region">` labels**
   - Currently: `<section>` with no aria-label
   - Fix: Add descriptive aria-label for each major section

2. **Filter controls lack semantic structure**
   - Currently: Flex div with FilterDropdown components
   - Fix: Wrap in `<section aria-label="Filter and sort options">` + `<fieldset>`

3. **Card grids lack heading context**
   - Currently: Grid with no heading wrapper
   - Fix: Add H2 "Featured tours" or "Available tours" above grid

### Recommended Pattern

```jsx
<section aria-label="Tour listings">
  <h2>Featured tours</h2>
  <div className="grid">
    {/* Cards */}
  </div>
</section>
```

---

## SEO Performance Summary

### Strengths
1. **Clear H1 presence** on most pages (home missing, others good)
2. **Logical content flow** following user journey
3. **Breadcrumbs** on detail pages (Tour, Operator)
4. **Internal linking** for primary pathways (Home → Tours, Operators)
5. **Mobile-responsive** design and structure
6. **Metadata** in place (title, description in next.js Metadata)

### Critical Gaps
1. **Zero schema markup** (no JSON-LD detected)
2. **No FAQ schema** despite FAQs being present
3. **H1 missing on home page**
4. **Inconsistent H2/H3 hierarchy** across pages
5. **No contextual internal linking** (related content not linked)
6. **No topic cluster/silo landing pages**

### Opportunity by Page

| Page | Silo Potential | Schema Priority | Linking Needed |
|------|---|---|---|
| Home | 🟢 High (hub) | 🔴 High (Org) | Cluster bridges |
| Tours Index | 🟢 High | 🟡 Medium (ItemList) | Regional/specialty filters |
| Tour Detail | 🟢 High | 🔴 High (Event) | Related tours, region |
| How It Works | 🟢 High (pillar) | 🔴 High (HowTo) | Steps as anchors |
| Operators | 🟡 Medium | 🟡 Medium (LocalBusiness) | Specialty/region |
| Operator | 🟡 Medium | 🔴 High (Person + AggRating) | Similar operators |
| For Operators | 🟢 High (mirror) | 🟡 Medium (FAQ) | Operator benefits |
| Login | 🔘 Low | 🟢 None | Auth flow only |
| Signup | 🔘 Low | 🟢 None | Auth flow only |

---

## Implementation Checklist (Ordered by Impact)

### Phase 1: Critical (Schema + Headers)

- [ ] Add H1 to home page HeroSection
- [ ] Implement Organization schema on home page
- [ ] Implement Event schema on tour detail pages
- [ ] Implement Person + AggregateRating schema on operator profiles
- [ ] Implement HowTo schema on /how-it-works
- [ ] Add FAQ schema to any page with FAQ sections
- [ ] Add BreadcrumbList schema to detail pages

### Phase 2: Structure (Header Hierarchy)

- [ ] Audit all components for H2/H3 consistency
- [ ] Add missing H2 headers to Tours Index (Filter section, Grid section)
- [ ] Add missing H2 headers to Tour Detail (About, Species, FAQ sections)
- [ ] Review For Operators page for H1 clarity
- [ ] Standardize component heading hierarchy across similar pages

### Phase 3: Internal Linking

- [ ] Add "See other tours from this operator" link on Tour Detail
- [ ] Add "Browse tours in this region" filter link on Tour Detail
- [ ] Add "Similar operators" section on Operator Profile
- [ ] Add "How it works" contextual link to Tours Index
- [ ] Link from How It Works section headings to specific sections via anchor links

### Phase 4: Content Clusters

- [ ] Create /guides landing page or section
- [ ] Create regional guide pages (/guides/victoria, /guides/queensland, etc.)
- [ ] Create specialty guide pages (/guides/shorebirds, /guides/rainforest, etc.)
- [ ] Interconnect cluster pages with internal links
- [ ] Add schema markup to cluster landing pages

### Phase 5: Featured Snippet Optimization

- [ ] Format 5-step process as ordered list with explicit `<ol>` + `<li>`
- [ ] Create "Confirmation Statuses" table on Tours Index
- [ ] Add "What Quorum Does Not Do" list in visible, scannable format
- [ ] Add "Operator Trust Signals" key facts box on Operators Index

---

## Technical Implementation Notes

### JSON-LD Placement

For Next.js with app router, use `next/head` or `Metadata` API:

```typescript
// In page.tsx or layout.tsx
export const metadata: Metadata = {
  // ... standard metadata
  // Add structured data via script in layout
};

// In separate component:
export function SchemaScript({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Header Consistency Pattern

```typescript
// Recommended pattern for consistent hierarchy
export function PageSection({ level = 2, title, children }) {
  const Tag = `h${level}` as const;
  return (
    <section aria-label={title}>
      <Tag className="font-display text-[clamp(1.5rem,4vw,2rem)]">
        {title}
      </Tag>
      {children}
    </section>
  );
}
```

### Anchor Links for Featured Snippets

```typescript
// Enable jump links for step-based content
<ol>
  <li id="step-1">
    <strong>Browse and find a tour</strong>
    <p>Explore curated tours...</p>
  </li>
  <li id="step-2">
    <strong>Express interest</strong>
    <p>Signal you want the tour...</p>
  </li>
  {/* etc */}
</ol>
```

---

## Measurement & KPIs

### Current Baselines
- No baseline data provided (pre-implementation)

### Targets to Track
1. **Organic impressions** for branded queries
2. **Click-through rate** from featured snippets (if achieved)
3. **Keyword rankings** for primary pages (Tours Index, How It Works)
4. **Backlink growth** (operator profiles should attract local links)
5. **Bounce rate** by page section (are users finding related content?)
6. **Internal click-through rate** (contextual links → related content)

### Recommended Tools
- Google Search Console (impressions, CTR, ranking positions)
- Google Analytics 4 (content flow, internal linking effectiveness)
- Ahrefs/SEMrush (backlink tracking, keyword analysis)
- Schema.org validator (structured data testing)

---

## Conclusion

Quorum Tours has a **solid structural foundation** with clear user journeys and good accessibility patterns. However, the site is **missing critical SEO infrastructure** in schema markup, header consistency, and internal linking strategy.

**Priority Actions:**
1. Implement schema markup (Organization, Event, Person, HowTo, FAQ)
2. Fix header hierarchy (add H1 to home, standardize H2/H3)
3. Add contextual internal linking between related content
4. Create topic cluster landing pages for regions and specialties
5. Optimize content for featured snippets (lists, tables, steps)

**Expected Impact:**
- Improved click-through rate from search results (rich snippets)
- Better ranking for long-tail keywords (topic clusters)
- Reduced bounce rate (contextual linking)
- Enhanced trust signals for birders and operators (schema markup)
- Higher engagement on detail pages (featured snippet visibility)

---

**End of Structural Audit**
*Analysis complete. Ready for implementation planning.*
