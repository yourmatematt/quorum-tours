'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

const steps = [
  {
    number: 1,
    title: 'Tour Listed',
    description: 'Operator creates a tour with a minimum group size (quorum)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Birders Commit',
    description: 'You reserve your spot with a refundable deposit',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Quorum Reached',
    description: 'Minimum spots filled — tour is confirmed to run',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Tour Runs',
    description: 'Balance charged, everyone goes birding',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="7" cy="12" r="3.5" />
        <circle cx="17" cy="12" r="3.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3M7 8.5V6a1 1 0 011-1h8a1 1 0 011 1v2.5" />
      </svg>
    ),
  },
];

export function MechanicSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--space-lg)]">
        {/* Section label */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="text-center mb-[var(--space-sm)]">
            <span className="
              text-[var(--color-accent)]
              text-xs
              font-semibold
              uppercase
              tracking-[0.15em]
            ">
              The Core Mechanic
            </span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal variant="fade-up" delay={100} duration={500}>
          <h2 className="
            font-display
            text-[clamp(2rem,4vw,3rem)]
            leading-tight
            text-[var(--color-ink)]
            text-center
            mb-16
          ">
            Four steps. That&apos;s it.
          </h2>
        </ScrollReveal>

        {/* Horizontal step flow */}
        <ScrollReveal variant="fade-up" delay={200} duration={500}>
          <div className="relative mb-16">
            {/* Desktop: horizontal layout */}
            <div className="hidden lg:block">
              {/* Connecting line */}
              <div className="absolute top-[60px] left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-[var(--color-border)]" aria-hidden="true" />

              {/* Steps */}
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative">
                    {/* Icon circle */}
                    <div className="
                      w-[120px] h-[120px]
                      mx-auto mb-6
                      rounded-full
                      bg-white
                      border-2 border-[var(--color-border)]
                      flex items-center justify-center
                      text-[var(--color-primary)]
                      relative z-10
                      shadow-sm
                    ">
                      {step.icon}
                    </div>

                    {/* Step label */}
                    <div className="text-center mb-3">
                      <span className="
                        text-[var(--color-accent)]
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                      ">
                        Step {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="
                      font-display
                      text-xl
                      text-[var(--color-ink)]
                      text-center
                      mb-2
                      font-medium
                    ">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="
                      text-[var(--color-ink-muted)]
                      text-sm
                      text-center
                      leading-relaxed
                    ">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet: vertical layout */}
            <div className="lg:hidden space-y-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-6">
                  {/* Icon circle */}
                  <div className="flex-shrink-0">
                    <div className="
                      w-16 h-16
                      rounded-full
                      bg-white
                      border-2 border-[var(--color-border)]
                      flex items-center justify-center
                      text-[var(--color-primary)]
                      shadow-sm
                    ">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="mb-2">
                      <span className="
                        text-[var(--color-accent)]
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                      ">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="
                      font-display
                      text-lg
                      text-[var(--color-ink)]
                      mb-1
                      font-medium
                    ">
                      {step.title}
                    </h3>
                    <p className="
                      text-[var(--color-ink-muted)]
                      text-sm
                      leading-relaxed
                    ">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting line for mobile */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 mt-20 w-0.5 h-8 bg-[var(--color-border)]" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Refund guarantee box */}
        <ScrollReveal variant="fade-up" delay={300} duration={500}>
          <div className="
            max-w-3xl
            mx-auto
            p-6
            bg-[var(--color-accent)]/10
            border-l-4 border-[var(--color-accent)]
            rounded-r-lg
          ">
            <p className="text-[var(--color-ink)] leading-relaxed">
              <strong className="font-semibold">What if quorum isn&apos;t reached?</strong>{' '}
              You get a full refund. No questions, no fees, no awkward conversations.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
