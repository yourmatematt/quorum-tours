'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';

export default function NotificationsPage() {
  const { user, isLoading: authLoading } = useAuth();

  const [notifyChaseList, setNotifyChaseList] = useState(false);
  const [notifyTourUpdates, setNotifyTourUpdates] = useState(true);
  const [notifyQuorumReached, setNotifyQuorumReached] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`qt_notify_prefs_${user.id}`);
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        setNotifyChaseList(prefs.chaseList ?? false);
        setNotifyTourUpdates(prefs.tourUpdates ?? true);
        setNotifyQuorumReached(prefs.quorumReached ?? true);
      } catch {
        // ignore invalid JSON
      }
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);

    localStorage.setItem(`qt_notify_prefs_${user.id}`, JSON.stringify({
      chaseList: notifyChaseList,
      tourUpdates: notifyTourUpdates,
      quorumReached: notifyQuorumReached,
    }));

    setSaveMessage({ type: 'success', text: 'Notification preferences saved.' });
    setIsSaving(false);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  if (authLoading) {
    return (
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-8 pb-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[var(--color-border)] rounded w-40" />
            <div className="h-40 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full max-w-md mx-auto px-4 text-center">
            <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-[var(--space-sm)]">
              Sign in to manage notifications
            </h1>
            <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
              You need to be signed in to manage your notification preferences.
            </p>
            <Link
              href="/login?redirect=/profile/notifications"
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
          Notifications
        </h1>

        <section className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] p-5 sm:p-6 mb-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)] mb-4">
            Email Notifications
          </h2>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyChaseList}
                onChange={(e) => setNotifyChaseList(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-ink)]">Chase list matches</span>
                <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                  Get notified when a new tour targets species on your chase list.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyTourUpdates}
                onChange={(e) => setNotifyTourUpdates(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-ink)]">Tour updates</span>
                <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                  Updates about tours you have committed to.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyQuorumReached}
                onChange={(e) => setNotifyQuorumReached(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-ink)]">Quorum reached</span>
                <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                  Get notified when a tour you committed to reaches its quorum.
                </p>
              </div>
            </label>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : 'Save preferences'}
          </button>
          {saveMessage && (
            <p className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage.text}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
