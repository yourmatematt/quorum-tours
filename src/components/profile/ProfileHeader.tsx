'use client';

type TrustTier = 'new' | 'trusted' | 'strike-1' | 'strike-2' | 'suspended';

interface ProfileHeaderProps {
  displayName: string;
  memberSince: string;
  trustTier: TrustTier;
}

const trustConfig: Record<TrustTier, {
  label: string;
  note: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
}> = {
  'new': {
    label: 'New Member',
    note: 'Deposit required',
    iconColor: 'text-[var(--color-ink-muted)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
    textColor: 'text-[var(--color-ink)]',
  },
  'trusted': {
    label: 'Trusted',
    note: 'No deposit required',
    iconColor: 'text-[var(--color-confirmed)]',
    bgColor: 'bg-[var(--color-confirmed-bg)]',
    textColor: 'text-[var(--color-confirmed)]',
  },
  'strike-1': {
    label: '1 Strike',
    note: 'Deposit required',
    iconColor: 'text-[var(--color-forming)]',
    bgColor: 'bg-[var(--color-forming-bg)]',
    textColor: 'text-[var(--color-forming)]',
  },
  'strike-2': {
    label: '2 Strikes',
    note: '50% deposit required',
    iconColor: 'text-[var(--color-forming)]',
    bgColor: 'bg-[var(--color-forming-bg)]',
    textColor: 'text-[var(--color-forming)]',
  },
  'suspended': {
    label: 'Suspended',
    note: 'Cannot book tours',
    iconColor: 'text-[var(--color-ink-subtle)]',
    bgColor: 'bg-[var(--color-surface-sunken)]',
    textColor: 'text-[var(--color-ink-muted)]',
  },
};

/**
 * ProfileHeader - Compact inline profile row
 *
 * Design: Avatar + name/member-since LEFT, trust badge RIGHT
 * Replaces separate ProfileHeader + TrustStatusCard
 */
export function ProfileHeader({
  displayName,
  memberSince,
  trustTier,
}: ProfileHeaderProps) {
  const trust = trustConfig[trustTier];
  const initials = displayName.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-display text-base font-medium flex-shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="font-display text-lg font-semibold text-[var(--color-ink)] leading-tight">
            {displayName}
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)]">
            Member since {memberSince}
          </p>
        </div>
      </div>

      {/* Right: Trust Badge */}
      <div
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          ${trust.bgColor}
        `}
      >
        {/* Shield icon with checkmark */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={trust.iconColor}
        >
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {trustTier === 'trusted' && (
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {(trustTier === 'strike-1' || trustTier === 'strike-2') && (
            <text
              x="12"
              y="14"
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              fontWeight="bold"
            >
              {trustTier === 'strike-1' ? '1' : '2'}
            </text>
          )}
          {trustTier === 'suspended' && (
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
        <span className={`text-sm font-medium ${trust.textColor}`}>
          {trust.label} · {trust.note}
        </span>
      </div>
    </div>
  );
}
