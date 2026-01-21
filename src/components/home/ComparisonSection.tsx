'use client';

import { useMemo } from 'react';

interface ComparisonItem {
  problem: string;
  solution: string;
}

export function ComparisonSection() {
  const comparisons: ComparisonItem[] = useMemo(() => [
    {
      problem: 'You book a tour hoping others will too. If turnout is low, the experience suffers or cancels last-minute.',
      solution: 'Tours only run when enough participants have committed. Confirmation is guaranteed before you travel.',
    },
    {
      problem: 'Operators guess at demand and schedule speculatively. Underbooked tours lose money; overbooked tours decline quality.',
      solution: 'Operators see real demand before committing resources. Tours run at optimal group sizes.',
    },
    {
      problem: 'Refund policies vary. Cancellation fees apply. You bear the risk of uncertainty.',
      solution: 'Conditional commitment means no charge until confirmation. The risk is on the system, not you.',
    },
  ], []);
  return (
    <section className="
      py-[var(--space-section-normal)]
      bg-[var(--color-surface)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <div className="mb-[var(--space-3xl)] max-w-[var(--container-content)]">
          <h2 className="
            font-display
            text-[var(--text-2xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            Why this is different.
          </h2>
          <p className="
            text-[var(--color-ink-muted)]
            text-[var(--text-base)]
          ">
            Traditional booking platforms transfer uncertainty to you. Quorum resolves it first.
          </p>
        </div>

        {/* Comparison panels */}
        <div className="space-y-[var(--space-xl)]">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="
                grid grid-cols-1 lg:grid-cols-2
                gap-[var(--space-lg)]
                items-stretch
              "
            >
              {/* Problem - left */}
              <div className="
                p-[var(--space-xl)]
                bg-[var(--color-surface-sunken)]
                border border-[var(--color-border)]
                rounded-tl-[var(--radius-lg)] rounded-bl-[var(--radius-lg)]
                rounded-tr-[var(--radius-sm)] rounded-br-[var(--radius-sm)]
              ">
                <span className="
                  inline-block
                  text-xs font-medium uppercase tracking-wide
                  text-[var(--color-ink-subtle)]
                  mb-[var(--space-sm)]
                ">
                  Traditional model
                </span>
                <p className="text-[var(--color-ink-muted)] leading-relaxed">
                  {item.problem}
                </p>
              </div>

              {/* Solution - right */}
              <div className="
                p-[var(--space-xl)]
                bg-[var(--color-surface-raised)]
                border border-[var(--color-confirmed)]
                rounded-tr-[var(--radius-lg)] rounded-br-[var(--radius-lg)]
                rounded-tl-[var(--radius-sm)] rounded-bl-[var(--radius-sm)]
              ">
                <span className="
                  inline-block
                  text-xs font-medium uppercase tracking-wide
                  text-[var(--color-confirmed)]
                  mb-[var(--space-sm)]
                ">
                  Quorum model
                </span>
                <p className="text-[var(--color-ink)] leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Honest constraint acknowledgment */}
        <div className="
          mt-[var(--space-3xl)]
          p-[var(--space-lg)]
          border-l-4 border-[var(--color-forming)]
          bg-[var(--color-forming-bg)]
          rounded-r-[var(--radius-md)]
          max-w-[var(--container-content)]
        ">
          <p className="text-[var(--color-ink)] text-[var(--text-sm)]">
            <strong>What Quorum does not do:</strong>
            {' '}We do not guarantee sightings, weather, or personal compatibility.
            We guarantee that if you commit, you will know whether the tour runs before you are charged.
          </p>
        </div>
      </div>
    </section>
  );
}
