'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What happens if my tour doesn't reach the minimum?",
    answer: "Nothing. No cards are charged. You're not out anything except the listing time. You can re-run the tour with different dates or a lower minimum. Zero financial risk.",
  },
  {
    question: "How do participants know the tour might not run?",
    answer: "Complete transparency. They see exactly how many spots are filled and how many are needed. They know their card won't be charged until the threshold is met. This builds trust, not anxiety.",
  },
  {
    question: "Can I set my own cancellation policy?",
    answer: "Yes. You set your minimum threshold, deadline, and what happens if participants cancel after the tour is confirmed. You're in control.",
  },
  {
    question: "How do I get paid?",
    answer: "When your tour is complete, funds are released to your account within 3–5 business days, minus our 6% commission. You connect your bank account during onboarding—secure, verified, and simple.",
  },
  {
    question: "What if I already have my own website and booking system?",
    answer: "Many operators use Quorum for the threshold mechanics and species-based discovery, then link back to their own site for additional tours. You control how much you use us. We're a tool, not a lock-in.",
  },
  {
    question: "How is this different from Viator or GetYourGuide?",
    answer: "Those platforms take 20–30% commission and bury small operators under big companies. We're built specifically for independent wildlife tour operators with fair 6% commission and a booking model that actually reduces your risk.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "Real humans who understand birding tourism. Email support with response within 24 hours. Phone and video calls available for complex questions. We don't hide behind chatbots.",
  },
];

function ExpandIcon({ expanded }: { expanded: boolean }): JSX.Element {
  const path = expanded ? 'M4 8h8' : 'M8 4v8M4 8h8';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={path} />
    </svg>
  );
}

export function FAQSection(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number): void {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="py-[var(--space-2xl)] bg-[var(--color-surface)]">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-[var(--space-lg)]">
        <header className="text-center mb-[var(--space-xl)]">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-sm)]">
            Questions You're Probably Asking
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] mx-auto">
            Straight answers. No fine print buried at the bottom.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-[var(--space-md)]">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border-2 border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] overflow-hidden"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full px-[var(--space-lg)] py-[var(--space-md)] text-left flex items-center justify-between gap-[var(--space-md)] hover:bg-[var(--color-surface-sunken)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="flex-1 font-semibold text-[var(--text-base)] text-[var(--color-ink)]">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-ink-subtle)]" aria-hidden="true">
                  <ExpandIcon expanded={openIndex === index} />
                </span>
              </button>

              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-[var(--space-lg)] pb-[var(--space-lg)]">
                  <p className="text-[var(--text-base)] text-[var(--color-ink-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-[var(--space-2xl)] text-center">
          <p className="text-[var(--color-ink-muted)]">
            Have a question we didn't answer?{' '}
            <a
              href="mailto:hello@quorumtours.com"
              className="text-[var(--color-primary)] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 rounded"
            >
              Email us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
