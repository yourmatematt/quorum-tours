import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthCard, LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Sign in — Quorum Tours',
  description:
    'Sign in to access your tour commitments and booking history on Quorum Tours.',
};

/**
 * Login Page - Authentication entry point
 *
 * Primary job: Calm, trustworthy login experience for returning users.
 *
 * Design considerations:
 * - $3,500 transaction credibility (institutional tone)
 * - Older demographics (operators 50-70, birders 45-65)
 * - Pain points: EL-2 (payment anxiety), OP-8 (technology frustration)
 *
 * UI Shell: No backend auth wiring. Forms are visual representations only.
 */
export default function LoginPage() {
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
              text-3xl sm:text-4xl
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            "
          >
            Welcome back
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            Access your tour commitments and booking history.
          </p>
        </div>

        {/* Login card */}
        <AuthCard>
          <LoginForm />
        </AuthCard>

        {/* Create account prompt */}
        <div
          className="
            max-w-[420px] mx-auto
            mt-[var(--space-xl)]
            text-center
            text-[var(--text-sm)]
            text-[var(--color-ink-muted)]
          "
        >
          New to Quorum?{' '}
          <a
            href="/signup"
            className="
              text-[var(--color-primary)]
              font-medium
              hover:underline
              focus:outline-none focus:underline
            "
          >
            Create an account
          </a>
        </div>
      </div>
    </main>
    </ErrorBoundary>
  );
}
