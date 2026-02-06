import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Quorum Tours',
  description:
    'Terms of Service for Quorum Tours, the threshold-based wildlife tour booking platform.',
};

export default function TermsPage() {
  return (
    <main className="py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] mb-4">
            Terms of Service
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Effective Date: 6 February 2026
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-lg max-w-none text-[var(--color-ink)]">
          <p>
            Welcome to Quorum Tours. These Terms of Service (&quot;Terms&quot;) govern your use of the Quorum Tours website at quorumtours.com and related services (the &quot;Platform&quot;), operated by Your Mate Agency ABN 37179872328 (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Quorum Tours&quot;).
          </p>
          <p>
            By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.
          </p>

          <h2>1. About Quorum Tours</h2>

          <h3>1.1 Platform Role</h3>
          <p>
            Quorum Tours is an online marketplace that connects wildlife tour customers (&quot;Customers&quot;) with independent tour operators (&quot;Operators&quot;). We act as an agent facilitating bookings between Customers and Operators. We do not provide tour services ourselves.
          </p>

          <h3>1.2 Threshold-Based Booking Model</h3>
          <p>
            Quorum Tours uses a threshold-based booking system. Tours listed on the Platform require a minimum number of participants before they are confirmed to run. This means:
          </p>
          <ul>
            <li>When you express interest or commit to a tour, your payment is authorised but not charged until the tour reaches its minimum participant threshold.</li>
            <li>If the threshold is met, the tour is confirmed and your payment is processed.</li>
            <li>If the threshold is not met by the specified deadline, the tour does not proceed and no charge is made to your payment method.</li>
            <li>Once a tour is confirmed, standard cancellation policies (set by the Operator) apply.</li>
          </ul>

          <h2>2. Accounts</h2>

          <h3>2.1 Registration</h3>
          <p>
            You must create an account to book tours or list tours on the Platform. You must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.
          </p>

          <h3>2.2 Account Types</h3>
          <ul>
            <li><strong>Customer accounts:</strong> for individuals seeking to discover and book wildlife tours.</li>
            <li><strong>Operator accounts:</strong> for licensed tour operators seeking to list and manage tours. Operator accounts are subject to additional verification requirements and the separate Operator Agreement.</li>
          </ul>

          <h3>2.3 Account Suspension</h3>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or pose a risk to the safety or integrity of the Platform or its users.
          </p>

          <h2>3. Bookings and Payments</h2>

          <h3>3.1 How Bookings Work</h3>
          <p>
            Tour listings on the Platform are created by Operators. By committing to a tour, you are entering into a contract with the Operator, not with Quorum Tours. We facilitate the booking process but are not a party to the tour contract.
          </p>

          <h3>3.2 Payment Processing</h3>
          <p>
            Payments are processed through Stripe Connect using a Direct Charges model. This means:
          </p>
          <ul>
            <li>Your payment is made directly to the Operator&apos;s Stripe account.</li>
            <li>Quorum Tours&apos; service fee (approximately 6% of the tour price) is deducted automatically by Stripe at the time of the charge.</li>
            <li>Quorum Tours does not hold, store, or have access to your credit card details. All payment data is handled by Stripe in accordance with PCI DSS standards.</li>
          </ul>

          <h3>3.3 Pricing</h3>
          <p>
            Tour prices are set by Operators and displayed in Australian Dollars (AUD) unless otherwise stated. The price displayed at the time of booking is the price you pay. Quorum Tours&apos; service fee is included in the displayed price — there are no hidden surcharges at checkout.
          </p>

          <h3>3.4 Refunds and Cancellations</h3>
          <p>
            Each Operator sets their own cancellation and refund policy, which is displayed on the tour listing page. You should review the applicable policy before committing to a tour.
          </p>
          <p>
            If a tour does not reach its minimum participant threshold and does not proceed, no charge will be made. If you have been charged in error, contact us at hello@quorumtours.com and we will work with the Operator and Stripe to arrange a refund.
          </p>
          <p>
            Your rights under the Australian Consumer Law are not affected by these Terms or by any Operator&apos;s cancellation policy. If a tour service is not provided as described, or is not fit for purpose, you may be entitled to a remedy under Australian Consumer Law regardless of the Operator&apos;s stated policy.
          </p>

          <h2>4. Customer Responsibilities</h2>
          <p>As a Customer, you agree to:</p>
          <ul>
            <li>Provide accurate information when creating your account and making bookings, including any health conditions, fitness limitations, or dietary requirements relevant to the tour.</li>
            <li>Comply with all instructions given by the Operator and their guides during a tour, including safety directions.</li>
            <li>Behave responsibly and respectfully toward other participants, guides, wildlife, and the natural environment.</li>
            <li>Not engage in any illegal activity during a tour, including disturbance of protected wildlife or trespass in restricted areas.</li>
            <li>Acknowledge that wildlife tours involve inherent risks, including but not limited to weather events, wildlife encounters, uneven terrain, and water-based activities. You participate at your own risk.</li>
          </ul>

          <h2>5. Operator Responsibilities</h2>
          <p>
            Operators who list tours on the Platform agree to the Operator Agreement, which requires (among other things):
          </p>
          <ul>
            <li>Maintaining all necessary licences, permits, and insurance required by law (including Parks Victoria LTO permits and AMSA compliance where applicable).</li>
            <li>Providing accurate and honest tour descriptions, including species targets, physical difficulty, inclusions, and exclusions.</li>
            <li>Maintaining public liability insurance of at least $20 million (or as required by their licensing authority).</li>
            <li>Delivering tours as described on the Platform.</li>
            <li>Complying with all applicable laws, including Australian Consumer Law.</li>
          </ul>

          <h2>6. Intellectual Property</h2>

          <h3>6.1 Platform Content</h3>
          <p>
            All content on the Platform created by Quorum Tours (including text, graphics, logos, and software) is owned by or licensed to Your Mate Agency and is protected by Australian and international intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our written permission.
          </p>

          <h3>6.2 User Content</h3>
          <p>
            By submitting content to the Platform (including reviews, photos, species lists, and profile information), you grant Quorum Tours a non-exclusive, worldwide, royalty-free licence to use, display, and distribute that content in connection with the Platform and its promotion. You retain ownership of your content.
          </p>

          <h2>7. Limitation of Liability</h2>

          <h3>7.1 Platform Role</h3>
          <p>
            Quorum Tours is a marketplace facilitator. We do not operate tours, provide guiding services, or control the conduct of Operators. To the maximum extent permitted by law:
          </p>
          <ul>
            <li>We are not liable for any loss, injury, or damage arising from a tour, including personal injury, property damage, or failure to sight specific wildlife species.</li>
            <li>We are not liable for the acts, omissions, or representations of Operators or their staff.</li>
            <li>We are not liable for any indirect, incidental, or consequential damages arising from your use of the Platform.</li>
          </ul>

          <h3>7.2 Australian Consumer Law</h3>
          <p>
            Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010) or any other applicable law that cannot be excluded, restricted, or modified by agreement.
          </p>
          <p>
            To the extent that we are liable under the Australian Consumer Law for a failure to comply with a consumer guarantee in relation to services, our liability is limited to re-supplying the services or paying the cost of having them re-supplied.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Quorum Tours, Your Mate Agency, and their officers, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from:
          </p>
          <ul>
            <li>Your use of the Platform or participation in any tour.</li>
            <li>Your breach of these Terms.</li>
            <li>Your violation of any law or the rights of any third party.</li>
          </ul>

          <h2>9. Disputes</h2>

          <h3>9.1 Between Customers and Operators</h3>
          <p>
            Disputes relating to the delivery or quality of a tour are between the Customer and the Operator. We encourage you to resolve disputes directly with the Operator in the first instance. Quorum Tours may, at its discretion, assist in mediating disputes but is not obligated to do so.
          </p>

          <h3>9.2 With Quorum Tours</h3>
          <p>
            If you have a dispute with Quorum Tours regarding the Platform or these Terms, please contact us at hello@quorumtours.com. We will endeavour to resolve your concern within 30 days.
          </p>

          <h3>9.3 Governing Law</h3>
          <p>
            These Terms are governed by the laws of the State of Victoria, Australia. You agree to submit to the non-exclusive jurisdiction of the courts of Victoria and any courts that may hear appeals from those courts.
          </p>

          <h2>10. Species Chase Lists and Notifications</h2>
          <p>
            The Platform allows Customers to maintain species chase lists and receive notifications when Operators create tours targeting those species. This feature is provided for convenience only. Quorum Tours does not guarantee the accuracy of species data, the likelihood of sighting any species, or the timeliness of notifications.
          </p>

          <h2>11. Third-Party Links and Services</h2>
          <p>
            The Platform may contain links to third-party websites or services (including Stripe, eBird, and social media platforms). We are not responsible for the content, privacy practices, or availability of these external services.
          </p>

          <h2>12. Modifications to These Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on our website and, where appropriate, by email. Your continued use of the Platform after changes take effect constitutes acceptance of the revised Terms. If you do not agree with the changes, you should stop using the Platform and close your account.
          </p>

          <h2>13. General</h2>
          <ul>
            <li>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions continue in full force and effect.</li>
            <li>Our failure to enforce any provision of these Terms does not constitute a waiver of that provision.</li>
            <li>These Terms, together with the Privacy Policy and (for Operators) the Operator Agreement, constitute the entire agreement between you and Quorum Tours regarding the Platform.</li>
          </ul>

          <h2>14. Contact Us</h2>
          <p>If you have questions about these Terms, contact us at:</p>
          <address className="not-italic">
            <strong>Quorum Tours</strong><br />
            Operated by Your Mate Agency<br />
            Email: <a href="mailto:hello@quorumtours.com" className="text-[var(--color-accent)] hover:underline">hello@quorumtours.com</a><br />
            Website: <a href="https://quorumtours.com" className="text-[var(--color-accent)] hover:underline">quorumtours.com</a>
          </address>
        </article>
      </div>
    </main>
  );
}
