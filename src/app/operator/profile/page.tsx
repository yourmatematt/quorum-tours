import { Suspense } from 'react';
import { ProfileView } from '@/components/operator/profile/ProfileView';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <Suspense>
        <ProfileView />
      </Suspense>
    </ErrorBoundary>
  );
}
