export function OperatorTestimonialSection() {
  const testimonials = [
    {
      quote: "Before Quorum, I'd spend 20+ hours per tour dealing with invoices, reminders, and awkward 'are you still coming?' emails. Now? The platform handles it. I focus on what I actually enjoy: designing routes and finding birds.",
      name: "Maria Rodriguez",
      credentials: "WFR Certified, 15 years guiding Neotropical tours",
      outcome: "Launched 3 new routes risk-free in 2025",
      photo: "👩‍🦱", // Placeholder
      featured: true,
    },
    {
      quote: "The threshold mechanic saved my business. I was about to cancel a Galapagos pelagic because we had 5 of 8. Gap negotiation let the birders decide — they split the difference. Tour ran, everyone was happy.",
      name: "John Chen",
      credentials: "20 years guiding Pacific pelagic charters",
      outcome: "Saved $4,200 in lost deposits",
      photo: "👨", // Placeholder
      featured: false,
    },
    {
      quote: "I was skeptical about 'yet another platform.' But when I saw the escrow setup and the 2% fee vs FareHarbor's 6%, I gave it a shot. Three months in, I've saved 15 hours/week on admin alone.",
      name: "Sarah Thompson",
      credentials: "Alaska wilderness guide, 12 years experience",
      outcome: "15 hours/week saved on admin",
      photo: "👩", // Placeholder
      featured: false,
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
            200+ Guides Stopped Losing Sleep Over Minimum Group Sizes
          </h2>
        </div>

        {/* Asymmetric testimonial grid */}
        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-xl)]
        ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`
                ${testimonial.featured ? 'lg:col-span-2' : ''}
                p-[var(--space-xl)]
                bg-[var(--color-surface-raised)]
                border border-[var(--color-border)]
                rounded-[var(--radius-lg)]
                flex flex-col
              `}
            >
              {/* Quote */}
              <blockquote className="
                flex-1
                font-display
                text-[var(--text-lg)]
                text-[var(--color-ink)]
                leading-relaxed
                mb-[var(--space-lg)]
              ">
                "{testimonial.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="
                flex items-start gap-[var(--space-md)]
                pt-[var(--space-md)]
                border-t border-[var(--color-border)]
              ">
                {/* Photo */}
                <div className="
                  flex-shrink-0
                  w-14 h-14
                  flex items-center justify-center
                  bg-[var(--color-surface-sunken)]
                  border-2 border-[var(--color-border)]
                  rounded-full
                  text-2xl
                " aria-hidden="true">
                  {testimonial.photo}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="
                    font-semibold
                    text-[var(--color-ink)]
                    mb-1
                  ">
                    {testimonial.name}
                  </p>
                  <p className="
                    text-sm
                    text-[var(--color-ink-muted)]
                    mb-[var(--space-sm)]
                  ">
                    {testimonial.credentials}
                  </p>
                  <p className="
                    inline-flex items-center gap-2
                    px-2 py-1
                    text-sm
                    bg-[var(--color-confirmed-bg)]
                    text-[var(--color-confirmed)]
                    rounded-[var(--radius-sm)]
                    font-medium
                  ">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                      <path d="M10 3L4.5 8.5 2 6l1-1 1.5 1.5L9 2z"/>
                    </svg>
                    {testimonial.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video testimonial CTA */}
        <div className="mt-[var(--space-2xl)] text-center">
          <a
            href="#"
            className="
              inline-flex items-center gap-2
              text-[var(--color-accent)]
              font-medium
              hover:underline
            "
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm4 10.5l-6 4V6.5z"/>
            </svg>
            Watch Maria's Story (2 minutes)
          </a>
        </div>
      </div>
    </section>
  );
}
