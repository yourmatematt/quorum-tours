# JOURNEY-GAP-001: Journey Coverage Analysis

**Status:** ANALYSIS COMPLETE
**Date:** 2026-01-22
**Analyst:** Claude Code (Research + Gap Analysis)

---

## Executive Summary

Phase 1 build (Home, Tours Index, Tour Detail, Operator Profile) provides **complete journey coverage for established listers** but has **critical gaps for operators and new wave birders**. The existing public discovery pages deliver strong trust signals, transparent threshold mechanics, and credibility evaluation—precisely what experienced birders need before committing to expensive tours. However, operators lack the trust-building surfaces to evaluate platform legitimacy, and new wave birders encounter intimidation barriers that contradict the platform's accessibility promise.

**Key Findings:**
- **Operators:** Missing trust calibration pages explaining the quorum model, operator onboarding clarity, and direct "why this platform" messaging. Current pages speak to birders, not guides.
- **Established Listers:** Journey is complete. All critical decision points (guide credibility, tour confirmation certainty, species probability, group composition) are addressed.
- **New Wave Birders:** Accessibility messaging exists but is buried under lister-optimized content. Missing beginner-specific entry points, "vibe-first" navigation, and explicit "no experience required" signaling.

**Verdict:** Phase 1 is **NEEDS ADDITIONS** before proceeding to Phase 3 styling. Critical operator trust gap must be filled; new wave birder experience enhancements are important but could defer to Phase 2+ with messaging adjustments.

---

## Research Sources

### Journey Mapping Documents
1. `research/journeys/Operator Journey Mapping for Quorum Tours.md` — Comprehensive operator journey from discovery through financial realization, focusing on digital concierge needs for 45-70 demographic
2. `research/journeys/Birding Tour Platform Journey Analysis.md` — Detailed established lister (serious birder) journey covering discovery through advocacy, emphasizing trust signals and booking paralysis
3. `research/journeys/New Birder Journey Mapping.md` — New wave birder (25-45) journey analysis covering TikTok discovery, imposter syndrome barriers, and wellness motivations

### Pain Point Research
4. `research/pain-points/Tour booking pain points - claude.md` — Segment-specific pain points with emotional narratives for all three audiences (30+ documented friction points)

### Trust Signal Research
5. `research/operators/Trust Signals for Tour Operators.md` — Premium birding tour trust architecture, review psychology, and operator positioning strategies

### Page Structure Reference
6. `docs/wireframes.md` — Complete page structure specification for all Quorum pages including Phase 1 and Phase 2 surfaces

---

## Journey Map: Operators

### Journey Stages & Phase 1 Touchpoints

| Stage | Operator Need | Phase 1 Pages Involved | Gaps Identified |
|-------|---------------|------------------------|-----------------|
| **Discovery & Trust Calibration** | Understand the quorum model; verify platform legitimacy; see value proposition for small operators | Home (partial), How It Works (Phase 2) | **CRITICAL:** No operator-specific landing page explaining "digital concierge" model, escrow protection, threshold mechanics from operator POV |
| **Credibility Assessment** | See if platform understands birding industry; evaluate if "serious" operators use platform; assess platform maturity | Operator Profile (as user-facing output) | **CRITICAL:** No operator-facing trust signals (ATTA badges, financial protection explanation, testimonials from guides) |
| **Onboarding Evaluation** | Understand verification requirements; assess time commitment for profile setup; evaluate payment/escrow mechanics | None | **CRITICAL:** No "How to Get Started as an Operator" surface explaining KYC/KYB, verification process, profile builder |
| **Risk Assessment** | Verify financial protection (escrow vs wallet); understand payout schedules; assess platform commission transparency | None | **CRITICAL:** No transparent explanation of financial mechanics, milestone releases, Stripe Connect integration |
| **Campaign Feasibility** | See examples of successful threshold campaigns; understand pricing calculator; assess marketing/sharing tools | Tour Detail (birder-facing mechanics visible) | **IMPORTANT:** Tour Detail shows threshold progress but not operator creation tools; no "Profit Calculator Wizard" mentioned in research |

### Critical Gaps for Operators

**SEVERITY: CRITICAL**

The current Phase 1 build is entirely birder-facing. Operators have zero entry points to evaluate platform viability. Research documents emphasize:

1. **"Concierge Onboarding" Requirement** — Operators aged 45-70 require human-centric support and clear documentation before trusting digital financial tools. Research: "A 15-minute video call where a Quorum support agent walks the operator through the document upload process establishes a human connection and builds the trust necessary for the operator to hand over banking details."

2. **Financial Protection Transparency** — Research emphasizes "Trust Account" terminology over "Escrow," visibility of FDIC/Trust My Travel protection, explicit "Funds held in Trust until departure" messaging. **Current implementation:** None visible.

3. **"Digital Concierge" Value Proposition** — Operators need to see Quorum as business intelligence partner (profit calculator, threshold optimization) not just booking software. **Current implementation:** Threshold mechanic visible to birders but not explained to operators as risk mitigation tool.

**SEVERITY: IMPORTANT**

4. **Social Proof from Peers** — Research: "Showcase testimonials from guides with visible credentials (e.g., 'John Doe, WFR Certified, 20 years guiding in the Andes')." **Current implementation:** Operator profiles exist but no peer testimonials explaining why guides chose platform.

5. **Domain Expertise Signaling** — Research: "Use correct ornithological terminology... Avoid generic travel terms." **Current implementation:** Home and How It Works need audit for operator-facing sections to ensure birding-specific language (endemics, target species, ground agent).

### Recommendations for Operators

1. **Create `/for-operators` landing page** (Phase 2 addition):
   - Value proposition: "Stop gambling on tour viability. Commit to suppliers when birders commit to you."
   - Trust signals: ATTA badges, Trust My Travel financial protection, operator testimonials
   - Transparent economics: Commission structure, payout schedules, no hidden fees
   - Clear onboarding path: Verification requirements, profile setup wizard, support access

2. **Add "How to Get Started" operator guide** (could be subpage or content section):
   - KYC/KYB requirements pre-submission checklist
   - Verification timeline and process
   - Profile builder walkthrough
   - Stripe Connect explanation with "deposits only" reassurance

3. **Enhance How It Works page** with operator-facing section:
   - Current version addresses birders exclusively
   - Add "For Tour Operators" section explaining threshold mechanic from operator perspective
   - Show profit calculator concept (input costs → output pricing + minimum threshold)
   - Explain WhatsApp sharing, PDF flyer generation, dashboard traffic light system

---

## Journey Map: Established Listers

### Journey Stages & Phase 1 Touchpoints

| Stage | Lister Need | Phase 1 Pages Involved | Gaps Identified |
|-------|-------------|------------------------|-----------------|
| **Discovery (The Spark)** | Find tours by target species; verify platform legitimacy; see tour availability | Home, Tours Index | **MINOR:** Species-based search exists (filters) but not prominent; could enhance with "Search by target species" hero element |
| **Vetting (Scientific Review)** | Evaluate guide credentials; assess species probability; understand threshold mechanics; verify pricing transparency | Tour Detail, Operator Profile | None — comprehensive coverage |
| **Commitment (Booking Decision)** | Understand conditional payment; assess flight booking risk; verify cancellation policy; see who else is joining | Tour Detail, How It Works (Phase 2) | None — threshold mechanic well-explained |
| **Waiting Room (Pre-Confirmation)** | Track threshold progress; share with birding network; manage booking anxiety | Tour Detail (progress bar) | **MINOR:** No explicit "Share this tour" UI shown in Tour Detail spec |
| **Execution & Feedback** | Access trip details; provide reviews; evaluate next tours | None (future functionality) | Expected — not Phase 1 scope |

### Critical Assessment for Established Listers

**VERDICT: COMPLETE**

Phase 1 delivers all critical decision-support surfaces for experienced birders:

1. **Guide Identity Transparency** — Pain point: "They won't tell you who it is until you've paid." **Solution:** Operator Profile provides comprehensive guide bio, credentials, eBird integration, experience markers. Tour Detail links directly to guide profile.

2. **Tour Confirmation Certainty** — Pain point: "Don't book flights until we confirm 60 days out." **Solution:** Tour Detail displays threshold progress prominently ("4/6 committed"), explains conditional booking mechanic, clarifies when confirmation happens.

3. **Species Probability Data** — Pain point: "I need Harpy Eagle. What are my odds?" **Solution:** Tour Detail includes Target Species section with likelihood indicators (per wireframes.md spec).

4. **Hidden Costs Eliminated** — Pain point: "Trip looked cheap until I found meals aren't included." **Solution:** Tour Detail includes comprehensive "What's Included" section, single-supplement clarity, all-in pricing.

5. **Group Size Transparency** — Pain point: "Twelve participants made forest birding impossible." **Solution:** Tour Detail shows capacity limits, current participant count.

6. **Guide Substitution Prevention** — Pain point: "Booked for the guide, got someone else." **Solution:** Tour Detail explicitly names assigned guide with link to full profile.

### Minor Enhancements for Established Listers

**SEVERITY: MINOR (could defer to Phase 3 polish)**

1. **Species-Driven Discovery** — Research emphasizes birders search for "Shoebill" not "Uganda." Current Tours Index has species filters but could elevate to hero search: "Find tours by target species."

2. **Share Mechanics** — Research documents WhatsApp as primary communication channel for birding networks. Tour Detail could include explicit "Share this tour" button generating WhatsApp preview cards.

3. **Watcher List** — Research suggests "Allow users to 'Watch' a tour without backing. Display this number ('15 people watching this tour')." Could reduce booking hesitation by showing latent demand.

---

## Journey Map: New Wave Birders

### Journey Stages & Phase 1 Touchpoints

| Stage | New Birder Need | Phase 1 Pages Involved | Gaps Identified |
|-------|-----------------|------------------------|-----------------|
| **Discovery (Algorithmic Spark)** | Find tours via TikTok/Instagram; immediate "vibe check" that platform is for them; see beginner-friendly messaging | Home | **IMPORTANT:** Home speaks to "birders" generically; lacks explicit "new to birding?" pathway or beginner-welcoming hero message |
| **Barrier Assessment** | Confirm price accessibility; verify no expertise required; assess intimidation level | Tours Index, Tour Detail | **IMPORTANT:** Tours Index lacks "vibe-first" filters (e.g., "Relaxed Pace," "Photo-Friendly"); beginner reassurance buried in tour descriptions |
| **Social Fit Evaluation** | See other participants' age/experience level; confirm solo travelers welcomed; assess group vibe | Tour Detail | **CRITICAL:** No "Who's Going" transparency showing participant composition, age range, experience level |
| **Value Assessment** | Understand what they're getting; confirm guide is mentor not ID machine; see photography accommodation | Operator Profile, Tour Detail | **IMPORTANT:** Operator Profile emphasizes credentials (valuable for listers) but lacks beginner-focused messaging like "Why I love introducing newbies" |
| **Commitment (Low-Barrier Entry)** | Find short-duration options (2-3 hours); see weekend pricing ($50-100 range); confirm instant booking | Tours Index, Tour Detail | **CRITICAL:** No filters for duration or price range; unclear if platform serves half-day local experiences |

### Critical Gaps for New Wave Birders

**SEVERITY: CRITICAL**

1. **"Who's Going" Transparency Missing** — Research pain point: "You're 32. The Audubon walk is lovely people—your parents' age." Solution from research: "Show the 'Who.' 'Joining: 3 Solos, 1 Pair. Avg Age: 32.'" **Current implementation:** Tour Detail shows participant count for threshold but not composition.

**SEVERITY: IMPORTANT**

2. **Vibe-First Navigation Absent** — Research: "Replace the dominant 'Destination' search bar with 'Experience' pills: Morning Coffee, Sunset & Owls, Hiking, Social/Singles." **Current implementation:** Tours Index uses traditional destination/date/species filters.

3. **Beginner Welcoming Not Prominent** — Research pain point: "You imagine asking 'what's that bird?' and everyone turning to stare." Solution: "Explicitly welcoming tours. 'No experience required' that means it." **Current implementation:** Tour Detail may include skill level but not prominent beginner reassurance.

4. **Price/Duration Accessibility Unclear** — Research: "Most promoted tours are 7-14 days" at $3,000+. New wave needs "$50-100 weekend experiences." **Current implementation:** Tours Index lacks price/duration filters; unclear if platform serves this segment.

5. **Photography Needs Not Explicit** — Research: "Photo-friendly tours. Designated time for shots." **Current implementation:** Tour pacing mentioned but photography accommodation not called out.

### Important Gaps for New Wave Birders

**SEVERITY: IMPORTANT (messaging adjustments, not architectural changes)**

6. **Entry-Point Messaging** — Home page should fork early: "New to guided birding?" vs "Planning your next target species?" **Current implementation:** Single homepage serves all audiences.

7. **Operator Profile Humanization** — Research: "The profile should focus on personality. 'Why I love leading beginners,' 'Favorite bird snack,' 'My Spark Bird.'" **Current implementation:** Operator Profile emphasizes credentials and authority (correct for listers).

8. **Social Anxiety Mitigation** — Research: "Small, welcoming groups. Clear expectations communicated upfront. Beginner-friendly atmosphere as explicit policy." **Current implementation:** Group size visible but "vibe tags" (Chatty, Relaxed Pace, Instructional) absent.

### Recommendations for New Wave Birders

1. **Add "Who's Going" module to Tour Detail**:
   - Anonymized participant composition: "3 solos, 1 pair | Ages 28-35 | Mix of beginners and intermediate"
   - Experience level distribution: "2 first-time birders, 2 experienced"
   - Solo traveler signals: "Solo travelers welcomed—4 already joined"

2. **Enhance Tours Index with accessibility filters**:
   - Duration: Half-day, Full-day, Weekend, Multi-day
   - Price range: Under $100, $100-300, $300-500, $500+
   - Experience level: Beginner-friendly, All levels, Intermediate+
   - Vibe tags: Relaxed pace, Photo-friendly, Instructional, Social

3. **Add beginner pathway to Home**:
   - Hero could include "New to birding?" prominent CTA
   - Alternative: "Experience level" selector leading to tailored content
   - Copy adjustment: "Guided birding for people who thought it wasn't for them"

4. **Enhance Operator Profile with beginner-focused section**:
   - "Teaching Style" or "What I Love About Guiding"
   - Beginner testimonials if available
   - Gear loan/rental availability
   - Photography accommodation policy

5. **Add vibe indicators to Tour Detail**:
   - Activity level scale: Chill ←→ Sweat
   - Birding focus: Casual ←→ Lister
   - Social vibe: Quiet ←→ Chatty
   - Photography: Observe-only ←→ Capture-friendly

---

## Gap Analysis by Severity

### Critical Gaps

**CRITICAL-OP-001: No Operator Trust Calibration Surface**
- **Impact:** Operators cannot evaluate platform legitimacy or understand value proposition
- **Audience:** Tour operators
- **Evidence:** Research documents require "discovery phase must effectively dismantle skepticism through aggressive trust signaling and clear value articulation"
- **Recommendation:** Create `/for-operators` landing page with trust signals, financial protection explanation, onboarding clarity
- **Blocks:** Operator acquisition; platform cannot grow without supply side

**CRITICAL-OP-002: No Operator Onboarding Documentation**
- **Impact:** Operators aged 45-70 require concierge-style guidance before trusting digital financial tools
- **Audience:** Tour operators
- **Evidence:** Research: "The UI should offer an option: 'Do it yourself' OR 'Schedule a Verification Call'"
- **Recommendation:** Add "How to Get Started" guide explaining KYC/KYB, verification timeline, Stripe Connect safety
- **Blocks:** Operator conversion; high abandonment risk at signup

**CRITICAL-NW-001: "Who's Going" Transparency Missing**
- **Impact:** New wave birders (especially solo travelers) cannot assess social fit, creating booking anxiety
- **Audience:** New wave birders (25-45)
- **Evidence:** Research pain point: "You're 32... you want to meet other birders who also discovered this through Instagram"
- **Recommendation:** Add participant composition module to Tour Detail
- **Blocks:** Solo traveler conversions; community-seeking demographic

**CRITICAL-NW-002: Price/Duration Accessibility Filters Absent**
- **Impact:** New wave birders cannot find entry-level experiences; platform appears exclusive
- **Audience:** New wave birders (25-45)
- **Evidence:** Research: "They operate in the $50-$500 spend bracket, seeking high-value 'micro-adventures'—day trips, weekend getaways"
- **Recommendation:** Add duration and price filters to Tours Index
- **Blocks:** New birder acquisition if platform only serves multi-day premium tours

---

### Important Gaps

**IMPORTANT-NW-001: Vibe-First Navigation Missing**
- **Impact:** New wave birders discover via social media, expect visual-first experience curation
- **Audience:** New wave birders (25-45)
- **Evidence:** Research: "Replace 'Destination' search with 'Experience' pills: Morning Coffee, Sunset & Owls, Hiking, Social/Singles"
- **Recommendation:** Add experience-based filtering to Tours Index
- **Severity Reasoning:** Workaround exists (text filters), but friction increases

**IMPORTANT-NW-002: Beginner Entry Point Not Prominent**
- **Impact:** Imposter syndrome prevents inquiries; platform feels expert-only
- **Audience:** New wave birders (25-45)
- **Evidence:** Research pain point: "Intimidation keeps beginners from even inquiring... 'Am I experienced enough?'"
- **Recommendation:** Add "New to birding?" pathway on Home with explicit reassurance
- **Severity Reasoning:** Content exists in tours but not surfaced early enough

**IMPORTANT-OP-001: Operator Social Proof Missing**
- **Impact:** Operators cannot see peer adoption; platform appears untested
- **Audience:** Tour operators
- **Evidence:** Research: "Showcase testimonials from guides with visible credentials"
- **Recommendation:** Add operator testimonials to `/for-operators` page or How It Works
- **Severity Reasoning:** Platform maturity signals exist elsewhere but not operator-facing

**IMPORTANT-NW-003: Operator Profile Lacks Beginner-Focused Messaging**
- **Impact:** New birders evaluate guides differently than listers; credentials alone don't reassure
- **Audience:** New wave birders (25-45)
- **Evidence:** Research: "Profile should focus on personality. 'Why I love leading beginners'"
- **Recommendation:** Add "Teaching Philosophy" or "Beginner Welcome" section to Operator Profile
- **Severity Reasoning:** Profile works for listers; enhancement for second audience

---

### Minor Gaps

**MINOR-EL-001: Species-First Search Not Prominent**
- **Impact:** Established listers search by target species but must use filters instead of hero search
- **Audience:** Established listers (45-65)
- **Evidence:** Research: "The 'Target' Filter: A user should be able to type 'Shoebill' and see every proposed tour"
- **Recommendation:** Elevate species search to Home hero or Tours Index top
- **Severity Reasoning:** Functionality exists via filters; UX optimization

**MINOR-EL-002: Share Mechanics Not Explicit**
- **Impact:** WhatsApp sharing (primary birding communication channel) requires manual link copying
- **Audience:** All audiences
- **Evidence:** Research: "WhatsApp Preview Cards... allows the operator to drop a professional-looking 'micro-ad' into their groups"
- **Recommendation:** Add "Share" button to Tour Detail generating WhatsApp-optimized preview
- **Severity Reasoning:** Tours are shareable; UI convenience

**MINOR-NW-001: Photography Accommodation Not Called Out**
- **Impact:** Photography-focused new birders unsure if tours accommodate their needs
- **Audience:** New wave birders (25-45)
- **Evidence:** Research pain point: "Photography needs dismissed as secondary"
- **Recommendation:** Add photography policy/accommodation to Tour Detail vibe indicators
- **Severity Reasoning:** Niche need; not blocking for majority

**MINOR-ALL-001: Watcher List Could Reduce Hesitation**
- **Impact:** Tours at 0% funding look "dead"; latent demand invisible
- **Audience:** All audiences
- **Evidence:** Research: "Allow users to 'Watch' a tour without backing. Display this number"
- **Recommendation:** Add "Watch this tour" feature showing interest count
- **Severity Reasoning:** Nice-to-have social proof enhancement

---

## Phase 1 Completeness Verdict

**STATUS: NEEDS ADDITIONS**

### Reasoning

Phase 1 was scoped as "Public Discovery + Operator Trust Surfaces" but only delivered the birder-facing half. Current implementation provides:

✅ **Complete journey for established listers** — All critical decision points (guide credibility, threshold mechanics, species probability, pricing transparency, group size) are addressed through Tour Detail and Operator Profile.

✅ **Threshold mechanic well-explained to birders** — Tour Detail and How It Works clearly communicate conditional booking, progress tracking, and confirmation triggers.

❌ **Zero operator-facing trust surfaces** — Operators have no entry point to evaluate platform viability, understand onboarding, or assess financial protection.

❌ **New wave birder accessibility undermined** — While platform claims inclusivity, beginner-specific entry points, vibe-first navigation, and social fit transparency are missing.

### Critical Path Forward

Before proceeding to Phase 3 (styling/polish), the following additions are required:

**Must Complete (Blocking):**
1. **Operator landing page** (`/for-operators`) — Trust calibration, value proposition, onboarding clarity
2. **Operator onboarding guide** — KYC/KYB requirements, verification process, financial protection explanation
3. **How It Works operator section** — Threshold mechanic from operator perspective, profit calculator concept, campaign management overview

**Should Complete (High Value):**
4. **"Who's Going" module** — Participant composition transparency for Tour Detail (addresses solo traveler anxiety)
5. **Tours Index accessibility filters** — Duration, price range, experience level, vibe tags
6. **Home beginner pathway** — "New to birding?" entry point with reassurance messaging

**Could Defer (Enhancement):**
- Species-first search prominence
- WhatsApp share button
- Photography accommodation indicators
- Watcher list feature

### Phase Integrity Assessment

The original Phase 1 scope included "Operator Trust Surfaces" per protocols.md:
> "Phase 1: Public Discovery + **Operator Trust Surfaces** (MVP)"

Current build delivers public discovery (birder-facing) but not operator trust surfaces. To maintain phase integrity, operator-facing pages must be completed before declaring Phase 1 complete.

---

## Recommended Actions

### Immediate (Before Phase 3)

1. **Create OPERATOR-LANDING-IA-001 task**
   - Page: `/for-operators`
   - Purpose: Operator trust calibration and value proposition
   - Sections: Platform value, trust signals, onboarding path, financial transparency
   - Reference: Research documents emphasize "concierge" positioning, financial protection visibility

2. **Create OPERATOR-ONBOARDING-IA-001 task**
   - Page: `/for-operators/get-started` or content section
   - Purpose: Pre-signup clarity on requirements and process
   - Sections: Verification checklist, timeline expectations, Stripe Connect explanation
   - Reference: Research pain point "friction of documentation" requires upfront transparency

3. **Enhance HOW-IT-WORKS-UI-001**
   - Add "For Tour Operators" section
   - Explain threshold mechanic from operator perspective (risk mitigation)
   - Show profit calculator concept, campaign management overview
   - Reference: Research "Digital Concierge" positioning

### High Priority (Phase 2 Enhancement)

4. **Enhance TOUR-DETAIL-UI-001** with "Who's Going" module
   - Display anonymized participant composition
   - Show age range, experience distribution, solo/pair breakdown
   - Reference: Research critical pain point for new wave birders

5. **Enhance TOURS-INDEX-UI-001** with accessibility filters
   - Duration filter (half-day, full-day, weekend, multi-day)
   - Price range filter
   - Experience level filter (beginner-friendly, all levels, intermediate+)
   - Vibe tags (relaxed, photo-friendly, instructional, social)
   - Reference: Research "vibe-first navigation" and price accessibility

6. **Enhance HOME-UI-001** with beginner pathway
   - Add "New to birding?" prominent CTA or experience selector
   - Link to beginner-filtered tours or dedicated landing page
   - Adjust hero copy to explicitly welcome newcomers
   - Reference: Research pain point "intimidation keeps beginners from inquiring"

### Medium Priority (Phase 3 or Later)

7. **Enhance OPERATOR-PROFILE-UI-001** with teaching philosophy
   - Add "About My Guiding" or "Teaching Style" section
   - Include beginner-focused testimonials if available
   - Reference: Research distinction between credentials (listers) vs personality (new birders)

8. **Add species-first search to HOME-UI-001 or TOURS-INDEX-UI-001**
   - Elevate species search to hero element or top filter
   - Reference: Research "Lister" mentality where "bird is the destination"

### Low Priority (Enhancements)

9. **Add share functionality to TOUR-DETAIL-UI-001**
   - WhatsApp-optimized share button
   - Generate preview cards with tour image, threshold progress
   - Reference: Research on WhatsApp as primary birding communication channel

10. **Add watcher/waitlist feature to TOUR-DETAIL-UI-001**
    - "Watch this tour" for non-committed interest
    - Display watcher count to show latent demand
    - Reference: Research on solving "empty restaurant" perception

---

## Conclusion

Phase 1 delivers exceptional journey coverage for established listers but leaves critical gaps for the other two primary audiences. The operator journey cannot begin without trust calibration pages, and the new wave birder journey faces unnecessary friction due to missing accessibility signals.

**Recommended path forward:**
1. Complete operator-facing pages (landing, onboarding guide, How It Works enhancement)
2. Add "Who's Going" transparency and accessibility filters to address new birder needs
3. Then proceed to Phase 3 styling/polish with complete audience coverage

This approach ensures Quorum Tours serves all three audiences before visual refinement, preventing the need for major structural additions during polish phase.
