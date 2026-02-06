'use client';

import { useMemo } from 'react';
import { OperatorPreviewCard } from '../OperatorPreviewCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

export function TrustSection() {
  const trustSignals: TrustSignal[] = useMemo(() => [
    {
      icon: '✓',
      title: 'Verified operators only',
      description: 'Every operator is reviewed before listing. Credentials, experience, and safety records are checked.',
    },
    {
      icon: '○',
      title: 'No charge until confirmed',
      description: 'Your payment method is not charged until the tour reaches quorum and is guaranteed to run.',
    },
    {
      icon: '◊',
      title: 'Transparent conditions',
      description: 'Quorum requirements, dates, and refund conditions are visible upfront. No hidden fees. No surprise cancellations.',
    },
  ], []);

  // Example featured operators (memoized to prevent re-creation)
  const featuredOperators = useMemo(() => [
    {
      name: 'Sarah Mitchell',
      expertise: 'Wetland ecology, 15 years guiding',
      verified: true,
    },
    {
      name: 'David Chen',
      expertise: 'Shorebird specialist, conservation biologist',
      verified: true,
    },
  ], []);
  return (
    <section className="
      py-12 sm:py-16 lg:py-[var(--space-section-normal)]
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-4 sm:px-6 lg:px-[var(--space-lg)]
      ">
        {/* Section header */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-8 sm:mb-[var(--space-3xl)] max-w-[var(--container-content)]">
            <h2 className="
              font-display
              text-[clamp(1.75rem,4vw,2.5rem)]
              leading-tight
              text-[var(--color-ink)]
              mb-3 sm:mb-[var(--space-md)]
            ">
              Built on trust, not persuasion.
            </h2>
            <p className="
              text-[var(--color-ink-muted)]
              text-sm sm:text-[var(--text-base)]
            ">
              Every part of Quorum is designed to reduce uncertainty, not to sell you something.
            </p>
          </div>
        </ScrollReveal>

        {/* Asymmetric grid layout */}
        <div className="
          grid grid-cols-1 lg:grid-cols-5
          gap-8 sm:gap-[var(--space-2xl)]
        ">
          {/* Trust signals - 3 columns */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-[var(--space-xl)]">
            {trustSignals.map((signal, index) => (
              <ScrollReveal
                key={index}
                variant="fade-up"
                delay={index * 100}
                duration={500}
              >
                <div
                  className="
                    flex gap-3 sm:gap-[var(--space-lg)]
                    p-4 sm:p-[var(--space-lg)]
                    bg-[var(--color-surface-raised)]
                    border border-[var(--color-border)]
                    rounded-[var(--radius-lg)]
                  "
                >
                  {/* Icon - custom, not default Lucide */}
                  <div className="
                    w-8 h-8 sm:w-10 sm:h-10
                    flex items-center justify-center
                    bg-[var(--color-confirmed-bg)]
                    text-[var(--color-confirmed)]
                    rounded-[var(--radius-md)]
                    font-mono font-bold text-sm sm:text-base
                    flex-shrink-0
                  ">
                    {signal.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="
                      font-medium
                      text-sm sm:text-base
                      text-[var(--color-ink)]
                      mb-1 sm:mb-[var(--space-xs)]
                    ">
                      {signal.title}
                    </h3>
                    <p className="
                      text-[var(--color-ink-muted)]
                      text-xs sm:text-[var(--text-sm)]
                      leading-relaxed
                    ">
                      {signal.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Operator previews - 2 columns */}
          <ScrollReveal variant="fade-up" delay={200} duration={500} className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-[var(--space-lg)]">
              <h3 className="
                text-xs sm:text-sm font-medium uppercase tracking-wide
                text-[var(--color-ink-subtle)]
                mb-3 sm:mb-[var(--space-md)]
              ">
                Featured operators
              </h3>

              {featuredOperators.map((operator, index) => (
                <OperatorPreviewCard
                  key={index}
                  {...operator}
                />
              ))}

              <a
                href="/operators"
                className="
                  inline-flex items-center gap-2
                  text-[var(--color-accent)]
                  text-sm font-medium
                  hover:underline
                  mt-[var(--space-md)]
                  py-3 px-2 min-h-[48px]
                "
              >
                View all operators
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
