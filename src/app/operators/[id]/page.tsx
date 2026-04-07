import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { OperatorProfileClient } from './OperatorProfileClient';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

interface OperatorPageProps {
  params: Promise<{ id: string }>;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function fetchOperator(id: string) {
  const supabase = getSupabase();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const { data, error } = await supabase
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
  return { data, error };
}

export async function generateMetadata({ params }: OperatorPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: operator, error } = await fetchOperator(id);

  if (!operator) {
    console.error('generateMetadata: operator not found', { id, error });
    return { title: 'Operator Not Found' };
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
      images: operator.logo_url ? [{ url: operator.logo_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${operator.name} — Quorum Tours`,
      description,
    },
  };
}

export default async function OperatorPage({ params }: OperatorPageProps) {
  const { id } = await params;
  const { data: operator } = await fetchOperator(id);

  const currentYear = new Date().getFullYear();

  const jsonLd = operator ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/operators/${operator.slug}`,
    name: operator.name,
    description: operator.description || operator.tagline || undefined,
    url: `${siteUrl}/operators/${operator.slug}`,
    logo: operator.logo_url || undefined,
    image: operator.logo_url || undefined,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressRegion: operator.base_location || undefined,
    },
    foundingYear: operator.established_year || undefined,
    knowsAbout: operator.specialties || undefined,
    aggregateRating: operator.tours_completed && operator.tours_completed > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: operator.tours_completed,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <OperatorProfileClient />
    </>
  );
}
