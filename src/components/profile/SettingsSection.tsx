'use client';

interface SettingLinkProps {
  href: string;
  title: string;
  description: string;
}

function SettingLink({ href, title, description }: SettingLinkProps) {
  return (
    <a
      href={href}
      className="
        block
        py-[var(--space-md)]
        border-b border-[var(--color-border)]
        last:border-b-0
        hover:bg-[var(--color-surface-sunken)]
        -mx-[var(--space-md)] px-[var(--space-md)]
        rounded-[var(--radius-sm)]
        transition-colors duration-[var(--transition-fast)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[var(--color-ink)] font-medium">{title}</p>
          <p className="text-[var(--text-sm)] text-[var(--color-ink-muted)]">
            {description}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--color-ink-subtle)] flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
      </div>
    </a>
  );
}

interface SettingsSectionProps {
  onSignOut?: () => void;
}

/**
 * SettingsSection - Account management options
 *
 * Organized settings grouped by category.
 * No gamified completion percentage or "complete your profile" pressure.
 *
 * Per IA: "Links to dedicated settings pages/modals"
 */
export function SettingsSection({ onSignOut }: SettingsSectionProps) {
  const handleSignOut = () => {
    // UI shell: just log the action
    console.log('Sign out requested');
    onSignOut?.();
  };

  return (
    <section aria-labelledby="settings-heading">
      <h2
        id="settings-heading"
        className="
          font-display
          text-[var(--text-xl)]
          text-[var(--color-ink)]
          mb-[var(--space-lg)]
        "
      >
        Account Settings
      </h2>

      <div
        className="
          bg-[var(--color-surface-raised)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          p-[var(--space-md)]
        "
      >
        {/* Settings links */}
        <div className="mb-[var(--space-md)]">
          <SettingLink
            href="/profile/settings"
            title="Profile"
            description="Edit name, location, preferences"
          />
          <SettingLink
            href="/profile/security"
            title="Email & Password"
            description="Update your sign-in credentials"
          />
          <SettingLink
            href="/profile/notifications"
            title="Notifications"
            description="Manage email preferences"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] my-[var(--space-md)]" />

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          className="
            w-full sm:w-auto
            py-[var(--space-sm)] px-[var(--space-md)]
            text-[var(--text-sm)]
            text-[var(--color-ink-muted)]
            hover:text-[var(--color-ink)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
            rounded-[var(--radius-md)]
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Sign out
        </button>
      </div>
    </section>
  );
}
