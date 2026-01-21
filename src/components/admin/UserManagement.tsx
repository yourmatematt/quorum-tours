/**
 * User Management Section
 * Search users, adjust tiers, moderation actions
 */

export function UserManagement() {
  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        User Management
      </h2>

      {/* Search Interface */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by name, email, or user ID..."
            className="flex-1 px-4 py-2 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="px-6 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors">
            Search
          </button>
        </div>
        <div className="flex gap-3 mt-3">
          <select className="px-3 py-2 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
            <option>All Tiers</option>
            <option>Explorer</option>
            <option>Field Naturalist</option>
            <option>Trusted Contributor</option>
          </select>
          <select className="px-3 py-2 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Flagged</option>
          </select>
        </div>
      </div>

      {/* Placeholder for user results */}
      <div className="border border-border rounded-md p-8 text-center text-ink-muted">
        Enter search criteria to find users
      </div>
    </section>
  );
}
