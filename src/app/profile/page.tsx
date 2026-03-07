'use client';

import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  ProfileHeader,
  EnhancedTourCard,
  TrustStatusCard,
  ChaseListSection,
  PastToursSection,
  SettingsSection,
} from '@/components/profile';
import { useAuth } from '@/lib/supabase/useAuth';
import { useProfileDashboard } from '@/hooks/useProfileDashboard';
import { useChaseList } from '@/hooks/useChaseList';

/**
 * Profile Page - User Dashboard
 *
 * Layout:
 * - Compact inline header with trust badge
 * - UPCOMING TOURS section with Browse more link
 * - Tour cards as main content
 * - Past Tours collapsed below tours
 * - Right sidebar: Trust Status, Chase List, Account
 */

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const {
    displayName,
    memberSince,
    trustTier,
    completedTours,
    strikeCount,
    commitments,
    pastTours,
    isLoading: profileLoading,
    error,
  } = useProfileDashboard(user?.id ?? null);
  const { birds: chaseBirds, addBird, removeBird } = useChaseList(user?.id ?? null);

  const isLoading = authLoading || profileLoading;

  // Loading state
  if (isLoading) {
    return (
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between py-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[var(--color-border)]" />
                <div>
                  <div className="h-5 bg-[var(--color-border)] rounded w-32 mb-1" />
                  <div className="h-4 bg-[var(--color-border)] rounded w-24" />
                </div>
              </div>
              <div className="h-8 bg-[var(--color-border)] rounded-full w-40" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
              <div className="lg:col-span-8 space-y-4">
                <div className="h-48 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
                <div className="h-48 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
              </div>
              <div className="lg:col-span-4 space-y-4">
                <div className="h-36 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
                <div className="h-48 bg-[var(--color-border)] rounded-[var(--radius-organic)]" />
              </div>
            </div>
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
              Sign in to view your dashboard
            </h1>
            <p className="text-[var(--color-ink-muted)] mb-[var(--space-lg)]">
              Your tour commitments, chase list, and account settings live here.
            </p>
            <Link
              href="/login?redirect=/profile"
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
    <ErrorBoundary>
      <main className="bg-[var(--color-surface)] min-h-screen">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
          {/* Compact Profile Header */}
          <ProfileHeader
            displayName={displayName}
            memberSince={memberSince}
            trustTier={trustTier}
          />

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[var(--radius-sm)] text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
            {/* Left Column: Tours (8 cols on desktop) */}
            <div className="lg:col-span-8">
              {/* UPCOMING TOURS section header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-ink-subtle)]">
                  Upcoming Tours
                </h2>
                <a
                  href="/tours"
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  Browse more →
                </a>
              </div>

              {/* Tour Cards */}
              {commitments.length > 0 ? (
                <div className="space-y-4">
                  {commitments.map((commitment) => (
                    <EnhancedTourCard
                      key={commitment.tourId}
                      {...commitment}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
                  <div className="text-center py-12 px-6">
                    <p className="text-[var(--color-ink-muted)] mb-3">
                      No active commitments yet.
                    </p>
                    <a
                      href="/tours"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                      Browse tours
                    </a>
                  </div>
                </div>
              )}

              {/* Past Tours - collapsed, below tour cards */}
              {pastTours.length > 0 && (
                <div className="mt-4">
                  <PastToursSection tours={pastTours} />
                </div>
              )}
            </div>

            {/* Right Column: Sidebar (4 cols on desktop) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Trust Status */}
              <TrustStatusCard
                trustTier={trustTier}
                completedTours={completedTours}
                strikeCount={strikeCount}
              />

              {/* Chase List - Primary sidebar element */}
              <ChaseListSection
                birds={chaseBirds}
                onAdd={addBird}
                onRemove={removeBird}
              />

              {/* Account Section - Demoted to bottom */}
              <SettingsSection />
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
