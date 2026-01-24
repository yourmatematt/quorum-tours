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
        border-2 border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        p-4
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-display text-lg">
            {displayName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            {/* Display name - primary identifier */}
            <h1 className="font-display text-lg text-[var(--color-ink)]">
              {displayName}
            </h1>
            {/* Account identifier + member since inline */}
            <p className="text-sm text-[var(--color-ink-muted)]">
              {email} · Member since {memberSince}
            </p>
          </div>
        </div>

        {/* Edit profile link */}
        <a
          href="/profile/settings"
          className="
            inline-flex items-center gap-2
            px-3 py-1.5
            text-sm font-medium
            border-2 border-[var(--color-border)]
            rounded-[var(--radius-organic)]
            text-[var(--color-ink)]
            hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
            transition-colors
          "
        >
          Edit
        </a>
      </div>
    </div>
  );
}
