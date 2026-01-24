import { Button } from '../ui/Button';
import Link from 'next/link';

interface HeroSectionProps {
  toursConfirmedCount?: number;
}

/**
 * Hero Section - Organic Biophilic Design
 *
 * Design System: HOME-REDESIGN-DECISIONS.md
 * - Typography: Crimson Pro (display) + Atkinson Hyperlegible (body)
 * - Colors: Forest Green (#2E8B57), Sky Blue (#87CEEB), Gold (#FFD700)
 * - Style: Organic rounded corners (16-24px), natural shadows
 * - Accessibility: WCAG AAA (12.7:1 text contrast)
 */
export function HeroSection({ toursConfirmedCount = 47 }: HeroSectionProps) {
  return (
    <section className="
      relative
      min-h-[90vh]
      flex items-center
      pt-24
      pb-20
      overflow-hidden
      bg-gradient-to-br from-[#F0FFF4] via-[#E6F9EA] to-[#F0FFF4]
    ">
      {/* Organic background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft organic shapes - nature-inspired */}
        <div className="
          absolute top-20 right-20
          w-96 h-96
          bg-gradient-to-br from-[#87CEEB]/10 to-transparent
          rounded-[40%_60%_70%_30%/60%_30%_70%_40%]
          blur-3xl
        " />
        <div className="
          absolute bottom-20 left-20
          w-[500px] h-[500px]
          bg-gradient-to-tl from-[#2E8B57]/10 to-transparent
          rounded-[60%_40%_30%_70%/40%_70%_30%_60%]
          blur-3xl
        " />
      </div>

      <div className="
        relative z-10
        w-full max-w-[var(--container-max)]
        mx-auto px-6 lg:px-8
      ">
        {/* Centered content layout */}
        <div className="max-w-4xl mx-auto text-center">
          {/* eBird integration badge */}
          <div className="mb-6">
            <span className="
              inline-flex items-center gap-2
              px-4 py-2
              text-sm font-medium
              bg-white
              text-[var(--color-primary)]
              rounded-[var(--radius-organic)]
              shadow-[var(--shadow-card)]
              border border-[var(--color-border)]
            ">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.18-.77-6-4.93-6-9V8.3l6-3.11 6 3.11V11c0 4.07-2.82 8.23-6 9z"/>
              </svg>
              Verified eBird Integration
            </span>
          </div>

          {/* Headline - Crimson Pro display serif */}
          <h1 className="
            font-display
            text-5xl sm:text-6xl lg:text-7xl
            font-semibold
            text-[var(--color-ink)]
            mb-6
            leading-tight
          ">
            Tours that run when birders commit.
          </h1>

          {/* Subhead - Atkinson Hyperlegible (accessibility-focused) */}
          <p className="
            text-lg sm:text-xl
            text-[var(--color-ink-muted)]
            mb-8
            max-w-2xl mx-auto
            leading-relaxed
          ">
            Quorum aggregates demand before operators schedule. You commit conditionally—if the threshold is met, the tour runs. If not, you owe nothing.
          </p>

          {/* Primary CTA - Gold accent for maximum visibility */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/tours">
              <Button
                variant="primary"
                className="
                  !bg-[var(--color-accent)]
                  !text-[var(--color-ink)]
                  hover:!bg-[var(--color-accent-hover)]
                  !rounded-[var(--radius-organic)]
                  !px-8 !py-4
                  !text-lg
                  !font-medium
                  !shadow-[var(--shadow-card-hover)]
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
                  !bg-transparent
                  !text-[var(--color-primary)]
                  !border-2 !border-[var(--color-primary)]
                  hover:!bg-[var(--color-primary)]/5
                  !rounded-[var(--radius-organic)]
                  !px-8 !py-4
                  !text-lg
                  !font-medium
                  transition-all duration-200
                "
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust indicator - Tours confirmed */}
          <div className="
            inline-flex items-center gap-3
            px-6 py-3
            bg-white
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
            border border-[var(--color-border)]
          ">
            <div className="
              flex items-center justify-center
              w-10 h-10
              bg-[var(--color-confirmed-bg)]
              rounded-full
            ">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm text-[var(--color-ink-muted)]">This season</div>
              <div className="text-lg font-semibold text-[var(--color-ink)]">
                <span className="font-mono">{toursConfirmedCount}</span> tours confirmed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Natural scroll indicator */}
      <div className="
        absolute bottom-8 left-1/2 -translate-x-1/2
        flex flex-col items-center gap-2
        text-[var(--color-ink-muted)]
        animate-bounce
      " aria-hidden="true">
        <span className="text-sm">Scroll to explore</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
