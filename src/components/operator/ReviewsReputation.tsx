/**
 * Reviews & Reputation Section
 * View reviews, respond, track reputation metrics
 */

interface Review {
  id: string;
  userName: string;
  rating: number;
  tourTitle: string;
  date: string;
  content: string;
  operatorResponse?: string;
  responseDate?: string;
}

export function ReviewsReputation() {
  // Mock data
  const reputationMetrics = {
    averageRating: 4.7,
    totalReviews: 47,
    responseRate: 92,
    ratingDistribution: {
      5: 32,
      4: 12,
      3: 2,
      2: 1,
      1: 0,
    },
  };

  const reviews: Review[] = [
    {
      id: 'review-001',
      userName: 'Michael T.',
      rating: 5,
      tourTitle: 'Spring Migration - Gulf Coast',
      date: '2026-01-15',
      content:
        'Exceptional guide with deep knowledge of local species. Spotted 87 species in 3 days, including several lifers. Highly recommended.',
      operatorResponse:
        'Thank you Michael! It was a pleasure showing you the Gulf Coast specialties. Hope to see you on another tour soon.',
      responseDate: '2026-01-16',
    },
    {
      id: 'review-002',
      userName: 'Sarah K.',
      rating: 4,
      tourTitle: 'Arizona Desert Specialties',
      date: '2026-01-10',
      content:
        'Great tour overall. Guide was knowledgeable and accommodating. Only minor issue was early start times were challenging.',
    },
  ];

  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6">
      <h2 className="font-display text-xl font-semibold text-ink mb-6">
        Reviews & Reputation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Average Rating */}
        <div className="border border-border rounded-lg p-4 bg-surface">
          <p className="text-xs text-ink-muted mb-1">Average Rating</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold text-ink">
              {reputationMetrics.averageRating.toFixed(1)}
            </span>
            <span className="text-ink-muted">/ 5.0</span>
          </div>
          <p className="text-xs text-ink-muted mt-1">
            Based on {reputationMetrics.totalReviews} reviews
          </p>
        </div>

        {/* Response Rate */}
        <div className="border border-border rounded-lg p-4 bg-surface">
          <p className="text-xs text-ink-muted mb-1">Response Rate</p>
          <span className="font-mono text-3xl font-semibold text-confirmed">
            {reputationMetrics.responseRate}%
          </span>
          <p className="text-xs text-ink-muted mt-1">
            {Math.round(
              (reputationMetrics.totalReviews * reputationMetrics.responseRate) /
                100
            )}{' '}
            of {reputationMetrics.totalReviews} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="border border-border rounded-lg p-4 bg-surface">
          <p className="text-xs text-ink-muted mb-2">Rating Distribution</p>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-ink-muted w-8">
                  {stars} ★
                </span>
                <div className="flex-1 bg-surface-sunken rounded-full h-1.5">
                  <div
                    className="bg-forming h-1.5 rounded-full"
                    style={{
                      width: `${
                        (reputationMetrics.ratingDistribution[
                          stars as keyof typeof reputationMetrics.ratingDistribution
                        ] /
                          reputationMetrics.totalReviews) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs text-ink-muted w-6 text-right">
                  {
                    reputationMetrics.ratingDistribution[
                      stars as keyof typeof reputationMetrics.ratingDistribution
                    ]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-medium text-ink mb-3">Recent Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-border rounded-lg p-5 bg-surface"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-ink">
                    {review.userName}
                  </span>
                  <span className="font-mono text-sm font-medium text-forming">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  {review.tourTitle} •{' '}
                  {new Date(review.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <p className="text-sm text-ink mb-3">{review.content}</p>

            {review.operatorResponse ? (
              <div className="bg-surface-raised border-l-2 border-accent pl-4 py-2">
                <p className="text-xs font-medium text-ink mb-1">
                  Your Response
                </p>
                <p className="text-sm text-ink-muted">{review.operatorResponse}</p>
                <p className="text-xs text-ink-muted mt-1">
                  {new Date(review.responseDate!).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            ) : (
              <button className="text-sm font-medium text-accent hover:text-accent-hover py-3 px-2 min-h-[48px]">
                Respond to Review
              </button>
            )}
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="border border-border rounded-md p-8 text-center text-ink-muted">
          No reviews yet
        </div>
      )}
    </section>
  );
}
