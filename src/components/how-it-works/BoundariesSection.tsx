import { BoundaryItem } from './BoundaryItem';

interface Boundary {
  title: string;
  explanation: string;
}

const boundaries: Boundary[] = [
  {
    title: 'instant booking',
    explanation:
      'Tours don\'t confirm the moment you commit. They confirm when enough birders commit. This is the core mechanic—certainty for everyone, not just speed for one.',
  },
  {
    title: 'a species guarantee',
    explanation:
      'No one can promise which birds will appear. Operators know their locations well, but nature doesn\'t follow scripts. What we guarantee is the tour happens, not what you\'ll see.',
  },
  {
    title: 'a review filter',
    explanation:
      'All reviews are shown—the good and the critical. Operators can respond but can\'t remove feedback. Trust comes from transparency, not curation.',
  },
  {
    title: 'a discount aggregator',
    explanation:
      'Prices reflect the operator\'s costs and expertise, not bulk discounts. Reaching a threshold gets a tour to run, not a lower price.',
  },
];

export function BoundariesSection() {
  return (
    <section className="
      py-20
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        <div className="max-w-4xl mx-auto">
          {/* Section headline */}
          <h2 className="
            font-display
            text-[clamp(1.75rem,4vw,2.5rem)]
            leading-tight
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            What Quorum does not do
          </h2>

          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
            mb-[var(--space-2xl)]
          ">
            Setting clear boundaries prevents misunderstandings. Here is what you will not
            find on Quorum:
          </p>

          {/* Boundary list */}
          <div className="space-y-[var(--space-xl)]">
            {boundaries.map((boundary, index) => (
              <BoundaryItem
                key={index}
                title={boundary.title}
                explanation={boundary.explanation}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
