import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardOverview, PlatformMetrics } from '@/components/admin';

export default function AdminOverviewPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            Platform Overview
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Marketplace health and critical alerts at a glance
          </p>
        </div>

        {/* Critical alerts + system health */}
        <DashboardOverview />

        {/* Key metrics summary */}
        <PlatformMetrics />
      </div>
    </ErrorBoundary>
  );
}
