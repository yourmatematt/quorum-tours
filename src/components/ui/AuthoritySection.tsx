interface Credential {
  title: string;
  issuer: string;
  year?: number;
}

interface AuthoritySectionProps {
  specializations: string[];
  credentials: Credential[];
  affiliations: string[];
}

export function AuthoritySection({
  specializations,
  credentials,
  affiliations,
}: AuthoritySectionProps) {
  const hasContent = specializations.length > 0 || credentials.length > 0 || affiliations.length > 0;

  if (!hasContent) return null;

  return (
    <section className="mb-[var(--space-3xl)]">
      <h2 className="font-display text-lg text-[var(--color-ink)] mb-[var(--space-lg)]">
        Expertise
      </h2>

      <div className="space-y-[var(--space-xl)]">
        {/* Specializations */}
        {specializations.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              Specializations
            </h3>
            <div className="flex flex-wrap gap-[var(--space-sm)]">
              {specializations.map((spec, index) => (
                <span
                  key={index}
                  className="
                    px-[var(--space-sm)] py-[var(--space-xs)]
                    bg-[var(--color-surface-sunken)]
                    text-[var(--color-ink)]
                    text-sm
                    rounded-[var(--radius-sm)]
                  "
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Credentials */}
        {credentials.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              Credentials
            </h3>
            <ul className="space-y-[var(--space-sm)]">
              {credentials.map((cred, index) => (
                <li key={index} className="flex items-start gap-[var(--space-sm)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="var(--color-confirmed)"
                    strokeWidth="1.5"
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M2 8l4 4 8-8" />
                  </svg>
                  <div>
                    <span className="text-[var(--color-ink)]">{cred.title}</span>
                    <span className="text-[var(--color-ink-muted)]">
                      {' '}&mdash; {cred.issuer}
                      {cred.year && ` (${cred.year})`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Affiliations */}
        {affiliations.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-ink-muted)] mb-[var(--space-sm)]">
              Affiliations
            </h3>
            <ul className="space-y-[var(--space-xs)]">
              {affiliations.map((affiliation, index) => (
                <li key={index} className="text-[var(--color-ink)]">
                  {affiliation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
