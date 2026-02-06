'use client';

import { useState } from 'react';

export function SocialProof(): JSX.Element {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    // TODO: Replace with actual API endpoint
    try {
      // Simulate API call - replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-[var(--space-2xl)] bg-[var(--color-surface-sunken)]">
      <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-[var(--space-lg)]">
        <header className="text-center mb-8 sm:mb-[var(--space-xl)]">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-sm)]">
            Express Your Interest
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] mx-auto">
            We're onboarding operators now. Join the list to get early access.
          </p>
        </header>

        <div className="p-4 sm:p-[var(--space-xl)] bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-lg)]">
          {status === 'success' ? (
            <div className="text-center py-3 sm:py-[var(--space-md)]">
              <p className="text-base sm:text-[var(--text-lg)] font-semibold text-[var(--color-confirmed)]">
                Thanks! We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-[var(--space-md)]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                required
                disabled={status === 'submitting'}
                className="flex-grow px-3 sm:px-[var(--space-md)] py-3 sm:py-[var(--space-sm)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-subtle)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 sm:px-[var(--space-xl)] py-3 sm:py-[var(--space-sm)] bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Get Early Access'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 sm:mt-[var(--space-sm)] text-center text-xs sm:text-[var(--text-sm)] text-red-600">
              Something went wrong. Please try again.
            </p>
          )}

          {status !== 'success' && (
            <p className="mt-3 sm:mt-[var(--space-md)] text-center text-xs sm:text-[var(--text-sm)] text-[var(--color-ink-muted)]">
              No spam. We'll reach out when we're ready to onboard you.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
