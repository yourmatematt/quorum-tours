import { Button } from '../ui/Button';

export function OperatorHero() {
  return (
    <section className="
      relative
      min-h-[90vh]
      flex items-center
      pt-[var(--space-4xl)]
      pb-[var(--space-section)]
      overflow-hidden
    ">
      {/* Full-bleed background image */}
      <div className="
        absolute inset-0
        bg-gradient-to-br from-[#1a2b1f] to-[#2d4a34]
        z-0
      " aria-hidden="true">
        {/* Image overlay would go here - using gradient for now */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="
        relative z-10
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Left-aligned content block */}
        <div className="max-w-[640px]">
          {/* eBird integration badge */}
          <div className="mb-[var(--space-lg)]">
            <span className="
              inline-flex items-center gap-2
              px-3 py-1.5
              text-sm
              bg-white/10
              text-white
              rounded-[var(--radius-pill)]
              border border-white/20
            ">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1l2 4.5h4.5L10 9l1.5 4.5L8 11l-3.5 2.5L6 9 1.5 5.5H6z"/>
              </svg>
              eBird integration
            </span>
          </div>

          {/* Headline - Display serif */}
          <h1 className="
            font-display
            text-[clamp(2.5rem,8vw,5rem)]
            leading-[1.05]
            text-white
            mb-[var(--space-xl)]
            max-w-[16ch]
          ">
            Never Bet the Farm on a Tour Again.
          </h1>

          {/* Subhead */}
          <p className="
            text-[var(--text-xl)]
            text-white/90
            mb-[var(--space-md)]
            leading-relaxed
          ">
            Launch birding tours with zero upfront risk. Commit to suppliers when birders commit to you — not before.
          </p>

          {/* Proof stat */}
          <p className="
            text-[var(--text-lg)]
            text-white/70
            mb-[var(--space-2xl)]
          ">
            <span className="font-mono font-semibold text-white">200+</span> guides stopped losing sleep over minimum group sizes
          </p>

          {/* Phone number prominence */}
          <div className="
            mb-[var(--space-xl)]
            p-[var(--space-md)]
            bg-white/10
            border border-white/20
            rounded-[var(--radius-md)]
            inline-block
          ">
            <div className="flex items-center gap-[var(--space-sm)] text-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 3h4l2 5-3 2c1 3 4 6 7 7l2-3 5 2v4a2 2 0 01-2 2C7 20 0 13 0 3a2 2 0 012-2z"/>
              </svg>
              <a href="tel:+1234567890" className="
                font-mono text-xl font-medium
                hover:text-[var(--color-accent)]
                transition-colors
              ">
                (123) 456-7890
              </a>
            </div>
            <p className="text-sm text-white/70 mt-1 ml-7">
              Real humans, not chatbots
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-[var(--space-md)]">
            <Button
              variant="primary"
              className="!bg-white !text-[var(--color-ink)] hover:!bg-white/90"
            >
              Schedule Your Free Onboarding Call
            </Button>
            <Button
              variant="secondary"
              className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </div>

      {/* Image bleed element to encourage scroll */}
      <div className="
        absolute bottom-0 left-0 right-0
        h-[var(--space-4xl)]
        bg-gradient-to-b from-transparent to-[var(--color-surface)]
        pointer-events-none
        z-10
      " aria-hidden="true" />
    </section>
  );
}
