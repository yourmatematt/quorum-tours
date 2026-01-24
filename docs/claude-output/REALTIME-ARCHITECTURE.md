# Real-time Architecture

**Status:** PLANNED
**Last Updated:** 2026-01-24

---

## Overview

Quorum Tours uses Supabase Realtime for live threshold progress updates. When birders commit to tours, all connected clients see the progress bar update instantly.

---

## Published Tables

| Table | Purpose |
|-------|---------|
| `tours` | Threshold progress, status changes |
| `reservations` | Individual booking updates |
| `payment_events` | Payment status for operator dashboards |

---

## Denormalized Count Strategy

Instead of running `COUNT(*)` queries on every update, we maintain a denormalized `current_participant_count` column on the `tours` table.

### How It Works

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PARTICIPANT COUNT FLOW                                   │
└─────────────────────────────────────────────────────────────────────────────┘

    RESERVATION CREATED              TRIGGER FIRES              TOURS UPDATED
         │                                │                          │
         ▼                                ▼                          ▼
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ INSERT INTO     │          │ update_         │          │ current_        │
│ reservations    │─────────►│ participant_    │─────────►│ participant_    │
│ (status=        │          │ count()         │          │ count += 1      │
│  'reserved')    │          │                 │          │                 │
└─────────────────┘          └─────────────────┘          └─────────────────┘
                                      │
                                      ▼
                             Realtime broadcast
                             to all subscribers
```

### Active Statuses

These reservation statuses count toward participant total:
- `reserved` - Birder has committed, payment authorized
- `payment_pending` - Threshold met, payment window open
- `confirmed` - Payment captured, tour confirmed

These do NOT count:
- `cancelled` - Birder withdrew
- `expired` - Payment window closed without payment
- `completed` - Tour finished (historical)

---

## Frontend Subscription Patterns

### Pattern 1: Single Tour Progress

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TourProgress {
  current: number;
  threshold: number;
  status: string;
}

export function useTourProgress(tourId: string) {
  const [progress, setProgress] = useState<TourProgress | null>(null);

  useEffect(() => {
    // Initial fetch
    const fetchProgress = async () => {
      const { data } = await supabase
        .from('tour_progress')
        .select('current_participant_count, threshold, status')
        .eq('id', tourId)
        .single();

      if (data) {
        setProgress({
          current: data.current_participant_count,
          threshold: data.threshold,
          status: data.status,
        });
      }
    };

    fetchProgress();

    // Subscribe to changes
    const channel = supabase
      .channel(`tour-${tourId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tours',
          filter: `id=eq.${tourId}`,
        },
        (payload) => {
          const { current_participant_count, threshold, status } = payload.new;
          setProgress({ current: current_participant_count, threshold, status });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tourId]);

  return progress;
}
```

### Pattern 2: Operator Dashboard - All Tours

```typescript
export function useOperatorTours(operatorId: string) {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchTours = async () => {
      const { data } = await supabase
        .from('tour_progress')
        .select('*')
        .eq('operator_id', operatorId)
        .order('date_start', { ascending: true });

      if (data) setTours(data);
    };

    fetchTours();

    // Subscribe to all operator's tours
    const channel = supabase
      .channel(`operator-${operatorId}-tours`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tours',
          filter: `operator_id=eq.${operatorId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTours((prev) => [...prev, payload.new as Tour]);
          } else if (payload.eventType === 'UPDATE') {
            setTours((prev) =>
              prev.map((t) => (t.id === payload.new.id ? { ...t, ...payload.new } : t))
            );
          } else if (payload.eventType === 'DELETE') {
            setTours((prev) => prev.filter((t) => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [operatorId]);

  return tours;
}
```

### Pattern 3: User's Active Reservations

```typescript
export function useMyReservations(userId: string) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel(`user-${userId}-reservations`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservations',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Handle INSERT, UPDATE, DELETE
          if (payload.eventType === 'UPDATE') {
            setReservations((prev) =>
              prev.map((r) =>
                r.id === payload.new.id ? { ...r, ...payload.new } : r
              )
            );

            // Show notification on status change
            if (payload.old.status !== payload.new.status) {
              showStatusChangeNotification(payload.new.status);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return reservations;
}
```

---

## Threshold Reached Notifications

When a tour reaches threshold, the system:

1. Updates `tours.status` to `payment_pending`
2. Sets `payment_window_end` to 24 hours from now
3. Updates all `reserved` reservations to `payment_pending`
4. Broadcasts changes via Realtime

Frontend can detect this:

```typescript
.on('postgres_changes', { event: 'UPDATE', table: 'tours' }, (payload) => {
  if (payload.old.status === 'proposed' && payload.new.status === 'payment_pending') {
    // THRESHOLD REACHED!
    showCelebration();
    showPaymentReminder();
  }
})
```

---

## tour_progress View

A convenience view that computes progress metrics:

```sql
SELECT * FROM tour_progress WHERE id = 'tour-uuid';
```

Returns:
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Tour ID |
| `slug` | TEXT | URL slug |
| `current_participant_count` | INTEGER | Active reservations |
| `threshold` | INTEGER | Minimum to confirm |
| `capacity` | INTEGER | Maximum participants |
| `progress_percent` | INTEGER | 0-100 |
| `spots_until_threshold` | INTEGER | How many more needed |
| `spots_remaining` | INTEGER | How many until full |
| `threshold_met` | BOOLEAN | Is at/over threshold |
| `at_capacity` | BOOLEAN | Is full |
| `days_until_deadline` | INTEGER | Days until threshold deadline |

---

## RPC Function: get_tour_progress

For non-realtime queries, use the RPC function:

```typescript
const { data } = await supabase.rpc('get_tour_progress', { p_tour_id: tourId });

// Returns:
{
  tour_id: 'uuid',
  current: 4,
  threshold: 6,
  capacity: 10,
  progress_percent: 67,
  spots_until_threshold: 2,
  spots_remaining: 6,
  threshold_met: false,
  at_capacity: false,
  status: 'proposed',
  days_until_deadline: 12
}
```

---

## Performance Characteristics

| Operation | Before | After |
|-----------|--------|-------|
| Read threshold progress | COUNT query (~5ms) | Column read (~1ms) |
| UI update latency | Polling (1-5s) | Push (~50ms) |
| Write overhead | None | Trigger (~1ms) |
| Concurrent viewers | O(n) queries | O(1) broadcast |

---

## Security Notes

1. **RLS applies to Realtime** - Users only receive updates for rows they can SELECT
2. **tour_progress view** - Public read access (tours are public data)
3. **reservations** - Only user's own reservations visible
4. **payment_events** - Only admin/operator/user's own events visible

---

## Migration File

See: `supabase/migrations/20260124000002_realtime_optimization.sql`

Adds:
- `current_participant_count` column on tours
- `update_participant_count()` trigger function
- Optimized `check_tour_threshold()` function
- Realtime publication for tours, reservations, payment_events
- `tour_progress` view
- `get_tour_progress()` RPC function
- Performance indexes
