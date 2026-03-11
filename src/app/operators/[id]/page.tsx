import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { OperatorProfileClient } from './OperatorProfileClient';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

interface OperatorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: OperatorPageProps): Promise<Metadata> {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const { data: operator, error } = await supabase
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
    console.error('generateMetadata: operator not found', { id, isUuid, error });
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
    },
    twitter: {
      card: 'summary_large_image',
      title: `${operator.name} — Quorum Tours`,
      description,
    },
  };
}

export default function OperatorPage() {
  return <OperatorProfileClient />;
}
