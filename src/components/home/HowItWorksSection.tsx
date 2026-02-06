'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ResponsiveVideo } from '@/components/ui/ResponsiveVideo';

interface ProcessStep {
  number: number;
  action: string;
  outcome: string;
}

/**
 * How It Works Section - Video + Vertical Steps Layout
 *
 * Desktop: Square video on left, steps stacked vertically on right
 * Mobile: Video above, steps below
 *
 * Design: Organic/natural aesthetic with forest green accents
 */
export function HowItWorksSection() {
  const steps: ProcessStep[] = [
    {
      number: 1,
      action: 'Find your tour',
      outcome: 'Browse tours by region, species, or date. See quorum progress at a glance.',
    },
    {
      number: 2,
      action: 'Commit conditionally',
      outcome: 'Pay a small deposit to signal commitment. Fully refunded if quorum isn\'t reached.',
    },
    {
      number: 3,
      action: 'Tour confirms',
      outcome: 'Once quorum is reached, the tour is guaranteed. Pay the balance and you\'re set.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-3 sm:mb-4">
              How Quorum works
            </h2>
            <p className="text-[var(--color-ink-muted)] text-base sm:text-lg leading-relaxed">
              Three steps. Zero risk until the tour is guaranteed to run.
            </p>
          </div>
        </ScrollReveal>

        {/* Video + Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-12 sm:mb-16">
          {/* Video - Square, always 1:1 */}
          <ScrollReveal variant="fade-up" delay={100} duration={500}>
            <ResponsiveVideo
              slug="what-is-quorum"
              title="What is Quorum? (35 seconds)"
              aspect="square"
              hideTitle
              className="shadow-xl rounded-[var(--radius-organic)]"
            />
          </ScrollReveal>

          {/* Steps - Vertically aligned to match video height */}
          <div className="relative lg:aspect-square flex flex-col justify-between py-4 lg:py-0">
            {/* Vertical connector line - desktop */}
            <div
              className="hidden lg:block absolute w-1 bg-[var(--color-primary)]"
              style={{
                left: '2rem',
                top: '2rem',
                bottom: '2rem',
                transform: 'translateX(-50%)',
              }}
              aria-hidden="true"
            />

            {steps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                variant="fade-up"
                delay={150 + index * 100}
                duration={500}
              >
                <div className="relative flex gap-4 sm:gap-6">
                  {/* Mobile connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className="lg:hidden absolute w-1 bg-[var(--color-primary)]"
                      style={{
                        left: '1.5rem',
                        top: '3.5rem',
                        height: '2.5rem',
                        transform: 'translateX(-50%)',
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="
                      w-12 h-12 sm:w-16 sm:h-16
                      rounded-full
                      bg-[var(--color-primary)]
                      text-white
                      font-display font-semibold
                      text-xl sm:text-2xl
                      flex items-center justify-center
                      shadow-lg
                      ring-4 ring-white
                    ">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-2">
                    <h3 className="
                      font-display
                      text-lg sm:text-xl
                      font-semibold
                      text-[var(--color-ink)]
                      mb-2
                    ">
                      {step.action}
                    </h3>
                    <p className="
                      text-sm sm:text-base
                      text-[var(--color-ink-muted)]
                      leading-relaxed
                    ">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Clarification card */}
        <ScrollReveal variant="fade-up" delay={500} duration={500}>
          <div className="
            max-w-3xl mx-auto
            p-5 sm:p-8
            bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-primary)]/10
            border-l-4 border-[var(--color-primary)]
            rounded-r-[var(--radius-lg)]
            shadow-sm
          ">
            <div className="flex items-start gap-4">
              <div className="
                flex-shrink-0
                w-10 h-10 sm:w-12 sm:h-12
                bg-white
                rounded-full
                flex items-center justify-center
                shadow-sm
              ">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg text-[var(--color-ink)] leading-relaxed">
                  <strong className="font-semibold">If quorum is not reached?</strong>
                  {' '}The tour does not run. Your deposit is fully refunded. You are never charged for a tour that doesn't happen.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
