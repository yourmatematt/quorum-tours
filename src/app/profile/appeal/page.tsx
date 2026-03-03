'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';
import { useUserTrust } from '@/hooks/useUserTrust';
import { AlertTriangle, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-[var(--color-ink-muted)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle,
    color: 'text-[var(--color-primary)]',
    bgColor: 'bg-[var(--color-primary-subtle)]',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: 'text-[var(--color-ink-subtle)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
  },
};

export default function AppealPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { strikes, strikeHistory, appeals, trustTier, isLoading: trustLoading, error: trustError, refetch } = useUserTrust(user?.id ?? null);
  const [selectedStrikeId, setSelectedStrikeId] = useState<string>('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isLoading = authLoading || trustLoading;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="max-w-2xl mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          <div className="animate-pulse space-y-[var(--space-lg)]">
            <div className="h-8 bg-[var(--color-border)] rounded w-1/3" />
            <div className="h-4 bg-[var(--color-border)] rounded w-2/3" />
            <div className="h-32 bg-[var(--color-border)] rounded-[var(--radius-lg)]" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="max-w-2xl mx-auto px-[var(--space-lg)] py-[var(--space-3xl)] text-center">
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-[var(--space-md)]">
            Sign in required
          </h1>
          <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
            Please sign in to view or submit appeals.
          </p>
          <Link
            href={`/login?redirect=${encodeURIComponent('/profile/appeal')}`}
            className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  if (strikes === 0 && strikeHistory.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-surface)]">
        <div className="max-w-2xl mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
          <Link
            href="/profile"
            className="inline-flex items-center gap-[var(--space-xs)] text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] mb-[var(--space-lg)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to profile
          </Link>
          <div className="text-center py-[var(--space-3xl)]">
            <CheckCircle className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-[var(--space-md)]" />
            <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              No strikes on your account
            </h1>
            <p className="text-[var(--color-ink-muted)]">
              Your account is in good standing. Nothing to appeal.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Get strike IDs that already have a pending appeal
  const pendingAppealStrikeIds = new Set(
    appeals
      .filter((a) => a.status === 'pending' && a.strike_history_id)
      .map((a) => a.strike_history_id)
  );

  // Strikes available to appeal (no pending appeal)
  const appealableStrikes = strikeHistory.filter(
    (s) => !pendingAppealStrikeIds.has(s.id)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      // Auto-select if only one appealable strike
      const strikeId = selectedStrikeId || (appealableStrikes.length === 1 ? appealableStrikes[0].id : null);

      const res = await fetch('/api/appeals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: reason.trim(),
          strikeHistoryId: strikeId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || 'Failed to submit appeal.');
        return;
      }

      setSubmitSuccess(true);
      setReason('');
      setSelectedStrikeId('');
      refetch();
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="max-w-2xl mx-auto px-[var(--space-lg)] py-[var(--space-3xl)]">
        {/* Back link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-[var(--space-xs)] text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] mb-[var(--space-lg)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to profile
        </Link>

        {/* Page header */}
        <div className="mb-[var(--space-2xl)]">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
            Appeal a Strike
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            If you believe a strike was applied unfairly, you can submit an appeal for review.
            Our team will review your case and respond.
          </p>
        </div>

        {trustError && (
          <div className="mb-[var(--space-lg)] p-[var(--space-md)] bg-red-50 border border-red-200 rounded-[var(--radius-sm)] text-sm text-red-700">
            {trustError}
          </div>
        )}

        {/* Current status */}
        <section className="mb-[var(--space-2xl)]">
          <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-[var(--space-md)]">
            Current Status
          </h2>
          <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-[var(--space-lg)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--color-ink)]">
                  {strikes} strike{strikes !== 1 ? 's' : ''} on your account
                </p>
                <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                  Trust tier: {trustTier.replace('-', ' ')}
                </p>
              </div>
              {strikes >= 2 && (
                <div className="flex items-center gap-[var(--space-xs)] text-sm text-[var(--color-ink-muted)]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{strikes >= 3 ? 'Account suspended' : 'One more strike = suspension'}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Strike history */}
        {strikeHistory.length > 0 && (
          <section className="mb-[var(--space-2xl)]">
            <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-[var(--space-md)]">
              Strike History
            </h2>
            <div className="space-y-[var(--space-sm)]">
              {strikeHistory.map((strike) => (
                <div
                  key={strike.id}
                  className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-[var(--space-md)]"
                >
                  <div className="flex items-start justify-between gap-[var(--space-md)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-ink)]">
                        {strike.reason}
                      </p>
                      <p className="text-xs text-[var(--color-ink-subtle)] mt-1">
                        {new Date(strike.created_at).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    {pendingAppealStrikeIds.has(strike.id) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]">
                        Appeal pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Appeal form */}
        {appealableStrikes.length > 0 && (
          <section className="mb-[var(--space-2xl)]">
            <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-[var(--space-md)]">
              Submit an Appeal
            </h2>

            {submitSuccess && (
              <div className="mb-[var(--space-md)] p-[var(--space-md)] bg-green-50 border border-green-200 rounded-[var(--radius-sm)] text-sm text-green-700">
                Your appeal has been submitted. We'll review it and get back to you.
              </div>
            )}

            {submitError && (
              <div className="mb-[var(--space-md)] p-[var(--space-md)] bg-red-50 border border-red-200 rounded-[var(--radius-sm)] text-sm text-red-700">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-[var(--space-lg)]">
              {/* Strike selector */}
              {appealableStrikes.length > 1 && (
                <div className="mb-[var(--space-lg)]">
                  <label htmlFor="strike-select" className="block text-sm font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
                    Which strike are you appealing?
                  </label>
                  <select
                    id="strike-select"
                    value={selectedStrikeId}
                    onChange={(e) => setSelectedStrikeId(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="">Select a strike...</option>
                    {appealableStrikes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.reason} — {new Date(s.created_at).toLocaleDateString('en-AU')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {appealableStrikes.length === 1 && (
                <input type="hidden" value={appealableStrikes[0].id} />
              )}

              {/* Reason */}
              <div className="mb-[var(--space-lg)]">
                <label htmlFor="appeal-reason" className="block text-sm font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
                  Explain your situation
                </label>
                <textarea
                  id="appeal-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  required
                  placeholder="Tell us why you think this strike should be removed..."
                  className="w-full px-3 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-ink)] text-sm placeholder:text-[var(--color-ink-subtle)] focus:outline-none focus:border-[var(--color-primary)] resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !reason.trim()}
                className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Appeal'}
              </button>
            </form>
          </section>
        )}

        {/* Past appeals */}
        {appeals.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-[var(--space-md)]">
              Your Appeals
            </h2>
            <div className="space-y-[var(--space-sm)]">
              {appeals.map((appeal) => {
                const config = statusConfig[appeal.status];
                const Icon = config.icon;

                return (
                  <div
                    key={appeal.id}
                    className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-[var(--space-md)]"
                  >
                    <div className="flex items-start justify-between gap-[var(--space-md)] mb-[var(--space-xs)]">
                      <p className="text-sm text-[var(--color-ink)]">{appeal.reason}</p>
                      <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${config.bgColor} ${config.color}`}>
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-ink-subtle)]">
                      Submitted {new Date(appeal.created_at).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    {appeal.admin_notes && appeal.status === 'rejected' && (
                      <p className="text-xs text-[var(--color-ink-muted)] mt-[var(--space-xs)] italic">
                        Admin: {appeal.admin_notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
