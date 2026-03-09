'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';
import { createClient } from '@/lib/supabase/client';

export default function SecurityPage() {
  const { user, isLoading: authLoading } = useAuth();
  const supabase = createClient();

  const [resetSending, setResetSending] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setResetSending(true);
    setResetMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/profile/security`,
      });

      if (error) {
        setResetMessage({ type: 'error', text: 'Failed to send reset email. Please try again.' });
      } else {
        setResetMessage({ type: 'success', text: "We've sent a password reset link to your email address." });
      }
    } catch {
      setResetMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setResetSending(false);
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-8 pb-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[var(--color-border)] rounded w-32" />
            <div className="h-32 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
            <div className="h-24 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
          </div>
        </div>
      </main>
    );
  }

  // Auth gate
  if (!user) {
    return (
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full max-w-md mx-auto px-4 text-center">
            <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              Sign in to access security settings
            </h1>
            <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
              You need to be signed in to manage your security settings.
            </p>
            <Link
              href="/login?redirect=/profile/security"
              className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-surface)] min-h-screen">
      <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/profile"
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            ← Back to dashboard
          </Link>
        </div>

        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-8">
          Security
        </h1>

        {/* Password */}
        <section className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] p-5 sm:p-6 mb-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)] mb-4">
            Password
          </h2>

          <p className="text-sm text-[var(--color-ink-muted)] mb-4">
            To change your password, we will send a reset link to your email address.
          </p>

          <button
            onClick={handlePasswordReset}
            disabled={resetSending}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            {resetSending ? 'Sending…' : 'Change password'}
          </button>

          {resetMessage && (
            <p className={`mt-3 text-sm ${resetMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {resetMessage.text}
            </p>
          )}
        </section>

        {/* Sessions */}
        <section className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] p-5 sm:p-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)] mb-4">
            Sessions
          </h2>

          <p className="text-sm text-[var(--color-ink-muted)]">
            You are currently signed in. To sign out of all devices, use the Sign Out option in your account menu.
          </p>
        </section>
      </div>
    </main>
  );
}
