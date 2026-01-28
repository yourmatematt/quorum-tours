'use client';

/**
 * QuorumIndicator - Signature Component
 *
 * Visualizes the quorum formation mechanic that defines Quorum Tours.
 * Each circle represents a participant slot. Filled = committed, empty = needed.
 * When quorum is met, the indicator transforms to show "Confirmed" state.
 *
 * This is NOT a generic progress bar. It shows individual commitments
 * building toward a collective goal - the core product differentiator.
 */

interface QuorumIndicatorProps {
  /** Current number of committed participants */
  current: number;
  /** Minimum participants needed to confirm the tour (quorum) */
  quorum: number;
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
  quorum,
  max,
  size = 'md',
  showLabel = true,
  showStatus = true,
  compact = false,
}: QuorumIndicatorProps) {
  const isConfirmed = current >= quorum;
  const isFull = max ? current >= max : false;

  // Size configurations (all on 4px grid)
  const sizeConfig = {
    sm: { dot: 'w-3 h-3', gap: 'gap-1', text: 'text-xs' },
    md: { dot: 'w-4 h-4', gap: 'gap-2', text: 'text-sm' },
    lg: { dot: 'w-5 h-5', gap: 'gap-2', text: 'text-base' },
  };

  const config = sizeConfig[size];

  // Generate dots for visualization
  // Show quorum dots (the quorum requirement)
  // Plus any additional capacity if max > quorum and we want to show it
  const displayCount = max && max > quorum ? max : quorum;

  const dots = [];
  for (let i = 0; i < displayCount; i++) {
    const isFilled = i < current;
    const isQuorumDot = i < quorum;
    const isExtraCapacity = i >= quorum;

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
    ? `Quorum confirmed: ${current} of ${quorum} participants committed${isFull ? ', tour is full' : ''}`
    : `Quorum forming: ${current} of ${quorum} participants needed`;

  return (
    <div
      className="flex flex-col"
      role="meter"
      aria-label={ariaLabel}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={quorum}
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
              {current}/{quorum} participants
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
  quorum,
}: {
  current: number;
  quorum: number;
}) {
  const isConfirmed = current >= quorum;

  // For compact view, limit to 8 dots max, use proportional representation if needed
  const maxDots = 8;
  const displayQuorum = quorum <= maxDots ? quorum : maxDots;
  const displayCurrent = quorum <= maxDots
    ? current
    : Math.round((current / quorum) * maxDots);

  const dots = [];
  for (let i = 0; i < displayQuorum; i++) {
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
      aria-label={`${current} of ${quorum} participants`}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={quorum}
    >
      <div className="flex gap-1">
        {dots}
      </div>
      <span className={`text-xs font-medium ${
        isConfirmed
          ? 'text-[var(--color-confirmed)]'
          : 'text-[var(--color-forming)]'
      }`}>
        {current}/{quorum}
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
  quorum,
  size = 64,
  showCount = true,
}: {
  current: number;
  quorum: number;
  size?: number;
  showCount?: boolean;
}) {
  const isConfirmed = current >= quorum;
  const progress = Math.min(current / quorum, 1);

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
      aria-label={`${current} of ${quorum} participants`}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={quorum}
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
            /{quorum}
          </span>
        </div>
      )}
    </div>
  );
}
