import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import {
  ProblemSection,
  MechanicSection,
  FailureCaseSection,
  ConfirmationSection,
  BoundariesSection,
  ClosingCTA,
} from '@/components/how-it-works';

export const metadata: Metadata = {
  title: 'How It Works — Quorum Tours',
  description:
    'Learn how threshold-based tour confirmation works. Understand the mechanics, what happens if a tour doesn\'t run, and what confirmation means.',
};

export default function HowItWorksPage() {
  return (
    <ErrorBoundary>
      <main>
        {/* Page header */}
        <section className="
          pt-[var(--space-4xl)]
          pb-[var(--space-2xl)]
          bg-[var(--color-surface)]
        ">
          <div className="
            w-full max-w-[var(--container-max)]
            mx-auto px-[var(--space-lg)]
          ">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-[var(--space-xl)]">
              <ol className="flex items-center gap-[var(--space-sm)] text-[var(--text-sm)]">
                <li>
                  <a
                    href="/"
                    className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
                  >
                    Home
                  </a>
                </li>
                <li aria-hidden="true" className="text-[var(--color-ink-subtle)]">
                  /
                </li>
                <li>
                  <span
                    className="text-[var(--color-ink)]"
                    aria-current="page"
                  >
                    How It Works
                  </span>
                </li>
              </ol>
            </nav>

            {/* Page title */}
            <div className="max-w-[var(--container-content)]">
              <h1 className="
                font-display
                text-[var(--text-3xl)]
                text-[var(--color-ink)]
                mb-[var(--space-lg)]
              ">
                How Quorum works
              </h1>
              <p className="
                text-[var(--color-ink-muted)]
                text-[var(--text-lg)]
                leading-relaxed
              ">
                A complete guide to threshold-based tour confirmation. How tours form,
                what happens at each stage, and what to expect.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: The Problem */}
        <ProblemSection />

        {/* Section 2: The Quorum Mechanic */}
        <MechanicSection />

        {/* Section 3: What Happens If Tour Doesn't Run */}
        <FailureCaseSection />

        {/* Section 4: What Confirmation Means */}
        <ConfirmationSection />

        {/* Section 5: What Quorum Does Not Do */}
        <BoundariesSection />

        {/* Section 6: Closing CTA */}
        <ClosingCTA />
      </main>
    </ErrorBoundary>
  );
}
