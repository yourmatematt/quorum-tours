import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Birding Tours',
  description:
    'Find birding tours across Australia that run on commitment, not hope. Filter by region, species, and status. Full refund if quorum isn\'t reached.',
  openGraph: {
    title: 'Browse Birding Tours — Quorum Tours',
    description:
      'Find birding tours across Australia that run on commitment, not hope. Filter by region, species, and status.',
  },
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
