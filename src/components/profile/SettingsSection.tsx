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
      className="block py-2 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-sunken)] -mx-3 px-3 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--color-ink)] font-medium">{title}</p>
          <p className="text-xs text-[var(--color-ink-muted)]">{description}</p>
        </div>
        <svg
          width="14"
          height="14"
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
      <h2 id="settings-heading" className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
        Account Settings
      </h2>

      <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-3">
        {/* Settings links */}
        <div className="mb-2">
          <SettingLink
            href="/profile/settings"
            title="Profile"
            description="Edit name, location, preferences"
          />
          <SettingLink
            href="/profile/security"
            title="Email & Password"
            description="Update sign-in credentials"
          />
          <SettingLink
            href="/profile/notifications"
            title="Notifications"
            description="Manage email preferences"
          />
        </div>

        {/* Sign out button */}
        <div className="pt-2 border-t border-[var(--color-border)]">
          <button
            onClick={handleSignOut}
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors min-h-[44px] px-2"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
}
