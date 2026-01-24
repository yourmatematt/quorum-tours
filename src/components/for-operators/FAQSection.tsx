'use client';

import { useState } from 'react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What happens to my data if I leave?",
      answer: "You own it. One-click export. Zero hostage-holding. Your customer data, tour history, and financial records are yours to download at any time in standard CSV format.",
    },
    {
      question: "How is my banking information protected?",
      answer: "Verified for deposits only via Stripe Connect. Quorum cannot withdraw funds. Bank-level encryption protects all financial data, and we never store full account numbers on our servers.",
    },
    {
      question: "What if I don't understand the technology?",
      answer: "That's why we offer concierge onboarding. 30-minute call, zero jargon. Plus phone support within 2 hours during business hours. We'll walk you through every step.",
    },
    {
      question: "How do you compare to FareHarbor/Rezdy?",
      answer: "They charge 6%+ fees. We charge 2%. They add surprise fees at checkout. We don't. They lock you in with proprietary data formats. We don't — export your data anytime.",
    },
    {
      question: "What fees do birders see?",
      answer: "Your price. That's it. No convenience fees, no processing fees, no surprise add-ons. You set the price, birders pay the price. Full transparency.",
    },
    {
      question: "What if my tour doesn't reach the threshold?",
      answer: "Everyone gets 100% refund. Zero cost to you. Zero reputation damage. You can also use Gap Negotiation to poll birders about splitting the shortfall — saving revenue while maintaining transparency.",
    },
  ];

  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[var(--color-surface)]
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
            Questions from Operators Like You
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-[var(--space-md)]">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="
                  border border-[var(--color-border)]
                  rounded-[var(--radius-lg)]
                  bg-[var(--color-surface-raised)]
                  overflow-hidden
                "
              >
                {/* Question button */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="
                    w-full
                    px-[var(--space-lg)]
                    py-[var(--space-md)]
                    text-left
                    flex items-center justify-between gap-[var(--space-md)]
                    hover:bg-[var(--color-surface-sunken)]
                    transition-colors
                  "
                  aria-expanded={openIndex === index}
                >
                  <span className="
                    flex-1
                    font-semibold
                    text-[var(--text-base)]
                    text-[var(--color-ink)]
                  ">
                    {faq.question}
                  </span>

                  {/* Plus/Minus icon */}
                  <span className="
                    flex-shrink-0
                    w-6 h-6
                    flex items-center justify-center
                    text-[var(--color-ink-subtle)]
                  " aria-hidden="true">
                    {openIndex === index ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 8h8"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 4v8M4 8h8"/>
                      </svg>
                    )}
                  </span>
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <div className="
                    px-[var(--space-lg)]
                    pb-[var(--space-md)]
                    pt-0
                  ">
                    <p className="
                      text-[var(--text-base)]
                      text-[var(--color-ink-muted)]
                      leading-relaxed
                    ">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
