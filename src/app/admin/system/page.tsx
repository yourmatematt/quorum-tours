import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SystemHealthDashboard } from '@/components/admin/SystemHealthDashboard';

export default function SystemHealthPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
            System Health
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">
            Monitor service status and run diagnostics
          </p>
        </div>

        {/* Health Dashboard */}
        <SystemHealthDashboard />
      </div>
    </ErrorBoundary>
  );
}
