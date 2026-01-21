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
      forming: 'bg-forming-bg text-forming border-forming',
      confirmed: 'bg-confirmed-bg text-confirmed border-confirmed',
      running: 'bg-blue-100 text-blue-800 border-blue-800',
      completed: 'bg-gray-100 text-gray-600 border-gray-600',
      cancelled: 'bg-red-100 text-red-800 border-red-800',
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
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Tour Management
        </h2>
        <button className="px-4 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors min-h-[48px]">
          + Create New Tour
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="border border-border rounded-md p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent mb-4"></div>
          <p className="text-ink-muted">Loading tours...</p>
        </div>
      )}

      {/* Tours List */}
      {!isLoading && <div className="space-y-4">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="border border-border rounded-lg p-5 bg-surface hover:border-accent transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-ink text-lg">
                    {tour.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium border rounded-full ${statusStyles[tour.status]}`}
                  >
                    {statusLabels[tour.status]}
                  </span>
                </div>
                <p className="text-sm text-ink-muted">
                  Departs:{' '}
                  {new Date(tour.departureDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-muted mb-1">Price per person</p>
                <p className="font-mono text-lg font-semibold text-ink">
                  ${tour.price}
                </p>
              </div>
            </div>

            {/* Threshold Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-ink-muted">
                  Booking Progress
                </span>
                <span className="font-mono text-sm font-medium text-ink">
                  {tour.currentCommitments} of {tour.threshold} needed
                </span>
              </div>
              <div className="w-full bg-surface-sunken rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    tour.currentCommitments >= tour.threshold
                      ? 'bg-confirmed'
                      : 'bg-forming'
                  }`}
                  style={{
                    width: `${Math.min((tour.currentCommitments / tour.threshold) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-ink-muted">
                  Capacity: {tour.capacity} total
                </span>
                {tour.status === 'forming' && (
                  <span className="text-xs text-ink-muted">
                    Deadline: {tour.daysUntilDeadline} days
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button className="text-sm font-medium text-accent hover:text-accent-hover py-3 px-2 min-h-[48px]">
                View Participants →
              </button>
              <button className="text-sm font-medium text-accent hover:text-accent-hover py-3 px-2 min-h-[48px]">
                Edit Tour
              </button>
              <button className="text-sm font-medium text-ink-muted hover:text-ink py-3 px-2 min-h-[48px]">
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>}

      {/* Empty state for no tours */}
      {!isLoading && tours.length === 0 && (
        <div className="border border-border rounded-md p-12 text-center">
          <p className="text-ink-muted mb-4">No tours created yet</p>
          <button className="px-4 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors min-h-[48px]">
            Create Your First Tour
          </button>
        </div>
      )}
    </section>
  );
}
