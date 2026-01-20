interface TrackRecordSummaryProps {
  toursCompleted: number;
  confirmationRate: number;
  totalParticipants: number;
}

export function TrackRecordSummary({
  toursCompleted,
  confirmationRate,
  totalParticipants,
}: TrackRecordSummaryProps) {
  return (
    <div className="
      grid grid-cols-3 gap-[var(--space-md)]
      p-[var(--space-lg)]
      bg-[var(--color-surface-sunken)]
      rounded-[var(--radius-lg)]
    ">
      <div className="text-center">
        <div className="font-mono text-xl text-[var(--color-ink)]">
          {toursCompleted}
        </div>
        <div className="text-xs text-[var(--color-ink-muted)]">
          Tours completed
        </div>
      </div>

      <div className="text-center border-x border-[var(--color-border)]">
        <div className="font-mono text-xl text-[var(--color-ink)]">
          {confirmationRate}%
        </div>
        <div className="text-xs text-[var(--color-ink-muted)]">
          Confirmation rate
        </div>
      </div>

      <div className="text-center">
        <div className="font-mono text-xl text-[var(--color-ink)]">
          {totalParticipants}
        </div>
        <div className="text-xs text-[var(--color-ink-muted)]">
          Birders guided
        </div>
      </div>
    </div>
  );
}
