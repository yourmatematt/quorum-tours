'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Video, MessageCircle, ChevronDown, BookOpen, HelpCircle, ExternalLink } from 'lucide-react';
import { DashboardViewContainer, DashboardViewHeader } from '@/components/operator';

const FAQ_CATEGORIES = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    questions: [
      { q: 'How do I create my first tour?', a: 'Click "Create Tour" in the sidebar and follow the wizard.' },
      { q: 'What info do I need?', a: 'Tour dates, pricing, participant limits, and description.' },
      { q: 'How do participants find my tours?', a: 'Tours appear in Browse Tours with filters by species and region.' },
    ],
  },
  {
    id: 'tours',
    name: 'Tours',
    questions: [
      { q: 'Single-day vs multi-day?', a: 'Single-day has one date. Multi-day spans multiple days with itineraries.' },
      { q: 'Setting participant threshold?', a: 'In Pricing step - tour confirms when threshold is reached.' },
      { q: 'Can I duplicate a tour?', a: 'Yes, click "Duplicate" on any tour card in My Tours.' },
    ],
  },
  {
    id: 'bookings',
    name: 'Bookings',
    questions: [
      { q: 'How do I know when someone books?', a: 'Email notification + Dashboard updates instantly.' },
      { q: 'What if a participant cancels?', a: 'Spot reopens, refund processed per your policy.' },
      { q: 'Can I export participants?', a: 'Yes, "Export CSV" on the Bookings page.' },
    ],
  },
];

export function HelpView() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const currentCategory = FAQ_CATEGORIES.find(c => c.id === activeCategory) || FAQ_CATEGORIES[0];

  return (
    <DashboardViewContainer maxWidth="default">
      {/* Header with inline search */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="font-display text-xl font-semibold text-[var(--color-ink)]">Help & Support</h1>
          <p className="text-sm text-[var(--color-ink-muted)]">Find answers and resources</p>
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-muted)]" />
          <input
            type="search"
            placeholder="Search help..."
            className="w-full pl-9 pr-3 py-2 text-sm border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] bg-[var(--color-surface)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
      </div>

      {/* Quick Actions - Card grid matching Revenue Pipeline style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <QuickActionCard
          icon={<FileText className="w-4 h-4" />}
          label="Create Tour"
          sublabel="Step-by-step"
          description="Follow the wizard to set up your first tour"
          href="/operator/tours/create"
          variant="primary"
          isInternal
        />
        <QuickActionCard
          icon={<Video className="w-4 h-4" />}
          label="Video Tutorials"
          sublabel="Watch & learn"
          description="Visual guides for common tasks"
          href="/how-it-works"
          variant="secondary"
          isInternal
        />
        <QuickActionCard
          icon={<MessageCircle className="w-4 h-4" />}
          label="Contact Support"
          sublabel="Get help"
          description="Our team typically responds within 24h"
          href="mailto:support@quorumtours.com"
          variant="neutral"
        />
      </div>

      {/* FAQ Section with Tabs */}
      <div className="mb-4">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)] mb-2">FAQ</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setExpandedQuestion(null); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-[var(--radius-organic)] transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion - Single card */}
        <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] divide-y divide-[var(--color-border)]">
          {currentCategory.questions.map((item, idx) => {
            const qId = `${activeCategory}-${idx}`;
            const isExpanded = expandedQuestion === qId;
            return (
              <div key={idx}>
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : qId)}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[var(--color-surface-sunken)] transition-colors"
                >
                  <span className="text-sm font-medium text-[var(--color-ink)]">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[var(--color-ink-muted)] flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-3 text-sm text-[var(--color-ink-muted)]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resources - 2x2 Grid */}
      <div className="mb-4">
        <h2 className="text-sm font-medium text-[var(--color-ink-muted)] mb-2">Resources</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <ResourceCard icon={<BookOpen className="w-4 h-4" />} title="Handbook" href="/how-it-works" isInternal />
          <ResourceCard icon={<Video className="w-4 h-4" />} title="Videos" href="/how-it-works" isInternal />
          <ResourceCard icon={<FileText className="w-4 h-4" />} title="Best Practices" href="/for-operators" isInternal />
          <ResourceCard icon={<HelpCircle className="w-4 h-4" />} title="Payments Guide" href="/operator/earnings" isInternal />
        </div>
      </div>

      {/* Contact Banner - Inline */}
      <div className="flex items-center justify-between gap-4 p-3 bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)]">
        <p className="text-sm text-[var(--color-ink-muted)]">
          Can't find what you're looking for?
        </p>
        <a
          href="mailto:support@quorumtours.com"
          className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-[var(--radius-organic)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors flex-shrink-0"
        >
          Contact Support
        </a>
      </div>
    </DashboardViewContainer>
  );
}

function QuickActionCard({
  icon,
  label,
  sublabel,
  description,
  href,
  variant,
  isInternal = false,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  description: string;
  href: string;
  variant: 'primary' | 'secondary' | 'neutral';
  isInternal?: boolean;
}) {
  const variantStyles = {
    primary: {
      border: 'border-[var(--color-confirmed)]/30',
      bg: 'bg-[var(--color-confirmed-bg)]/50',
      indicator: 'bg-[var(--color-confirmed)]',
      iconColor: 'text-[var(--color-confirmed)]',
    },
    secondary: {
      border: 'border-[var(--color-forming)]/30',
      bg: 'bg-[var(--color-forming-bg)]/50',
      indicator: 'bg-[var(--color-forming)]',
      iconColor: 'text-[var(--color-forming)]',
    },
    neutral: {
      border: 'border-[var(--color-border)]',
      bg: 'bg-[var(--color-surface)]',
      indicator: 'bg-[var(--color-ink-muted)]',
      iconColor: 'text-[var(--color-ink-muted)]',
    },
  };

  const styles = variantStyles[variant];
  const className = `${styles.bg} ${styles.border} border-2 rounded-[var(--radius-organic)] p-4 hover:border-[var(--color-primary)] transition-colors cursor-pointer block`;

  const content = (
    <>
      {/* Header with indicator dot */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${styles.indicator}`} />
        <span className="text-sm font-medium text-[var(--color-ink)]">{label}</span>
        <span className="text-xs text-[var(--color-ink-muted)]">• {sublabel}</span>
      </div>

      {/* Icon */}
      <div className={`${styles.iconColor} mb-2`}>
        {icon}
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--color-ink-muted)]">{description}</p>
    </>
  );

  if (isInternal) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return <a href={href} className={className}>{content}</a>;
}

function ResourceCard({ icon, title, href, isInternal = false }: { icon: React.ReactNode; title: string; href: string; isInternal?: boolean }) {
  const className = "flex items-center gap-2 p-3 bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-[var(--radius-organic)] hover:border-[var(--color-primary)] transition-colors";

  const content = (
    <>
      <span className="text-[var(--color-primary)]">{icon}</span>
      <span className="text-sm font-medium text-[var(--color-ink)]">{title}</span>
      <ExternalLink className="w-3 h-3 text-[var(--color-ink-muted)] ml-auto" />
    </>
  );

  if (isInternal) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return <a href={href} className={className}>{content}</a>;
}
