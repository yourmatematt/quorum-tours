import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OperatorDirectory, OperatorVerificationQueue, FeaturedOperators } from '@/components/admin';

export default function AdminOperatorsPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            Operator Management
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Monitor operator performance and review applications
          </p>
        </div>

        <FeaturedOperators />
        <OperatorDirectory />
        <OperatorVerificationQueue />
      </div>
    </ErrorBoundary>
  );
}
