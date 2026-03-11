'use client';

import { useState } from 'react';
import { Button } from './Button';
import { WhyDepositsModal } from './WhyDepositsModal';
import { QuorumProgressBar } from './QuorumProgressBar';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface CommitmentCardProps {
  status: ConfirmationStatus;
  price: number;
  deposit: number; // Actual deposit amount (personalized if logged in)
  currentParticipants: number;
  quorum: number;
  capacity: number;
  tourId: string;
  tourName?: string;
  tourDate?: string;
  tourLocation?: string;
  operatorName?: string;
  targetSpecies?: string;
  isLoggedIn?: boolean;
  hasCommitted?: boolean;
  trustMessage?: string | null;
}

const ctaConfig: Record<ConfirmationStatus, {
  text: string;
  explanation: string;
  disabled: boolean;
}> = {
  confirmed: {
    text: 'Join This Tour',
    explanation: 'This tour is running. Your spot will be confirmed.',
    disabled: false,
  },
  forming: {
    text: 'Commit',
    explanation: "You'll be notified when this tour confirms.",
    disabled: false,
  },
  'not-running': {
    text: 'Tour Closed',
    explanation: 'This tour did not reach quorum.',
    disabled: true,
  },
};

export function CommitmentCard({
  status,
  price,
  deposit,
  currentParticipants,
  quorum,
  capacity,
  tourId,
  tourName,
  tourDate,
  tourLocation,
  operatorName,
  targetSpecies,
  isLoggedIn = false,
  hasCommitted = false,
  trustMessage,
}: CommitmentCardProps) {
  const [isWhyDepositsOpen, setIsWhyDepositsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const cta = ctaConfig[status];

  const depositPercent = Math.round((deposit / price) * 100);
  const balance = price - deposit;

  // Build the CTA href based on auth state
  const joinPath = `/tours/${tourId}/join`;
  const ctaHref = isLoggedIn
    ? joinPath
    : `/login?redirect=${encodeURIComponent(joinPath)}`;

  return (
    <div className="
      bg-[var(--color-surface-raised)]
      border-2 border-[var(--color-border)]
      rounded-[var(--radius-organic)]
      p-[var(--space-lg)]
      shadow-[var(--shadow-card)]
    ">
      {/* Price Display */}
      <div className="mb-[var(--space-md)]">
        <div className="flex items-baseline gap-[var(--space-xs)]">
          <span className="font-mono text-2xl font-medium text-[var(--color-ink)]">
            ${price}
          </span>
          <span className="text-sm text-[var(--color-ink-muted)]">
            per person
          </span>
        </div>
        <p className="text-sm text-[var(--color-ink-subtle)] mt-1">
          {deposit > 0 ? `$${deposit} deposit to commit` : 'No deposit required'}
        </p>
        {status === 'forming' && trustMessage && (
          <p className="text-xs text-[var(--color-ink-subtle)] mt-1">
            {trustMessage} ·{' '}
            <a href="/how-it-works#trust-system" className="text-[var(--color-primary)] hover:underline">
              Learn about trust tiers
            </a>
          </p>
        )}
      </div>

      {/* Deposit Info - Only show for forming tours */}
      {status === 'forming' && (
        <div className="
          mb-[var(--space-lg)]
          p-[var(--space-md)]
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-sm)]
          border border-[var(--color-border)]
        ">
          <div className="flex items-center justify-between mb-[var(--space-xs)]">
            <span className="text-sm text-[var(--color-ink-muted)]">
              Deposit now
            </span>
            <span className="font-mono font-medium text-[var(--color-ink)]">
              ${deposit}
            </span>
          </div>
          <div className="flex items-center justify-between mb-[var(--space-sm)]">
            <span className="text-sm text-[var(--color-ink-muted)]">
              Balance after tour confirms
            </span>
            <span className="font-mono text-[var(--color-ink-muted)]">
              ${balance}
            </span>
          </div>
          <p className="text-xs text-[var(--color-ink-subtle)]">
            {depositPercent}% deposit · Applied to your total · {' '}
            <button
              type="button"
              onClick={() => setIsWhyDepositsOpen(true)}
              className="text-[var(--color-primary)] hover:underline"
            >
              Why deposits?
            </button>
          </p>
        </div>
      )}

      {/* Quorum Progress */}
      {status !== 'not-running' && (
        <div className="mb-[var(--space-md)]">
          <QuorumProgressBar
            current={currentParticipants}
            quorum={quorum}
            capacity={capacity}
          />
        </div>
      )}

      {/* CTA Button or Committed State */}
      {hasCommitted ? (
        <>
          {/* Committed confirmation */}
          <div className="
            mb-[var(--space-md)]
            p-[var(--space-md)]
            bg-[var(--color-primary-subtle)]
            rounded-[var(--radius-sm)]
            border border-[var(--color-primary)]
          ">
            <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-xs)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-[var(--color-primary)]">
                You're committed
              </span>
            </div>
            <p className="text-xs text-[var(--color-ink-muted)] ml-[26px]">
              {status === 'forming'
                ? "We'll notify you when this tour reaches quorum."
                : 'Your spot is confirmed.'}
            </p>
          </div>

          {/* Share buttons */}
          {status === 'forming' && (() => {
            const tourUrl = typeof window !== 'undefined'
              ? `${window.location.origin}/tours/${tourId}`
              : `/tours/${tourId}`;
            const spotsNeeded = Math.max(0, quorum - currentParticipants);
            const spotsText = spotsNeeded === 1 ? '1 more person' : `${spotsNeeded} more people`;
            const name = tourName || 'a birding tour';
            const loc = tourLocation || 'Australia';
            const op = operatorName || 'the operator';
            const species = targetSpecies || 'local birdlife';

            const xText = `Heading out ${tourDate || 'soon'} to spot ${species} at ${loc} with ${op}. Need ${spotsText}.`;
            const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(tourUrl)}`;

            const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(tourUrl)}&app_id=966242223397117&redirect_uri=${encodeURIComponent(tourUrl)}`;

            const waText = `Hey, joining a birding tour ${tourDate || 'soon'} at ${loc} with ${op}. We're tracking ${species}. Need ${spotsText} for it to run. You keen? ${tourUrl}`;
            const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;

            const emailSubject = `Join us for ${name} ${tourDate ? `on ${tourDate}` : ''}`;
            const emailBody = `Hi,\n\nI'm heading out on a birding tour ${tourDate ? `on ${tourDate} ` : ''}at ${loc} and thought you might be interested.\n\nThe tour is led by ${op} and we're specifically looking to see ${species}.\n\nWe just need ${spotsText} to confirm. If you're keen: ${tourUrl}\n\nCheers`;
            const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            const buttonClass = `
              flex-1 min-w-0
              inline-flex items-center justify-center gap-[var(--space-xs)]
              px-[var(--space-sm)] py-[var(--space-sm)]
              bg-[var(--color-surface)]
              border-2 border-[var(--color-border)]
              text-[var(--color-ink)]
              font-medium text-xs
              rounded-[var(--radius-md)]
              hover:border-[var(--color-primary)]
              hover:text-[var(--color-primary)]
              transition-colors
              min-h-[40px]
            `;

            return (
              <>
                <p className="text-sm text-[var(--color-ink)] font-medium text-center mb-[var(--space-sm)]">
                  Help this tour reach quorum
                </p>
                <p className="text-xs text-[var(--color-ink-subtle)] text-center mb-[var(--space-md)]">
                  {spotsNeeded > 0
                    ? `${spotsNeeded} more commitment${spotsNeeded === 1 ? '' : 's'} needed for this tour to run.`
                    : 'Quorum reached — share with friends who might want to join.'}
                </p>
                <div className="grid grid-cols-2 gap-[var(--space-sm)] mb-[var(--space-sm)]">
                  {/* X (Twitter) */}
                  <a href={xUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X
                  </a>

                  {/* Messenger */}
                  <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8.2l3.13 3.259L19.76 8.2l-6.567 6.763z"/>
                    </svg>
                    Messenger
                  </a>

                  {/* WhatsApp */}
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>

                  {/* Email */}
                  <a href={emailUrl} className={buttonClass}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Email
                  </a>
                </div>

                {/* Copy link */}
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(tourUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="
                    w-full
                    inline-flex items-center justify-center gap-[var(--space-xs)]
                    py-[var(--space-sm)]
                    text-xs text-[var(--color-ink-muted)]
                    hover:text-[var(--color-primary)]
                    transition-colors
                  "
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Link copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                      Copy link
                    </>
                  )}
                </button>
              </>
            );
          })()}
        </>
      ) : (
        <>
          {cta.disabled ? (
            <Button
              variant="primary"
              disabled
              className="
                w-full mb-[var(--space-md)]
                !bg-[var(--color-accent)]
                !text-[var(--color-ink)]
                !rounded-[var(--radius-organic)]
                !font-medium
                !shadow-[var(--shadow-card)]
              "
            >
              {cta.text}
            </Button>
          ) : (
            <Button
              variant="primary"
              href={ctaHref}
              className="
                w-full mb-[var(--space-md)]
                !bg-[var(--color-accent)]
                !text-[var(--color-ink)]
                hover:!bg-[var(--color-accent-hover)]
                !rounded-[var(--radius-organic)]
                !font-medium
                !shadow-[var(--shadow-card)]
                transition-all duration-200
              "
            >
              {cta.text}
            </Button>
          )}

          {/* Commitment Explanation */}
          <p className="text-sm text-[var(--color-ink-muted)] text-center">
            {cta.explanation}
          </p>

          {/* Additional Info for Forming Tours */}
          {status === 'forming' && (
            <div className="
              mt-[var(--space-lg)]
              pt-[var(--space-md)]
              border-t border-[var(--color-border)]
            ">
              <p className="text-xs text-[var(--color-ink-subtle)]">
                If the tour doesn't reach quorum, your deposit is fully refunded.
              </p>
            </div>
          )}
        </>
      )}

      {/* Why Deposits Modal */}
      <WhyDepositsModal
        isOpen={isWhyDepositsOpen}
        onClose={() => setIsWhyDepositsOpen(false)}
      />
    </div>
  );
}
