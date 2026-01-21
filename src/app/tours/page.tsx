'use client';

import { useState, useMemo } from 'react';
import { TourCard } from '@/components/TourCard';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { FilterChip } from '@/components/ui/FilterChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ErrorBoundary } from '@/components/ErrorBoundary';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface Tour {
  id: string;
  title: string;
  operatorName: string;
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
  date: string;
  location: string;
  region: string;
  speciesHighlight: string;
}

/**
 * Tours Index Page - Discovery & Comparison
 *
 * Primary job: Allow users to evaluate tours without guesswork.
 * Every tour's confirmation state, threshold progress, and key
 * attributes must be immediately comparable.
 */
export default function ToursPage() {
  // Example data demonstrating different states and filtering (memoized to prevent re-creation)
  const allTours: Tour[] = useMemo(() => [
  {
    id: '1',
    title: 'Dawn Chorus at Werribee',
    operatorName: 'Sarah Mitchell',
    status: 'confirmed',
    currentParticipants: 8,
    threshold: 6,
    date: 'Mar 15, 2026',
    location: 'Werribee, VIC',
    region: 'vic',
    speciesHighlight: 'Brolga, Latham\'s Snipe',
  },
  {
    id: '2',
    title: 'Shorebird Migration Watch',
    operatorName: 'David Chen',
    status: 'forming',
    currentParticipants: 5,
    threshold: 8,
    date: 'Apr 2, 2026',
    location: 'Cairns, QLD',
    region: 'qld',
    speciesHighlight: 'Eastern Curlew, Bar-tailed Godwit',
  },
  {
    id: '3',
    title: 'Rainforest Endemics Trek',
    operatorName: 'Maria Santos',
    status: 'not-running',
    currentParticipants: 2,
    threshold: 10,
    date: 'Feb 28, 2026',
    location: 'Daintree, QLD',
    region: 'qld',
    speciesHighlight: 'Cassowary, Victoria\'s Riflebird',
  },
  {
    id: '4',
    title: 'Mallee Woodlands Discovery',
    operatorName: 'James Wilson',
    status: 'confirmed',
    currentParticipants: 6,
    threshold: 6,
    date: 'Mar 22, 2026',
    location: 'Murray-Sunset, VIC',
    region: 'vic',
    speciesHighlight: 'Malleefowl, Regent Parrot',
  },
  {
    id: '5',
    title: 'Wetlands at Dusk',
    operatorName: 'Sarah Mitchell',
    status: 'forming',
    currentParticipants: 3,
    threshold: 8,
    date: 'Apr 10, 2026',
    location: 'Bool Lagoon, SA',
    region: 'sa',
    speciesHighlight: 'Blue-billed Duck, Freckled Duck',
  },
  {
    id: '6',
    title: 'Alpine Parrot Expedition',
    operatorName: 'Emily Roberts',
    status: 'forming',
    currentParticipants: 7,
    threshold: 8,
    date: 'May 5, 2026',
    location: 'Kosciuszko, NSW',
    region: 'nsw',
    speciesHighlight: 'Gang-gang Cockatoo, Flame Robin',
  },
  {
    id: '7',
    title: 'Kimberley Endemics',
    operatorName: 'Tom Baker',
    status: 'forming',
    currentParticipants: 4,
    threshold: 12,
    date: 'Jun 1, 2026',
    location: 'Broome, WA',
    region: 'wa',
    speciesHighlight: 'Gouldian Finch, Black Grasswren',
  },
  {
    id: '8',
    title: 'Tasmanian Endemic Circuit',
    operatorName: 'Lucy Chen',
    status: 'confirmed',
    currentParticipants: 10,
    threshold: 8,
    date: 'Apr 20, 2026',
    location: 'Cradle Mountain, TAS',
    region: 'tas',
    speciesHighlight: 'Forty-spotted Pardalote, Swift Parrot',
  },
  ], []);

  const statusOptions = useMemo(() => [
  { value: 'all', label: 'All tours' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'forming', label: 'Forming' },
  { value: 'not-running', label: 'Not running' },
  ], []);

  const regionOptions = useMemo(() => [
  { value: 'all', label: 'All regions' },
  { value: 'vic', label: 'Victoria' },
  { value: 'nsw', label: 'New South Wales' },
  { value: 'qld', label: 'Queensland' },
  { value: 'sa', label: 'South Australia' },
  { value: 'wa', label: 'Western Australia' },
  { value: 'tas', label: 'Tasmania' },
  ], []);

  const sortOptions = useMemo(() => [
  { value: 'date', label: 'Soonest first' },
  { value: 'confirmed', label: 'Most confirmed' },
  { value: 'progress', label: 'Nearest threshold' },
  ], []);
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let tours = [...allTours];

    // Apply status filter
    if (statusFilter !== 'all') {
      tours = tours.filter(tour => tour.status === statusFilter);
    }

    // Apply region filter
    if (regionFilter !== 'all') {
      tours = tours.filter(tour => tour.region === regionFilter);
    }

    // Apply sorting
    tours.sort((a, b) => {
      switch (sortBy) {
        case 'confirmed':
          // Confirmed first, then by progress percentage
          if (a.status === 'confirmed' && b.status !== 'confirmed') return -1;
          if (b.status === 'confirmed' && a.status !== 'confirmed') return 1;
          return (b.currentParticipants / b.threshold) - (a.currentParticipants / a.threshold);
        case 'progress':
          // Nearest to threshold first
          const aProgress = a.currentParticipants / a.threshold;
          const bProgress = b.currentParticipants / b.threshold;
          return bProgress - aProgress;
        case 'date':
        default:
          // Simple string comparison for demo (would use actual dates in production)
          return a.date.localeCompare(b.date);
      }
    });

    return tours;
  }, [allTours, statusFilter, regionFilter, sortBy]);

  // Calculate aggregate stats
  const stats = useMemo(() => {
    const confirmed = filteredTours.filter(t => t.status === 'confirmed').length;
    const forming = filteredTours.filter(t => t.status === 'forming').length;
    return { total: filteredTours.length, confirmed, forming };
  }, [filteredTours]);

  // Active filters for chips
  const activeFilters: { key: string; label: string; onRemove: () => void }[] = [];
  if (statusFilter !== 'all') {
    const option = statusOptions.find(o => o.value === statusFilter);
    activeFilters.push({
      key: 'status',
      label: option?.label || statusFilter,
      onRemove: () => setStatusFilter('all'),
    });
  }
  if (regionFilter !== 'all') {
    const option = regionOptions.find(o => o.value === regionFilter);
    activeFilters.push({
      key: 'region',
      label: option?.label || regionFilter,
      onRemove: () => setRegionFilter('all'),
    });
  }

  const clearAllFilters = () => {
    setStatusFilter('all');
    setRegionFilter('all');
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <ErrorBoundary>
        <div className="
          w-full max-w-[var(--container-max)]
          mx-auto px-[var(--space-lg)]
          py-[var(--space-3xl)]
        ">
          {/* Section 1: Page Header */}
          <header className="mb-[var(--space-2xl)]">
            <h1 className="
              font-display
              text-[var(--text-2xl)]
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            ">
              Available Tours
            </h1>
            <p className="text-[var(--color-ink-muted)]">
              Compare tours by confirmation status, timing, and region. Every tour shows its current threshold progress.
            </p>
          </header>

          {/* Section 2: Filtering & Sorting Controls */}
        <div className="
          mb-[var(--space-xl)]
          p-[var(--space-lg)]
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
        ">
          {/* Filter dropdowns */}
          <div className="
            flex flex-wrap items-center gap-[var(--space-md)]
            mb-[var(--space-md)]
          ">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <FilterDropdown
              label="Region"
              options={regionOptions}
              value={regionFilter}
              onChange={setRegionFilter}
            />
            <div className="
              hidden sm:block
              w-px h-8
              bg-[var(--color-border)]
            " aria-hidden="true" />
            <FilterDropdown
              label="Sort"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Active filters and results count */}
          <div className="
            flex flex-wrap items-center justify-between
            gap-[var(--space-md)]
          ">
            <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
              {activeFilters.map(filter => (
                <FilterChip
                  key={filter.key}
                  label={filter.label}
                  onRemove={filter.onRemove}
                />
              ))}
              {activeFilters.length > 1 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="
                    text-sm text-[var(--color-accent)]
                    hover:underline
                    focus:outline-none focus:underline
                    py-3 px-2 min-h-[48px]
                  "
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Section 4: Aggregate Signals */}
            <div
              className="text-sm text-[var(--color-ink-muted)]"
              aria-live="polite"
            >
              <span className="font-mono font-medium text-[var(--color-ink)]">
                {stats.total}
              </span>
              {' '}tours
              {stats.confirmed > 0 && (
                <>
                  {' · '}
                  <span className="text-[var(--color-confirmed)]">
                    {stats.confirmed} confirmed
                  </span>
                </>
              )}
              {stats.forming > 0 && (
                <>
                  {' · '}
                  <span className="text-[var(--color-forming)]">
                    {stats.forming} forming
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Tours List OR Section 5: Empty State */}
        {filteredTours.length > 0 ? (
          <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-[var(--space-xl)]
          ">
            {filteredTours.map(tour => (
              <TourCard
                key={tour.id}
                title={tour.title}
                operatorName={tour.operatorName}
                status={tour.status}
                currentParticipants={tour.currentParticipants}
                threshold={tour.threshold}
                date={tour.date}
                location={tour.location}
                speciesHighlight={tour.speciesHighlight}
                href={`/tours/${tour.id}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No tours match your filters"
            description="Try adjusting your filters to see more tours."
            suggestions={[
              'Broaden the date range',
              'Select a different region',
              'Include all confirmation statuses',
            ]}
            actionLabel="Clear all filters"
            onAction={clearAllFilters}
          />
        )}

        {/* Section 6: Load More (shown when there are many results) */}
        {filteredTours.length > 0 && filteredTours.length >= 6 && (
          <div className="
            mt-[var(--space-3xl)]
            flex flex-col items-center
            gap-[var(--space-md)]
          ">
            <p className="text-sm text-[var(--color-ink-subtle)]">
              Showing {filteredTours.length} of {filteredTours.length} tours
            </p>
            <Button variant="secondary">
              Load more tours
            </Button>
          </div>
        )}
        </div>
      </ErrorBoundary>
    </main>
  );
}
