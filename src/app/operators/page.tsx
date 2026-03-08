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
  isFoundingOperator: boolean;
  expertise: string;
  description: string;
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
    isFoundingOperator: operator.is_founding_operator,
    expertise: operator.tagline || 'Birding specialist',
    description: operator.description || '',
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

          {/* Section 3: Operators — Featured or Grid */}
          {filteredOperators.length > 0 ? (
            filteredOperators.length === 1 ? (
              /* Featured layout for single operator */
              <FeaturedOperatorCard operator={filteredOperators[0]} />
            ) : (
              /* Grid layout for multiple operators */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-xl)]">
                {filteredOperators.map(operator => (
                  <OperatorCard
                    key={operator.id}
                    id={operator.slug}
                    name={operator.name}
                    photo={operator.photo}
                    verified={operator.verified}
                    isFoundingOperator={operator.isFoundingOperator}
                    expertise={operator.expertise}
                    location={operator.location}
                    totalReviews={operator.totalReviews}
                    averageRating={operator.averageRating}
                    toursCompleted={operator.toursCompleted}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No operators match your filters"
              description="Try adjusting your filters to see more operators."
              suggestions={['Select a different region', 'Choose a different specialization', 'View all operators']}
              actionLabel="Clear all filters"
              onAction={clearAllFilters}
            />
          )}

          {/* More Operators Coming Soon */}
          <div className="
            mt-[var(--space-xl)]
            p-[var(--space-lg)] sm:p-[var(--space-xl)]
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
          ">
            <h3 className="font-display text-lg sm:text-xl text-[var(--color-ink)] mb-[var(--space-sm)]">
              More guides joining soon
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-ink-muted)] leading-relaxed mb-[var(--space-lg)] max-w-prose">
              Quorum Tours is onboarding expert naturalists and wildlife guides across Australia.
              If you're a guide interested in joining, we'd love to hear from you.
            </p>
            <a
              href="/for-operators"
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
              Apply to join
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}

/** Full-width featured card for when only one operator exists */
function FeaturedOperatorCard({ operator }: { operator: DisplayOperator }) {
  return (
    <a
      href={`/operators/${operator.slug}`}
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
        {/* Photo — larger for featured */}
        <div
          className="
            w-24 h-24 sm:w-[120px] sm:h-[120px]
            rounded-full
            bg-[var(--color-surface-sunken)]
            flex items-center justify-center
            text-3xl text-[var(--color-ink-subtle)]
            overflow-hidden
            flex-shrink-0
          "
          aria-hidden="true"
        >
          {operator.photo ? (
            <img src={operator.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            operator.name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name + badges */}
          <div className="flex flex-wrap items-center gap-[var(--space-sm)] mb-[var(--space-xs)]">
            <h3 className="
              font-display text-xl sm:text-2xl font-semibold
              text-[var(--color-ink)]
              group-hover:text-[var(--color-primary)]
              transition-colors duration-200
            ">
              {operator.name}
            </h3>
            {operator.verified && (
              <span className="
                inline-flex items-center gap-[var(--space-xs)]
                px-[var(--space-sm)] py-[var(--space-xs)]
                text-xs font-medium
                bg-[var(--color-confirmed-bg)]
                text-[var(--color-confirmed)]
                rounded-[var(--radius-sm)]
              ">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                  <path d="M10.28 2.72a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06L4.25 7.69l4.97-4.97a.75.75 0 011.06 0z" />
                </svg>
                Verified
              </span>
            )}
            {operator.isFoundingOperator && (
              <span className="
                inline-flex items-center
                px-[var(--space-sm)] py-[var(--space-xs)]
                text-xs font-medium
                bg-[var(--color-founding-bg)]
                text-[var(--color-founding)]
                rounded-[var(--radius-sm)]
              ">
                Founding Operator
              </span>
            )}
          </div>

          {/* Location */}
          <p className="
            text-sm text-[var(--color-ink-subtle)]
            flex items-center gap-[var(--space-xs)]
            mb-[var(--space-md)]
          ">
            <svg
              width="14" height="14" className="flex-shrink-0"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {operator.location}
          </p>

          {/* Specialties */}
          {operator.specializations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-[var(--space-md)]">
              {operator.specializations.slice(0, 5).map(spec => (
                <span
                  key={spec}
                  className="
                    px-2.5 py-1
                    text-xs font-medium
                    bg-[var(--color-primary-subtle)]
                    text-[var(--color-primary)]
                    rounded-[var(--radius-sm)]
                  "
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Bio excerpt */}
          {operator.description && (
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-2 mb-[var(--space-md)]">
              {operator.description}
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
            View profile
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </a>
  );
}
