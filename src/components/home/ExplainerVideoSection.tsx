'use client';

import { ResponsiveVideo } from '../ui/ResponsiveVideo';
import { ScrollReveal } from '../ui/ScrollReveal';

/**
 * ExplainerVideoSection - "What is Quorum?" video
 *
 * Placed below the hero, provides a quick visual explanation
 * of the quorum concept for visitors who prefer video.
 */
export function ExplainerVideoSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[var(--color-surface)]">
      <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="
              font-display
              text-2xl sm:text-3xl
              text-[var(--color-ink)]
              mb-2
            ">
              See how it works
            </h2>
            <p className="
              text-[var(--color-ink-muted)]
              text-base
            ">
              35 seconds to understand the quorum concept
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100} duration={500}>
          <ResponsiveVideo
            slug="what-is-quorum"
            title="What is Quorum? (35 seconds)"
            className="shadow-lg"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
