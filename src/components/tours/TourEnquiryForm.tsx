'use client';

import { useState } from 'react';

interface TourEnquiryFormProps {
  tourTitle: string;
  tourSlug: string;
  operatorName: string;
}

export function TourEnquiryForm({ tourTitle, tourSlug, operatorName }: TourEnquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const firstName = operatorName.split(/\s*[-–—]\s*/)[0].split(' ')[0];

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tours/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          tourTitle,
          tourSlug,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us at hello@quorumtours.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="mb-[var(--space-3xl)]">
        <h3 className="font-display text-[clamp(1.25rem,3vw,1.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
          Have a question?
        </h3>
        <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-[var(--space-lg)]">
          <p className="text-[var(--color-ink)] font-medium mb-2">
            Your enquiry has been sent.
          </p>
          <p className="text-sm text-[var(--color-ink-muted)]">
            {firstName} will be in touch shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-[var(--space-3xl)]">
      <h3 className="font-display text-[clamp(1.25rem,3vw,1.5rem)] leading-tight text-[var(--color-ink)] mb-[var(--space-md)]">
        Have a question?
      </h3>

      <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] rounded-[var(--radius-organic)] shadow-[var(--shadow-card)] p-[var(--space-lg)]">
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="enquiry-name" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Name
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="enquiry-email" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Email
              </label>
              <input
                id="enquiry-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="enquiry-message" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                Message
              </label>
              <textarea
                id="enquiry-message"
                rows={4}
                value={message}
                onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: '' })); }}
                placeholder={`Ask ${firstName} anything about this tour...`}
                className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-vertical"
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>
          </div>

          {submitError && (
            <p className="text-sm text-red-600 mt-3">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-organic)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Send enquiry'}
          </button>
        </form>
      </div>
    </section>
  );
}
