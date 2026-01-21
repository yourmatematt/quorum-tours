/**
 * Tour Oversight Section
 * Monitors all tours with threshold progress and status distribution
 */

interface TourStatus {
  id: string;
  title: string;
  operator: string;
  status: 'forming' | 'confirmed' | 'cancelled';
  threshold: number;
  currentCommitments: number;
  deadline: string;
  daysUntilDeadline: number;
}

export function TourOversight() {
  // Mock data
  const tours: TourStatus[] = [
    {
      id: 'tour-001',
      title: 'Patagonian Endemics - March 2026',
      operator: 'South America Birding Experts',
      status: 'forming',
      threshold: 6,
      currentCommitments: 4,
      deadline: '2026-02-15',
      daysUntilDeadline: 25,
    },
    {
      id: 'tour-002',
      title: 'Spring Migration - Gulf Coast',
      operator: 'Coastal Birding Adventures',
      status: 'confirmed',
      threshold: 8,
      currentCommitments: 10,
      deadline: '2026-03-01',
      daysUntilDeadline: 39,
    },
    {
      id: 'tour-003',
      title: 'Arizona Desert Specialties',
      operator: 'Desert Birds Inc',
      status: 'forming',
      threshold: 5,
      currentCommitments: 2,
      deadline: '2026-01-28',
      daysUntilDeadline: 7,
    },
  ];

  const statusCounts = {
    forming: tours.filter((t) => t.status === 'forming').length,
    confirmed: tours.filter((t) => t.status === 'confirmed').length,
    cancelled: tours.filter((t) => t.status === 'cancelled').length,
  };

  const statusStyles = {
    forming: 'bg-forming-bg text-forming border-forming',
    confirmed: 'bg-confirmed-bg text-confirmed border-confirmed',
    cancelled: 'bg-gray-100 text-gray-600 border-gray-600',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        Tour Oversight
      </h2>

      {/* Status Distribution */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-border rounded-md p-4 bg-surface">
          <p className="text-xs text-ink-muted mb-1">Forming</p>
          <p className="font-mono text-2xl font-semibold text-forming">
            {statusCounts.forming}
          </p>
        </div>
        <div className="border border-border rounded-md p-4 bg-surface">
          <p className="text-xs text-ink-muted mb-1">Confirmed</p>
          <p className="font-mono text-2xl font-semibold text-confirmed">
            {statusCounts.confirmed}
          </p>
        </div>
        <div className="border border-border rounded-md p-4 bg-surface">
          <p className="text-xs text-ink-muted mb-1">Cancelled</p>
          <p className="font-mono text-2xl font-semibold text-gray-600">
            {statusCounts.cancelled}
          </p>
        </div>
      </div>

      {/* Tours List */}
      <div className="space-y-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="border border-border rounded-lg p-4 bg-surface hover:border-accent transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-ink">{tour.title}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium border rounded ${statusStyles[tour.status]}`}
                  >
                    {tour.status}
                  </span>
                </div>
                <p className="text-sm text-ink-muted">{tour.operator}</p>
                <div className="flex items-center gap-6 mt-3">
                  <div>
                    <span className="text-xs text-ink-muted">Progress:</span>
                    <span className="ml-2 font-mono text-sm font-medium text-ink">
                      {tour.currentCommitments}/{tour.threshold}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-muted">Deadline:</span>
                    <span className="ml-2 text-sm font-medium text-ink">
                      {tour.daysUntilDeadline} days
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-sm font-medium text-accent hover:text-accent-hover">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
