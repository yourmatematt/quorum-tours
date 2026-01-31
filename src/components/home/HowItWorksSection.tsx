'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ProcessStep {
  number: number;
  action: string;
  outcome: string;
  image: string;
}

/**
 * How It Works Section - Visual Steps with Screenshots
 *
 * Updated to use actual product screenshots instead of icons
 * Steps: Browse → Commit → Tour Confirms → (User provides step 4)
 */
export function HowItWorksSection() {
  const steps: ProcessStep[] = [
    {
      number: 1,
      action: 'Find your tour',
      outcome: 'Browse tours by region, species, or date. See quorum progress at a glance.',
      image: '/images/how-it-works/step1-browse.png',
    },
    {
      number: 2,
      action: 'Commit conditionally',
      outcome: 'Pay a small deposit to signal commitment. Fully refunded if quorum isn\'t reached.',
      image: '/images/how-it-works/step3-commit.png',
    },
    {
      number: 3,
      action: 'Tour confirms',
      outcome: 'Once quorum is reached, the tour is guaranteed. Pay the balance and you\'re set.',
      image: '/images/how-it-works/step4-confirmed.png',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
              How confirmation works.
            </h2>
            <p className="text-[var(--color-ink-muted)] text-lg leading-relaxed">
              Three steps. Zero risk until the tour is guaranteed to run.
            </p>
          </div>
        </ScrollReveal>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              variant="fade-up"
              delay={index * 150}
              duration={500}
            >
              <div className="relative">
                {/* Step card */}
                <div className="bg-white border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-primary)] transition-all duration-200">
                  {/* Step number badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-[var(--color-primary)] text-white font-heading font-semibold rounded-full flex items-center justify-center text-lg shadow-[var(--shadow-card)] z-10">
                    {step.number}
                  </div>

                  {/* Screenshot image */}
                  <div className="relative w-full aspect-[4/3] bg-[var(--color-surface-sunken)]">
                    <Image
                      src={step.image}
                      alt={step.action}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Text content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-[var(--color-ink)] mb-2">
                      {step.action}
                    </h3>
                    <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                      {step.outcome}
                    </p>
                  </div>
                </div>

                {/* Arrow connector on mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-4 text-[var(--color-primary)]" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
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
