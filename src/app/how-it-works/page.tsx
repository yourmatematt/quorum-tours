import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import {
  HowItWorksHero,
  ProblemSection,
  MechanicSection,
  FailureCaseSection,
  ConfirmationSection,
  BoundariesSection,
  TrustSystemSection,
  ClosingCTA,
} from '@/components/how-it-works';

export const metadata: Metadata = {
  title: 'How It Works — Quorum Tours',
  description:
    'Learn how quorum-based tour confirmation works. Understand the mechanics, what happens if a tour doesn\'t run, and what confirmation means.',
};

export default function HowItWorksPage() {
  return (
    <ErrorBoundary>
      <main>
        {/* Hero with audience disambiguation */}
        <HowItWorksHero />

        {/* Birder content - anchor target */}
        <div id="birders" className="scroll-mt-8">
          {/* Section 1: The Problem */}
          <ProblemSection />

          {/* Section 2: The Quorum Mechanic */}
          <MechanicSection />

          {/* Section 3: What Happens If Tour Doesn't Run */}
          <FailureCaseSection />

          {/* Section 4: What Confirmation Means */}
          <ConfirmationSection />

          {/* Section 5: What Quorum Does Not Do */}
          <BoundariesSection />

          {/* Section 6: Our Trust System */}
          <TrustSystemSection />

          {/* Section 7: Closing CTA */}
          <ClosingCTA />
        </div>
      </main>
    </ErrorBoundary>
  );
}
