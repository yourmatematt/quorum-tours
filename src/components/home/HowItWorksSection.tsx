'use client';

import { useMemo } from 'react';

interface ProcessStep {
  number: number;
  action: string;
  outcome: string;
}

export function HowItWorksSection() {
  const steps: ProcessStep[] = useMemo(() => [
    {
      number: 1,
      action: 'Express interest',
      outcome: 'Your signal joins the aggregate. No charge, no obligation.',
    },
    {
      number: 2,
      action: 'Commit conditionally',
      outcome: 'You agree to join if the threshold is met. Still no charge.',
    },
    {
      number: 3,
      action: 'Tour confirms',
      outcome: 'Threshold met. The tour runs. Everyone goes.',
    },
  ], []);
  return (
    <section className="
      py-[var(--space-section-normal)]
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header - left aligned */}
        <div className="mb-[var(--space-3xl)] max-w-[var(--container-content)]">
          <h2 className="
            font-display
            text-[var(--text-2xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            How confirmation works.
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
          ">
            Three stages. Zero risk until the tour is guaranteed to run.
          </p>
        </div>

        {/* Process steps - horizontal flow with connectors */}
        <div className="
          grid grid-cols-1 md:grid-cols-3
          gap-[var(--space-xl)]
          relative
        ">
          {/* Connector line - visible on desktop */}
          <div className="
            hidden md:block
            absolute top-12 left-[16.67%] right-[16.67%]
            h-0.5 bg-[var(--color-border)]
          " aria-hidden="true" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step container */}
              <div className="
                bg-[var(--color-surface-raised)]
                border border-[var(--color-border)]
                rounded-[var(--radius-lg)]
                p-[var(--space-xl)]
                relative
              ">
                {/* Step number - design element */}
                <div className="
                  absolute -top-4 left-[var(--space-xl)]
                  w-8 h-8
                  bg-[var(--color-accent)]
                  text-white
                  font-mono font-medium
                  rounded-full
                  flex items-center justify-center
                  text-sm
                ">
                  {step.number}
                </div>

                {/* Action headline */}
                <h3 className="
                  font-display
                  text-[var(--text-lg)]
                  text-[var(--color-ink)]
                  mt-[var(--space-md)]
                  mb-[var(--space-sm)]
                ">
                  {step.action}
                </h3>

                {/* Outcome - what happens */}
                <p className="
                  text-[var(--color-ink-muted)]
                  text-[var(--text-sm)]
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
                  py-[var(--space-md)]
                  text-[var(--color-ink-subtle)]
                " aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
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

        {/* Clarification - what if threshold not met */}
        <div className="
          mt-[var(--space-3xl)]
          p-[var(--space-lg)]
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
          max-w-[var(--container-content)]
        ">
          <p className="text-[var(--color-ink-muted)] text-[var(--text-sm)]">
            <strong className="text-[var(--color-ink)]">If the threshold is not met?</strong>
            {' '}The tour does not run. Your conditional commitment expires. You are not charged.
          </p>
        </div>
      </div>
    </section>
  );
}
