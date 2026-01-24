/**
 * Profile Management Section
 * Edit operator bio, credentials, and public profile
 */

export function ProfileManagement() {
  // Mock data
  const profileData = {
    businessName: 'Pacific Northwest Birding',
    bio: 'Specializing in coastal and alpine species of the Pacific Northwest. 15 years of professional guiding experience.',
    photoCount: 24,
    credentials: [
      {
        type: 'Business License',
        status: 'verified' as const,
        expiresAt: '2026-12-31',
      },
      {
        type: 'Insurance Certificate',
        status: 'verified' as const,
        expiresAt: '2026-06-30',
      },
      {
        type: 'Guide Certification',
        status: 'verified' as const,
        expiresAt: '2027-03-15',
      },
    ],
  };

  const statusStyles: Record<'verified' | 'pending' | 'expired', string> = {
    verified: 'bg-[var(--color-confirmed-bg)] text-[var(--color-confirmed)]',
    pending: 'bg-[var(--color-forming-bg)] text-[var(--color-forming)]',
    expired: 'bg-[var(--color-destructive-bg)] text-[var(--color-destructive)]',
  };

  return (
    <section className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">
          Profile Management
        </h2>
        <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] py-2 px-2 min-h-[44px]">
          View Public Profile →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bio Editor */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="business-name"
              className="block text-sm font-medium text-[var(--color-ink)] mb-2"
            >
              Business Name
            </label>
            <input
              id="business-name"
              type="text"
              value={profileData.businessName}
              className="w-full px-4 py-3 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:outline-none focus:border-[var(--color-primary)]"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="operator-bio"
              className="block text-sm font-medium text-[var(--color-ink)] mb-2"
            >
              Bio
            </label>
            <textarea
              id="operator-bio"
              value={profileData.bio}
              rows={4}
              className="w-full px-4 py-3 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:outline-none focus:border-[var(--color-primary)] resize-none"
              readOnly
            />
            <p className="text-xs text-[var(--color-ink-muted)] mt-1">
              {profileData.bio.length} / 500 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">
              Photo Gallery
            </label>
            <div className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-ink)]">
                  {profileData.photoCount} photos uploaded
                </span>
                <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] py-2 px-2 min-h-[44px]">
                  Manage Photos
                </button>
              </div>
              <p className="text-xs text-[var(--color-ink-muted)] mt-2">
                Target: 20+ photos for best engagement
              </p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div>
          <h3 className="font-medium text-[var(--color-ink)] mb-3">Verification Documents</h3>
          <div className="space-y-3">
            {profileData.credentials.map((cred, index) => (
              <div
                key={index}
                className="border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4 bg-[var(--color-surface)]"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-[var(--color-ink)]">{cred.type}</span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-[var(--radius-pill)] ${statusStyles[cred.status]}`}
                  >
                    {cred.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  Expires:{' '}
                  {new Date(cred.expiresAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <button className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] mt-2 py-2 px-2 min-h-[44px]">
                  Upload New Document
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 px-4 py-3 text-sm font-medium text-[var(--color-ink)] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]">
            + Add New Credential
          </button>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex items-center gap-3 mt-6 pt-6 border-t-2 border-[var(--color-border)]">
        <button className="px-6 py-3 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-[var(--radius-organic)] transition-colors min-h-[44px]">
          Save Changes
        </button>
        <button className="px-4 py-3 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] min-h-[44px]">
          Cancel
        </button>
      </div>
    </section>
  );
}
