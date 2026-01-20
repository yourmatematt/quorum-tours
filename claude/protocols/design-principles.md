# Design Principles: Anti-Template Protocol

> **MANDATORY READING**: All UX, UI, and Design agents MUST read this document before generating ANY design, layout, or component. Failure to follow these principles will result in "Template Smell" — the subconscious signal that tells users a site was assembled from parts rather than designed for a purpose.

---

## The Core Problem

AI-generated websites trained on component libraries default to a **statistical mean of design decisions**. The result is the "Gray Goo" web — technically competent but aesthetically indistinguishable interfaces that erode brand trust.

**Template sites** = Container > Content (layout exists first, content poured in)
**Bespoke sites** = Content > Container (message dictates form)

Your job is to design like the latter, not the former.

---

## The Template-Likeness Score (TLS)

**Self-evaluate every design. Score > 40 requires revision.**

| Category | Weight | Template (10) | Bespoke (0) |
|----------|--------|---------------|-------------|
| Layout Rhythm | 25% | Predictable section heights; standard 12-col everywhere; no overlapping | Varied density; full-bleed mixed with container; intentional asymmetry |
| Copy Specificity | 20% | "Unlock," "Elevate"; no numbers; generic references | Specific dates, locations, prices, named case studies, "truthful" friction |
| Component DNA | 20% | Standard cards; default radii; unstyled scrollbars | Custom cursors; "broken" grid cards; distinct hover physics; branded tokens |
| Proof Density | 15% | Logo wall only; generic 5-star quotes | Video testimonials; detailed case studies; certifications with license numbers |
| Typography | 10% | Inter/Roboto only; standard scale (H1 is 2x H2) | Display serif/mono pairing; aggressive scale (H1 is 6x H2); custom kerning |
| Interaction | 10% | Default CSS transition; no scroll-triggered motion | Parallax; sticky scrolling; mouse-aware elements; motion libraries |

---

## NON-NEGOTIABLE DON'Ts (The Kill List)

### Layout & Structure

1. **DO NOT** use more than 2 consecutive "Card Grid" sections
   - Break rhythm with full-width text or split-panel sections

2. **DO NOT** end a Hero section with a hard line at the fold
   - Next section must peek up or overlap

3. **DO NOT** use transparent header unless Hero is dark/image-heavy
   - Use solid, distinct header for content-heavy pages

4. **DO NOT** use predictable background alternation (White → Gray → White → Dark)
   - Vary section padding; group related sections into visual "chapters"

5. **DO NOT** center text blocks longer than 3 lines
   - Left-align by default

6. **DO NOT** use the "Symmetric Sandwich" (Center text → Center image → Center text)
   - Force asymmetry; offset images with bleeds

7. **DO NOT** use standard navigation labels ("Home, Features, Pricing, Contact")
   - Use action-oriented labels ("Find a Store" vs "Locations")

### Components

8. **DO NOT** use the "Row of 4 Icons" pattern unless custom-illustrated
   - Use Feature Lists with screenshots instead

9. **DO NOT** use default `shadow-lg` for card separation
   - Use `border` or colored shadows (`shadow-blue-500/20`)

10. **DO NOT** use uniform border radius (`rounded-lg` on everything)
    - Mix radii: pill buttons + sharp cards create hierarchy

11. **DO NOT** use the "Three-Column Feature Ghetto"
    - Don't let grid dictate content; use 2/3 + 1/3 splits or alternating layouts

12. **DO NOT** use default "Lift and Shadow" hover effect on cards
    - Use internal element changes (link color, border, reveal button)

13. **DO NOT** use generic "Accordion" arrows
    - Use +/- signs or custom chevrons

### Content & Copy

14. **DO NOT** use these words in ANY heading:
    - "Unlock", "Unleash", "Elevate", "Supercharge", "Empower", "Facilitate", "Optimize"
    - These are high-frequency LLM tokens that signal AI generation

15. **DO NOT** use exclamation marks in H1s or H2s
    - Use periods for authority

16. **DO NOT** use "Contact Us" as a section header
    - Use "Start your Project" or "Get a Quote"

17. **DO NOT** write generic copy like:
    - "We provide top-tier services for our clients"
    - "Your trusted partner for excellence"
    - Any sentence without a number, date, or proper noun

18. **DO NOT** hide business friction
    - Explicitly state constraints: "Min budget $5k", "Waitlist: 2 weeks", "License #305428C"

### Imagery & Visuals

19. **DO NOT** use "Undraw" or flat vector people (purple skin, giant limbs)
    - Use real photography or abstract geometric patterns

20. **DO NOT** use floating gradient blur blobs (the "SaaS 2.0" aurora effect)
    - Use sharp, defined shapes or noise textures

21. **DO NOT** use "Laptop with App Screenshot" mockup unless creatively cropped/skewed

22. **DO NOT** use Inter, Roboto, or Open Sans exclusively
    - Pair a distinct Display font (Serif or Brutalist Sans) with neutral body font

### Trust & Proof

23. **DO NOT** use grayscale logo walls without context
    - Add: "Trusted by X for [specific task]" and link to case studies

24. **DO NOT** use generic testimonials ("Great service!")
    - Require: Full name, role, company, AND specific outcome

---

## NON-NEGOTIABLE DO's (The Bespoke Signals)

### Layout & Structure

1. **DO** vary vertical padding
   - `py-32` for impact sections, `py-12` for dense data sections

2. **DO** allow elements to "bleed" across the fold
   - Use negative margin on hero images; next section header peeks up

3. **DO** break the grid intentionally
   - Use negative margins, z-index layering, CSS Grid named areas
   - Elements should overlap; images should bleed off-screen

4. **DO** use the "Deep Footer" pattern for local SEO
   - Massive footer with directories, service links, resources

5. **DO** group related sections into visual "chapters" sharing backgrounds

### Components

6. **DO** use asymmetrical border radii for brand distinctiveness
   - Example: `rounded-tl-2xl rounded-br-2xl`

7. **DO** implement "Scroll Progress" indicator for long pages

8. **DO** use "Type as Image" for at least one major section
   - Headlines as primary graphic element: aggressive sizing, tight leading

9. **DO** create "Accordion Lists" for services
   - Horizontal bars that expand; background changes based on active item

10. **DO** use the "Proof Ticker" pattern
    - Auto-scrolling marquee of specific proof points, not just logos

11. **DO** embed interactive utility in Heroes
    - Calculators, search bars, visualizers — immediate value

### Content & Copy

12. **DO** use "Construction Verbs":
    - Build, Fix, Deploy, Audit, Design, Write, Sketch, Ship, Launch

13. **DO** include a number, date, or proper noun in EVERY H2
    - "Saved 847 hours in 2025" not "Save time"

14. **DO** include "Business Reality" friction:
    - Service fees, license numbers, response times, waitlist length, minimum budgets

15. **DO** use the "Specifics Only" rule:
    - BAD: "We provide top-tier services for our clients"
    - GOOD: "We provide Level 2 ASP Electrical work for strata managers in Sydney"

### Typography

16. **DO** define semantic tokens that force branding:
    ```javascript
    fontFamily: {
      display: ['"Fraunces"', 'serif'],
      body: ['Inter', 'system-ui'],
    }
    ```

17. **DO** use aggressive typographic scale
    - H1 should be 4-6x body size, not 2x

18. **DO** use distinct Display fonts for headlines
    - Serif, Brutalist Sans, or custom typeface

### Proof Depth Framework

19. **DO** follow this hierarchy (higher = better):
    - Level 1 (Weak): Logo wall — avoid unless paired with higher levels
    - Level 2 (Better): Testimonials with full name, role, company
    - Level 3 (Strong): Testimonials with specific outcomes ("Saved 10hrs/week")
    - Level 4 (Strongest): Evidence blocks — screenshots, analytics, photos

20. **DO** use "Process Proof" if client proof is limited
    - Show how you work: screen recordings, sketches, methodology

---

## Section Sequencing Recipes

**DO NOT** use the default: Hero → Feature Grid → Testimonial → CTA

### Recipe A: Trust-First (Local Services)

Best for: Plumbers, Electricians, Lawyers, Local Businesses

1. **Hero**: Emergency hook + Phone + Service Area
2. **Proof Bomb**: Ticker of certifications, license numbers, job count
3. **Service Grid**: Visual selector to filter intent
4. **Humanizer**: Owner photo + "Letter from Founder"
5. **Local SEO Footer**: Deep suburb/district links

### Recipe B: Problem-Agitation (SaaS, B2B)

Best for: Software, Productivity Tools, B2B Services

1. **Hero**: Interactive demo OR "Old Way vs New Way" split
2. **Agitation Block**: Dark section highlighting pain points
3. **Solution Reveal**: Screenshot solving that exact pain
4. **Social Proof**: "Used by teams at X, Y, Z" (evidentiary)
5. **Pricing**: Simple comparison with clear CTA

### Recipe C: Portfolio Narrative (Creative, Agency)

Best for: Design Studios, Architects, Photographers

1. **Hero**: Full-screen video reel (minimal/no text)
2. **Selected Works**: Large, asymmetrical project list (NOT grid cards)
3. **Philosophy**: Typography-heavy manifesto section
4. **Capabilities**: Detailed technical list (for SEO/procurement)
5. **Contact**: "Start a Project" contextual form

---

## Component Transformation Examples

### Hero Section

- **Template**: Centered H1 + Subhead + 2 Buttons + Dashboard Screenshot
- **Bespoke**: Left-aligned serif H1 "Task management for teams who hate Jira" + email input + cropped screenshot inviting scroll + live user count badge

### Services Section

- **Template**: Grid of 3 Cards with Icons
- **Bespoke**: Accordion list — horizontal bars expand on hover, background changes per active item, includes pricing context

### Trust Section

- **Template**: "Trusted by" + 5 Grayscale Logos
- **Bespoke**: Proof Ticker mixing logos with outcome badges ("400% ROI", "Award Winner 2025"), clicking opens case study modal

### Contact Section

- **Template**: Generic form (Name, Email, Message)
- **Bespoke**: "Who should contact us?" checklist + operating hours + physical map + budget range selector

---

## Pre-Design Checklist

Before generating ANY design, verify:

- [ ] Have I selected a Section Sequencing Recipe (A, B, or C)?
- [ ] Does every H2 contain a number, date, or proper noun?
- [ ] Have I banned "Unlock/Unleash/Elevate/Supercharge" from all copy?
- [ ] Am I using a Display font for headlines (not just Inter)?
- [ ] Do I have at least one "grid-breaking" element (overlap, bleed, asymmetry)?
- [ ] Is my proof at Level 3+ (outcomes, not just names)?
- [ ] Have I included "business reality" friction details?
- [ ] Does my hover effect change internal elements (not just lift+shadow)?
- [ ] Have I varied section padding (not uniform `py-20` everywhere)?
- [ ] Does content bleed across the fold to encourage scrolling?

---

## Confidence Check

After generating a design, score it against the TLS rubric.

**Score > 40 = REJECT and redesign**
**Score 20-40 = REVISE specific template signals**
**Score < 20 = APPROVED for implementation**

---

*This protocol is derived from forensic analysis of websites comparing AI-generated templates against award-winning bespoke designs. The patterns identified represent statistically significant divergence between "template smell" and "intentional design."*
