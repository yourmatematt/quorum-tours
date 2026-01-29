import { QuorumProgressBar } from './QuorumProgressBar';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface ConfirmationBannerProps {
  status: ConfirmationStatus;
  currentParticipants: number;
  quorum: number;
  capacity: number;
}

const statusConfig: Record<ConfirmationStatus, {
  title: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  getExplanation: (current: number, quorum: number) => string;
  getNextStep: (current: number, quorum: number) => string;
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
    getExplanation: (current, quorum) => `${current} of ${quorum} birders committed`,
    getNextStep: (current, quorum) => `${quorum - current} more needed to confirm`,
  },
  'not-running': {
    title: 'This tour did not reach quorum',
    bgColor: 'var(--color-not-running-bg)',
    borderColor: 'var(--color-not-running)',
    textColor: 'var(--color-not-running)',
    getExplanation: (current, quorum) => `${current} of ${quorum} needed`,
    getNextStep: () => 'This tour is closed',
  },
};

export function ConfirmationBanner({
  status,
  currentParticipants,
  quorum,
  capacity,
}: ConfirmationBannerProps) {
  const config = statusConfig[status];

  return (
    <div
      className="
        w-full
        p-[var(--space-lg)]
        rounded-[var(--radius-organic)]
        border-l-4
        shadow-[var(--shadow-card)]
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
          <QuorumProgressBar
            current={currentParticipants}
            quorum={quorum}
            capacity={capacity}
            showLabel={false}
          />
        </div>

        {/* Explanation and Next Step */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-[var(--space-xs)] sm:gap-[var(--space-lg)]">
          <span className="text-sm font-mono text-[var(--color-ink)]">
            {config.getExplanation(currentParticipants, quorum)}
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: config.textColor }}
          >
            {config.getNextStep(currentParticipants, quorum)}
          </span>
        </div>
      </div>
    </div>
  );
}
