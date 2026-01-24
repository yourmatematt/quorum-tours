import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PlatformMetrics } from '@/components/admin';

export default function AdminMetricsPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            Platform Metrics
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Revenue, tour success rates, user growth, and operator funnel
          </p>
        </div>

        <PlatformMetrics />
      </div>
    </ErrorBoundary>
  );
}
