import { Metadata } from 'next';
import { OperatorHero } from '@/components/for-operators/OperatorHero';
import { HumanSupportSection } from '@/components/for-operators/HumanSupportSection';
import { ProblemAgitationSection } from '@/components/for-operators/ProblemAgitationSection';
import { ThresholdMechanicSection } from '@/components/for-operators/ThresholdMechanicSection';
import { FinancialTransparencySection } from '@/components/for-operators/FinancialTransparencySection';
import { BeforeAfterSection } from '@/components/for-operators/BeforeAfterSection';
import { PlatformLegitimacySection } from '@/components/for-operators/PlatformLegitimacySection';
import { OperatorTestimonialSection } from '@/components/for-operators/OperatorTestimonialSection';
import { OnboardingPathSection } from '@/components/for-operators/OnboardingPathSection';
import { FAQSection } from '@/components/for-operators/FAQSection';
import { ClosingCTASection } from '@/components/for-operators/ClosingCTASection';

export const metadata: Metadata = {
  title: 'For Tour Operators | Quorum Tours',
  description: 'Launch birding tours with zero upfront risk. Commit to suppliers when birders commit to you — not before. Never bet the farm on a tour again.',
};

export default function ForOperatorsPage() {
  return (
    <main>
      <OperatorHero />
      <HumanSupportSection />
      <ProblemAgitationSection />
      <ThresholdMechanicSection />
      <FinancialTransparencySection />
      <BeforeAfterSection />
      <PlatformLegitimacySection />
      <OperatorTestimonialSection />
      <OnboardingPathSection />
      <FAQSection />
      <ClosingCTASection />
    </main>
  );
}
