/**
 * TermsNotice - Legal acknowledgment for signup forms
 *
 * Submission implies acceptance (no checkbox friction).
 * Links to Terms of Service and Privacy Policy.
 *
 * Design considerations:
 * - Minimal, honest, clear
 * - No checkbox required
 * - No pre-checked newsletter subscription
 * - Subdued styling (not prominent)
 */
export function TermsNotice() {
  return (
    <p
      className="
        text-[var(--text-sm)]
        text-[var(--color-ink-muted)]
        leading-relaxed
      "
    >
      By creating an account, you agree to our{' '}
      <a
        href="/terms"
        className="
          text-[var(--color-ink-muted)]
          underline
          hover:text-[var(--color-ink)]
          focus:outline-none focus:text-[var(--color-accent)]
          transition-colors duration-[var(--transition-fast)]
        "
      >
        Terms of Service
      </a>{' '}
      and{' '}
      <a
        href="/privacy"
        className="
          text-[var(--color-ink-muted)]
          underline
          hover:text-[var(--color-ink)]
          focus:outline-none focus:text-[var(--color-accent)]
          transition-colors duration-[var(--transition-fast)]
        "
      >
        Privacy Policy
      </a>
      .
    </p>
  );
}
