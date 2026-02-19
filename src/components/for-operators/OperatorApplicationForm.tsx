'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/supabase/useAuth';
import { FormAlert } from '@/components/auth/FormAlert';
import Link from 'next/link';

interface FormData {
  contactName: string;
  contactEmail: string;
  businessName: string;
  baseLocation: string;
  description: string;
  yearsExperience: string;
  credentials: string;
  websiteUrl: string;
}

interface FieldErrors {
  contactName?: string;
  contactEmail?: string;
  businessName?: string;
  baseLocation?: string;
  description?: string;
  yearsExperience?: string;
}

export function OperatorApplicationForm(): JSX.Element {
  const { user } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    contactName: user?.user_metadata?.first_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim()
      : '',
    contactEmail: user?.email || '',
    businessName: '',
    baseLocation: '',
    description: '',
    yearsExperience: '',
    credentials: '',
    websiteUrl: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (error) setError(null);
  }

  function validate(): boolean {
    const errors: FieldErrors = {};

    if (!formData.contactName.trim()) errors.contactName = 'Your name is required.';
    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email.';
    }
    if (!formData.businessName.trim()) errors.businessName = 'Business name is required.';
    if (!formData.baseLocation.trim()) errors.baseLocation = 'Location is required.';
    if (!formData.description.trim()) {
      errors.description = 'Tell us about your operation.';
    } else if (formData.description.trim().length < 20) {
      errors.description = 'Please provide a bit more detail (at least 20 characters).';
    }
    if (!formData.yearsExperience.trim()) {
      errors.yearsExperience = 'Years of experience is required.';
    } else if (isNaN(parseInt(formData.yearsExperience)) || parseInt(formData.yearsExperience) < 0) {
      errors.yearsExperience = 'Please enter a valid number.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/operator-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Success state
  if (submitted) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-8 sm:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-confirmed-bg)] flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--color-confirmed)]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-[var(--color-ink)] mb-3">
          Application Received
        </h2>
        <p className="text-[var(--color-ink-muted)] text-lg mb-2">
          Thanks for applying. We'll review your application and be in touch within <strong>48 hours</strong>.
        </p>
        <p className="text-[var(--color-ink-subtle)] text-sm mb-8">
          We sent a confirmation to <strong>{formData.contactEmail}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Browse Tours
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border)] text-[var(--color-ink)] rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-surface-sunken)] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-[var(--radius-md)] border ${
      hasError ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'
    } bg-[var(--color-surface)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors`;

  const labelClasses = "block text-sm font-medium text-[var(--color-ink)] mb-1.5";
  const errorClasses = "text-sm text-[var(--color-danger)] mt-1";

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-ink)] mb-3">
          Apply to List Tours
        </h1>
        <p className="text-[var(--color-ink-muted)] text-lg max-w-[45ch] mx-auto">
          Tell us about your operation. We review every application and respond within 48 hours.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 sm:p-8 space-y-5"
      >
        {error && <FormAlert variant="error">{error}</FormAlert>}

        {!user && (
          <div className="bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-sm text-[var(--color-ink-muted)]">
            Already have an account?{' '}
            <Link href="/login?redirect=/apply" className="text-[var(--color-primary)] font-medium hover:underline">
              Sign in first
            </Link>{' '}
            to link this application to your account.
          </div>
        )}

        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactName" className={labelClasses}>Your Name *</label>
            <input
              id="contactName"
              type="text"
              value={formData.contactName}
              onChange={e => updateField('contactName', e.target.value)}
              placeholder="Jane Smith"
              autoComplete="name"
              className={inputClasses(!!fieldErrors.contactName)}
            />
            {fieldErrors.contactName && <p className={errorClasses}>{fieldErrors.contactName}</p>}
          </div>
          <div>
            <label htmlFor="contactEmail" className={labelClasses}>Email *</label>
            <input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={e => updateField('contactEmail', e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses(!!fieldErrors.contactEmail)}
            />
            {fieldErrors.contactEmail && <p className={errorClasses}>{fieldErrors.contactEmail}</p>}
          </div>
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className={labelClasses}>Business Name *</label>
          <input
            id="businessName"
            type="text"
            value={formData.businessName}
            onChange={e => updateField('businessName', e.target.value)}
            placeholder="Pacific Coast Birding Tours"
            autoComplete="organization"
            className={inputClasses(!!fieldErrors.businessName)}
          />
          {fieldErrors.businessName && <p className={errorClasses}>{fieldErrors.businessName}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="baseLocation" className={labelClasses}>Base Location *</label>
          <input
            id="baseLocation"
            type="text"
            value={formData.baseLocation}
            onChange={e => updateField('baseLocation', e.target.value)}
            placeholder="Melbourne, Victoria, Australia"
            className={inputClasses(!!fieldErrors.baseLocation)}
          />
          {fieldErrors.baseLocation && <p className={errorClasses}>{fieldErrors.baseLocation}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClasses}>About Your Operation *</label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={e => updateField('description', e.target.value)}
            placeholder="Tell us about the tours you run, your target audience, what makes your tours unique..."
            className={inputClasses(!!fieldErrors.description)}
          />
          {fieldErrors.description && <p className={errorClasses}>{fieldErrors.description}</p>}
        </div>

        {/* Years Experience and Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="yearsExperience" className={labelClasses}>Years of Experience *</label>
            <input
              id="yearsExperience"
              type="number"
              min="0"
              max="99"
              value={formData.yearsExperience}
              onChange={e => updateField('yearsExperience', e.target.value)}
              placeholder="5"
              className={inputClasses(!!fieldErrors.yearsExperience)}
            />
            {fieldErrors.yearsExperience && <p className={errorClasses}>{fieldErrors.yearsExperience}</p>}
          </div>
          <div>
            <label htmlFor="credentials" className={labelClasses}>Credentials / Licenses</label>
            <input
              id="credentials"
              type="text"
              value={formData.credentials}
              onChange={e => updateField('credentials', e.target.value)}
              placeholder="e.g. Eco Tourism Australia, Wildlife Guide Cert"
              className={inputClasses(false)}
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label htmlFor="websiteUrl" className={labelClasses}>Website</label>
          <input
            id="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={e => updateField('websiteUrl', e.target.value)}
            placeholder="https://yourwebsite.com"
            autoComplete="url"
            className={inputClasses(false)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-6 py-3.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-semibold text-base hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>

        <p className="text-center text-sm text-[var(--color-ink-subtle)]">
          No credit card required. We'll review and respond within 48 hours.
        </p>
      </form>
    </div>
  );
}
