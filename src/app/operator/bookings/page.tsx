import { BookingsView } from '@/components/operator/bookings/BookingsView';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function BookingsPage() {
  return (
    <ErrorBoundary>
      <BookingsView />
    </ErrorBoundary>
  );
}
