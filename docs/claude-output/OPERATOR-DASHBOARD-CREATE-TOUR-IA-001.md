# CREATE TOUR IA Specification — OPERATOR-DASHBOARD-CREATE-TOUR-IA-001

**Date:** 2026-01-22
**Version:** 001
**Status:** ✅ APPROVED FOR IMPLEMENTATION
**Parent Task:** OPERATOR-DASHBOARD-FULL-BUILD
**Complexity:** HIGH (multi-step form, day-by-day builder, progressive disclosure)

---

## 1. Page Purpose & User Goals

### Primary Purpose
Enable operators to create single-day or multi-day birding tours with minimal complexity while supporting sophisticated itineraries when needed.

### User Goals
1. **Create tour quickly** - 15 minutes or less for experienced operators (via templates)
2. **Choose correct tour type** - Clear distinction between single-day and multi-day
3. **Build multi-day itineraries** - Day-by-day structure without overwhelming complexity
4. **Reuse past work** - Duplicate tours from previous seasons, not rebuild from scratch
5. **Preview before publish** - See public-facing page before going live
6. **Save drafts** - Work interrupted frequently, must auto-save constantly

### Critical UX Challenge (from Research)
> "You can identify 400 species by call. But the booking software makes you feel incompetent."

**Design Mandate:**
- If operators can use eBird, they can use this
- Progressive disclosure: hide multi-day complexity until needed
- Templates-first: duplication beats creation
- Auto-save constantly: operators get interrupted
- No jargon: "sync", "API", "integration" are forbidden

---

## 2. Information Architecture

### 2.1 Page Flow

```
Step 1: Tour Type Selection
   ↓
Step 2: Tour Overview (Basic Info)
   ↓
Step 3A: Single-Day Details
   OR
Step 3B: Multi-Day Itinerary Builder
   ↓
Step 4: Pricing & Participants
   ↓
Step 5: Inclusions & Logistics
   ↓
Step 6: Preview & Publish
```

### 2.2 Navigation Pattern

**Desktop:** Multi-step wizard with progress indicator
**Mobile:** Linear stepper (simplified, read-only preview only)

```
┌─────────────────────────────────────────────────────────┐
│ Create New Tour                                         │
│ ─────────────────────────────────────────────────────── │
│                                                         │
│ ① Tour Type  →  ② Overview  →  ③ Details  →  ④ Review │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Step 1: Tour Type Selection

### 3.1 Purpose
Force intentional decision between single-day and multi-day before showing form fields.

### 3.2 Layout

```
┌─────────────────────────────────────────────┐
│ What type of tour are you creating?        │
│                                             │
│ ┌─────────────────────────────────────────┐│
│ │  ○ Single Day Tour                      ││
│ │                                         ││
│ │  Perfect for local outings (2-8 hours) ││
│ │  Same-day return                        ││
│ │                                         ││
│ │  Examples: Morning birding walk,        ││
│ │  afternoon pelagic trip                 ││
│ └─────────────────────────────────────────┘│
│                                             │
│ ┌─────────────────────────────────────────┐│
│ │  ○ Multi-Day Tour                       ││
│ │                                         ││
│ │  For overnight trips (2+ days)          ││
│ │  Includes accommodation & meals         ││
│ │                                         ││
│ │  Examples: Week-long expedition,        ││
│ │  weekend birding retreat                ││
│ └─────────────────────────────────────────┘│
│                                             │
│         [Continue →]                        │
└─────────────────────────────────────────────┘
```

### 3.3 Interaction

- **Radio buttons** - Only one can be selected
- **Large clickable cards** - Entire card is clickable zone (not just radio)
- **Visual feedback** - Selected card gets forest green border
- **Continue button disabled** until selection made
- **Helper text** shows clear examples

### 3.4 Technical Implementation

```tsx
const [tourType, setTourType] = useState<'single_day' | 'multi_day' | null>(null);

<div className="space-y-4">
  <TourTypeCard
    type="single_day"
    title="Single Day Tour"
    description="Perfect for local outings (2-8 hours)"
    examples="Morning birding walk, afternoon pelagic trip"
    selected={tourType === 'single_day'}
    onSelect={() => setTourType('single_day')}
  />
  <TourTypeCard
    type="multi_day"
    title="Multi-Day Tour"
    description="For overnight trips (2+ days)"
    examples="Week-long expedition, weekend birding retreat"
    selected={tourType === 'multi_day'}
    onSelect={() => setTourType('multi_day')}
  />
</div>

<button
  disabled={!tourType}
  onClick={() => goToStep(2)}
  className="px-6 py-3 bg-[var(--color-primary)] text-white disabled:opacity-50"
>
  Continue →
</button>
```

---

## 4. Step 2: Tour Overview (All Tours)

### 4.1 Purpose
Capture basic info needed for both single-day and multi-day tours.

### 4.2 Layout

```
┌─────────────────────────────────────────────┐
│ Tour Overview                               │
│ ─────────────────────────────────────────── │
│                                             │
│ Tour Title *                                │
│ [Patagonian Birding Adventure             ]│
│ Help: This appears in tour listings        │
│                                             │
│ Summary / Description *                     │
│ [Explore the stunning landscapes of...    ]│
│ [                                          ]│
│ [                                          ]│
│ 42 / 2000 characters                        │
│                                             │
│ Primary Location                            │
│ [El Calafate, Argentina                   ]│
│ Help: Main starting point or region         │
│                                             │
│ Target Species (Optional)                   │
│ [Andean Condor                   ] [+ Add] │
│ • Andean Condor [Remove]                    │
│ • Magellanic Woodpecker [Remove]            │
│ • Austral Parakeet [Remove]                 │
│ Help: Highlight species for chase lists    │
│                                             │
│ Hero Image (Optional)                       │
│ [Upload Image] or [Choose from Gallery]    │
│ Recommended: 1600x900px                     │
│                                             │
│ [← Back]          [Save Draft] [Continue →]│
└─────────────────────────────────────────────┘
```

### 4.3 Field Specifications

**Tour Title**
- Required: Yes
- Max length: 80 characters
- Validation: No special characters except hyphens, apostrophes
- Example: "Patagonian Birding Adventure", "Costa Rica Cloud Forest"

**Summary / Description**
- Required: Yes
- Max length: 2000 characters
- Rich text: No (plain text only for MVP)
- Validation: Minimum 50 characters
- Helper text: "Describe what makes this tour special. Focus on locations, target species, and experience level."

**Primary Location**
- Required: No (can be added per-day for multi-day)
- Type: Text input (autocomplete Phase 2)
- Example: "Monteverde Reserve", "El Calafate, Argentina"

**Target Species**
- Required: No
- Type: Multi-select autocomplete
- Data source: AviList taxonomy (from research)
- Display: Common name + scientific name
- Max: 10 species (prevents overwhelming)
- Helper text: "These species appear in search results and chase list matching"

**Hero Image**
- Required: No
- Format: JPG, PNG, WebP
- Max size: 5MB
- Recommended dimensions: 1600x900px (16:9)
- Upload to: Cloud storage (S3/Cloudflare)
- Compression: Automatic on upload

### 4.4 Auto-Save Behavior

```tsx
const {form, isDirty, lastSaved} = useAutoSave({
  endpoint: '/api/operator/tours/draft',
  interval: 30000, // 30 seconds
});

<p className="text-sm text-[var(--color-ink-muted)]">
  {lastSaved ? `Saved ${formatDistanceToNow(lastSaved)} ago` : 'Not saved yet'}
</p>
```

**Save triggers:**
- Every 30 seconds if form is dirty
- On field blur (important fields only)
- Before navigation away
- Manual "Save Draft" button click

---

## 5. Step 3A: Single-Day Details

### 5.1 Purpose
Capture single-day tour specifics: date, time, duration, simple itinerary.

### 5.2 Layout

```
┌─────────────────────────────────────────────┐
│ Single-Day Tour Details                     │
│ ─────────────────────────────────────────── │
│                                             │
│ Tour Date *                                 │
│ [📅 May 15, 2026]                           │
│                                             │
│ Start Time *          Duration *            │
│ [6:00 AM      ▼]      [6 hours     ▼]      │
│                                             │
│ Meeting Point                               │
│ [Monteverde Reserve main entrance         ]│
│ Help: Where participants should meet       │
│                                             │
│ Itinerary / What to Expect                  │
│ [We'll start with pre-dawn birding...     ]│
│ [                                          ]│
│ [                                          ]│
│ Help: Describe the day's activities        │
│                                             │
│ Physical Difficulty                         │
│ ○ Easy   ○ Moderate   ○ Difficult          │
│ Help: Easy = flat terrain, little walking  │
│       Moderate = some hills, 2-5 miles     │
│       Difficult = steep trails, 5+ miles   │
│                                             │
│ What to Bring                               │
│ ☑ Binoculars                               │
│ ☑ Field guide                              │
│ ☑ Water and snacks                         │
│ ☑ Sun protection                           │
│ ☐ Camera with telephoto lens               │
│ [+ Add custom item]                         │
│                                             │
│ [← Back]          [Save Draft] [Continue →]│
└─────────────────────────────────────────────┘
```

### 5.3 Field Specifications

**Tour Date**
- Required: Yes
- Type: Date picker
- Validation: Must be future date
- Warning: If <60 days, show "Short notice - consider supplier availability"

**Start Time**
- Required: Yes
- Type: Time picker (dropdown)
- Options: 30-minute intervals (5:00 AM - 8:00 PM)
- Common defaults: 6:00 AM (dawn), 2:00 PM (afternoon)

**Duration**
- Required: Yes
- Type: Dropdown
- Options: 2 hours, 3 hours, 4 hours, 5 hours, 6 hours, 7 hours, 8 hours, Full day (10+ hours)

**Meeting Point**
- Required: No
- Type: Text input
- Max length: 200 characters
- Example: "Monteverde Reserve main entrance", "Hotel lobby"

**Itinerary / What to Expect**
- Required: Yes
- Type: Textarea
- Max length: 1000 characters
- Min length: 100 characters

**Physical Difficulty**
- Required: Yes
- Type: Radio buttons
- Options: Easy, Moderate, Difficult
- Display: Large cards with icons + descriptions

**What to Bring**
- Required: No
- Type: Checkboxes (pre-populated) + custom input
- Pre-populated items: Common birding gear
- Custom items: Operator can add tour-specific items

---

## 6. Step 3B: Multi-Day Itinerary Builder

### 6.1 Purpose
Build day-by-day itinerary for multi-day tours WITHOUT overwhelming complexity.

### 6.2 Overview Form (Before Day Builder)

```
┌─────────────────────────────────────────────┐
│ Multi-Day Tour Details                      │
│ ─────────────────────────────────────────── │
│                                             │
│ Start Date *          End Date *            │
│ [📅 May 10, 2026]     [📅 May 24, 2026]    │
│                       14 days               │
│                                             │
│ Physical Difficulty                         │
│ ○ Easy   ● Moderate   ○ Difficult          │
│                                             │
│ [Continue to Build Daily Itinerary →]      │
└─────────────────────────────────────────────┘
```

After operator clicks "Continue to Build Daily Itinerary", show day-by-day builder.

### 6.3 Day-by-Day Builder Layout

**Collapsed View (See All Days)**

```
┌──────────────────────────────────────────────┐
│ Daily Itinerary (14 days)                    │
│ ────────────────────────────────────────────│
│                                              │
│ ⋮ Day 1: Arrival in Buenos Aires            │
│   May 10, 2026 • Hilton Buenos Aires        │
│   [Edit] [Duplicate] [Delete]                │
│                                              │
│ ⋮ Day 2: Transfer to El Calafate            │
│   May 11, 2026 • Hosteria Helsingfors       │
│   [Edit] [Duplicate] [Delete]                │
│                                              │
│ ⋮ Day 3: Los Glaciares National Park        │
│   May 12, 2026 • Hosteria Helsingfors       │
│   [Edit] [Duplicate] [Delete]                │
│                                              │
│ ... (11 more days)                           │
│                                              │
│ [+ Add Day 15] [+ Duplicate Day 14]          │
│                                              │
│ [← Back]        [Save Draft] [Continue →]   │
└──────────────────────────────────────────────┘
```

**Expanded View (Editing Day 3)**

```
┌──────────────────────────────────────────────┐
│ Edit Day 3 of 14                             │
│ ────────────────────────────────────────────│
│                                              │
│ Day Title                                    │
│ [Los Glaciares National Park               ]│
│ Example: "Arrival Day", "Perito Moreno"     │
│                                              │
│ Description / Activities *                   │
│ [Early morning birding along the shores...  ]│
│ [                                           ]│
│ [                                           ]│
│ 124 / 500 characters                         │
│                                              │
│ Target Species (Optional)                    │
│ [Austral Parakeet              ] [+ Add]    │
│ • Austral Parakeet [Remove]                  │
│ • Magellanic Woodpecker [Remove]             │
│                                              │
│ Accommodation *                              │
│ [Hosteria Helsingfors, El Calafate         ]│
│ Help: Where guests stay tonight             │
│                                              │
│ Accommodation Notes (Private)                │
│ [Booking confirmed Jan 15. Deposit paid.   ]│
│ Help: Internal notes, not shown to guests   │
│                                              │
│ Meals Included                               │
│ ☑ Breakfast  ☑ Lunch  ☑ Dinner             │
│                                              │
│ [Cancel]                         [Save Day] │
└──────────────────────────────────────────────┘
```

### 6.4 Day Builder Features

**Drag to Reorder**
- Drag handle (⋮) on left of each day card
- Visual feedback during drag
- Auto-renumber days after reorder
- Warning if dependencies exist (e.g., "Day 2 accommodation notes reference Day 1")

**Duplicate Day**
- Copies all fields except accommodation (assumes different lodge)
- Inserts after current day
- Auto-renumbers subsequent days
- Use case: Same location for 3 days, different lodges

**Delete Day**
- Confirmation dialog: "Delete Day 3?"
- Auto-renumbers subsequent days
- Cannot delete if only 2 days remain (minimum for multi-day)

**Add Day**
- Appends to end
- Pre-fills: Meals (all checked), blank title/description
- Focuses on title field for immediate editing

### 6.5 Day Field Specifications

**Day Title**
- Required: No (defaults to "Day N")
- Max length: 60 characters
- Examples: "Arrival in Lima", "Machu Picchu", "Perito Moreno Glacier"

**Description / Activities**
- Required: Yes
- Max length: 500 characters (shorter than tour overview)
- Min length: 50 characters
- Helper text: "What will participants do today? Include locations and key species."

**Target Species**
- Required: No
- Max: 5 species per day (prevents overwhelming)
- Same autocomplete as tour-level species

**Accommodation**
- Required: Yes (except last day)
- Type: Text input
- Max length: 100 characters
- Example: "Hosteria Helsingfors, El Calafate", "Tambopata Research Center"

**Accommodation Notes (Private)**
- Required: No
- Type: Textarea
- Max length: 500 characters
- Visibility: Operator only, never shown to participants
- Use case: Track booking confirmations, deposit status, contact info

**Meals Included**
- Required: Yes
- Type: Checkboxes (all checked by default)
- Options: Breakfast, Lunch, Dinner
- Special note field (Phase 2): "Dinner Day 3 = BBQ at lodge"

---

## 7. Step 4: Pricing & Participants

### 7.1 Purpose
Set tour economics: price per person, threshold, maximum group size.

### 7.2 Layout

```
┌─────────────────────────────────────────────┐
│ Pricing & Group Size                        │
│ ─────────────────────────────────────────── │
│                                             │
│ Price Per Person (USD) *                    │
│ [$4,200.00                                 ]│
│ Help: All-inclusive price per participant   │
│                                             │
│ Group Size                                  │
│                                             │
│ Minimum Participants (Threshold) *          │
│ [6]                                         │
│ Help: Tour confirms when this many book     │
│                                             │
│ Maximum Participants *                      │
│ [10]                                        │
│ Help: Hard limit for group size             │
│                                             │
│ ℹ️ Your tour will confirm when 6 people     │
│    have committed. You can accept up to     │
│    10 participants total.                   │
│                                             │
│ Early Bird Discount (Optional)              │
│ ☐ Offer discount for early bookings        │
│                                             │
│ [If checked, show:]                         │
│ Discount Amount: [$200] or [5%]            │
│ Valid Until: [60 days before departure]     │
│                                             │
│ [← Back]          [Save Draft] [Continue →]│
└─────────────────────────────────────────────┘
```

### 7.3 Field Specifications

**Price Per Person**
- Required: Yes
- Type: Number input (currency)
- Min: $10
- Max: $50,000
- Validation: Must be positive number
- Display: Formatted with $ and commas ($4,200.00)

**Minimum Participants (Threshold)**
- Required: Yes
- Type: Number input
- Min: 1
- Max: 50
- Default: 4 (common birding group minimum)
- Validation: Must be ≤ maximum participants

**Maximum Participants**
- Required: Yes
- Type: Number input
- Min: 1
- Max: 50
- Default: 8 (common birding group maximum)
- Validation: Must be ≥ minimum participants

**Early Bird Discount**
- Required: No
- Type: Checkbox + conditional fields
- Discount type: Dollar amount OR percentage
- Valid until: Days before departure OR specific date
- Phase 2 feature (not MVP)

### 7.4 Validation & Warnings

**Threshold Warning:**
- If threshold >12: "⚠️ Large groups can impact birding quality in forests"
- If threshold <3: "⚠️ Low threshold may not cover operational costs"

**Price Warning:**
- If multi-day and price <$100/day: "⚠️ Price seems low for multi-day tour"
- If single-day and price >$500: "⚠️ Price seems high for single-day tour"

These are warnings, not errors (operator can proceed).

---

## 8. Step 5: Inclusions & Logistics

### 8.1 Purpose
Clarify what's included/excluded to set participant expectations.

### 8.2 Layout

```
┌─────────────────────────────────────────────┐
│ What's Included                              │
│ ─────────────────────────────────────────── │
│                                             │
│ Included in Tour Price                      │
│ ☑ Professional guide                        │
│ ☑ Ground transport                          │
│ ☑ Accommodation (multi-day only)            │
│ ☑ Meals as specified                        │
│ ☑ Park/reserve entrance fees                │
│ ☐ Spotting scope                            │
│ ☐ Field guide books                         │
│ [+ Add custom inclusion]                    │
│                                             │
│ NOT Included (Participants Pay Separately)  │
│ ☑ International flights                     │
│ ☑ Travel insurance                          │
│ ☑ Alcoholic beverages                       │
│ ☑ Personal equipment (binoculars, camera)   │
│ ☑ Tips for guide                            │
│ [+ Add custom exclusion]                    │
│                                             │
│ Cancellation Policy                         │
│ ○ Standard (refund if tour doesn't confirm) │
│ ○ Flexible (full refund up to 30 days)     │
│ ○ Strict (no refunds after booking)         │
│ ○ Custom (specify below)                    │
│                                             │
│ [Custom policy text area if Custom selected]│
│                                             │
│ [← Back]          [Save Draft] [Continue →]│
└─────────────────────────────────────────────┘
```

### 8.3 Field Specifications

**Included in Tour Price**
- Type: Checkboxes (pre-populated) + custom input
- Pre-populated items: Common inclusions for birding tours
- Custom items: Operator can add tour-specific inclusions
- Display: Bullet list on public tour page

**NOT Included**
- Type: Checkboxes (pre-populated) + custom input
- Pre-populated items: Common exclusions
- Purpose: Transparency, prevent surprises

**Cancellation Policy**
- Required: Yes
- Type: Radio buttons
- Options:
  - **Standard (recommended)**: Refund if tour doesn't reach threshold
  - **Flexible**: Full refund up to 30 days before departure
  - **Strict**: No refunds after booking (payment plans only)
  - **Custom**: Operator writes their own policy
- Default: Standard (matches Quorum's threshold model)

---

## 9. Step 6: Preview & Publish

### 9.1 Purpose
Let operator review tour as participants will see it before publishing.

### 9.2 Layout

```
┌─────────────────────────────────────────────┐
│ Preview Your Tour                            │
│ ─────────────────────────────────────────── │
│                                             │
│ ℹ️ This is how participants will see your   │
│    tour. You can still edit after publishing│
│                                             │
│ ┌─────────────────────────────────────────┐│
│ │ [TOUR PREVIEW - same as public page]    ││
│ │                                         ││
│ │ Patagonian Birding Adventure            ││
│ │ May 10-24, 2026 • 14 days              ││
│ │ $4,200 per person                       ││
│ │                                         ││
│ │ 🟡 FORMING  0/6 participants            ││
│ │                                         ││
│ │ [Full tour content preview...]          ││
│ └─────────────────────────────────────────┘│
│                                             │
│ [← Back to Edit]  [Save as Draft]          │
│                                             │
│ [Publish Tour →]                            │
│ Once published, participants can discover   │
│ and book your tour.                         │
└─────────────────────────────────────────────┘
```

### 9.3 Publish Confirmation

```
┌─────────────────────────────────────────┐
│ Publish Tour?                           │
├─────────────────────────────────────────┤
│ Your tour will be:                      │
│ ✓ Visible in tour listings             │
│ ✓ Discoverable by target species       │
│ ✓ Available for bookings immediately    │
│                                         │
│ You can edit or cancel the tour after  │
│ publishing.                             │
│                                         │
│ [Keep as Draft] [Publish Tour]          │
└─────────────────────────────────────────┘
```

### 9.4 Post-Publish Actions

After publishing:
1. Show success message: "Tour published! [View Public Page]"
2. Navigate to My Tours page
3. Highlight newly published tour
4. Optional: Show tip "Share your tour on social media" with pre-filled text

---

## 10. Templates & Duplication

### 10.1 Duplicate from My Tours

**Entry Point:** "Duplicate" button on tour card in My Tours page

**Flow:**
1. Copy all tour data
2. Navigate to Create Tour page
3. Pre-fill all fields
4. Update tour title: "Patagonian Birding Adventure (Copy)"
5. Update dates: Add 1 year to all dates
6. Set status: 'draft'
7. Show banner: "Editing duplicated tour. Review and update dates before publishing."

**Technical:**
```tsx
// From My Tours
const handleDuplicate = async (tourId: string) => {
  const response = await fetch(`/api/operator/tours/${tourId}/duplicate`, {
    method: 'POST'
  });
  const {newTourId} = await response.json();
  router.push(`/operator/tours/create?duplicate=${newTourId}`);
};

// In Create Tour page
const {data: duplicatedTour} = useTour(searchParams.get('duplicate'));
if (duplicatedTour) {
  // Pre-fill form with duplicated data
  form.setValues({
    ...duplicatedTour,
    title: `${duplicatedTour.title} (Copy)`,
    start_date: addYears(duplicatedTour.start_date, 1),
    status: 'draft'
  });
}
```

### 10.2 Day Templates (Phase 2)

**Purpose:** Save reusable day patterns

**Example Templates:**
- "Arrival Day" - Airport pickup, hotel check-in, rest
- "Full Day Birding" - Dawn start, full day in field, evening return
- "Travel Day" - Morning birding, afternoon transfer, evening arrival
- "Departure Day" - Morning birding, lunch, airport transfer

**UI:**
```
┌──────────────────────────────────────────┐
│ Add Day 8                                │
├──────────────────────────────────────────┤
│ Start from:                              │
│ ○ Blank day                              │
│ ○ Template:                              │
│   [Select template ▼]                    │
│     - Arrival Day                        │
│     - Full Day Birding                   │
│     - Travel Day                         │
│     - Departure Day                      │
│     - (My custom templates...)           │
│                                          │
│ [Cancel] [Add Day]                       │
└──────────────────────────────────────────┘
```

---

## 11. Validation & Error Handling

### 11.1 Required Field Validation

**Cannot proceed to next step if:**
- Step 1: Tour type not selected
- Step 2: Title empty OR description <50 chars
- Step 3A: Date empty OR start time empty OR duration empty
- Step 3B: <2 days OR any day missing description OR accommodation missing (except last day)
- Step 4: Price empty OR min participants empty OR max participants empty
- Step 5: Cancellation policy not selected

**Visual Indicators:**
- Red border on invalid fields
- Error message below field: "Tour title is required"
- Disabled "Continue" button
- Checklist at bottom: "✓ Overview complete, ✗ Details incomplete"

### 11.2 Date Validation

**Single-Day:**
- Must be future date
- Warning if <60 days: "Short notice - consider supplier availability"

**Multi-Day:**
- End date must be after start date
- Warning if <90 days: "Multi-day tours typically need more lead time"
- Max duration: 365 days (prevents accidental year-long tours)

### 11.3 Character Limits

| Field | Min | Max | Show Count At |
|-------|-----|-----|---------------|
| Tour title | - | 80 | Always |
| Tour description | 50 | 2000 | Always |
| Day title | - | 60 | 75% |
| Day description | 50 | 500 | Always |
| Accommodation | - | 100 | Never |
| Meeting point | - | 200 | Never |

### 11.4 Network Errors

**Auto-save failure:**
```
┌──────────────────────────────────────┐
│ ⚠️ Could not save draft              │
│                                      │
│ Your changes are still in this form. │
│ Check your internet connection.      │
│                                      │
│ [Try Again] [Dismiss]                │
└──────────────────────────────────────┘
```

**Publish failure:**
```
┌──────────────────────────────────────┐
│ ❌ Could not publish tour            │
│                                      │
│ Your tour has been saved as a draft. │
│ Please try publishing again.          │
│                                      │
│ [Try Again] [Save as Draft]          │
└──────────────────────────────────────┘
```

---

## 12. Accessibility

### 12.1 Keyboard Navigation

**Tab order:**
1. Progress indicator (skip link: "Skip to form")
2. Form fields (top to bottom)
3. Action buttons (Back, Save Draft, Continue)

**Enter key behavior:**
- In text input: Move to next field
- On button: Activate button
- In textarea: Insert line break (Shift+Enter to submit)

### 12.2 Screen Reader

**Progress indicator:**
```tsx
<nav aria-label="Tour creation progress">
  <ol>
    <li aria-current={step === 1 ? 'step' : undefined}>
      <span className="sr-only">{step === 1 ? 'Current step: ' : ''}</span>
      Tour Type
    </li>
    {/* ... */}
  </ol>
</nav>
```

**Form fields:**
```tsx
<label htmlFor="tour-title">
  Tour Title
  <span aria-label="required">*</span>
</label>
<input
  id="tour-title"
  aria-required="true"
  aria-invalid={errors.title ? 'true' : 'false'}
  aria-describedby="tour-title-help tour-title-error"
/>
<p id="tour-title-help" className="text-sm text-muted">
  This appears in tour listings
</p>
{errors.title && (
  <p id="tour-title-error" role="alert" className="text-sm text-red-600">
    {errors.title}
  </p>
)}
```

### 12.3 WCAG AAA Compliance

- **Form labels:** 16px minimum, high contrast
- **Helper text:** 14px, muted but still 7:1 contrast
- **Error messages:** Red text + red border (not color alone)
- **Required indicators:** Asterisk + "required" in screen reader text
- **Focus indicators:** 2px outline, forest green, visible on all interactive elements

---

## 13. Mobile Considerations

### 13.1 Desktop-First Design

**Primary Device:** Desktop/laptop (1280px+)
**Rationale:**
- Operators won't create complex multi-day tours on phones
- Day-by-day builder requires screen real estate
- Drag-and-drop doesn't work well on mobile

### 13.2 Mobile Behavior

**Read-Only Preview:**
- Mobile users can VIEW draft tours
- Edit button → "Please use desktop to edit tours"
- Can save simple edits (title, price) via simplified form

**Responsive Breakpoints:**
- **Desktop:** Full multi-column layout, drag-and-drop
- **Tablet (768-1279px):** Single column, up/down buttons instead of drag
- **Mobile (<768px):** Read-only preview, "Edit on desktop" banner

---

## 14. Data Model

### 14.1 Tour Table

```typescript
interface Tour {
  id: uuid;
  operator_id: uuid;
  type: 'single_day' | 'multi_day';
  status: 'draft' | 'published' | 'forming' | 'confirmed' | 'completed' | 'cancelled';

  // Overview
  title: string;  // max 80
  summary: text;  // max 2000
  hero_image_url: string | null;
  primary_location: string | null;

  // Single-day specific
  tour_date: date | null;
  start_time: time | null;
  duration_hours: number | null;
  meeting_point: string | null;
  itinerary_text: text | null;  // for single-day

  // Multi-day specific
  start_date: date | null;
  end_date: date | null;
  duration_days: number;  // computed

  // Common
  difficulty: 'easy' | 'moderate' | 'difficult';
  price_per_person: decimal;
  min_participants: integer;
  max_participants: integer;

  // Logistics
  inclusions: jsonb;  // {guide: true, transport: true, ...}
  exclusions: jsonb;
  cancellation_policy: 'standard' | 'flexible' | 'strict' | 'custom';
  cancellation_policy_text: text | null;

  // Meta
  created_at: timestamp;
  updated_at: timestamp;
  published_at: timestamp | null;
}
```

### 14.2 Tour Days Table

```typescript
interface TourDay {
  id: uuid;
  tour_id: uuid;
  day_number: integer;  // 1, 2, 3...

  title: string | null;  // max 60
  description: text;  // max 500, required
  accommodation: string | null;  // max 100
  accommodation_notes: text | null;  // private, max 500

  meals_breakfast: boolean;
  meals_lunch: boolean;
  meals_dinner: boolean;

  created_at: timestamp;
  updated_at: timestamp;
}
```

### 14.3 Tour Species Table (Many-to-Many)

```typescript
interface TourSpecies {
  id: uuid;
  tour_id: uuid;
  tour_day_id: uuid | null;  // null = tour-level
  species_id: uuid;  // references species table (AviList)
  is_highlight: boolean;  // true for tour-level targets
  created_at: timestamp;
}
```

---

## 15. Success Criteria

### Usability
- [ ] Operators can create single-day tour in <5 minutes
- [ ] Operators can duplicate past tour and update in <10 minutes
- [ ] Multi-day itinerary builder supports 2-30 days without performance degradation
- [ ] Auto-save prevents data loss during interruptions
- [ ] Preview matches public page exactly

### Performance
- [ ] Form loads in <1 second
- [ ] Auto-save completes in <500ms
- [ ] Day reordering (drag-drop) feels instant (<100ms)
- [ ] Publishing completes in <2 seconds

### Accessibility
- [ ] WCAG AAA compliance (7:1 contrast)
- [ ] Keyboard navigation functional for entire flow
- [ ] Screen reader announces errors and progress
- [ ] Focus management during step transitions

### Design System
- [ ] All typography uses design tokens
- [ ] All colors from palette
- [ ] Organic border radius applied consistently
- [ ] Form follows established dashboard patterns

---

## 16. Implementation Notes

### File Structure

```
src/app/operator/tours/create/
  page.tsx                    // Main create tour page
  components/
    TourTypeSelector.tsx      // Step 1
    TourOverview.tsx          // Step 2
    SingleDayForm.tsx         // Step 3A
    MultiDayBuilder.tsx       // Step 3B
    DayEditor.tsx             // Day edit modal
    PricingForm.tsx           // Step 4
    InclusionsForm.tsx        // Step 5
    TourPreview.tsx           // Step 6
```

### State Management

```tsx
// Use React Hook Form for form state
const form = useForm<TourFormData>({
  defaultValues: {...},
  mode: 'onBlur'  // validate on blur
});

// Use custom hook for auto-save
const {lastSaved, isSaving} = useAutoSave({
  data: form.watch(),
  endpoint: '/api/operator/tours/draft',
  interval: 30000
});

// Use zustand for wizard step state
const {currentStep, goToStep, canProceed} = useTourWizard();
```

---

## 17. Next Steps After CREATE TOUR IA

1. **BOOKINGS IA** - Participant management across tours
2. **EARNINGS IA** - Revenue dashboard and payout tracking
3. **PROFILE IA** - Operator profile editing
4. **HELP IA** - Documentation and support

**Dependencies:**
- CREATE TOUR depends on: MY TOURS (for navigation)
- BOOKINGS depends on: MY TOURS (for tour selection)
- All views depend on: Sidebar navigation (✅ built)

---

**Status:** ✅ Ready for implementation
**Estimated Complexity:** HIGH
**Estimated Build Time:** 7-10 days (multi-step wizard, day builder, validation, auto-save)
