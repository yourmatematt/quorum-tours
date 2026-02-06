# Quorum Tours — Explainer Video Production Guide

This document defines all explainer videos for the Quorum Tours website, including placement, concepts, component references, animations, and voiceover scripts.

**Last Updated:** 2026-02-06

---

## Table of Contents

1. [Video Overview](#video-overview)
2. [Animation Style Guide](#animation-style-guide)
3. [Distribution Strategy](#distribution-strategy)
4. [Website Integration](#website-integration)
5. [Video Specifications](#video-specifications)
6. [Production Notes](#production-notes)
7. [Implementation Checklist](#implementation-checklist)

---

## Video Overview

| # | Video Title | Page | Length | Priority | Animation Style |
|---|-------------|------|--------|----------|-----------------|
| 1 | What is Quorum? | Home (`/`) | 30-45s | P1 | Motion Graphics |
| 2 | Traditional vs Quorum | Home (`/`) | 45-60s | P2 | Hybrid |
| 3 | The Four-Step Journey | How It Works (`/how-it-works`) | 60-90s | P1 | Motion Graphics |
| 4 | Two Sides, One Solution | How It Works (`/how-it-works`) | 45s | P3 | Illustrated |
| 5 | The Three Pain Points | For Operators (`/for-operators`) | 60-90s | P1 | Illustrated |
| 6 | How Quorum Works for Operators | For Operators (`/for-operators`) | 90-120s | P2 | Motion Graphics |
| 7 | The 6% Promise | For Operators (`/for-operators`) | 30-45s | P3 | Motion Graphics |

---

## Animation Style Guide

### Why Animation (Not AI Avatars)

| Factor | Decision |
|--------|----------|
| **Content type** | Process/mechanic explanation → Animation excels |
| **Audience** | Birders + operators (50-70) → May distrust synthetic humans |
| **Brand values** | Trust, transparency → No fake humans |
| **Design system** | Organic, biophilic, illustrated → Animation extends naturally |
| **Longevity** | Animation ages well; AI avatars date quickly |

**Human presence:** Warm, trustworthy voiceover provides human connection without synthetic visuals.

---

### Style A: Motion Graphics

**Use for:** UI-focused explanations, mechanic walkthroughs, data visualization

```
Style:       Flat design with subtle depth and shadows
Motion:      Smooth easing (ease-out-cubic), satisfying micro-interactions
Icons:       Stylized versions of UI components (QuorumIndicator, buttons, cards)
People:      Simple, friendly silhouettes or minimal geometric figures
Colors:      Brand palette — forest green, gold, amber states
Typography:  Crimson Pro headlines, Atkinson Hyperlegible labels
```

**Reference styles:**
- Stripe explainer videos
- Notion product announcements
- Linear feature releases

**Assigned to:** Videos 1, 3, 6, 7

---

### Style B: Illustrated / Organic

**Use for:** Emotional content, pain points, human stories, nature connection

```
Style:       Soft edges, subtle textures, organic shapes
Motion:      Gentle, flowing, nature-paced transitions
Icons:       Hand-drawn feel birds, landscapes, expressive characters
People:      Warm, sketched characters with personality (not corporate clip-art)
Colors:      Softer brand palette, watercolor-inspired backgrounds
Typography:  Crimson Pro with hand-lettered accents where appropriate
```

**Reference styles:**
- Headspace meditation animations
- Mailchimp illustration system
- Patagonia brand storytelling

**Assigned to:** Videos 4, 5

---

### Style C: Hybrid

**Use for:** Videos that transition between emotional hook and UI demonstration

```
Mechanic scenes:    Clean motion graphics showing quorum system, UI
Human scenes:       Warm illustrations showing birders, operators, emotions
Transitions:        Organic morphs — illustrated elements simplify into motion graphics
```

**Assigned to:** Video 2

---

### Video-by-Video Style Assignment

| Video | Primary Style | Reasoning |
|-------|---------------|-----------|
| 1. What is Quorum? | Motion Graphics | Core mechanic, UI-focused, QuorumIndicator animation |
| 2. Traditional vs Quorum | Hybrid | Emotional comparison (illustrated) + solution demo (motion) |
| 3. Four-Step Journey | Motion Graphics | Process flow, step visualization, UI components |
| 4. Two Sides, One Solution | Illustrated | Birder/operator connection is emotional, human-centric |
| 5. Three Pain Points | Illustrated | Empathy-driven, needs warmth and personality |
| 6. Operator Workflow | Motion Graphics | Practical walkthrough, dashboard preview, technical |
| 7. The 6% Promise | Motion Graphics | Numbers, comparison table, data visualization |

---

## Distribution Strategy

### Hybrid Approach: Self-Hosted + YouTube

Videos are distributed through two channels for different purposes:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   SELF-HOSTED (Website)              YOUTUBE (Distribution)    │
│   ─────────────────────              ──────────────────────     │
│                                                                 │
│   • Premium, immersive experience    • Email clickable thumbs   │
│   • No ads, no distractions          • Search discovery (SEO)   │
│   • Responsive 1:1 / 16:9            • Shareable links          │
│   • User stays on site               • Analytics dashboard      │
│   • Full brand control               • Captions auto-generated  │
│                                                                 │
│   For: Website visitors              For: Emails, social,       │
│   already engaged                    external links, discovery  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Aspect Ratios

| Platform | Aspect Ratio | Dimensions |
|----------|--------------|------------|
| Website (desktop) | 16:9 | 1920x1080 (or 4K: 3840x2160) |
| Website (mobile) | 1:1 | 1080x1080 |
| YouTube | 16:9 | 1920x1080 minimum |
| Email thumbnail | 16:9 | 1280x720 (static image) |

**Production requirement:** Create true 1:1 crops for mobile, not letterboxed 16:9.

---

### File Structure

```
/public/videos/
├── what-is-quorum/
│   ├── what-is-quorum-16x9.mp4       # Desktop (self-hosted)
│   ├── what-is-quorum-1x1.mp4        # Mobile (self-hosted)
│   ├── poster-16x9.webp              # Desktop thumbnail
│   ├── poster-1x1.webp               # Mobile thumbnail
│   └── email-thumbnail.png           # YouTube/email preview (1280x720)
│
├── traditional-vs-quorum/
│   ├── traditional-vs-quorum-16x9.mp4
│   ├── traditional-vs-quorum-1x1.mp4
│   ├── poster-16x9.webp
│   ├── poster-1x1.webp
│   └── email-thumbnail.png
│
├── four-step-journey/
│   └── ...
│
├── two-sides-one-solution/
│   └── ...
│
├── three-pain-points/
│   └── ...
│
├── operator-workflow/
│   └── ...
│
└── six-percent-promise/
    └── ...
```

---

### YouTube Channel Structure

```
Quorum Tours (YouTube Channel)
│
├── Playlist: "How Quorum Works" (Consumer-facing)
│   ├── What is Quorum? (35s)
│   ├── Traditional vs Quorum (55s)
│   ├── The Four-Step Journey (80s)
│   └── Two Sides, One Solution (45s)
│
└── Playlist: "For Tour Operators"
    ├── The Three Pain Points (75s)
    ├── How Quorum Works for Operators (105s)
    └── The 6% Promise (40s)
```

---

### YouTube Video Description Template

```
[VIDEO TITLE] | Quorum Tours

[2-3 sentence description of video content]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 LINKS

Browse tours → https://quorumtours.com/tours
How it works → https://quorumtours.com/how-it-works
For operators → https://quorumtours.com/for-operators

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️ CHAPTERS

0:00 - Introduction
0:08 - [Chapter 2 title]
0:20 - [Chapter 3 title]
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABOUT QUORUM TOURS

Tours that run when birders commit. No gambling on viability.
No last-minute cancellations. Conditional commitment means
you're never charged for a tour that doesn't happen.

#birding #birdwatching #wildlifetours #australia
```

---

### Email Integration

Emails use static thumbnail images linking to YouTube:

```
┌────────────────────────────────────────────────────────────┐
│  EMAIL                                                     │
│                                                            │
│  Subject: "How Quorum Works (45 sec video)"                │
│                                                            │
│  ┌──────────────────────────────────────┐                  │
│  │  ▶                                   │ ← Static image   │
│  │     [PLAY BUTTON OVERLAY]            │   with play      │
│  │                                      │   button         │
│  └──────────────────────────────────────┘                  │
│  ↑ Clickable, links to YouTube                             │
│                                                            │
│  "See how birders are booking tours with zero risk..."     │
│                                                            │
│  [Browse Tours →]  ← Links to website                      │
└────────────────────────────────────────────────────────────┘
```

---

## Website Integration

### Integration Patterns by Section

| Section | Video | Pattern | Behavior |
|---------|-------|---------|----------|
| HeroSection | What is Quorum? | **Side-by-side** | Always visible; video left, text right (desktop) |
| ComparisonSection | Traditional vs Quorum | **Expandable** | Opt-in; comparison cards stay visible |
| MechanicSection | Four-Step Journey | **Inline anchor** | Always visible; between headline and steps |
| BenefitsSection | Two Sides, One Solution | **Expandable** | Opt-in; benefit cards are primary |
| ProblemStatement | Three Pain Points | **Inline anchor** | Always visible; after headline, before cards |
| HowItWorks (operators) | Operator Workflow | **Inline anchor** | Always visible; QuorumIndicator demo |
| TrustTransparency | The 6% Promise | **Expandable** | Opt-in; pricing card is the star |

---

### Responsive Video Component

```tsx
// src/components/ui/ResponsiveVideo.tsx

interface ResponsiveVideoProps {
  slug: string;                    // e.g., "what-is-quorum"
  title: string;                   // Accessible title
  posterDesktop?: string;          // Override poster
  posterMobile?: string;
}

// Usage:
<ResponsiveVideo
  slug="what-is-quorum"
  title="What is Quorum? (35 seconds)"
/>

// Auto-resolves to:
// Desktop: /videos/what-is-quorum/what-is-quorum-16x9.mp4
// Mobile:  /videos/what-is-quorum/what-is-quorum-1x1.mp4
// Posters: /videos/what-is-quorum/poster-16x9.webp (desktop)
//          /videos/what-is-quorum/poster-1x1.webp (mobile)
```

**Behavior:**
- Shows poster image until user clicks play
- Lazy loads video on interaction (no autoplay)
- Switches aspect ratio at `md` breakpoint (768px)
- Fixed aspect container prevents CLS

---

### SEO Preservation Rules

1. **Never hide text content when video plays**
   ```tsx
   // ❌ BAD
   {isPlaying ? <Video /> : <TextContent />}

   // ✅ GOOD
   <Video />
   <TextContent />  {/* Always in DOM, always crawlable */}
   ```

2. **Text first in DOM order**
   ```tsx
   <div className="grid md:grid-cols-2">
     <div className="order-2 md:order-1">  {/* Text: first in DOM */}
       <h1>...</h1>
       <p>...</p>
     </div>
     <div className="order-1 md:order-2">  {/* Video: positioned visually */}
       <ResponsiveVideo ... />
     </div>
   </div>
   ```

3. **Video titles are NOT headings**
   ```tsx
   <section>
     <h2>How Quorum Works</h2>        {/* SEO heading */}
     <p>Description...</p>            {/* SEO content */}
     <ResponsiveVideo
       title="Watch: The Four Steps"  {/* Label, not <h3> */}
     />
   </section>
   ```

4. **Add structured data for videos**
   ```tsx
   <script type="application/ld+json">
   {JSON.stringify({
     "@context": "https://schema.org",
     "@type": "VideoObject",
     "name": "How Quorum Works",
     "description": "Four steps to booking a tour on Quorum",
     "thumbnailUrl": "/videos/four-step-journey/poster-16x9.webp",
     "uploadDate": "2026-02-01",
     "duration": "PT1M30S",
     "contentUrl": "/videos/four-step-journey/four-step-journey-16x9.mp4"
   })}
   </script>
   ```

---

## Video Specifications

### Video 1: What is Quorum?

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | Home (`/`) |
| **Placement** | HeroSection (side-by-side) |
| **Length** | 30-45 seconds |
| **Tone** | Friendly, clear, reassuring |
| **Target Audience** | First-time visitors, birders unfamiliar with the concept |
| **Animation Style** | Motion Graphics |

#### Concept
A quick, animated introduction to the core quorum mechanic. Visually demonstrates how tours move from "forming" to "confirmed" as participants commit. Emphasizes zero risk until confirmation.

#### Scene Breakdown

##### Scene 1: The Problem (0:00-0:08)
**Visual:** Lone birder silhouette looking at a tour listing, question marks floating
**Animation:** Fade in birder (simple geometric figure), pulse question marks with ease-out
**Style notes:** Clean, minimal — silhouette is friendly not corporate
**Components:** None (abstract)

**V/O:**
> "You find the perfect birding tour. But will it actually run?"

##### Scene 2: The Quorum Concept (0:08-0:20)
**Visual:** Progress bar (styled exactly like `QuorumIndicator`) filling as birder icons join one by one
**Animation:**
- Progress bar starts at 0/6, styled with brand colors
- Birder icons appear one at a time with subtle bounce (ease-out-back)
- Bar fills incrementally: 1/6 → 2/6 → 3/6 → 4/6 → 5/6
- At 6/6: satisfying color shift from amber (forming) to green (confirmed)
- Micro-celebration: subtle particle burst or glow
**Style notes:** QuorumIndicator should be recognizable from website UI
**Components:**
- `QuorumIndicator` from `src/components/ui/QuorumIndicator.tsx`
- Status badge showing "Forming" → "Confirmed"

**V/O:**
> "On Quorum, tours run when enough birders commit. You join conditionally—your card is held, not charged."

##### Scene 3: The Guarantee (0:20-0:30)
**Visual:** Two outcomes side by side
- Left: Quorum reached → checkmark, "Tour Confirmed" badge, happy birder silhouette
- Right: Quorum not reached → "Full Refund" text, money icon animating back to wallet
**Animation:** Split screen reveal from center, icons animate in sequence
**Style notes:** Green confirmation side feels celebratory; refund side feels reassuring, not negative
**Components:**
- Confirmed status badge (green, from `TourStatesSection`)
- Refund messaging style from `HowItWorksSection` clarification card

**V/O:**
> "When quorum is reached, the tour is guaranteed. If not? Full refund. You never pay for a tour that doesn't happen."

##### Scene 4: CTA (0:30-0:35)
**Visual:** "Browse Tours" button with subtle glow, styled like site
**Animation:** Button pulses gently, abstract cursor hovers
**Style notes:** Gold button on forest green background — high contrast
**Components:** `Button` component with gold accent styling from `HeroSection`

**V/O:**
> "Browse tours. Commit with confidence."

---

### Video 2: Traditional vs Quorum

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | Home (`/`) |
| **Placement** | ComparisonSection (expandable panel) |
| **Length** | 45-60 seconds |
| **Tone** | Relatable, empathetic, then reassuring |
| **Target Audience** | Skeptical visitors, those who've had bad booking experiences |
| **Animation Style** | Hybrid (Illustrated → Motion Graphics) |

#### Concept
Side-by-side comparison of traditional tour booking versus the Quorum model. Uses the three comparison points from the site to show how Quorum shifts risk away from the participant.

#### Scene Breakdown

##### Scene 1: Traditional Problem 1 (0:00-0:12)
**Visual:** Split screen — left side shows traditional model
- Illustrated birder character packing bags excitedly
- Calendar with circled date
- Phone buzzes: "Tour cancelled — low turnout" notification
- Character's expression drops, shoulders slump
**Animation:** Warm illustration style; calendar flip, packing animation, notification slides in with slight shake
**Style notes:** Illustrated style for emotional resonance; character should feel relatable, not cartoonish
**Components:** Problem panel styling from `ComparisonSection` (muted background, "Traditional model" label)

**V/O:**
> "Traditional booking: You book a tour hoping others will too. Two days before departure... 'Sorry, not enough participants.' Your plans? Gone."

##### Scene 2: Quorum Solution 1 (0:12-0:20)
**Visual:** Right side illuminates — transition to motion graphics
- QuorumIndicator showing progress filling
- "Confirmed" badge appears with satisfying animation
- Same birder character, now confident (illustration simplifies into silhouette)
**Animation:** Cross-dissolve from illustrated to motion graphics; progress bar fills, badge slides in with checkmark
**Style notes:** Transition marks the shift from problem (illustrated, emotional) to solution (motion graphics, clear)
**Components:**
- Solution panel styling from `ComparisonSection` (green border, "Quorum model" label)
- `QuorumIndicator` component

**V/O:**
> "On Quorum, you know it's running before you commit fully. Confirmation is guaranteed before you travel."

##### Scene 3: Traditional Problem 2 (0:20-0:32)
**Visual:** Left side — operator perspective (illustrated)
- Operator character looking at half-empty tour vehicle
- Dollar signs floating away, fading out
- Stressed expression, hand on forehead
**Animation:** Illustrated style; empty seats highlight with subtle pulse, money floats off screen
**Style notes:** Empathy for operators too — they're not villains, they're also stuck in a bad system
**Components:** Problem panel styling

**V/O:**
> "For operators, it's worse. They guess at demand, book suppliers, and pray. Underbooked tours lose money. Overbooked tours decline in quality."

##### Scene 4: Quorum Solution 2 (0:32-0:40)
**Visual:** Right side — motion graphics
- QuorumIndicator at optimal level (7/6, green, confirmed)
- Operator silhouette with confident posture
- "Optimal group size" label appears
**Animation:** Indicator pulses green gently, operator nods
**Style notes:** Clean, confident motion graphics
**Components:** Solution panel styling, QuorumIndicator

**V/O:**
> "Quorum operators see real demand before committing resources. Every confirmed tour runs at the right size."

##### Scene 5: The Risk Shift (0:40-0:50)
**Visual:** Full screen — abstract motion graphics visualization
- "RISK" text block visualized as weight on birder silhouette's shoulders
- Weight lifts, moves to a "SYSTEM" platform
- Birder silhouette stands taller, lighter
**Animation:** Smooth weight transfer animation; birder stretches with relief
**Style notes:** Abstract but clear — the metaphor should land immediately
**Components:** None (abstract)

**V/O:**
> "The risk shifts from you to the system. You commit conditionally. The uncertainty is resolved before you're charged."

##### Scene 6: CTA (0:50-0:55)
**Visual:** "See How It Works" button
**Animation:** Button highlight, subtle glow
**Components:** Secondary button styling from `HeroSection`

**V/O:**
> "That's the Quorum difference."

---

### Video 3: The Four-Step Journey

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | How It Works (`/how-it-works`) |
| **Placement** | MechanicSection (inline anchor) |
| **Length** | 60-90 seconds |
| **Tone** | Educational, detailed, trustworthy |
| **Target Audience** | Interested visitors wanting to understand the full process |
| **Animation Style** | Motion Graphics |

#### Concept
A detailed walkthrough of the four-step quorum mechanic, using the exact steps and visual language from the MechanicSection. Shows both birder and operator perspectives at each step.

#### Scene Breakdown

##### Scene 1: Introduction (0:00-0:08)
**Visual:** "Four steps. That's it." headline animates in (Crimson Pro)
- Four numbered circles appear in a row with connecting line drawing between them
**Animation:** Text fade-up with slight Y translation, circles pop in sequence (staggered 150ms), line draws left-to-right
**Style notes:** Match exact layout from `MechanicSection` — horizontal flow with connecting line
**Components:** `MechanicSection` layout reference

**V/O:**
> "Booking a tour on Quorum works in four simple steps. No complexity. No surprises."

##### Scene 2: Step 1 — Tour Listed (0:08-0:22)
**Visual:**
- Step 1 circle highlights and enlarges (others dim slightly)
- Operator silhouette creates a tour listing
- Form fields animate in: species, dates, price, minimum participants
- "Minimum: 6 participants" badge appears with emphasis
**Animation:** Circle zoom with ease-out-back, form fields type in with cursor, badge slides in
**Style notes:** Form should feel simple, not overwhelming — emphasize ease of listing
**Components:**
- Step 1 icon (plus sign) from `MechanicSection`
- Tour creation concept from `for-operators/HowItWorks.tsx`

**V/O:**
> "Step one: An operator lists a tour. They set the species, dates, price, and critically—the minimum group size. That's the quorum."

##### Scene 3: Step 2 — Birders Commit (0:22-0:38)
**Visual:**
- Step 2 circle highlights
- Multiple birder silhouettes appear, each clicking "Commit"
- QuorumIndicator fills: 1/6 → 2/6 → 3/6 → 4/6
- "Refundable deposit" label with card icon showing "held" state
- Dollar amount appears as "held" (not "charged")
**Animation:** Birders pop in with bounce, indicator fills incrementally (satisfying progression), card icon pulses softly
**Style notes:** Emphasize the "held, not charged" distinction — this is the key trust moment
**Components:**
- Step 2 icon (people group) from `MechanicSection`
- `QuorumIndicator` in "forming" state (amber)
- Deposit messaging from `HowItWorksSection`

**V/O:**
> "Step two: Birders discover the tour and commit. Each pays a refundable deposit. Their card is held—not charged. They're signaling real intent without final commitment."

##### Scene 4: Step 3 — Quorum Reached (0:38-0:55)
**Visual:**
- Step 3 circle highlights
- QuorumIndicator approaches threshold: 5/6 → 6/6
- Hero moment: Color transition amber → green
- "Confirmed" badge appears with celebration particles
- Notification icons ping out to all participant silhouettes
- "Cards charged" indicator replaces "held"
**Animation:** Threshold crossing is THE moment — dramatic but tasteful color shift, subtle confetti/particles, notifications fly out radially
**Style notes:** This should feel like a satisfying achievement; the payoff for the buildup
**Components:**
- Step 3 icon (checkmark circle) from `MechanicSection`
- `QuorumIndicator` transition from forming to confirmed
- Status badge transition animation

**V/O:**
> "Step three: Quorum reached. The tour goes green. All participants are notified simultaneously. Now—and only now—cards are charged."

##### Scene 5: Step 4 — Tour Runs (0:55-1:08)
**Visual:**
- Step 4 circle highlights
- Scene transitions: silhouettes become more detailed
- Happy birders with binoculars in nature setting
- Operator confidently guiding, pointing at bird
- Bird silhouettes fly across background
- "Balance paid. Everyone goes birding." text
**Animation:** Soft transition to illustrated nature scene; figures animate subtly (binoculars raise, bird flies)
**Style notes:** Payoff moment — warmth, nature, the reason everyone's here
**Components:**
- Step 4 icon (binoculars) from `MechanicSection`
- Nature imagery consistent with `HeroSection` brand style

**V/O:**
> "Step four: The tour runs. The operator commits to suppliers with confidence. The participants have certainty. Everyone does what they came here to do."

##### Scene 6: The Safety Net (1:08-1:20)
**Visual:**
- Amber info box slides in from bottom (styled like refund guarantee box)
- "What if quorum isn't reached?" headline
- QuorumIndicator stuck at 4/6, deadline indicator passes
- Money icons animate back to birder silhouettes' wallets
- "Full refund. No questions." text emphasizes
**Animation:** Box slide-in, indicator fades to gray, refund animation (money returns)
**Style notes:** Reassuring, not disappointing — this is a feature, not a failure
**Components:**
- Refund guarantee box styling from `MechanicSection`
- Amber accent color (forming state)

**V/O:**
> "What if quorum isn't reached? The tour doesn't run. Your deposit is fully refunded. No questions. No fees. No awkward conversations. You're never charged for a tour that doesn't happen."

---

### Video 4: Two Sides, One Solution

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | How It Works (`/how-it-works`) |
| **Placement** | BenefitsSection (expandable panel) |
| **Length** | 45 seconds |
| **Tone** | Balanced, connecting, uplifting |
| **Target Audience** | Both birders and operators; visitors deciding which path to take |
| **Animation Style** | Illustrated |

#### Concept
A split-narrative video showing how Quorum benefits both sides of the marketplace, ultimately connecting them through aligned interests. Warm, illustrated style emphasizes human connection.

#### Scene Breakdown

##### Scene 1: Split Introduction (0:00-0:05)
**Visual:** Screen splits vertically with organic, slightly wavy divider
- Left: Soft green wash, illustrated binoculars icon, "For Birders" in Crimson Pro
- Right: Warm amber wash, illustrated compass/map icon, "For Operators"
**Animation:** Split reveals from center with gentle ease; icons draw in
**Style notes:** Illustrated style throughout — warm, human, approachable
**Components:**
- Two-column layout concept from `BenefitsSection`
- Icon headers from both benefit cards

**V/O:**
> "Quorum works for everyone."

##### Scene 2: Birder Benefits (0:05-0:18)
**Visual:** Left side expands, right dims slightly
- Illustrated birder character appears
- Checkmark items draw in one by one:
  - "Book with confidence — tours only run when confirmed"
  - "No last-minute cancellations ruining your plans"
  - "Full refund if quorum isn't reached"
- Character visibly relaxes, stress lines disappear, smile appears
**Animation:** Checkmarks draw in with hand-drawn feel (slight wobble), character animation is subtle but expressive
**Style notes:** Warm illustration; character should feel like a real person, not a mascot
**Components:** Benefits list from `BenefitsSection` birder card (green checkmarks)

**V/O:**
> "For birders: No more gambling on whether a tour runs. No more last-minute cancellations. If quorum isn't reached, you get a full refund."

##### Scene 3: Operator Benefits (0:18-0:32)
**Visual:** Right side expands, left dims slightly
- Illustrated operator character appears (slightly older, experienced feel)
- Checkmark items draw in:
  - "No more gambling on tour viability"
  - "Stop chasing payments — deposits collected automatically"
  - "Commit to suppliers when birders commit to you"
- Character gains confidence; laptop/spreadsheet clutter fades away, replaced by simple dashboard
**Animation:** Same hand-drawn checkmark style; clutter dissolves organically
**Style notes:** Operator character should feel wise, experienced — not tech-bro
**Components:** Benefits list from `BenefitsSection` operator card (amber checkmarks)

**V/O:**
> "For operators: No more gambling on viability. Deposits are collected automatically. You commit to suppliers only when birders commit to you."

##### Scene 4: The Connection (0:32-0:42)
**Visual:** Split merges to center
- Birder and operator characters walk toward each other
- They meet in the middle; QuorumIndicator appears between them, filled and green
- "Aligned interests" text appears below
- Background shifts to nature scene with both characters
**Animation:** Characters slide toward center; handshake or friendly nod; indicator glows warmly
**Style notes:** Emotional payoff — these two people are now connected through a fair system
**Components:** QuorumIndicator in confirmed state

**V/O:**
> "Both sides win when the tour confirms. Quorum aligns interests—birders get certainty, operators get commitment."

##### Scene 5: Dual CTA (0:42-0:45)
**Visual:** Two illustrated buttons side by side
- "Browse Tours →" (green, birder side)
- "List Your Tours →" (amber, operator side)
**Animation:** Buttons pulse alternately with soft glow
**Style notes:** Hand-drawn button style matching illustration aesthetic
**Components:** CTA buttons concept from `BenefitsSection`

**V/O:**
> "Find your side."

---

### Video 5: The Three Pain Points

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | For Operators (`/for-operators`) |
| **Placement** | ProblemStatement section (inline anchor) |
| **Length** | 60-90 seconds |
| **Tone** | Empathetic, authentic, relatable |
| **Target Audience** | Tour operators aged 50-70 who've experienced these frustrations |
| **Animation Style** | Illustrated |

#### Concept
Three short vignettes that speak directly to the pain points operators face. Uses the exact language from the ProblemStatement component to build emotional recognition before introducing Quorum's solutions. Warm illustration style builds trust with older audience.

#### Scene Breakdown

##### Scene 1: Introduction (0:00-0:08)
**Visual:** "You Became a Guide to Guide" headline (Crimson Pro, large)
- Subtext fades in: "Not to gamble on viability, chase payments, or drown in admin."
- Illustrated operator silhouette looking at horizon, binoculars around neck, nature background
**Animation:** Text fade-up with slight parallax; silhouette has subtle breathing animation
**Style notes:** Dignified, respectful — this person has expertise and deserves recognition
**Components:** `ProblemStatement` header styling

**V/O:**
> "You became a guide to guide. Not to gamble on viability. Not to chase payments. Not to drown in admin."

##### Scene 2: Pain Point 1 — The Deposit Gamble (0:08-0:28)
**Visual:**
- Illustrated operator at desk, warm lamp light
- Calculator, receipts scattered
- Supplier invoices appear and stack with weight: "Boat: $2,000" "Lodge: $1,500" "Catering: $500"
- Participant counter showing 3 of 6 needed (styled like QuorumIndicator but illustrated)
- Phone shows Facebook post with no engagement
- Operator's expression shows worry
**Animation:** Invoices stack with slight paper sound feel, counter stuck and pulsing red, phone notifications empty
**Style notes:** Relatable office scene; warm illustration prevents it feeling depressing
**Components:**
- Pain point card 1 content from `ProblemStatement`
- Wallet/money icon path reference

**V/O:**
> "The Deposit Gamble. You've paid the boat. The lodge. The catering. You need six participants. You have three. Now you're praying strangers find your Facebook post before you lose four thousand dollars."

**Solution reveal:**
**Visual:** Scene lightens; Quorum interface appears as illustrated screen — QuorumIndicator showing "Cards held, not charged"
**Animation:** Stress visually lifts from operator; interface slides in with calm ease
**Style notes:** Relief, not just solution — emotional shift

**V/O:**
> "On Quorum, tours only go live when they hit your minimum. Cards aren't charged until you're ready to run."

##### Scene 3: Pain Point 2 — The Admin Trap (0:28-0:48)
**Visual:**
- Split timeline illustration:
  - Left/Past: Young operator in field, binoculars raised, identifying warblers, joy on face
  - Right/Present: Same operator (older), buried in laptop, Gmail tabs, spreadsheets, coffee cups
- "30 years learning warblers" text on left
- "30 hours a week in Gmail" text on right
- Email notification icons pile up on right side
**Animation:** Timeline draws in; past side is warm and golden, present side is blue-lit and cluttered
**Style notes:** Poignant contrast; not making fun of the operator, honoring their expertise
**Components:**
- Pain point card 2 content from `ProblemStatement`
- Document/form icon path reference

**V/O:**
> "The Admin Trap. You spent thirty years learning to identify every warbler by ear. Now you spend thirty hours a week in Gmail. Chasing payments. Answering the same questions. Updating spreadsheets."

**Solution reveal:**
**Visual:** Laptop screen transforms — email clutter dissolves, clean Quorum dashboard appears showing automated bookings, confirmations
**Animation:** Clutter particles dissolve upward; clean UI fades in
**Style notes:** Simplicity as relief

**V/O:**
> "On Quorum, bookings, deposits, pre-trip info, and confirmations are all automated. You focus on guiding."

##### Scene 4: Pain Point 3 — The Invisible Expert (0:48-1:08)
**Visual:**
- Illustrated map of Australia with search queries floating: "Mallee Emu-wren tour" "Cassowary guided walk" "Plains-wanderer experience"
- Operator's listing shown as tiny dot, buried on page 10 of search results
- Facebook post illustration with 2 likes (from family members, shown as small hearts)
- "They can't find you" text
**Animation:** Search queries float hopefully; operator listing sinks in search results; social post gets ignored
**Style notes:** Frustrating but not hopeless — the queries prove demand exists
**Components:**
- Pain point card 3 content from `ProblemStatement`
- Search/magnifying glass icon path reference

**V/O:**
> "The Invisible Expert. There are birders right now searching for exactly what you offer. But they can't find you. You're not on the first page of Google. You're posting to Facebook and hoping."

**Solution reveal:**
**Visual:** Quorum search interface appears — birder types species name, operator's tour surfaces, notification pings to operator
**Animation:** Species search with autocomplete feel; match highlights; notification delivered with satisfying ping
**Style notes:** Connection moment — the right birder finds the right guide

**V/O:**
> "On Quorum, birders search by species. They get notified when you list a tour matching their chase list. They find you."

##### Scene 5: Closing (1:08-1:15)
**Visual:** Three illustrated solution cards arrange side by side, all with green checkmarks
- "Quorum mechanics" / "Automated admin" / "Species discovery"
- Operator character reappears, now in the field again, guiding
**Animation:** Cards align with satisfying snap; checkmarks appear; operator is back where they belong
**Style notes:** Full circle — back to guiding
**Components:** Solution styling from pain point cards ("On Quorum" sections)

**V/O:**
> "Three problems. One platform. Built for guides who want to guide."

---

### Video 6: How Quorum Works for Operators

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | For Operators (`/for-operators`) |
| **Placement** | HowItWorks section (inline anchor) |
| **Length** | 90-120 seconds |
| **Tone** | Practical, professional, reassuring |
| **Target Audience** | Operators evaluating whether to list their tours |
| **Animation Style** | Motion Graphics |

#### Concept
A detailed, operator-focused walkthrough showing exactly what they'll experience when using Quorum. Uses the QuorumIndicator visualization and emphasizes the "cards held, not charged" → "cards charged" transition. Clean motion graphics build confidence in the system.

#### Scene Breakdown

##### Scene 1: Introduction (0:00-0:08)
**Visual:** "How Quorum Works" headline (Crimson Pro)
- Subtext: "Four steps. No surprises. Every tour that reaches Quorum runs."
- Operator silhouette with confident posture
**Animation:** Text fade-up, silhouette appears with subtle nod
**Style notes:** Professional, clean motion graphics; confidence without arrogance
**Components:** `HowItWorks` section header from for-operators

**V/O:**
> "Here's exactly how Quorum works for operators. Four steps. No surprises."

##### Scene 2: Step 1 — List Your Tour (0:08-0:28)
**Visual:**
- Clean tour creation form animates in (motion graphics UI)
- Fields fill in naturally: "Pelagic Seabird Charter" / "May 15-17, 2026" / "$850 per person"
- Minimum participants slider: adjusts to 6
- Maximum participants slider: adjusts to 8
- "No complex forms. No 47-field dashboards." text appears
**Animation:** Form fields type with realistic cursor; sliders adjust with satisfying snap
**Style notes:** Emphasize simplicity — form should feel fast, not bureaucratic
**Components:**
- Step 1 card from `for-operators/HowItWorks.tsx`
- Number badge (1) in brand green

**V/O:**
> "Step one: List your tour. Tell us what you're running—species, dates, price, minimum participants. That's it. No complex forms. No forty-seven-field dashboards."

##### Scene 3: Step 2 — Birders Commit (0:28-0:50)
**Visual:**
- Tour listing appears in Quorum search results (motion graphics UI)
- Birder silhouette with "Mallee Emu-wren" on their chase list gets notification ping
- Birder clicks "Commit" — card icon animates to show "held" state
- QuorumIndicator fills incrementally: 0/6 → 1/6 → 2/6 → 3/6 → 4/6
- "Cards held, not charged" label prominent throughout
**Animation:** Search result highlights; notification ping with ripple; indicator fills with satisfying progression; card icon pulses softly in "held" state
**Style notes:** The "held, not charged" distinction must be crystal clear — this is the trust moment
**Components:**
- Step 2 card from `for-operators/HowItWorks.tsx`
- `QuorumIndicator` in forming state (4/6, amber)
- Example from `HowItWorks`: "Pelagic charter — 6 minimum, 8 maximum"

**V/O:**
> "Step two: Birders discover your tour. Those chasing your target species get notified. When they book, their card is held—not charged. You see real commitment building, not just wishful clicks."

##### Scene 4: Step 3 — Quorum Reached (0:50-1:12)
**Visual:**
- QuorumIndicator approaches threshold: 5/6 (one more needed)
- Final birder commits: 6/6
- HERO MOMENT: Color transition amber → green
- "Quorum Reached" badge appears with tasteful celebration (particles, glow)
- All participant card icons switch from "held" to "charged" simultaneously
- Notification to operator: "Your tour is confirmed!"
- Money flow visualization: held deposits flow into operator account
**Animation:** Threshold crossing is cinematic but tasteful — color shift, badge pop, synchronized charge animation, money flow diagram
**Style notes:** This is the payoff — satisfying, reassuring, trustworthy
**Components:**
- Step 3 card from `for-operators/HowItWorks.tsx`
- `QuorumIndicator` transition from forming (amber) to confirmed (green)
- Side-by-side example visualization from `HowItWorks` section

**V/O:**
> "Step three: Quorum reached. The moment you hit your minimum, the tour goes green. All participants are notified. All cards are charged simultaneously. The money is coming—guaranteed."

##### Scene 5: Step 4 — You Guide (1:12-1:30)
**Visual:**
- Operator silhouette confidently making phone call (to suppliers)
- Checkmark appears: "Commit to suppliers with confidence"
- Scene transitions: operator now in nature, guiding group
- Happy participant silhouettes with binoculars
- "The participants are confirmed. The deposits are in."
- Operator points at bird; participants look through binoculars
**Animation:** Confidence builds through posture; phone call is brief and easy; transition to nature is warm
**Style notes:** The whole point — back to guiding, back to nature
**Components:**
- Step 4 card from `for-operators/HowItWorks.tsx`
- Nature imagery consistent with brand

**V/O:**
> "Step four: You guide. Now you can commit to your suppliers with confidence. The participants are confirmed. The deposits are in. Do what you love. Do what you're great at."

##### Scene 6: The Quorum Meter Explained (1:30-1:45)
**Visual:**
- Close-up of QuorumIndicator component (exactly matching website)
- Labeled diagram appears:
  - Arrow pointing to filled portion: "Current participants"
  - Arrow pointing to threshold line: "Quorum (minimum)"
  - Arrow pointing to total bar: "Maximum capacity"
- Two states shown side by side:
  - Left: "Forming" (4/6) — amber, "Cards held, not charged" label
  - Right: "Confirmed" (7/6) — green, "Cards charged" label
**Animation:** Labels appear with draw-in effect; states toggle to show difference clearly
**Style notes:** Educational, clear — this UI element will be familiar when they use the site
**Components:**
- `QuorumIndicator` from `src/components/operator/QuorumIndicator.tsx`
- Visual example from `for-operators/HowItWorks.tsx`

**V/O:**
> "The quorum meter shows everyone the progress. You set the minimum and maximum. While forming, cards are held. Once confirmed, cards are charged. Everyone sees the same truth."

##### Scene 7: CTA (1:45-1:50)
**Visual:** "List Your First Tour" button with brand styling
**Animation:** Button glows warmly, subtle hover effect
**Components:** CTA button styling from `OperatorCTA`

**V/O:**
> "List your first tour. See how it feels."

---

### Video 7: The 6% Promise

#### Metadata
| Attribute | Value |
|-----------|-------|
| **Page** | For Operators (`/for-operators`) |
| **Placement** | TrustTransparency section (expandable panel) |
| **Length** | 30-45 seconds |
| **Tone** | Direct, confident, transparent |
| **Target Audience** | Operators evaluating costs and comparing platforms |
| **Animation Style** | Motion Graphics |

#### Concept
A quick, punchy explanation of Quorum's pricing model with a comparison to alternatives. Emphasizes the "only pay when you succeed" philosophy. Clean data visualization builds trust.

#### Scene Breakdown

##### Scene 1: The Number (0:00-0:08)
**Visual:**
- Large "6%" animates in with weight and impact (Crimson Pro, bold)
- "Flat commission. Forever." subtitle fades in below
- Amber accent border frames the number (matching TrustTransparency pricing card)
**Animation:** Number scales up from center with ease-out-back (slight overshoot), text fades in
**Style notes:** The number should land with confidence — this is a competitive rate and they should feel good about it
**Components:** Pricing card styling from `TrustTransparency` section

**V/O:**
> "Six percent. Flat commission. Forever. That's what Quorum costs."

##### Scene 2: When You Pay (0:08-0:18)
**Visual:**
- QuorumIndicator in confirmed state (green)
- Money flow diagram: Participant payment ($850) splits visually
  - Large portion (94%, $799) flows to "Operator" bucket
  - Small portion (6%, $51) flows to "Quorum" bucket
- "Only on successful bookings" label
- Alternative scenario: QuorumIndicator not reached (gray), "$0 to Quorum" appears
**Animation:** Money flow is smooth and satisfying; alternative scenario quick but clear
**Style notes:** Transparency — show exactly where the money goes
**Components:** Pricing explanation from `TrustTransparency`

**V/O:**
> "But only on successful bookings. If your tour doesn't run, you pay nothing. Your success is our success."

##### Scene 3: What's Included (0:18-0:28)
**Visual:**
- Three checkmarks animate in vertically:
  - "No monthly fees" ✓
  - "No setup costs" ✓
  - "Unlimited listings" ✓
- Green checkmark icons, clean typography
**Animation:** Checkmarks pop in sequence (staggered 200ms) with satisfying bounce
**Style notes:** Simple, clear, no asterisks — what you see is what you get
**Components:** Benefits list from `TrustTransparency` section

**V/O:**
> "No monthly fees. No setup costs. Unlimited listings. You only pay when you earn."

##### Scene 4: The Comparison (0:28-0:38)
**Visual:**
- Simplified comparison table builds row by row
- Three columns: Quorum | FareHarbor | DIY (Spreadsheets)
- Key rows highlight as mentioned:
  - Quorum mechanics: ✓ | ✗ | ✗
  - Species-based discovery: ✓ | ✗ | ✗
  - Payment chasing: "None" | "Manual" | "All manual"
- Quorum column has subtle green highlight/glow
**Animation:** Table builds row by row; Quorum advantages highlight with subtle pulse
**Style notes:** Confident but not arrogant — let the comparison speak for itself
**Components:** Comparison table from `TrustTransparency`

**V/O:**
> "Compare that to alternatives. Only Quorum gives you quorum mechanics and species-based discovery. Only Quorum handles payment chasing for you."

##### Scene 5: CTA (0:38-0:42)
**Visual:** "Get Started Free" button
**Animation:** Button highlight with warm glow
**Components:** CTA from `OperatorCTA`

**V/O:**
> "Transparent pricing. Real value. Get started."

---

## Production Notes

### Brand Consistency

#### Colors (from design system)
| Token | Value | Usage |
|-------|-------|-------|
| Primary (Forest Green) | `#2E8B57` | Buttons, confirmed states, checkmarks |
| Accent (Gold) | `#D4A84B` | Operator elements, CTAs, highlights |
| Confirmed | `var(--color-confirmed)` | QuorumIndicator confirmed state |
| Forming (Amber) | `var(--color-forming)` | QuorumIndicator forming state |
| Ink | `var(--color-ink)` | Primary text |
| Ink Muted | `var(--color-ink-muted)` | Secondary text |
| Surface | `var(--color-surface)` | Backgrounds |

#### Typography
| Use | Font | Weight |
|-----|------|--------|
| Headlines | Crimson Pro | 600 (Semibold) |
| Body text | Atkinson Hyperlegible | 400 (Regular) |
| Labels | Atkinson Hyperlegible | 500 (Medium) |
| UI elements | Atkinson Hyperlegible | 400-600 |

#### Visual Style
- Organic rounded corners (16-24px radius)
- Natural shadows (subtle, not harsh)
- Clean, uncluttered compositions
- Nature imagery where appropriate (Australian landscapes, birds)

---

### Component Reference Map

| Component | File Path | Used In Videos |
|-----------|-----------|----------------|
| QuorumIndicator | `src/components/ui/QuorumIndicator.tsx` | 1, 2, 3, 4, 5, 6, 7 |
| Button | `src/components/ui/Button.tsx` | 1, 2, 3, 4, 6, 7 |
| HeroSection | `src/components/home/HeroSection.tsx` | 1, 2 |
| HowItWorksSection | `src/components/home/HowItWorksSection.tsx` | 1, 3 |
| ComparisonSection | `src/components/home/ComparisonSection.tsx` | 2 |
| MechanicSection | `src/components/how-it-works/MechanicSection.tsx` | 3 |
| BenefitsSection | `src/components/how-it-works/BenefitsSection.tsx` | 4 |
| ProblemStatement | `src/components/for-operators/ProblemStatement.tsx` | 5 |
| HowItWorks (operators) | `src/components/for-operators/HowItWorks.tsx` | 6 |
| TrustTransparency | `src/components/for-operators/TrustTransparency.tsx` | 7 |

---

### Voiceover Guidelines

#### Voice Characteristics
| Audience | Voice Type | Pace | Energy |
|----------|------------|------|--------|
| Consumer (Videos 1-4) | Warm, friendly, approachable | Medium (140-150 wpm) | Optimistic but not hyper |
| Operator (Videos 5-7) | Confident, empathetic, experienced | Slightly slower (130-140 wpm) | Calm, trustworthy |

#### Voice Direction
- **Not:** Startup pitch energy, marketing hype, urgency
- **Yes:** David Attenborough calm, NPR clarity, trusted advisor tone
- Australian accent acceptable but not required
- Gender: neutral/either — authenticity over demographics

#### Recording Notes
- Clean room tone, no reverb
- Consistent mic distance throughout
- Natural breathing, not overly processed
- Allow 0.5s pause at scene transitions for editor flexibility

---

### Audio/Music Guidelines

| Videos | Music Style | Reference |
|--------|-------------|-----------|
| 1-4 (Consumer) | Light, optimistic, nature-inspired ambient | Acoustic guitar undertones, soft pads, birdsong accents |
| 5-7 (Operator) | Warm, professional, trustworthy | Piano-led, minimal, documentary feel |

**Music notes:**
- Music should support, not compete with voiceover
- Duck music during VO, allow to breathe between sections
- No generic "corporate explainer" stock music
- Consider custom composition for brand consistency

---

### Deliverables Per Video

| Deliverable | Format | Dimensions/Specs |
|-------------|--------|------------------|
| Final video (desktop) | MP4 (H.264) | 1920x1080 or 3840x2160, 30fps |
| Final video (mobile) | MP4 (H.264) | 1080x1080, 30fps |
| Poster image (desktop) | WebP | 1920x1080 |
| Poster image (mobile) | WebP | 1080x1080 |
| Email thumbnail | PNG | 1280x720 |
| Subtitles | SRT | Synced to final edit |
| Transcript | TXT | Plain text with timestamps |
| Source project | Native format | After Effects / Figma / etc. |

---

## Implementation Checklist

### Priority 1 (Launch Critical)
- [ ] Video 1: What is Quorum? — Motion Graphics
- [ ] Video 3: The Four-Step Journey — Motion Graphics
- [ ] Video 5: The Three Pain Points — Illustrated

### Priority 2 (Launch Week)
- [ ] Video 2: Traditional vs Quorum — Hybrid
- [ ] Video 6: How Quorum Works for Operators — Motion Graphics

### Priority 3 (Post-Launch)
- [ ] Video 4: Two Sides, One Solution — Illustrated
- [ ] Video 7: The 6% Promise — Motion Graphics

### Infrastructure
- [ ] Create `/public/videos/` directory structure
- [ ] Build `ResponsiveVideo` component
- [ ] Set up YouTube channel and playlists
- [ ] Create video description templates
- [ ] Add JSON-LD structured data to pages
- [ ] Create email thumbnail templates

### Integration
- [ ] Update HeroSection with video slot
- [ ] Add expandable video panels to ComparisonSection, BenefitsSection, TrustTransparency
- [ ] Add inline video anchors to MechanicSection, ProblemStatement, HowItWorks
- [ ] Test responsive behavior at all breakpoints
- [ ] Verify SEO content remains crawlable
- [ ] Performance audit (LCP, CLS impact)
