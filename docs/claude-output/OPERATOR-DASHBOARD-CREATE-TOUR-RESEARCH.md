# Create Tour Research — Multi-Day Itinerary Builder UX Patterns

**Date:** 2026-01-22
**Purpose:** Research patterns for multi-day birding tour creation to inform operator dashboard UX
**Target Users:** Operators aged 50-70 who hate complex software
**Critical Challenge:** Single Day vs Multi-Day toggle with day-by-day itinerary builder

---

## 1. Executive Summary

Multi-day birding tours (7-18 days) are the primary revenue source for wildlife tour operators, but creating itineraries is administratively burdensome. Operators aged 50-70 need a balance between powerful functionality and extreme simplicity. The research reveals three critical UX principles:

1. **Progressive Disclosure**: Hide multi-day complexity behind a simple toggle—don't overwhelm on first load
2. **Template-First Workflow**: Let operators duplicate past tours rather than start from scratch
3. **Mobile-Aware but Desktop-Optimized**: Operators won't create tours on phones, but need mobile preview

**Key Finding**: Traditional tour operators use downloadable PDFs for itineraries, not web forms—this suggests day-by-day builders are NOT common in existing operator tools. Tour operator software vendors (TripCreator, Moonstride) emphasize **drag-and-drop** and **reusable templates** as the top UX patterns.

---

## 2. Operator Pain Points (from Context Research)

### 2.1 Admin Burden Consumes Guiding Passion

**Source:** research/pain-points/Tour booking pain points - claude.md

> **Current Reality:** "Monday morning. You've got a stack of emails to answer, a spreadsheet to update, invoices to send, and a trip to pack for. By 2 PM, you haven't left your desk. By 4 PM, you realize you forgot to call the lodge. This is your life now."
>
> **Emotional Weight:** "You spent thirty years learning to identify every warbler by ear. Now you spend thirty hours a week in Gmail."

**Implication for UX:**
- Multi-day itinerary creation must be FAST (under 15 minutes for experienced operators)
- Duplication/templates are mandatory—operators shouldn't rebuild Patagonia tour from scratch each season
- Auto-save drafts constantly—operators get interrupted by emails/calls
- Pre-trip communication complexity (equipment lists, fitness requirements) should be templated

### 2.2 Technology Designed for People Who Aren't You

**Source:** research/pain-points/Tour booking pain points - claude.md

> **Current Reality:** "You've spent three hours trying to figure out why the calendar isn't syncing. Support sent a knowledge base article that assumes you know what an API is. You give up and go back to the spreadsheet."
>
> **Emotional Weight:** "You can identify 400 species by call. But the booking software makes you feel incompetent."

**Implication for UX:**
- NO jargon (avoid "sync", "integration", "API", "webhook")
- If operators can use eBird, they can use this—eBird is the benchmark for complexity ceiling
- Visual feedback for every action (saving, publishing, errors)
- Help text in context, not separate documentation
- Undo must be prominent and always available

### 2.3 Multi-Day Tour Logistics Complexity

**Source:** research/pain-points/Tour booking pain points - claude.md

**Burning pain point:** Financial exposure before confirmation

> "You've put $8,000 down on the boat charter. The lodge wants another $4,000. And you've got three signups for a trip that needs eight."

**Implication for UX:**
- Operators need to track supplier commitments separately from tour creation
- Accommodation management per day is critical—lodge bookings are expensive and time-sensitive
- Transport details (charter boats, vehicles) need day-level granularity
- Threshold settings must be prominent—operators need to know minimum group before committing to suppliers

---

## 3. Platform Research: Multi-Day Itinerary Patterns

### 3.1 G Adventures (Large Tour Operator)

**Source:** [G Adventures API Documentation](https://developers.gadventures.com/docs/itinerary.html)

**Itinerary Structure:**
- Itineraries segmented into **each day**
- Each day contains:
  - Optional activities
  - Meals (breakfast, lunch, dinner)
  - Summary/description
  - Components (detailed activities)
  - Transport
  - Starting and finishing locations

**API Pattern** (indicates backend structure):
```
GET /itineraries/{id}
{
  "days": [
    {
      "day": 1,
      "label": "Day 1",
      "meals": "breakfast,lunch",
      "summary": "Arrive in Lima and transfer to hotel",
      "components": [...]
    }
  ]
}
```

**Key Insight:**
- Days are the primary organizational unit
- Meals are tracked at day level (important for birding tours with remote lodges)
- Activities/components can be added to days modularly
- Each day is self-contained

**UX Takeaway:**
- Use day-as-container model
- Pre-populate standard fields (meals, accommodation)
- Allow adding/removing activity components per day

### 3.2 Tour Operator Software Platforms

#### TripCreator

**Source:** [TripCreator All-In-One Travel Management Software](https://www.tripcreator.com/)

**Key Features:**
- **Drag and drop** for faster date and time rescheduling
- **Easy re-use of itineraries** and prebuilt libraries with destination info
- Optimized workflow for 2026

**UX Pattern:**
- Visual day cards that can be dragged to reorder
- Library of pre-built day templates
- One-click duplication of entire tours

**Takeaway for Quorum:**
- Drag-to-reorder days is critical for multi-day tours
- Template library reduces creation time from hours to minutes
- Duplication beats "create from scratch"

#### Moonstride

**Source:** [Moonstride Tour Operator Itinerary Software](https://www.moonstride.com/itinerary-builder/)

**Key Features:**
- Create fully personalized day-by-day itinerary **within minutes**
- Setup predefined day-by-day travel packages
- All arrangements clearly laid out in day-by-day itinerary

**UX Pattern:**
- Emphasis on speed ("within minutes")
- Pre-defined packages as starting points
- Clear visual hierarchy for day-by-day layout

**Takeaway for Quorum:**
- Speed is the #1 selling point for itinerary builders
- Operators need visual clarity—see entire tour at a glance
- Predefined templates are not optional

#### PHPTRAVELS

**Source:** [PHPTRAVELS Tour Operator Software](https://phptravels.com/tour-operator-software)

**Key Features:**
- Multi-day itinerary builder
- Auto-costing per-pax pricing
- Day-by-day services assembly

**UX Pattern:**
- Pricing calculated automatically as days/services are added
- Per-person pricing logic built into day creation

**Takeaway for Quorum:**
- Pricing should update in real-time as itinerary is built
- Per-person vs group pricing is a complexity operators need help with

### 3.3 eBird Trip Reports (Birding-Specific)

**Source:** [eBird Trip Reports Help Center](https://support.ebird.org/en/support/solutions/articles/48001201565-ebird-trip-reports)

**Structure:**
- **LIVE summaries** (auto-updates as new lists added from trip period)
- Map of all locations visited
- Species totals across all checklists
- **Narrative section**: Free-form description with links, embeds, HTML formatting
- Comments section for collaborative storytelling
- Media views (filtered photos/audio)
- Lifer statistics

**Key Insight:**
- Birders are familiar with eBird's day-by-day checklist structure
- Narrative + structured data hybrid model
- Media (photos, audio) are first-class elements, not afterthoughts

**Takeaway for Quorum:**
- Operators may want to link eBird checklists from past tours
- Free-form narrative + structured days = familiar pattern
- Photo galleries per day enhance credibility

### 3.4 Rockjumper Birding Tours (Premium Operator)

**Source:** [Rockjumper Papua New Guinea Tour](https://www.rockjumperbirding.com/tour-info/papua-new-guinea-birding-in-paradise-2026/49903/)

**Itinerary Presentation:**
- Downloadable PDF (not web-embedded)
- General overview on web page:
  - Tour duration (18 days)
  - Activity level ("Moderate pace with some longer hikes")
  - Difficulty rating ("DIFFICULT - passionate listers, fast-paced schedule")
  - Habitats covered
  - Expected climate
  - Species expectations (300-350 birds)

**Key Insight:**
- Traditional birding operators use PDFs for detailed itineraries
- Web pages show summary only
- Itinerary detail lives in downloadable documents

**Takeaway for Quorum:**
- Operators may expect to download/print itineraries for offline use
- PDF export is a table-stakes feature
- Web preview + downloadable PDF dual output

### 3.5 Tropical Birding (Mid-Size Operator)

**Source:** [Tropical Birding Costa Rica Introtour](https://www.tropicalbirding.com/centralamericacostaricaintrotour)

**Itinerary Structure:**
- "WHAT'S INCLUDED?" section (tips, accommodation, meals, leader, transport)
- "WHAT'S NOT INCLUDED?" section (flights, alcohol, insurance)
- Numbered day-by-day format:
  - **Day 1**: Airport pickup, hotel with good birding on grounds
  - **Day 2+**: Specific times (early morning, afternoon), locations, target species, lodging info
- Flexibility notes: "The itinerary is sometimes run in a different order due to lodge availability"

**Key Insight:**
- Inclusions/exclusions are critical upfront—sets expectations
- Each day has:
  - Activities with specific times
  - Target species (birding-specific)
  - Lodging name and location
  - Meal arrangements
- Order flexibility is acknowledged

**Takeaway for Quorum:**
- Inclusions/exclusions should be a separate section, not buried
- Each day needs:
  - Title (optional)
  - Description/activities
  - Target species (birding-specific)
  - Accommodation name
  - Meals included
- Allow drag-and-drop reordering with warning about dependencies

---

## 4. Critical UX Challenge: Single Day vs Multi-Day Toggle

### 4.1 The Problem

Operators create two fundamentally different tour types:

**Single Day:**
- Date, start time, duration
- Single location
- Simple: one description, one itinerary text block

**Multi-Day (7-18 days typical):**
- Start date, end date
- Day-by-day itinerary builder
- Each day needs:
  - Title (e.g., "Day 1: Arrival in Lima")
  - Description/activities
  - Locations (can visit multiple per day)
  - Accommodation (if not last day)
  - Meals included
  - Target species

**The complexity gap is massive.** Showing multi-day fields for a 4-hour local birding trip would be overwhelming. Hiding multi-day capability makes it undiscoverable.

### 4.2 Proposed Solution: Progressive Disclosure with Toggle

**Step 1: Tour Type Selection (First Decision)**

```
┌─────────────────────────────────────────────┐
│ What type of tour are you creating?        │
│                                             │
│  ○ Single Day Tour                         │
│     Perfect for local outings (2-8 hours)  │
│                                             │
│  ○ Multi-Day Tour                          │
│     For overnight trips (2+ days)          │
└─────────────────────────────────────────────┘
```

**Rationale:**
- Binary choice, no cognitive load
- Clear definitions prevent confusion
- Can't proceed without selecting—forces intentional decision

**Step 2A: Single Day Form (Simple)**

```
┌─────────────────────────────────────────────┐
│ Tour Details                                │
├─────────────────────────────────────────────┤
│ Title: [Costa Rican Cloud Forest]          │
│ Date:  [May 15, 2026]                       │
│ Start: [6:00 AM]  Duration: [6 hours]      │
│ Location: [Monteverde Reserve]             │
│ Description: [                             ]│
│ Target Species (optional): [Resplendent... ]│
│ Price per person: [$120]                    │
│ Minimum participants: [4]                   │
│ Maximum participants: [8]                   │
└─────────────────────────────────────────────┘
```

**Step 2B: Multi-Day Form (Progressive)**

```
┌─────────────────────────────────────────────┐
│ Tour Overview                               │
├─────────────────────────────────────────────┤
│ Title: [Patagonian Birding Adventure]      │
│ Start Date: [May 10, 2026]                 │
│ End Date:   [May 24, 2026]  (14 days)      │
│ Summary: [                                 ]│
│ Price per person: [$4,200]                  │
│ Minimum: [6]  Maximum: [10]                 │
└─────────────────────────────────────────────┘
│                                             │
│ [+ Start building your daily itinerary]    │
└─────────────────────────────────────────────┘
```

After overview is saved, **THEN** show day-by-day builder.

### 4.3 Day-by-Day Itinerary Builder UX

**Collapsed View (Initial State)**

```
┌─────────────────────────────────────────────┐
│ Daily Itinerary (14 days)                   │
├─────────────────────────────────────────────┤
│ ⋮ Day 1: Arrival in Buenos Aires           │
│   Accommodation: Hilton Buenos Aires        │
│   [Edit] [Duplicate] [Delete]               │
│                                             │
│ ⋮ Day 2: Transfer to El Calafate           │
│   Accommodation: Hosteria Helsingfors       │
│   [Edit] [Duplicate] [Delete]               │
│                                             │
│ ⋮ Day 3: Los Glaciares National Park       │
│   Accommodation: Hosteria Helsingfors       │
│   [Edit] [Duplicate] [Delete]               │
│                                             │
│ [+ Add Day 4]                               │
│ [ Or: Duplicate Day 3]                      │
└─────────────────────────────────────────────┘
```

**Expanded View (Editing Day 3)**

```
┌─────────────────────────────────────────────┐
│ Day 3: Los Glaciares National Park          │
├─────────────────────────────────────────────┤
│ Title: [Los Glaciares National Park]       │
│                                             │
│ Description:                                │
│ [ Early morning birding along the shores of]│
│ [ Lago Argentino. Target species include...]│
│                                             │
│ Target Species (optional):                  │
│ [Austral Parakeet, Magellanic Woodpecker,...]│
│                                             │
│ Locations (can add multiple):              │
│ • Lago Argentino shoreline [Remove]        │
│ • Nothofagus forest trails [Remove]        │
│ [+ Add location]                            │
│                                             │
│ Accommodation:                              │
│ [Hosteria Helsingfors, El Calafate]        │
│                                             │
│ Meals Included:                             │
│ ☑ Breakfast  ☑ Lunch  ☑ Dinner            │
│                                             │
│ [Save Day] [Cancel]                         │
└─────────────────────────────────────────────┘
```

**Key Features:**
- **Drag handle (⋮)** for reordering days
- **Duplicate** button for repetitive days (e.g., 3 days at same lodge)
- **Collapsed by default** to see entire tour at a glance
- **Expand to edit** individual day details
- **Auto-save** on blur (operators get interrupted constantly)
- **Undo** button always visible

### 4.4 Template & Duplication Workflow

**Option 1: Duplicate Entire Past Tour**

```
┌─────────────────────────────────────────────┐
│ Create New Tour                             │
├─────────────────────────────────────────────┤
│ ○ Start from scratch                        │
│ ○ Duplicate a past tour                     │
│                                             │
│   Select tour to duplicate:                 │
│   [▼ Patagonia Spring 2025]                 │
│       (14 days, ran Oct 2025)               │
│                                             │
│   [Continue]                                │
└─────────────────────────────────────────────┘
```

Duplicating pre-fills ALL fields (title, dates, days, species, accommodations). Operator just updates dates and pricing.

**Option 2: Duplicate Individual Day Within Current Tour**

While building a multi-day tour, operator can click **"Duplicate Day 3"** to create Day 4 with identical structure (location, species, meals) but empty accommodation (assumes different lodge).

**Rationale:**
- Operators shouldn't rebuild "Patagonia birding tour" from scratch each season
- Day duplication saves time for multi-day stays at same lodge
- Templates reduce 3-hour admin task to 15-minute review-and-publish

---

## 5. Mobile Considerations (Desktop-First)

### 5.1 Context from Research

**Source:** Operator Profile UX Research Design (PDF)

> "Mobile must function as **field utility** with offline caching."
>
> "45-65+ demographic requires 18px+ body fonts, WCAG AAA contrast, 48px+ tap targets"

**Insight:**
- Operators won't CREATE tours on mobile
- But they will PREVIEW/EDIT tours from the field
- Mobile must handle:
  - Quick edits (fixing typos, updating accommodation)
  - Viewing tour details (refreshing memory before trip)
  - Responding to participant questions via messaging

### 5.2 Desktop-First Implementation

**Create Tour Flow:**
- Desktop only (no mobile hamburger menu, no responsive form)
- Minimum viewport: 1280px width
- Large form fields, generous spacing
- No drag-and-drop on mobile (too fiddly)

**Mobile Preview/Edit:**
- Read-only preview by default
- Edit mode: simplified form (no drag-drop, linear day list)
- Large tap targets (48px minimum)
- Offline support for viewing tours

---

## 6. Accommodation & Logistics Management

### 6.1 Accommodation Per Day

**Critical for Multi-Day Tours:**
- Each day except last needs accommodation
- Lodge names are customer-facing (appear in itinerary)
- Operators need to track booking status separately (not customer-facing)

**Proposed Field Structure:**

```
Accommodation:
  Name: [Hosteria Helsingfors]  (Customer sees this)

  Internal Notes (optional, private):
  [ Booking confirmed Jan 15. Contact: Maria +54... ]
  [ Deposit paid: $400. Balance due 30 days before.]
```

**Rationale:**
- Operators need both customer-facing name and internal booking notes
- Booking status shouldn't appear in public itinerary
- Private notes allow tracking supplier commitments

### 6.2 Transport Between Locations

**Less Critical than Accommodation:**
- Most birding tours include transport in base price
- Operators don't itemize "Day 3: Van from El Calafate to lodge"
- Transport details appear in "What's Included" section, not day-by-day

**Proposed Approach:**
- NO transport field per day (reduces complexity)
- "What's Included" checkbox: "Ground transport" (tour-level)
- Operators can mention transport in day description if relevant

**Rationale:**
- Reduces per-day form fields
- Matches how traditional birding operators present itineraries
- Avoids over-engineering for edge cases

---

## 7. Species-Specific Considerations

### 7.1 Target Species Per Day vs Tour Level

**Question:** Should target species be tour-level or day-level?

**Research Finding:**

From Tropical Birding itineraries:
- **Tour-level**: General species count (e.g., "300-350 species expected")
- **Day-level**: Specific target species per location (e.g., "Day 4: Harpy Eagle, Black-and-white Hawk-Eagle")

**Proposed Solution: BOTH**

**Tour Level (Overview):**
```
Target Species (highlight species):
[ Andean Condor, Magellanic Woodpecker, Austral Parakeet ]
(These appear in tour listing and overview)
```

**Day Level (Optional):**
```
Day 5: Target Species Today
[ Torrent Duck, White-throated Treerunner ]
(These help participants prepare, guide expectations)
```

**Rationale:**
- Tour-level species drive bookings (chase list matching)
- Day-level species help with preparation and logistics
- Making day-level optional reduces burden

### 7.2 eBird Integration

**Operator Workflow:**
- After tour completes, operator (or participants) upload eBird checklists
- Checklists can be linked to specific tour dates
- Species success rates calculated from historical eBird data

**Implication for Tour Creation:**
- Operators shouldn't manually enter 300 species for a tour
- Target/highlight species (5-15) are manually curated
- Full species list emerges from post-trip eBird checklists

---

## 8. Recommended UX Patterns

### 8.1 Simplicity Principles for 50-70 Demographic

1. **One Primary Action Per Screen**
   - Create Tour page: just type selection (single vs multi-day)
   - Overview page: just tour basics
   - Itinerary page: just day management

2. **Large, Obvious Buttons**
   - "Save Draft" button: 48px height, green, always visible
   - "Publish Tour" button: 56px height, forest green, confirmation dialog

3. **Inline Help, Not Tooltips**
   - Bad: "Title" with (?) icon requiring hover
   - Good: "Title" with "This appears in tour listings" helper text below

4. **Visual Feedback for Every Action**
   - Saving: "Saving..." → "Saved ✓"
   - Publishing: "Publishing your tour..." → "Tour live! [View public page]"
   - Errors: Red border + error message, NOT toast notification

5. **Forgiving Undo**
   - "Undo" button visible after deletions
   - "Are you sure?" confirmation for destructive actions (delete day, delete tour)
   - Auto-save drafts every 30 seconds

### 8.2 Speed Optimizations

1. **Templates Library**
   - Pre-built day templates: "Arrival Day", "Full Day Birding", "Travel Day", "Departure Day"
   - Operators can save their own custom day templates
   - One-click insert template into itinerary

2. **Smart Defaults**
   - Meals: Auto-check all three (breakfast, lunch, dinner) for multi-day
   - Duration: Default to "Full day (8 hours)" for single-day
   - Min/max participants: Default to 4/8 (common birding group size)

3. **Bulk Actions**
   - "Apply accommodation to Days 3-7" (same lodge, multi-night stay)
   - "Duplicate Days 5-8" (repeat pattern)

### 8.3 Error Prevention

1. **Date Validation**
   - Multi-day: End date must be after start date
   - Single-day: Date can't be in the past
   - Warning if tour is <60 days out (supplier booking window)

2. **Required Fields**
   - Mark required fields with red asterisk
   - Disable "Publish" button until all required fields complete
   - Show checklist: "✓ Overview complete, ✓ 3 days added, ✗ Pricing missing"

3. **Character Limits**
   - Title: 80 characters (prevents overflow in listings)
   - Description: 2000 characters (prevents walls of text)
   - Day description: 500 characters (keeps it scannable)
   - Show character count: "42 / 80"

---

## 9. Implementation Recommendations

### 9.1 Phased Rollout

**Phase 1: MVP (Ship First)**
- Single day / Multi-day toggle
- Basic multi-day builder (title, description, accommodation per day)
- Duplicate entire tour
- PDF export

**Phase 2: Templates (3 months)**
- Day template library
- Save custom templates
- Duplicate individual days
- Bulk actions (apply accommodation to range)

**Phase 3: Advanced (6 months)**
- Drag-and-drop day reordering (currently: up/down buttons)
- Species autocomplete (eBird API integration)
- Photo gallery per day
- Offline mobile editing

### 9.2 Technical Architecture

**Data Model:**

```typescript
// tours table
{
  id: uuid,
  operator_id: uuid,
  type: 'single_day' | 'multi_day',
  title: string,
  summary: text,
  start_date: date,
  end_date: date | null,  // null for single-day
  price_per_person: decimal,
  min_participants: integer,
  max_participants: integer,
  status: 'draft' | 'published' | 'cancelled',
  ...
}

// tour_days table (only for multi-day tours)
{
  id: uuid,
  tour_id: uuid,
  day_number: integer,  // 1, 2, 3...
  title: string,
  description: text,
  accommodation: string | null,
  accommodation_notes: text | null,  // private
  meals_included: string[],  // ['breakfast', 'lunch', 'dinner']
  target_species: string[] | null,
  ...
}

// tour_locations table (many-to-many with days)
{
  id: uuid,
  tour_day_id: uuid | null,  // null for single-day tours
  tour_id: uuid,  // direct link for single-day
  location_name: string,
  latitude: decimal,
  longitude: decimal,
  ...
}
```

**Key Decisions:**
- Separate `tour_days` table for multi-day (not JSON column)
- `day_number` allows reordering without UUID shuffling
- `accommodation_notes` is private (operators only)
- Locations can be shared across days or tour-level

### 9.3 Accessibility Requirements

**From Research: WCAG AAA compliance for 45-65+ demographic**

- Body font: 18px minimum (Atkinson Hyperlegible)
- Form labels: 16px, high contrast
- Buttons: 48px height minimum, clear focus indicators
- Error messages: Red text (#B91C1C) + red border, NOT red text alone
- Keyboard navigation: Tab through all form fields, Enter to save
- Screen reader: Proper ARIA labels, landmark regions

---

## 10. Key Takeaways

1. **Progressive Disclosure is Critical**: Don't show multi-day complexity for single-day tours. Toggle is mandatory.

2. **Duplication > Creation**: Operators shouldn't rebuild tours from scratch. Duplicate past tour, update dates/pricing.

3. **Day-as-Container Model**: Each day is self-contained with title, description, locations, accommodation, meals.

4. **Speed Beats Features**: 15-minute tour creation (via templates) beats 3-hour custom build.

5. **Desktop-First, Mobile-Aware**: No mobile creation, but mobile preview/edit for field use.

6. **eBird is the Benchmark**: If operators can use eBird, they can use Quorum. Don't exceed that complexity.

7. **Inline Help, Not Docs**: Helper text below fields, not separate documentation.

8. **Auto-Save Constantly**: Operators get interrupted. Never lose work.

9. **PDF Export is Table Stakes**: Traditional birding operators use PDFs. Web preview + PDF download.

10. **Species at Two Levels**: Tour-level highlights (chase list matching) + optional day-level targets (preparation).

---

## Sources

- [G Adventures Itinerary API Documentation](https://developers.gadventures.com/docs/itinerary.html)
- [G Adventures Tour Dossiers API](https://developers.gadventures.com/docs/tour_dossier.html)
- [TripCreator All-In-One Travel Management Software](https://www.tripcreator.com/)
- [Moonstride Tour Operator Itinerary Software](https://www.moonstride.com/itinerary-builder/)
- [PHPTRAVELS Tour Operator Software](https://phptravels.com/tour-operator-software)
- [eBird Trip Reports Documentation](https://ebird.org/news/introducing-ebird-trip-reports)
- [eBird Trip Reports Help Center](https://support.ebird.org/en/support/solutions/articles/48001201565-ebird-trip-reports)
- [Rockjumper Papua New Guinea Birding Tour](https://www.rockjumperbirding.com/tour-info/papua-new-guinea-birding-in-paradise-2026/49903/)
- [Tropical Birding Costa Rica Introtour](https://www.tropicalbirding.com/centralamericacostaricaintrotour)
- Internal: research/pain-points/Tour booking pain points - claude.md
- Internal: docs/context/RESEARCH-SYNTHESIS.md
