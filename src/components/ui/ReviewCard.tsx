interface ReviewCardProps {
  reviewerName: string;
  tourId: string;
  tourTitle: string;
  tourDate: string;
  reviewDate: string;
  rating: number;
  text: string;
  operatorResponse?: string;
}

export function ReviewCard({
  reviewerName,
  tourId,
  tourTitle,
  tourDate,
  reviewDate,
  rating,
  text,
  operatorResponse,
}: ReviewCardProps) {
  return (
    <article className="
      border-b border-[var(--color-border)]
      pb-[var(--space-lg)]
      last:border-b-0 last:pb-0
    ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[var(--space-sm)] mb-[var(--space-md)]">
        <div>
          <div className="font-medium text-[var(--color-ink)]">
            {reviewerName}
          </div>
          <div className="text-sm text-[var(--color-ink-muted)]">
            <a
              href={`/tours/${tourId}`}
              className="text-[var(--color-primary)] hover:underline"
            >
              {tourTitle}
            </a>
            {' '}&middot; {tourDate}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-[var(--space-xs)]" aria-label={`Rating: ${rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill={star <= rating ? 'var(--color-forming)' : 'none'}
              stroke="var(--color-forming)"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M8 1l2.2 4.4 4.8.7-3.5 3.4.8 4.8L8 12.2l-4.3 2.1.8-4.8-3.5-3.4 4.8-.7L8 1z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-[var(--color-ink-muted)] leading-relaxed mb-[var(--space-sm)]">
        {text}
      </p>

      {/* Review Date */}
      <div className="text-xs text-[var(--color-ink-subtle)]">
        Reviewed {reviewDate}
      </div>

      {/* Operator Response */}
      {operatorResponse && (
        <div className="
          mt-[var(--space-md)]
          pl-[var(--space-md)]
          border-l-2 border-[var(--color-primary)]
        ">
          <div className="text-sm font-medium text-[var(--color-ink)] mb-[var(--space-xs)]">
            Operator response
          </div>
          <p className="text-sm text-[var(--color-ink-muted)]">
            {operatorResponse}
          </p>
        </div>
      )}
    </article>
  );
}
