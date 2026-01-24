import { CreateTourWizard } from '@/components/operator/tours/CreateTourWizard';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function CreateTourPage() {
  return (
    <ErrorBoundary>
      <CreateTourWizard />
    </ErrorBoundary>
  );
}
