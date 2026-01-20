# OPERATOR-PROFILE-IA-001 — Operator Profile Page Information Architecture

```
STATUS: READY_FOR_REVIEW
TASK_ID: OPERATOR-PROFILE-IA-001
TASK: Define Information Architecture, section intent, and component inventory for Operator Profile page
ASSIGNED_AGENT: web-design-lead
REPORTS_TO: orchestrator
INPUTS_USED:
  - docs/wireframes.md
  - docs/claude-output/TOUR-DETAIL-IA-001.md
  - docs/claude-output/TOURS-IA-001.md
  - claude/protocols/protocols.md
  - claude/protocols/messaging.md
  - claude/protocols/tls-component-rubrics.md
  - claude/protocols/kill-list-base.json
  - src/components/OperatorPreviewCard.tsx (existing component)
GATES_REQUIRED:
  - GATE-MSG-STRICT
  - GATE-KILL-LIST
  - GATE-TLS
  - GATE-FLOW-PHASE1-DISCOVERY
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

## Operator Profile Page — Detailed IA Specification

### Primary Job

Act as a credibility dossier, not a marketing page. Users arrive from Tour Detail pages to audit an operator's legitimacy before committing to a tour. Every element must establish trust through evidence and transparency, not persuasion.

### User Entry Points

1. Tour Detail: Click on operator name or "View full profile" link
2. Tours Index: Filter by operator, then click
3. Direct link: Shared URL
4. Search engine: Indexed operator profile

### Page Structure Philosophy

This is a **credibility audit surface**. Users arrive with interest but need:
- Verification that this is a real, legitimate operator
- Evidence of expertise and experience
- Honest feedback from past participants
- Visibility into their tour track record

The page answers: "Can I trust this person to lead my tour?"

---

## Section 1: Identity & Legitimacy (Above the Fold)

**Target TLS:** < 18 (trust-first, authority-establishing)

**Intent:**
- Real human identity is THE dominant element
- Verification status visible immediately
- Scope of expertise clear at a glance
- User knows who they're dealing with

**Structure:**
- Large operator photo (real, professional)
- Full name as H1
- Verification badge (if verified)
- Primary expertise/specialization
- Location/region served
- Years of experience

**Content Requirements:**
- Photo must be real, not avatar or stock
- Name is human name (or registered business)
- Expertise stated factually, not aspirationally
- Verification is binary (verified or not shown)

**Anti-Template Requirements:**
- NO "Award-winning" or "Top-rated" claims
- NO star ratings in header
- NO testimonial snippets above fold
- Factual identity, not marketing positioning

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| OperatorHero | Full-width identity section |
| OperatorPhoto | Large format, real photo |
| OperatorName | H1, display font |
| VerificationBadge | Binary verified indicator |
| ExpertiseLine | Primary specialization |
| LocationIndicator | Region/areas served |
| ExperienceMarker | Years active |

---

## Section 2: Authority Signals

**Target TLS:** < 15 (proof-dense, factual)

**Intent:**
- Experience markers that can be verified
- Contextual credibility (not generic claims)
- Evidence over assertions

**Structure:**
- Experience summary with specifics
- Areas of specialization (list)
- Credentials or certifications (if applicable)
- Notable achievements (factual, dated)
- Organizations or affiliations

**Content Requirements:**
- Numbers and dates, not vague claims
- Specializations are specific habitats/species/regions
- Credentials are verifiable
- No superlatives or comparative claims

**Example Authority Signals:**
| Signal Type | Good | Bad |
|-------------|------|-----|
| Experience | "Guiding since 2012" | "Years of experience" |
| Specialization | "Shorebird identification, Queensland coast" | "Bird expert" |
| Credential | "BirdLife Australia guide certification" | "Certified professional" |
| Achievement | "Documented 847 species in QLD, 2019-2024" | "Extensive species list" |

**Anti-Template Requirements:**
- NO "Best in class" or "Industry leader"
- NO unverifiable claims
- NO badges without meaning
- Specifics only

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| AuthoritySection | Container for credentials |
| ExperienceTimeline | When they started, milestones |
| SpecializationList | Specific areas of expertise |
| CredentialItem | Verifiable certification |
| AffiliationList | Organizations, memberships |

---

## Section 3: Narrative (Minimal, Informational)

**Target TLS:** < 18 (humanizing, not selling)

**Intent:**
- Method or philosophy (how they operate)
- Domain-specific background
- Humanizing detail AFTER authority established

**Structure:**
- Brief bio (2-3 paragraphs max)
- Guiding philosophy or approach
- Background relevant to expertise
- Personal connection to birding (brief)

**Content Requirements:**
- First-person or third-person consistently
- Focus on approach, not achievements
- Relevant background only
- No marketing copy or persuasion

**Appropriate Narrative Content:**
- How they approach tour design
- Why they focus on specific species/regions
- Background that explains expertise
- Guiding style (pace, group dynamics)

**Anti-Template Requirements:**
- NO "passionate about birding" generic claims
- NO childhood origin stories (unless brief)
- NO aspirational statements
- Informational, not inspirational

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| NarrativeSection | Bio container |
| BioText | 2-3 paragraph narrative |
| PhilosophyBlock | How they approach guiding |

---

## Section 4: Reviews & Feedback

**Target TLS:** < 18 (trust section, transparent)

**Intent:**
- Distribution visible (not cherry-picked)
- Dates and context included
- No filtering or hiding negative feedback

**Structure:**
- Overall rating distribution (histogram, not just average)
- Total review count
- Individual reviews with:
  - Reviewer name (or anonymized)
  - Tour attended (linked)
  - Date of tour
  - Full text (not truncated)
  - Response from operator (if any)

**Rating Framework:**
| Element | Implementation |
|---------|----------------|
| Distribution | Histogram showing 1-5 star breakdown |
| Average | Shown but not dominant |
| Count | "Based on X reviews" |
| Sorting | Most recent first (default) |
| Filtering | By tour, by rating (optional) |

**Review Display Requirements:**
- Full text visible (expandable if long)
- Date of review AND date of tour
- Tour name linked to tour (if active)
- No editing or filtering by operator
- Operator responses clearly marked

**Anti-Template Requirements:**
- NO "5-star average" hero display
- NO cherry-picked "featured" reviews
- NO hiding low ratings
- Distribution is honest and visible

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ReviewsSection | Container with header |
| RatingDistribution | Histogram of ratings |
| ReviewSummary | Count and average |
| ReviewCard | Individual review display |
| ReviewerInfo | Name, tour, date |
| ReviewText | Full review content |
| OperatorResponse | Reply from operator |
| ReviewFilters | Sort/filter controls |

---

## Section 5: Assets & Capabilities

**Target TLS:** < 15 (visual proof, factual)

**Intent:**
- Visual proof over claims
- Equipment and resources available
- Collapsible technical detail

**Structure:**
- Equipment available (vehicles, optics, etc.)
- Group capacity range
- Accessibility accommodations
- Languages spoken
- Communication style/responsiveness

**Content Categories:**

1. **Equipment & Resources**
   - Vehicles (type, capacity)
   - Optics available for sharing
   - Field guides provided
   - Safety equipment

2. **Capacity & Logistics**
   - Typical group sizes
   - Maximum capacity
   - Solo/private tour options

3. **Accessibility**
   - Physical accessibility accommodations
   - Dietary accommodations
   - Communication preferences

**Anti-Template Requirements:**
- NO stock photos of equipment
- NO "state-of-the-art" claims
- Factual inventory only
- Photos should be real equipment

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| CapabilitiesSection | Container |
| EquipmentList | What's provided |
| CapacityInfo | Group size range |
| AccessibilityInfo | Accommodations available |
| LanguageList | Languages spoken |

---

## Section 6: Active & Past Tours

**Target TLS:** < 20 (card section, consistent with Tours Index)

**Intent:**
- Show track record
- Confirmation outcomes visible
- Consistent with Tours Index structure

**Structure:**
- Active tours (currently forming or confirmed)
- Past tours (completed, with outcomes)
- Consistent TourCard format
- Confirmation state always visible

**Active Tours Display:**
- Same TourCard as Tours Index
- Status visible (forming/confirmed)
- Link to Tour Detail page

**Past Tours Display:**
- Condensed format
- Outcome visible (ran/didn't run)
- Date and participant count
- Optional: expand for details

**Track Record Summary:**
| Metric | Display |
|--------|---------|
| Tours run | "X tours completed" |
| Confirmation rate | "Y% of tours reached threshold" |
| Total participants | "Z birders guided" |

**Anti-Template Requirements:**
- NO hiding tours that didn't run
- NO selective display
- Full history available
- Honest track record

**Component Inventory:**
| Component | Purpose |
|-----------|---------|
| ToursSection | Container with tabs/sections |
| ActiveToursGrid | Currently available tours |
| TourCard | Reused from Tours Index |
| PastToursList | Historical tours |
| PastTourItem | Condensed tour record |
| TrackRecordSummary | Aggregate stats |

---

## Full Component Inventory (Operator Profile Page)

| Component | TLS Category | Key Differentiation |
|-----------|--------------|---------------------|
| OperatorHero | Trust | Large photo, identity focus |
| OperatorPhoto | Trust | Real photo, professional |
| OperatorName | Typography | H1, display font |
| VerificationBadge | Trust | Binary, restrained |
| ExpertiseLine | Copy | Specific specialization |
| AuthoritySection | Proof | Verifiable credentials |
| ExperienceTimeline | Proof | Dates and milestones |
| SpecializationList | DNA | Specific areas |
| CredentialItem | Proof | Verifiable certification |
| NarrativeSection | Copy | Brief, informational bio |
| ReviewsSection | Trust | Transparent feedback |
| RatingDistribution | Proof | Histogram, not just average |
| ReviewCard | Trust | Full context, dated |
| CapabilitiesSection | Layout | Equipment, logistics |
| ToursSection | Layout | Active and past tours |
| TourCard | Reused | Consistent with Tours Index |
| TrackRecordSummary | Proof | Aggregate outcomes |

---

## Kill-List Compliance

| Rule ID | Status | Specification |
|---------|--------|---------------|
| KL-LAYOUT-001 | PASS | Single column with card grid only in Tours section |
| KL-LAYOUT-004 | PASS | All text left-aligned |
| KL-COMP-001 | PASS | No lift+shadow hover on cards |
| KL-COMP-005 | PASS | No carousel for reviews |
| KL-CONTENT-001 | PASS | No LLM words in bio |
| KL-CONTENT-004 | PASS | Specific credentials, not generic |
| KL-CONTENT-005 | PASS | All conditions visible |
| KL-TRUST-001 | PASS | No logo wall |
| KL-TRUST-002 | PASS | Reviews have full context |

---

## TLS Targets by Section

| Section | Component Type | Target TLS |
|---------|---------------|------------|
| Identity & Legitimacy | Trust/Hero | < 18 |
| Authority Signals | Proof | < 15 |
| Narrative | Copy | < 18 |
| Reviews & Feedback | Trust | < 18 |
| Assets & Capabilities | Layout | < 15 |
| Active & Past Tours | Cards | < 20 |

---

## Page Layout Structure

```
┌─────────────────────────────────────────┐
│ GlobalNav                               │
├─────────────────────────────────────────┤
│ Breadcrumb: Home > Operators > [Name]   │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ IDENTITY & LEGITIMACY               │ │
│ │ ┌──────┐                            │ │
│ │ │Photo │ Name (H1)                  │ │
│ │ │      │ [Verified] Specialization  │ │
│ │ │      │ Location · X years exp     │ │
│ │ └──────┘                            │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ AUTHORITY SIGNALS                   │ │
│ │ Credentials · Specializations       │ │
│ │ Affiliations · Experience markers   │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ NARRATIVE                           │ │
│ │ Brief bio (2-3 paragraphs)          │ │
│ │ Guiding philosophy                  │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ REVIEWS & FEEDBACK                  │ │
│ │ Rating Distribution | Summary       │ │
│ │ ┌───────────────────────────────┐   │ │
│ │ │ Review 1                      │   │ │
│ │ │ Review 2                      │   │ │
│ │ │ Review 3                      │   │ │
│ │ └───────────────────────────────┘   │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ASSETS & CAPABILITIES               │ │
│ │ Equipment · Capacity · Access       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ TOURS                               │ │
│ │ [Active] [Past]                     │ │
│ │ ┌─────┐ ┌─────┐ ┌─────┐            │ │
│ │ │Tour │ │Tour │ │Tour │            │ │
│ │ └─────┘ └─────┘ └─────┘            │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

Desktop: Single column with generous width
Mobile: Single column, sections stack vertically

---

## Integration Requirements

### Navigation
- Breadcrumb: Home > Operators > [Operator Name]
- Back link to previous page (or Tours Index)
- GlobalNav persistent

### Routing
- Route: `/operators/[id]` or `/operators/[slug]`
- Canonical URL with operator slug
- Social sharing meta tags

### Cross-Page Consistency
- TourCard reused from Tours Index
- VerificationBadge consistent with OperatorPreviewCard
- Link from Tour Detail operator preview
- Link from TourCard operator attribution

### Data Requirements (UI Only)
```typescript
interface OperatorProfile {
  id: string;
  slug: string;
  name: string;
  photo: string;
  verified: boolean;
  expertise: string;
  location: string;
  yearsExperience: number;
  specializations: string[];
  credentials: Credential[];
  affiliations: string[];
  bio: string;
  philosophy?: string;
  reviews: Review[];
  ratingDistribution: number[]; // [1-star, 2-star, 3-star, 4-star, 5-star]
  averageRating: number;
  totalReviews: number;
  equipment: EquipmentItem[];
  capacity: CapacityInfo;
  accessibility: string[];
  languages: string[];
  activeTours: TourPreview[];
  pastTours: PastTour[];
  trackRecord: {
    toursCompleted: number;
    confirmationRate: number;
    totalParticipants: number;
  };
}

interface Review {
  id: string;
  reviewerName: string;
  tourId: string;
  tourTitle: string;
  tourDate: string;
  reviewDate: string;
  rating: number;
  text: string;
  operatorResponse?: string;
}

interface Credential {
  title: string;
  issuer: string;
  year?: number;
}

interface PastTour {
  id: string;
  title: string;
  date: string;
  outcome: 'completed' | 'cancelled';
  participantCount?: number;
}
```

---

## Accessibility Requirements

- Operator photo has meaningful alt text
- Rating distribution accessible to screen readers
- Review list navigable by keyboard
- Verification badge has accessible label
- Tours section uses proper list semantics
- Skip link to main content
- Focus management for expandable sections

---

## Responsive Behavior

| Viewport | Layout | Photo Size |
|----------|--------|------------|
| Desktop (1024px+) | Single column, max-width | 160px circle |
| Tablet (768-1023px) | Single column | 120px circle |
| Mobile (<768px) | Single column | 80px circle |

---

## Components to Create (New)

| Component | File | Purpose |
|-----------|------|---------|
| OperatorHero | `src/components/ui/OperatorHero.tsx` | Identity section header |
| AuthoritySection | `src/components/ui/AuthoritySection.tsx` | Credentials and experience |
| RatingDistribution | `src/components/ui/RatingDistribution.tsx` | Review histogram |
| ReviewCard | `src/components/ui/ReviewCard.tsx` | Individual review display |
| CapabilitiesSection | `src/components/ui/CapabilitiesSection.tsx` | Equipment and logistics |
| PastTourItem | `src/components/ui/PastTourItem.tsx` | Condensed past tour record |
| TrackRecordSummary | `src/components/ui/TrackRecordSummary.tsx` | Aggregate stats |

## Components to Reuse

| Component | From | Usage |
|-----------|------|-------|
| TourCard | Tours Index | Active tours grid |
| VerificationBadge | OperatorPreviewCard pattern | Verified status |

---

```
NEXT_ACTIONS:
  1. orchestrator to review and approve IA specification
  2. If approved: frontend-implementer receives OPERATOR-PROFILE-UI-001 task
  3. visual-qa to capture evidence after implementation
  4. a11y-auditor to run baseline checks after implementation
```
