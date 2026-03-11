import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { OperatorProfileClient } from './OperatorProfileClient';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

interface OperatorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OperatorPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const { data: operator } = await supabase
    .from('operators')
    .select(`
      name,
      slug,
      tagline,
      description,
      base_location,
      logo_url,
      specialties,
      tours_completed,
      guests_served,
      established_year,
      is_verified
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();

  if (!operator) {
    return {
      title: 'Operator Not Found',
    };
  }

  const location = operator.base_location || 'Australia';
  const specialties = (operator.specialties || []).slice(0, 3).join(', ');
  const currentYear = new Date().getFullYear();
  const yearsExp = operator.established_year
    ? currentYear - operator.established_year
    : null;

  const descParts: string[] = [];
  if (operator.tagline) descParts.push(operator.tagline);
  if (specialties) descParts.push(`Specialising in ${specialties}.`);
  if (location) descParts.push(`Based in ${location}.`);
  if (yearsExp && yearsExp > 0) descParts.push(`${yearsExp} years experience.`);
  if (operator.tours_completed) descParts.push(`${operator.tours_completed} tours completed.`);

  const description = descParts.join(' ')
    || `Birding tour operator on Quorum Tours. Based in ${location}.`;

  const operatorUrl = `${siteUrl}/operators/${operator.slug}`;

  return {
    title: operator.name,
    description,
    openGraph: {
      type: 'profile',
      locale: 'en_AU',
      url: operatorUrl,
      siteName: 'Quorum Tours',
      title: `${operator.name} — Quorum Tours`,
      description,
      images: operator.logo_url
        ? [{ url: operator.logo_url, width: 400, height: 400, alt: operator.name }]
        : [{ url: '/og-image.png', width: 1200, height: 630, alt: operator.name }],
    },
    twitter: {
      card: operator.logo_url ? 'summary' : 'summary_large_image',
      title: `${operator.name} — Quorum Tours`,
      description,
      images: operator.logo_url ? [operator.logo_url] : ['/og-image.png'],
    },
  };
}

export default function OperatorPage() {
  return <OperatorProfileClient />;
}
