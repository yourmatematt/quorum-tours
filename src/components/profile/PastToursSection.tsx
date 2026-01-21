'use client';

import { useState } from 'react';
import { PastTourItem } from '../ui/PastTourItem';

interface PastTour {
  id: string;
  title: string;
  date: string;
  outcome: 'completed' | 'cancelled';
  participantCount?: number;
}

interface PastToursSectionProps {
  tours: PastTour[];
}

/**
 * PastToursSection - Collapsible past tour archive
 *
 * Collapsed by default to reduce cognitive load.
 * No celebration or achievement framing.
 *
 * Per IA: "Most users visit profile for active commitments"
 */
export function PastToursSection({ tours }: PastToursSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (tours.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="past-tours-heading">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="past-tours-content"
        className="
          w-full
          flex items-center justify-between
          py-[var(--space-md)]
          text-left
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
          rounded-[var(--radius-md)]
        "
      >
        <h2
          id="past-tours-heading"
          className="
            font-display
            text-[var(--text-xl)]
            text-[var(--color-ink)]
          "
        >
          Past Tours
        </h2>

        <div className="flex items-center gap-[var(--space-sm)]">
          <span className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`
              text-[var(--color-ink-subtle)]
              transition-transform duration-[var(--transition-normal)]
              ${isExpanded ? 'rotate-180' : ''}
            `}
            aria-hidden="true"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div
          id="past-tours-content"
          className="
            mt-[var(--space-md)]
            bg-[var(--color-surface-raised)]
            border border-[var(--color-border)]
            rounded-[var(--radius-lg)]
            p-[var(--space-md)]
          "
        >
          {tours.map((tour) => (
            <PastTourItem
              key={tour.id}
              id={tour.id}
              title={tour.title}
              date={tour.date}
              outcome={tour.outcome}
              participantCount={tour.participantCount}
            />
          ))}
        </div>
      )}
    </section>
  );
}
