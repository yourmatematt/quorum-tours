import { EarningsView } from '@/components/operator/earnings/EarningsView';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function EarningsPage() {
  return (
    <ErrorBoundary>
      <EarningsView />
    </ErrorBoundary>
  );
}
