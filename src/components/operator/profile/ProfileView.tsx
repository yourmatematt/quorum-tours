'use client';

import { useState } from 'react';
import { Eye, Upload, X } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader, DashboardScrollArea } from '@/components/operator';

const TABS = [
  { id: 'public', name: 'Public Profile', description: 'Information visible to participants' },
  { id: 'account', name: 'Account & Security', description: 'Login and password settings' },
  { id: 'business', name: 'Business Information', description: 'Company and insurance details' },
  { id: 'notifications', name: 'Notifications', description: 'Email and SMS preferences' },
];

export function ProfileView() {
  const [activeTab, setActiveTab] = useState('public');

  return (
    <DashboardViewContainer maxWidth="default">
      {/* Fixed Header - Never Scrolls */}
      <DashboardViewHeader
        title="Profile"
        subtitle="Manage your operator profile and account settings"
        actions={
          <a
            href="/operators/1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium hover:border-[var(--color-primary)] transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </a>
        }
      />

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
          {activeTab === 'public' && <PublicProfileTab />}
          {activeTab === 'account' && <AccountSecurityTab />}
          {activeTab === 'business' && <BusinessInfoTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
        </div>
      </div>

      {/* Fixed Action Buttons - Always Visible */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)] mt-4">
        <button className="px-4 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] font-medium text-[var(--color-ink)] hover:border-[var(--color-primary)] transition-colors">
          Discard Changes
        </button>
        <button className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
          Save Changes
        </button>
      </div>
    </DashboardViewContainer>
  );
}

function PublicProfileTab() {
  return (
    <div className="space-y-4">
      {/* Photo Upload - Compact */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[var(--color-surface-sunken)] rounded-full flex items-center justify-center text-xl font-display font-semibold text-[var(--color-primary)] flex-shrink-0">
          RC
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
          <p className="text-xs text-[var(--color-ink-muted)]">Square, 400×400px min</p>
        </div>
      </div>

      {/* Basic Info - Compact grid */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Full Name *</label>
          <input
            type="text"
            defaultValue="Roberto Clay"
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Primary Location</label>
          <input
            type="text"
            defaultValue="Buenos Aires, Argentina"
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Headline</label>
          <input
            type="text"
            placeholder="Expert Birding Guide Specializing in Andean Ecosystems"
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">About Me</label>
          <textarea
            rows={3}
            placeholder="Tell participants about your background, experience, and guiding philosophy..."
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Years of Experience</label>
          <input
            type="number"
            defaultValue={15}
            className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function AccountSecurityTab() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Email Address</label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            defaultValue="roberto@example.com"
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

function BusinessInfoTab() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Operating As</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="operating-as" value="individual" className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Individual Guide</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="operating-as" value="company" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Registered Company</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Company Name *</label>
        <input
          type="text"
          defaultValue="Roberto Clay Birding Tours"
          className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
        />
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">Appears on booking invoices</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Tax ID / Business Registration</label>
        <input
          type="text"
          placeholder="CUIT: 20-12345678-9"
          className="w-full px-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] focus:border-[var(--color-primary)] focus:outline-none"
        />
        <p className="text-xs text-[var(--color-ink-muted)] mt-1">🔒 Private - not shown publicly</p>
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h3 className="font-medium text-sm text-[var(--color-ink)] mb-2">Booking Updates</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">New booking</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Cancellation</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Payment confirmed</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Threshold reached</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm text-[var(--color-ink)] mb-2">Financial Updates</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Payout initiated</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Payout completed</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Weekly summary</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm text-[var(--color-ink)] mb-2">Delivery</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="digest" value="immediate" className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Real-time</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="digest" value="daily" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Daily digest</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="digest" value="weekly" className="w-4 h-4" />
            <span className="text-sm text-[var(--color-ink)]">Weekly digest</span>
          </label>
        </div>
      </div>
    </div>
  );
}
