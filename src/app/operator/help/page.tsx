import { HelpView } from '@/components/operator/help/HelpView';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function HelpPage() {
  return (
    <ErrorBoundary>
      <HelpView />
    </ErrorBoundary>
  );
}
