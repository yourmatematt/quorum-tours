'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * GlobalFooter - "Rooted Foundation" Design
 *
 * Organic biophilic footer with:
 * - Subtle wave divider
 * - Three-tier hierarchy: Logo/Nav/CTA → Legal → Copyright
 * - Leaf ornament signature
 * - Gradient earth layers background
 *
 * Hides on dashboard routes like GlobalNav.
 */

const primaryLinks = [
  { href: '/tours', label: 'Tours' },
  { href: '/operators', label: 'Operators' },
  { href: '/how-it-works', label: 'How It Works' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

function WaveDivider() {
  return (
    <div className="absolute top-0 left-0 right-0 -translate-y-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] lg:h-[100px]"
      >
        <path
          d="M0 100V60C120 75 240 40 480 50C720 60 960 30 1200 45C1320 52 1380 65 1440 60V100H0Z"
          fill="url(#wave-gradient)"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(240, 255, 244, 0)" />
            <stop offset="100%" stopColor="rgba(240, 255, 244, 0.8)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function LeafOrnament() {
  return (
    <span
      className="
        inline-block w-4 h-4 ml-2
        bg-[var(--color-primary)]
        opacity-40
        rounded-[0_50%_50%_50%]
        rotate-45
      "
      aria-hidden="true"
    />
  );
}

export function GlobalFooter() {
  const pathname = usePathname();

  // Hide on dashboard routes (but keep for /operators consumer page)
  const isDashboard = pathname === '/operator' || pathname?.startsWith('/operator/') || pathname?.startsWith('/admin');
  if (isDashboard) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        mt-[var(--space-section-normal)]
        bg-gradient-to-b from-[var(--color-surface)] to-[rgba(46,139,87,0.04)]
      "
      role="contentinfo"
    >
      <WaveDivider />

      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto
        px-5 md:px-[var(--space-lg)]
        pt-10 md:pt-16
        pb-8 md:pb-12
      ">
        {/* Layer 1: Logo, Navigation, Operator CTA */}
        <div className="
          flex flex-col items-center
          lg:flex-row lg:items-start lg:justify-between
          gap-6 lg:gap-8
          mb-10 lg:mb-12
        ">
          {/* Logo + Tagline */}
          <div className="text-center lg:text-left">
            <Link
              href="/"
              className="
                font-display text-[1.75rem] font-semibold
                text-[var(--color-ink)]
                hover:text-[var(--color-primary)]
                transition-colors duration-200
              "
            >
              Quorum
            </Link>
            <p className="
              text-sm text-[var(--color-ink-muted)]
              mt-1 tracking-wide
            ">
              Birding tours built on trust
            </p>
          </div>

          {/* Primary Navigation */}
          <nav aria-label="Footer navigation" className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-base font-medium
                  text-[var(--color-ink)]
                  hover:text-[var(--color-primary)]
                  hover:-translate-y-px
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Operator CTA */}
          <div className="lg:text-right">
            <Link
              href="/for-operators"
              className="
                inline-flex items-center justify-center
                px-6 py-3
                text-base font-semibold
                text-[var(--color-primary)]
                border-2 border-[var(--color-primary)]
                rounded-[var(--radius-md)]
                hover:bg-[var(--color-surface)]
                hover:border-[var(--color-primary-hover)]
                hover:scale-[1.02]
                transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
                min-h-[44px]
              "
            >
              For Operators
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="
          w-full h-px
          bg-[var(--color-border)]
          mb-6 md:mb-8
        " aria-hidden="true" />

        {/* Layer 2: Legal + Copyright */}
        <div className="
          flex flex-col items-center gap-4
          md:flex-row md:justify-between md:gap-6
        ">
          {/* Legal Links */}
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-sm
                  text-[var(--color-ink-subtle)]
                  hover:text-[var(--color-primary)]
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="
            text-sm text-[var(--color-ink-subtle)]
            flex items-center
          ">
            © {currentYear} Quorum Tours. Built with care for birders.
            <LeafOrnament />
          </p>
        </div>
      </div>
    </footer>
  );
}
