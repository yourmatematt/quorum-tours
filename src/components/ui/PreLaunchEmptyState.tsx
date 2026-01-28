'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface PreLaunchEmptyStateProps {
  /** 'tours' or 'operators' - adjusts messaging */
  context: 'tours' | 'operators';
  /** Whether the user is currently logged in */
  isLoggedIn?: boolean;
  /** User's display name (for share messages) */
  userName?: string;
}

// Social channel URLs
const QUORUM_SOCIALS = {
  instagram: 'https://instagram.com/quorumtours',
  facebook: 'https://www.facebook.com/profile.php?id=61586289077015',
  x: 'https://x.com/quorumtours',
};

// Generate share content for inviting operators
function generateOperatorShareContent(userName?: string) {
  const name = userName || 'a fellow birder';
  const quorumUrl = 'https://quorumtours.com/for-operators';

  // X (Twitter)
  const xText = `I've signed up to Quorum Tours as a founding birder. If you run birding tours, you should check it out—it's a new platform where tours only run when enough people commit. ${quorumUrl}`;

  // Facebook
  const facebookText = `I've just signed up to Quorum Tours and thought of you. It's a new Australian birding platform where tours only run when enough people commit—no more cancelled trips or half-empty groups. If you run birding tours, it might be worth a look.`;

  // Instagram (will open app, can't pre-fill text reliably)
  const instagramText = `Check out @quorumtours - a new birding tour platform where tours only run when enough people commit.`;

  // Email
  const emailSubject = `Thought you might find this interesting - Quorum Tours`;
  const emailBody = `Hi,

I've just signed up to Quorum Tours and thought of you.

It's a new Australian birding platform with an interesting model—tours only run when enough people commit. No more cancelled trips or half-empty groups for operators, and travellers only pay once a trip is confirmed.

If you run birding tours (or know someone who does), it might be worth a look: ${quorumUrl}

${name}`;

  return {
    x: xText,
    facebook: facebookText,
    instagram: instagramText,
    emailSubject,
    emailBody,
    url: quorumUrl,
  };
}

// Build share URLs
function buildShareUrls(content: ReturnType<typeof generateOperatorShareContent>) {
  const encodedUrl = encodeURIComponent(content.url);

  return {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.x)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(content.facebook)}`,
    // Instagram doesn't have a share URL - we link to our profile instead
    instagram: QUORUM_SOCIALS.instagram,
    email: `mailto:?subject=${encodeURIComponent(content.emailSubject)}&body=${encodeURIComponent(content.emailBody)}`,
  };
}

/**
 * PreLaunchEmptyState - Two states for pre-launch period
 *
 * Logged In: Coming soon + social channels + share to operator
 * Not Logged In: Waitlist-style signup + how it works
 */
export function PreLaunchEmptyState({ context, isLoggedIn = false, userName }: PreLaunchEmptyStateProps) {
  const [copied, setCopied] = useState(false);
  const shareContent = generateOperatorShareContent(userName);
  const shareUrls = buildShareUrls(shareContent);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareContent.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareContent.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // =========================================================================
  // LOGGED IN STATE - Compact single viewport layout
  // =========================================================================
  if (isLoggedIn) {
    return (
      <div className="py-[var(--space-lg)]">
        {/* Two-column layout on desktop */}
        <div className="
          max-w-5xl mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-[var(--space-xl)]
          items-start
        ">
          {/* Left column: Coming Soon + Social Channels */}
          <ScrollReveal variant="fade-up" duration={500}>
            <div className="
              p-[var(--space-xl)]
              bg-gradient-to-b from-[var(--color-primary-subtle)] to-[var(--color-surface-raised)]
              border-2 border-[var(--color-primary)]/10
              rounded-[var(--radius-organic)]
            ">
              {/* Badge */}
              <div className="
                inline-flex items-center gap-2
                px-3 py-1.5
                bg-white
                border border-[var(--color-primary)]/20
                rounded-full
                text-xs font-medium text-[var(--color-primary)]
                mb-[var(--space-lg)]
              ">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                You're in early
              </div>

              {/* Headline */}
              <h2 className="
                font-display
                text-[clamp(1.5rem,4vw,2rem)]
                leading-[1.2]
                text-[var(--color-ink)]
                mb-[var(--space-sm)]
              ">
                {context === 'tours'
                  ? 'Tours are coming soon'
                  : 'Operators are coming soon'
                }
              </h2>

              {/* Supporting copy */}
              <p className="
                text-[var(--color-ink-muted)]
                leading-relaxed
                mb-[var(--space-xl)]
              ">
                {context === 'tours'
                  ? "We're onboarding our first guides now. Your chase list is ready—you'll be notified first when tours match your species."
                  : "We're bringing on vetted guides who share our commitment to quality birding experiences. Check back soon."
                }
              </p>

              {/* Stay Updated */}
              <div className="
                pt-[var(--space-lg)]
                border-t border-[var(--color-border)]
              ">
                <h3 className="
                  font-medium text-sm
                  text-[var(--color-ink)]
                  mb-[var(--space-sm)]
                ">
                  Stay up to date
                </h3>
                <p className="
                  text-xs text-[var(--color-ink-muted)]
                  mb-[var(--space-md)]
                ">
                  Follow Quorum for announcements and new tour listings.
                </p>

                <div className="flex gap-[var(--space-sm)]">
                  {/* Instagram */}
                  <a
                    href={QUORUM_SOCIALS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-10 h-10
                      flex items-center justify-center
                      bg-white
                      border-2 border-[var(--color-border)]
                      rounded-full
                      text-[var(--color-ink-muted)]
                      hover:border-[var(--color-primary)]
                      hover:text-[var(--color-primary)]
                      transition-colors
                    "
                    aria-label="Follow Quorum on Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={QUORUM_SOCIALS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-10 h-10
                      flex items-center justify-center
                      bg-white
                      border-2 border-[var(--color-border)]
                      rounded-full
                      text-[var(--color-ink-muted)]
                      hover:border-[var(--color-primary)]
                      hover:text-[var(--color-primary)]
                      transition-colors
                    "
                    aria-label="Follow Quorum on Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href={QUORUM_SOCIALS.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-10 h-10
                      flex items-center justify-center
                      bg-white
                      border-2 border-[var(--color-border)]
                      rounded-full
                      text-[var(--color-ink-muted)]
                      hover:border-[var(--color-primary)]
                      hover:text-[var(--color-primary)]
                      transition-colors
                    "
                    aria-label="Follow Quorum on X"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Link to chase list */}
              <div className="mt-[var(--space-lg)]">
                <Link
                  href="/profile"
                  className="
                    text-sm font-medium
                    text-[var(--color-primary)]
                    hover:underline
                    focus:outline-none focus:underline
                  "
                >
                  Manage your chase list →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column: Share to an Operator */}
          <ScrollReveal variant="fade-up" delay={100} duration={500}>
            <div className="
              p-[var(--space-xl)]
              bg-[var(--color-surface-raised)]
              border-2 border-[var(--color-border)]
              rounded-[var(--radius-organic)]
            ">
              <h3 className="
                font-display
                text-[var(--text-lg)]
                text-[var(--color-ink)]
                mb-[var(--space-sm)]
              ">
                Know a tour operator?
              </h3>
              <p className="
                text-[var(--color-ink-muted)]
                leading-relaxed
                mb-[var(--space-xl)]
              ">
                If you've been on a birding tour you enjoyed, help us grow by inviting the operator to list on Quorum.
              </p>

              <div className="flex flex-wrap gap-[var(--space-sm)]">
                {/* Facebook */}
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-4 py-2.5
                    bg-[var(--color-surface)]
                    border-2 border-[var(--color-border)]
                    text-[var(--color-ink)]
                    font-medium text-sm
                    rounded-[var(--radius-organic)]
                    hover:border-[var(--color-primary)]
                    hover:text-[var(--color-primary)]
                    transition-colors
                    min-h-[44px]
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>

                {/* X (Twitter) */}
                <a
                  href={shareUrls.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-4 py-2.5
                    bg-[var(--color-surface)]
                    border-2 border-[var(--color-border)]
                    text-[var(--color-ink)]
                    font-medium text-sm
                    rounded-[var(--radius-organic)]
                    hover:border-[var(--color-primary)]
                    hover:text-[var(--color-primary)]
                    transition-colors
                    min-h-[44px]
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X
                </a>

                {/* Instagram */}
                <a
                  href={shareUrls.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-4 py-2.5
                    bg-[var(--color-surface)]
                    border-2 border-[var(--color-border)]
                    text-[var(--color-ink)]
                    font-medium text-sm
                    rounded-[var(--radius-organic)]
                    hover:border-[var(--color-primary)]
                    hover:text-[var(--color-primary)]
                    transition-colors
                    min-h-[44px]
                  "
                  title="Share on Instagram (tag @quorumtours)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </a>

                {/* Email */}
                <a
                  href={shareUrls.email}
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-4 py-2.5
                    bg-[var(--color-surface)]
                    border-2 border-[var(--color-border)]
                    text-[var(--color-ink)]
                    font-medium text-sm
                    rounded-[var(--radius-organic)]
                    hover:border-[var(--color-primary)]
                    hover:text-[var(--color-primary)]
                    transition-colors
                    min-h-[44px]
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  Email
                </a>

                {/* Copy link */}
                <button
                  onClick={handleCopyLink}
                  className="
                    inline-flex items-center gap-[var(--space-xs)]
                    px-4 py-2.5
                    bg-[var(--color-surface)]
                    border-2 border-[var(--color-border)]
                    text-[var(--color-ink)]
                    font-medium text-sm
                    rounded-[var(--radius-organic)]
                    hover:border-[var(--color-primary)]
                    hover:text-[var(--color-primary)]
                    transition-colors
                    min-h-[44px]
                    cursor-pointer
                  "
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                      Copy link
                    </>
                  )}
                </button>
              </div>

              {/* Pre-loaded message preview */}
              <div className="
                mt-[var(--space-lg)]
                p-[var(--space-md)]
                bg-[var(--color-surface-sunken)]
                rounded-[var(--radius-md)]
              ">
                <p className="text-xs text-[var(--color-ink-subtle)] mb-1">
                  Message preview:
                </p>
                <p className="text-sm text-[var(--color-ink-muted)] italic leading-relaxed">
                  "I've signed up to Quorum Tours as a founding birder. If you run birding tours, you should check it out..."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  // =========================================================================
  // NOT LOGGED IN STATE - Waitlist Lander Feel
  // =========================================================================
  return (
    <div className="py-[var(--space-lg)]">
      {/* Two-column layout on desktop */}
      <div className="
        max-w-5xl mx-auto
        grid grid-cols-1 lg:grid-cols-2
        gap-[var(--space-xl)]
        items-start
      ">
        {/* Left column: Login/Signup Form */}
        <ScrollReveal variant="fade-up" duration={500}>
          <div className="
            p-[var(--space-xl)]
            bg-[var(--color-surface-raised)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            shadow-[var(--shadow-card)]
          ">
            {/* Badge */}
            <div className="
              inline-flex items-center gap-2
              px-3 py-1.5
              bg-[var(--color-primary-subtle)]
              border border-[var(--color-primary)]/20
              rounded-full
              text-xs font-medium text-[var(--color-primary)]
              mb-[var(--space-lg)]
            ">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Founding Birder Program
            </div>

            <h2 className="
              font-display
              text-[clamp(1.5rem,4vw,2rem)]
              leading-[1.2]
              text-[var(--color-ink)]
              mb-[var(--space-sm)]
            ">
              {context === 'tours'
                ? 'Be first to know when tours launch'
                : 'Get early access to new guides'
              }
            </h2>

            <p className="
              text-[var(--color-ink-muted)]
              leading-relaxed
              mb-[var(--space-xl)]
            ">
              {context === 'tours'
                ? 'Sign up now to build your chase list. When a tour features a species you want to see, you hear about it before anyone else.'
                : 'Join now and be the first to discover vetted birding guides when they start listing tours.'
              }
            </p>

            {/* Auth buttons */}
            <div className="space-y-[var(--space-sm)]">
              <Link
                href="/signup"
                className="
                  flex items-center justify-center
                  w-full
                  px-6 py-4
                  text-base font-semibold
                  text-white
                  bg-[var(--color-primary)]
                  hover:bg-[var(--color-primary-hover)]
                  rounded-[var(--radius-md)]
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                  min-h-[52px]
                "
              >
                Create your chase list
              </Link>

              <div className="flex items-center gap-[var(--space-md)]">
                <div className="flex-1 h-px bg-[var(--color-border)]" />
                <span className="text-xs text-[var(--color-ink-subtle)]">or</span>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>

              <Link
                href="/login"
                className="
                  flex items-center justify-center
                  w-full
                  px-6 py-4
                  text-base font-medium
                  text-[var(--color-ink)]
                  bg-[var(--color-surface)]
                  border-2 border-[var(--color-border)]
                  hover:border-[var(--color-primary)]
                  hover:text-[var(--color-primary)]
                  rounded-[var(--radius-md)]
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
                  min-h-[52px]
                "
              >
                Log in to existing account
              </Link>
            </div>

            <p className="
              mt-[var(--space-lg)]
              text-xs text-[var(--color-ink-subtle)]
              text-center
            ">
              Free to join · No credit card required
            </p>
          </div>
        </ScrollReveal>

        {/* Right column: How Early Access Works */}
        <ScrollReveal variant="fade-up" delay={100} duration={500}>
          <div className="
            p-[var(--space-xl)]
            bg-[var(--color-surface)]
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
          ">
            <h3 className="
              font-display
              text-[var(--text-lg)]
              text-[var(--color-ink)]
              mb-[var(--space-lg)]
            ">
              How early access works
            </h3>

            <div className="space-y-[var(--space-lg)]">
              {/* Step 1 */}
              <div className="flex gap-[var(--space-md)]">
                <div className="
                  flex-shrink-0
                  w-10 h-10
                  bg-[var(--color-surface-sunken)]
                  rounded-full
                  flex items-center justify-center
                ">
                  <span className="font-mono font-bold text-sm text-[var(--color-primary)]">1</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-ink)] mb-1">
                    Build your chase list
                  </p>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    Add species you want to see. We track who adds each bird first.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-[var(--space-md)]">
                <div className="
                  flex-shrink-0
                  w-10 h-10
                  bg-[var(--color-surface-sunken)]
                  rounded-full
                  flex items-center justify-center
                ">
                  <span className="font-mono font-bold text-sm text-[var(--color-primary)]">2</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-ink)] mb-1">
                    A tour is announced
                  </p>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    An operator lists a tour featuring a species on your list.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-[var(--space-md)]">
                <div className="
                  flex-shrink-0
                  w-10 h-10
                  bg-[var(--color-primary-subtle)]
                  border-2 border-[var(--color-primary)]/30
                  rounded-full
                  flex items-center justify-center
                ">
                  <span className="font-mono font-bold text-sm text-[var(--color-primary)]">3</span>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-ink)] mb-1">
                    You hear about it first
                  </p>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    Early adopters get 24 hours to commit before public announcement.
                  </p>
                </div>
              </div>
            </div>

            {/* Key differentiator callout */}
            <div className="
              mt-[var(--space-xl)]
              pt-[var(--space-lg)]
              border-t border-[var(--color-border)]
            ">
              <div className="
                flex items-start gap-[var(--space-md)]
                p-[var(--space-md)]
                bg-[var(--color-surface-sunken)]
                rounded-[var(--radius-md)]
              ">
                <div className="
                  flex-shrink-0
                  w-8 h-8
                  bg-[var(--color-primary-subtle)]
                  rounded-full
                  flex items-center justify-center
                ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm text-[var(--color-ink)] mb-1">
                    Priority is permanent
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                    The earlier you build your chase list, the higher your priority for notifications.
                    Founding birders keep their position.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
