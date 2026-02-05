'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ProcessStep {
  number: number;
  action: string;
  outcome: string;
}

/**
 * How It Works Section - Simple Numbered Steps
 *
 * Minimal design with numbered circles and concise text
 * Steps: Browse → Commit → Tour Confirms
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
    <section className="py-20 bg-white">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
              How Quorum works.
            </h2>
            <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed">
              Three steps. Zero risk until the tour is guaranteed to run.
            </p>
          </div>
        </ScrollReveal>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              variant="fade-up"
              delay={index * 150}
              duration={500}
            >
              <div className="relative text-center">
                {/* Connector line between circles */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 h-px"
                    style={{
                      backgroundColor: '#2e8b57',
                      left: 'calc(50% + 2rem)',
                      right: 'calc(-100% + 50% - 2rem)'
                    }}
                  />
                )}
                <div className="relative z-10">
                  {/* Numbered circle */}
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-[var(--color-primary)] text-white font-heading font-semibold rounded-full text-2xl shadow-[var(--shadow-card)]">
                    {step.number}
                  </div>

                  {/* Step title */}
                  <h3 className="font-heading text-xl font-semibold text-[var(--color-ink)] mb-3">
                    {step.action}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--color-ink-muted)] leading-relaxed max-w-[30ch] mx-auto">
                    {step.outcome}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Clarification card */}
        <ScrollReveal variant="fade-up" delay={450} duration={500}>
          <div className="max-w-3xl mx-auto p-8 bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-lg text-[var(--color-ink)]">
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
