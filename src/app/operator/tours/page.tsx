import { MyToursView } from '@/components/operator/tours/MyToursView';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function MyToursPage() {
  return (
    <ErrorBoundary>
      <MyToursView />
    </ErrorBoundary>
  );
}
