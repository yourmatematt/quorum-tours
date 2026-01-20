import { HeroSection } from '../components/home/HeroSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { TourStatesSection } from '../components/home/TourStatesSection';
import { TrustSection } from '../components/home/TrustSection';
import { PathwaysSection } from '../components/home/PathwaysSection';

/**
 * Home Page - Public Discovery
 *
 * Primary job: Explain what Quorum is, why it exists, and how certainty
 * is created — immediately. User should understand the threshold mechanic
 * within first scroll.
 *
 * Section Order (per HOME-IA-001):
 * 1. Hero: What Quorum Solves
 * 2. How It Works: Visual Mechanic
 * 3. Why This Is Different: Comparison
 * 4. Live Tour States: Example cards
 * 5. Trust Foundations: Credibility signals
 * 6. Pathways Forward: CTAs
 */
export default function HomePage() {
  return (
    <main>
      {/* Section 1: Hero - What Quorum Solves */}
      <HeroSection />

      {/* Section 2: How It Works - Visual Mechanic */}
      <HowItWorksSection />

      {/* Section 3: Why This Is Different - Comparison */}
      <ComparisonSection />

      {/* Section 4: Live Tour States - Example cards */}
      <TourStatesSection />

      {/* Section 5: Trust Foundations - Credibility signals */}
      <TrustSection />

      {/* Section 6: Pathways Forward - CTAs */}
      <PathwaysSection />
    </main>
  );
}
