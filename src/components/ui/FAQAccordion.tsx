'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="
          w-full
          py-[var(--space-md)]
          flex items-center justify-between
          text-left
          text-[var(--color-ink)]
          hover:text-[var(--color-primary)]
          focus:outline-none focus:text-[var(--color-primary)]
          transition-colors duration-[var(--transition-fast)]
        "
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-[var(--space-md)]">
          {item.question}
        </span>
        <span
          className="
            flex-shrink-0
            w-6 h-6
            flex items-center justify-center
            text-[var(--color-ink-subtle)]
            font-mono text-lg
          "
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div
          className="
            pb-[var(--space-md)]
            text-sm text-[var(--color-ink-muted)]
            leading-relaxed
          "
        >
          {item.answer}
        </div>
      )}
    </div>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="
        font-display text-[clamp(1.25rem,3vw,1.5rem)] leading-tight text-[var(--color-ink)]
        mb-[var(--space-md)]
      ">
        Questions
      </h3>

      <div className="
        bg-[var(--color-surface-raised)]
        border border-[var(--color-border)]
        rounded-[var(--radius-organic)]
        shadow-[var(--shadow-card)]
        px-[var(--space-lg)]
      ">
        {items.map((item, index) => (
          <FAQItemComponent
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
