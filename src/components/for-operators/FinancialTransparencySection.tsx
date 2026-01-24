export function FinancialTransparencySection() {
  const payoutMilestones = [
    {
      event: "Threshold Met",
      percentage: "20%",
      purpose: "For vendor deposits",
    },
    {
      event: "30 Days Before Tour",
      percentage: "30%",
      purpose: "For logistics",
    },
    {
      event: "Tour Completion",
      percentage: "50%",
      purpose: "Remaining balance",
    },
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "1 tour listing",
        "Test the platform",
        "Email support",
        "No credit card required",
      ],
      highlight: false,
    },
    {
      name: "Standard",
      price: "$49",
      period: "/month",
      fee: "2% booking fee",
      features: [
        "Unlimited tours",
        "Automated payments",
        "Phone support",
        "Analytics dashboard",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "$99",
      period: "/month",
      fee: "1.5% booking fee",
      features: [
        "Everything in Standard",
        "Priority support",
        "Gap negotiation tools",
        "Custom branding",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface-sunken)]
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
            Your Money, Your Timeline, Your Price
          </h2>
        </div>

        {/* Split layout: Timeline + Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-3xl)] items-start">
          {/* Payout Timeline */}
          <div>
            <h3 className="
              text-[var(--text-xl)]
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-xl)]
            ">
              Payout Timeline
            </h3>

            <div className="space-y-[var(--space-lg)] relative">
              {/* Vertical connector line */}
              <div className="
                absolute left-[1.125rem] top-[2rem] bottom-[2rem]
                w-[2px]
                bg-[var(--color-border)]
              " aria-hidden="true" />

              {payoutMilestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-[var(--space-lg)]">
                  {/* Milestone marker */}
                  <div className="
                    flex-shrink-0
                    w-10 h-10
                    flex items-center justify-center
                    bg-[var(--color-confirmed)]
                    text-white
                    font-mono font-semibold
                    text-sm
                    rounded-full
                    border-4 border-[var(--color-surface-sunken)]
                    relative z-10
                  ">
                    {milestone.percentage}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p className="
                      font-semibold
                      text-[var(--color-ink)]
                      mb-1
                    ">
                      {milestone.event}
                    </p>
                    <p className="
                      text-sm
                      text-[var(--color-ink-muted)]
                    ">
                      {milestone.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          <div>
            <h3 className="
              text-[var(--text-xl)]
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-xl)]
            ">
              Transparent Pricing
            </h3>

            <div className="space-y-[var(--space-md)]">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`
                    p-[var(--space-lg)]
                    bg-[var(--color-surface)]
                    border-2
                    rounded-[var(--radius-lg)]
                    ${tier.highlight
                      ? 'border-[var(--color-accent)] shadow-[0_0_0_4px_rgba(var(--color-accent-rgb),0.1)]'
                      : 'border-[var(--color-border)]'
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-[var(--space-md)]">
                    <div>
                      <h4 className="font-semibold text-[var(--color-ink)] mb-1">
                        {tier.name}
                      </h4>
                      {tier.fee && (
                        <p className="text-sm text-[var(--color-ink-muted)]">
                          + {tier.fee}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl font-bold text-[var(--color-ink)]">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-sm text-[var(--color-ink-muted)]">
                          {tier.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm text-[var(--color-ink-muted)]">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-[var(--color-confirmed)] flex-shrink-0 mt-0.5" aria-hidden="true">
                          <path d="M13.5 3.5L6 11 2.5 7.5l1-1L6 9l6.5-6.5z"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Comparison footnote */}
            <p className="mt-[var(--space-lg)] text-sm text-[var(--color-ink-muted)]">
              FareHarbor charges 6% + hidden fees. We charge 2% and show it upfront.
            </p>
          </div>
        </div>

        {/* Trust statement */}
        <div className="
          mt-[var(--space-3xl)]
          pt-[var(--space-2xl)]
          border-t border-[var(--color-border)]
          text-center
        ">
          <p className="text-[var(--text-lg)] text-[var(--color-ink)] max-w-[60ch] mx-auto">
            <strong>Your price is what birders pay.</strong> No surprise fees added at checkout.
          </p>
        </div>
      </div>
    </section>
  );
}
