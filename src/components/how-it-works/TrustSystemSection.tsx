interface TrustTier {
  name: string;
  condition: string;
  deposit: string;
  icon: string;
}

const trustTiers: TrustTier[] = [
  {
    name: 'New',
    condition: 'First tour',
    deposit: 'Operator-set deposit',
    icon: '○',
  },
  {
    name: 'Trusted',
    condition: '1+ completed tours, no strikes',
    deposit: 'No deposit required',
    icon: '●',
  },
  {
    name: 'Strike 1',
    condition: '1 missed payment',
    deposit: 'Operator-set deposit',
    icon: '◐',
  },
  {
    name: 'Strike 2',
    condition: '2 missed payments',
    deposit: '50% of tour price',
    icon: '◑',
  },
  {
    name: 'Suspended',
    condition: '3+ missed payments',
    deposit: 'Cannot book',
    icon: '○',
  },
];

export function TrustSystemSection() {
  return (
    <section
      id="trust-system"
      className="
        py-20
        bg-[var(--color-surface)]
        scroll-mt-8
      "
    >
      <div className="
        w-full max-w-[1400px]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="
            font-display
            text-[clamp(1.75rem,4vw,2.5rem)]
            leading-tight
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            Our Trust System
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            max-w-[640px]
            mx-auto
          ">
            Tours only work when people show up. Our deposit system keeps things fair
            for operators and fellow birders who are counting on you.
          </p>
        </div>

        {/* Why deposits exist */}
        <div className="
          mb-16
          p-8
          bg-[var(--color-surface-raised)]
          border-2 border-[var(--color-border)]
          rounded-[var(--radius-organic)]
          shadow-[var(--shadow-card)]
        ">
          <h3 className="
            font-display
            text-[clamp(1.25rem,3vw,1.5rem)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            Why deposits?
          </h3>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
            mb-[var(--space-md)]
          ">
            When a tour reaches quorum, every committed person has 24 hours to pay
            the balance. If someone commits but doesn&apos;t pay, they take a spot from someone
            who would have. The operator may lose the minimum viable group. Other birders
            may miss out on a tour that could have run.
          </p>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
            leading-relaxed
          ">
            Deposits create accountability. They&apos;re not a fee—they&apos;re applied to your
            tour price. But if you commit and don&apos;t follow through, the deposit compensates
            the operator for the disruption.
          </p>
        </div>

        {/* Trust tiers */}
        <div className="mb-16">
          <h3 className="
            font-display
            text-[clamp(1.25rem,3vw,1.5rem)]
            text-[var(--color-ink)]
            mb-[var(--space-lg)]
            text-center
          ">
            Trust Tiers
          </h3>

          <div className="
            grid gap-[var(--space-md)]
            md:grid-cols-5
          ">
            {trustTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`
                  p-6
                  rounded-[var(--radius-organic)]
                  border-2
                  ${tier.name === 'Trusted'
                    ? 'bg-[var(--color-primary-subtle)] border-[var(--color-primary)]'
                    : tier.name === 'Suspended'
                    ? 'bg-[var(--color-surface-sunken)] border-[var(--color-border)] opacity-75'
                    : 'bg-[var(--color-surface-raised)] border-[var(--color-border)]'
                  }
                `}
              >
                <div className="
                  text-2xl mb-[var(--space-sm)]
                  text-center
                " aria-hidden="true">
                  {tier.icon}
                </div>
                <p className="
                  font-display
                  text-[var(--text-base)]
                  text-[var(--color-ink)]
                  text-center
                  mb-[var(--space-xs)]
                ">
                  {tier.name}
                </p>
                <p className="
                  text-[var(--text-sm)]
                  text-[var(--color-ink-muted)]
                  text-center
                  mb-[var(--space-sm)]
                ">
                  {tier.condition}
                </p>
                <p className={`
                  text-[var(--text-sm)]
                  text-center
                  font-medium
                  ${tier.name === 'Trusted'
                    ? 'text-[var(--color-primary)]'
                    : tier.name === 'Suspended'
                    ? 'text-[var(--color-ink-subtle)]'
                    : 'text-[var(--color-ink)]'
                  }
                `}>
                  {tier.deposit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works in practice */}
        <div className="
          grid gap-[var(--space-lg)]
          md:grid-cols-2
        ">
          {/* The 24-hour window */}
          <div className="
            p-8
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
          ">
            <h3 className="
              font-display
              text-[var(--text-lg)]
              text-[var(--color-ink)]
              mb-[var(--space-md)]
            ">
              The 24-hour window
            </h3>
            <ol className="
              space-y-[var(--space-md)]
              text-[var(--color-ink-muted)]
              text-[var(--text-base)]
            ">
              <li className="flex gap-[var(--space-sm)]">
                <span className="
                  font-mono text-[var(--color-primary)]
                  flex-shrink-0
                ">1.</span>
                <span>Tour reaches quorum</span>
              </li>
              <li className="flex gap-[var(--space-sm)]">
                <span className="
                  font-mono text-[var(--color-primary)]
                  flex-shrink-0
                ">2.</span>
                <span>You receive an email: &quot;Tour confirmed—pay balance within 24 hours&quot;</span>
              </li>
              <li className="flex gap-[var(--space-sm)]">
                <span className="
                  font-mono text-[var(--color-primary)]
                  flex-shrink-0
                ">3.</span>
                <span>Pay on time: your deposit applies to the total, you&apos;re booked</span>
              </li>
              <li className="flex gap-[var(--space-sm)]">
                <span className="
                  font-mono text-[var(--color-primary)]
                  flex-shrink-0
                ">4.</span>
                <span>Miss the deadline: deposit goes to operator, your spot opens for waitlist</span>
              </li>
            </ol>
          </div>

          {/* What happens with a missed payment */}
          <div className="
            p-8
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
          ">
            <h3 className="
              font-display
              text-[var(--text-lg)]
              text-[var(--color-ink)]
              mb-[var(--space-md)]
            ">
              Missed payments
            </h3>
            <p className="
              text-[var(--color-ink-muted)]
              text-[var(--text-base)]
              leading-relaxed
              mb-[var(--space-md)]
            ">
              If you miss the 24-hour payment window:
            </p>
            <ul className="
              space-y-[var(--space-sm)]
              text-[var(--color-ink-muted)]
              text-[var(--text-base)]
            ">
              <li className="flex gap-[var(--space-sm)]">
                <span className="text-[var(--color-ink-subtle)]">—</span>
                <span>Your deposit is forfeited to the operator (minus 3% platform fee)</span>
              </li>
              <li className="flex gap-[var(--space-sm)]">
                <span className="text-[var(--color-ink-subtle)]">—</span>
                <span>You receive a strike on your account</span>
              </li>
              <li className="flex gap-[var(--space-sm)]">
                <span className="text-[var(--color-ink-subtle)]">—</span>
                <span>Your spot goes to the next person on the waitlist</span>
              </li>
            </ul>
            <p className="
              text-[var(--color-ink-subtle)]
              text-[var(--text-sm)]
              leading-relaxed
              mt-[var(--space-md)]
              pt-[var(--space-md)]
              border-t border-[var(--color-border)]
            ">
              Strikes are permanent but can be appealed through support if there were
              extenuating circumstances.
            </p>
          </div>
        </div>

        {/* Operator perspective callout */}
        <div className="
          mt-16
          p-6
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-organic)]
          border border-[var(--color-border)]
        ">
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-sm)]
            leading-relaxed
          ">
            <strong className="text-[var(--color-ink)]">For operators:</strong> You set
            the deposit amount for new users and those with one strike. The system
            automatically requires 50% deposits for users with two strikes. Forfeited
            deposits are paid to you (minus 3% platform fee) as compensation for the
            disruption to your tour planning.
          </p>
        </div>
      </div>
    </section>
  );
}
