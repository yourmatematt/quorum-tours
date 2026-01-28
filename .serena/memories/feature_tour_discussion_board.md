# Tour Discussion Board Feature

## Overview

Internal discussion board for tour groups (operator + committed users). Designed to reduce repetitive questions and build community before tours.

## Key Principles

- **FAQs first** - Users see common Q&A before posting
- **Public to group** - All messages visible to committed participants (avoids duplicate questions)
- **Not realtime chat** - Simple threaded discussion (refresh to see new), can upgrade later
- **Access controlled** - Must be committed to view/post

## Access Points

### For Committed Users

| Entry Point | Location | Notes |
|-------------|----------|-------|
| Tour detail page | `/tours/[id]` | "Discussion" tab visible only if logged in AND committed |
| Profile page | `/profile` | Committed tours list → click → tour detail with discussion |
| Email notification | Direct link | "New message on your tour" |

### For Operators

| Entry Point | Location | Notes |
|-------------|----------|-------|
| Operator dashboard | `/operator/tours` | Tour cards show "Discussion" link + unread badge |
| Tour management | `/operator/tours/[id]` | Discussion tab alongside Bookings, Details |
| Email notification | Direct link | "New question on [Tour Name]" |

## URL Structure

Option A (separate route):
```
/tours/[id]/discussion
```

Option B (embedded tab):
```
/tours/[id]#discussion          ← Anchor on tour detail
/operator/tours/[id]            ← Tab within operator management
```

## Access Control

| User Type | Can View | Can Post |
|-----------|----------|----------|
| Not logged in | No ("Sign in to view") | No |
| Logged in, not committed | No ("Commit to join discussion") | No |
| Logged in, committed | Yes | Yes |
| Operator (tour owner) | Yes | Yes (can pin/announce) |

## Page Structure

```
┌─────────────────────────────────────────────┐
│ [Tour Header]                               │
├─────────────────────────────────────────────┤
│ Overview | Itinerary | Discussion (3 new)   │
├─────────────────────────────────────────────┤
│                                             │
│ 📌 OPERATOR ANNOUNCEMENTS (pinned)          │
│ - Meet at hotel lobby 5:30am                │
│ - Bring layers - mornings are cold          │
│                                             │
│ ❓ FREQUENTLY ASKED                         │
│ • What should I bring? → [answer]           │
│ • Is lunch included? → [answer]             │
│                                             │
│ 💬 QUESTIONS & DISCUSSION                   │
│ - Threaded Q&A                              │
│ - Operator replies highlighted              │
│                                             │
│ [Write a message...]                    [→] │
└─────────────────────────────────────────────┘
```

## Implementation Approach

| Approach | Effort | Notes |
|----------|--------|-------|
| Supabase Realtime | Medium | Built-in, already have Supabase |
| Simple comment thread | Low | Paginated list, refresh for new (recommended start) |
| Third-party (Intercom) | Low | Less integrated, monthly cost |

**Recommendation:** Start with simple threaded discussion, upgrade to realtime if demand exists.

## Database Schema (Conceptual)

```sql
-- Tour discussions/messages
tour_discussions (
  id uuid PRIMARY KEY,
  tour_id uuid REFERENCES tours(id),
  user_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  is_pinned boolean DEFAULT false,      -- Operator announcements
  is_operator boolean DEFAULT false,    -- Operator badge
  parent_id uuid REFERENCES tour_discussions(id),  -- Threading
  created_at timestamptz DEFAULT now()
)

-- FAQ entries (operator-managed)
tour_faqs (
  id uuid PRIMARY KEY,
  tour_id uuid REFERENCES tours(id),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
)
```

## Notification Strategy

- Email notification when someone posts (digest option?)
- Unread badge on tour cards
- Don't over-notify - maybe batch notifications

## Status

**Phase:** Concept / Discussion
**Priority:** TBD
**Blockers:** None identified

---

*Created: 2026-01-26*
