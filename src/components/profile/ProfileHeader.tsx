interface ProfileHeaderProps {
  displayName: string;
  email: string;
  memberSince: string;
}

/**
 * ProfileHeader - User identity section
 *
 * Displays user's identity information in an institutional,
 * non-celebratory manner. No vanity metrics or gamification.
 *
 * Per IA: "No avatar with gamified border or level indicator"
 */
export function ProfileHeader({
  displayName,
  email,
  memberSince,
}: ProfileHeaderProps) {
  return (
    <div
      className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        p-[var(--space-lg)] sm:p-[var(--space-xl)]
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[var(--space-md)]">
        <div>
          {/* Display name - primary identifier */}
          <h1
            className="
              font-display
              text-[var(--text-xl)] sm:text-[var(--text-2xl)]
              text-[var(--color-ink)]
              mb-[var(--space-xs)]
            "
          >
            {displayName}
          </h1>

          {/* Account identifier - secondary */}
          <p className="text-[var(--color-ink-muted)] text-[var(--text-sm)]">
            {email}
          </p>

          {/* Member since - factual timestamp, not celebratory */}
          <p className="text-[var(--color-ink-subtle)] text-[var(--text-sm)] mt-[var(--space-xs)]">
            Member since {memberSince}
          </p>
        </div>

        {/* Edit profile link */}
        <a
          href="/profile/settings"
          className="
            inline-flex items-center gap-[var(--space-xs)]
            text-[var(--text-sm)]
            text-[var(--color-accent)]
            hover:underline
            focus:outline-none focus:underline
            transition-colors duration-[var(--transition-fast)]
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M8 3v10M3 8h10" />
            <circle cx="8" cy="8" r="6" />
          </svg>
          Edit profile
        </a>
      </div>
    </div>
  );
}
