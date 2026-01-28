'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

/**
 * Auth Error Page
 *
 * Displays authentication errors in a user-friendly way.
 * This page is shown when auth callbacks fail.
 */

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="max-w-[420px] mx-auto">
      {/* Header */}
      <div className="mb-[var(--space-xl)]">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
          Authentication Error
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          Something went wrong during the authentication process.
        </p>
      </div>

      {/* Error message */}
      <div className="bg-red-50 border border-red-200 rounded-[var(--radius-organic)] p-[var(--space-md)] mb-[var(--space-lg)]">
        <p className="text-sm text-red-700">
          {error || 'An unexpected error occurred. Please try again.'}
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-[var(--space-md)]">
        <Link
          href="/login"
          className="
            block
            w-full
            h-12 sm:h-[52px]
            px-[var(--space-md)]
            text-base
            font-semibold
            text-[var(--color-ink)]
            bg-[var(--color-accent)]
            rounded-[var(--radius-organic)]
            hover:bg-[var(--color-accent-hover)]
            shadow-[var(--shadow-card)]
            hover:shadow-[var(--shadow-card-hover)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
            transition-all duration-200
            text-center
            leading-[52px]
          "
        >
          Back to Login
        </Link>

        <Link
          href="/"
          className="
            block
            w-full
            h-12 sm:h-[52px]
            px-[var(--space-md)]
            text-base
            font-semibold
            text-[var(--color-primary)]
            bg-transparent
            border-2 border-[var(--color-primary)]
            rounded-[var(--radius-organic)]
            hover:bg-[var(--color-primary)]
            hover:text-white
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
            transition-all duration-200
            text-center
            leading-[48px]
          "
        >
          Go Home
        </Link>
      </div>

      {/* Help text */}
      <p className="mt-[var(--space-lg)] text-center text-sm text-[var(--color-ink-muted)]">
        If the problem persists, please{' '}
        <a
          href="mailto:support@quorumtours.com"
          className="text-[var(--color-primary)] hover:underline"
        >
          contact support
        </a>
      </p>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="w-full px-[var(--space-md)] sm:px-[var(--space-lg)] py-[var(--space-3xl)] sm:py-[var(--space-4xl)]">
        <Suspense fallback={
          <div className="max-w-[420px] mx-auto">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-48 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-64 mb-8" />
              <div className="h-[100px] bg-red-100 rounded-lg mb-4" />
              <div className="h-[52px] bg-gray-200 rounded-lg mb-4" />
              <div className="h-[52px] bg-gray-200 rounded-lg" />
            </div>
          </div>
        }>
          <AuthErrorContent />
        </Suspense>
      </div>
    </main>
  );
}
