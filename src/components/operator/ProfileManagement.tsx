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
    verified: 'bg-confirmed-bg text-confirmed',
    pending: 'bg-forming-bg text-forming',
    expired: 'bg-red-100 text-red-800',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Profile Management
        </h2>
        <button className="text-sm font-medium text-accent hover:text-accent-hover py-3 px-2 min-h-[48px]">
          View Public Profile →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bio Editor */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="business-name"
              className="block text-sm font-medium text-ink mb-2"
            >
              Business Name
            </label>
            <input
              id="business-name"
              type="text"
              value={profileData.businessName}
              className="w-full px-3 py-2 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="operator-bio"
              className="block text-sm font-medium text-ink mb-2"
            >
              Bio
            </label>
            <textarea
              id="operator-bio"
              value={profileData.bio}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              readOnly
            />
            <p className="text-xs text-ink-muted mt-1">
              {profileData.bio.length} / 500 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Photo Gallery
            </label>
            <div className="border border-border-strong rounded-md p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink">
                  {profileData.photoCount} photos uploaded
                </span>
                <button className="text-sm font-medium text-accent hover:text-accent-hover py-3 px-2 min-h-[48px]">
                  Manage Photos
                </button>
              </div>
              <p className="text-xs text-ink-muted mt-2">
                Target: 20+ photos for best engagement
              </p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div>
          <h3 className="font-medium text-ink mb-3">Verification Documents</h3>
          <div className="space-y-3">
            {profileData.credentials.map((cred, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 bg-surface"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-ink">{cred.type}</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${statusStyles[cred.status]}`}
                  >
                    {cred.status}
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  Expires:{' '}
                  {new Date(cred.expiresAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <button className="text-xs font-medium text-accent hover:text-accent-hover mt-2 py-3 px-2 min-h-[48px]">
                  Upload New Document
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 px-4 py-3 text-sm font-medium text-ink bg-surface border border-border-strong rounded-md hover:border-accent hover:text-accent transition-colors min-h-[48px]">
            + Add New Credential
          </button>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
        <button className="px-4 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors min-h-[48px]">
          Save Changes
        </button>
        <button className="px-4 py-3 text-sm font-medium text-ink-muted hover:text-ink min-h-[48px]">
          Cancel
        </button>
      </div>
    </section>
  );
}
