import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthCard, SignupForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Create your account — Quorum Tours',
  description:
    'Create an account to track your tour commitments and get notified when tours confirm.',
};

/**
 * Signup Page - Account creation entry point
 *
 * Primary job: Welcoming, low-friction account creation.
 *
 * Design considerations:
 * - NW-2 (Intimidation): No gatekeeping, no expertise questions
 * - OP-8 (Technology Frustration): Minimal fields, clear feedback
 * - $3,500 transaction credibility (institutional tone)
 *
 * UI Shell: No backend auth wiring. Forms are visual representations only.
 */
export default function SignupPage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
      {/* Centered container */}
      <div
        className="
          w-full
          px-[var(--space-md)] sm:px-[var(--space-lg)]
          py-[var(--space-3xl)] sm:py-[var(--space-4xl)]
        "
      >
        {/* Page header */}
        <div className="max-w-[420px] mx-auto mb-[var(--space-xl)]">
          <h1
            className="
              font-display
              text-[var(--text-2xl)] sm:text-[var(--text-3xl)]
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            "
          >
            Create your account
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            Track your tour commitments and get notified when tours confirm.
          </p>
        </div>

        {/* Signup card */}
        <AuthCard>
          <SignupForm />
        </AuthCard>

        {/* Sign in prompt */}
        <div
          className="
            max-w-[420px] mx-auto
            mt-[var(--space-xl)]
            text-center
            text-[var(--text-sm)]
            text-[var(--color-ink-muted)]
          "
        >
          Already have an account?{' '}
          <a
            href="/login"
            className="
              text-[var(--color-accent)]
              hover:underline
              focus:outline-none focus:underline
            "
          >
            Sign in
          </a>
        </div>
      </div>
    </main>
    </ErrorBoundary>
  );
}
