interface EquipmentItem {
  name: string;
  description?: string;
}

interface CapacityInfo {
  typical: string;
  maximum: number;
  privateAvailable: boolean;
}

interface CapabilitiesSectionProps {
  equipment: EquipmentItem[];
  capacity: CapacityInfo;
  accessibility: string[];
  languages: string[];
}

export function CapabilitiesSection({
  equipment,
  capacity,
  accessibility,
  languages,
}: CapabilitiesSectionProps) {
  const hasContent = equipment.length > 0 || accessibility.length > 0 || languages.length > 0;

  if (!hasContent) return null;

  return (
    <section className="mb-[var(--space-3xl)]">
      <h2 className="font-display text-lg text-[var(--color-ink)] mb-[var(--space-lg)]">
        Resources
      </h2>

      <div className="
        bg-[var(--color-surface-raised)]
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        p-[var(--space-lg)]
        space-y-[var(--space-xl)]
      ">
        {/* Capacity */}
        <div>
          <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
            Group Capacity
          </h3>
          <dl className="space-y-[var(--space-xs)]">
            <div className="flex gap-[var(--space-sm)]">
              <dt className="text-[var(--color-ink-subtle)]">Typical groups:</dt>
              <dd className="text-[var(--color-ink)]">{capacity.typical}</dd>
            </div>
            <div className="flex gap-[var(--space-sm)]">
              <dt className="text-[var(--color-ink-subtle)]">Maximum:</dt>
              <dd className="text-[var(--color-ink)]">{capacity.maximum} participants</dd>
            </div>
            {capacity.privateAvailable && (
              <div className="flex items-center gap-[var(--space-sm)]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="var(--color-confirmed)"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M2 7l3 3 7-7" />
                </svg>
                <span className="text-sm text-[var(--color-ink)]">
                  Private tours available
                </span>
              </div>
            )}
          </dl>
        </div>

        {/* Equipment */}
        {equipment.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              Equipment Provided
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              {equipment.map((item, index) => (
                <li key={index} className="flex items-start gap-[var(--space-sm)]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="var(--color-ink-subtle)"
                    strokeWidth="1.5"
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <circle cx="7" cy="7" r="2" fill="var(--color-ink-subtle)" />
                  </svg>
                  <div>
                    <span className="text-[var(--color-ink)]">{item.name}</span>
                    {item.description && (
                      <span className="text-[var(--color-ink-muted)]"> &mdash; {item.description}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Accessibility */}
        {accessibility.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              Accessibility
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              {accessibility.map((item, index) => (
                <li key={index} className="flex items-start gap-[var(--space-sm)]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="var(--color-confirmed)"
                    strokeWidth="1.5"
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M2 7l3 3 7-7" />
                  </svg>
                  <span className="text-[var(--color-ink)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              Languages
            </h3>
            <p className="text-[var(--color-ink)]">
              {languages.join(', ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
