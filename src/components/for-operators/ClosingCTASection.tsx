import { Button } from '../ui/Button';

export function ClosingCTASection() {
  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-gradient-to-br from-[var(--color-accent)] to-[#2563eb]
      text-white
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
        text-center
      ">
        {/* Header */}
        <h2 className="
          font-display
          text-[clamp(2rem,6vw,3.5rem)]
          leading-tight
          text-white
          mb-[var(--space-md)]
        ">
          Start Your First Tour Risk-Free
        </h2>

        {/* Supporting copy */}
        <p className="
          text-[var(--text-lg)]
          text-white/90
          max-w-[60ch]
          mx-auto
          mb-[var(--space-2xl)]
          leading-relaxed
        ">
          Free tier: 1 tour listing, zero payment required. Test the platform. Talk to a human. See if it fits.
        </p>

        {/* CTAs */}
        <div className="
          flex flex-col sm:flex-row
          gap-[var(--space-md)]
          justify-center
          mb-[var(--space-2xl)]
        ">
          <Button
            variant="primary"
            className="
              !bg-white
              !text-[var(--color-accent)]
              hover:!bg-white/90
              !px-8 !py-4
              !text-lg
            "
          >
            Schedule Your Free Onboarding Call
          </Button>
          <Button
            variant="secondary"
            className="
              !bg-white/10
              !text-white
              !border-white/30
              hover:!bg-white/20
              !px-8 !py-4
              !text-lg
            "
          >
            Start Self-Service Setup
          </Button>
        </div>

        {/* Trust signals below CTAs */}
        <div className="
          flex flex-wrap
          items-center justify-center
          gap-x-[var(--space-xl)]
          gap-y-[var(--space-sm)]
          text-sm
          text-white/70
          mb-[var(--space-xl)]
        ">
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13 3L6 10 3 7l1-1 2 2 6-6z"/>
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13 3L6 10 3 7l1-1 2 2 6-6z"/>
            </svg>
            Cancel anytime — your data exports in one click
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13 3L6 10 3 7l1-1 2 2 6-6z"/>
            </svg>
            Month-to-month billing — no annual lock-in
          </span>
        </div>

        {/* Phone number repeated */}
        <div className="
          inline-flex items-center gap-3
          px-6 py-3
          bg-white/10
          border border-white/20
          rounded-[var(--radius-lg)]
        ">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 3h4l2 5-3 2c1 3 4 6 7 7l2-3 5 2v4a2 2 0 01-2 2C7 20 0 13 0 3a2 2 0 012-2z"/>
          </svg>
          <div className="text-left">
            <a href="tel:+1234567890" className="
              font-mono text-xl font-medium
              text-white
              hover:text-white/80
              transition-colors
            ">
              (123) 456-7890
            </a>
            <p className="text-xs text-white/70">
              Prefer to talk? We're here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
