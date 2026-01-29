'use client';

import { useState, useMemo } from 'react';
import { TourCard } from '@/components/TourCard';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { FilterChip } from '@/components/ui/FilterChip';
import { SpeciesFilter } from '@/components/ui/SpeciesFilter';
import { EmptyState } from '@/components/ui/EmptyState';
import { PreLaunchEmptyState } from '@/components/ui/PreLaunchEmptyState';
import { Button } from '@/components/ui/Button';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuth } from '@/lib/supabase/useAuth';
import { useTours, type Tour as DbTour } from '@/lib/supabase/useTours';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface DisplayTour {
  id: string;
  slug: string;
  title: string;
  operatorName: string;
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
  capacity: number;
  date: string;
  location: string;
  speciesHighlight: string;
  image?: string;
}

// Map database status to display status
function mapStatus(dbStatus: string): ConfirmationStatus {
  switch (dbStatus) {
    case 'confirmed':
    case 'completed':
      return 'confirmed';
    case 'forming':
    case 'payment_pending':
      return 'forming';
    case 'cancelled':
    default:
      return 'not-running';
  }
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Map database tour to display tour
function mapTourForDisplay(tour: DbTour): DisplayTour {
  return {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    operatorName: tour.operator?.name || 'Unknown Operator',
    status: mapStatus(tour.status),
    currentParticipants: tour.current_participants,
    threshold: tour.threshold,
    capacity: tour.capacity,
    date: formatDate(tour.date_start),
    location: tour.operator?.base_location || 'Australia',
    speciesHighlight: tour.target_species?.join(', ') || '',
    image: tour.image_url || undefined,
  };
}

/**
 * Tours Index Page - Discovery & Comparison
 *
 * Primary job: Allow users to evaluate tours without guesswork.
 * Every tour's confirmation state, threshold progress, and key
 * attributes must be immediately comparable.
 */
export default function ToursPage() {
  // Get auth state
  const { user, isLoading: authLoading } = useAuth();

  // Fetch tours from Supabase
  const { tours: dbTours, isLoading: toursLoading, error: toursError } = useTours();

  // Map database tours to display format
  const allTours = useMemo(() => {
    return dbTours.map(mapTourForDisplay);
  }, [dbTours]);

  const statusOptions = useMemo(() => [
    { value: 'all', label: 'All tours' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'forming', label: 'Forming' },
  ], []);

  const regionOptions = useMemo(() => [
    { value: 'all', label: 'All regions' },
    { value: 'Victoria', label: 'Victoria' },
    { value: 'New South Wales', label: 'New South Wales' },
    { value: 'Queensland', label: 'Queensland' },
    { value: 'South Australia', label: 'South Australia' },
    { value: 'Western Australia', label: 'Western Australia' },
    { value: 'Tasmania', label: 'Tasmania' },
  ], []);

  const sortOptions = useMemo(() => [
    { value: 'date', label: 'Soonest first' },
    { value: 'confirmed', label: 'Most confirmed' },
    { value: 'progress', label: 'Nearest quorum' },
  ], []);

  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [speciesFilter, setSpeciesFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('date');

  // Extract all unique species from tour data for the autocomplete
  const availableSpecies = useMemo(() => {
    const speciesSet = new Set<string>();
    allTours.forEach(tour => {
      tour.speciesHighlight.split(',').forEach(species => {
        const trimmed = species.trim();
        if (trimmed) speciesSet.add(trimmed);
      });
    });
    return Array.from(speciesSet).sort();
  }, [allTours]);

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let tours = [...allTours];

    // Apply status filter
    if (statusFilter !== 'all') {
      tours = tours.filter(tour => tour.status === statusFilter);
    }

    // Apply region filter
    if (regionFilter !== 'all') {
      tours = tours.filter(tour =>
        tour.location.toLowerCase().includes(regionFilter.toLowerCase())
      );
    }

    // Apply species/chase list filter
    if (speciesFilter.length > 0) {
      tours = tours.filter(tour => {
        const tourSpecies = tour.speciesHighlight.toLowerCase();
        return speciesFilter.some(species =>
          tourSpecies.includes(species.toLowerCase())
        );
      });
    }

    // Apply sorting
    tours.sort((a, b) => {
      switch (sortBy) {
        case 'confirmed':
          if (a.status === 'confirmed' && b.status !== 'confirmed') return -1;
          if (b.status === 'confirmed' && a.status !== 'confirmed') return 1;
          return (b.currentParticipants / b.threshold) - (a.currentParticipants / a.threshold);
        case 'progress':
          const aProgress = a.currentParticipants / a.threshold;
          const bProgress = b.currentParticipants / b.threshold;
          return bProgress - aProgress;
        case 'date':
        default:
          return a.date.localeCompare(b.date);
      }
    });

    return tours;
  }, [allTours, statusFilter, regionFilter, speciesFilter, sortBy]);

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
    activeFilters.push({
      key: 'region',
      label: regionFilter,
      onRemove: () => setRegionFilter('all'),
    });
  }
  speciesFilter.forEach(species => {
    activeFilters.push({
      key: `species-${species}`,
      label: species,
      onRemove: () => setSpeciesFilter(prev => prev.filter(s => s !== species)),
    });
  });

  const clearAllFilters = () => {
    setStatusFilter('all');
    setRegionFilter('all');
    setSpeciesFilter([]);
  };

  // Show loading state
  if (toursLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          <div className="animate-pulse space-y-[var(--space-xl)]">
            <div className="h-10 bg-[var(--color-border)] rounded w-1/3" />
            <div className="h-6 bg-[var(--color-border)] rounded w-2/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-xl)]">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-[var(--color-border)] rounded-[var(--radius-lg)]" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (toursError) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          <EmptyState
            title="Unable to load tours"
            description={toursError}
            actionLabel="Try again"
            onAction={() => window.location.reload()}
          />
        </div>
      </main>
    );
  }

  // Show empty state if no tours in database
  if (allTours.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <ErrorBoundary>
          <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
            <header className="mb-[var(--space-md)] text-center">
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
                Tours
              </h1>
            </header>
            <PreLaunchEmptyState
              context="tours"
              isLoggedIn={!!user}
              userName={user?.email?.split('@')[0]}
            />
          </div>
        </ErrorBoundary>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <ErrorBoundary>
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          {/* Section 1: Page Header */}
          <header className="mb-[var(--space-2xl)]">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              Find Your Next Tour
            </h1>
            <p className="text-[var(--color-ink-muted)]">
              Compare tours by confirmation status, timing, and region. Every tour shows its current quorum progress.
            </p>
          </header>

          {/* Section 2: Filtering & Sorting Controls */}
          <div className="mb-[var(--space-xl)] p-[var(--space-lg)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)]">
            {/* Filter dropdowns row */}
            <div className="flex flex-wrap items-center gap-[var(--space-md)] mb-[var(--space-md)]">
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
              <SpeciesFilter
                selected={speciesFilter}
                onChange={setSpeciesFilter}
                availableSpecies={availableSpecies}
                maxSelections={5}
              />
              <div className="hidden sm:block w-px h-8 bg-[var(--color-border)]" aria-hidden="true" />
              <FilterDropdown
                label="Sort"
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>

            {/* Active filters and results count */}
            <div className="flex flex-wrap items-center justify-between gap-[var(--space-md)]">
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
                    className="text-sm text-[var(--color-primary)] font-medium hover:underline focus:outline-none focus:underline py-3 px-2 min-h-[48px]"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Aggregate Signals */}
              <div className="text-sm text-[var(--color-ink-muted)]" aria-live="polite">
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

          {/* Section 3: Tours List OR Empty State */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-xl)]">
              {filteredTours.map(tour => (
                <TourCard
                  key={tour.id}
                  title={tour.title}
                  operatorName={tour.operatorName}
                  status={tour.status}
                  currentParticipants={tour.currentParticipants}
                  quorum={tour.threshold}
                  capacity={tour.capacity}
                  date={tour.date}
                  location={tour.location}
                  speciesHighlight={tour.speciesHighlight}
                  href={`/tours/${tour.slug}`}
                  image={tour.image}
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

          {/* Load More */}
          {filteredTours.length > 0 && filteredTours.length >= 6 && (
            <div className="mt-[var(--space-3xl)] flex flex-col items-center gap-[var(--space-md)]">
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
