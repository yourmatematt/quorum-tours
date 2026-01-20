import { type ReactNode } from 'react';

type AlertVariant = 'error' | 'success' | 'info';

interface FormAlertProps {
  variant: AlertVariant;
  children: ReactNode;
}

const variantStyles: Record<AlertVariant, { container: string; icon: ReactNode }> = {
  error: {
    container: `
      bg-[var(--color-danger-bg)]
      border-[var(--color-danger)]
      text-[var(--color-danger)]
    `,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  success: {
    container: `
      bg-[var(--color-confirmed-bg)]
      border-[var(--color-confirmed)]
      text-[var(--color-confirmed)]
    `,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  info: {
    container: `
      bg-[var(--color-surface-sunken)]
      border-[var(--color-border-strong)]
      text-[var(--color-ink-muted)]
    `,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
};

/**
 * FormAlert - Form-level error, success, or info messages
 *
 * Displays prominent alerts above forms for:
 * - Authentication errors (wrong credentials)
 * - Success messages (email sent)
 * - Info messages (account context)
 *
 * Uses role="alert" for screen reader announcement.
 */
export function FormAlert({ variant, children }: FormAlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-[var(--space-sm)]
        p-[var(--space-md)]
        border rounded-[var(--radius-md)]
        text-[var(--text-sm)]
        ${styles.container}
      `}
    >
      {styles.icon}
      <div>{children}</div>
    </div>
  );
}
