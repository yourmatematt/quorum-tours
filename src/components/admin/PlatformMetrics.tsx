'use client';

/**
 * Platform Metrics Section
 * Revenue tracking, tour success rates, user growth, operator funnel
 */

import { AdminCollapsible } from './AdminCollapsible';
import { AdminCard } from './AdminSection';

export function PlatformMetrics() {
  // Mock data
  const metrics = {
    revenue: {
      escrowed: 284750,
      paidOut: 156230,
      commission: 28475,
    },
    tours: {
      quorumReachedRate: 73,
      totalActive: 47,
      completedThisMonth: 12,
    },
    users: {
      totalActive: 3847,
      newThisWeek: 142,
      retentionRate: 68,
    },
    operators: {
      totalVerified: 89,
      pendingVerification: 8,
      onboardingCompletionRate: 82,
    },
  };

  return (
    <AdminCollapsible
      title="Platform Metrics"
      subtitle="Revenue, tour success rates, user growth, operator funnel"
      actions={
        <select className="px-3 py-1 text-xs border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>Year to date</option>
        </select>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue */}
        <AdminCard className="p-5">
          <h3 className="font-medium text-[var(--color-ink)] mb-4">
            Revenue Tracking
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Escrowed
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-forming)]">
                ${metrics.revenue.escrowed.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Paid Out
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-confirmed)]">
                ${metrics.revenue.paidOut.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t-2 border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Platform Commission
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-primary)]">
                ${metrics.revenue.commission.toLocaleString()}
              </span>
            </div>
          </div>
        </AdminCard>

        {/* Tour Success */}
        <AdminCard className="p-5">
          <h3 className="font-medium text-[var(--color-ink)] mb-4">
            Tour Success Rates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Quorum Reached
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-confirmed)]">
                {metrics.tours.quorumReachedRate}%
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Active Tours
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                {metrics.tours.totalActive}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Completed This Month
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                {metrics.tours.completedThisMonth}
              </span>
            </div>
          </div>
        </AdminCard>

        {/* Users */}
        <AdminCard className="p-5">
          <h3 className="font-medium text-[var(--color-ink)] mb-4">
            User Growth
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Total Active
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                {metrics.users.totalActive.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                New This Week
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-confirmed)]">
                +{metrics.users.newThisWeek}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Retention Rate
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                {metrics.users.retentionRate}%
              </span>
            </div>
          </div>
        </AdminCard>

        {/* Operators */}
        <AdminCard className="p-5">
          <h3 className="font-medium text-[var(--color-ink)] mb-4">
            Operator Onboarding
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Total Verified
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                {metrics.operators.totalVerified}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Pending Verification
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-forming)]">
                {metrics.operators.pendingVerification}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[var(--color-ink-muted)]">
                Completion Rate
              </span>
              <span className="font-mono text-lg font-semibold text-[var(--color-ink)]">
                {metrics.operators.onboardingCompletionRate}%
              </span>
            </div>
          </div>
        </AdminCard>
      </div>
    </AdminCollapsible>
  );
}
