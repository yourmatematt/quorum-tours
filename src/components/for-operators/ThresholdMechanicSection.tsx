export function ThresholdMechanicSection() {
  const steps = [
    {
      number: "1",
      title: "Set Your Minimum",
      description: "Post your tour. Set minimum birders needed (e.g., 6 for pelagic boat charter).",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="4" y="6" width="24" height="20" rx="2"/>
          <path d="M4 12h24M10 4v4M22 4v4"/>
          <circle cx="16" cy="18" r="3"/>
        </svg>
      ),
    },
    {
      number: "2",
      title: "Collect Commitments",
      description: "Birders commit deposits — held in FDIC-insured escrow until threshold is met.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="6" y="10" width="20" height="16" rx="2"/>
          <path d="M16 10V6M12 6h8M22 18h3M7 18h3"/>
          <circle cx="16" cy="18" r="2"/>
        </svg>
      ),
    },
    {
      number: "3",
      title: "Tour Confirms or Refunds",
      description: "Reach 6 birders? Tour confirms, funds release. Don't reach 6? Everyone gets 100% refund, zero reputation damage.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 16l8 8 16-16"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <div className="text-center mb-[var(--space-3xl)]">
          <h2 className="
            font-display
            text-[var(--text-3xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            How Quorum Protects Your Business
          </h2>
          <p className="
            text-[var(--text-lg)]
            text-[var(--color-ink-muted)]
            max-w-[60ch]
            mx-auto
          ">
            The threshold mechanic means every tour that launches is a tour that runs
          </p>
        </div>

        {/* 3-step process - horizontal layout on desktop */}
        <div className="mb-[var(--space-3xl)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-2xl)] relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector arrow (desktop only, not on last item) */}
                {index < steps.length - 1 && (
                  <div className="
                    hidden md:block
                    absolute top-16 -right-[var(--space-xl)]
                    text-[var(--color-border)]
                    z-0
                  " aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 16h24M22 10l6 6-6 6"/>
                    </svg>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="
                    inline-flex items-center justify-center
                    w-20 h-20
                    mb-[var(--space-md)]
                    bg-[var(--color-accent)]/10
                    text-[var(--color-accent)]
                    rounded-[var(--radius-lg)]
                  ">
                    {step.icon}
                  </div>

                  {/* Step number */}
                  <div className="
                    font-display
                    text-[4rem]
                    leading-none
                    text-[var(--color-border)]
                    absolute top-0 right-0
                  " aria-hidden="true">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="
                    text-[var(--text-xl)]
                    font-semibold
                    text-[var(--color-ink)]
                    mb-[var(--space-sm)]
                  ">
                    {step.title}
                  </h3>
                  <p className="
                    text-[var(--text-base)]
                    text-[var(--color-ink-muted)]
                    leading-relaxed
                  ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar visualization */}
        <div className="
          max-w-2xl mx-auto
          p-[var(--space-xl)]
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
        ">
          <p className="
            text-sm
            text-[var(--color-ink-subtle)]
            mb-[var(--space-md)]
            text-center
          ">
            Example: Pelagic charter needs 6 birders
          </p>

          {/* Progress states */}
          <div className="space-y-[var(--space-lg)]">
            {/* State 1: 4/6 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--color-ink-muted)]">4 of 6 committed</span>
                <span className="font-mono text-[var(--color-forming)]">FORMING</span>
              </div>
              <div className="h-3 bg-[var(--color-surface-sunken)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-forming)] rounded-full" style={{ width: '66.67%' }} />
              </div>
            </div>

            {/* State 2: 6/6 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--color-ink)]">6 of 6 committed</span>
                <span className="font-mono font-semibold text-[var(--color-confirmed)]">CONFIRMED</span>
              </div>
              <div className="h-3 bg-[var(--color-surface-sunken)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-confirmed)] rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Trust proof + Gap negotiation */}
        <div className="mt-[var(--space-2xl)] text-center space-y-[var(--space-md)]">
          <p className="text-sm text-[var(--color-ink-muted)]">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface-raised)] rounded-[var(--radius-pill)] border border-[var(--color-border)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[var(--color-confirmed)]" aria-hidden="true">
                <path d="M8 0l1.5 3h3.5l-2.5 2.5 1 3.5-3-2-3 2 1-3.5L1 3.5h3.5z"/>
              </svg>
              FDIC-insured escrow via Trust My Travel
            </span>
          </p>
          <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] max-w-[70ch] mx-auto">
            <strong className="text-[var(--color-ink)]">Tour at 5/6?</strong> Operators can absorb shortfall OR poll birders to split the difference — saving revenue.
          </p>
        </div>
      </div>
    </section>
  );
}
