# OPERATOR-DASHBOARD-HELP-IA-001

**Document Type:** Information Architecture Specification
**Component:** Operator Dashboard - Help View
**Status:** Draft
**Created:** 2026-01-22
**Design System:** Organic Biophilic (HOME-REDESIGN-DECISIONS.md)
**Target Users:** Tour operators aged 50-70
**Complexity:** Low-Medium
**Estimated Build:** 2-3 days

---

## Purpose

The Help view provides tour operators with searchable FAQs, documentation, and direct access to support. This addresses operator pain points around learning the platform and getting help when needed, especially for operators who may not be highly technical.

**Key User Goals:**
- Find answers to common questions quickly
- Search for specific help topics
- Contact support when self-service doesn't solve the issue
- Access guides and resources for tour creation and management
- Get help with specific features (bookings, earnings, profile)

---

## Layout Structure

### Desktop View (Primary)

```
┌─────────────────────────────────────────────────────────────────┐
│ HELP & SUPPORT                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ ┌───────────────────────────────────────────────────────────────┐│
│ │ 🔍 Search for help...                                         ││
│ └───────────────────────────────────────────────────────────────┘│
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ QUICK ACTIONS                                               │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │                                                             │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │ │
│ │ │ 📝 Create   │ │ 📊 View     │ │ 💬 Contact  │          │ │
│ │ │   Your First│ │   Tutorial  │ │   Support   │          │ │
│ │ │   Tour      │ │   Videos    │ │             │          │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘          │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ FREQUENTLY ASKED QUESTIONS                                  │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │                                                             │ │
│ │ Getting Started                                             │ │
│ │ ▼ How do I create my first tour?                           │ │
│ │ ▼ What information do I need to get started?               │ │
│ │ ▼ How do participants find my tours?                       │ │
│ │                                                             │ │
│ │ Creating Tours                                              │ │
│ │ ▶ What's the difference between single-day and multi-day?  │ │
│ │ ▶ How do I set the minimum participants threshold?         │ │
│ │ ▶ Can I duplicate an existing tour?                        │ │
│ │                                                             │ │
│ │ Managing Bookings                                           │ │
│ │ ▶ How do I know when someone books?                        │ │
│ │ ▶ What happens if a participant cancels?                   │ │
│ │ ▶ Can I export my participant list?                        │ │
│ │                                                             │ │
│ │ [Show More FAQ Topics...]                                   │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ RESOURCES                                                   │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │                                                             │ │
│ │ 📖 Operator Handbook (PDF)                                 │ │
│ │ 🎥 Video Tutorials                                         │ │
│ │ 📋 Tour Creation Best Practices                            │ │
│ │ 💳 Payment & Payout Guide                                  │ │
│ │ 🌐 eBird Integration Guide                                 │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ STILL NEED HELP?                                            │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │                                                             │ │
│ │ Can't find what you're looking for?                        │ │
│ │ Our support team is here to help.                          │ │
│ │                                                             │ │
│ │ [Contact Support]                                           │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile View (Preview Only)

```
┌──────────────────────────┐
│ Help & Support           │
├──────────────────────────┤
│                          │
│ ┌────────────────────┐   │
│ │ 🔍 Search...      │   │
│ └────────────────────┘   │
│                          │
│ Quick Actions            │
│ ┌────────────────────┐   │
│ │ Create Tour       │   │
│ └────────────────────┘   │
│ ┌────────────────────┐   │
│ │ Tutorial Videos   │   │
│ └────────────────────┘   │
│                          │
│ FAQs                     │
│ ▼ How do I create...    │
│ ▶ What information...   │
│                          │
│ [Contact Support]        │
│                          │
└──────────────────────────┘
```

---

## Component Details

### 1. Search Bar

**Element:** Large search input at top of page

**Layout:**
```
┌───────────────────────────────────────────────────────────────┐
│ 🔍 Search for help...                                         │
└───────────────────────────────────────────────────────────────┘
```

**Features:**
- Prominent placement (hero area)
- Large font size (18px)
- Placeholder: "Search for help..." or "How can we help you?"
- Icon: MagnifyingGlass (Lucide React)
- Searches across:
  - FAQ questions and answers
  - Resource document titles
  - Common keywords

**Search Behavior:**
1. User types query
2. Show results as dropdown (instant search, no submit button)
3. Results grouped by type:
   - FAQ Questions (top 3)
   - Resources (top 3)
   - "Contact Support" option (if no results)
4. Click result → Jumps to FAQ or opens resource

**Search Results Dropdown:**
```
┌───────────────────────────────────────────────────────────────┐
│ 🔍 create a tour                                              │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│ FAQ Questions                                                  │
│ • How do I create my first tour?                              │
│ • What's the difference between single-day and multi-day?     │
│ • Can I duplicate an existing tour?                           │
│                                                                │
│ Resources                                                      │
│ • 📋 Tour Creation Best Practices                             │
│ • 🎥 Video Tutorial: Creating Your First Tour                 │
│                                                                │
│ [View All Results for "create a tour"]                        │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

**No Results State:**
```
┌───────────────────────────────────────────────────────────────┐
│ 🔍 advanced api integration                                   │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│ No results found for "advanced api integration"               │
│                                                                │
│ Try:                                                           │
│ • Checking your spelling                                      │
│ • Using different keywords                                    │
│ • Browsing FAQs by category                                   │
│                                                                │
│ Or contact our support team for help.                         │
│ [Contact Support]                                              │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: `bg-[var(--color-surface)]`
- Border: `border-2 border-[var(--color-border)]`
- Border radius: `rounded-[var(--radius-organic)]`
- Padding: `p-4`
- Font size: 18px
- Focus state: Border changes to `border-[var(--color-primary)]`

**Accessibility:**
- Label: "Search help documentation"
- Live region announces result count
- Keyboard navigation: Arrow keys to select result, Enter to open
- Escape key clears search

---

### 2. Quick Actions

**Element:** 3-card grid with common actions

**Cards:**

1. **Create Your First Tour**
   - Icon: FilePlus (Lucide React)
   - Link to: /operator/tours/create
   - Purpose: Shortcut for new operators

2. **View Tutorial Videos**
   - Icon: Video (Lucide React)
   - Link to: #tutorial-videos (anchor on page) or external video library
   - Purpose: Visual learners

3. **Contact Support**
   - Icon: MessageCircle (Lucide React)
   - Link to: #contact-support (opens form)
   - Purpose: Direct help access

**Card Structure:**
```
┌─────────────────────┐
│      📝             │
│                     │
│  Create Your First  │
│      Tour           │
│                     │
└─────────────────────┘
```

**Card Styling:**
- Background: `bg-[var(--color-surface)]`
- Border: `border-2 border-[var(--color-border)]`
- Border radius: `rounded-[var(--radius-organic)]`
- Shadow: `shadow-[var(--shadow-card)]`
- Padding: `p-6`
- Hover: `border-[var(--color-primary)]`, slight lift
- Icon size: 32px, centered
- Text: Centered, font-medium

**Layout:**
- `grid grid-cols-1 md:grid-cols-3 gap-6`

**Accessibility:**
- Each card is a clickable link
- Icon decorative, text provides full context
- Focus states visible
- Cursor pointer on hover

---

### 3. FAQ Sections

**Element:** Accordion-style expandable FAQ sections

**Categories:**
1. Getting Started
2. Creating Tours
3. Managing Bookings
4. Payments & Earnings
5. Profile & Account
6. Troubleshooting

**Each Category:**
- Category name (text-xl, font-semibold)
- 3-5 questions (expandable)
- "Show More" button if more than 5 questions

**Accordion Item Structure:**

**Collapsed:**
```
▶ How do I create my first tour?
```

**Expanded:**
```
▼ How do I create my first tour?

  Creating your first tour is easy:

  1. Click "Create Tour" in the sidebar
  2. Choose "Single Day" or "Multi-Day"
  3. Fill in tour details (name, description, dates)
  4. Set your pricing and participant limits
  5. Add photos and itinerary details
  6. Preview and publish

  Need more help? Watch our video tutorial or contact support.
  [🎥 Video Tutorial] [💬 Contact Support]
```

**FAQ Examples by Category:**

**Getting Started:**
- How do I create my first tour?
- What information do I need to get started?
- How do participants find my tours?
- How does the payment system work?

**Creating Tours:**
- What's the difference between single-day and multi-day tours?
- How do I set the minimum participants threshold?
- Can I duplicate an existing tour?
- How do I add target species to my tour?
- What's the best way to write a tour description?

**Managing Bookings:**
- How do I know when someone books?
- What happens if a participant cancels?
- Can I export my participant list?
- How do I communicate with participants?
- What if I need to cancel a tour?

**Payments & Earnings:**
- When do I get paid?
- What percentage does Quorum Tours take?
- How do I update my bank account?
- Can I see my revenue breakdown by tour?
- What happens if a participant requests a refund?

**Profile & Account:**
- How do I update my operator profile?
- Should I enable two-factor authentication?
- How do I change my password?
- Can I preview how my profile looks to participants?

**Troubleshooting:**
- Why isn't my tour appearing in search?
- I forgot my password, how do I reset it?
- How do I report a bug or issue?
- Why haven't I received a booking notification?

**Accordion Styling:**
- Question: `font-medium`, `text-[var(--color-ink)]`
- Icon: Chevron (▶ collapsed, ▼ expanded)
- Answer: Padded left (pl-6), `text-[var(--color-ink-muted)]`
- Spacing: 12px between items
- Border bottom: Subtle divider between items

**Accordion Behavior:**
- Click question to expand/collapse
- Multiple items can be open at once (not exclusive)
- URL updates with fragment: `#faq-create-first-tour`
- Keyboard accessible (Enter/Space to toggle)

**Accessibility:**
- Proper heading hierarchy (h2 for category, h3 for question)
- `aria-expanded` state on accordion triggers
- `role="region"` on answer panels
- Focus management on expand/collapse

---

### 4. Resources Section

**Element:** List of downloadable/viewable resources

**Resources:**

```
┌─────────────────────────────────────────────────────────────┐
│ RESOURCES                                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📖 Operator Handbook (PDF)                                 │
│    Complete guide to using the Quorum Tours platform       │
│    [Download PDF]                                           │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ 🎥 Video Tutorials                                         │
│    Step-by-step videos for common tasks                    │
│    [Watch Videos]                                           │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ 📋 Tour Creation Best Practices                            │
│    Tips for creating attractive, bookable tours            │
│    [Read Guide]                                             │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ 💳 Payment & Payout Guide                                  │
│    Understanding payments, fees, and payout schedules      │
│    [Read Guide]                                             │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ 🌐 eBird Integration Guide                                 │
│    How to connect your eBird profile and trip reports      │
│    [Read Guide]                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Resource Card Structure:**
- Icon (emoji or Lucide icon)
- Title (font-medium, text-lg)
- Description (text-sm, muted)
- Action link/button

**Resource Types:**
- **PDF Downloads:** Operator Handbook (comprehensive guide)
- **External Links:** Video tutorial library (YouTube/Vimeo)
- **Internal Guides:** Text-based guides (markdown/HTML)

**Styling:**
- Background: `bg-[var(--color-surface)]`
- Border: `border-2 border-[var(--color-border)]`
- Border radius: `rounded-[var(--radius-organic)]`
- Padding: `p-6`
- Dividers between items
- Icons: 24px, `text-[var(--color-primary)]`
- Links: `text-[var(--color-primary)]`, underline on hover

**Accessibility:**
- Links clearly labeled with action and format
- PDF downloads include file size
- External links marked as "opens in new tab"
- Icons decorative, text provides full context

---

### 5. Contact Support Section

**Element:** Call-to-action to contact support team

**Default State:**
```
┌─────────────────────────────────────────────────────────────┐
│ STILL NEED HELP?                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Can't find what you're looking for?                        │
│ Our support team is here to help.                          │
│                                                             │
│ [Contact Support]                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Expanded State (after clicking button):**
```
┌─────────────────────────────────────────────────────────────┐
│ CONTACT SUPPORT                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Your Name                                                   │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Roberto Clay                                            ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Email Address                                               │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ roberto@example.com                                     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Category                                                    │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Select a category ▼                                     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Subject *                                                   │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Help with creating multi-day tour                       ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Message *                                                   │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ I'm trying to create a 7-day tour but I'm not sure how ││
│ │ to add daily itineraries...                             ││
│ │                                                          ││
│ │ (Textarea, 5 rows)                                       ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Attach Screenshot (Optional)                                │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ [Choose File]                                           ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Expected response time: Within 24 hours                     │
│                                                             │
│                              [Cancel] [Send Message]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Form Fields:**

1. **Your Name** (Pre-filled from profile, read-only)
2. **Email Address** (Pre-filled from profile, editable)
3. **Category** (Dropdown)
   - Tour Creation
   - Bookings & Participants
   - Payments & Earnings
   - Profile & Account
   - Technical Issue
   - Other
4. **Subject** (Required, text input, max 100 chars)
5. **Message** (Required, textarea, max 2000 chars, character counter)
6. **Attach Screenshot** (Optional, accepts .jpg, .png, .pdf, max 5MB)

**Submission Behavior:**
1. Validate required fields
2. Show loading state on "Send Message" button
3. Submit to support ticket system
4. Show success message
5. Send confirmation email to operator

**Success Message:**
```
┌─────────────────────────────────────────────────────────────┐
│ Message Sent ✓                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Thank you for contacting us!                               │
│                                                             │
│ We've received your message and will respond within        │
│ 24 hours to roberto@example.com.                           │
│                                                             │
│ Ticket #: SUP-2026-001234                                  │
│                                                             │
│ [Close]                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: `bg-[var(--color-surface)]`
- Border: `border-2 border-[var(--color-border)]`
- Border radius: `rounded-[var(--radius-organic)]`
- Form inputs: Match design system
- Submit button: Primary button style
- Success message: Green accent border

**Accessibility:**
- All form fields properly labeled
- Required fields marked
- Error messages shown inline
- File upload accessible
- Success message announced to screen readers

---

## Interactions

### Search

**Trigger:** User types in search bar

**Behavior:**
1. Debounce input (300ms)
2. Show loading spinner in search bar
3. Fetch results from search API
4. Display results dropdown
5. Highlight matching text in results
6. Click result → Navigate to FAQ or resource

**Keyboard Navigation:**
- Arrow keys: Navigate results
- Enter: Open selected result
- Escape: Close dropdown

---

### Expand/Collapse FAQ

**Trigger:** Click FAQ question

**Behavior:**
1. Toggle expanded state
2. Animate expand/collapse (200ms)
3. Update chevron icon (▶ ↔ ▼)
4. Update URL fragment: `#faq-{id}`
5. Focus management (stay on question)

**Deep Linking:**
- If URL has fragment matching FAQ ID, auto-expand that question
- Scroll to expanded question
- Highlight briefly (2 second yellow background fade)

---

### Open Contact Form

**Trigger:** Click "Contact Support" button

**Behavior:**
1. Expand contact form section
2. Pre-fill name and email from profile
3. Focus on category dropdown
4. Scroll to form

**Alternative: Modal:**
- Instead of expanding on page, open modal
- Benefits: Doesn't lose scroll position
- Trade-off: Less screen real estate

---

### Submit Support Ticket

**Trigger:** Click "Send Message" in contact form

**Behavior:**
1. Validate all required fields
2. Show inline errors if validation fails
3. If valid: Show loading state on button
4. Upload attachment (if any)
5. Submit ticket to support system
6. Show success message
7. Send confirmation email
8. Reset form (or close modal)

**Validation:**
- Subject: Required, 10-100 characters
- Message: Required, 50-2000 characters
- Email: Valid email format
- Attachment: Valid file type, < 5MB

---

## States

### Loading States

1. **Search Results Loading:**
   - Spinner icon in search bar
   - "Searching..." text (screen reader only)
   - Duration: Until results return

2. **Contact Form Submitting:**
   - "Send Message" button shows spinner
   - Button text: "Sending..."
   - Button disabled
   - Duration: Until submission completes

**Skeleton Styling:**
- Background: `bg-[var(--color-surface-sunken)]`
- Animation: `animate-pulse`

---

### Empty States

1. **No Search Results:**
   (Already shown in Search Bar component)

2. **No FAQs Loaded:**
   ```
   ┌───────────────────────────────────────────┐
   │                                            │
   │ Failed to load FAQs                        │
   │                                            │
   │ Please try refreshing the page.            │
   │                                            │
   │ [Refresh]                                  │
   │                                            │
   └───────────────────────────────────────────┘
   ```

---

### Error States

1. **Failed to Load FAQs:**
   (Already shown above)

2. **Failed to Submit Support Ticket:**
   ```
   Toast notification:
   ┌─────────────────────────────────┐
   │ ⚠️ Failed to send message       │
   │ Please try again or email       │
   │ support@quorumtours.com         │
   │                            [✕]  │
   └─────────────────────────────────┘
   ```

3. **Failed to Upload Attachment:**
   ```
   Inline error:
   ⚠️ File upload failed. Please ensure the file is under 5MB and in a supported format (.jpg, .png, .pdf).
   ```

**Error Styling:**
- Icon: `text-amber-600`
- Background: `bg-amber-50`, `border border-amber-200`
- Text: `text-amber-900`

---

## Responsive Behavior

### Desktop (1024px+)

- Full layout with 3-column quick actions grid
- FAQs in 1-column (readable width)
- Contact form full width (max-width: 600px, centered)

### Tablet (768px - 1023px)

- Quick actions: 3-column grid (slightly smaller cards)
- FAQs: 1-column
- Contact form: Full width (max-width: 600px)

### Mobile (< 768px)

- Quick actions: 1-column stack
- FAQs: 1-column
- Contact form: Full width
- Search bar: Full width

---

## Accessibility (WCAG AAA)

### Color & Contrast

- **Body Text:** 7:1 contrast ratio (18px Atkinson Hyperlegible)
- **Headings:** 7:1 contrast ratio
- **Links:** 4.5:1 minimum, underline on hover
- **Icons:** Decorative, text provides context

### Keyboard Navigation

- **Tab Order:** Logical flow (search → quick actions → FAQs → resources → contact)
- **Search Dropdown:** Arrow keys navigate results
- **Accordion:** Enter/Space to expand/collapse
- **Contact Form:** Standard form navigation

### Screen Readers

- **Headings:** Proper hierarchy (h1 for page, h2 for sections, h3 for FAQs)
- **Landmarks:** `<main>`, `<section>` with labels
- **Accordion:** `aria-expanded`, `role="region"`
- **Search:** Live region announces result count
- **Form:** All inputs properly labeled, errors announced

### Focus States

- **Visible Focus Ring:** 2px on all interactive elements
- **Skip to Content:** "Skip to main content" link at top
- **Focus Management:** Accordion keeps focus on trigger when collapsed

---

## Data Requirements (TODO)

### API Endpoints

1. **GET /api/help/search**
   - Query param: `q` (search query)
   - Returns: Array of FAQ and resource results
   - Response time: < 300ms

2. **GET /api/help/faqs**
   - Returns: All FAQ categories and questions
   - Response time: < 200ms

3. **GET /api/help/resources**
   - Returns: List of resources with URLs
   - Response time: < 200ms

4. **POST /api/support/ticket**
   - Body: { name, email, category, subject, message, attachment? }
   - Returns: Ticket ID, confirmation
   - Response time: < 2 seconds

5. **POST /api/support/attachment**
   - Body: FormData with file
   - Returns: Attachment URL
   - Max file size: 5MB

### Data Models

**FAQ:**
```typescript
interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;                    // HTML or Markdown
  related_resources?: string[];      // Resource IDs
  keywords: string[];                // For search
}
```

**Resource:**
```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'guide' | 'external';
  url: string;
  icon?: string;                     // Emoji or Lucide icon name
  file_size?: string;                // For PDFs: "2.5 MB"
}
```

**SupportTicket:**
```typescript
interface SupportTicket {
  name: string;
  email: string;
  category: 'tour-creation' | 'bookings' | 'payments' | 'profile' | 'technical' | 'other';
  subject: string;
  message: string;
  attachment_url?: string;
  operator_id: string;
  created_at: string;                // ISO timestamp
}
```

**SearchResult:**
```typescript
interface SearchResult {
  type: 'faq' | 'resource';
  id: string;
  title: string;
  snippet: string;                   // Highlighted excerpt
  url: string;                       // Link to FAQ or resource
}
```

---

## Implementation Notes

### Phase 1: Static UI (Estimated 2-3 days)

1. **Day 1:** Page structure + search + quick actions
   - Create HelpPage component
   - Build search bar UI (no search yet)
   - Create quick action cards
   - Link to other views/external resources

2. **Day 2:** FAQ accordion + resources
   - Build FAQ sections with accordion
   - Implement expand/collapse behavior
   - Create resources list
   - Style with design system

3. **Day 3:** Contact form + polish
   - Build contact support form
   - Form validation
   - Success/error states
   - Accessibility testing

### Phase 2: API Integration (Future)

- Implement search API with debouncing
- Load FAQs from CMS or database
- Submit support tickets to ticketing system
- File upload for attachments
- Email confirmation on ticket submission

### Component Structure

```
src/
  components/
    operator/
      help/
        HelpPage.tsx                  (main container)
        SearchBar.tsx                 (search input + results)
        QuickActions.tsx              (3-card grid)
        FAQSection.tsx                (accordion component)
        FAQItem.tsx                   (single question/answer)
        ResourcesList.tsx             (resources)
        ContactSupportForm.tsx        (support form)
```

---

## Design System Compliance

(Same as previous IAs - Organic Biophilic design system with Crimson Pro + Atkinson Hyperlegible, Forest Green primary, 20px organic radius, etc.)

---

## Success Metrics

### Usability

- **Self-Service Rate:** 80%+ of operators find answers without contacting support
- **Search Success:** 70%+ of searches result in clicked result
- **Contact Form Usage:** Track submission rate and response time
- **FAQ Helpfulness:** Feedback buttons on each FAQ ("Was this helpful?")

### Accessibility

- **WCAG AAA:** 100% compliance
- **Keyboard Navigation:** 100% of functions accessible
- **Screen Reader:** Zero critical errors

### Support Efficiency

- **Ticket Volume:** Decrease over time as FAQs improve
- **Common Questions:** Track which FAQs are most viewed, add more detail
- **Response Time:** < 24 hours on all support tickets

---

## Future Enhancements (Out of Scope)

1. **Live Chat:** Real-time chat with support team
2. **Feedback Buttons:** "Was this helpful?" on each FAQ
3. **Community Forum:** Operators help each other
4. **AI Chatbot:** Automated responses to common questions
5. **Video Tutorials:** Embedded directly in page
6. **Multi-Language FAQs:** Translate for international operators
7. **Suggested Articles:** "Operators also viewed..." recommendations

---

## Related Documents

- **Design System:** HOME-REDESIGN-DECISIONS.md
- **My Tours IA:** OPERATOR-DASHBOARD-MY-TOURS-IA-001.md
- **Create Tour IA:** OPERATOR-DASHBOARD-CREATE-TOUR-IA-001.md
- **Bookings IA:** OPERATOR-DASHBOARD-BOOKINGS-IA-001.md
- **Earnings IA:** OPERATOR-DASHBOARD-EARNINGS-IA-001.md
- **Profile IA:** OPERATOR-DASHBOARD-PROFILE-IA-001.md

---

## Approval & Next Steps

**Status:** Draft - Awaiting Review

**Next Steps:**
1. Review with product team
2. Write FAQ content (30-50 questions)
3. Create operator handbook PDF
4. Record video tutorials
5. Begin Phase 1 implementation (static UI)
6. Set up support ticketing system integration

---

**Document Version:** 1.0
**Last Updated:** 2026-01-22
**Author:** Claude (AI Assistant)
**Reviewed By:** [Pending]
