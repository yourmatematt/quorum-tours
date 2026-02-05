'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ClosingCTA() {
  return (
    <section className="py-20 bg-[#065F46]">
      <div className="
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
        text-center
      ">
        {/* Headline */}
        <ScrollReveal variant="fade-up" duration={500}>
          <h2 className="
            font-display
            text-[clamp(2rem,4vw,3rem)]
            leading-tight
            text-white
            mb-[var(--space-md)]
          ">
            Ready to get started?
          </h2>
        </ScrollReveal>

        {/* Subhead */}
        <ScrollReveal variant="fade-up" delay={100} duration={500}>
          <p className="
            text-white/90
            text-[var(--text-lg)]
            leading-relaxed
            max-w-[55ch]
            mx-auto
            mb-[var(--space-2xl)]
          ">
            Join the birders and operators already using Quorum.
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal variant="fade-up" delay={200} duration={500}>
          <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
            {/* Primary CTA - Gold */}
            <Link
              href="/tours"
              className="
                inline-flex items-center justify-center
                px-8 py-4
                text-lg font-semibold
                text-[#065F46]
                bg-[var(--color-accent)]
                hover:bg-[var(--color-accent-hover)]
                rounded-[var(--radius-md)]
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#065F46]
                min-h-[56px]
              "
            >
              Browse Available Tours
            </Link>

            {/* Secondary CTA - Outlined white */}
            <Link
              href="/for-operators"
              className="
                inline-flex items-center justify-center
                px-8 py-4
                text-lg font-semibold
                text-white
                bg-transparent
                border-2 border-white
                hover:bg-white/10
                rounded-[var(--radius-md)]
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#065F46]
                min-h-[56px]
              "
            >
              List Your Tours
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
