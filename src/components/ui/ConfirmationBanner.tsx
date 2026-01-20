import { ThresholdProgressBar } from './ThresholdProgressBar';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface ConfirmationBannerProps {
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
}

const statusConfig: Record<ConfirmationStatus, {
  title: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  getExplanation: (current: number, threshold: number) => string;
  getNextStep: (current: number, threshold: number) => string;
}> = {
  confirmed: {
    title: 'This tour is confirmed',
    bgColor: 'var(--color-confirmed-bg)',
    borderColor: 'var(--color-confirmed)',
    textColor: 'var(--color-confirmed)',
    getExplanation: (current) => `${current} birders committed · Tour is running`,
    getNextStep: (current) => `Join ${current} others on this tour`,
  },
  forming: {
    title: 'This tour is forming',
    bgColor: 'var(--color-forming-bg)',
    borderColor: 'var(--color-forming)',
    textColor: 'var(--color-forming)',
    getExplanation: (current, threshold) => `${current} of ${threshold} birders committed`,
    getNextStep: (current, threshold) => `${threshold - current} more needed to confirm`,
  },
  'not-running': {
    title: 'This tour did not reach threshold',
    bgColor: 'var(--color-not-running-bg)',
    borderColor: 'var(--color-not-running)',
    textColor: 'var(--color-not-running)',
    getExplanation: (current, threshold) => `${current} of ${threshold} needed`,
    getNextStep: () => 'This tour is closed',
  },
};

export function ConfirmationBanner({
  status,
  currentParticipants,
  threshold,
}: ConfirmationBannerProps) {
  const config = statusConfig[status];

  return (
    <div
      className="
        w-full
        p-[var(--space-lg)]
        rounded-[var(--radius-lg)]
        border-l-4
      "
      style={{
        backgroundColor: config.bgColor,
        borderLeftColor: config.borderColor,
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col gap-[var(--space-md)]">
        {/* Status Title */}
        <div className="flex items-center gap-[var(--space-sm)]">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: config.borderColor }}
            aria-hidden="true"
          />
          <h2
            className="text-lg font-medium"
            style={{ color: config.textColor }}
          >
            {config.title}
          </h2>
        </div>

        {/* Progress Bar (larger variant) */}
        <div className="max-w-md">
          <ThresholdProgressBar
            current={currentParticipants}
            threshold={threshold}
            showLabel={false}
          />
        </div>

        {/* Explanation and Next Step */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-[var(--space-xs)] sm:gap-[var(--space-lg)]">
          <span className="text-sm font-mono text-[var(--color-ink)]">
            {config.getExplanation(currentParticipants, threshold)}
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: config.textColor }}
          >
            {config.getNextStep(currentParticipants, threshold)}
          </span>
        </div>
      </div>
    </div>
  );
}
