'use client';

import { useMemo } from 'react';

interface ProcessStep {
  number: number;
  action: string;
  outcome: string;
  icon: React.ReactNode;
}

/**
 * How It Works Section - Organic Biophilic Design
 *
 * Design System: HOME-REDESIGN-DECISIONS.md
 * - 3-step threshold mechanic with flowing layout
 * - Organic rounded corners (20px) and natural shadows
 * - Forest green accent numbers
 */
export function HowItWorksSection() {
  const steps: ProcessStep[] = useMemo(() => [
    {
      number: 1,
      action: 'Express interest',
      outcome: 'Your signal joins the aggregate. No charge, no obligation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      number: 2,
      action: 'Commit conditionally',
      outcome: 'You agree to join if the threshold is met. Still no charge.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: 3,
      action: 'Tour confirms',
      outcome: 'Threshold met. The tour runs. Everyone goes.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ], []);

  return (
    <section className="
      py-20
      bg-white
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        {/* Section header - center aligned */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="
            font-display
            text-[clamp(1.75rem,4vw,2.5rem)]
            leading-tight
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            How confirmation works.
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-lg
            leading-relaxed
          ">
            Three stages. Zero risk until the tour is guaranteed to run.
          </p>
        </div>

        {/* Process steps - flowing horizontal layout */}
        <div className="
          grid grid-cols-1 md:grid-cols-3
          gap-8
          relative
          mb-16
        ">
          {/* Flowing connector line - organic curve on desktop */}
          <div className="
            hidden md:block
            absolute top-20 left-[16.67%] right-[16.67%]
            h-1
            bg-gradient-to-r from-[var(--color-secondary)]/20 via-[var(--color-primary)]/20 to-[var(--color-confirmed)]/40
            rounded-full
          " aria-hidden="true" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step container - organic rounded corners */}
              <div className="
                bg-white
                border-2 border-[var(--color-border)]
                rounded-[var(--radius-organic)]
                p-8
                shadow-[var(--shadow-card)]
                hover:shadow-[var(--shadow-card-hover)]
                hover:border-[var(--color-primary)]
                transition-all duration-200
                relative
              ">
                {/* Step number - forest green circle */}
                <div className="
                  absolute -top-6 left-8
                  w-12 h-12
                  bg-[var(--color-primary)]
                  text-white
                  font-heading font-semibold
                  rounded-full
                  flex items-center justify-center
                  text-xl
                  shadow-[var(--shadow-card)]
                  z-10
                ">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="
                  mt-6 mb-4
                  text-[var(--color-secondary)]
                ">
                  {step.icon}
                </div>

                {/* Action headline - Crimson Pro */}
                <h3 className="
                  font-heading
                  text-2xl
                  font-semibold
                  text-[var(--color-ink)]
                  mb-3
                ">
                  {step.action}
                </h3>

                {/* Outcome - Atkinson Hyperlegible */}
                <p className="
                  text-[var(--color-ink-muted)]
                  text-base
                  leading-relaxed
                ">
                  {step.outcome}
                </p>
              </div>

              {/* Arrow connector on mobile */}
              {index < steps.length - 1 && (
                <div className="
                  md:hidden
                  flex justify-center
                  py-4
                  text-[var(--color-primary)]
                " aria-hidden="true">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Clarification card - organic styling */}
        <div className="
          max-w-3xl mx-auto
          p-8
          bg-[var(--color-surface)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          shadow-[var(--shadow-card)]
        ">
          <div className="flex items-start gap-4">
            <div className="
              flex-shrink-0
              w-12 h-12
              bg-[var(--color-primary)]/10
              rounded-full
              flex items-center justify-center
            ">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-lg text-[var(--color-ink)]">
                <strong className="font-semibold">If the threshold is not met?</strong>
                {' '}The tour does not run. Your conditional commitment expires. You are not charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
