'use client';

import { useState, useMemo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OperatorCard } from '@/components/ui/OperatorCard';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { FilterChip } from '@/components/ui/FilterChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { PreLaunchEmptyState } from '@/components/ui/PreLaunchEmptyState';
import { useAuth } from '@/lib/supabase/useAuth';
import { useOperators, type Operator as DbOperator } from '@/lib/supabase/useOperators';

interface DisplayOperator {
  id: string;
  slug: string;
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  specializations: string[];
  totalReviews: number;
  averageRating: number;
  toursCompleted: number;
}

// Map database operator to display format
function mapOperatorForDisplay(operator: DbOperator): DisplayOperator {
  return {
    id: operator.id,
    slug: operator.slug,
    name: operator.name,
    photo: operator.logo_url || undefined,
    verified: operator.is_verified,
    expertise: operator.tagline || 'Birding specialist',
    location: operator.base_location || 'Australia',
    specializations: operator.specialties || [],
    totalReviews: operator.total_reviews,
    averageRating: operator.average_rating,
    toursCompleted: operator.tours_count,
  };
}

// Extract region from location string
function extractRegion(location: string): string {
  const locationLower = location.toLowerCase();
  if (locationLower.includes('victoria') || locationLower.includes('melbourne')) return 'vic';
  if (locationLower.includes('new south wales') || locationLower.includes('sydney') || locationLower.includes('nsw')) return 'nsw';
  if (locationLower.includes('queensland') || locationLower.includes('brisbane') || locationLower.includes('cairns')) return 'qld';
  if (locationLower.includes('south australia') || locationLower.includes('adelaide')) return 'sa';
  if (locationLower.includes('western australia') || locationLower.includes('perth') || locationLower.includes('broome')) return 'wa';
  if (locationLower.includes('tasmania') || locationLower.includes('hobart')) return 'tas';
  if (locationLower.includes('northern territory') || locationLower.includes('darwin')) return 'nt';
  if (locationLower.includes('act') || locationLower.includes('canberra')) return 'act';
  return 'all';
}

/**
 * Operators Index Page - Discovery & Comparison
 *
 * Primary job: Allow users to discover and compare tour operators.
 * Every operator's credentials, reviews, and track record must be
 * immediately comparable.
 */
export default function OperatorsPage() {
  const { user } = useAuth();
  const { operators: dbOperators, isLoading, error } = useOperators();

  const [regionFilter, setRegionFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Map database operators to display format
  const allOperators = useMemo(() => {
    return dbOperators.map(mapOperatorForDisplay);
  }, [dbOperators]);

  const regionOptions = useMemo(
    () => [
      { value: 'all', label: 'All regions' },
      { value: 'vic', label: 'Victoria' },
      { value: 'nsw', label: 'New South Wales' },
      { value: 'qld', label: 'Queensland' },
      { value: 'sa', label: 'South Australia' },
      { value: 'wa', label: 'Western Australia' },
      { value: 'tas', label: 'Tasmania' },
      { value: 'nt', label: 'Northern Territory' },
      { value: 'act', label: 'ACT' },
    ],
    []
  );

  // Extract unique specializations from operators
  const specializationOptions = useMemo(() => {
    const specs = new Set<string>();
    allOperators.forEach(op => {
      op.specializations.forEach(s => specs.add(s));
    });
    return [
      { value: 'all', label: 'All specializations' },
      ...Array.from(specs)
        .sort()
        .map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })),
    ];
  }, [allOperators]);

  const sortOptions = useMemo(
    () => [
      { value: 'name', label: 'Alphabetical' },
      { value: 'reviews', label: 'Most reviewed' },
      { value: 'tours', label: 'Most active' },
      { value: 'rating', label: 'Highest rated' },
    ],
    []
  );

  // Filter and sort operators
  const filteredOperators = useMemo(() => {
    let operators = allOperators.filter(op => op.verified);

    // Apply region filter
    if (regionFilter !== 'all') {
      operators = operators.filter(op => extractRegion(op.location) === regionFilter);
    }

    // Apply specialization filter
    if (specializationFilter !== 'all') {
      operators = operators.filter(op => op.specializations.includes(specializationFilter));
    }

    // Apply sorting
    operators.sort((a, b) => {
      switch (sortBy) {
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'tours':
          return b.toursCompleted - a.toursCompleted;
        case 'rating':
          if (b.averageRating !== a.averageRating) {
            return b.averageRating - a.averageRating;
          }
          return b.totalReviews - a.totalReviews;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return operators;
  }, [allOperators, regionFilter, specializationFilter, sortBy]);

  // Calculate aggregate stats
  const stats = useMemo(() => {
    const verified = filteredOperators.filter(op => op.verified).length;
    const totalToursRun = filteredOperators.reduce((sum, op) => sum + op.toursCompleted, 0);
    return { total: filteredOperators.length, verified, totalToursRun };
  }, [filteredOperators]);

  // Active filters for chips
  const activeFilters: { key: string; label: string; onRemove: () => void }[] = [];
  if (regionFilter !== 'all') {
    const option = regionOptions.find(o => o.value === regionFilter);
    activeFilters.push({
      key: 'region',
      label: option?.label || regionFilter,
      onRemove: () => setRegionFilter('all'),
    });
  }
  if (specializationFilter !== 'all') {
    const option = specializationOptions.find(o => o.value === specializationFilter);
    activeFilters.push({
      key: 'specialization',
      label: option?.label || specializationFilter,
      onRemove: () => setSpecializationFilter('all'),
    });
  }

  const clearAllFilters = () => {
    setRegionFilter('all');
    setSpecializationFilter('all');
  };

  // Loading state
  if (isLoading) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen bg-[var(--color-surface)]">
          <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
            <div className="animate-pulse space-y-[var(--space-xl)]">
              <div className="h-10 bg-[var(--color-border)] rounded w-1/3" />
              <div className="h-6 bg-[var(--color-border)] rounded w-2/3" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-xl)]">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-[var(--color-border)] rounded-[var(--radius-lg)]" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen bg-[var(--color-surface)]">
          <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
            <EmptyState
              title="Unable to load operators"
              description={error}
              actionLabel="Try again"
              onAction={() => window.location.reload()}
            />
          </div>
        </main>
      </ErrorBoundary>
    );
  }

  // Show pre-launch state if no operators exist yet
  if (allOperators.length === 0) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen bg-[var(--color-surface)]">
          <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
            <header className="mb-[var(--space-md)] text-center">
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
                Guides
              </h1>
            </header>
            <PreLaunchEmptyState context="operators" isLoggedIn={!!user} userName={user?.email?.split('@')[0]} />
          </div>
        </main>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          {/* Section 1: Page Header */}
          <header className="mb-[var(--space-2xl)]">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              Verified Guides
            </h1>
            <p className="text-[var(--color-ink-muted)]">
              Every operator on Quorum is verified for credentials, experience, and professionalism. Filter by region or
              specialization to find the right guide for your next birding adventure.
            </p>
          </header>

          {/* Section 2: Filtering & Sorting Controls */}
          <div className="mb-[var(--space-xl)] p-[var(--space-lg)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)]">
            {/* Filter dropdowns */}
            <div className="flex flex-wrap items-center gap-[var(--space-md)] mb-[var(--space-md)]">
              <FilterDropdown label="Region" options={regionOptions} value={regionFilter} onChange={setRegionFilter} />
              <FilterDropdown
                label="Specialization"
                options={specializationOptions}
                value={specializationFilter}
                onChange={setSpecializationFilter}
              />
              <div className="hidden sm:block w-px h-8 bg-[var(--color-border)]" aria-hidden="true" />
              <FilterDropdown label="Sort" options={sortOptions} value={sortBy} onChange={setSortBy} />
            </div>

            {/* Active filters and results count */}
            <div className="flex flex-wrap items-center justify-between gap-[var(--space-md)]">
              <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
                {activeFilters.map(filter => (
                  <FilterChip key={filter.key} label={filter.label} onRemove={filter.onRemove} />
                ))}
                {activeFilters.length > 1 && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="py-3 px-2 min-h-[48px] text-sm text-[var(--color-primary)] font-medium hover:underline focus:outline-none focus:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Aggregate Stats */}
              <div className="text-sm text-[var(--color-ink-muted)]" aria-live="polite">
                <span className="font-mono font-medium text-[var(--color-ink)]">{stats.total}</span>
                {' '}operators
                {stats.verified > 0 && (
                  <>
                    {' · '}
                    <span className="text-[var(--color-confirmed)]">{stats.verified} verified</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Operators Grid OR Empty State */}
          {filteredOperators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-xl)]">
              {filteredOperators.map(operator => (
                <OperatorCard
                  key={operator.id}
                  id={operator.slug}
                  name={operator.name}
                  photo={operator.photo}
                  verified={operator.verified}
                  expertise={operator.expertise}
                  location={operator.location}
                  totalReviews={operator.totalReviews}
                  averageRating={operator.averageRating}
                  toursCompleted={operator.toursCompleted}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No operators match your filters"
              description="Try adjusting your filters to see more operators."
              suggestions={['Select a different region', 'Choose a different specialization', 'View all operators']}
              actionLabel="Clear all filters"
              onAction={clearAllFilters}
            />
          )}
        </div>
      </main>
    </ErrorBoundary>
  );
}
