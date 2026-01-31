'use client';

import { Button } from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

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
      min-h-[90vh]
      flex items-center
      pt-24
      pb-20
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
        mx-auto px-6 lg:px-8
      ">
        {/* Centered content layout */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline - Crimson Pro display serif */}
          <h1 className="
            font-display
            text-5xl sm:text-6xl lg:text-7xl
            font-semibold
            text-white
            mb-6
            leading-tight
            drop-shadow-lg
          ">
            Tours that run when birders commit.
          </h1>

          {/* Subhead - Atkinson Hyperlegible (accessibility-focused) */}
          <p className="
            text-lg sm:text-xl
            text-white/90
            mb-8
            max-w-2xl mx-auto
            leading-relaxed
            drop-shadow-md
          ">
            Quorum aggregates demand before operators schedule. You commit conditionally—if quorum is reached, the tour runs. If not, you owe nothing.
          </p>

          {/* Primary CTA - Gold accent for maximum visibility */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/tours">
              <Button
                variant="primary"
                className="
                  !bg-[#D4A84B]
                  !text-[#1B4D3E]
                  hover:!bg-[#E5B95C]
                  !rounded-[var(--radius-organic)]
                  !px-8 !py-4
                  !text-lg
                  !font-semibold
                  !shadow-lg
                  transition-all duration-200
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
                  !px-8 !py-4
                  !text-lg
                  !font-medium
                  !backdrop-blur-sm
                  transition-all duration-200
                "
              >
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
