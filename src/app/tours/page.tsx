'use client';

import { useState, useMemo } from 'react';
import { TourCard } from '@/components/TourCard';
import { ConfirmationStatusBadge } from '@/components/ui/ConfirmationStatusBadge';
import { QuorumProgressBar } from '@/components/ui/QuorumProgressBar';
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
  description: string;
  operatorName: string;
  operatorSlug: string;
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
  capacity: number;
  date: string;
  dateEnd: string;
  location: string;
  speciesHighlight: string;
  highlights: string[];
  priceCents: number;
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
    description: tour.description || '',
    operatorName: tour.operator?.name || 'Unknown Operator',
    operatorSlug: tour.operator?.slug || '',
    status: mapStatus(tour.status),
    currentParticipants: tour.current_participants,
    threshold: tour.threshold,
    capacity: tour.capacity,
    date: formatDate(tour.date_start),
    dateEnd: formatDate(tour.date_end),
    location: tour.operator?.base_location || 'Australia',
    speciesHighlight: tour.target_species?.join(', ') || '',
    highlights: (tour as unknown as { highlights?: string[] }).highlights || [],
    priceCents: tour.price_cents,
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
            filteredTours.length <= 3 ? (
              /* Full-width featured cards when 3 or fewer tours */
              <div className="space-[var(--space-xl)] flex flex-col gap-[var(--space-xl)]">
                {filteredTours.map(tour => (
                  <FeaturedTourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              /* Grid layout for 4+ tours */
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
            )
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

          {/* More Tours Coming Soon — shown when 3 or fewer tours */}
          {filteredTours.length > 0 && filteredTours.length <= 3 && (
            <div className="
              mt-[var(--space-xl)]
              p-[var(--space-lg)] sm:p-[var(--space-xl)]
              bg-[var(--color-surface-raised)]
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
            ">
              <h3 className="font-display text-lg sm:text-xl text-[var(--color-ink)] mb-[var(--space-sm)]">
                More tours coming soon
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-ink-muted)] leading-relaxed mb-[var(--space-lg)] max-w-prose">
                We're working with operators across Australia to list more birding tours.
                In the meantime, build your chase list so you're ready to commit when tours in your area go live.
              </p>
              <div className="flex flex-wrap gap-[var(--space-md)]">
                <a
                  href={user ? '/profile' : '/signup'}
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-5 py-2.5
                    text-sm font-medium
                    text-white
                    bg-[var(--color-primary)]
                    rounded-[var(--radius-organic)]
                    hover:bg-[var(--color-primary-hover)]
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                  "
                >
                  {user ? 'Build your chase list' : 'Sign up to build your chase list'}
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href="/how-it-works"
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-5 py-2.5
                    text-sm font-medium
                    text-[var(--color-primary)]
                    border-2 border-[var(--color-primary)]
                    rounded-[var(--radius-organic)]
                    hover:bg-[var(--color-primary)] hover:text-white
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                  "
                >
                  How Quorum works
                </a>
              </div>
            </div>
          )}

          {/* Load More */}
          {filteredTours.length > 6 && (
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

/** Full-width featured card matching the operator card style */
function FeaturedTourCard({ tour }: { tour: DisplayTour }) {
  const price = tour.priceCents > 0 ? `$${Math.round(tour.priceCents / 100)}` : null;

  return (
    <a
      href={`/tours/${tour.slug}`}
      className="
        block
        p-[var(--space-lg)] sm:p-[var(--space-xl)]
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        transition-all duration-200
        hover:border-[var(--color-primary)]
        hover:shadow-[var(--shadow-card-hover)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        group
      "
    >
      <div className="flex flex-col sm:flex-row gap-[var(--space-lg)] sm:gap-[var(--space-xl)]">
        {/* Left: Status + quorum visual */}
        <div className="flex flex-col items-center gap-[var(--space-sm)] flex-shrink-0 sm:min-w-[120px]">
          <ConfirmationStatusBadge status={tour.status} />
          <div className="w-full max-w-[140px]">
            <QuorumProgressBar
              current={tour.currentParticipants}
              quorum={tour.threshold}
              capacity={tour.capacity}
            />
          </div>
          {price && (
            <span className="font-display text-lg font-semibold text-[var(--color-ink)]">
              {price}
              <span className="text-xs font-normal text-[var(--color-ink-subtle)]">/person</span>
            </span>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          {/* Title + operator */}
          <div className="flex flex-wrap items-center gap-[var(--space-sm)] mb-[var(--space-xs)]">
            <h3 className="
              font-display text-xl sm:text-2xl font-semibold
              text-[var(--color-ink)]
              group-hover:text-[var(--color-primary)]
              transition-colors duration-200
            ">
              {tour.title}
            </h3>
          </div>

          <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-md)]">
            with {tour.operatorName}
          </p>

          {/* Date + location row */}
          <div className="flex flex-wrap items-center gap-[var(--space-md)] text-sm text-[var(--color-ink-subtle)] mb-[var(--space-md)]">
            <span className="flex items-center gap-[var(--space-xs)]">
              <svg
                width="14" height="14" className="flex-shrink-0"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {tour.date} – {tour.dateEnd}
            </span>
            <span className="flex items-center gap-[var(--space-xs)]">
              <svg
                width="14" height="14" className="flex-shrink-0"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {tour.location}
            </span>
          </div>

          {/* Highlights as pills */}
          {tour.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-[var(--space-md)]">
              {tour.highlights.slice(0, 5).map(highlight => (
                <span
                  key={highlight}
                  className="
                    px-2.5 py-1
                    text-xs font-medium
                    bg-[var(--color-primary-subtle)]
                    text-[var(--color-primary)]
                    rounded-[var(--radius-sm)]
                  "
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Description excerpt */}
          {tour.description && (
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-2 mb-[var(--space-md)]">
              {tour.description}
            </p>
          )}

          {/* CTA */}
          <span className="
            inline-flex items-center gap-[var(--space-xs)]
            text-sm font-medium
            text-[var(--color-ink-subtle)]
            group-hover:text-[var(--color-primary)]
            transition-colors duration-200
          ">
            View tour details
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </a>
  );
}
