import { TourCard } from '../TourCard';

// Example data demonstrating different states
const exampleTours = [
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
    status: 'not-running' as const,
    currentParticipants: 2,
    threshold: 10,
    date: 'Feb 28, 2026',
    location: 'Daintree, QLD',
  },
];

export function TourStatesSection() {
  return (
    <section className="
      py-[var(--space-section-normal)]
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <div className="mb-[var(--space-3xl)] max-w-[var(--container-content)]">
          <h2 className="
            font-display
            text-[var(--text-2xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            See how tours progress.
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
          ">
            Every tour shows its confirmation state. No hidden status. No guessing.
          </p>
        </div>

        {/* Tour cards - asymmetric layout, NOT 4-column grid */}
        <div className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-[var(--space-xl)]
        ">
          {exampleTours.map((tour, index) => (
            <div
              key={index}
              className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <TourCard {...tour} />
            </div>
          ))}
        </div>

        {/* State explanations */}
        <div className="
          mt-[var(--space-3xl)]
          grid grid-cols-1 md:grid-cols-3
          gap-[var(--space-lg)]
        ">
          <div className="flex items-start gap-[var(--space-sm)]">
            <span className="
              inline-block w-3 h-3 mt-1.5
              rounded-full
              bg-[var(--color-confirmed)]
            " aria-hidden="true" />
            <div>
              <strong className="text-[var(--color-ink)] text-sm">Confirmed</strong>
              <p className="text-[var(--color-ink-muted)] text-sm">
                Threshold met. This tour will run.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-[var(--space-sm)]">
            <span className="
              inline-block w-3 h-3 mt-1.5
              rounded-full
              bg-[var(--color-forming)]
            " aria-hidden="true" />
            <div>
              <strong className="text-[var(--color-ink)] text-sm">Forming</strong>
              <p className="text-[var(--color-ink-muted)] text-sm">
                Gathering commitments. Not yet confirmed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-[var(--space-sm)]">
            <span className="
              inline-block w-3 h-3 mt-1.5
              rounded-full
              bg-[var(--color-not-running)]
            " aria-hidden="true" />
            <div>
              <strong className="text-[var(--color-ink)] text-sm">Not Running</strong>
              <p className="text-[var(--color-ink-muted)] text-sm">
                Threshold not met. No one is charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
