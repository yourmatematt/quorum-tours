'use client';

/**
 * QuorumIndicator - Signature Component
 *
 * Visualizes the quorum formation mechanic that defines Quorum Tours.
 * Each circle represents a participant slot. Filled = committed, empty = needed.
 * When threshold is met, the indicator transforms to show "Confirmed" state.
 *
 * This is NOT a generic progress bar. It shows individual commitments
 * building toward a collective goal - the core product differentiator.
 */

interface QuorumIndicatorProps {
  /** Current number of committed participants */
  current: number;
  /** Minimum participants needed to confirm the tour (quorum threshold) */
  threshold: number;
  /** Maximum participants allowed (optional, for showing additional capacity) */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show numeric label */
  showLabel?: boolean;
  /** Show "Confirmed" or "Forming" status text */
  showStatus?: boolean;
  /** Compact mode - single row, no wrapping */
  compact?: boolean;
}

export function QuorumIndicator({
  current,
  threshold,
  max,
  size = 'md',
  showLabel = true,
  showStatus = true,
  compact = false,
}: QuorumIndicatorProps) {
  const isConfirmed = current >= threshold;
  const isFull = max ? current >= max : false;

  // Size configurations (all on 4px grid)
  const sizeConfig = {
    sm: { dot: 'w-3 h-3', gap: 'gap-1', text: 'text-xs' },
    md: { dot: 'w-4 h-4', gap: 'gap-2', text: 'text-sm' },
    lg: { dot: 'w-5 h-5', gap: 'gap-2', text: 'text-base' },
  };

  const config = sizeConfig[size];

  // Generate dots for visualization
  // Show threshold dots (the quorum requirement)
  // Plus any additional capacity if max > threshold and we want to show it
  const displayCount = max && max > threshold ? max : threshold;

  const dots = [];
  for (let i = 0; i < displayCount; i++) {
    const isFilled = i < current;
    const isThresholdDot = i < threshold;
    const isExtraCapacity = i >= threshold;

    dots.push(
      <span
        key={i}
        className={`
          ${config.dot} rounded-full transition-all duration-300
          ${isFilled
            ? isConfirmed
              ? 'bg-[var(--color-confirmed)] shadow-[0_0_8px_var(--color-confirmed)]'
              : 'bg-[var(--color-forming)]'
            : isExtraCapacity
              ? 'bg-[var(--color-surface-sunken)] border border-dashed border-[var(--color-border)]'
              : 'bg-[var(--color-surface-sunken)] border-2 border-[var(--color-border)]'
          }
          ${isFilled && isConfirmed ? 'scale-110' : ''}
        `}
        aria-hidden="true"
      />
    );
  }

  // Accessibility label
  const ariaLabel = isConfirmed
    ? `Quorum confirmed: ${current} of ${threshold} participants committed${isFull ? ', tour is full' : ''}`
    : `Quorum forming: ${current} of ${threshold} participants needed`;

  return (
    <div
      className="flex flex-col"
      role="meter"
      aria-label={ariaLabel}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={threshold}
    >
      {/* Dots visualization */}
      <div className={`flex ${config.gap} ${compact ? '' : 'flex-wrap'}`}>
        {dots}
      </div>

      {/* Label and status */}
      {(showLabel || showStatus) && (
        <div className={`flex items-center justify-between mt-2 ${config.text}`}>
          {showLabel && (
            <span className="text-[var(--color-ink-muted)]">
              {current}/{threshold} participants
              {isFull && <span className="ml-1 font-medium">(Full)</span>}
            </span>
          )}

          {showStatus && (
            <span
              className={`font-medium ${
                isConfirmed
                  ? 'text-[var(--color-confirmed)]'
                  : 'text-[var(--color-forming)]'
              }`}
            >
              {isConfirmed ? 'Quorum Reached' : 'Forming'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * QuorumIndicatorCompact - Inline variant for tables and cards
 * Shows dots + count in a single horizontal line
 */
export function QuorumIndicatorCompact({
  current,
  threshold,
}: {
  current: number;
  threshold: number;
}) {
  const isConfirmed = current >= threshold;

  // For compact view, limit to 8 dots max, use proportional representation if needed
  const maxDots = 8;
  const displayThreshold = threshold <= maxDots ? threshold : maxDots;
  const displayCurrent = threshold <= maxDots
    ? current
    : Math.round((current / threshold) * maxDots);

  const dots = [];
  for (let i = 0; i < displayThreshold; i++) {
    const isFilled = i < displayCurrent;
    dots.push(
      <span
        key={i}
        className={`
          w-2 h-2 rounded-full transition-all duration-300
          ${isFilled
            ? isConfirmed
              ? 'bg-[var(--color-confirmed)]'
              : 'bg-[var(--color-forming)]'
            : 'bg-[var(--color-surface-sunken)] border border-[var(--color-border)]'
          }
        `}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="inline-flex items-center gap-2"
      role="meter"
      aria-label={`${current} of ${threshold} participants`}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={threshold}
    >
      <div className="flex gap-1">
        {dots}
      </div>
      <span className={`text-xs font-medium ${
        isConfirmed
          ? 'text-[var(--color-confirmed)]'
          : 'text-[var(--color-forming)]'
      }`}>
        {current}/{threshold}
      </span>
    </div>
  );
}

/**
 * QuorumIndicatorRing - Circular variant for dashboard stats
 * Shows progress as a ring that completes at threshold
 */
export function QuorumIndicatorRing({
  current,
  threshold,
  size = 64,
  showCount = true,
}: {
  current: number;
  threshold: number;
  size?: number;
  showCount?: boolean;
}) {
  const isConfirmed = current >= threshold;
  const progress = Math.min(current / threshold, 1);

  // SVG circle calculations
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="meter"
      aria-label={`${current} of ${threshold} participants`}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={threshold}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-sunken)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isConfirmed ? 'var(--color-confirmed)' : 'var(--color-forming)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {showCount && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display font-semibold leading-none ${
            size >= 64 ? 'text-lg' : 'text-sm'
          } text-[var(--color-ink)]`}>
            {current}
          </span>
          <span className="text-xs text-[var(--color-ink-muted)]">
            /{threshold}
          </span>
        </div>
      )}
    </div>
  );
}
