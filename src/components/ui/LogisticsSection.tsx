interface LogisticsItem {
  icon: 'group' | 'fitness' | 'included' | 'policy' | 'time' | 'location';
  label: string;
  value: string;
  details?: string[];
}

interface LogisticsSectionProps {
  items: LogisticsItem[];
}

const icons: Record<LogisticsItem['icon'], JSX.Element> = {
  group: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="6" r="3" />
      <circle cx="13" cy="6" r="3" />
      <path d="M2 17c0-3 2-5 5-5s5 2 5 5M8 17c0-3 2-5 5-5s5 2 5 5" />
    </svg>
  ),
  fitness: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10h2l2 4 4-8 2 4h4" />
    </svg>
  ),
  included: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10l4 4 8-8" />
    </svg>
  ),
  policy: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M7 8h6M7 12h4" />
    </svg>
  ),
  time: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>
  ),
  location: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 17s-6-4.5-6-9a6 6 0 1112 0c0 4.5-6 9-6 9z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  ),
};

function LogisticsItem({ item }: { item: LogisticsItem }) {
  return (
    <div className="
      flex gap-[var(--space-md)]
      py-[var(--space-md)]
      border-b border-[var(--color-border)]
      last:border-b-0
    ">
      <div
        className="
          flex-shrink-0
          w-10 h-10
          flex items-center justify-center
          bg-[var(--color-surface-sunken)]
          rounded-[var(--radius-organic)]
          text-[var(--color-ink-subtle)]
        "
        aria-hidden="true"
      >
        {icons[item.icon]}
      </div>

      <div className="flex-1 min-w-0">
        <dt className="text-sm text-[var(--color-ink-muted)]">
          {item.label}
        </dt>
        <dd className="text-[var(--color-ink)] font-medium mt-0.5">
          {item.value}
        </dd>
        {item.details && item.details.length > 0 && (
          <ul className="mt-[var(--space-xs)] space-y-0.5">
            {item.details.map((detail, index) => (
              <li key={index} className="text-sm text-[var(--color-ink-muted)]">
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function LogisticsSection({ items }: LogisticsSectionProps) {
  return (
    <section>
      <h3 className="
        font-display text-lg text-[var(--color-ink)]
        mb-[var(--space-md)]
      ">
        Logistics
      </h3>

      <div className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        px-[var(--space-lg)]
      ">
        <dl>
          {items.map((item, index) => (
            <LogisticsItem key={index} item={item} />
          ))}
        </dl>
      </div>
    </section>
  );
}
