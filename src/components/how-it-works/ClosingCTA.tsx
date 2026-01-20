import Link from 'next/link';

export function ClosingCTA() {
  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        <div className="max-w-[var(--container-content)]">
          {/* Closing text */}
          <p className="
            text-[var(--color-ink)]
            text-[var(--text-lg)]
            leading-relaxed
            mb-[var(--space-2xl)]
          ">
            Now you know how it works. Tours form when enough birders commit. Until then,
            there's no risk and no obligation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-[var(--space-md)]">
            {/* Primary CTA */}
            <Link
              href="/tours"
              className="
                inline-flex items-center justify-center
                px-[var(--space-xl)] py-[var(--space-md)]
                bg-[var(--color-accent)]
                text-white
                text-[var(--text-base)]
                font-medium
                rounded-[var(--radius-md)]
                transition-colors duration-[var(--transition-fast)]
                hover:bg-[var(--color-accent-hover)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
              "
            >
              See what's forming
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/"
              className="
                inline-flex items-center justify-center
                px-[var(--space-xl)] py-[var(--space-md)]
                bg-transparent
                text-[var(--color-ink-muted)]
                text-[var(--text-base)]
                rounded-[var(--radius-md)]
                transition-colors duration-[var(--transition-fast)]
                hover:text-[var(--color-ink)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] focus:ring-offset-2
              "
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
