import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuditLog } from '@/components/admin';

export default function AdminAuditPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            Audit Log
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Admin action history for compliance and transparency
          </p>
        </div>

        <AuditLog />
      </div>
    </ErrorBoundary>
  );
}
