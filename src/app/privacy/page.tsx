import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Quorum Tours',
  description:
    'Privacy Policy for Quorum Tours. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ink)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Effective Date: 6 February 2026
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-lg max-w-none text-[var(--color-ink)]">
          <p>
            Quorum Tours is operated by Your Mate Agency ABN 37179872328 (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Quorum Tours&quot;). We are committed to protecting your personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and protect personal information through our website at quorumtours.com and related services (the &quot;Platform&quot;).
          </p>
          <p>
            Quorum Tours operates as a marketplace connecting wildlife tour customers (&quot;Customers&quot;) with independent tour operators (&quot;Operators&quot;). We act as an agent facilitating bookings, not as the provider of tour services.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide</h3>
          <ul>
            <li><strong>Account registration details:</strong> name, email address, password</li>
            <li><strong>Profile information:</strong> birding experience level, species chase lists, physical fitness level, location</li>
            <li><strong>Booking information:</strong> tour preferences, dietary requirements, emergency contact details</li>
            <li><strong>Payment information:</strong> processed securely through Stripe (we do not store credit card numbers)</li>
            <li><strong>Communications:</strong> messages sent through the Platform, support inquiries, feedback</li>
          </ul>

          <h3>1.2 Information We Collect Automatically</h3>
          <ul>
            <li>Device and browser information (type, operating system, browser version)</li>
            <li>IP address and approximate geographic location</li>
            <li>Pages visited, features used, and interactions with the Platform</li>
            <li>Cookies and similar tracking technologies (see Section 7)</li>
          </ul>

          <h3>1.3 Information from Third Parties</h3>
          <ul>
            <li>Authentication data if you sign in via Google or other third-party providers</li>
            <li>Payment status information from Stripe</li>
            <li>Publicly available birding data from platforms such as eBird (only when voluntarily linked by you)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your personal information for the following purposes:</p>
          <ul>
            <li>To create and manage your account on the Platform</li>
            <li>To facilitate tour bookings between Customers and Operators, including threshold-based tour confirmation</li>
            <li>To process payments via Stripe Connect (Direct Charges model — funds flow directly from Customer to Operator)</li>
            <li>To match you with relevant tours based on your species chase list and preferences</li>
            <li>To send booking confirmations, tour updates, threshold progress notifications, and pre-trip communications</li>
            <li>To send marketing communications where you have opted in (you may unsubscribe at any time)</li>
            <li>To improve the Platform, analyse usage patterns, and develop new features</li>
            <li>To comply with legal obligations, resolve disputes, and enforce our Terms of Service</li>
          </ul>

          <h2>3. How We Share Your Information</h2>

          <h3>3.1 With Operators</h3>
          <p>
            When you book a tour, we share relevant booking details with the Operator, including your name, contact details, experience level, dietary requirements, and any information necessary for the safe conduct of the tour. Operators are independent businesses and are responsible for their own privacy practices.
          </p>

          <h3>3.2 With Service Providers</h3>
          <ul>
            <li><strong>Stripe</strong> — payment processing (Stripe&apos;s privacy policy applies to payment data)</li>
            <li><strong>Vercel</strong> — website hosting</li>
            <li><strong>Supabase</strong> — database and authentication services</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
          </ul>

          <h3>3.3 As Required by Law</h3>
          <p>
            We may disclose personal information where required by Australian law, regulation, or court order, or to protect the rights, property, or safety of Quorum Tours, our users, or the public.
          </p>

          <h3>3.4 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your personal information may be transferred as part of that transaction. We will notify you of any such change.
          </p>

          <h2>4. Data Storage and Security</h2>
          <p>
            Your data is stored on servers operated by Supabase (cloud infrastructure). We implement industry-standard security measures including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS/SSL) and at rest</li>
            <li>Row-level security policies in our database</li>
            <li>Secure authentication with hashed passwords</li>
            <li>Regular security reviews of our codebase and infrastructure</li>
          </ul>
          <p>
            No method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
          </p>

          <h2>5. Your Rights Under the Australian Privacy Principles</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate, incomplete, or out-of-date information</li>
            <li>Request deletion of your account and associated data (subject to legal retention requirements)</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Lodge a complaint with us or with the Office of the Australian Information Commissioner (OAIC) if you believe your privacy has been breached</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <a href="mailto:hello@quorumtours.com" className="text-[var(--color-accent)] hover:underline">hello@quorumtours.com</a>.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain data for up to 7 years where required for legal, tax, or dispute resolution purposes. Anonymised and aggregated data (such as platform usage statistics) may be retained indefinitely.
          </p>

          <h2>7. Cookies and Tracking</h2>
          <p>
            We use essential cookies to maintain your session and preferences. We may also use analytics cookies (such as those provided by Vercel Analytics) to understand how the Platform is used. You can manage cookie preferences through your browser settings. The Platform does not respond to &quot;Do Not Track&quot; browser signals at this time.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            The Platform is not directed at children under 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will take steps to delete it promptly.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Some of our service providers (Stripe, Vercel, Supabase) may process data outside Australia, including in the United States. Where this occurs, we take reasonable steps to ensure your information is treated in accordance with the Australian Privacy Principles.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website, updating the effective date, and where appropriate, sending you an email notification. Continued use of the Platform after changes constitutes acceptance of the revised policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to make a privacy-related request, contact us at:
          </p>
          <address className="not-italic">
            <strong>Quorum Tours</strong><br />
            Operated by Your Mate Agency<br />
            Email: <a href="mailto:hello@quorumtours.com" className="text-[var(--color-accent)] hover:underline">hello@quorumtours.com</a><br />
            Website: <a href="https://quorumtours.com" className="text-[var(--color-accent)] hover:underline">quorumtours.com</a>
          </address>
          <p className="mt-6">
            You may also contact the Office of the Australian Information Commissioner (OAIC) at{' '}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
              www.oaic.gov.au
            </a>{' '}
            if you have concerns about how we handle your personal information.
          </p>
        </article>
      </div>
    </main>
  );
}
