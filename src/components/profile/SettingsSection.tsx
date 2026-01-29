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
      className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-sunken)] -mx-4 px-4 transition-colors"
    >
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
    </a>
  );
}

interface SettingsSectionProps {
  onSignOut?: () => void;
}

/**
 * SettingsSection - Account settings card
 *
 * Self-contained card with proper boundaries.
 */
export function SettingsSection({ onSignOut }: SettingsSectionProps) {
  const handleSignOut = () => {
    console.log('Sign out requested');
    onSignOut?.();
  };

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-0">
        <h2 className="font-display text-base font-semibold text-[var(--color-ink)] mb-3">
          Account Settings
        </h2>
      </div>

      {/* Settings links */}
      <div className="px-4">
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

      {/* Sign out */}
      <div className="p-4 pt-3 border-t border-[var(--color-border)] mt-3">
        <button
          onClick={handleSignOut}
          className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
