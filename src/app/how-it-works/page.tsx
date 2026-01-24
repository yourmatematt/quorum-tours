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
          pt-24 pb-16
          bg-[var(--color-surface)]
        ">
          <div className="
            w-full max-w-[var(--container-max)]
            mx-auto px-6 lg:px-8
          ">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-[var(--space-sm)] text-[var(--text-sm)]">
                <li>
                  <a
                    href="/"
                    className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
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
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="
                font-display
                text-4xl lg:text-5xl
                font-semibold
                text-[var(--color-ink)]
                mb-4
              ">
                How Quorum works
              </h1>
              <p className="
                text-[var(--color-ink-muted)]
                text-lg
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
