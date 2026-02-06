import { HeroSection } from '../components/home/HeroSection';
import { ExplainerVideoSection } from '../components/home/ExplainerVideoSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { TourStatesSection } from '../components/home/TourStatesSection';
import { TrustSection } from '../components/home/TrustSection';
import { PathwaysSection } from '../components/home/PathwaysSection';
import { ErrorBoundary } from '../components/ErrorBoundary';

/**
 * Home Page - Redesigned with Organic Biophilic Design System
 *
 * Design System: HOME-REDESIGN-DECISIONS.md
 * - Typography: Crimson Pro (display) + Atkinson Hyperlegible (body)
 * - Colors: Forest Green (#2E8B57), Sky Blue (#87CEEB), Gold (#FFD700)
 * - Style: Organic rounded corners (16-24px), natural shadows
 * - Accessibility: WCAG AAA compliance
 *
 * Section Order (per HOME-REDESIGN-DECISIONS.md):
 * 1. Hero: Value prop + Browse Tours CTA
 * 2. How Confirmation Works: 3-step threshold mechanic
 * 3. Featured Tours: Cards with confirmation status
 * 4. Why This Is Different: Before/after comparison
 * 5. Trust Signals: Verified operators, eBird integration
 * 6. Dual CTA: Browse Tours (primary) + How It Works (secondary)
 */
export default function HomePage() {
  return (
    <main>
      {/* Section 1: Hero - What Quorum Solves */}
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      {/* Section 2: Explainer Video - What is Quorum? */}
      <ErrorBoundary>
        <ExplainerVideoSection />
      </ErrorBoundary>

      {/* Section 3: How It Works - Visual Mechanic */}
      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>

      {/* Section 3: Why This Is Different - Comparison */}
      <ErrorBoundary>
        <ComparisonSection />
      </ErrorBoundary>

      {/* Section 4: Live Tour States - Example cards */}
      <ErrorBoundary>
        <TourStatesSection />
      </ErrorBoundary>

      {/* Section 5: Trust Foundations - Credibility signals */}
      <ErrorBoundary>
        <TrustSection />
      </ErrorBoundary>

      {/* Section 6: Pathways Forward - CTAs */}
      <ErrorBoundary>
        <PathwaysSection />
      </ErrorBoundary>
    </main>
  );
}
