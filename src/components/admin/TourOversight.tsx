'use client';

/**
 * Tour Oversight Section
 * Monitors all tours with quorum progress and status distribution
 */

import { useState, useEffect } from 'react';
import { StatusBadge } from '@/components/operator';
import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard, AdminStatCard } from './AdminSection';
import {
  AdminBulkActions,
  AdminCheckbox,
  useBulkSelection,
} from './AdminBulkActions';
import { createClient } from '@/lib/supabase/client';
import { type Tour } from '@/lib/supabase/useTours';

interface TourStatus {
  id: string;
  title: string;
  operator: string;
  status: 'forming' | 'payment_pending' | 'confirmed' | 'cancelled' | 'completed';
  quorum: number;
  currentCommitments: number;
  deadline: string;
  daysUntilDeadline: number;
  is_featured: boolean;
}

const tourStatusLabels: Record<string, string> = {
  forming: 'FORMING',
  payment_pending: 'PAYMENT PENDING',
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
  completed: 'COMPLETED',
};

export function TourOversight() {
  const [tours, setTours] = useState<TourStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('tours')
        .select(`
          *,
          operator:operators(id, name, slug)
        `)
        .in('status', ['forming', 'payment_pending', 'confirmed'])
        .order('date_start', { ascending: true });

      if (error) throw error;

      const mappedTours: TourStatus[] = (data || []).map(tour => {
        const deadlineDate = new Date(tour.threshold_deadline || tour.booking_deadline);
        const today = new Date();
        const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        return {
          id: tour.id,
          title: tour.title,
          operator: tour.operator?.name || 'Unknown Operator',
          status: tour.status,
          quorum: tour.threshold,
          currentCommitments: tour.current_participant_count || 0,
          deadline: deadlineDate.toISOString(),
          daysUntilDeadline: daysUntil,
          is_featured: tour.is_featured || false,
        };
      });

      setTours(mappedTours);
    } catch (err) {
      console.error('Error fetching tours:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleFeatured(tourId: string, currentValue: boolean) {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('tours')
        .update({ is_featured: !currentValue })
        .eq('id', tourId);

      if (error) throw error;

      // Update local state
      setTours(prev => prev.map(tour =>
        tour.id === tourId
          ? { ...tour, is_featured: !currentValue }
          : tour
      ));
    } catch (err) {
      console.error('Error toggling featured status:', err);
      alert('Failed to update featured status');
    }
  }

  const statusCounts = {
    forming: tours.filter((t) => t.status === 'forming' || t.status === 'payment_pending').length,
    confirmed: tours.filter((t) => t.status === 'confirmed').length,
    cancelled: tours.filter((t) => t.status === 'cancelled').length,
  };

  const { selectedIds, setSelectedIds, toggleSelection, isSelected } =
    useBulkSelection();

  const allIds = tours.map((t) => t.id);

  // Count tours approaching deadline (within 7 days)
  const urgentCount = tours.filter((t) => t.daysUntilDeadline <= 7).length;

  if (isLoading) {
    return (
      <AdminCollapsible
        title="Tour Oversight"
        badge={0}
        subtitle="Loading..."
      >
        <div className="text-center py-8 text-[var(--color-ink-muted)]">
          Loading tours...
        </div>
      </AdminCollapsible>
    );
  }

  return (
    <AdminCollapsible
      title="Tour Oversight"
      badge={tours.length}
      badgeVariant={urgentCount > 0 ? 'warning' : 'default'}
      subtitle={`${statusCounts.forming} forming, ${statusCounts.confirmed} confirmed`}
    >
      {/* Status Distribution */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <AdminStatCard
          label="Forming"
          value={statusCounts.forming}
          variant="forming"
        />
        <AdminStatCard
          label="Confirmed"
          value={statusCounts.confirmed}
          variant="confirmed"
        />
        <AdminStatCard
          label="Cancelled"
          value={statusCounts.cancelled}
          variant="default"
        />
      </div>

      {/* Bulk Actions Bar */}
      <AdminBulkActions
        totalItems={tours.length}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        allIds={allIds}
      >
        {({ selectedCount }) => (
          <>
            <button className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] transition-colors">
              Export {selectedCount}
            </button>
            <button className="px-4 py-2 text-sm font-medium text-[var(--color-destructive)] bg-[var(--color-surface)] border-2 border-[var(--color-destructive)] rounded-[var(--radius-organic)] hover:bg-[var(--color-destructive)] hover:text-white transition-colors">
              Flag {selectedCount}
            </button>
          </>
        )}
      </AdminBulkActions>

      {/* Tours List */}
      <div className="space-y-3">
        {tours.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-ink-muted)]">
            No active tours found
          </div>
        ) : (
          tours.map((tour) => (
            <div
              key={tour.id}
              className={`border-2 rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)] transition-colors ${
                isSelected(tour.id)
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-start gap-4">
                <AdminCheckbox
                  checked={isSelected(tour.id)}
                  onChange={() => toggleSelection(tour.id)}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[var(--color-ink)]">
                          {tour.title}
                        </h3>
                        <StatusBadge
                          status={tour.status}
                          label={tourStatusLabels[tour.status]}
                          showIcon={true}
                        />
                        {/* Featured Star Toggle */}
                        <button
                          onClick={() => toggleFeatured(tour.id, tour.is_featured)}
                          className="ml-2 p-1 hover:bg-[var(--color-surface-sunken)] rounded transition-colors"
                          title={tour.is_featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          <svg
                            className={`w-5 h-5 ${
                              tour.is_featured
                                ? 'text-[var(--color-accent)] fill-current'
                                : 'text-[var(--color-ink-subtle)] fill-none'
                            }`}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-[var(--color-ink-muted)]">
                        {tour.operator}
                      </p>
                      <div className="flex items-center gap-6 mt-3">
                        <div>
                          <span className="text-xs text-[var(--color-ink-muted)]">
                            Progress:
                          </span>
                          <span className="ml-2 font-mono text-sm font-medium text-[var(--color-ink)]">
                            {tour.currentCommitments}/{tour.quorum}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-[var(--color-ink-muted)]">
                            Deadline:
                          </span>
                          <span
                            className={`ml-2 text-sm font-medium ${tour.daysUntilDeadline <= 7 ? 'text-[var(--color-destructive)]' : 'text-[var(--color-ink)]'}`}
                          >
                            {tour.daysUntilDeadline} days
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminCollapsible>
  );
}
