'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AccessDeniedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  const getMessage = () => {
    switch (reason) {
      case 'not-admin':
        return 'This area is restricted to platform administrators.';
      case 'not-operator':
        return 'This area is restricted to tour operators.';
      default:
        return 'You do not have permission to access this page.';
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-surface-alt)' }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>

        <h1
          className="text-2xl font-semibold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Access Denied
        </h1>

        <p
          className="mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {getMessage()}
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 px-4 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-on-primary)',
            }}
          >
            Go to Homepage
          </Link>

          <Link
            href="/login"
            className="block w-full py-3 px-4 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              color: 'var(--color-text-primary)',
            }}
          >
            Sign in with a different account
          </Link>
        </div>

        <p
          className="mt-8 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          If you believe this is an error, contact{' '}
          <a
            href="mailto:support@quorumtours.com"
            className="underline"
            style={{ color: 'var(--color-primary)' }}
          >
            support@quorumtours.com
          </a>
        </p>
      </div>
    </main>
  );
}

export default function AccessDeniedPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
      }
    >
      <AccessDeniedContent />
    </Suspense>
  );
}
