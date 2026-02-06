interface PainPoint {
  id: string;
  iconPath: string;
  headline: string;
  reality: string;
  solution: string;
}

function PainIcon({ path }: { path: string }): JSX.Element {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const painPoints: PainPoint[] = [
  {
    id: 'deposit-gamble',
    iconPath: 'M4 8h24v18a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm0 6h24M14 21a2 2 0 104 0 2 2 0 00-4 0',
    headline: 'The Deposit Gamble',
    reality: "You've paid the boat. The lodge. The catering. You need six participants. You have three. Now you're praying strangers find your Facebook post before you lose $4,000.",
    solution: "Tours only go live when they hit your minimum. Cards aren't charged until you're ready to run.",
  },
  {
    id: 'admin-trap',
    iconPath: 'M6 4h20a2 2 0 012 2v20a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm4 6h12M10 16h12M10 22h8',
    headline: 'The Admin Trap',
    reality: "You spent thirty years learning to identify every warbler by ear. Now you spend thirty hours a week in Gmail, chasing payments, answering the same questions, updating spreadsheets.",
    solution: 'Bookings, deposits, pre-trip info, and confirmations—all automated. You focus on guiding.',
  },
  {
    id: 'invisible-expert',
    iconPath: 'M4 14a10 10 0 1020 0 10 10 0 00-20 0M22 22l6 6',
    headline: 'The Invisible Expert',
    reality: "There are birders right now searching for exactly what you offer. But they can't find you. You're not on the first page of Google. You're posting to Facebook and hoping.",
    solution: 'Birders search by species. They get notified when you list a tour matching their chase list.',
  },
];

export function ProblemStatement(): JSX.Element {
  return (
    <section className="py-12 sm:py-16 lg:py-[var(--space-2xl)] bg-[var(--color-surface)]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[var(--space-lg)]">
        <header className="text-center mb-8 sm:mb-[var(--space-xl)]">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-sm)]">
            You Became a Guide to Guide
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] max-w-[45ch] mx-auto">
            Not to gamble on viability, chase payments, or drown in admin.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-[var(--space-md)]">
          {painPoints.map((point) => (
            <article
              key={point.id}
              className="flex flex-col p-4 sm:p-[var(--space-lg)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-lg)]"
            >
              <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-md)]">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[var(--color-forming)]/10 text-[var(--color-forming)] rounded-[var(--radius-sm)]">
                  <span className="scale-75">
                    <PainIcon path={point.iconPath} />
                  </span>
                </div>
                <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-ink)] leading-snug">
                  {point.headline}
                </h3>
              </div>

              <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)] leading-relaxed italic flex-grow mb-[var(--space-md)]">
                "{point.reality}"
              </p>

              <div className="pt-[var(--space-sm)] border-t border-[var(--color-border)]">
                <p className="text-[0.75rem] text-[var(--color-primary)] uppercase tracking-wider font-semibold mb-[2px]">
                  On Quorum
                </p>
                <p className="text-[var(--text-sm)] text-[var(--color-ink)] font-medium leading-snug">
                  {point.solution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
