'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AdminCollapsible } from './AdminCollapsible';
import { Scale, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface AppealWithUser {
  id: string;
  user_id: string;
  strike_history_id: string | null;
  reason: string;
  status: string;
  created_at: string;
  user_email: string;
  user_name: string;
  user_strikes: number;
  strike_reason: string | null;
  strike_date: string | null;
}

/**
 * AppealsQueue - Admin queue for reviewing strike appeals
 *
 * Shows pending appeals with user context and approve/reject actions.
 */
export function AppealsQueue() {
  const [appeals, setAppeals] = useState<AppealWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchAppeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Fetch pending appeals with user info
      const { data: appealsData, error: appealsError } = await supabase
        .from('appeals')
        .select(`
          id, user_id, strike_history_id, reason, status, created_at,
          profiles!appeals_user_id_fkey ( display_name, email, strikes ),
          strike_history ( reason, created_at )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (appealsError) {
        setError(appealsError.message);
        return;
      }

      const mapped: AppealWithUser[] = (appealsData || []).map((a: any) => ({
        id: a.id,
        user_id: a.user_id,
        strike_history_id: a.strike_history_id,
        reason: a.reason,
        status: a.status,
        created_at: a.created_at,
        user_email: a.profiles?.email || 'Unknown',
        user_name: a.profiles?.display_name || 'Unknown user',
        user_strikes: a.profiles?.strikes ?? 0,
        strike_reason: a.strike_history?.reason || null,
        strike_date: a.strike_history?.created_at || null,
      }));

      setAppeals(mapped);
    } catch (err) {
      setError('Failed to fetch appeals');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppeals();
  }, [fetchAppeals]);

  async function handleAction(appealId: string, action: 'approve' | 'reject') {
    setActionInProgress(appealId);

    try {
      const res = await fetch(`/api/admin/appeals/${appealId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          adminNotes: action === 'reject' ? adminNotes : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Action failed.');
        return;
      }

      // Remove from list
      setAppeals((prev) => prev.filter((a) => a.id !== appealId));
      setRejectingId(null);
      setAdminNotes('');
    } catch {
      setError('Something went wrong.');
    } finally {
      setActionInProgress(null);
    }
  }

  if (isLoading) {
    return (
      <AdminCollapsible
        title="Strike Appeals"
        subtitle="Loading..."
        badge={0}
      >
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-[var(--color-border)] rounded-[var(--radius-sm)]" />
          ))}
        </div>
      </AdminCollapsible>
    );
  }

  return (
    <AdminCollapsible
      title="Strike Appeals"
      subtitle={`${appeals.length} pending review`}
      badge={appeals.length}
      badgeVariant={appeals.length > 0 ? 'warning' : 'default'}
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[var(--radius-sm)] text-sm text-red-700">
          {error}
        </div>
      )}

      {appeals.length === 0 ? (
        <div className="text-center py-8">
          <Scale className="w-8 h-8 text-[var(--color-ink-subtle)] mx-auto mb-2" />
          <p className="text-sm text-[var(--color-ink-muted)]">No pending appeals</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appeals.map((appeal) => (
            <div
              key={appeal.id}
              className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4"
            >
              {/* User info */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-medium text-[var(--color-ink)]">
                    {appeal.user_name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {appeal.user_email}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{appeal.user_strikes} strike{appeal.user_strikes !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Strike context */}
              {appeal.strike_reason && (
                <div className="mb-3 p-2 bg-[var(--color-surface-sunken)] rounded-[var(--radius-sm)]">
                  <p className="text-xs text-[var(--color-ink-subtle)] mb-0.5">Original strike</p>
                  <p className="text-sm text-[var(--color-ink)]">{appeal.strike_reason}</p>
                  {appeal.strike_date && (
                    <p className="text-xs text-[var(--color-ink-subtle)] mt-0.5">
                      {new Date(appeal.strike_date).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              )}

              {/* Appeal reason */}
              <div className="mb-3">
                <p className="text-xs text-[var(--color-ink-subtle)] mb-0.5">Appeal reason</p>
                <p className="text-sm text-[var(--color-ink)]">{appeal.reason}</p>
                <p className="text-xs text-[var(--color-ink-subtle)] mt-1">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {new Date(appeal.created_at).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Reject notes form */}
              {rejectingId === appeal.id && (
                <div className="mb-3">
                  <label className="block text-xs text-[var(--color-ink-muted)] mb-1">
                    Rejection reason (optional, visible to user)
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-ink)] text-sm focus:outline-none focus:border-[var(--color-primary)] resize-y"
                    placeholder="Explain why this appeal is rejected..."
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {rejectingId === appeal.id ? (
                  <>
                    <button
                      onClick={() => handleAction(appeal.id, 'reject')}
                      disabled={actionInProgress === appeal.id}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-[var(--radius-sm)] hover:bg-red-100 disabled:opacity-50 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Confirm Reject
                    </button>
                    <button
                      onClick={() => {
                        setRejectingId(null);
                        setAdminNotes('');
                      }}
                      className="px-3 py-1.5 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAction(appeal.id, 'approve')}
                      disabled={actionInProgress === appeal.id}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-[var(--radius-sm)] hover:bg-green-100 disabled:opacity-50 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectingId(appeal.id)}
                      disabled={actionInProgress === appeal.id}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-[var(--radius-sm)] hover:bg-red-100 disabled:opacity-50 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminCollapsible>
  );
}
