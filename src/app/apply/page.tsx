import { Metadata } from 'next';
import { OperatorApplicationForm } from '@/components/for-operators/OperatorApplicationForm';

export const metadata: Metadata = {
  title: 'Apply to List Tours | Quorum Tours',
  description: 'Apply to become a tour operator on Quorum Tours. Tell us about your operation and we\'ll be in touch within 48 hours.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-sunken)]">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <OperatorApplicationForm />
      </div>
    </main>
  );
}
