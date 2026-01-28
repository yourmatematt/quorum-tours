'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SignupForm } from '@/components/auth';

/**
 * Signup Page - Two-column account creation entry point
 *
 * Primary job: Welcoming, low-friction account creation.
 * Left column explains benefits of joining (founding birder program).
 * Right column has the signup form with login option.
 *
 * Single viewport design - fits without scrolling on desktop.
 */

function SignupPageContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  // Build login URL with redirect preserved
  const loginUrl =
    redirectTo !== '/' ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login';

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
        {/* Left column: Founding Birder Program */}
        <div
          className="
            p-[var(--space-lg)] lg:p-[var(--space-xl)]
            bg-gradient-to-b from-[var(--color-primary-subtle)] to-[var(--color-surface-raised)]
            border-2 border-[var(--color-primary)]/10
            rounded-[var(--radius-organic)]
            flex flex-col
          "
        >
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              px-3 py-1
              bg-white
              border border-[var(--color-primary)]/20
              rounded-full
              text-xs font-medium text-[var(--color-primary)]
              mb-[var(--space-md)]
              w-fit
            "
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Founding Birder Program
          </div>

          <h2
            className="
              font-display
              text-xl lg:text-2xl
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            "
          >
            Join as a founding birder
          </h2>

          <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-md)]">
            Be among the first to use Quorum. Build your chase list now and get priority access when
            tours launch.
          </p>

          <div className="space-y-[var(--space-md)] flex-1">
            {/* Benefit 1 */}
            <div className="flex gap-[var(--space-sm)]">
              <div
                className="
                  flex-shrink-0
                  w-8 h-8
                  bg-white
                  border border-[var(--color-border)]
                  rounded-full
                  flex items-center justify-center
                "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">Build your chase list</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Add species you want to see. We'll notify you first when a tour features them.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-[var(--space-sm)]">
              <div
                className="
                  flex-shrink-0
                  w-8 h-8
                  bg-white
                  border border-[var(--color-border)]
                  rounded-full
                  flex items-center justify-center
                "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">24-hour priority window</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Founding birders get early access to commit before public announcement.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">Priority is permanent</p>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  The earlier you join, the higher your notification priority forever.
                </p>
              </div>
            </div>
          </div>

          {/* Trust note */}
          <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-ink-muted)]">
              Your email is only used for tour notifications. We never share your information.
            </p>
          </div>
        </div>

        {/* Right column: Signup Form */}
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
            Create your account
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)] mb-[var(--space-md)]">
            Track your tour commitments and get notified when tours confirm.
          </p>

          {/* Signup form */}
          <div className="flex-1">
            <SignupForm redirectTo={redirectTo} />
          </div>

          {/* Sign in link */}
          <div className="mt-[var(--space-md)] pt-[var(--space-md)] border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-ink-muted)]">
              Already have an account?{' '}
              <Link
                href={loginUrl}
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
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
            <SignupPageContent />
          </Suspense>
        </div>
      </main>
    </ErrorBoundary>
  );
}
