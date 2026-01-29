'use client';

interface SettingLinkProps {
  href: string;
  title: string;
}

function SettingLink({ href, title }: SettingLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-b-0 hover:text-[var(--color-primary)] transition-colors"
    >
      <span className="text-sm text-[var(--color-ink)]">{title}</span>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-ink-subtle)]">
        <path d="M6 4l4 4-4 4" />
      </svg>
    </a>
  );
}

interface SettingsSectionProps {
  onSignOut?: () => void;
}

/**
 * SettingsSection - Compact account settings card
 */
export function SettingsSection({ onSignOut }: SettingsSectionProps) {
  const handleSignOut = () => {
    console.log('Sign out requested');
    onSignOut?.();
  };

  return (
    <div className="bg-[var(--color-surface-raised)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[var(--color-border)]">
        <h2 className="font-display text-sm font-semibold text-[var(--color-ink)]">
          Account
        </h2>
      </div>

      {/* Settings links */}
      <div className="px-3 py-1">
        <SettingLink href="/profile/settings" title="Profile" />
        <SettingLink href="/profile/security" title="Email & Password" />
        <SettingLink href="/profile/notifications" title="Notifications" />
      </div>

      {/* Sign out */}
      <div className="px-3 py-2 border-t border-[var(--color-border)]">
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
