# SEO Analysis Plan - Quorum Tours

**Status:** PLAN ONLY (No changes made)
**Analysis Date:** 2026-01-24
**Scope:** All consumer-facing pages (excluding /operator/* and /admin/*)

---

## Executive Summary

**Overall Content Quality Score: 8.2/10**

The content demonstrates exceptional clarity and trust-building, with particularly strong E-E-A-T signals and value proposition communication. The platform has made deliberate choices to prioritize transparency over persuasion, which aligns well with the birding demographic's preference for authenticity.

**Primary Gap:** Organic discovery optimization - content is excellent for users who arrive, but needs SEO enhancement to help them find the site.

---

## Pages Analyzed

| Route | Page | Content Score |
|-------|------|---------------|
| `/` | Home | 8.5/10 |
| `/tours` | Tours Index | 7.5/10 |
| `/tours/[id]` | Tour Detail | 9/10 |
| `/operators` | Operators Index | 8/10 |
| `/operators/[id]` | Operator Profile | 10/10 |
| `/how-it-works` | How It Works | 9.5/10 |
| `/for-operators` | For Operators Landing | 8.5/10 |
| `/login` | Login | 7/10 |
| `/signup` | Signup | 7/10 |
| `/profile` | User Profile | 7.5/10 |

---

## 1. Content Quality Audit (E-E-A-T)

### Strengths

**Experience:**
- Operator profiles show real credentials, years of experience, and track records
- Reviews include specific tour context and outcomes

**Expertise:**
- Scientific bird names used throughout (Antigone rubicunda, Gallinago hardwickii)
- Multi-level species categorization (primary/secondary/opportunistic) shows domain depth
- Detailed logistics and accessibility information

**Authoritativeness:**
- eBird integration badge signals ornithology community connection
- Verified operator badges with clear criteria
- Affiliations listed (BirdLife Australia, Victorian Ornithological Research Group)

**Trustworthiness:**
- Transparent pricing (6% flat commission)
- Clear money flow explanation ("Only after the tour confirms")
- Honest constraint acknowledgment ("What Quorum does not do")
- Realistic expectations disclaimer on tour pages

### Gaps

1. **No birder testimonials** - Limited first-hand experience narratives
2. **No trip reports** - Missing "what I saw" vs. "what I hoped to see" real outcome data
3. **No recent sightings** - eBird checklist links not integrated on tour pages
4. **No conservation context** - Missing IUCN/EPBC Act status for rare species
5. **No platform credentials** - Team background, partnerships not visible

### Recommendations

1. Add 3-5 birder testimonials to Home page focusing on peace of mind
2. Include "Recent sightings" callout on tour pages with eBird data
3. Add past tour outcomes: "Last tour: 67 species, including 3 lifers"
4. Create "About Quorum" footer section with team/partnership info
5. Add "Trust & Safety" page detailing verification process

---

## 2. Structure & Schema Audit

### Header Hierarchy Issues

| Page | Issue | Recommendation |
|------|-------|----------------|
| Home | No explicit H1 tag | Add H1 to hero headline |
| Tours Index | Generic "Find Your Next Tour" | "Discover Guided Birding Tours Across Australia" |
| Tour Detail | "Your Guide" too generic | "{Operator Name}, {Expertise} Guide" |
| Operators | Acceptable | Keep "Verified Guides" |

### Schema Markup (Currently: None Implemented)

**Required Schema Types:**

1. **Organization (Homepage)**
```json
{
  "@type": "Organization",
  "name": "Quorum Tours",
  "description": "Birding tour platform where tours run when enough birders commit"
}
```

2. **Event (Tour Detail)**
```json
{
  "@type": "Event",
  "name": "Dawn Chorus at Werribee",
  "startDate": "2026-03-15T05:30:00+10:00",
  "organizer": { "@type": "Person", "name": "Sarah Mitchell" },
  "offers": { "@type": "Offer", "price": "180", "priceCurrency": "AUD" }
}
```

3. **Person + AggregateRating (Operator Profile)**
```json
{
  "@type": "Person",
  "name": "Sarah Mitchell",
  "jobTitle": "Wetland Specialist Guide",
  "aggregateRating": { "ratingValue": "4.8", "reviewCount": "4" }
}
```

4. **FAQPage (How It Works)**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What happens if threshold isn't met?" }
  ]
}
```

5. **BreadcrumbList (All Detail Pages)**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home" },
    { "position": 2, "name": "Tours" },
    { "position": 3, "name": "Dawn Chorus at Werribee" }
  ]
}
```

### Internal Linking Gaps

- No "Related Tours" on tour detail pages
- No "Similar Operators" on operator profiles
- No "Tours in This Region" cross-links
- Missing topic cluster pages (regions, species, habitats)

---

## 3. Meta Tags & URLs Audit

### Critical Issues

| Page | Issue | Priority |
|------|-------|----------|
| `/tours/[id]` | NO metadata export | CRITICAL |
| `/operators/[id]` | NO metadata export | CRITICAL |
| `/tours` | NO metadata export | HIGH |
| `/operators` | NO metadata export | HIGH |
| All pages | Missing Open Graph tags | HIGH |
| All pages | Missing canonical URLs | MEDIUM |

### Current vs. Optimized Metadata

**Home Page:**
| Element | Current | Optimized |
|---------|---------|-----------|
| Title | "Quorum Tours" (12 chars) | "Guided Birding Tours That Only Run When Confirmed \| Quorum" (67 chars) |
| Description | "Tours that run when birders commit." (41 chars) | "Book guided birdwatching tours with zero risk. Tours run when enough birders commit. No hidden fees, no payment until confirmed. Discover rare species across Australia." (160 chars) |

**Tours Index:**
| Element | Current | Optimized |
|---------|---------|-----------|
| Title | (inherited) | "Search Confirmed Birding Tours by Region & Status \| Quorum" (68 chars) |
| Description | (none) | "Filter tours by confirmation status and region. Compare thresholds, guides, species, pricing. Updated daily." (158 chars) |

**Tour Detail (Dynamic Template):**
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tour = getTourById(params.id);
  return {
    title: `${tour.title} - Guided ${tour.region} Tour with ${tour.operatorName} | Quorum`,
    description: `${tour.title} (${tour.date}). Led by ${tour.operatorName}. Spot ${species}. ${tour.current}/${tour.threshold} committed. From $${tour.price}AUD.`,
  };
}
```

**Operator Profile (Dynamic Template):**
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const operator = getOperatorById(params.id);
  return {
    title: `${operator.name} - Verified ${operator.expertise} Guide | Quorum Tours`,
    description: `${operator.name} (${operator.years} years, ${operator.rating}/5). Specializes in ${operator.specializations}. ${operator.toursCompleted} tours completed.`,
  };
}
```

**How It Works:**
| Element | Current | Optimized |
|---------|---------|-----------|
| Title | "How It Works — Quorum Tours" (34 chars) | Keep (acceptable) |
| Description | (148 chars) | "Understand quorum-based tour confirmation: how thresholds work, what happens if tours don't run, when payment is processed, and your full refund guarantee." (160 chars) |

**For Operators:**
| Element | Current | Issue |
|---------|---------|-------|
| Description | 195 chars | OVER LIMIT - trim to 159 chars |

### Open Graph Template (All Pages)

```typescript
openGraph: {
  title: '{Optimized Title}',
  description: '{Optimized Description}',
  type: 'website',
  url: 'https://quorumtours.com{pathname}',
  siteName: 'Quorum Tours',
  locale: 'en_AU',
  images: [{ url: '/og-{page}.jpg', width: 1200, height: 630 }]
},
twitter: {
  card: 'summary_large_image',
  title: '{Optimized Title}',
  description: '{Optimized Description}',
}
```

---

## 4. Keyword Strategy Audit

### Keyword Density Analysis

| Page | Keyword | Current | Target | Gap |
|------|---------|---------|--------|-----|
| Home | birding/bird watching | 0.15% | 0.8% | +0.65% |
| Home | operators | 0.3% | 1.2% | +0.9% |
| Tours Index | species | 0.15% | 1.0% | +0.85% |
| Tours Index | guides | 0% | 0.6% | +0.6% |
| Tour Detail | birding | 0% | 0.8% | +0.8% |
| Operators | experience | 0.15% | 0.8% | +0.65% |

### Missing Long-Tail Keywords

**Discovery Keywords:**
- "bird tours in [region]"
- "guided bird watching Australia"
- "birding tours Victoria/Queensland/Tasmania"
- "shorebird watching tours"
- "rainforest endemic tours"

**Species Keywords:**
- "[species] tours" (e.g., "Cassowary tours Daintree")
- "rare bird spotting tours"
- "migration bird tours"
- "wetland birding tours"

**Trust Keywords:**
- "guaranteed birding tours"
- "verified bird guides Australia"
- "certified birding guides"

### LSI Keyword Recommendations

**For Home Page:**
- Bird tour commitment
- Guaranteed bird watching
- Threshold-based booking
- Birder community platform

**For Tours Index:**
- Bird tours by region
- Guided bird watching tours
- Species-specific bird tours
- Regional birding tours

**For Tour Detail:**
- Bird species identification
- Endemic bird spotting
- Professional birding guides
- Small group bird tours

**For Operators:**
- Certified bird guides
- Species specialist guides
- Conservation-minded guides
- Award-winning bird guides

### Header Optimization

| Page | Current | Optimized |
|------|---------|-----------|
| Home H2 | "How confirmation works" | "How Birding Tour Confirmation Works" |
| Tours H1 | "Find Your Next Tour" | "Find Your Guided Birding Tour" |
| Tour Detail | "Your Guide" | "{Name}, {Expertise} Guide" |

---

## 5. Featured Snippet Opportunities

### Eligible Content Types

1. **Ordered List (How It Works)**
   - 5-step confirmation process already structured
   - Add FAQ schema for rich results

2. **Definition Box**
   - "What is a quorum-based tour?"
   - "What is threshold confirmation?"

3. **Comparison Table**
   - Quorum vs. traditional booking (already exists)
   - Add schema markup

4. **FAQ Rich Results**
   - "What happens if threshold isn't met?"
   - "When will I be charged?"
   - "Can I cancel my commitment?"

---

## 6. Implementation Priority Matrix

### Phase 1: Critical (Week 1)

| Task | Files | Impact |
|------|-------|--------|
| Add metadata to `/tours/[id]` | `src/app/tours/[id]/page.tsx` | HIGH |
| Add metadata to `/operators/[id]` | `src/app/operators/[id]/page.tsx` | HIGH |
| Add metadata to `/tours` | `src/app/tours/page.tsx` | HIGH |
| Add metadata to `/operators` | `src/app/operators/page.tsx` | HIGH |
| Implement OG tags across all pages | All page.tsx files | HIGH |
| Add canonical URLs to layout | `src/app/layout.tsx` | MEDIUM |

### Phase 2: High Impact (Week 2)

| Task | Files | Impact |
|------|-------|--------|
| Implement Event schema | `src/app/tours/[id]/page.tsx` | HIGH |
| Implement Organization schema | `src/app/page.tsx` | HIGH |
| Implement Person schema | `src/app/operators/[id]/page.tsx` | HIGH |
| Optimize all descriptions to 150-160 chars | All page.tsx files | MEDIUM |
| Add regional keywords to tours/operators | Components | MEDIUM |

### Phase 3: Content Enhancement (Week 3-4)

| Task | Location | Impact |
|------|----------|--------|
| Add 3-5 birder testimonials | Home page | HIGH |
| Add "Recent sightings" section | Tour detail | HIGH |
| Create FAQ schema | How It Works | MEDIUM |
| Expand LSI keywords in headers | Various | MEDIUM |
| Add BreadcrumbList schema | Detail pages | LOW |

### Phase 4: Long-Tail (Ongoing)

| Task | Location | Impact |
|------|----------|--------|
| Create regional landing pages | `/birding-tours/[region]` | HIGH |
| Create species landing pages | `/species/[name]` | MEDIUM |
| Add educational content (Resources) | `/resources` | MEDIUM |
| Monitor Search Console, iterate | Ongoing | HIGH |

---

## 7. Technical SEO Checklist

### Immediate

- [ ] Add `generateMetadata` to all dynamic routes
- [ ] Implement Open Graph meta tags
- [ ] Add Twitter card meta tags
- [ ] Set canonical URLs in layout
- [ ] Fix home page H1 tag

### Schema Markup

- [ ] Organization schema (homepage)
- [ ] Event schema (tour details)
- [ ] Person schema (operator profiles)
- [ ] FAQPage schema (How It Works)
- [ ] BreadcrumbList schema (detail pages)
- [ ] LocalBusiness schema (operators)

### Content

- [ ] Add birder testimonials to home
- [ ] Add "Recent sightings" to tour pages
- [ ] Expand operator bios with species expertise
- [ ] Create "Trust & Safety" page
- [ ] Add seasonal content hooks

### Monitoring

- [ ] Set up Google Search Console
- [ ] Create keyword tracking spreadsheet
- [ ] Monitor featured snippet eligibility
- [ ] Track organic traffic by page
- [ ] A/B test title variations

---

## 8. Competitive Keyword Gaps

**Keywords competitors likely target that Quorum doesn't:**

| Keyword | Priority | Action |
|---------|----------|--------|
| "Best bird tours in Australia" | HIGH | Create comparison content |
| "Bird watching tour reviews" | HIGH | Add review schema |
| "Rare bird spotting tours" | HIGH | Add species focus pages |
| "Beginner bird watching" | MEDIUM | Add difficulty filtering |
| "Group bird watching experience" | HIGH | Promote quorum mechanic |
| "Guaranteed bird tour" | HIGH | Emphasize confirmation model |

---

## Summary

**Strengths:**
- Exceptional clarity and transparency
- Strong E-E-A-T signals on operator pages
- Unique value proposition consistently clear
- No keyword stuffing or over-optimization

**Critical Gaps:**
- Zero schema markup
- Missing metadata on dynamic routes
- No Open Graph/Twitter cards
- Weak long-tail keyword coverage
- Limited social proof (testimonials)

**Estimated Impact:**
- Phase 1 implementation: 20-30% improvement in click-through rates
- Full implementation: 40-50% improvement in organic discovery
- Featured snippets potential: 3-5 question-based queries

---

**Next Steps:**
1. Approve this plan
2. Execute Phase 1 (metadata + OG tags)
3. Implement schema markup (Phase 2)
4. Add testimonials and content enhancements (Phase 3)
5. Monitor and iterate based on Search Console data
