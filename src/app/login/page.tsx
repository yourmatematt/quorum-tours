'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoginForm } from '@/components/auth';

/**
 * Login Page - Two-column authentication gateway
 *
 * Primary job: Calm, trustworthy login experience for returning users.
 * Left column explains "How Quorum Works" in 3 steps.
 * Right column has the sign in form with signup option.
 *
 * Single viewport design - fits without scrolling on desktop.
 */

function LoginPageContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  // Build signup URL with redirect preserved
  const signupUrl =
    redirectTo !== '/' ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : '/signup';

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center">
      {/* Two-column layout on desktop */}
      <div
        className="
          w-full max-w-5xl mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-[var(--space-lg)]
          items-stretch
        "
      >
        {/* Left column: How Quorum Works */}
        <div
          className="
            p-[var(--space-lg)] lg:p-[var(--space-xl)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            flex flex-col
          "
        >
          <h2
            className="
              font-display
              text-xl lg:text-2xl
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-md)]
            "
          >
            How Quorum Works
          </h2>

          <div className="space-y-[var(--space-md)] flex-1">
            {/* Step 1 */}
            <div className="flex gap-[var(--space-sm)]">
              <div
                className="
                  flex-shrink-0
                  w-8 h-8
                  bg-[var(--color-surface-sunken)]
                  rounded-full
                  flex items-center justify-center
                "
              >
                <span className="font-mono font-bold text-xs text-[var(--color-primary)]">1</span>
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">Browse tours</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Find birding tours by location or species. Each shows spots needed to confirm.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-[var(--space-sm)]">
              <div
                className="
                  flex-shrink-0
                  w-8 h-8
                  bg-[var(--color-surface-sunken)]
                  rounded-full
                  flex items-center justify-center
                "
              >
                <span className="font-mono font-bold text-xs text-[var(--color-primary)]">2</span>
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">Commit when ready</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Your card is only charged if the tour reaches quorum and confirms.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-[var(--space-sm)]">
              <div
                className="
                  flex-shrink-0
                  w-8 h-8
                  bg-[var(--color-primary-subtle)]
                  border border-[var(--color-primary)]/30
                  rounded-full
                  flex items-center justify-center
                "
              >
                <span className="font-mono font-bold text-xs text-[var(--color-primary)]">3</span>
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">Tour confirms at quorum</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Once enough birders commit, you're charged and you're going birding.
                </p>
              </div>
            </div>
          </div>

          {/* Trust callout */}
          <div
            className="
              mt-[var(--space-md)]
              pt-[var(--space-md)]
              border-t border-[var(--color-border)]
            "
          >
            <div className="flex items-center gap-[var(--space-sm)]">
              <div
                className="
                  flex-shrink-0
                  w-6 h-6
                  bg-[var(--color-confirmed-subtle)]
                  rounded-full
                  flex items-center justify-center
                "
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-confirmed)"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs text-[var(--color-ink-muted)]">
                <span className="font-medium text-[var(--color-ink)]">No charge until confirmed</span>
                {' '}— if quorum isn't reached, you pay nothing.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Sign In Form */}
        <div
          className="
            p-[var(--space-lg)] lg:p-[var(--space-xl)]
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
            flex flex-col
          "
        >
          {/* Header */}
          <h1
            className="
              font-display
              text-xl lg:text-2xl
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            Welcome back
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-md)]">
            Access your tour commitments and booking history.
          </p>

          {/* Login form */}
          <div className="flex-1">
            <LoginForm redirectTo={redirectTo} />
          </div>

          {/* Create account link */}
          <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-ink-muted)]">
              New to Quorum?{' '}
              <Link
                href={signupUrl}
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="w-full px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-md)]">
          <Suspense
            fallback={
              <div className="min-h-[calc(100vh-80px)] flex items-center">
                <div className="w-full max-w-5xl mx-auto">
                  <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-lg)]">
                    <div className="h-[400px] bg-gray-100 rounded-lg" />
                    <div className="h-[400px] bg-gray-100 rounded-lg" />
                  </div>
                </div>
              </div>
            }
          >
            <LoginPageContent />
          </Suspense>
        </div>
      </main>
    </ErrorBoundary>
  );
}
