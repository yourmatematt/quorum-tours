export function ProblemAgitationSection() {
  const painPoints = [
    {
      title: "Breakeven Anxiety",
      quote: "You've put $8,000 down on the boat charter. The lodge wants another $4,000. And you've got three signups for a trip that needs eight. Now you're lying awake at 2 AM doing math.",
    },
    {
      title: "Payment Chasing",
      quote: "It feels like begging. You email an invoice and wait. Send gentle reminders. Call clients who promise 'I'll pay tonight' — then silence.",
    },
    {
      title: "Cancellation Calls",
      quote: "Every near-empty list is a pounding heart. Cancel on clients and destroy your reputation. Or run the tour at a loss and destroy your business.",
    },
  ];

  return (
    <section className="
      py-[var(--space-section-loose)]
      bg-[#1a2733]
      text-white
    ">
      <div className="
        w-full max-w-[var(--container-max)]
        mx-auto px-[var(--space-lg)]
      ">
        {/* Section header */}
        <h2 className="
          font-display
          text-[var(--text-3xl)]
          text-white
          mb-[var(--space-3xl)]
          max-w-[24ch]
        ">
          You Didn't Become a Naturalist to Be a Debt Collector
        </h2>

        {/* Pain points - single column */}
        <div className="space-y-[var(--space-3xl)]">
          {painPoints.map((pain, index) => (
            <div key={index} className="max-w-[70ch]">
              {/* Title */}
              <h3 className="
                text-[var(--text-sm)]
                text-white/60
                uppercase
                tracking-wider
                mb-[var(--space-md)]
                font-medium
              ">
                {pain.title}
              </h3>

              {/* Pull quote */}
              <blockquote className="
                font-display
                text-[var(--text-xl)]
                text-white/90
                leading-relaxed
                border-l-4 border-white/30
                pl-[var(--space-lg)]
              ">
                {pain.quote}
              </blockquote>
            </div>
          ))}
        </div>

        {/* Supporting stat */}
        <div className="
          mt-[var(--space-3xl)]
          pt-[var(--space-2xl)]
          border-t border-white/20
        ">
          <p className="text-white/70 max-w-[60ch]">
            <span className="font-mono font-semibold text-white">33%</span> of traditional tour bookings get cancelled — costing operators reputation and revenue
          </p>
        </div>
      </div>
    </section>
  );
}
