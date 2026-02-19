'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, Upload, X, Loader2 } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader } from '@/components/operator';
import { FormAlert } from '@/components/auth/FormAlert';
import { useOperatorContext } from '@/hooks/useOperatorContext';

const TABS = [
  { id: 'public', name: 'Public Profile', description: 'Information visible to participants' },
  { id: 'account', name: 'Account & Security', description: 'Login and password settings' },
  { id: 'business', name: 'Business Information', description: 'Company and insurance details' },
  { id: 'notifications', name: 'Notifications', description: 'Email and SMS preferences' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface PublicFormData {
  fullName: string;
  baseLocation: string;
  tagline: string;
  description: string;
  yearsExperience: string;
}

interface BusinessFormData {
  companyName: string;
  taxId: string;
  operatingAs: 'individual' | 'company';
}

interface NotificationPreferences {
  bookingNew: boolean;
  bookingCancellation: boolean;
  bookingPaymentConfirmed: boolean;
  bookingQuorumReached: boolean;
  financialPayoutInitiated: boolean;
  financialPayoutCompleted: boolean;
  financialWeeklySummary: boolean;
  deliveryMode: 'immediate' | 'daily' | 'weekly';
}

interface FormState {
  public: PublicFormData;
  business: BusinessFormData;
  notifications: NotificationPreferences;
}

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  bookingNew: true,
  bookingCancellation: true,
  bookingPaymentConfirmed: true,
  bookingQuorumReached: true,
  financialPayoutInitiated: true,
  financialPayoutCompleted: true,
  financialWeeklySummary: false,
  deliveryMode: 'daily',
};

function buildFormStateFromOperator(
  operator: ReturnType<typeof useOperatorContext>['operator']
): FormState {
  const metadata = (operator?.metadata ?? {}) as Record<string, unknown>;
  const notifPrefs = (metadata.notification_preferences ?? {}) as Partial<NotificationPreferences>;

  const currentYear = new Date().getFullYear();
  const yearsExperience = metadata.years_experience
    ? String(metadata.years_experience)
    : operator?.established_year
      ? String(currentYear - operator.established_year)
      : '';

  return {
    public: {
      fullName: operator?.name ?? '',
      baseLocation: operator?.base_location ?? '',
      tagline: operator?.tagline ?? '',
      description: operator?.description ?? '',
      yearsExperience,
    },
    business: {
      companyName: operator?.name ?? '',
      taxId: (metadata.tax_id as string) ?? '',
      operatingAs: (metadata.operating_as as 'individual' | 'company') ?? 'company',
    },
    notifications: {
      ...DEFAULT_NOTIFICATIONS,
      ...notifPrefs,
    },
  };
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileView() {
  const { operator, user, isLoading, error: contextError } = useOperatorContext();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<TabId>('public');
  const [formState, setFormState] = useState<FormState>(() => buildFormStateFromOperator(null));
  const [baselineState, setBaselineState] = useState<FormState>(() => buildFormStateFromOperator(null));
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ variant: 'success' | 'error'; message: string } | null>(null);

  // Populate form when operator data loads
  useEffect(() => {
    if (!operator) return;
    const state = buildFormStateFromOperator(operator);
    setFormState(state);
    setBaselineState(state);
  }, [operator]);

  // Handle Stripe return URL params
  useEffect(() => {
    const stripeParam = searchParams.get('stripe');
    if (stripeParam === 'complete') {
      setFeedback({ variant: 'success', message: 'Stripe account setup completed successfully.' });
    } else if (stripeParam === 'refresh') {
      setFeedback({ variant: 'error', message: 'Stripe onboarding session expired. Please try connecting again from your dashboard.' });
    }
  }, [searchParams]);

  const isDirty = useMemo(
    () => JSON.stringify(formState) !== JSON.stringify(baselineState),
    [formState, baselineState]
  );

  const updatePublicField = useCallback(function updatePublicField(
    field: keyof PublicFormData,
    value: string
  ) {
    setFormState((prev) => ({ ...prev, public: { ...prev.public, [field]: value } }));
    setFeedback(null);
  }, []);

  const updateBusinessField = useCallback(function updateBusinessField(
    field: keyof BusinessFormData,
    value: string
  ) {
    setFormState((prev) => ({ ...prev, business: { ...prev.business, [field]: value } }));
    setFeedback(null);
  }, []);

  const updateNotificationField = useCallback(function updateNotificationField(
    field: keyof NotificationPreferences,
    value: boolean | string
  ) {
    setFormState((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }));
    setFeedback(null);
  }, []);

  function handleDiscard() {
    setFormState(baselineState);
    setFeedback(null);
  }

  async function handleSave() {
    setIsSaving(true);
    setFeedback(null);

    let tabKey: string;
    let payload: Record<string, unknown>;

    if (activeTab === 'public') {
      tabKey = 'public';
      payload = {
        name: formState.public.fullName,
        displayName: formState.public.fullName,
        tagline: formState.public.tagline,
        description: formState.public.description,
        baseLocation: formState.public.baseLocation,
        years_experience: formState.public.yearsExperience
          ? Number(formState.public.yearsExperience)
          : null,
      };
    } else if (activeTab === 'business') {
      tabKey = 'business';
      payload = {
        tax_id: formState.business.taxId,
        operating_as: formState.business.operatingAs,
        company_name: formState.business.companyName,
      };
    } else if (activeTab === 'notifications') {
      tabKey = 'notifications';
      payload = { ...formState.notifications };
    } else {
      setIsSaving(false);
      return;
    }

    const response = await fetch('/api/operator/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tab: tabKey, data: payload }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: 'Request failed' }));
      setFeedback({ variant: 'error', message: body.error ?? 'Failed to save changes.' });
      setIsSaving(false);
      return;
    }

    // Update baseline so isDirty resets
    setBaselineState((prev) => ({ ...prev, [activeTab]: formState[activeTab] }));
    setFeedback({ variant: 'success', message: 'Changes saved.' });
    setIsSaving(false);
  }

  if (isLoading) {
    return (
      <DashboardViewContainer maxWidth="default">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-ink-muted)]" />
          <span className="ml-2 text-sm text-[var(--color-ink-muted)]">Loading profile...</span>
        </div>
      </DashboardViewContainer>
    );
  }

  if (contextError || !operator) {
    return (
      <DashboardViewContainer maxWidth="default">
        <div className="py-10">
          <FormAlert variant="error">
            {contextError ?? 'Unable to load operator profile.'}
          </FormAlert>
        </div>
      </DashboardViewContainer>
    );
  }

  const previewHref = `/operators/${operator.slug}`;

  return (
    <DashboardViewContainer maxWidth="default">
      {/* Fixed Header */}
      <DashboardViewHeader
        title="Profile"
        subtitle="Manage your operator profile and account settings"
        actions={
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium hover:border-[var(--color-primary)] transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </a>
        }
      />

      {/* Feedback alert */}
      {feedback && (
        <div className="mb-4">
          <FormAlert variant={feedback.variant}>{feedback.message}</FormAlert>
        </div>
      )}

      {/* Fixed Tabs - Compact */}
      <div className="mb-4 border-b-2 border-[var(--color-border)]">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] p-4">
          {activeTab === 'public' && (
            <PublicProfileTab
              data={formState.public}
              initials={getInitials(formState.public.fullName || operator.name)}
              onChange={updatePublicField}
            />
          )}
          {activeTab === 'account' && (
            <AccountSecurityTab email={user?.email ?? ''} />
          )}
          {activeTab === 'business' && (
            <BusinessInfoTab
              data={formState.business}
              onChange={updateBusinessField}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationsTab
              data={formState.notifications}
              onChange={updateNotificationField}
            />
          )}
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)] mt-4">
        <button
          onClick={handleDiscard}
          disabled={!isDirty || isSaving}
          className="px-4 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium text-[var(--color-ink)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Discard Changes
        </button>
        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </DashboardViewContainer>
  );
}

/* ---------- Tab Components ---------- */

interface PublicProfileTabProps {
  data: PublicFormData;
  initials: string;
  onChange: (field: keyof PublicFormData, value: string) => void;
}

function PublicProfileTab({ data, initials, onChange }: PublicProfileTabProps) {
  return (
    <div className="space-y-4">
      {/* Photo Upload - Compact */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[var(--color-surface-sunken)] rounded-full flex items-center justify-center text-xl font-display font-semibold text-[var(--color-primary)] flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="flex gap-2 mb-1">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium hover:border-[var(--color-primary)] transition-colors">
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border-2 border-[var(--color-destructive-border)] text-[var(--color-destructive)] rounded-[var(--radius-organic)] font-medium hover:border-[var(--color-destructive)] transition-colors">
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
          <p className="text-xs text-[var(--color-ink-muted)]">Square, 400x400px min</p>
        </div>
      </div>

      {/* Basic Info - Compact grid */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Full Name *</label>
          <input
            id="full-name"
            type="text"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            aria-required="true"
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="primary-location" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Primary Location</label>
          <input
            id="primary-location"
            type="text"
            value={data.baseLocation}
            onChange={(e) => onChange('baseLocation', e.target.value)}
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="headline" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Headline</label>
          <input
            id="headline"
            type="text"
            value={data.tagline}
            onChange={(e) => onChange('tagline', e.target.value)}
            placeholder="Expert Birding Guide Specializing in Andean Ecosystems"
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="about-me" className="block text-sm font-medium text-[var(--color-ink)] mb-1">About Me</label>
          <textarea
            id="about-me"
            rows={3}
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Tell participants about your background, experience, and guiding philosophy..."
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none resize-none"
          />
        </div>

        <div>
          <label htmlFor="years-experience" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Years of Experience</label>
          <input
            id="years-experience"
            type="number"
            value={data.yearsExperience}
            onChange={(e) => onChange('yearsExperience', e.target.value)}
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

interface AccountSecurityTabProps {
  email: string;
}

function AccountSecurityTab({ email }: AccountSecurityTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Email Address</label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            disabled
            className="flex-1 px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]"
          />
          <button className="px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium hover:border-[var(--color-primary)] transition-colors">
            Change
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Password</label>
        <div className="flex items-center gap-2">
          <input
            type="password"
            defaultValue="••••••••••••"
            disabled
            className="flex-1 px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface-sunken)]"
          />
          <button className="px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium hover:border-[var(--color-primary)] transition-colors">
            Change
          </button>
        </div>
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">Last changed: Dec 15, 2025</p>
      </div>

      <div className="p-3 border-2 border-[var(--color-warning-border)] bg-[var(--color-warning-bg)] rounded-[var(--radius-organic)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-sm text-[var(--color-warning-text)]">Two-Factor Authentication</h3>
            <p className="text-xs text-[var(--color-warning-text)]">Not enabled. Add extra security.</p>
          </div>
          <button className="px-3 py-1.5 text-sm bg-[var(--color-warning)] text-white rounded-[var(--radius-organic)] font-medium hover:brightness-90 transition-all flex-shrink-0">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
}

interface BusinessInfoTabProps {
  data: BusinessFormData;
  onChange: (field: keyof BusinessFormData, value: string) => void;
}

function BusinessInfoTab({ data, onChange }: BusinessInfoTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Operating As</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="operating-as"
              value="individual"
              checked={data.operatingAs === 'individual'}
              onChange={() => onChange('operatingAs', 'individual')}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Individual Guide</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="operating-as"
              value="company"
              checked={data.operatingAs === 'company'}
              onChange={() => onChange('operatingAs', 'company')}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Registered Company</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="company-name" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Company Name *</label>
        <input
          id="company-name"
          type="text"
          value={data.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          aria-required="true"
          className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
        />
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">Appears on booking invoices</p>
      </div>

      <div>
        <label htmlFor="tax-id" className="block text-sm font-medium text-[var(--color-ink)] mb-1">Tax ID / Business Registration</label>
        <input
          id="tax-id"
          type="text"
          value={data.taxId}
          onChange={(e) => onChange('taxId', e.target.value)}
          placeholder="CUIT: 20-12345678-9"
          className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
        />
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">Private - not shown publicly</p>
      </div>
    </div>
  );
}

interface NotificationsTabProps {
  data: NotificationPreferences;
  onChange: (field: keyof NotificationPreferences, value: boolean | string) => void;
}

function NotificationsTab({ data, onChange }: NotificationsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h3 className="font-medium text-sm text-[var(--color-ink)] mb-2">Booking Updates</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.bookingNew}
              onChange={(e) => onChange('bookingNew', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">New booking</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.bookingCancellation}
              onChange={(e) => onChange('bookingCancellation', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Cancellation</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.bookingPaymentConfirmed}
              onChange={(e) => onChange('bookingPaymentConfirmed', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Payment confirmed</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.bookingQuorumReached}
              onChange={(e) => onChange('bookingQuorumReached', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Quorum reached</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm text-[var(--color-ink)] mb-2">Financial Updates</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.financialPayoutInitiated}
              onChange={(e) => onChange('financialPayoutInitiated', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Payout initiated</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.financialPayoutCompleted}
              onChange={(e) => onChange('financialPayoutCompleted', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Payout completed</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.financialWeeklySummary}
              onChange={(e) => onChange('financialWeeklySummary', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Weekly summary</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm text-[var(--color-ink)] mb-2">Delivery</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="digest"
              value="immediate"
              checked={data.deliveryMode === 'immediate'}
              onChange={() => onChange('deliveryMode', 'immediate')}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Real-time</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="digest"
              value="daily"
              checked={data.deliveryMode === 'daily'}
              onChange={() => onChange('deliveryMode', 'daily')}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Daily digest</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="digest"
              value="weekly"
              checked={data.deliveryMode === 'weekly'}
              onChange={() => onChange('deliveryMode', 'weekly')}
              className="w-4 h-4"
            />
            <span className="text-sm text-[var(--color-ink)]">Weekly digest</span>
          </label>
        </div>
      </div>
    </div>
  );
}
