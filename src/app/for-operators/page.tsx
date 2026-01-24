import { Metadata } from 'next';
import {
  OperatorHero,
  ProblemStatement,
  HowItWorks,
  TrustTransparency,
  SocialProof,
  FAQSection,
  OperatorCTA,
} from '@/components/for-operators';

/**
 * For Operators Landing Page
 *
 * PRD: PRD-FOR-OPERATORS-001
 * Target audience: Wildlife tour operators aged 50-70
 *
 * Page structure follows operator's mental journey:
 * 1. Recognition - "This page understands my problem"
 * 2. Interest - "This could solve it"
 * 3. Understanding - "Here's how it works"
 * 4. Trust - "Others like me use it"
 * 5. Evaluation - "What does it cost?"
 * 6. Action - "How do I start?"
 *
 * Section order:
 * 1. Hero (above fold)
 * 2. Problem Statement (emotional hook)
 * 3. How It Works (process)
 * 4. Trust & Transparency (pricing)
 * 5. Social Proof (testimonials)
 * 6. FAQ (objections)
 * 7. CTA (conversion)
 */

export const metadata: Metadata = {
  title: 'For Tour Operators | Quorum Tours - Tours That Run When Ready',
  description:
    'Stop gambling on tour viability. Quorum Tours helps wildlife tour operators list tours with minimum thresholds—cards aren\'t charged until you\'re ready to run. 6% commission only on successful bookings.',
  openGraph: {
    title: 'For Tour Operators | Quorum Tours',
    description:
      'Stop gambling on tour viability. List tours with minimum thresholds. Cards aren\'t charged until you\'re ready to run.',
    type: 'website',
  },
};

export default function ForOperatorsPage() {
  return (
    <main>
      {/* Section 1: Hero - Instant recognition */}
      <OperatorHero />

      {/* Section 2: Problem Statement - Emotional hook */}
      <ProblemStatement />

      {/* Section 3: How It Works - Process explanation */}
      <HowItWorks />

      {/* Section 4: Trust & Transparency - Pricing, money flow */}
      <TrustTransparency />

      {/* Section 5: Social Proof - Operator testimonials */}
      <SocialProof />

      {/* Section 6: FAQ - Address objections */}
      <FAQSection />

      {/* Section 7: CTA - Final conversion */}
      <OperatorCTA />
    </main>
  );
}
