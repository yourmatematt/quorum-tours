'use client';

import { useState } from 'react';

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
 * PastToursSection - Collapsible past tour card
 *
 * Self-contained card with proper boundaries.
 * Collapsed by default to reduce cognitive load.
 */
export function PastToursSection({ tours }: PastToursSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (tours.length === 0) {
    return null;
  }

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="past-tours-content"
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-surface-sunken)] transition-colors"
      >
        <h2 className="font-display text-base font-semibold text-[var(--color-ink)]">
          Past Tours
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-ink-muted)]">
            {tours.length} {tours.length === 1 ? 'tour' : 'tours'}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`text-[var(--color-ink-subtle)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div
          id="past-tours-content"
          className="px-4 pb-4 border-t border-[var(--color-border)]"
        >
          <ul className="pt-3 space-y-2">
            {tours.map((tour) => (
              <li
                key={tour.id}
                className="flex items-center justify-between py-2 px-3 bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[var(--color-ink)] truncate">{tour.title}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{tour.date}</p>
                </div>
                <span className={`ml-2 text-xs flex-shrink-0 ${
                  tour.outcome === 'completed'
                    ? 'text-[var(--color-confirmed)]'
                    : 'text-[var(--color-ink-muted)]'
                }`}>
                  {tour.outcome === 'completed' ? '✓ Completed' : 'Cancelled'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
