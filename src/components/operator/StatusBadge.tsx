'use client';

/**
 * StatusBadge - Unified Status Indicator Component
 *
 * Replaces duplicated statusConfig patterns across operator dashboard views.
 * Uses semantic tokens from the design system for consistent status presentation.
 *
 * Status vocabulary is domain-specific:
 * - forming/confirmed: Tour quorum states
 * - held/paid/cancelled: Booking payment states
 * - pending/completed: Generic workflow states
 */

export type StatusVariant =
  // Tour quorum states
  | 'forming'
  | 'confirmed'
  | 'payment_pending'
  | 'past'
  | 'completed'
  // Booking/payment states
  | 'held'
  | 'paid'
  | 'pending'
  | 'cancelled'
  | 'forfeited'
  // Generic states
  | 'info'
  | 'neutral';

interface StatusBadgeProps {
  /** The status variant */
  status: StatusVariant;
  /** Optional custom label (defaults to capitalized status) */
  label?: string;
  /** Show emoji icon prefix */
  showIcon?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Additional CSS classes */
  className?: string;
}

const statusConfig: Record<StatusVariant, {
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}> = {
  // Tour quorum states - Domain specific vocabulary
  forming: {
    label: 'Forming',
    icon: '○',
    bgColor: 'bg-[var(--color-forming-bg)]',
    textColor: 'text-[var(--color-forming)]',
    borderColor: 'border-[var(--color-warning-border)]',
  },
  confirmed: {
    label: 'Confirmed',
    icon: '●',
    bgColor: 'bg-[var(--color-confirmed-bg)]',
    textColor: 'text-[var(--color-confirmed)]',
    borderColor: 'border-[var(--color-success-border)]',
  },
  payment_pending: {
    label: 'Payment Pending',
    icon: '◷',
    bgColor: 'bg-[var(--color-warning-bg)]',
    textColor: 'text-[var(--color-warning-text)]',
    borderColor: 'border-[var(--color-warning-border)]',
  },
  past: {
    label: 'Completed',
    icon: '◐',
    bgColor: 'bg-[var(--color-not-running-bg)]',
    textColor: 'text-[var(--color-not-running)]',
    borderColor: 'border-[var(--color-border)]',
  },
  completed: {
    label: 'Completed',
    icon: '◐',
    bgColor: 'bg-[var(--color-not-running-bg)]',
    textColor: 'text-[var(--color-not-running)]',
    borderColor: 'border-[var(--color-border)]',
  },

  // Booking/payment states
  held: {
    label: 'Held',
    icon: '◷',
    bgColor: 'bg-[var(--color-warning-bg)]',
    textColor: 'text-[var(--color-warning-text)]',
    borderColor: 'border-[var(--color-warning-border)]',
  },
  paid: {
    label: 'Paid',
    icon: '✓',
    bgColor: 'bg-[var(--color-success-bg)]',
    textColor: 'text-[var(--color-success-text)]',
    borderColor: 'border-[var(--color-success-border)]',
  },
  pending: {
    label: 'Pending',
    icon: '◷',
    bgColor: 'bg-[var(--color-warning-bg)]',
    textColor: 'text-[var(--color-warning-text)]',
    borderColor: 'border-[var(--color-warning-border)]',
  },
  cancelled: {
    label: 'Cancelled',
    icon: '✕',
    bgColor: 'bg-[var(--color-destructive-bg)]',
    textColor: 'text-[var(--color-destructive-text)]',
    borderColor: 'border-[var(--color-destructive-border)]',
  },
  forfeited: {
    label: 'Forfeited',
    icon: '⚠',
    bgColor: 'bg-[var(--color-warning-bg)]',
    textColor: 'text-[var(--color-warning-text)]',
    borderColor: 'border-[var(--color-warning-border)]',
  },

  // Generic states
  info: {
    label: 'Info',
    icon: 'ℹ',
    bgColor: 'bg-[var(--color-info-bg)]',
    textColor: 'text-[var(--color-info-text)]',
    borderColor: 'border-[var(--color-info-border)]',
  },
  neutral: {
    label: 'Neutral',
    icon: '•',
    bgColor: 'bg-[var(--color-surface-sunken)]',
    textColor: 'text-[var(--color-ink-muted)]',
    borderColor: 'border-[var(--color-border)]',
  },
};

export function StatusBadge({
  status,
  label,
  showIcon = false,
  size = 'md',
  className = '',
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  // Size classes - all on 4px grid
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        ${sizeClasses[size]}
        ${config.bgColor}
        ${config.textColor}
        border ${config.borderColor}
        rounded-full font-medium
        ${className}
      `}
    >
      {showIcon && (
        <span className="leading-none" aria-hidden="true">
          {config.icon}
        </span>
      )}
      {displayLabel}
    </span>
  );
}

/**
 * StatusBadge.Tour - Preset for tour status display
 * Shows icon by default, uses uppercase labels
 */
StatusBadge.Tour = function TourStatusBadge({
  status,
  className = '',
}: {
  status: 'forming' | 'confirmed' | 'past' | 'cancelled';
  className?: string;
}) {
  const labels: Record<string, string> = {
    forming: 'FORMING',
    confirmed: 'CONFIRMED',
    past: 'COMPLETED',
    cancelled: 'CANCELLED',
  };

  return (
    <StatusBadge
      status={status}
      label={labels[status]}
      showIcon={true}
      className={className}
    />
  );
};

/**
 * StatusBadge.Booking - Preset for booking status display
 */
StatusBadge.Booking = function BookingStatusBadge({
  status,
  className = '',
}: {
  status: 'held' | 'paid' | 'cancelled' | 'forfeited';
  className?: string;
}) {
  return (
    <StatusBadge
      status={status}
      showIcon={false}
      className={className}
    />
  );
};

/**
 * StatusBadge.Payout - Preset for payout/earnings status display
 */
StatusBadge.Payout = function PayoutStatusBadge({
  status,
  className = '',
}: {
  status: 'pending' | 'paid';
  className?: string;
}) {
  return (
    <StatusBadge
      status={status}
      showIcon={false}
      className={className}
    />
  );
};
