import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardOverview } from '@/components/admin';

export default function AdminOverviewPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
            Platform Overview
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">
            Marketplace health and critical alerts at a glance
          </p>
        </div>

        {/* Compact dashboard - fits in one viewport */}
        <DashboardOverview />
      </div>
    </ErrorBoundary>
  );
}
