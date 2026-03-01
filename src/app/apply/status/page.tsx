import { Metadata } from 'next';
import { ApplicationStatus } from '@/components/for-operators/ApplicationStatus';

export const metadata: Metadata = {
  title: 'Application Status | Quorum Tours',
  description: 'Check the status of your operator application.',
};

export default function ApplicationStatusPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-sunken)]">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <ApplicationStatus />
      </div>
    </main>
  );
}
