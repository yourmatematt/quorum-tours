'use client';

import { CommitmentCard } from '@/components/ui/CommitmentCard';
import { QuorumProgressBar } from '@/components/ui/QuorumProgressBar';

/**
 * Screenshot Helper Page
 * Renders components in isolation for marketing screenshots
 * Access at /screenshots
 */
export default function ScreenshotsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] p-8">
      <h1 className="font-display text-2xl mb-8 text-[var(--color-ink)]">Component Screenshots</h1>

      {/* Step 3: CommitmentCard with forming status */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)] mb-4 uppercase tracking-wide">
          Step 3: Commit Sidebar (Forming)
        </h2>
        <div id="commitment-card" className="w-[340px]">
          <CommitmentCard
            status="forming"
            price={495}
            deposit={75}
            currentParticipants={5}
            quorum={6}
            capacity={10}
            tourId="example-tour"
            isLoggedIn={false}
          />
        </div>
      </section>

      {/* Step 4: QuorumProgressBar - Confirmed at 8/10 */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)] mb-4 uppercase tracking-wide">
          Step 4: Quorum Reached (8/10)
        </h2>
        <div id="quorum-bar" className="w-[400px] bg-[var(--color-surface-raised)] p-6 rounded-[var(--radius-organic)] border-2 border-[var(--color-border)]">
          <div className="mb-2">
            <span className="text-xs font-medium tracking-wider uppercase text-[var(--color-ink-subtle)]">
              Quorum Progress
            </span>
          </div>
          <QuorumProgressBar
            current={8}
            quorum={6}
            capacity={10}
            size="md"
            showDetails={true}
          />
          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-confirmed-bg)] text-[var(--color-confirmed)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-confirmed)]" />
              Quorum Reached
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
