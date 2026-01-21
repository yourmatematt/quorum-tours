interface PasswordRequirementsProps {
  password: string;
  /** ID to associate with password field via aria-describedby */
  id?: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
];

/**
 * PasswordRequirements - Visual checklist for password validation
 *
 * Shows password requirements proactively (not after failure).
 * Check marks appear as requirements are met.
 *
 * Design considerations:
 * - NO password strength meters (too gamified)
 * - NO "Strong password!" celebrations
 * - Simple, factual checklist
 * - Single requirement: 8 characters (reduces frustration for older users)
 */
export function PasswordRequirements({ password, id }: PasswordRequirementsProps) {
  return (
    <ul
      id={id}
      className="
        mt-[var(--space-xs)]
        space-y-[var(--space-xs)]
        text-[var(--text-sm)]
      "
      aria-label="Password requirements"
    >
      {requirements.map((req) => {
        const isMet = req.test(password);
        return (
          <li
            key={req.label}
            className={`
              flex items-center gap-[var(--space-xs)]
              transition-colors duration-[var(--transition-fast)]
              ${isMet ? 'text-[var(--color-confirmed)]' : 'text-[var(--color-ink-muted)]'}
            `}
          >
            {/* Check/Circle icon */}
            {isMet ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            )}
            <span>{req.label}</span>
            <span className="sr-only">
              {isMet ? '(requirement met)' : '(requirement not met)'}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
