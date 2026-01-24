import Link from 'next/link';

const PRIMARY_CTA_CLASSES = "inline-flex items-center justify-center bg-white text-[var(--color-primary)] hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary)] transition-colors";
const SECONDARY_CTA_CLASSES = "inline-flex items-center justify-center bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 px-8 py-4 text-lg font-semibold rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-white transition-colors";

export function OperatorHero(): JSX.Element {
  return (
    <section className="relative min-h-[85vh] flex items-center py-[var(--space-4xl)] bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-primary)] overflow-hidden">
      <div className="relative z-10 w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)]">
        <div className="max-w-[900px]">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] text-white mb-[var(--space-xl)]">
            <span className="whitespace-nowrap">Stop Gambling on Tour Viability.</span>
            <span className="block text-[var(--color-accent)]">Start Guiding.</span>
          </h1>

          <p className="text-[var(--text-xl)] text-white/90 mb-[var(--space-lg)] leading-relaxed max-w-[50ch]">
            List your tour with a minimum threshold. We collect deposits,<br />
            track progress, and only charge cards when you're ready to run.<br />
            You commit to suppliers when birders commit to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-[var(--space-md)]">
            <Link href="/operator/onboarding" className={PRIMARY_CTA_CLASSES}>
              List Your First Tour
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
