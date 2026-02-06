'use client';

import { Button } from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ResponsiveVideo } from '../ui/ResponsiveVideo';

interface HeroSectionProps {
  heroImage?: string;
}

/**
 * Hero Section - Full-bleed imagery with gradient overlay
 *
 * Design System: HOME-REDESIGN-DECISIONS.md
 * - Typography: Crimson Pro (display) + Atkinson Hyperlegible (body)
 * - Background: Full-bleed nature photography with gradient overlay
 * - Accessibility: WCAG AAA contrast maintained via overlay
 *
 * Image: Place hero image at /public/images/hero/home-hero.jpg
 * Recommended: 1920x1080 or larger, Australian birding landscape
 * Stock search: "Australian wetland sunrise birds", "Kakadu landscape", "Australian bush golden hour"
 */
export function HeroSection({
  heroImage = '/images/hero/home-hero.webp'
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="
      relative
      min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh]
      flex items-center
      pt-20 sm:pt-24
      pb-16 sm:pb-20
      overflow-hidden
    ">
      {/* Background - Image with fallback to gradient */}
      <div className="absolute inset-0">
        {!imageError ? (
          <Image
            src={heroImage}
            alt="Australian birding landscape"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback gradient when image is missing */
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E] via-[#2E5A4A] to-[#1B4D3E]">
            {/* Decorative organic shapes - responsive sizing to prevent mobile overflow */}
            <div className="absolute top-10 right-4 w-48 h-48 sm:top-20 sm:right-10 sm:w-64 sm:h-64 md:right-20 md:w-96 md:h-96 bg-[#D4A84B]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-4 w-48 h-48 sm:bottom-20 sm:left-10 sm:w-72 sm:h-72 md:left-20 md:w-[500px] md:h-[500px] bg-[#87CEEB]/10 rounded-full blur-3xl" />
          </div>
        )}
        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1B4D3E]/90 via-[#1B4D3E]/70 to-[#1B4D3E]/40"
          aria-hidden="true"
        />
        {/* Additional bottom gradient for depth */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E]/60 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="
        relative z-10
        w-full max-w-[var(--container-max)]
        mx-auto px-4 sm:px-6 lg:px-8
      ">
        {/* Two-column layout: Text (SEO first) + Video */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content - First in DOM for SEO, visually on right on desktop */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Headline - Crimson Pro display serif */}
            <h1 className="
              font-display
              text-3xl sm:text-5xl lg:text-6xl
              font-semibold
              text-white
              mb-4 sm:mb-6
              leading-tight
              drop-shadow-lg
            ">
              Tours that run when birders commit.
            </h1>

            {/* Subhead - Atkinson Hyperlegible (accessibility-focused) */}
            <p className="
              text-base sm:text-lg lg:text-xl
              text-white/90
              mb-6 sm:mb-8
              max-w-2xl lg:max-w-none
              mx-auto lg:mx-0
              leading-relaxed
              drop-shadow-md
            ">
              Quorum aggregates demand before operators schedule. You commit conditionally—if quorum is reached, the tour runs. If not, you owe nothing.
            </p>

            {/* Primary CTA - Gold accent for maximum visibility */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
              <Link href="/tours">
                <Button
                  variant="primary"
                  className="
                    !bg-[#D4A84B]
                    !text-[#1B4D3E]
                    hover:!bg-[#E5B95C]
                    !rounded-[var(--radius-organic)]
                    !px-6 !py-3 sm:!px-8 sm:!py-4
                    !text-base sm:!text-lg
                    !font-semibold
                    !shadow-lg
                    transition-all duration-200
                    w-full sm:w-auto
                  "
                >
                  Browse Available Tours
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="secondary"
                  className="
                    !bg-white/10
                    !text-white
                    !border-2 !border-white/50
                    hover:!bg-white/20
                    hover:!border-white
                    !rounded-[var(--radius-organic)]
                    !px-6 !py-3 sm:!px-8 sm:!py-4
                    !text-base sm:!text-lg
                    !font-medium
                    !backdrop-blur-sm
                    transition-all duration-200
                    w-full sm:w-auto
                  "
                >
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Explainer Video - What is Quorum? */}
          <div className="order-2 lg:order-1">
            <ResponsiveVideo
              slug="what-is-quorum"
              title="What is Quorum? (35 seconds)"
              className="shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
