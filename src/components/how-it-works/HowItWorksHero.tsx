import Link from 'next/link';

/**
 * HowItWorksHero - Audience disambiguation hero
 *
 * Two clear paths:
 * - For Birders: scrolls to content below
 * - For Operators: navigates to /for-operators
 */
export function HowItWorksHero() {
  return (
    <section className="
      relative
      min-h-[70vh]
      flex items-center
      py-[var(--space-4xl)]
      bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface-sunken)] to-[var(--color-surface)]
      overflow-hidden
    ">
      {/* Subtle organic background shapes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="
          absolute top-10 right-[10%]
          w-[400px] h-[400px]
          bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent
          rounded-[60%_40%_30%_70%/40%_70%_30%_60%]
          blur-3xl
        " />
        <div className="
          absolute bottom-10 left-[5%]
          w-[500px] h-[500px]
          bg-gradient-to-tl from-[var(--color-secondary)]/5 to-transparent
          rounded-[40%_60%_70%_30%/60%_30%_70%_40%]
          blur-3xl
        " />
      </div>

      <div className="
        relative z-10
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
        text-center
      ">
        {/* Headline */}
        <h1 className="
          font-display
          text-[clamp(2.5rem,6vw,4rem)]
          leading-[1.1]
          text-[var(--color-ink)]
          mb-[var(--space-lg)]
        ">
          Understand how Quorum works
        </h1>

        {/* Supporting text */}
        <p className="
          text-[var(--text-lg)]
          text-[var(--color-ink-muted)]
          leading-relaxed
          max-w-[55ch]
          mx-auto
          mb-[var(--space-2xl)]
        ">
          Tours run when enough people commit. No gambling on viability,
          no last-minute cancellations. Choose your path to learn more.
        </p>

        {/* Dual CTAs */}
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

        {/* Scroll hint */}
        <div className="
          mt-[var(--space-3xl)]
          text-[var(--color-ink-subtle)]
          text-sm
        ">
          <span>Or scroll to explore both perspectives</span>
        </div>
      </div>
    </section>
  );
}
