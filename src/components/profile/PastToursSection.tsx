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
 * PastToursSection - Collapsible past tour card (compact)
 */
export function PastToursSection({ tours }: PastToursSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (tours.length === 0) {
    return null;
  }

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[var(--color-surface-sunken)] transition-colors rounded-[var(--radius-organic)]"
      >
        <h2 className="font-display text-sm font-semibold text-[var(--color-ink)]">
          Past Tours
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-ink-muted)]">
            {tours.length}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`text-[var(--color-ink-subtle)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 border-t border-[var(--color-border)]">
          <ul className="pt-2 space-y-1">
            {tours.map((tour) => (
              <li
                key={tour.id}
                className="flex items-center justify-between py-1.5 px-2 bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[var(--color-ink)] truncate">{tour.title}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{tour.date}</p>
                </div>
                <span className={`ml-2 text-xs ${
                  tour.outcome === 'completed'
                    ? 'text-[var(--color-confirmed)]'
                    : 'text-[var(--color-ink-muted)]'
                }`}>
                  {tour.outcome === 'completed' ? '✓' : '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
