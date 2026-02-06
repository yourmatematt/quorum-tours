'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

/**
 * HowItWorksHero - Audience disambiguation hero
 *
 * Two clear paths:
 * - For Birders: scrolls to content below
 * - For Operators: navigates to /for-operators
 *
 * Image: Place at /public/images/hero/how-it-works-hero.jpg
 * Stock search: "small group nature tour", "birdwatchers australia", "wildlife viewing group"
 */
export function HowItWorksHero() {
  const [imageError, setImageError] = useState(false);
  const heroImage = '/images/hero/how-it-works-hero.jpg';

  return (
    <section className="
      relative
      min-h-[calc(100vh-4rem)]
      flex items-center
      py-[var(--space-4xl)]
      overflow-hidden
    ">
      {/* Background - Image with light overlay for readability */}
      <div className="absolute inset-0">
        {!imageError ? (
          <Image
            src={heroImage}
            alt="Birders on a guided tour"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : null}
        {/* Light overlay for text readability - keeps page feeling bright */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/95"
          aria-hidden="true"
        />
      </div>

      <div className="
        relative z-10
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
        text-center
      ">
        {/* Headline */}
        <ScrollReveal variant="fade-up" duration={600}>
          <h1 className="
            font-display
            text-[clamp(2.5rem,6vw,4rem)]
            leading-[1.1]
            text-[var(--color-ink)]
            mb-[var(--space-lg)]
          ">
            Understand how Quorum works
          </h1>
        </ScrollReveal>

        {/* Supporting text */}
        <ScrollReveal variant="fade-up" delay={100} duration={600}>
          <p className="
            text-[var(--text-lg)]
            text-[var(--color-ink-muted)]
            leading-relaxed
            max-w-[55ch]
            mx-auto
            mb-[var(--space-2xl)]
          ">
            Tours run when enough people commit. No gambling on viability, no last-minute cancellations.
          </p>
        </ScrollReveal>

        {/* Dual CTAs */}
        <ScrollReveal variant="fade-up" delay={200} duration={600}>
          <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
            <a
              href="#birders"
              className="
                inline-flex items-center justify-center
                px-8 py-4
                text-lg font-semibold
                text-white
                bg-[var(--color-primary)]
                hover:bg-[var(--color-primary-hover)]
                rounded-[var(--radius-md)]
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                min-h-[56px]
              "
            >
              I'm a Birder
            </a>
            <Link
              href="/for-operators"
              className="
                inline-flex items-center justify-center
                px-8 py-4
                text-lg font-semibold
                text-[var(--color-primary)]
                bg-transparent
                border-2 border-[var(--color-primary)]
                hover:bg-[var(--color-primary)]/5
                rounded-[var(--radius-md)]
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                min-h-[56px]
              "
            >
              I'm an Operator
            </Link>
          </div>
        </ScrollReveal>

        {/* Scroll hint */}
        <ScrollReveal variant="fade" delay={400} duration={800}>
          <div className="
            mt-[var(--space-3xl)]
            text-[var(--color-ink-subtle)]
            text-sm
          ">
            <span>Or scroll to see how it works for everyone</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
