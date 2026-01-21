/**
 * Participant List Section
 * View committed participants with compatibility signals
 */

interface Participant {
  id: string;
  name: string;
  tier: 'Explorer' | 'Field Naturalist' | 'Trusted Contributor';
  pace: 'Relaxed' | 'Moderate' | 'Fast';
  focus: 'Birding' | 'Photography' | 'Mixed';
  tourTitle: string;
  commitmentDate: string;
}

export function ParticipantList() {
  // Mock data
  const participants: Participant[] = [
    {
      id: 'user-001',
      name: 'Sarah M.',
      tier: 'Field Naturalist',
      pace: 'Moderate',
      focus: 'Birding',
      tourTitle: 'Patagonian Endemics',
      commitmentDate: '2026-01-18',
    },
    {
      id: 'user-002',
      name: 'James K.',
      tier: 'Trusted Contributor',
      pace: 'Fast',
      focus: 'Mixed',
      tourTitle: 'Patagonian Endemics',
      commitmentDate: '2026-01-17',
    },
    {
      id: 'user-003',
      name: 'Elena R.',
      tier: 'Explorer',
      pace: 'Relaxed',
      focus: 'Photography',
      tourTitle: 'Patagonian Endemics',
      commitmentDate: '2026-01-19',
    },
  ];

  const tierStyles = {
    Explorer: 'bg-blue-100 text-blue-800',
    'Field Naturalist': 'bg-forming-bg text-forming',
    'Trusted Contributor': 'bg-confirmed-bg text-confirmed',
  };

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        Participants
      </h2>

      {participants.length === 0 ? (
        <div className="border border-border rounded-md p-8 text-center text-ink-muted">
          No participants yet
        </div>
      ) : (
        <>
          {/* Group by tour */}
          <div className="mb-4">
            <h3 className="font-medium text-ink mb-3">
              Patagonian Endemics - March 2026
            </h3>
            <div className="space-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="border border-border rounded-lg p-4 bg-surface"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-ink">
                          {participant.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${tierStyles[participant.tier]}`}
                        >
                          {participant.tier}
                        </span>
                      </div>

                      {/* Compatibility Signals */}
                      <div className="flex items-center gap-4 text-sm text-ink-muted">
                        <div>
                          <span className="text-xs">Pace:</span>{' '}
                          <span className="font-medium text-ink">
                            {participant.pace}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs">Focus:</span>{' '}
                          <span className="font-medium text-ink">
                            {participant.focus}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs">Committed:</span>{' '}
                          <span className="font-medium text-ink">
                            {new Date(participant.commitmentDate).toLocaleDateString(
                              'en-US',
                              { month: 'short', day: 'numeric' }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="text-sm font-medium text-accent hover:text-accent-hover ml-4 py-3 px-2 min-h-[48px]">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
