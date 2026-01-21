/**
 * Platform Metrics Section
 * Revenue tracking, tour success rates, user growth, operator funnel
 */

export function PlatformMetrics() {
  // Mock data
  const metrics = {
    revenue: {
      escrowed: 284750,
      paidOut: 156230,
      commission: 28475,
    },
    tours: {
      thresholdReachedRate: 73,
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
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        Platform Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="border border-border rounded-lg p-5 bg-surface">
          <h3 className="font-medium text-ink mb-4">Revenue Tracking</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Escrowed</span>
              <span className="font-mono text-lg font-semibold text-forming">
                ${metrics.revenue.escrowed.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Paid Out</span>
              <span className="font-mono text-lg font-semibold text-confirmed">
                ${metrics.revenue.paidOut.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t border-border">
              <span className="text-sm text-ink-muted">Platform Commission</span>
              <span className="font-mono text-lg font-semibold text-accent">
                ${metrics.revenue.commission.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tour Success */}
        <div className="border border-border rounded-lg p-5 bg-surface">
          <h3 className="font-medium text-ink mb-4">Tour Success Rates</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Threshold Reached</span>
              <span className="font-mono text-lg font-semibold text-confirmed">
                {metrics.tours.thresholdReachedRate}%
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Active Tours</span>
              <span className="font-mono text-lg font-semibold text-ink">
                {metrics.tours.totalActive}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Completed This Month</span>
              <span className="font-mono text-lg font-semibold text-ink">
                {metrics.tours.completedThisMonth}
              </span>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="border border-border rounded-lg p-5 bg-surface">
          <h3 className="font-medium text-ink mb-4">User Growth</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Total Active</span>
              <span className="font-mono text-lg font-semibold text-ink">
                {metrics.users.totalActive.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">New This Week</span>
              <span className="font-mono text-lg font-semibold text-confirmed">
                +{metrics.users.newThisWeek}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Retention Rate</span>
              <span className="font-mono text-lg font-semibold text-ink">
                {metrics.users.retentionRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Operators */}
        <div className="border border-border rounded-lg p-5 bg-surface">
          <h3 className="font-medium text-ink mb-4">Operator Onboarding</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Total Verified</span>
              <span className="font-mono text-lg font-semibold text-ink">
                {metrics.operators.totalVerified}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Pending Verification</span>
              <span className="font-mono text-lg font-semibold text-forming">
                {metrics.operators.pendingVerification}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-ink-muted">Completion Rate</span>
              <span className="font-mono text-lg font-semibold text-ink">
                {metrics.operators.onboardingCompletionRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
