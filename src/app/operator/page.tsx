import { DashboardHome } from '@/components/operator';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function OperatorDashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardHome />
    </ErrorBoundary>
  );
}
