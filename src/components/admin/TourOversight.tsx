'use client';

/**
 * Tour Oversight Section
 * Monitors all tours with quorum progress and status distribution
 */

import { StatusBadge } from '@/components/operator';
import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard, AdminStatCard } from './AdminSection';
import {
  AdminBulkActions,
  AdminCheckbox,
  useBulkSelection,
} from './AdminBulkActions';

interface TourStatus {
  id: string;
  title: string;
  operator: string;
  status: 'forming' | 'confirmed' | 'cancelled';
  quorum: number;
  currentCommitments: number;
  deadline: string;
  daysUntilDeadline: number;
}

const tourStatusLabels: Record<string, string> = {
  forming: 'FORMING',
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
};

export function TourOversight() {
  // Mock data
  const tours: TourStatus[] = [
    {
      id: 'tour-001',
      title: 'Patagonian Endemics - March 2026',
      operator: 'South America Birding Experts',
      status: 'forming',
      quorum: 6,
      currentCommitments: 4,
      deadline: '2026-02-15',
      daysUntilDeadline: 25,
    },
    {
      id: 'tour-002',
      title: 'Spring Migration - Gulf Coast',
      operator: 'Coastal Birding Adventures',
      status: 'confirmed',
      quorum: 8,
      currentCommitments: 10,
      deadline: '2026-03-01',
      daysUntilDeadline: 39,
    },
    {
      id: 'tour-003',
      title: 'Arizona Desert Specialties',
      operator: 'Desert Birds Inc',
      status: 'forming',
      quorum: 5,
      currentCommitments: 2,
      deadline: '2026-01-28',
      daysUntilDeadline: 7,
    },
  ];

  const statusCounts = {
    forming: tours.filter((t) => t.status === 'forming').length,
    confirmed: tours.filter((t) => t.status === 'confirmed').length,
    cancelled: tours.filter((t) => t.status === 'cancelled').length,
  };

  const { selectedIds, setSelectedIds, toggleSelection, isSelected } =
    useBulkSelection();

  const allIds = tours.map((t) => t.id);

  // Count tours approaching deadline (within 7 days)
  const urgentCount = tours.filter((t) => t.daysUntilDeadline <= 7).length;

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
        {tours.map((tour) => (
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
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[var(--color-ink)]">
                        {tour.title}
                      </h3>
                      <StatusBadge
                        status={tour.status}
                        label={tourStatusLabels[tour.status]}
                        showIcon={true}
                      />
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
        ))}
      </div>
    </AdminCollapsible>
  );
}
