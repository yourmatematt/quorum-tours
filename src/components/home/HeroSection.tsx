import { Button } from '../ui/Button';

interface HeroSectionProps {
  toursConfirmedCount?: number;
}

export function HeroSection({ toursConfirmedCount = 47 }: HeroSectionProps) {
  return (
    <section className="
      relative
      min-h-[85vh]
      flex items-center
      pt-[var(--space-4xl)]
      pb-[var(--space-section-loose)]
      overflow-visible
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Asymmetric 2/3 + 1/3 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--space-3xl)] items-center">
          {/* Content - 2/3 */}
          <div className="lg:col-span-2">
            {/* Proof badge - above headline */}
            <div className="mb-[var(--space-lg)]">
              <span className="
                inline-flex items-center gap-2
                px-3 py-1.5
                text-sm
                bg-[var(--color-confirmed-bg)]
                text-[var(--color-confirmed)]
                rounded-[var(--radius-pill)]
              ">
                <span className="font-mono font-medium">{toursConfirmedCount}</span>
                tours confirmed this season
              </span>
            </div>

            {/* Headline - Display serif, aggressive scale */}
            <h1 className="
              font-display
              text-[var(--text-hero)]
              text-[var(--color-ink)]
              mb-[var(--space-xl)]
              max-w-[20ch]
            ">
              Tours that run when birders commit.
            </h1>

            {/* Subhead - Mechanic-specific */}
            <p className="
              text-[var(--text-lg)]
              text-[var(--color-ink-muted)]
              mb-[var(--space-2xl)]
              max-w-[50ch]
              leading-relaxed
            ">
              Quorum aggregates demand before operators schedule.
              You commit conditionally. If the threshold is met, the tour runs.
              If not, you owe nothing.
            </p>

            {/* CTA - Action-specific */}
            <div className="flex flex-wrap gap-[var(--space-md)]">
              <Button variant="primary">
                Browse Available Tours
              </Button>
              <Button variant="secondary">
                See How It Works
              </Button>
            </div>
          </div>

          {/* Visual - 1/3 - Abstract demand diagram */}
          <div className="
            hidden lg:block
            relative
          ">
            {/* Abstract visualization of demand aggregation */}
            <div className="
              aspect-square
              relative
              flex items-center justify-center
            ">
              {/* Concentric circles representing aggregating demand */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="
                  w-full h-full
                  border-2 border-[var(--color-border)]
                  rounded-full
                  opacity-20
                " />
              </div>
              <div className="absolute inset-[15%] flex items-center justify-center">
                <div className="
                  w-full h-full
                  border-2 border-[var(--color-forming)]
                  rounded-full
                  opacity-40
                " />
              </div>
              <div className="absolute inset-[30%] flex items-center justify-center">
                <div className="
                  w-full h-full
                  border-2 border-[var(--color-forming)]
                  rounded-full
                  opacity-60
                " />
              </div>
              <div className="absolute inset-[45%] flex items-center justify-center">
                <div className="
                  w-full h-full
                  bg-[var(--color-confirmed)]
                  rounded-full
                  flex items-center justify-center
                ">
                  <span className="text-white font-mono text-lg font-medium">
                    GO
                  </span>
                </div>
              </div>

              {/* Dots representing individual commitments */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <div
                    key={i}
                    className="
                      absolute w-3 h-3
                      bg-[var(--color-accent)]
                      rounded-full
                    "
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bleed element to encourage scroll */}
      <div className="
        absolute bottom-0 left-0 right-0
        h-[var(--space-4xl)]
        bg-gradient-to-b from-transparent to-[var(--color-surface-sunken)]
        pointer-events-none
      " aria-hidden="true" />
    </section>
  );
}
