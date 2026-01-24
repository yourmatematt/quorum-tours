'use client';

import { useMemo } from 'react';
import { TourCard } from '../TourCard';

/**
 * Featured Tours Section - Organic Biophilic Design
 *
 * Design System: HOME-REDESIGN-DECISIONS.md
 * - Shows 3 example tours with different confirmation states
 * - Demonstrates transparency of the threshold mechanic
 * - Organic rounded corners, natural shadows
 */
export function TourStatesSection() {
  // Featured tour examples (memoized)
  const exampleTours = useMemo(() => [
    {
      title: 'Dawn Chorus at Werribee',
      operatorName: 'Sarah Mitchell',
      status: 'confirmed' as const,
      currentParticipants: 8,
      threshold: 6,
      date: 'Mar 15, 2026',
      location: 'Werribee, VIC',
    },
    {
      title: 'Shorebird Migration Watch',
      operatorName: 'David Chen',
      status: 'forming' as const,
      currentParticipants: 4,
      threshold: 8,
      date: 'Apr 2, 2026',
      location: 'Cairns, QLD',
    },
    {
      title: 'Rainforest Endemics Trek',
      operatorName: 'Maria Santos',
      status: 'forming' as const,
      currentParticipants: 7,
      threshold: 10,
      date: 'Apr 12, 2026',
      location: 'Daintree, QLD',
    },
  ], []);

  return (
    <section className="
      py-20
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        {/* Section header - center aligned */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="
            font-display
            text-4xl lg:text-5xl
            font-semibold
            text-[var(--color-ink)]
            mb-4
          ">
            Featured tours.
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-lg
            leading-relaxed
          ">
            Every tour shows its confirmation state. No hidden status. No guessing.
          </p>
        </div>

        {/* Tour cards grid - organic spacing */}
        <div className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-8
          mb-16
        ">
          {exampleTours.map((tour, index) => (
            <div key={index}>
              <TourCard {...tour} />
            </div>
          ))}
        </div>

        {/* Status legend - organic cards */}
        <div className="
          max-w-4xl mx-auto
          grid grid-cols-1 md:grid-cols-3
          gap-6
        ">
          <div className="
            p-6
            bg-white
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
            flex items-start gap-4
          ">
            <div className="
              flex-shrink-0
              w-12 h-12
              bg-[var(--color-confirmed-bg)]
              rounded-full
              flex items-center justify-center
            ">
              <svg className="w-6 h-6 text-[var(--color-confirmed)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <div>
              <strong className="text-[var(--color-ink)] font-semibold text-base block mb-1">Confirmed</strong>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                Threshold met. This tour will run.
              </p>
            </div>
          </div>

          <div className="
            p-6
            bg-white
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
            flex items-start gap-4
          ">
            <div className="
              flex-shrink-0
              w-12 h-12
              bg-[var(--color-forming-bg)]
              rounded-full
              flex items-center justify-center
            ">
              <svg className="w-6 h-6 text-[var(--color-forming)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <strong className="text-[var(--color-ink)] font-semibold text-base block mb-1">Forming</strong>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                Gathering commitments. Not yet confirmed.
              </p>
            </div>
          </div>

          <div className="
            p-6
            bg-white
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
            flex items-start gap-4
          ">
            <div className="
              flex-shrink-0
              w-12 h-12
              bg-[var(--color-not-running-bg)]
              rounded-full
              flex items-center justify-center
            ">
              <svg className="w-6 h-6 text-[var(--color-not-running)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <strong className="text-[var(--color-ink)] font-semibold text-base block mb-1">Not Running</strong>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                Threshold not met. No one is charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
