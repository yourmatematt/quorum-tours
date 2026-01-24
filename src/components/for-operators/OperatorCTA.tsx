import Link from 'next/link';

const PRIMARY_CTA_CLASSES = "inline-flex items-center justify-center bg-white text-[var(--color-primary)] hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary)] transition-colors";
const SECONDARY_CTA_CLASSES = "inline-flex items-center justify-center bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/60 px-8 py-4 text-lg font-semibold rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-white transition-colors";

function PhoneIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 3h4l2 5-3 2c1 3 4 6 7 7l2-3 5 2v4a2 2 0 01-2 2C7 20 0 13 0 3a2 2 0 012-2z" />
    </svg>
  );
}

export function OperatorCTA(): JSX.Element {
  return (
    <section className="py-[var(--space-section-loose)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-ink)] text-white">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-tight text-white mb-[var(--space-md)]">
          Ready to List Your First Tour?
        </h2>

        <p className="text-[var(--text-lg)] text-white/90 max-w-[50ch] mx-auto mb-[var(--space-2xl)]">
          Join operators who stopped gambling on tour viability and started doing what they love.
        </p>

        <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center mb-[var(--space-xl)]">
          <Link href="/operator/onboarding" className={PRIMARY_CTA_CLASSES}>
            List Your First Tour
          </Link>
          <a href="mailto:hello@quorumtours.com" className={SECONDARY_CTA_CLASSES}>
            Have Questions? Email Us
          </a>
        </div>

        <p className="text-sm text-white/70 mb-[var(--space-xl)]">
          No credit card required. No commitment. Just tell us about your tours.
        </p>

        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-[var(--radius-lg)]">
          <PhoneIcon />
          <div className="text-left">
            <a
              href="tel:+1234567890"
              aria-label="Call Quorum Tours support at 1-234-567-890"
              className="font-mono text-xl font-medium text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary)] rounded transition-colors"
            >
              (123) 456-7890
            </a>
            <p className="text-xs text-white/70">Prefer to talk? We're here.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
