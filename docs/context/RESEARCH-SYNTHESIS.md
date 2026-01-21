# Research Synthesis — Quorum Tours Context Documents

**Generated:** 2026-01-21
**Source Documents:** 5 files from `docs/context/` + 21 files from `research/`
**Purpose:** Consolidated reference for admin/operator dashboard builds
**Status:** Complete (all files processed)

---

## 1. Key Insights by Document

### 1.1 Frontend UX Synthesis Guide
Chase lists are **contextual, trip-scoped artifacts** (not lifelong wishlists) requiring visible priority tiers; species-first tour discovery ("search by bird, not map") must show transparent match rationale with likelihood/seasonality signals.

### 1.2 Industry Disruptor Brief (PDF)
The $67B wildlife tourism market suffers from a **synchronization gap**—operators commit capital before demand is proven, users hesitate to commit before tours are certain. Quorum's "Kickstarter mechanics" (threshold-based confirmation with held deposits) solves this for all three segments.

### 1.3 Operator Profile UX Synthesis Guide
Operator profiles are **trust artifacts, not marketing pages**—credibility must emerge from structure (evidence, specificity, track records) rather than persuasive language; verification should feel institutional, not gamified.

### 1.4 Shared Operator & User Pain Point Synthesis
Both sides share symmetric anxieties: financial risk, confirmation uncertainty, and hidden terms. **Confirmation status is the product**—it must be above-fold, visually explained, and never require FAQ reading.

### 1.5 User Profile & Progression Synthesis Guide
User progression is **earned standing in a serious community**, not gamification. Tiers function as access qualifiers (not achievement trophies); behavioral compatibility signals (pace, motivation) reduce group friction.

---

## 1B. Key Insights from Research Documents

### 1.6 Birding SaaS Market Research & Strategy (PDF)
The $66B birdwatching tourism market (projected $95B by 2030) is dominated by **enthusiastic birders (56%)** who measure tour value by "biological yield" (species count), not luxury metrics. The 35-54 age cohort now generates 42% of revenue and is digitally native. **Solo travelers are the fastest-growing segment**—threshold booking directly addresses their "single supplement" pricing barrier.

### 1.7 Designing Chase Lists (MD)
Serious birders don't maintain static want-lists—they **generate context-specific target lists dynamically** triggered by trip planning. "Nemesis birds" (multi-year pursuit failures) represent **extremely high conversion potential**; 10-25 species is the practical ceiling for active chase lists before notification fatigue. **eBird CSV import is non-negotiable**; data lock-in drives away serious birders instantly.

### 1.8 Notification System Design (PDF)
Chase list matching triggers must be **event-driven** (tour creation → instant match → notification). Social proof ("12 birders already booked") and urgency language boost conversion but must respect **quiet hours (9pm-7am local)**. Daily digest option critical—never send more than 5 emails/day per user. Database schema requires `notification_recipient` table tracking per-user delivery status.

### 1.9 Species Success Rate Analysis (PDF)
**No competitor publishes per-operator species success rates**—this is a genuine market gap. Birders currently rely on fragmented sources (forums, word-of-mouth, trip reports that "read like marketing"). Verification is critical: data could be gamed via inflated reports, cherry-picking tours, or excluding heard-only sightings. Implementation requires minimum 10-20 tours before displaying stats, recency weighting, and participant verification (photos, eBird linking).

### 1.10 Species Database Architecture (PDF)
**AviList (June 2025)** is the new unified global taxonomy with **CC BY 4.0 license**—commercially viable. eBird API is **blocked for commercial use**; must use user-upload CSV workflow. Database must use **Concept-Based Architecture** (not name-based) to handle taxonomic splits/lumps. Australian market requires WLAB (Working List of Australian Birds) alignment and colloquial name mapping ("Peewee" → Magpie-lark, "Bin Chicken" → Australian White Ibis).

### 1.11 Personalization & Ranking Research (MD)
**Invisible algorithmic sorting would backfire** with 45-65 demographic who expect eBird-style transparency. 75% of consumers find personalization "at least somewhat creepy"; older adults exhibit "using-while-distrusting" behavior. EU DSA now requires ranking disclosure and non-personalized alternatives. Recommended: **transparent, opt-in personalization** with explicit "Personalized for you" sort option alongside date/price/rating. New operators need 90-120 day visibility boost.

### 1.12 Species Success Rates Deep Dive (MD)
**Whale watching industry provides the playbook**: operators publishing 95%+ success rates with money-back guarantees now dominate bookings. Quorum should implement a **3-tier verification system**: Tier 1 (eBird-linked baseline), Tier 2 (participant-confirmed, weighted higher), Tier 3 (guarantee-backed, premium visibility). Require **30-50+ tours** before displaying stats. Display **confidence intervals** ("85-95% based on 67 tours") rather than single-point claims. Network effects create defensible moat—accumulated historical data becomes impossible for competitors to replicate quickly.

### 1.13 Existing Practices & Gaps Analysis (PDF)
**No platform aggregates species-by-operator stats**—eBird gives raw checklists but has no concept of a commercial guide's record. Birders use internet searches (67%) and friend recommendations (32%) to find guides. Trip reports are viewed as "promotional fluff" rather than reliable data. Operators balance "perceived novelty against likelihood they can deliver"—successful ones track internally but don't publish. **Key UI requirement**: display tour count, success %, and date of last sighting per operator-species pair. Example: "Peruvian Inca-Plover – 14 tours, 93% success (last confirmed March 2025)".

### 1.14 Operator Profile Data Architecture (PDF)
**Separate `operators` table from `profiles`**—business entity distinct from user personal info. Use `operator_members` join table with roles (owner/admin/guide) for team management. Store credentials in `operator_credentials` table with status workflow (pending→verified→rejected→expired). Computed stats (tours_completed, guests_served, repeat_customer_rate, response_time) should be **maintained via triggers** on bookings table for performance. Use `is_published` flag + RLS to control visibility. **Platform-mediated messaging only**—never expose operator contact info publicly. Multi-region support via `operator_regions` join table with region-specific credential requirements (park permits).

### 1.15 Operator Profile UX Research Design (PDF)
**"Field guide meets boutique eco-lodge"** design mandate for premium $280-450/day birding segment. The 45-65+ demographic requires **18px+ body fonts, WCAG AAA contrast, 48px+ tap targets**—"quiet luxury" aesthetics (gray-on-white) are actively hostile to this user base. **Anti-gamification is critical**: professional credentials (PhD, AMGA Certified, eBird Reviewer) displayed as verified seals, not badges/levels/XP. Taxonomy signals respect—list "Sialia sialis (Eastern Bluebird)" not "Blue Bird." Competitive analysis shows Rockjumper excels at life list counts and testimonial specificity; Field Guides uses "Spark Bird" origin stories and Annotated Triplists as proof of competence. Hero section requires **environmental portrait** (guide in field, not studio headshot), serif typography (Caslon/Baskerville), and "Verified Operator" seal. **20+ photos = 150% more engagement; videos = 34% more.** Mobile must function as field utility with offline caching.

### 1.16 Operator Public Profile Data Architecture (PDF)
Expands on #1.14 with implementation detail. **Reviews must link to bookings** (verified purchase only)—reviews.booking_id ensures only tour completers can review. Ratings aggregation uses **trigger-based running average formula**: `new_avg = (old_avg * old_count + NEW.rating) / (old_count + 1)` to avoid expensive queries. Credential expiration tracked via date comparison (`expiration_date < NOW()`) rather than manual flags—auto-expires without human intervention. Profile fields should include: **Equipment/Facilities** (spotting scopes, vehicles), **"Meet the Crew"** section showing guides with mini-bios, and **Risk vs Reward Meter** (physical exertion + comfort level). Contact info never public—use "Contact Operator" button that triggers platform messaging.

### 1.17 Operator Pain Points Deep Dive (PDF)
**Burning pain points** (immediate revenue/trust impact): Customer acquisition (invisible without SEO), payment chasing (15+ hrs/week admin), tour coordination uncertainty (minimum groups), booking management chaos (spreadsheets), financial risk (prepayments for uncertain tours). **Simmering pain points** (annoying but survivable): Communication friction, legacy tech frustration, reputation management. Key emotional insight: operators feel like "debt collectors" chasing payments and "clerks" doing admin instead of guiding. Quorum's "kickstarter" model directly addresses the coordination pain—**"Zero surprises, only confirmed departures."** For **Established Listers (45-65)**: burning pains are confirmation uncertainty, guide quality assessment, payment/cancellation anxiety. For **New Wave (25-45)**: burning pains are price sensitivity, clunky mobile booking, social intimidation. Cross-segment insight: both value authenticity but express it differently—listers want data/credentials, new wave wants community/visuals.

### 1.18 Tour Booking Pain Points Comprehensive Analysis (MD)
**30 distinct pain points** mapped across three demographics with emotional story frameworks. Operators face the **"Passion Trap"**—world-class naturalists who lack business/digital skills, operating in perpetual fragility. Key operator stories: "The Invisible Expert" (shouting into the void with marketing), "The Deposit Gamble" (3AM anxiety over vendor prepayments), "The 24/7 Tether" (unable to disconnect while guiding), "The Chasing Game" (feeling like debt collectors). Listers (45-65) face trust/verification burden, "death march" physical intensity mismatches, single supplement penalties (20-50% surcharge), species probability black boxes, and useless generic reviews ("Great lunch!"). New Wave (25-45) face **gatekeeping culture** (intimidation by Latin names and massive life lists), financial barriers ($3,000 lump sums prohibitive), antiquated booking (PDF forms, mailed checks), "conquest mentality" alienation, and social isolation (no peer community). **Messaging hierarchy recommendation**: Homepage splits funnel under banner of "Access"—operators need market access, listers need species access, new wave need community access.

### 1.19 Trust Signals for Premium Operators (MD)
**Trust hierarchy for $280-450/day purchases**: Social proof (emotional) → Credentials (rational). Lead with reviews, support with verification. Optimal rating range is **4.2-4.7 stars** (not 5.0)—perfect ratings trigger suspicion. **10 reviews = 4x conversion lift** (cold-start threshold). Airbnb Superhost model: 4.8+ rating, 90%+ response rate, <1% cancellation = badge + 64% income boost. **Trust badges follow inverted U-curve**—2-3 meaningful badges outperform badge walls ("trying too hard" reaction). Birding-specific credibility: **eBird integration non-negotiable** (active checklist history, reviewer status), species expertise over generalist claims (cite specific numbers: "2,000+ species shown in 2024"), audio ID ability explicit, named local patches showing intimate knowledge. **Anti-patterns that destroy trust**: stock photography (35% less engagement), superlative claims without specificity ("best birdwatching" fails verification test), fake urgency (58% would distrust brand caught), badge overload, over-polished production (76% prefer authentic over polished). Profile structure: above-fold needs real photo, name, badge, rating, positioning, pricing; first scroll needs narrative + credentials + vessel info + featured reviews; secondary content for deep due diligence.

### 1.20 User Profile & Progression Design (MD)
**Adults 45-65 reject "gamification" framing** but respond equally well to identical mechanics when "game" language is removed (57% rate leaderboards effective when reframed). Progression must connect to **Self-Determination Theory**: competence (mastery), autonomy (choice), relatedness (belonging)—competence dominates for this demographic. **Language transformation essential**: Replace "Level up to Gold!" with "Your field experience qualifies you for..."; replace "Unlock badge!" with "Members who've explored these habitats have shown they can..." **Recommended tier names** (role-based, not metal/gem): Explorer (entry, Relaxed tours) → Field Naturalist (passed quiz, Advanced/Photography tours) → Trusted Contributor (verified reliability, private charters). **eBird integration is the authenticity test**—platform for serious birders without eBird link seems unserious. **Birding vs photography divide is critical compatibility factor**: pure birders want 200-300 species fast, photographers need extended time per bird (150-200 species slower). **Asymmetric reputation display**: show positive (badges) publicly, keep negative (strikes) entirely backend—users with strikes simply don't earn badges rather than displaying marks. **Anti-patterns from other platforms**: LinkedIn endorsements (meaningless from gaming), Strava (injury cycles from segment hunting, deaths linked), AllTrails (upselling erosion, "essentially meaningless" difficulty ratings). **Patronizing language to avoid**: "Great job!" for trivial actions, excessive exclamation points, celebratory confetti, "level up/unlock" vocabulary.

### 1.21 Wildlife Tour Platform Strategic Analysis (PDF)
**Central thesis**: Market limited not by demand but by **"synchronization gap"**—operators paralyzed by front-loaded vendor deposit risk, listers paralyzed by tour logistics opacity, new wave paralyzed by socio-economic barriers. Quorum's conditional activation model acts as **"risk-mitigation engine"** realigning all three stakeholders. Operator ecosystem characterized by **"Passion Trap"**: naturalists first, business owners second, lacking capital reserves and digital literacy, single bad season can cause insolvency. Marketing described as **"shouting into the void"** with "mall-flyer energy"—near-zero engagement leads to invisibility. Financial structure **stifles innovation**—operators stick to "safe" routes due to new itinerary risk, leading to site overcrowding and boring repeat customers. **Lister segment** (45-65) are "whales"—time-rich, income-stable, highly discerning, burned by bad guides, skeptical of gig economy tourism. They need standardized **intensity ratings** ("hardcore" vs "moderate" definitions), species probability data ("85% sighting probability"), and birding-specific reviews (not "Great lunch!"). **New Wave segment** (25-45) drives future growth but currently most underserved—values community, aesthetics, ethics over list numbers. They fear **gatekeeping** (being mocked for misidentification), want "Slow Birding" (lingering, photography, behavior observation), and explicitly seek LGBTQ+ friendly and conservation-aligned operators.

---

## 2. Design Decisions Already Made

### Core Mechanics
| Decision | Rationale |
|----------|-----------|
| Threshold-based confirmation | Tours only run when minimum participants reached |
| Held deposits (not charged) | Zero risk for users until tour confirms |
| Simultaneous "deposit strike" | All payments captured at once when threshold met |
| Species chase list matching | Tours discoverable by target species, not just location |
| Three tour statuses: forming → confirmed → cancelled | Clear progression, no ambiguous "pending" states |

### Anti-Gamification Mandate
| Prohibited | Replacement |
|------------|-------------|
| Points, XP, streaks, levels | Tier-based access qualifiers (restrained visual treatment) |
| Progress bars as "levels" | Threshold progress as collective coordination |
| Leaderboards | Aggregate compatibility signals |
| Badges/cartoon icons | Muted verification indicators |
| Social pressure cues | Private-by-default lists |

### Trust Architecture
| Principle | Implementation |
|-----------|----------------|
| Authority over persuasion | Evidence-based credibility (counts, history, verification) |
| Specificity as multiplier | Named skills, concrete experience markers |
| Imperfect ratings as signal | 4.7 stars more trustworthy than 5.0 |
| Structure over claims | Consistent layouts, no hidden fees/terms |
| Progressive disclosure | Scan credibility in seconds, audit in minutes |

### Visual Design Mandates
| Requirement | Target Demographic |
|-------------|-------------------|
| High contrast | 45-65+ core users |
| Large base fonts | Accessibility first |
| Minimal animation | Calm, stable interfaces |
| Clear typographic hierarchy | Information density control |
| Tap/click preference | Avoid precision gestures |

### Chase List Decisions (from Research)
| Decision | Rationale |
|----------|-----------|
| 4-tier priority system | Tier 1 (10 max, immediate alerts), Tier 2 (25, daily digest), Tier 3 (50, weekly), Tier 4 (unlimited, no alerts) |
| eBird CSV import required | Standard format among serious birders; data portability builds trust |
| Auto-remove on sighting | Mirror mental model—species leave list when seen |
| Taxonomic order default | Matches field guides and eBird; provide sort toggles |
| Private by default | Sharing always explicit; aggregate data to operators only |
| Nemesis/bogey bird terminology | Respect expert vocabulary; high emotional value drives conversions |

### Notification Decisions (from Research)
| Decision | Rationale |
|----------|-----------|
| Event-driven architecture | Tour creation → match users → queue notification in < 1 minute |
| Quiet hours enforced | 9pm-7am local time; queue for morning delivery |
| Max 5 emails/day | Beyond this, auto-switch to digest to prevent fatigue |
| Social proof in alerts | "12 birders already booked" increases conversions |
| Personalized subjects | ~26% lift in open rates with name + species |
| Channel preference controls | Email (default), in-app (default), SMS (opt-in Phase 2) |

### Payment Architecture (from Market Research)
| Decision | Rationale |
|----------|-----------|
| Credential-on-File (CoF) with MIT | Supports 6-12 month lead times; 7-day auth limit workaround |
| Setup Intent at commitment | SCA compliance; tokenize card without charging |
| Trust Account integration | Ring-fenced funds; PTR compliance; consumer protection |
| Stripe Connect for operators | Marketplace payments; automatic payout scheduling |

### Species Database Architecture (from Research)
| Decision | Rationale |
|----------|-----------|
| AviList as taxonomic backbone | Unified global taxonomy (June 2025); CC BY 4.0 license = commercially viable |
| Concept-Based Architecture | Track species by stable concept IDs, not names—gracefully handles splits/lumps |
| eBird CSV import (not API) | eBird API blocked for commercial use; user-upload workflow as workaround |
| WLAB alignment for AU market | Australian birders expect Working List of Australian Birds taxonomy |
| Colloquial name mappings | Support local terms (Peewee, Bin Chicken) alongside scientific names |

### Species Success Rate Decisions (from Research)
| Decision | Rationale |
|----------|-----------|
| Display only after 10-20 tours | Minimum sample size for statistical validity |
| Recency weighting | Older data less reliable; recent tours weighted higher |
| Participant verification required | Photos or eBird linking to prevent operator gaming |
| Separate "seen" vs "heard-only" | Birding distinction; some operators may exclude heard-only |
| Per-operator rates (not platform avg) | Competitive differentiator—no competitor publishes this |

### Personalization & Ranking Decisions (from Research)
| Decision | Rationale |
|----------|-----------|
| Transparent, opt-in personalization only | 75% find invisible personalization "creepy"; 45-65 demo expects eBird-style clarity |
| Explicit "Personalized for you" sort option | Must be labeled, alongside default date/price/rating sorts |
| Non-personalized alternative required | EU DSA compliance; good practice regardless |
| 90-120 day new operator boost | Prevent marketplace concentration; give newcomers visibility |
| No invisible algorithmic sorting | Violates trust expectations of expert audience |

### Success Rate Verification Tiers (from Research)
| Tier | Requirements | Display Treatment |
|------|-------------|-------------------|
| Tier 1 - eBird-Linked | Public eBird checklist links required | "Verified" badge; baseline display |
| Tier 2 - Participant-Confirmed | Multiple participants confirm via linked eBird accounts | Higher weighting; "Participant Verified" badge |
| Tier 3 - Guarantee-Backed | Operator offers refund/free return if target missed | Premium visibility; "Guaranteed" badge |

### Success Rate Display Decisions (from Research)
| Decision | Rationale |
|----------|-----------|
| 30-50 tour minimum before display | Avoid misleading 100% from single outings |
| Confidence intervals, not single points | "85-95% based on 67 tours" more honest than "90%" |
| Seasonal separation | Spring/summer/fall/winter rates differ; bird populations change |
| Time-weighted (recent = more weight) | Habitat and populations change; 12-month recency preferred |
| Heard vs seen tracked separately | Birders distinguish; "heard only" may not satisfy chasers |
| Last sighting date shown | Recency signal builds confidence |

### Operator Entity Architecture (from Research)
| Decision | Rationale |
|----------|-----------|
| Separate `operators` from `profiles` | Business entity ≠ personal user; allows team management |
| `operator_members` join table | Team roles: owner (1), admin (unlimited), guide (unlimited) |
| Computed stats via triggers | Performance: avoid expensive aggregations on dashboard load |
| `is_published` flag for visibility | Draft mode before verification; unpublished = hidden from discovery |
| Platform-mediated messaging only | Never expose email/phone publicly; protect operators from spam |
| Multi-region via join table | One operator can serve multiple regions with different credentials |

### Operator Credentials Workflow (from Research)
| Status | Transition | UI Treatment |
|--------|------------|--------------|
| pending | Initial upload | "Under review" badge; profile visible but unverified |
| verified | Admin approval | Checkmark badge; full visibility |
| rejected | Admin rejection with reason | Prompt to re-upload; reason shown to operator only |
| expired | Auto-transition after expiry date | Warning badge; prompt to renew |

### Operator Computed Stats (from Research)
| Stat | Calculation | Display Context |
|------|-------------|-----------------|
| tours_completed | COUNT(tours WHERE status='completed') | Profile credibility signal |
| guests_served | SUM(confirmed_reservations) | Scale indicator |
| repeat_customer_rate | returning_guests / total_guests | Trust signal (people come back) |
| average_response_time | AVG(time to first reply) | Responsiveness indicator |
| average_rating | AVG(reviews.rating) | Standard reputation metric |

### Accessibility Requirements (from Research)
| Requirement | Target Spec | Rationale |
|-------------|-------------|-----------|
| Body font size | 18px minimum | 45-65+ demographic; vision accessibility |
| Contrast ratio | WCAG AAA (7:1+) | "Quiet luxury" gray-on-white fails this audience |
| Tap targets | 48px minimum | Mobile field use; aging motor control |
| Typography | Serif (Caslon/Baskerville) | "Field guide" aesthetic; institutional trust |
| Animation | Minimal/none | Calm interfaces; avoid distraction |
| Offline support | Required (mobile) | Field utility; unreliable connectivity |

### Operator Profile UX Decisions (from Research)
| Decision | Rationale |
|----------|-----------|
| Environmental portrait hero | Guide in field, not studio headshot—shows real work context |
| Taxonomy in profile | "Sialia sialis (Eastern Bluebird)" signals respect for expertise |
| 20+ photos threshold | 150% more engagement than sparse galleries |
| Video integration | 34% engagement lift; show guiding style in action |
| Anti-gamification: seals not badges | PhD, AMGA Certified, eBird Reviewer as verified professional credentials |
| "Spark Bird" origin story | Field Guides pattern—humanizes guide, builds connection |
| Annotated trip lists as proof | Detailed species lists from past tours demonstrate competence |
| Competitor benchmarks | Rockjumper: life list counts, testimonial specificity; Field Guides: narrative depth |

### Pain Point Classification (from Research)
| Category | Definition | Response Priority |
|----------|------------|-------------------|
| Burning | Immediate revenue/trust impact; operators feel it daily | Must address in MVP |
| Simmering | Annoying but survivable; workarounds exist | Address in Phase 2+ |
| Latent | Not yet recognized as problems; surfaced by research | Monitor, don't prioritize |

### Segment-Specific Messaging (from Research)
| Segment | Values | Message Frame |
|---------|--------|---------------|
| Established Listers (45-65) | Data, credentials, precision, confirmed schedules | "Verified guides, transparent success rates, confirmed departures" |
| New Wave (25-45) | Community, visuals, flexibility, accessibility | "Join fellow adventurers, stunning destinations, flexible booking" |
| Operators (50-70) | Efficiency, payment certainty, reduced admin | "Zero payment chasing, confirmed-only departures, automated coordination" |

### Trust Signal Hierarchy (from Research)
| Layer | Signal Type | Implementation | Conversion Impact |
|-------|-------------|----------------|-------------------|
| 1 - Social Proof | Reviews, ratings, booking counts | Lead with emotional trust; above-fold position | Primary driver |
| 2 - Credentials | Certifications, affiliations, eBird status | Support rational trust; visible but secondary | Trust multiplier |
| 3 - Verification | Platform badges (Verified Operator) | Binary indicator; no badge overload | Baseline expectation |

**Optimal Rating Display:** 4.2-4.7 stars (perfect 5.0 triggers suspicion)
**Cold-Start Threshold:** 10 reviews = 4x conversion lift
**Badge Limit:** 2-3 meaningful badges (inverted U-curve; more badges = "trying too hard")

### User Progression Tiers (from Research)
| Tier | Name | Requirements | Access Unlocked |
|------|------|--------------|-----------------|
| Entry | Explorer | Account created | Browse all tours, express interest |
| Mid | Field Naturalist | eBird linked, 100+ species, behavioral quiz passed | Advanced tours, photography expeditions |
| High | Trusted Contributor | 10+ completed tours, verified reviews, <5% cancellation | Private charters, early access, operator contact |

**Language Transformation Required:**
| Avoid | Use Instead |
|-------|-------------|
| "Level up to Gold!" | "Your field experience qualifies you for..." |
| "Unlock this badge!" | "Members who've explored these habitats have shown they can..." |
| "You earned 50 XP!" | "Your participation has been recorded" |
| "Leaderboard rank" | "Active contributors this season" |
| "Achievement unlocked!" | "Access granted" |

### Emotional Story Templates (from Research)
| Story Pattern | Persona | Emotional Hook | Platform Solution |
|---------------|---------|----------------|-------------------|
| The Invisible Expert | Operator | "Shouting into the void" despite expertise | Chase list demand matching surfaces operators to right audience |
| The Deposit Gamble | Operator | 3AM anxiety over vendor prepayments | Threshold confirmation = no payment until tour is certain |
| The 24/7 Tether | Operator | Can't disconnect while guiding | Platform handles inquiries; operators see only committed participants |
| The Chasing Game | Operator | Feeling like debt collectors | Automated payment capture; zero chasing |
| The Trust Burden | Lister | Hours of research to verify guide quality | Structured disclosure, verified credentials, success rates |
| The Death March | Lister | Physical intensity surprises | Tour Intensity Profile ratings upfront |
| The Solo Penalty | Lister | 20-50% single supplement surcharge | Threshold model spreads cost; no supplement targeting |
| The Gatekeeper | New Wave | Mocked for not knowing Latin names | Compatibility over competition; community framing |
| The Price Wall | New Wave | $3,000 lump sum prohibitive | Lower-threshold tours possible; deposit-only commitment |
| The Museum Effect | New Wave | "Look but don't touch" passive tours | Slow birding options; behavior observation emphasis |

---

## 3. Pain Points by Audience

### 3.1 Tour Operators (Expert naturalists, 50-70)

| Pain Point | Severity | Current State | Platform Solution |
|------------|----------|---------------|-------------------|
| Front-loaded financial risk | Critical | Pay vendors months before confirmation | Threshold-based confirmation |
| Payment chasing | High | 15+ hrs/week on admin | Automated simultaneous capture |
| Marketing reach | High | Limited to personal networks | Chase list demand matching |
| Cancellation reputation damage | Medium | Apologetic emails damage trust | Tours only announce when confirmed |
| Spreadsheet operations | Medium | No purpose-built tools | Dashboard automation |
| Guide identity hidden | Medium | "Mystery leader" problem | Upfront credential disclosure |

**Operator Dashboard Must Address:**
- Tour creation with threshold/capacity settings
- Real-time booking progress visibility
- Participant list management
- Credential/verification management
- Stripe Connect onboarding status
- Revenue/payout tracking

### 3.2 Established Enthusiasts ("Listers", 45-65)

| Pain Point | Severity | Current State | Platform Solution |
|------------|----------|---------------|-------------------|
| Confirmation uncertainty | Critical | Can't book flights until tour confirms | Green light = definite |
| Non-refundable deposits | High | Money at risk if tour cancels | Held deposits, not charged |
| Guide quality assessment | High | No transparent credentials | Required disclosure |
| Tour discovery effort | Medium | Hours of manual research | Species-first search |
| Group compatibility anxiety | Medium | Unknown fellow participants | Staged profile disclosure |
| Information overload | Low | Too many emails/rules | Digest notifications, muting |

**User Dashboard Must Address:**
- Active commitments with status
- Chase list management
- Notification preferences (quiet hours, digest)
- Past tours and reviews
- Tier/trust visibility (restrained)

### 3.3 New Wave Participants (Discovery-driven, 25-45)

| Pain Point | Severity | Current State | Platform Solution |
|------------|----------|---------------|-------------------|
| Price barriers | High | Premium pricing for retirees | Lower threshold tours possible |
| Cultural gatekeeping | High | Intimidating expert community | Compatibility not ranking |
| Entry point confusion | Medium | No clear onboarding path | Guided discovery flows |
| Social anxiety | Medium | Fear of mismatched groups | Aggregate compatibility signals |
| Terminology barrier | Low | Expert shorthand unfamiliar | Multiple input modes |

---

## 4. UI Patterns Specified

### 4.1 Species Cards (Reusable Atom)
```
┌─────────────────────────────┐
│ [Thumbnail]                 │
│ Primary Name                │
│ Secondary identifier        │
│ ────────────────────────    │
│ Seasonality signal          │
│ Likelihood/confidence cue   │
│ Recency signal              │
└─────────────────────────────┘
```
**Density scales by intent:** browse (compact) → evaluate (medium) → commit (full)

### 4.2 Confirmation Status (First-Class Element)
- **Above fold, always visible**
- Visual threshold progress (not countdown pressure)
- Framed as collective coordination: "4 of 6 needed"
- Three states only: Forming | Confirmed | Cancelled
- No ambiguous "pending" or "awaiting confirmation"

### 4.3 Operator Profile Structure
```
ABOVE FOLD (instant scan):
├── Human identity (real person)
├── Verification status (binary badge)
├── Social proof (rating + count)
└── Scope (region, specialization)

PROGRESSIVE DISCLOSURE:
├── Experience narrative (scope → method → credentials)
├── Reviews (dates, distribution, responses visible)
├── Equipment/logistics (collapsible)
└── Deep due diligence content
```

### 4.4 User Profile Structure
```
ALWAYS VISIBLE:
├── Display name
├── Region (not precise location)
├── Experience classification (broad)
└── Primary mode (birding vs photography)

BEHAVIORAL COMPATIBILITY:
├── Pace preference (slow/moderate/fast)
└── Primary motivation (listing/experience/mixed)

STAGED BY COMMITMENT:
├── Browsing: anonymized aggregates only
├── After commitment: limited peer context
└── Post-confirmation: fuller profiles
```

### 4.5 Chase List Patterns (Expanded from Research)
- **Contextual scoping:** trip-scoped, season-scoped, goal-scoped
- **Priority tiers:** Tier 1 (must-see, 10 max), Tier 2 (chase-worthy, 25), Tier 3 (nice-to-have, 50), Tier 4 (bonus, unlimited)
- **Size management:** 10-25 active species ceiling; auto-collapse long lists
- **Entry modes:**
  - Primary: Autocomplete (common + scientific names)
  - Secondary: 4-letter eBird codes for power users (GRHE = Green Heron)
  - Tertiary: Taxonomic browse / visual "type" categories
  - Essential: Photos in search results
- **Cold start solutions:** Destination-based starter lists, eBird life list import, "Unobserved species" generator
- **Private by default:** aggregate demand to operators only ("47 users want Eastern Bristlebird")
- **Nemesis bird handling:** Highest conversion potential; special UI treatment for multi-year pursuits
- **Essential metadata per species:** Seasonal bar charts, range maps, recent sightings, photos, audio

### 4.6 Notification Patterns (Expanded from Research)
- **Triggers (MVP):** New tour created, threshold reached/confirmed, urgency (low seats)
- **Triggers (Future):** Price drops, date changes, waitlist openings
- **Relevance over volume:** max 5 emails/day, then auto-digest
- **Control modes:** Instant, Daily digest, Weekly digest, Off
- **Alert anatomy:**
  - Why: "Matches 2 species on your chase list"
  - What: Tour details + CTA
  - Social proof: "12 birders already booked"
  - Urgency: "Only 3 spots left"
- **Quiet hours:** 9pm-7am local (user-configurable); queue overnight events for morning
- **Personalization:** Name in subject line (~26% open rate lift), species count, match rationale
- **Batching:** Group 3+ tours into single "3 tours match your list" email

### 4.7 Species Success Rate Display (from Research)
```
┌─────────────────────────────────────────────────┐
│ Resplendent Quetzal                             │
│ ───────────────────────────────────────────     │
│ Success Rate: 85-95%  [Verified ✓]              │
│ Based on 67 tours                               │
│ Last confirmed: March 2025                      │
│ ───────────────────────────────────────────     │
│ [Season breakdown: Spring 92% | Fall 78%]       │
│ [Heard-only: tracked separately]                │
└─────────────────────────────────────────────────┘
```
**Critical elements:**
- Confidence interval (not single percentage)
- Tour count (sample size transparency)
- Recency signal (last confirmed date)
- Verification tier badge
- Optional: seasonal breakdown, heard vs seen
- Tooltip: methodology explanation on hover

**Operator-species tooltip example:**
> "Peruvian Inca-Plover – 14 tours, 93% success (last confirmed March 2025). All tours in dry season, 8am start."

### 4.8 Spark Bird Card (from Research)
```
┌─────────────────────────────────────────────────┐
│ MY SPARK BIRD                                   │
│ ─────────────────────────────────────────────── │
│ [Species Photo]                                 │
│ "The first Resplendent Quetzal I saw in Costa  │
│ Rica in 1987 changed everything. That moment   │
│ of iridescent green against the cloud forest   │
│ mist is why I've led 200+ tours since."        │
│ ─────────────────────────────────────────────── │
│ — Guide name, credential badges                 │
└─────────────────────────────────────────────────┘
```
**Purpose:** Humanizes guide beyond credentials; establishes emotional connection; differentiator from Field Guides competitor pattern.

### 4.9 Life List Heatmap (from Research)
```
┌─────────────────────────────────────────────────┐
│ SPECIES EXPERTISE BY REGION                     │
│ ─────────────────────────────────────────────── │
│ Central America  [████████████] 450 species    │
│ South America    [█████████░░░] 380 species    │
│ Southeast Asia   [███████░░░░░] 220 species    │
│ Australia        [████░░░░░░░░] 140 species    │
│ ─────────────────────────────────────────────── │
│ Lifetime total: 2,847 species                   │
│ Tours led: 214 | Years guiding: 28              │
└─────────────────────────────────────────────────┘
```
**Purpose:** Visual proof of depth + breadth; regional expertise at a glance; builds confidence for species-specific searches.

### 4.10 Risk vs Reward Meter (from Research)
```
┌─────────────────────────────────────────────────┐
│ TOUR INTENSITY PROFILE                          │
│ ─────────────────────────────────────────────── │
│ Physical Exertion:   ●●●○○  Moderate hiking     │
│ Comfort Level:       ●●●●○  Quality lodges      │
│ Early Starts:        ●●●●●  4-5am typical       │
│ Walking Distance:    ●●●○○  5-8km/day average   │
│ Terrain Difficulty:  ●●○○○  Well-maintained     │
│ ─────────────────────────────────────────────── │
│ Best for: Intermediate birders comfortable with │
│ early mornings and moderate activity levels     │
└─────────────────────────────────────────────────┘
```
**Purpose:** Set expectations before booking; reduce post-booking surprises; compatibility signal for different fitness levels.

### 4.11 Meet the Crew Section (from Research)
```
┌─────────────────────────────────────────────────┐
│ MEET YOUR GUIDES                                │
│ ─────────────────────────────────────────────── │
│ ┌─────────┐  Lead: Dr. Maria Santos             │
│ │ [Photo] │  Ornithologist, 15 years guiding    │
│ │         │  Specialty: Neotropical migrants    │
│ └─────────┘  [View full profile →]              │
│                                                 │
│ ┌─────────┐  Co-guide: Carlos Reyes             │
│ │ [Photo] │  Local expert, Costa Rica native    │
│ │         │  8 years with this operator         │
│ └─────────┘  [View full profile →]              │
└─────────────────────────────────────────────────┘
```
**Purpose:** Addresses "mystery leader" pain point; shows team depth; links to individual guide profiles.

---

## 5. Data Architecture Requirements

### 5.1 Core Entities (Frontend Needs)

| Entity | Key Fields for UI | Dashboard Context |
|--------|-------------------|-------------------|
| **tours** | title, location, region, status (forming/confirmed/cancelled), threshold, capacity, price, species[], dates | Operator: create/manage; User: browse/commit |
| **reservations** | status (interest/reserved/confirmed), deposit_held, deposit_charged, user_id, tour_id | Operator: participant list; User: commitments |
| **profiles** | name, location, tier, trust_score, pace_preference, primary_focus | User: self-view; Operator: participant context |
| **operators** | name, verification_status, rating, review_count, region[], specialization, stripe_status | Operator: dashboard identity; User: trust evaluation |
| **species** | common_name, scientific_name, seasonality, region[], likelihood_by_tour | Both: chase list, tour matching |
| **reviews** | rating, content, date, tour_id, operator_response | Operator: reputation; User: trust signals |
| **notifications** | type, urgency, species_match, action_required, read_status | User: alert management |
| **chase_lists** | user_id, species_id, priority_tier, scope (trip/season/goal) | User: management; System: tour matching |

### 5.2 Threshold Mechanics Data Flow

```
User commits → reservation.status = 'interest'
            → payment method tokenized (not charged)
            → reservation.deposit_held = false

Threshold reached → trigger simultaneous capture
                 → all reservations.deposit_held = true
                 → tour.status = 'confirmed'
                 → notify all participants

Threshold not met by deadline → tokens expire
                             → reservations cancelled
                             → tour.status = 'cancelled'
                             → no charges, no awkwardness
```

### 5.3 Stripe Integration Points

| Context | Stripe Feature | Data Field |
|---------|---------------|------------|
| User commits to forming tour | Setup Intent | reservations.stripe_setup_intent_id |
| Threshold reached, capture | Payment Intent | reservations.stripe_payment_intent_id |
| Operator onboarding | Connect | operators.stripe_account_id |
| Operator payout | Connect Transfer | operators.stripe_payout_* |
| User payment method | Customer | profiles.stripe_customer_id |

### 5.4 Real-Time Requirements

| Surface | Update Trigger | Latency Tolerance |
|---------|---------------|-------------------|
| Threshold progress ("4 of 6") | New reservation | < 5 seconds |
| Tour status change | Threshold met/deadline | Immediate |
| Participant list (operator view) | New commitment | < 5 seconds |
| Chase list match notification | New tour created | < 1 minute |

### 5.5 Notification System Schema (from Research)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **notification_preferences** | user_id, email_enabled, sms_enabled, frequency (instant/daily/weekly), quiet_start, quiet_end, timezone | User notification settings |
| **notifications** | id, tour_id, type (new_tour/threshold/urgency), triggered_at, content | Core notification event |
| **notification_recipient** | notification_id, user_id, channel, sent_at, read_at, status | Per-user delivery tracking |
| **user_chase_list** | user_id, species_id, priority_tier (1-4), scope (trip/season/goal), added_at | Chase list with tiers |
| **tour_target_species** | tour_id, species_id, likelihood_rating | Tours can have 1-5 target species |

**Matching Query Pattern:**
```sql
SELECT user_id FROM user_chase_list
WHERE species_id = ANY(:tour_species_list)
```
Index on `user_chase_list(species_id)` for performance.

### 5.6 Market Segment Data (from SaaS Research)

| Segment | Market Size (2024) | Growth | Platform Opportunity |
|---------|-------------------|--------|---------------------|
| Enthusiastic Birders | $53B (56% share) | Stable | High - species-specific tours, chase list matching |
| Casual Eco-Tourists | $25B | 7% CAGR | Medium - photography focus, experiential |
| Solo Travelers | ~$10B | Fastest | Very High - threshold model solves single supplement |
| Small Operators | Supply side | High need | AI itinerary builder, threshold de-risking |

### 5.7 Species Database Schema (from Research)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **species_concepts** | concept_id (stable UUID), current_scientific_name, current_common_name, taxonomy_version | Stable identifier through splits/lumps |
| **species_names** | concept_id, name_type (scientific/common/colloquial), name, language, region | Many-to-one with concepts |
| **species_taxonomy** | concept_id, order, family, genus, avilist_id, wlab_id, ebird_code | Cross-reference to external systems |
| **species_media** | concept_id, media_type (photo/audio), url, attribution | Species identification aids |
| **species_seasonality** | concept_id, region_id, month, occurrence_rating | Regional timing charts |

**Key Constraint:** Always query by `concept_id`, never by name strings. Names can change; concepts persist.

### 5.8 Species Success Rate Schema (from Research)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **tour_sightings** | tour_id, species_concept_id, sighting_type (seen/heard), verified, reported_by | Individual sighting records |
| **sighting_verification** | sighting_id, verification_type (photo/ebird_link), evidence_url, verified_at | Verification evidence |
| **operator_success_rates** | operator_id, species_concept_id, success_rate, sample_size, last_updated | Calculated aggregate (materialized) |

**Calculation Logic:**
```sql
success_rate = (tours_with_sighting / total_tours_targeting_species)
WHERE sample_size >= 10
AND tour_date >= NOW() - INTERVAL '2 years'  -- recency weight
```

### 5.9 Operator Entity Schema (from Research)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **operators** | id, business_name, slug, description, profile_image_url, is_published, is_verified, created_at | Core business entity (separate from profiles) |
| **operator_members** | operator_id, profile_id, role (owner/admin/guide), invited_at, accepted_at | Team management join table |
| **operator_credentials** | operator_id, credential_type (license/certification/permit), document_url, status, expires_at, verified_by, rejection_reason | Verification workflow |
| **operator_regions** | operator_id, region_id, region_specific_permit_url | Multi-region support |
| **operator_stats** | operator_id, tours_completed, guests_served, repeat_customer_rate, avg_response_time, avg_rating, last_calculated | Trigger-maintained computed stats |

**RLS Policy Pattern:**
```sql
-- Public can see published, verified operators
SELECT * FROM operators WHERE is_published = true AND is_verified = true;

-- Operators see own data regardless of status
SELECT * FROM operators WHERE id IN (
  SELECT operator_id FROM operator_members WHERE profile_id = auth.uid()
);

-- Admins see all
SELECT * FROM operators WHERE auth.role() = 'admin';
```

**Trigger Pattern for Stats:**
```sql
-- On booking completion, update operator stats
CREATE TRIGGER update_operator_stats
AFTER INSERT OR UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION recalculate_operator_stats();
```

---

## 6. Admin/Operator Dashboard Implications

### 6.1 Operator Dashboard Surfaces

| Surface | Primary Data | Key Actions |
|---------|-------------|-------------|
| **Tour Management** | tours, reservations | Create tour, set threshold, view progress, manage participants |
| **Booking Progress** | reservations by status | Real-time threshold visualization |
| **Participant List** | profiles (committed users) | View compatibility signals, contact |
| **Revenue Dashboard** | reservations.deposit_*, stripe payouts | Track escrowed vs paid, payout schedule |
| **Profile Management** | operators, credentials, media | Update bio, upload verification docs |
| **Reviews & Reputation** | reviews, responses | Respond to reviews, view distribution |

### 6.2 Platform Admin Surfaces

| Surface | Primary Data | Key Actions |
|---------|-------------|-------------|
| **Operator Verification** | operators, operator_credentials | Review submissions, approve/reject |
| **Tour Oversight** | tours, reservations | Monitor threshold progress, handle disputes |
| **User Management** | profiles, strike_history | Tier adjustments, moderation |
| **Platform Metrics** | platform_metrics | Revenue, tour success rates, user growth |
| **Alerts** | alerts | System issues, fraud detection |
| **Audit Log** | admin_audit_log | Action history for compliance |

### 6.3 Critical UX Constraints for Dashboards

1. **No marketing language** — dashboards are operational tools, not sales surfaces
2. **Confirmation status prominent** — threshold progress visible at all times
3. **Financial clarity** — held vs charged, escrowed vs paid, always explicit
4. **Calm information density** — assume skeptical, thoughtful users
5. **Age-aware design** — 45-65+ operators need high contrast, large fonts
6. **No gamification** — revenue/booking counts are operational, not achievements

---

## Summary: What This Means for Dashboard Build

The research establishes that Quorum Tours exists to solve a **synchronization gap** through **threshold-based confirmation with held deposits**. Both dashboards must:

1. Make confirmation/threshold status the dominant visual element
2. Distinguish between held deposits and charged payments explicitly
3. Avoid any dark patterns, urgency mechanics, or gamification
4. Design for 45-65+ users with accessibility-first visual treatment
5. Surface trust through structure and evidence, never marketing claims
6. Support species-first discovery and chase list matching
7. Implement progressive disclosure (scan → evaluate → audit)

The operator dashboard is an **operational command center** for tour viability.
The admin dashboard is a **platform health monitor** for marketplace integrity.

---

## 8. Research Document Tracking

### Completed (docs/context/) — 5 files
- [x] quorum_tours_frontend_ux_synthesis_claude_build_guide.md
- [x] quorum_tours_industry_disruptor_brief.pdf
- [x] quorum_tours_operator_profile_ux_synthesis_claude_build_guide.md
- [x] quorum_tours_shared_operator_user_pain_point_ux_synthesis_claude_build_guide.md
- [x] quorum_tours_user_profile_progression_ux_synthesis_claude_build_guide.md

### Completed (research/) — 21 files
- [x] admin dashboard research claude.md
- [x] Admin Dashboard Research for Birding Platform.pdf
- [x] Birding Platform Profile UX Design.pdf
- [x] Birding tour operator market.md
- [x] Birding Tour Operators_ Needs, Challenges, and Opportunities.pdf
- [x] Birding SaaS Market Research & Strategy.pdf
- [x] Designing Chase Lists.md
- [x] Notification System Design for Birdwatching Tours.pdf
- [x] Birding Tours by Species + Success Rate_ Analysis.pdf
- [x] Birdwatching Platform Species Database.pdf
- [x] compass_artifact_wf-983459fa-8672-4707-9c9b-014a0458d8e8_text_markdown.md
- [x] compass_artifact_wf-c83191f3-b30a-401f-a1c9-15a495d68fad_text_markdown.md
- [x] Existing Practices & Gaps.pdf
- [x] Operator Profile Data Architecture.pdf
- [x] Operator Profile UX Research Design.pdf
- [x] Operator Public Profile Data Architecture for webird.ai.pdf
- [x] Part 1_ Operator Pain Points (Wildlife Tour Operators).pdf
- [x] Tour booking pain points - claude.md
- [x] Trust Signals for Tour Operators.md
- [x] User Profile and progrssion design.md
- [x] Wildlife Tour Platform Pain Points Research.pdf

### Missing (file not found)
- ~~Designing a Birdwatching Tour Platform's User Profile System.pdf~~ (does not exist)
