# TLS Component Rubrics — Standardized Scoring by Component Type

> **Purpose**: Provides component-specific TLS rubrics with adjusted weight distributions based on component function. Each component type has different priorities — a Hero section emphasizes typography and copy, while a Card component emphasizes interaction and proof density.

---

## Overview

The general TLS rubric assigns equal weights across categories. Component-specific rubrics redistribute weights to match what matters most for that component type.

### General TLS Categories (Reference)

| Category | General Weight | Description |
|----------|----------------|-------------|
| Layout Rhythm | 25% | Grid usage, spacing variance, asymmetry |
| Copy Specificity | 20% | Numbers, dates, outcomes vs generic words |
| Component DNA | 20% | Custom elements, hover physics, branded tokens |
| Proof Density | 15% | Evidence depth, testimonials, certifications |
| Typography | 10% | Font pairing, scale aggressiveness |
| Interaction | 10% | Scroll effects, mouse-aware, motion |

---

## 1. Hero Components

**Target TLS: < 20**

Heroes are first impressions. Typography and copy dominate.

### Weight Distribution

| Category | Weight | Rationale |
|----------|--------|-----------|
| Typography | 25% | Hero headlines MUST use aggressive scale |
| Copy Specificity | 25% | Above-fold copy must hook with specifics |
| Layout Rhythm | 20% | Full-bleed, bleeds, overlaps critical |
| Component DNA | 15% | Custom badges, scroll indicators |
| Proof Density | 10% | Stats, certifications above fold |
| Interaction | 5% | Subtle scroll cues only |

### Scoring Rubric

**Typography (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Uses display font + clamp() sizing (4-6x body), tight leading |
| 6-12 | Display font present but standard scale (2x body) |
| 13-20 | Single font family, conventional sizing |
| 21-25 | Inter/Roboto only, no scale variance |

**Copy Specificity (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Headline has number + specific outcome + location/entity |
| 6-12 | Has specific elements but some generic words |
| 13-20 | Mostly generic with one specific element |
| 21-25 | "Welcome to [Brand]", "Unlock your potential" |

**Layout Rhythm (0-20)**
| Score | Criteria |
|-------|----------|
| 0-4 | Full-bleed image, content bleeds across fold, asymmetric positioning |
| 5-10 | Good use of space but contained to viewport |
| 11-15 | Standard centered layout, no fold interaction |
| 16-20 | Generic hero with hard fold line |

**Component DNA (0-15)**
| Score | Criteria |
|-------|----------|
| 0-3 | Custom badges, icons, scroll indicator designed for brand |
| 4-8 | Some custom elements mixed with defaults |
| 9-12 | Mostly default shadcn/Tailwind components |
| 13-15 | Pure template components, no customization |

**Proof Density (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Stats inline with headline, certification visible |
| 3-5 | Stats present but separated from main flow |
| 6-8 | Logo or badge present but not prominent |
| 9-10 | No proof above fold |

**Interaction (0-5)**
| Score | Criteria |
|-------|----------|
| 0-1 | Subtle scroll indicator, fade on scroll |
| 2-3 | Some motion but not distracting |
| 4-5 | Static hero or overly animated |

---

## 2. Card Components

**Target TLS: < 20**

Cards are conversion elements. Interaction and proof density dominate.

### Weight Distribution

| Category | Weight | Rationale |
|----------|--------|-----------|
| Interaction | 25% | Cards MUST have bespoke hover states |
| Proof Density | 20% | Cards show progress, status, urgency |
| Component DNA | 20% | Custom badges, progress bars, icons |
| Layout Rhythm | 15% | Internal card layout, not page rhythm |
| Typography | 10% | Price display, status text |
| Copy Specificity | 10% | Labels should be outcome-focused |

### Scoring Rubric

**Interaction (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Internal element changes (image zoom, border color, text reveal) |
| 6-12 | Some internal motion but subtle |
| 13-20 | Basic scale/opacity change |
| 21-25 | Lift + shadow hover (kill list violation) |

**Proof Density (0-20)**
| Score | Criteria |
|-------|----------|
| 0-4 | Progress bar + count + urgency indicator + avatar(s) |
| 5-10 | Two of: progress, count, urgency |
| 11-15 | Basic status indicator only |
| 16-20 | No progress or social proof |

**Component DNA (0-20)**
| Score | Criteria |
|-------|----------|
| 0-4 | Custom progress bar (thick, animated), branded badges, custom icons |
| 5-10 | Some custom elements, mostly defaults |
| 11-15 | Standard shadcn card with minor tweaks |
| 16-20 | Pure default card component |

**Layout Rhythm (0-15)**
| Score | Criteria |
|-------|----------|
| 0-3 | Varied internal spacing, image bleeds/overlaps |
| 4-8 | Good spacing but conventional structure |
| 9-12 | Standard card layout (image-header-body-footer) |
| 13-15 | Template card with no variation |

**Typography (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Price in mono, status in distinct weight, labels purposeful |
| 3-5 | Some typographic variety |
| 6-8 | Single font treatment throughout |
| 9-10 | Default text styling |

**Copy Specificity (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | "4 birders committed" not "4/6 spots" |
| 3-5 | Has numbers but generic labels |
| 6-8 | "Status", "Progress" labels |
| 9-10 | "Learn More" CTA |

---

## 3. Trust/Proof Sections

**Target TLS: < 18**

Trust sections must feel authentic. Proof density and copy dominate.

### Weight Distribution

| Category | Weight | Rationale |
|----------|--------|-----------|
| Proof Density | 35% | This IS the proof section |
| Copy Specificity | 25% | Names, outcomes, credentials |
| Layout Rhythm | 15% | Asymmetric grids, photo placement |
| Component DNA | 10% | Custom trust badges, icons |
| Typography | 10% | Quote styling, attribution |
| Interaction | 5% | Scroll-triggered reveals |

### Scoring Rubric

**Proof Density (0-35)**
| Score | Criteria |
|-------|----------|
| 0-7 | Level 4: Evidence blocks (screenshots, analytics, photos) |
| 8-14 | Level 3: Specific outcomes ("Saved 847 hours") |
| 15-21 | Level 2: Full attribution (name, role, company) |
| 22-28 | Level 1: Logo wall only |
| 29-35 | No proof or fake testimonials |

**Copy Specificity (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Named people + credentials + specific story |
| 6-12 | Names and credentials but generic quotes |
| 13-18 | Generic praise with some attribution |
| 19-25 | "Great service!" style quotes |

**Layout Rhythm (0-15)**
| Score | Criteria |
|-------|----------|
| 0-3 | Asymmetric grid, photos breaking grid, varied sizing |
| 4-8 | Good layout but symmetric |
| 9-12 | Standard testimonial carousel |
| 13-15 | Grid of identical quote cards |

**Component DNA (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Custom trust badges, certification icons |
| 3-5 | Some custom elements |
| 6-8 | Default star ratings, quote marks |
| 9-10 | Generic blockquote styling |

**Typography (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Pull quotes with serif, attribution in distinct style |
| 3-5 | Some typographic hierarchy |
| 6-8 | Uniform styling |
| 9-10 | Default text throughout |

**Interaction (0-5)**
| Score | Criteria |
|-------|----------|
| 0-1 | Scroll-triggered stagger reveals |
| 2-3 | Fade in on scroll |
| 4-5 | No animation or distracting carousel |

---

## 4. Process/How-It-Works Sections

**Target TLS: < 18**

Process sections explain the model. Component DNA and copy dominate.

### Weight Distribution

| Category | Weight | Rationale |
|----------|--------|-----------|
| Component DNA | 30% | Custom icons and visual connections |
| Copy Specificity | 25% | Outcomes, not just process steps |
| Layout Rhythm | 20% | Visual flow between steps |
| Typography | 10% | Step numbers, headlines |
| Proof Density | 10% | Mini-proof per step |
| Interaction | 5% | Step progression |

### Scoring Rubric

**Component DNA (0-30)**
| Score | Criteria |
|-------|----------|
| 0-6 | Custom illustrated icons, visual connectors between steps |
| 7-15 | Some custom icons but standard connectors |
| 16-22 | Lucide icons with standard layout |
| 23-30 | Numbered boxes with no visual interest |

**Copy Specificity (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Each step has outcome focus + specific example |
| 6-12 | Mix of outcome and process language |
| 13-18 | Process-focused ("Step 1: Sign up") |
| 19-25 | Generic "Easy steps" language |

**Layout Rhythm (0-20)**
| Score | Criteria |
|-------|----------|
| 0-4 | Steps connected visually, asymmetric layout |
| 5-10 | Good layout but conventional flow |
| 11-15 | Standard 3-column process grid |
| 16-20 | Generic stepper UI |

**Typography (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Step numbers as design element, bold outcomes |
| 3-5 | Some variation |
| 6-8 | Uniform step styling |
| 9-10 | Default numbered list |

**Proof Density (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Each step includes mini-proof (stat, example) |
| 3-5 | Some steps have proof |
| 6-8 | Proof only in final step |
| 9-10 | No proof in process section |

**Interaction (0-5)**
| Score | Criteria |
|-------|----------|
| 0-1 | Staggered reveal as user scrolls |
| 2-3 | Fade in effect |
| 4-5 | Static or overly complex animation |

---

## 5. Footer Components

**Target TLS: < 15**

Footers anchor the page. Layout and component DNA dominate.

### Weight Distribution

| Category | Weight | Rationale |
|----------|--------|-----------|
| Layout Rhythm | 30% | Deep footer pattern, column variety |
| Component DNA | 25% | Newsletter form, social links, badges |
| Copy Specificity | 20% | Local SEO, contact details |
| Typography | 10% | Link styling, logo treatment |
| Proof Density | 10% | Certifications, badges |
| Interaction | 5% | Newsletter validation, back-to-top |

### Scoring Rubric

**Layout Rhythm (0-30)**
| Score | Criteria |
|-------|----------|
| 0-6 | Deep 4+ column footer, varied column widths, generous spacing |
| 7-15 | 3-4 columns with good structure |
| 16-22 | Standard 3-column footer |
| 23-30 | Single row or minimal footer |

**Component DNA (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Custom newsletter form, branded social icons, badges |
| 6-12 | Some custom elements |
| 13-18 | Default shadcn form and icons |
| 19-25 | Plain text links only |

**Copy Specificity (0-20)**
| Score | Criteria |
|-------|----------|
| 0-4 | Full address, local areas served, license numbers |
| 5-10 | Some specifics (address, areas) |
| 11-15 | Generic links only |
| 16-20 | "Home | About | Contact" links |

**Typography (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Section headers, link hierarchy, copyright styling |
| 3-5 | Some typographic variety |
| 6-8 | Uniform link styling |
| 9-10 | Default text |

**Proof Density (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Certifications, awards, partnership logos |
| 3-5 | Some badges |
| 6-8 | Copyright only |
| 9-10 | No footer proof |

**Interaction (0-5)**
| Score | Criteria |
|-------|----------|
| 0-1 | Newsletter inline validation, smooth back-to-top |
| 2-3 | Basic form behavior |
| 4-5 | No interactive elements |

---

## 6. CTA/Conversion Sections

**Target TLS: < 20**

CTA sections drive action. Copy and interaction dominate.

### Weight Distribution

| Category | Weight | Rationale |
|----------|--------|-----------|
| Copy Specificity | 30% | CTA must be action-specific |
| Interaction | 25% | Button states, form feedback |
| Typography | 20% | CTA prominence, hierarchy |
| Layout Rhythm | 10% | Section positioning, whitespace |
| Component DNA | 10% | Button styling, form design |
| Proof Density | 5% | Mini-proof before CTA |

### Scoring Rubric

**Copy Specificity (0-30)**
| Score | Criteria |
|-------|----------|
| 0-6 | Action + outcome + specific ("Join 847 members saving 10hrs/week") |
| 7-15 | Action-focused but generic outcome |
| 16-22 | "Get Started", "Learn More" |
| 23-30 | "Submit", "Click Here" |

**Interaction (0-25)**
| Score | Criteria |
|-------|----------|
| 0-5 | Loading states, success feedback, micro-animations |
| 6-12 | Good hover/active states |
| 13-18 | Basic button states |
| 19-25 | No interactive feedback |

**Typography (0-20)**
| Score | Criteria |
|-------|----------|
| 0-4 | CTA text large and bold, supporting copy distinct |
| 5-10 | Good hierarchy |
| 11-15 | Standard button sizing |
| 16-20 | CTA doesn't stand out |

**Layout Rhythm (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Strategic placement, generous whitespace |
| 3-5 | Good positioning |
| 6-8 | Standard section |
| 9-10 | Lost in page flow |

**Component DNA (0-10)**
| Score | Criteria |
|-------|----------|
| 0-2 | Custom button design, form styling |
| 3-5 | Some customization |
| 6-8 | Default components |
| 9-10 | Unstyled elements |

**Proof Density (0-5)**
| Score | Criteria |
|-------|----------|
| 0-1 | Mini-stat or testimonial before CTA |
| 2-3 | Some supporting proof |
| 4-5 | No proof near CTA |

---

## Quick Reference Table

| Component Type | Target TLS | Dominant Categories | Key Differentiators |
|----------------|------------|---------------------|---------------------|
| Hero | < 20 | Typography (25%), Copy (25%) | Aggressive scale, specific headline |
| Card | < 20 | Interaction (25%), Proof (20%) | Internal hover, progress display |
| Trust Section | < 18 | Proof (35%), Copy (25%) | Level 3+ proof, named credentials |
| How-It-Works | < 18 | DNA (30%), Copy (25%) | Custom icons, outcome focus |
| Footer | < 15 | Layout (30%), DNA (25%) | Deep footer, local SEO |
| CTA Section | < 20 | Copy (30%), Interaction (25%) | Action + outcome text |

---

## Usage

When evaluating a component:

1. Identify component type from table above
2. Use type-specific rubric weights
3. Score each category using rubric criteria
4. Sum weighted scores
5. Compare to target TLS for that type
6. If over target, identify highest-scoring categories and fix

---

*Component rubrics ensure scoring accuracy by weighting what matters most for each component's function.*
