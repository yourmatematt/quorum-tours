'use client';

type TrustTier = 'new' | 'trusted' | 'strike-1' | 'strike-2' | 'suspended';

interface DepositSectionProps {
  price: number;
  // In production these would come from user auth + tour settings
  userTrustTier?: TrustTier;
  operatorDepositPercent?: number;
}

// Calculate deposit based on trust tier
function calculateDeposit(
  price: number,
  trustTier: TrustTier,
  operatorDepositPercent: number
): { amount: number; percent: number } | null {
  switch (trustTier) {
    case 'trusted':
      return null;
    case 'strike-2':
      return { amount: Math.round(price * 0.5), percent: 50 };
    case 'new':
    case 'strike-1':
      return { amount: Math.round(price * (operatorDepositPercent / 100)), percent: operatorDepositPercent };
    case 'suspended':
      return null;
    default:
      return null;
  }
}

const trustTierInfo: Record<TrustTier, { label: string; explanation: string }> = {
  'new': {
    label: 'New to Quorum',
    explanation: 'First-time users pay a deposit to help operators plan with confidence.',
  },
  'trusted': {
    label: 'Trusted Member',
    explanation: 'You have a track record of following through on your commitments.',
  },
  'strike-1': {
    label: '1 Strike',
    explanation: 'You have one missed payment on your record.',
  },
  'strike-2': {
    label: '2 Strikes',
    explanation: 'Due to missed payments, a 50% deposit is required.',
  },
  'suspended': {
    label: 'Suspended',
    explanation: 'Your account is suspended. Contact support to appeal.',
  },
};

/**
 * DepositSection - Shows payment breakdown for forming tours
 *
 * Makes the two-stage payment process clear:
 * 1. Deposit now (if required based on trust tier)
 * 2. Balance after tour confirms
 *
 * Also explains the 24-hour payment window.
 */
export function DepositSection({
  price,
  userTrustTier = 'new',
  operatorDepositPercent = 20,
}: DepositSectionProps) {
  const deposit = calculateDeposit(price, userTrustTier, operatorDepositPercent);
  const tierInfo = trustTierInfo[userTrustTier];

  if (userTrustTier === 'suspended') {
    return (
      <div
        className="
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          p-[var(--space-lg)]
        "
      >
        <h3
          className="
            font-display
            text-[var(--text-lg)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          "
        >
          Account suspended
        </h3>
        <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
          Your account is currently suspended due to multiple missed payments.
          You cannot commit to tours until this is resolved.{' '}
          <a href="/profile" className="text-[var(--color-primary)] hover:underline">
            Contact support
          </a>{' '}
          to appeal.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-[var(--space-lg)]
      "
    >
      <h3
        className="
          font-display
          text-[var(--text-lg)]
          text-[var(--color-ink)]
          mb-[var(--space-md)]
        "
      >
        Payment breakdown
      </h3>

      {/* Trust tier indicator */}
      <div className="mb-[var(--space-md)] flex items-center gap-[var(--space-sm)]">
        <span
          className={`
            text-sm px-[var(--space-sm)] py-[var(--space-xs)]
            rounded-full
            ${userTrustTier === 'trusted'
              ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
              : userTrustTier === 'strike-2'
              ? 'bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]'
              : 'bg-[var(--color-surface-sunken)] text-[var(--color-ink)]'
            }
          `}
        >
          {tierInfo.label}
        </span>
      </div>

      {/* Payment breakdown */}
      <div className="space-y-[var(--space-sm)] mb-[var(--space-lg)]">
        {deposit ? (
          <>
            {/* Deposit now */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
                Deposit now ({deposit.percent}%)
              </span>
              <span className="font-mono font-medium text-[var(--color-ink)]">
                ${deposit.amount}
              </span>
            </div>

            {/* Balance later */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
                Balance when tour confirms
              </span>
              <span className="font-mono text-[var(--color-ink-muted)]">
                ${price - deposit.amount}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--color-border)] pt-[var(--space-sm)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-sm)] font-medium text-[var(--color-ink)]">
                  Total
                </span>
                <span className="font-mono font-medium text-[var(--color-ink)]">
                  ${price}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* No deposit required */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
                Today
              </span>
              <span className="font-mono font-medium text-[var(--color-primary)]">
                $0
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
                When tour confirms
              </span>
              <span className="font-mono font-medium text-[var(--color-ink)]">
                ${price}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Explanation based on tier */}
      <p className="text-[var(--text-sm)] text-[var(--color-ink-subtle)] mb-[var(--space-md)]">
        {tierInfo.explanation}
      </p>

      {/* 24-hour window explanation */}
      <div
        className="
          p-[var(--space-md)]
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-md)]
          border border-[var(--color-border)]
        "
      >
        <p className="text-[var(--text-sm)] font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
          How payment works
        </p>
        <ol className="text-[var(--text-sm)] text-[var(--color-ink-muted)] space-y-[var(--space-xs)]">
          {deposit && (
            <li className="flex gap-[var(--space-sm)]">
              <span className="font-mono text-[var(--color-primary)]">1.</span>
              <span>Your deposit (${deposit.amount}) is collected now</span>
            </li>
          )}
          <li className="flex gap-[var(--space-sm)]">
            <span className="font-mono text-[var(--color-primary)]">{deposit ? '2.' : '1.'}</span>
            <span>Tour reaches quorum and confirms</span>
          </li>
          <li className="flex gap-[var(--space-sm)]">
            <span className="font-mono text-[var(--color-primary)]">{deposit ? '3.' : '2.'}</span>
            <span>
              You receive email: <em>&quot;Pay balance within 24 hours&quot;</em>
            </span>
          </li>
          <li className="flex gap-[var(--space-sm)]">
            <span className="font-mono text-[var(--color-primary)]">{deposit ? '4.' : '3.'}</span>
            <span>
              Pay on time: {deposit ? 'deposit applies to total, ' : ''}booking confirmed
            </span>
          </li>
        </ol>

        {deposit && (
          <p className="text-[var(--text-xs)] text-[var(--color-ink-subtle)] mt-[var(--space-sm)] pt-[var(--space-sm)] border-t border-[var(--color-border)]">
            If you miss the 24-hour window: deposit goes to operator, you receive a strike,
            and your spot opens for the waitlist.{' '}
            <a href="/how-it-works#trust-system" className="text-[var(--color-primary)] hover:underline">
              Learn more
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
