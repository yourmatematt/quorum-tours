interface ComparisonRow {
  feature: string;
  quorum: string | boolean;
  fareharbor: string | boolean;
  diy: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: 'Commission', quorum: '6%', fareharbor: '6%+', diy: '0%' },
  { feature: 'Monthly fee', quorum: '$0', fareharbor: '$0–$199', diy: '$0' },
  { feature: 'Threshold mechanics', quorum: true, fareharbor: false, diy: false },
  { feature: 'Species-based discovery', quorum: true, fareharbor: false, diy: false },
  { feature: 'Payment chasing', quorum: 'None', fareharbor: 'Manual', diy: 'All manual' },
  { feature: 'Human support', quorum: true, fareharbor: 'Varies', diy: false },
];

function CheckIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-[var(--color-confirmed)]" aria-label="Yes">
      <path d="M16.5 5.5L7.5 14.5 3.5 10.5l1.5-1.5 2.5 2.5 7.5-7.5z" />
    </svg>
  );
}

function XIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="text-[var(--color-ink-subtle)]" aria-label="No">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function renderCell(value: string | boolean): JSX.Element {
  if (typeof value === 'boolean') {
    return value ? <CheckIcon /> : <XIcon />;
  }
  return <span>{value}</span>;
}

const benefits = ['No monthly fees', 'No setup costs', 'Unlimited listings'];

export function TrustTransparency(): JSX.Element {
  return (
    <section className="py-[var(--space-2xl)] bg-[var(--color-surface)]">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)]">
        <header className="text-center mb-[var(--space-xl)]">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-sm)]">
            Transparent Pricing. No Surprises.
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] mx-auto">
            Your price is what birders pay. We take our cut only when you succeed.
          </p>
        </header>

        <div className="p-[var(--space-lg)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-accent)] rounded-[var(--radius-lg)] flex flex-col md:flex-row items-center justify-between gap-[var(--space-lg)]">
          <div className="flex items-center gap-[var(--space-lg)]">
            <span className="font-mono text-[3rem] font-bold text-[var(--color-ink)] leading-none">
              6%
            </span>
            <div>
              <p className="text-[var(--text-lg)] font-semibold text-[var(--color-ink)]">
                Flat commission. Forever.
              </p>
              <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
                Only on successful bookings. If your tour doesn't run, you pay nothing.
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-[var(--space-lg)] gap-y-[var(--space-sm)] text-[var(--text-sm)]">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-[var(--color-ink)]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[var(--space-3xl)]">
          <h3 className="text-[var(--text-xl)] font-semibold text-[var(--color-ink)] text-center mb-[var(--space-xl)]">
            How We Compare
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border-collapse">
              <thead>
                <tr>
                  <th scope="col" className="p-[var(--space-md)] text-left text-[var(--color-ink-muted)] font-medium border-b-2 border-[var(--color-border)]">
                    Feature
                  </th>
                  <th scope="col" className="p-[var(--space-md)] text-center text-[var(--color-primary)] font-semibold border-b-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5">
                    Quorum Tours
                  </th>
                  <th scope="col" className="p-[var(--space-md)] text-center text-[var(--color-ink-muted)] font-medium border-b-2 border-[var(--color-border)]">
                    FareHarbor
                  </th>
                  <th scope="col" className="p-[var(--space-md)] text-center text-[var(--color-ink-muted)] font-medium border-b-2 border-[var(--color-border)]">
                    DIY (Spreadsheets)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-[var(--space-md)] text-[var(--color-ink)] border-b border-[var(--color-border)]">
                      {row.feature}
                    </td>
                    <td className="p-[var(--space-md)] border-b border-[var(--color-border)] bg-[var(--color-primary)]/5">
                      <div className="flex items-center justify-center">
                        {renderCell(row.quorum)}
                      </div>
                    </td>
                    <td className="p-[var(--space-md)] text-[var(--color-ink-muted)] border-b border-[var(--color-border)]">
                      <div className="flex items-center justify-center">
                        {renderCell(row.fareharbor)}
                      </div>
                    </td>
                    <td className="p-[var(--space-md)] text-[var(--color-ink-muted)] border-b border-[var(--color-border)]">
                      <div className="flex items-center justify-center">
                        {renderCell(row.diy)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
