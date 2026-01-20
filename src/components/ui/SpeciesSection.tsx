'use client';

import { useState } from 'react';

type LikelihoodLevel = 'primary' | 'secondary' | 'opportunistic';

interface Species {
  name: string;
  scientificName?: string;
}

interface SpeciesGroupData {
  level: LikelihoodLevel;
  species: Species[];
}

interface SpeciesSectionProps {
  groups: SpeciesGroupData[];
}

const levelConfig: Record<LikelihoodLevel, {
  label: string;
  description: string;
  badgeColor: string;
  badgeBg: string;
}> = {
  primary: {
    label: 'Primary targets',
    description: 'Core focus of this tour',
    badgeColor: 'var(--color-confirmed)',
    badgeBg: 'var(--color-confirmed-bg)',
  },
  secondary: {
    label: 'Secondary targets',
    description: 'Commonly observed',
    badgeColor: 'var(--color-forming)',
    badgeBg: 'var(--color-forming-bg)',
  },
  opportunistic: {
    label: 'Opportunistic',
    description: 'Possible depending on conditions',
    badgeColor: 'var(--color-ink-subtle)',
    badgeBg: 'var(--color-surface-sunken)',
  },
};

function LikelihoodBadge({ level }: { level: LikelihoodLevel }) {
  const config = levelConfig[level];

  return (
    <span
      className="
        inline-flex items-center
        px-2 py-0.5
        text-xs font-medium
        rounded-[var(--radius-sm)]
      "
      style={{
        backgroundColor: config.badgeBg,
        color: config.badgeColor,
      }}
    >
      {level === 'primary' && '●'}
      {level === 'secondary' && '◐'}
      {level === 'opportunistic' && '○'}
      <span className="ml-1">{config.description}</span>
    </span>
  );
}

function SpeciesItem({ species, level }: { species: Species; level: LikelihoodLevel }) {
  return (
    <div className="
      flex items-center justify-between
      py-[var(--space-sm)]
      border-b border-[var(--color-border)]
      last:border-b-0
    ">
      <div>
        <span className="text-[var(--color-ink)] font-medium">
          {species.name}
        </span>
        {species.scientificName && (
          <span className="text-sm text-[var(--color-ink-subtle)] italic ml-2">
            {species.scientificName}
          </span>
        )}
      </div>
      <LikelihoodBadge level={level} />
    </div>
  );
}

function SpeciesGroup({ group }: { group: SpeciesGroupData }) {
  const [isExpanded, setIsExpanded] = useState(group.level !== 'opportunistic');
  const config = levelConfig[group.level];

  const isCollapsible = group.level === 'opportunistic';
  const visibleSpecies = isExpanded ? group.species : group.species.slice(0, 2);
  const hasMore = group.species.length > 2 && !isExpanded;

  return (
    <div className="mb-[var(--space-lg)]">
      <h4 className="
        text-sm font-medium text-[var(--color-ink-muted)]
        uppercase tracking-wide
        mb-[var(--space-sm)]
      ">
        {config.label}
      </h4>

      <div className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-md)]
        px-[var(--space-md)]
      ">
        {visibleSpecies.map((species, index) => (
          <SpeciesItem
            key={index}
            species={species}
            level={group.level}
          />
        ))}

        {isCollapsible && group.species.length > 2 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              w-full py-[var(--space-sm)]
              text-sm text-[var(--color-accent)]
              hover:underline
              focus:outline-none focus:underline
              flex items-center justify-center gap-[var(--space-xs)]
            "
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8l4-4 4 4" />
                </svg>
              </>
            ) : (
              <>
                <span>Show {group.species.length - 2} more</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function SpeciesSection({ groups }: SpeciesSectionProps) {
  // Sort groups by level order: primary, secondary, opportunistic
  const sortedGroups = [...groups].sort((a, b) => {
    const order = { primary: 0, secondary: 1, opportunistic: 2 };
    return order[a.level] - order[b.level];
  });

  return (
    <section>
      <h3 className="
        font-display text-lg text-[var(--color-ink)]
        mb-[var(--space-md)]
      ">
        Species Focus
      </h3>

      <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
        Sightings depend on conditions. These are target species, not guarantees.
      </p>

      {sortedGroups.map((group, index) => (
        <SpeciesGroup key={index} group={group} />
      ))}
    </section>
  );
}
