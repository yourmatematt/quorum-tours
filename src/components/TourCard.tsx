import { ConfirmationStatusBadge } from './ui/ConfirmationStatusBadge';
import { ThresholdProgressBar } from './ui/ThresholdProgressBar';

type ConfirmationStatus = 'confirmed' | 'forming' | 'not-running';

interface TourCardProps {
  title: string;
  operatorName: string;
  status: ConfirmationStatus;
  currentParticipants: number;
  threshold: number;
  date: string;
  location: string;
  href?: string;
  speciesHighlight?: string;
}

export function TourCard({
  title,
  operatorName,
  status,
  currentParticipants,
  threshold,
  date,
  location,
  href = '#',
  speciesHighlight,
}: TourCardProps) {
  return (
    <a
      href={href}
      className="
        block
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-6
        transition-all duration-[var(--transition-normal)]
        hover:border-[var(--color-accent)]
        hover:shadow-[var(--shadow-card-hover)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
        group
      "
    >
      {/* Status - Always visible at top */}
      <div className="mb-4">
        <ConfirmationStatusBadge status={status} />
      </div>

      {/* Title */}
      <h3 className="
        font-display text-xl text-[var(--color-ink)]
        mb-2
        group-hover:text-[var(--color-accent)]
        transition-colors duration-[var(--transition-normal)]
      ">
        {title}
      </h3>

      {/* Operator */}
      <p className="text-sm text-[var(--color-ink-muted)] mb-4">
        with {operatorName}
      </p>

      {/* Details */}
      <div className="flex flex-wrap gap-4 text-sm text-[var(--color-ink-subtle)] mb-6">
        <span>{date}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{location}</span>
      </div>

      {/* Species highlight - optional */}
      {speciesHighlight && (
        <div className="
          flex items-center gap-2
          text-sm text-[var(--color-ink-muted)]
          mb-4
        ">
          <span
            className="text-[var(--color-accent)]"
            aria-hidden="true"
          >
            ◇
          </span>
          <span>{speciesHighlight}</span>
        </div>
      )}

      {/* Progress - Non-urgent display */}
      <ThresholdProgressBar
        current={currentParticipants}
        threshold={threshold}
      />
    </a>
  );
}
