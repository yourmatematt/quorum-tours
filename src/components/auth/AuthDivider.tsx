interface AuthDividerProps {
  text?: string;
}

/**
 * AuthDivider - Visual separator with centered text
 *
 * Used to separate primary login form from alternative auth methods.
 * Default text: "Or continue with"
 */
export function AuthDivider({ text = 'Or continue with' }: AuthDividerProps) {
  return (
    <div className="relative my-[var(--space-lg)]">
      {/* Horizontal line */}
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-[var(--color-border)]" />
      </div>

      {/* Centered text */}
      <div className="relative flex justify-center">
        <span
          className="
            px-[var(--space-md)]
            bg-[var(--color-surface-raised)]
            text-[var(--text-sm)]
            text-[var(--color-ink-subtle)]
          "
        >
          {text}
        </span>
      </div>
    </div>
  );
}
