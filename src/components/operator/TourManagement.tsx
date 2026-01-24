'use client';

/**
 * Tour Management Section
 * Primary surface for tour operations - create, view, manage tours
 */

import { useState, useMemo } from 'react';

interface Tour {
  id: string;
  title: string;
  status: 'forming' | 'confirmed' | 'running' | 'completed' | 'cancelled';
  threshold: number;
  capacity: number;
  currentCommitments: number;
  departureDate: string;
  deadline: string;
  daysUntilDeadline: number;
  price: number;
}

export function TourManagement() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data (memoized to prevent re-creation on every render)
  const tours: Tour[] = useMemo(() => [
    {
      id: 'tour-001',
      title: 'Patagonian Endemics - March 2026',
      status: 'forming',
      threshold: 6,
      capacity: 10,
      currentCommitments: 4,
      departureDate: '2026-03-15',
      deadline: '2026-02-15',
      daysUntilDeadline: 25,
      price: 450,
    },
    {
      id: 'tour-002',
      title: 'Spring Migration - Gulf Coast',
      status: 'confirmed',
      threshold: 8,
      capacity: 12,
      currentCommitments: 10,
      departureDate: '2026-04-10',
      deadline: '2026-03-10',
      daysUntilDeadline: 48,
      price: 320,
    },
    {
      id: 'tour-003',
      title: 'Arizona Desert Specialties',
      status: 'running',
      threshold: 5,
      capacity: 8,
      currentCommitments: 6,
      departureDate: '2026-02-05',
      deadline: '2026-01-20',
      daysUntilDeadline: -1,
      price: 280,
    },
  ], []);

  const statusStyles = useMemo(
    () => ({
      forming: 'bg-[var(--color-forming-bg)] text-[var(--color-forming)] border-[var(--color-forming)]',
      confirmed: 'bg-[var(--color-confirmed-bg)] text-[var(--color-confirmed)] border-[var(--color-confirmed)]',
      running: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)]',
      completed: 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] border-[var(--color-border)]',
      cancelled: 'bg-[var(--color-destructive-bg)] text-[var(--color-destructive)] border-[var(--color-destructive-border)]',
    }),
    []
  );

  const statusLabels = useMemo(
    () => ({
      forming: 'Forming',
      confirmed: 'Confirmed',
      running: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    }),
    []
  );

  const activeTours = useMemo(
    () => tours.filter((tour) => tour.status !== 'cancelled'),
    [tours]
  );

  return (
    <section className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
          Tour Management
        </h2>
        <button className="px-6 py-3 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-organic)] transition-colors min-h-[44px]">
          + Create New Tour
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent mb-4"></div>
          <p className="text-[var(--color-ink-muted)]">Loading tours...</p>
        </div>
      )}

      {/* Tours List */}
      {!isLoading && <div className="space-y-4">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-[var(--color-ink)] text-lg">
                    {tour.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium border rounded-[var(--radius-pill)] ${statusStyles[tour.status]}`}
                  >
                    {statusLabels[tour.status]}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-ink-muted)]">
                  Departs:{' '}
                  {new Date(tour.departureDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--color-ink-muted)] mb-1">Price per person</p>
                <p className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                  ${tour.price}
                </p>
              </div>
            </div>

            {/* Threshold Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--color-ink-muted)]">
                  Booking Progress
                </span>
                <span className="font-mono text-sm font-medium text-[var(--color-ink)]">
                  {tour.currentCommitments} of {tour.threshold} needed
                </span>
              </div>
              <div className="w-full bg-[var(--color-surface-sunken)] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    tour.currentCommitments >= tour.threshold
                      ? 'bg-[var(--color-confirmed)]'
                      : 'bg-[var(--color-forming)]'
                  }`}
                  style={{
                    width: `${Math.min((tour.currentCommitments / tour.threshold) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[var(--color-ink-muted)]">
                  Capacity: {tour.capacity} total
                </span>
                {tour.status === 'forming' && (
                  <span className="text-xs text-[var(--color-ink-muted)]">
                    Deadline: {tour.daysUntilDeadline} days
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t-2 border-[var(--color-border)]">
              <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] py-2 px-2 min-h-[44px]">
                View Participants →
              </button>
              <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] py-2 px-2 min-h-[44px]">
                Edit Tour
              </button>
              <button className="text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] py-2 px-2 min-h-[44px]">
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>}

      {/* Empty state for no tours */}
      {!isLoading && tours.length === 0 && (
        <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-12 text-center">
          <p className="text-[var(--color-ink-muted)] mb-4">No tours created yet</p>
          <button className="px-6 py-3 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-organic)] transition-colors min-h-[44px]">
            Create Your First Tour
          </button>
        </div>
      )}
    </section>
  );
}
