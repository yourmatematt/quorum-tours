import { Button } from '../ui/Button';

export function OnboardingPathSection() {
  const checklistItems = [
    "Business License or Tour Operator Permit",
    "Liability Insurance Certificate",
    "Guide Certifications (WFR, First Aid, or regional equivalents)",
    "Bank Account for Payouts (deposits only — Quorum cannot withdraw)",
  ];

  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface-sunken)]
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <div className="text-center mb-[var(--space-3xl)]">
          <h2 className="
            font-display
            text-[var(--text-3xl)]
            text-[var(--color-ink)]
            mb-[var(--space-md)]
          ">
            Getting Started: Partnership, Not Paperwork
          </h2>
        </div>

        {/* Split layout: Checklist + Onboarding Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-3xl)]">
          {/* Pre-Submission Checklist */}
          <div>
            <h3 className="
              text-[var(--text-xl)]
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-xl)]
            ">
              What You'll Need
            </h3>

            <div className="
              p-[var(--space-xl)]
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-[var(--radius-lg)]
            ">
              <ul className="space-y-[var(--space-md)]">
                {checklistItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-[var(--space-md)]">
                    {/* Checkbox */}
                    <div className="
                      flex-shrink-0
                      w-6 h-6
                      flex items-center justify-center
                      bg-[var(--color-confirmed)]
                      text-white
                      rounded-[var(--radius-sm)]
                      mt-0.5
                    ">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                        <path d="M11 3L5 9 2.5 6.5l1-1L5 7l5-5z"/>
                      </svg>
                    </div>

                    {/* Item text */}
                    <span className="
                      flex-1
                      text-[var(--text-base)]
                      text-[var(--color-ink)]
                      leading-relaxed
                    ">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Reassurance */}
            <div className="
              mt-[var(--space-lg)]
              p-[var(--space-md)]
              bg-[var(--color-surface)]
              border-2 border-[var(--color-accent)]/30
              rounded-[var(--radius-md)]
            ">
              <div className="flex items-start gap-[var(--space-sm)]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-[var(--color-accent)] flex-shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M10 1L3 4v5c0 4 3 7 7 9 4-2 7-5 7-9V4z"/>
                </svg>
                <div className="flex-1 text-sm text-[var(--color-ink-muted)]">
                  <p className="font-medium text-[var(--color-ink)] mb-1">
                    Your Security Matters
                  </p>
                  <p className="mb-1">
                    Your bank account is verified for deposits only. Quorum cannot withdraw funds.
                  </p>
                  <p>
                    Documents encrypted and stored securely. Identity verification via Stripe Connect.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Path Onboarding */}
          <div>
            <h3 className="
              text-[var(--text-xl)]
              font-semibold
              text-[var(--color-ink)]
              mb-[var(--space-xl)]
            ">
              Choose Your Path
            </h3>

            <div className="space-y-[var(--space-lg)]">
              {/* Path A: Concierge */}
              <div className="
                p-[var(--space-xl)]
                bg-[var(--color-accent)]/5
                border-2 border-[var(--color-accent)]
                rounded-[var(--radius-lg)]
              ">
                <div className="mb-[var(--space-md)]">
                  <span className="
                    inline-block
                    px-2 py-1
                    text-xs
                    uppercase
                    tracking-wider
                    bg-[var(--color-accent)]
                    text-white
                    rounded-[var(--radius-sm)]
                    font-medium
                    mb-[var(--space-sm)]
                  ">
                    Recommended
                  </span>
                  <h4 className="
                    text-[var(--text-lg)]
                    font-semibold
                    text-[var(--color-ink)]
                    mb-[var(--space-sm)]
                  ">
                    Path B: Concierge Onboarding
                  </h4>
                  <p className="
                    text-[var(--text-base)]
                    text-[var(--color-ink-muted)]
                    mb-[var(--space-lg)]
                  ">
                    Schedule a 30-minute verification call — we'll walk you through it
                  </p>
                </div>

                <Button variant="primary" className="w-full">
                  Schedule Verification Call
                </Button>
              </div>

              {/* Path B: Self-Service */}
              <div className="
                p-[var(--space-xl)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[var(--radius-lg)]
              ">
                <h4 className="
                  text-[var(--text-lg)]
                  font-semibold
                  text-[var(--color-ink)]
                  mb-[var(--space-sm)]
                ">
                  Path A: Self-Service
                </h4>
                <p className="
                  text-[var(--text-base)]
                  text-[var(--color-ink-muted)]
                  mb-[var(--space-lg)]
                ">
                  Upload documents yourself — live in 48 hours
                </p>

                <Button variant="secondary" className="w-full">
                  Start Self-Service Setup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
