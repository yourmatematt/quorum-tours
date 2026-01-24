export function PlatformLegitimacySection() {
  const partnerships = [
    {
      name: "eBird (Cornell Lab of Ornithology)",
      description: "Integrated trip planning and species reporting",
      logo: "🦅", // Placeholder - would be real logo
    },
    {
      name: "BirdLife International",
      description: "1% of booking fees support bird conservation",
      logo: "🌍",
    },
    {
      name: "American Birding Association",
      description: "Aligned with ABA ethical guiding standards",
      logo: "🔭",
    },
    {
      name: "ATTA",
      description: "Adventure Travel Trade Association - Verified operator protection standards",
      logo: "🌐",
    },
    {
      name: "Trust My Travel",
      description: "UK-based tour escrow partner with 15+ years protecting travelers and operators",
      logo: "🔒",
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
            Built for Birders, Backed by the Community
          </h2>
        </div>

        {/* Birding Expertise Signals */}
        <div className="
          mb-[var(--space-3xl)]
          p-[var(--space-xl)]
          bg-[var(--color-surface)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          text-center
        ">
          <p className="
            text-[var(--text-lg)]
            text-[var(--color-ink)]
            max-w-[70ch]
            mx-auto
            mb-[var(--space-md)]
          ">
            <strong>We speak birding:</strong> Endemics, target species, pelagic charters, trip reports, eBird integration
          </p>
          <p className="
            text-[var(--text-base)]
            text-[var(--color-ink-muted)]
            max-w-[60ch]
            mx-auto
          ">
            We're not generic travel software — we're built for the specific mechanics of birding tours
          </p>
        </div>

        {/* Partnership Logos - Asymmetric layout */}
        <div className="mb-[var(--space-3xl)]">
          <div className="
            grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]
          ">
            {partnerships.map((partner, index) => (
              <div
                key={index}
                className={`
                  p-[var(--space-lg)]
                  bg-[var(--color-surface)]
                  border border-[var(--color-border)]
                  rounded-[var(--radius-lg)]
                  ${index === 0 ? 'md:col-span-2' : ''}
                  ${index === 3 ? 'md:col-span-2' : ''}
                `}
              >
                {/* Logo placeholder */}
                <div className="
                  text-4xl
                  mb-[var(--space-md)]
                " aria-hidden="true">
                  {partner.logo}
                </div>

                {/* Partner name */}
                <h3 className="
                  font-semibold
                  text-[var(--color-ink)]
                  mb-[var(--space-xs)]
                ">
                  {partner.name}
                </h3>

                {/* Description - context for the partnership */}
                <p className="
                  text-sm
                  text-[var(--color-ink-muted)]
                  leading-relaxed
                ">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Ownership Guarantee */}
        <div className="
          max-w-2xl mx-auto
          p-[var(--space-xl)]
          bg-[var(--color-surface)]
          border-2 border-[var(--color-accent)]
          rounded-[var(--radius-lg)]
        ">
          <div className="flex items-start gap-[var(--space-md)]">
            {/* Shield icon */}
            <div className="
              flex-shrink-0
              w-12 h-12
              flex items-center justify-center
              bg-[var(--color-accent)]/10
              text-[var(--color-accent)]
              rounded-[var(--radius-md)]
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2L4 6v6c0 5 4 8 8 10 4-2 8-5 8-10V6z"/>
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="
                font-semibold
                text-[var(--color-ink)]
                mb-[var(--space-sm)]
              ">
                Your Data, Your Control
              </h3>
              <p className="
                text-[var(--text-base)]
                text-[var(--color-ink-muted)]
                leading-relaxed
              ">
                Your customers remain your customers. Your data stays your data. Export anytime, cancel anytime, zero lock-in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
