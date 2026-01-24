import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AlertsMonitoring } from '@/components/admin';

export default function AdminAlertsPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            Alerts & Monitoring
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            System health, fraud detection, and user-reported issues
          </p>
        </div>

        <AlertsMonitoring />
      </div>
    </ErrorBoundary>
  );
}
