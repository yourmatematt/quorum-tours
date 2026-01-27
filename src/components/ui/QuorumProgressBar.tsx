'use client';

/**
 * QuorumProgressBar - Quorum visualization using dots
 *
 * Each circle represents a participant slot. Filled = committed, empty = needed.
 * Orange (forming) when below quorum, green (confirmed) when quorum met.
 */

interface QuorumProgressBarProps {
  current: number;
  quorum: number;
  showLabel?: boolean;
  /** Maximum dots to display (uses proportional representation if quorum exceeds this) */
  maxDots?: number;
  /** Size variant */
  size?: 'sm' | 'md';
}

export function QuorumProgressBar({
  current,
  quorum,
  showLabel = true,
  maxDots = 10,
  size = 'md',
}: QuorumProgressBarProps) {
  const isConfirmed = current >= quorum;

  // Size configurations
  const sizeConfig = {
    sm: { dot: 'w-2.5 h-2.5', gap: 'gap-1', text: 'text-xs' },
    md: { dot: 'w-3 h-3', gap: 'gap-1.5', text: 'text-sm' },
  };

  const config = sizeConfig[size];

  // Calculate display dots (proportional if quorum > maxDots)
  const displayQuorum = quorum <= maxDots ? quorum : maxDots;
  const displayCurrent =
    quorum <= maxDots
      ? Math.min(current, quorum)
      : Math.round((Math.min(current, quorum) / quorum) * maxDots);

  const dots = [];
  for (let i = 0; i < displayQuorum; i++) {
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
        aria-valuemax={quorum}
        aria-label={`${current} of ${quorum} participants committed`}
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
            /{quorum} birders
          </span>
        )}
      </div>
    </div>
  );
}
