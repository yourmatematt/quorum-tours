'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/supabase/useAuth';
import { useOperatorApplications } from '@/hooks/useOperatorApplications';
import { FormAlert } from '@/components/auth/FormAlert';
import Link from 'next/link';

export function ApplicationStatus(): JSX.Element {
  const { user, isLoading: authLoading } = useAuth();
  const { applications, isLoading: appsLoading, refetch } = useOperatorApplications(
    undefined,
    user?.id
  );

  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (authLoading || appsLoading) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 sm:p-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-[var(--color-surface-sunken)] rounded w-48 mx-auto" />
          <div className="h-4 bg-[var(--color-surface-sunken)] rounded w-64 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 sm:p-12 text-center">
        <h2 className="font-display text-2xl text-[var(--color-ink)] mb-3">
          Check Your Application Status
        </h2>
        <p className="text-[var(--color-ink-muted)] mb-6">
          Log in to check the status of your operator application.
        </p>
        <Link
          href="/login?redirect=/apply/status"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Log In
        </Link>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 sm:p-12 text-center">
        <h2 className="font-display text-2xl text-[var(--color-ink)] mb-3">
          No Applications Found
        </h2>
        <p className="text-[var(--color-ink-muted)] mb-6">
          We couldn&apos;t find any operator applications linked to your account.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Apply Now
        </Link>
      </div>
    );
  }

  async function handleRespond(applicationId: string) {
    if (!responseText.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch(`/api/operator-applications/${applicationId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: responseText.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitSuccess(true);
      setRespondingTo(null);
      setResponseText('');
      refetch();
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusConfig = {
    pending: {
      label: 'Under Review',
      color: 'var(--color-accent)',
      bgColor: 'var(--color-accent-bg, #FDF6E3)',
    },
    approved: {
      label: 'Approved',
      color: 'var(--color-confirmed)',
      bgColor: 'var(--color-confirmed-bg)',
    },
    rejected: {
      label: 'Not Approved',
      color: 'var(--color-danger)',
      bgColor: 'var(--color-danger-bg, #FEF2F2)',
    },
    more_info_requested: {
      label: 'More Info Requested',
      color: 'var(--color-accent)',
      bgColor: 'var(--color-accent-bg, #FDF6E3)',
    },
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-ink)] mb-3">
          Application Status
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg">
          Track the progress of your operator application.
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6">
          <FormAlert variant="success">
            Your response has been sent. We&apos;ll review it and get back to you.
          </FormAlert>
        </div>
      )}

      <div className="space-y-4">
        {applications.map((app) => {
          const config = statusConfig[app.status];

          return (
            <div
              key={app.id}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl text-[var(--color-ink)]">
                    {app.business_name}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-subtle)] mt-1">
                    Applied {new Date(app.created_at).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    color: config.color,
                    backgroundColor: config.bgColor,
                  }}
                >
                  {config.label}
                </span>
              </div>

              {/* Status-specific content */}
              {app.status === 'pending' && (
                <p className="text-[var(--color-ink-muted)]">
                  Your application is under review. We aim to respond within 48 hours.
                </p>
              )}

              {app.status === 'approved' && (
                <div>
                  <p className="text-[var(--color-ink-muted)] mb-4">
                    You&apos;ve been approved! Your operator dashboard is ready.
                  </p>
                  <Link
                    href="/operator"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}

              {app.status === 'rejected' && (
                <div>
                  <p className="text-[var(--color-ink-muted)] mb-2">
                    Your application was not approved at this time.
                  </p>
                  {app.admin_notes && (
                    <div className="bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 mb-4">
                      <p className="text-sm font-medium text-[var(--color-ink)] mb-1">Feedback:</p>
                      <p className="text-sm text-[var(--color-ink-muted)]">{app.admin_notes}</p>
                    </div>
                  )}
                  <p className="text-sm text-[var(--color-ink-subtle)]">
                    If you believe this was an error or your circumstances have changed, you can{' '}
                    <Link href="/apply" className="text-[var(--color-primary)] hover:underline">
                      submit a new application
                    </Link>{' '}
                    or contact us at{' '}
                    <a href="mailto:hello@quorumtours.com" className="text-[var(--color-primary)] hover:underline">
                      hello@quorumtours.com
                    </a>.
                  </p>
                </div>
              )}

              {app.status === 'more_info_requested' && (
                <div>
                  {/* Admin's message */}
                  <div className="bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 mb-4">
                    <p className="text-sm font-medium text-[var(--color-ink)] mb-1">
                      We need some additional information:
                    </p>
                    <p className="text-sm text-[var(--color-ink-muted)] whitespace-pre-wrap">
                      {app.admin_notes}
                    </p>
                  </div>

                  {/* Response form */}
                  {respondingTo === app.id ? (
                    <div className="space-y-3">
                      {submitError && <FormAlert variant="error">{submitError}</FormAlert>}
                      <textarea
                        rows={4}
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Type your response here..."
                        className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRespond(app.id)}
                          disabled={isSubmitting || !responseText.trim()}
                          className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Response'}
                        </button>
                        <button
                          onClick={() => {
                            setRespondingTo(null);
                            setResponseText('');
                            setSubmitError(null);
                          }}
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center px-5 py-2.5 border border-[var(--color-border)] text-[var(--color-ink)] rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-surface-sunken)] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRespondingTo(app.id)}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                      Respond
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
