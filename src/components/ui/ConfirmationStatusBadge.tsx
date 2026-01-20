type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface ConfirmationStatusBadgeProps {
  status: ConfirmationStatus;
}

const statusConfig: Record<ConfirmationStatus, { label: string; bgColor: string; textColor: string }> = {
  confirmed: {
    label: 'Confirmed',
    bgColor: 'var(--color-confirmed-bg)',
    textColor: 'var(--color-confirmed)',
  },
  forming: {
    label: 'Forming',
    bgColor: 'var(--color-forming-bg)',
    textColor: 'var(--color-forming)',
  },
  'not-running': {
    label: 'Not Running',
    bgColor: 'var(--color-not-running-bg)',
    textColor: 'var(--color-not-running)',
  },
};

export function ConfirmationStatusBadge({ status }: ConfirmationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className="
        inline-flex items-center
        px-3 py-1
        text-sm font-medium
        rounded-[var(--radius-pill)]
      "
      style={{
        backgroundColor: config.bgColor,
        color: config.textColor,
      }}
    >
      <span
        className="w-2 h-2 rounded-full mr-2"
        style={{ backgroundColor: config.textColor }}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
