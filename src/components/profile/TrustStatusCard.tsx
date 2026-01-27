import Link from 'next/link';

type TrustTier = 'new' | 'trusted' | 'strike-1' | 'strike-2' | 'suspended';

interface TrustStatusCardProps {
  // In production, these would come from user data
  trustTier: TrustTier;
  completedTours: number;
  strikeCount: number;
}

const tierConfig: Record<TrustTier, {
  label: string;
  shortDesc: string;
  depositNote: string;
  color: string;
  bgColor: string;
}> = {
  'new': {
    label: 'New Member',
    shortDesc: 'Complete a tour to unlock Trusted status',
    depositNote: 'Deposit required',
    color: 'text-[var(--color-ink)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
  },
  'trusted': {
    label: 'Trusted',
    shortDesc: 'No deposit required on tours',
    depositNote: 'No deposit',
    color: 'text-[var(--color-primary)]',
    bgColor: 'bg-[var(--color-primary-subtle)]',
  },
  'strike-1': {
    label: '1 Strike',
    shortDesc: 'Missed payment deadline',
    depositNote: 'Deposit required',
    color: 'text-[var(--color-ink)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
  },
  'strike-2': {
    label: '2 Strikes',
    shortDesc: 'One more results in suspension',
    depositNote: '50% deposit',
    color: 'text-[var(--color-ink-muted)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
  },
  'suspended': {
    label: 'Suspended',
    shortDesc: 'Cannot book tours',
    depositNote: 'Booking disabled',
    color: 'text-[var(--color-ink-subtle)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
  },
};

/**
 * TrustStatusCard - Compact account status for dashboard
 *
 * Redesigned for dashboard column layout:
 * - Smaller, denser layout
 * - Key info at a glance
 * - Link to full details
 */
export function TrustStatusCard({
  trustTier,
  completedTours,
  strikeCount,
}: TrustStatusCardProps) {
  const config = tierConfig[trustTier];

  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        p-4 h-full
      "
    >
      {/* Compact header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)]">
          Account Status
        </h2>
        <span
          className={`
            px-2 py-0.5
            rounded-full
            text-xs font-medium
            ${config.bgColor}
            ${config.color}
          `}
        >
          {config.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-ink)] mb-3">
        {config.shortDesc}
      </p>

      {/* Compact stats row */}
      <div className="flex gap-4 mb-3">
        <div>
          <p className="text-xs text-[var(--color-ink-subtle)]">Tours</p>
          <p className="font-mono text-lg text-[var(--color-ink)]">{completedTours}</p>
        </div>
        {strikeCount > 0 && (
          <div>
            <p className="text-xs text-[var(--color-ink-subtle)]">Strikes</p>
            <p className="font-mono text-lg text-[var(--color-ink)]">{strikeCount}</p>
          </div>
        )}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <Link
          href="/how-it-works#trust-system"
          className="text-[var(--color-primary)] hover:underline"
        >
          Learn more →
        </Link>
        {strikeCount > 0 && (
          <Link
            href="/profile/appeal"
            className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
          >
            Appeal
          </Link>
        )}
      </div>
    </div>
  );
}
