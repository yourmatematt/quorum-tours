import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import {
  HowItWorksHero,
  MechanicSection,
  BenefitsSection,
  ClosingCTA,
} from '@/components/how-it-works';

export const metadata: Metadata = {
  title: 'How It Works — Quorum Tours',
  description:
    'Tours run when enough people commit. No gambling on viability, no last-minute cancellations. Understand the four-step quorum mechanic.',
};

export default function HowItWorksPage() {
  return (
    <ErrorBoundary>
      <main>
        {/* Section 1: Hero with audience disambiguation */}
        <HowItWorksHero />

        {/* Section 2: Core Mechanic - Four step flow */}
        <MechanicSection />

        {/* Section 3: Two-column benefits split */}
        <BenefitsSection />

        {/* Section 4: Final CTA */}
        <ClosingCTA />
      </main>
    </ErrorBoundary>
  );
}
