'use client';

import { QuorumIndicator } from '../operator/QuorumIndicator';

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'List Your Tour',
    description: "Tell us what you're running—species, dates, price, minimum participants. No complex forms. No 47-field dashboards.",
  },
  {
    number: 2,
    title: 'Birders Commit',
    description: "Your tour appears in search. Birders who want your target species get notified. When they book, their card is held—not charged.",
  },
  {
    number: 3,
    title: 'Quorum Reached',
    description: "When you hit your minimum, the tour goes green. All participants are notified. Cards are charged simultaneously.",
  },
  {
    number: 4,
    title: 'You Guide',
    description: "Commit to your suppliers with confidence. The participants are confirmed. The deposits are in. Do what you love.",
  },
];

export function HowItWorks(): JSX.Element {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-[var(--space-2xl)] bg-[var(--color-surface-sunken)] scroll-mt-16">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[var(--space-lg)]">
        <header className="text-center mb-8 sm:mb-[var(--space-xl)]">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-sm)]">
            How Quorum Works
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] mx-auto">
            Four steps. No surprises. Every tour that reaches Quorum runs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[var(--space-md)] mb-8 sm:mb-[var(--space-xl)]">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-4 sm:p-[var(--space-md)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-lg)]"
            >
              <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white font-mono font-bold text-sm rounded-full">
                  {step.number}
                </div>
                <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-ink)]">
                  {step.title}
                </h3>
              </div>
              <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-[var(--space-lg)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-center text-xs sm:text-sm text-[var(--color-ink-subtle)] mb-3 sm:mb-[var(--space-md)]">
            Example: Pelagic charter — <span className="font-medium text-[var(--color-ink)]">6 minimum</span>, <span className="font-medium text-[var(--color-ink)]">8 maximum</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-[var(--space-md)]">
            <div className="p-3 sm:p-[var(--space-sm)] bg-[var(--color-surface-sunken)] rounded-[var(--radius-md)]">
              <p className="text-xs text-[var(--color-ink-subtle)] mb-2 font-medium">Forming (cards held, not charged)</p>
              <QuorumIndicator current={4} quorum={6} max={8} size="md" showLabel showStatus />
            </div>
            <div className="p-3 sm:p-[var(--space-sm)] bg-[var(--color-confirmed-bg)] rounded-[var(--radius-md)]">
              <p className="text-xs text-[var(--color-ink-subtle)] mb-2 font-medium">Quorum reached (cards charged)</p>
              <QuorumIndicator current={7} quorum={6} max={8} size="md" showLabel showStatus />
            </div>
          </div>

          <p className="mt-3 sm:mt-[var(--space-md)] text-center text-xs sm:text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            You set the minimum and maximum. <span className="text-[var(--color-ink)] font-medium">Everyone sees the progress.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
