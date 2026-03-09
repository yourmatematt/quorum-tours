'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/useAuth';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [notifyChaseList, setNotifyChaseList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  // Load profile data
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, display_name, email')
        .eq('id', user.id)
        .single();

      if (profile) {
        setDisplayName(profile.display_name || profile.name || '');
        setEmail(profile.email || user.email || '');
      } else {
        setEmail(user.email || '');
      }

      // Load local preferences
      const savedLocation = localStorage.getItem(`qt_location_${user.id}`);
      if (savedLocation) setLocation(savedLocation);

      const savedNotify = localStorage.getItem(`qt_notify_chase_${user.id}`);
      if (savedNotify === 'true') setNotifyChaseList(true);

      setIsLoading(false);
    };

    loadProfile();
  }, [user, supabase]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('id', user.id);

      if (error) {
        setSaveMessage({ type: 'error', text: 'Failed to save. Please try again.' });
        return;
      }

      // Save local preferences
      localStorage.setItem(`qt_location_${user.id}`, location);
      localStorage.setItem(`qt_notify_chase_${user.id}`, String(notifyChaseList));

      setSaveMessage({ type: 'success', text: 'Settings saved.' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return (
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-8 pb-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[var(--color-border)] rounded w-48" />
            <div className="h-40 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
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
              Sign in to access settings
            </h1>
            <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
              You need to be signed in to manage your account settings.
            </p>
            <Link
              href="/login?redirect=/profile/settings"
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
          Account Settings
        </h1>

        {/* Personal Information */}
        <section className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] p-5 sm:p-6 mb-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)] mb-4">
            Personal Information
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Display name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] cursor-not-allowed"
              />
              <p className="text-xs text-[var(--color-ink-subtle)] mt-1">
                Email is managed through your login and cannot be changed here.
              </p>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Melbourne, Victoria"
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] p-5 sm:p-6 mb-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)] mb-4">
            Preferences
          </h2>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifyChaseList}
              onChange={(e) => setNotifyChaseList(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <span className="text-sm text-[var(--color-ink)]">
              Notify me when a tour matches my chase list
            </span>
          </label>
        </section>

        {/* Save Button */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
          {saveMessage && (
            <p className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage.text}
            </p>
          )}
        </div>

        {/* Danger Zone */}
        <section className="border border-red-200 rounded-[var(--radius-organic)] p-5 sm:p-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-red-600 mb-3">
            Danger Zone
          </h2>
          <p className="text-sm text-[var(--color-ink-muted)] mb-4">
            Permanently delete your account and all associated data.
          </p>
          <button
            onClick={() => { setShowDeleteModal(true); setDeleteConfirmed(false); }}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-[var(--radius-organic)] hover:bg-red-50 transition-colors"
          >
            Delete my account
          </button>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[var(--radius-organic)] shadow-xl max-w-md w-full mx-4 p-6">
            {!deleteConfirmed ? (
              <>
                <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
                  Delete your account?
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] mb-6">
                  This will permanently delete your account and all your data. This cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:bg-[var(--color-surface)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDeleteConfirmed(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-[var(--radius-organic)] hover:bg-red-700 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-display text-lg font-semibold text-[var(--color-ink)] mb-3">
                  Contact us to proceed
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] mb-6">
                  To delete your account, please email us at{' '}
                  <a href="mailto:hello@quorumtours.com" className="text-[var(--color-primary)] hover:underline">
                    hello@quorumtours.com
                  </a>{' '}
                  and we will process your request.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-ink)] border border-[var(--color-border)] rounded-[var(--radius-organic)] hover:bg-[var(--color-surface)] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
