import { type ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

/**
 * AuthCard - Centered card container for authentication forms
 *
 * Provides consistent styling for login, signup, and password reset pages.
 * Desktop: 420px max-width, centered
 * Mobile: Full-width with padding
 */
export function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      className="
        w-full max-w-[420px]
        mx-auto
        p-[var(--space-xl)] sm:p-[var(--space-2xl)]
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
      "
    >
      {children}
    </div>
  );
}
