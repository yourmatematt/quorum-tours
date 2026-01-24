'use client';

import { useState, useMemo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OperatorCard } from '@/components/ui/OperatorCard';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { FilterChip } from '@/components/ui/FilterChip';
import { EmptyState } from '@/components/ui/EmptyState';

interface OperatorListItem {
  id: string;
  slug: string;
  name: string;
  photo?: string;
  verified: boolean;
  expertise: string;
  location: string;
  region: string;
  specializations: string[];
  totalReviews: number;
  averageRating: number;
  toursCompleted: number;
  activeTourCount: number;
}

// Example operators data
const allOperators: OperatorListItem[] = [
  {
    id: 'sarah-mitchell',
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    photo: undefined,
    verified: true,
    expertise: 'Wetland and waterbird specialist',
    location: 'Melbourne, Victoria',
    region: 'vic',
    specializations: ['wetlands', 'shorebirds'],
    totalReviews: 4,
    averageRating: 4.8,
    toursCompleted: 47,
    activeTourCount: 1,
  },
  {
    id: 'david-chen',
    slug: 'david-chen',
    name: 'David Chen',
    photo: undefined,
    verified: true,
    expertise: 'Shorebird identification specialist',
    location: 'Cairns, Queensland',
    region: 'qld',
    specializations: ['shorebirds', 'pelagic'],
    totalReviews: 2,
    averageRating: 4.5,
    toursCompleted: 23,
    activeTourCount: 1,
  },
  {
    id: 'maria-santos',
    slug: 'maria-santos',
    name: 'Maria Santos',
    photo: undefined,
    verified: false,
    expertise: 'Rainforest endemic specialist',
    location: 'Cairns, Queensland',
    region: 'qld',
    specializations: ['rainforest'],
    totalReviews: 0,
    averageRating: 0,
    toursCompleted: 3,
    activeTourCount: 1,
  },
  {
    id: 'james-wilson',
    slug: 'james-wilson',
    name: 'James Wilson',
    photo: undefined,
    verified: true,
    expertise: 'Mallee woodland specialist',
    location: 'Mildura, Victoria',
    region: 'vic',
    specializations: ['grasslands'],
    totalReviews: 8,
    averageRating: 4.6,
    toursCompleted: 31,
    activeTourCount: 1,
  },
  {
    id: 'emily-roberts',
    slug: 'emily-roberts',
    name: 'Emily Roberts',
    photo: undefined,
    verified: true,
    expertise: 'Alpine and highland specialist',
    location: 'Sydney, New South Wales',
    region: 'nsw',
    specializations: ['grasslands', 'raptors'],
    totalReviews: 12,
    averageRating: 4.9,
    toursCompleted: 56,
    activeTourCount: 1,
  },
  {
    id: 'tom-baker',
    slug: 'tom-baker',
    name: 'Tom Baker',
    photo: undefined,
    verified: true,
    expertise: 'Kimberley endemic specialist',
    location: 'Broome, Western Australia',
    region: 'wa',
    specializations: ['grasslands', 'wetlands'],
    totalReviews: 6,
    averageRating: 4.7,
    toursCompleted: 19,
    activeTourCount: 1,
  },
  {
    id: 'lucy-chen',
    slug: 'lucy-chen',
    name: 'Lucy Chen',
    photo: undefined,
    verified: true,
    expertise: 'Tasmanian endemic specialist',
    location: 'Hobart, Tasmania',
    region: 'tas',
    specializations: ['rainforest'],
    totalReviews: 15,
    averageRating: 4.9,
    toursCompleted: 42,
    activeTourCount: 1,
  },
];

/**
 * Operators Index Page - Discovery & Comparison
 *
 * Primary job: Allow users to discover and compare tour operators.
 * Every operator's credentials, reviews, and track record must be
 * immediately comparable.
 */
export default function OperatorsPage() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const regionOptions = useMemo(() => [
    { value: 'all', label: 'All regions' },
    { value: 'vic', label: 'Victoria' },
    { value: 'nsw', label: 'New South Wales' },
    { value: 'qld', label: 'Queensland' },
    { value: 'sa', label: 'South Australia' },
    { value: 'wa', label: 'Western Australia' },
    { value: 'tas', label: 'Tasmania' },
    { value: 'nt', label: 'Northern Territory' },
    { value: 'act', label: 'ACT' },
  ], []);

  const specializationOptions = useMemo(() => [
    { value: 'all', label: 'All specializations' },
    { value: 'shorebirds', label: 'Shorebirds' },
    { value: 'wetlands', label: 'Wetlands' },
    { value: 'rainforest', label: 'Rainforest' },
    { value: 'pelagic', label: 'Pelagic' },
    { value: 'raptors', label: 'Raptors' },
    { value: 'grasslands', label: 'Grasslands' },
    { value: 'nocturnal', label: 'Nocturnal' },
  ], []);

  const sortOptions = useMemo(() => [
    { value: 'name', label: 'Alphabetical' },
    { value: 'reviews', label: 'Most reviewed' },
    { value: 'tours', label: 'Most active' },
    { value: 'rating', label: 'Highest rated' },
  ], []);

  // Filter and sort operators (only show verified)
  const filteredOperators = useMemo(() => {
    let operators = allOperators.filter(op => op.verified);

    // Apply region filter
    if (regionFilter !== 'all') {
      operators = operators.filter(op => op.region === regionFilter);
    }

    // Apply specialization filter
    if (specializationFilter !== 'all') {
      operators = operators.filter(op =>
        op.specializations.includes(specializationFilter)
      );
    }

    // Apply sorting
    operators.sort((a, b) => {
      switch (sortBy) {
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'tours':
          return b.toursCompleted - a.toursCompleted;
        case 'rating':
          // Sort by rating, then by review count for ties
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
  }, [regionFilter, specializationFilter, sortBy]);

  // Calculate aggregate stats
  const stats = useMemo(() => {
    const verified = filteredOperators.filter(op => op.verified).length;
    const totalToursRun = filteredOperators.reduce(
      (sum, op) => sum + op.toursCompleted,
      0
    );
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

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
        py-[var(--space-3xl)]
      ">
        {/* Section 1: Page Header */}
        <header className="mb-[var(--space-2xl)]">
          <h1 className="
            font-display
            text-3xl sm:text-4xl
            font-semibold
            text-[var(--color-ink)]
            mb-[var(--space-sm)]
          ">
            Verified Guides
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            Every operator on Quorum is verified for credentials, experience, and professionalism. Filter by region or specialization to find the right guide for your next birding adventure.
          </p>
        </header>

        {/* Section 2: Filtering & Sorting Controls */}
        <div className="
          mb-[var(--space-xl)]
          p-[var(--space-lg)]
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          shadow-[var(--shadow-card)]
        ">
          {/* Filter dropdowns */}
          <div className="
            flex flex-wrap items-center gap-[var(--space-md)]
            mb-[var(--space-md)]
          ">
            <FilterDropdown
              label="Region"
              options={regionOptions}
              value={regionFilter}
              onChange={setRegionFilter}
            />
            <FilterDropdown
              label="Specialization"
              options={specializationOptions}
              value={specializationFilter}
              onChange={setSpecializationFilter}
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
                    py-3 px-2 min-h-[48px]
                    text-sm text-[var(--color-primary)] font-medium
                    hover:underline
                    focus:outline-none focus:underline
                  "
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Section 4: Aggregate Stats */}
            <div
              className="text-sm text-[var(--color-ink-muted)]"
              aria-live="polite"
            >
              <span className="font-mono font-medium text-[var(--color-ink)]">
                {stats.total}
              </span>
              {' '}operators
              {stats.verified > 0 && (
                <>
                  {' · '}
                  <span className="text-[var(--color-confirmed)]">
                    {stats.verified} verified
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Operators Grid OR Section 5: Empty State */}
        {filteredOperators.length > 0 ? (
          <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-[var(--space-xl)]
          ">
            {filteredOperators.map(operator => (
              <OperatorCard
                key={operator.id}
                id={operator.id}
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
            suggestions={[
              'Select a different region',
              'Choose a different specialization',
              'View all operators',
            ]}
            actionLabel="Clear all filters"
            onAction={clearAllFilters}
          />
        )}
      </div>
    </main>
    </ErrorBoundary>
  );
}
