import { ErrorBoundary } from '@/components/ErrorBoundary';
import { TourOversight } from '@/components/admin';

export default function AdminToursPage() {
  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
            Tour Oversight
          </h1>
          <p className="text-[var(--color-ink-muted)] mt-2">
            Monitor tour progress and quorum status
          </p>
        </div>

        <TourOversight />
      </div>
    </ErrorBoundary>
  );
}
