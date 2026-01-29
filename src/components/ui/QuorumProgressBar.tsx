'use client';

/**
 * QuorumProgressBar - Two-phase progress visualization
 *
 * Phase 1 (Forming): Shows progress toward quorum using dots
 * Phase 2 (Confirmed): Shows spots filled / spots remaining toward capacity
 *
 * Visual states:
 * - Forming (orange): Below quorum, need more people to run
 * - Confirmed (green): Quorum met, tour will run, showing available spots
 */

interface QuorumProgressBarProps {
  current: number;
  quorum: number;
  capacity: number;
  showLabel?: boolean;
  /** Maximum dots to display (uses proportional representation if exceeds this) */
  maxDots?: number;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Show detailed breakdown text */
  showDetails?: boolean;
}

export function QuorumProgressBar({
  current,
  quorum,
  capacity,
  showLabel = true,
  maxDots = 10,
  size = 'md',
  showDetails = false,
}: QuorumProgressBarProps) {
  const isConfirmed = current >= quorum;
  const isFull = current >= capacity;
  const spotsRemaining = Math.max(0, capacity - current);

  // Size configurations
  const sizeConfig = {
    sm: { dot: 'w-2.5 h-2.5', gap: 'gap-1', text: 'text-xs' },
    md: { dot: 'w-3 h-3', gap: 'gap-1.5', text: 'text-sm' },
  };

  const config = sizeConfig[size];

  // Determine what to show based on phase
  // Phase 1 (Forming): Show progress to quorum
  // Phase 2 (Confirmed): Show filled spots / capacity
  const displayMax = isConfirmed ? capacity : quorum;
  const displayCurrent = Math.min(current, displayMax);

  // Calculate display dots (proportional if displayMax > maxDots)
  const displayDots = displayMax <= maxDots ? displayMax : maxDots;
  const filledDots =
    displayMax <= maxDots
      ? displayCurrent
      : Math.round((displayCurrent / displayMax) * maxDots);

  const dots = [];
  for (let i = 0; i < displayDots; i++) {
    const isFilled = i < filledDots;
    dots.push(
      <span
        key={i}
        className={`
          ${config.dot} rounded-full transition-all duration-300
          ${
            isFilled
              ? isConfirmed
                ? 'bg-[var(--color-confirmed)]'
                : 'bg-[var(--color-forming)]'
              : 'bg-[var(--color-surface-sunken)] border-2 border-[var(--color-border)]'
          }
        `}
        aria-hidden="true"
      />
    );
  }

  // Label text based on phase
  const labelText = isConfirmed
    ? isFull
      ? 'Tour full'
      : `${spotsRemaining} ${spotsRemaining === 1 ? 'spot' : 'spots'} left`
    : `${current}/${quorum} to run`;

  return (
    <div className="w-full">
      <div
        className={`flex items-center ${config.gap} ${showLabel ? 'justify-between' : ''}`}
        role="meter"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={displayMax}
        aria-label={
          isConfirmed
            ? `Tour confirmed. ${current} of ${capacity} spots filled.`
            : `${current} of ${quorum} participants needed for tour to run.`
        }
      >
        {/* Dots visualization */}
        <div className={`flex ${config.gap}`}>{dots}</div>

        {/* Label */}
        {showLabel && (
          <span className={`${config.text} text-[var(--color-ink-muted)] whitespace-nowrap ml-2`}>
            <span
              className={`font-medium ${
                isFull
                  ? 'text-[var(--color-ink-muted)]'
                  : isConfirmed
                    ? 'text-[var(--color-confirmed)]'
                    : 'text-[var(--color-forming)]'
              }`}
            >
              {labelText}
            </span>
          </span>
        )}
      </div>

      {/* Detailed breakdown (optional) */}
      {showDetails && (
        <div className={`mt-1 ${config.text} text-[var(--color-ink-subtle)]`}>
          {isConfirmed ? (
            <span>
              Quorum reached ({quorum} minimum) · {current}/{capacity} booked
            </span>
          ) : (
            <span>
              {quorum - current} more {quorum - current === 1 ? 'person' : 'people'} needed to confirm
            </span>
          )}
        </div>
      )}
    </div>
  );
}
