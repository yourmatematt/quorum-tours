interface ThresholdProgressBarProps {
  current: number;
  threshold: number;
  showLabel?: boolean;
}

export function ThresholdProgressBar({
  current,
  threshold,
  showLabel = true
}: ThresholdProgressBarProps) {
  const percentage = Math.min((current / threshold) * 100, 100);
  const isConfirmed = current >= threshold;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-[var(--color-ink-muted)]">
            <span className="font-mono font-medium text-[var(--color-ink)]">{current}</span>
            {' '}of{' '}
            <span className="font-mono">{threshold}</span>
            {' '}birders committed
          </span>
        </div>
      )}
      <div
        className="
          w-full h-3
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-pill)]
          overflow-hidden
        "
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={threshold}
        aria-label={`${current} of ${threshold} participants committed`}
      >
        <div
          className="h-full rounded-[var(--radius-pill)] transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: isConfirmed
              ? 'var(--color-confirmed)'
              : 'var(--color-forming)',
          }}
        />
      </div>
    </div>
  );
}
