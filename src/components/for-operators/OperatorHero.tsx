'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PRIMARY_CTA_CLASSES = "inline-flex items-center justify-center bg-white text-[var(--color-primary)] hover:bg-white/90 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary)] transition-colors";
const SECONDARY_CTA_CLASSES = "inline-flex items-center justify-center bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-white transition-colors";

/**
 * For Operators Hero - Background image with overlay
 *
 * Image: Place at /public/images/hero/operators-hero.jpg
 * Stock search: "wildlife guide binoculars", "birdwatching tour guide", "nature tour group australia"
 */
export function OperatorHero(): JSX.Element {
  const [imageError, setImageError] = useState(false);
  const heroImage = '/images/hero/operators-hero.jpg';

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center py-16 sm:py-20 lg:py-[var(--space-4xl)] overflow-hidden">
      {/* Background - Image with fallback gradient */}
      <div className="absolute inset-0">
        {!imageError ? (
          <Image
            src={heroImage}
            alt="Wildlife tour guide in Australian bush"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : null}
        {/* Gradient overlay - always shown */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E]/95 via-[#1B4D3E]/85 to-[#1B4D3E]/70"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-[var(--space-lg)]">
        <div className="max-w-[900px]">
          <h1 className="font-display text-[clamp(1.875rem,5vw,4rem)] leading-[1.1] text-white mb-4 sm:mb-[var(--space-xl)]">
            <span className="block sm:inline">Stop Gambling on</span>{' '}
            <span className="block sm:inline">Tour Viability.</span>
            <span className="block text-[var(--color-accent)] mt-1 sm:mt-2">Start Guiding.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-[var(--text-xl)] mb-6 sm:mb-[var(--space-lg)] leading-relaxed max-w-[50ch] text-white [color:white_!important]">
            List your tour with a minimum quorum. We collect deposits, track progress, and only charge cards when you're ready to run. You commit to suppliers when birders commit to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-[var(--space-md)]">
            <Link href="/apply" className={PRIMARY_CTA_CLASSES}>
              Apply to List Tours
            </Link>
            <a href="#how-it-works" className={SECONDARY_CTA_CLASSES}>
              See How It Works
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
