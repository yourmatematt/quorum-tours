'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function BenefitsSection() {
  return (
    <section className="py-20 bg-[var(--color-surface-sunken)]">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--space-lg)]">
        {/* Section headline */}
        <ScrollReveal variant="fade-up" duration={500}>
          <h2 className="
            font-display
            text-[clamp(2rem,4vw,3rem)]
            leading-tight
            text-[var(--color-ink)]
            text-center
            mb-16
          ">
            What&apos;s in it for you
          </h2>
        </ScrollReveal>

        {/* Two-column split */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Birders - Green tint */}
          <ScrollReveal variant="fade-up" delay={100} duration={500}>
            <div className="
              p-8
              bg-[var(--color-primary)]/5
              border border-[var(--color-primary)]/20
              rounded-[var(--radius-organic)]
            ">
              {/* Icon header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="
                  w-12 h-12
                  rounded-full
                  bg-[var(--color-primary)]
                  flex items-center justify-center
                  flex-shrink-0
                ">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="
                  font-display
                  text-2xl
                  text-[var(--color-ink)]
                  font-medium
                ">
                  For Birders
                </h3>
              </div>

              {/* Benefits list */}
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-ink-muted)] leading-relaxed">
                    Book with confidence — tours only run when confirmed
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-ink-muted)] leading-relaxed">
                    No last-minute cancellations ruining your plans
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-ink-muted)] leading-relaxed">
                    Full refund if quorum isn&apos;t reached
                  </span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/tours"
                className="
                  inline-flex items-center justify-center
                  w-full
                  px-6 py-3
                  bg-[var(--color-primary)]
                  hover:bg-[var(--color-primary-hover)]
                  text-white
                  font-semibold
                  rounded-[var(--radius-md)]
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                "
              >
                Browse Tours →
              </Link>
            </div>
          </ScrollReveal>

          {/* For Operators - Amber tint */}
          <ScrollReveal variant="fade-up" delay={200} duration={500}>
            <div className="
              p-8
              bg-[var(--color-accent)]/5
              border border-[var(--color-accent)]/20
              rounded-[var(--radius-organic)]
            ">
              {/* Icon header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="
                  w-12 h-12
                  rounded-full
                  bg-[var(--color-accent)]
                  flex items-center justify-center
                  flex-shrink-0
                ">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="
                  font-display
                  text-2xl
                  text-[var(--color-ink)]
                  font-medium
                ">
                  For Operators
                </h3>
              </div>

              {/* Benefits list */}
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-ink-muted)] leading-relaxed">
                    No more gambling on tour viability
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-ink-muted)] leading-relaxed">
                    Stop chasing payments — deposits collected automatically
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-ink-muted)] leading-relaxed">
                    Commit to suppliers when birders commit to you
                  </span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="/for-operators"
                className="
                  inline-flex items-center justify-center
                  w-full
                  px-6 py-3
                  bg-[var(--color-accent)]
                  hover:bg-[var(--color-accent-hover)]
                  text-white
                  font-semibold
                  rounded-[var(--radius-md)]
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
                "
              >
                Learn More →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
