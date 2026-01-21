import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  DashboardOverview,
  OperatorVerificationQueue,
  TourOversight,
  UserManagement,
  PlatformMetrics,
  AlertsMonitoring,
  AuditLog,
} from '@/components/admin';

export default function AdminDashboardPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <header className="border-b border-border-strong bg-surface-raised">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Platform Administration
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Marketplace integrity and operational health
          </p>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
        {/* Section 1: Dashboard Overview (Critical alerts + health summary) */}
        <DashboardOverview />

        {/* Section 2: Operator Verification Queue */}
        <OperatorVerificationQueue />

        {/* Section 3: Tour Oversight */}
        <TourOversight />

        {/* Section 4: User Management */}
        <UserManagement />

        {/* Section 5: Platform Metrics */}
        <PlatformMetrics />

        {/* Section 6: Alerts & Monitoring */}
        <AlertsMonitoring />

        {/* Section 7: Audit Log */}
        <AuditLog />
      </main>
    </div>
    </ErrorBoundary>
  );
}
