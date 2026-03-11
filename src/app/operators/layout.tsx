import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour Operators',
  description:
    'Meet the verified birding tour operators on Quorum Tours. Experienced guides across Australia running tours that confirm when birders commit.',
  openGraph: {
    title: 'Tour Operators — Quorum Tours',
    description:
      'Meet the verified birding tour operators on Quorum Tours. Experienced guides across Australia.',
  },
};

export default function OperatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
