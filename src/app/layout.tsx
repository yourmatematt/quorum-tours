import type { Metadata } from 'next';
import './globals.css';
import { GlobalNav } from '@/components/GlobalNav';
import { GlobalFooter } from '@/components/GlobalFooter';

const siteUrl = 'https://quorumtours.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Quorum Tours — Birding Tours That Run When Birders Commit',
    template: '%s | Quorum Tours',
  },
  description:
    'Book birding tours with confidence. Tours only run when enough birders commit. No last-minute cancellations, full refund if quorum isn\'t reached.',
  keywords: [
    'birding tours',
    'bird watching tours',
    'wildlife tours',
    'Australia birding',
    'bird tours',
    'guided birding',
    'pelagic tours',
    'birding holidays',
  ],
  authors: [{ name: 'Quorum Tours' }],
  creator: 'Quorum Tours',
  publisher: 'Quorum Tours',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteUrl,
    siteName: 'Quorum Tours',
    title: 'Quorum Tours — Birding Tours That Run When Birders Commit',
    description:
      'Book birding tours with confidence. Tours only run when enough birders commit. No last-minute cancellations, full refund if quorum isn\'t reached.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quorum Tours - Birding tours built on trust',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quorum Tours — Birding Tours That Run When Birders Commit',
    description:
      'Book birding tours with confidence. Tours only run when enough birders commit.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Display/Heading font: Crimson Pro (Academic/Research) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Body font: Atkinson Hyperlegible (Accessibility-focused) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Mono font: JetBrains Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalNav />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
