import { Button } from './Button';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface CommitmentCardProps {
  status: ConfirmationStatus;
  price: number;
  priceNote?: string;
  currentParticipants: number;
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
    text: 'Express Interest',
    explanation: "You'll be notified when this tour confirms.",
    disabled: false,
  },
  'not-running': {
    text: 'Tour Closed',
    explanation: 'This tour did not reach threshold.',
    disabled: true,
  },
};

export function CommitmentCard({
  status,
  price,
  priceNote,
  currentParticipants,
}: CommitmentCardProps) {
  const cta = ctaConfig[status];

  return (
    <div className="
      bg-[var(--color-surface-raised)]
      border border-[var(--color-border)]
      rounded-[var(--radius-lg)]
      p-[var(--space-lg)]
    ">
      {/* Price Display */}
      <div className="mb-[var(--space-lg)]">
        <div className="flex items-baseline gap-[var(--space-xs)]">
          <span className="font-mono text-2xl font-medium text-[var(--color-ink)]">
            ${price}
          </span>
          <span className="text-sm text-[var(--color-ink-muted)]">
            per person
          </span>
        </div>
        {priceNote && (
          <p className="text-sm text-[var(--color-ink-subtle)] mt-1">
            {priceNote}
          </p>
        )}
      </div>

      {/* Interest Indicator */}
      {status !== 'not-running' && (
        <div className="
          flex items-center gap-[var(--space-sm)]
          mb-[var(--space-md)]
          text-sm text-[var(--color-ink-muted)]
        ">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="5" cy="6" r="2.5" />
            <circle cx="11" cy="6" r="2.5" />
            <path d="M1 14c0-2.5 1.5-4 4-4s4 1.5 4 4M7 14c0-2.5 1.5-4 4-4s4 1.5 4 4" />
          </svg>
          <span>
            <span className="font-mono font-medium text-[var(--color-ink)]">
              {currentParticipants}
            </span>
            {' '}birders interested
          </span>
        </div>
      )}

      {/* CTA Button */}
      <Button
        variant="primary"
        disabled={cta.disabled}
        className="w-full mb-[var(--space-md)]"
      >
        {cta.text}
      </Button>

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
            Expressing interest is not a binding commitment. Payment is only collected after the tour confirms.
          </p>
        </div>
      )}
    </div>
  );
}
