'use client';

import { useState } from 'react';
import { Button } from './Button';
import { WhyDepositsModal } from './WhyDepositsModal';
import { QuorumProgressBar } from './QuorumProgressBar';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface CommitmentCardProps {
  status: ConfirmationStatus;
  price: number;
  deposit: number; // Actual deposit amount from database
  currentParticipants: number;
  quorum: number;
  tourId: string;
  isLoggedIn?: boolean;
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
  tourId,
  isLoggedIn = false,
}: CommitmentCardProps) {
  const [isWhyDepositsOpen, setIsWhyDepositsOpen] = useState(false);
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
          ${deposit} deposit to commit
        </p>
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
          />
        </div>
      )}

      {/* CTA Button */}
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

      {/* Why Deposits Modal */}
      <WhyDepositsModal
        isOpen={isWhyDepositsOpen}
        onClose={() => setIsWhyDepositsOpen(false)}
      />
    </div>
  );
}
