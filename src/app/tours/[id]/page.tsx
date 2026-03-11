import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { TourDetailClient } from './TourDetailClient';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

interface TourPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  // Try UUID first, then slug
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const { data: tour } = await supabase
    .from('tours')
    .select(`
      title,
      slug,
      description,
      date_start,
      date_end,
      price_cents,
      image_url,
      target_species,
      current_participant_count,
      threshold,
      status,
      operator:operators(name, base_location)
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();

  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  const operator = tour.operator as unknown as { name: string; base_location: string | null } | null;
  const location = operator?.base_location || 'Australia';
  const operatorName = operator?.name || 'Tour Operator';
  const price = tour.price_cents / 100;
  const species = (tour.target_species || []).slice(0, 3).join(', ');

  const startDate = new Date(tour.date_start);
  const endDate = new Date(tour.date_end);
  const dateStr = startDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })
    + '–' + endDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });

  const spotsNeeded = Math.max(0, tour.threshold - (tour.current_participant_count || 0));
  const statusText = tour.status === 'confirmed' || spotsNeeded === 0
    ? 'Confirmed and running'
    : `${spotsNeeded} more needed`;

  const description = species
    ? `${dateStr} · ${location} · Led by ${operatorName}. Target species: ${species}. $${price}/person. ${statusText}.`
    : `${dateStr} · ${location} · Led by ${operatorName}. $${price}/person. ${statusText}.`;

  const tourUrl = `${siteUrl}/tours/${tour.slug}`;

  return {
    title: tour.title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: tourUrl,
      siteName: 'Quorum Tours',
      title: tour.title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description,
    },
  };
}

export default function TourPage() {
  return <TourDetailClient />;
}
