'use client';

/**
 * ThresholdProgressBar - Quorum visualization using dots
 *
 * Each circle represents a participant slot. Filled = committed, empty = needed.
 * Orange (forming) when below threshold, green (confirmed) when threshold met.
 */

interface ThresholdProgressBarProps {
  current: number;
  threshold: number;
  showLabel?: boolean;
  /** Maximum dots to display (uses proportional representation if threshold exceeds this) */
  maxDots?: number;
  /** Size variant */
  size?: 'sm' | 'md';
}

export function ThresholdProgressBar({
  current,
  threshold,
  showLabel = true,
  maxDots = 10,
  size = 'md',
}: ThresholdProgressBarProps) {
  const isConfirmed = current >= threshold;

  // Size configurations
  const sizeConfig = {
    sm: { dot: 'w-2.5 h-2.5', gap: 'gap-1', text: 'text-xs' },
    md: { dot: 'w-3 h-3', gap: 'gap-1.5', text: 'text-sm' },
  };

  const config = sizeConfig[size];

  // Calculate display dots (proportional if threshold > maxDots)
  const displayThreshold = threshold <= maxDots ? threshold : maxDots;
  const displayCurrent =
    threshold <= maxDots
      ? Math.min(current, threshold)
      : Math.round((Math.min(current, threshold) / threshold) * maxDots);

  const dots = [];
  for (let i = 0; i < displayThreshold; i++) {
    const isFilled = i < displayCurrent;
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

  return (
    <div className="w-full">
      <div
        className={`flex items-center ${config.gap} ${showLabel ? 'justify-between' : ''}`}
        role="meter"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={threshold}
        aria-label={`${current} of ${threshold} participants committed`}
      >
        {/* Dots visualization */}
        <div className={`flex ${config.gap}`}>{dots}</div>

        {/* Label */}
        {showLabel && (
          <span className={`${config.text} text-[var(--color-ink-muted)] whitespace-nowrap ml-2`}>
            <span
              className={`font-mono font-medium ${
                isConfirmed
                  ? 'text-[var(--color-confirmed)]'
                  : 'text-[var(--color-forming)]'
              }`}
            >
              {current}
            </span>
            /{threshold} birders
          </span>
        )}
      </div>
    </div>
  );
}
