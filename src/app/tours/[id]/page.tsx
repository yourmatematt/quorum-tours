import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { TourDetailClient } from './TourDetailClient';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

interface TourPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Try UUID first, then slug
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const { data: tour, error } = await supabase
    .from('tours')
    .select(`
      title,
      slug,
      description,
      date_start,
      date_end,
      price_cents,
      image_url,
      highlights,
      current_participant_count,
      threshold,
      status,
      operator:operators(name, base_location)
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();

  if (!tour) {
    console.error('generateMetadata: tour not found', { id, isUuid, error });
    return {
      title: 'Tour Not Found',
    };
  }

  const operator = tour.operator as unknown as { name: string; base_location: string | null } | null;
  const location = operator?.base_location || 'Australia';
  const operatorName = operator?.name || 'Tour Operator';
  const price = tour.price_cents / 100;
  const highlights = (tour.highlights || []).slice(0, 3).join(', ');

  const startDate = new Date(tour.date_start);
  const endDate = new Date(tour.date_end);
  const dateStr = startDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })
    + '–' + endDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });

  const spotsNeeded = Math.max(0, tour.threshold - (tour.current_participant_count || 0));
  const statusText = tour.status === 'confirmed' || spotsNeeded === 0
    ? 'Confirmed'
    : `${spotsNeeded} more needed`;

  // Title: aim for 50-60 chars — "Tour Name · Date · Location — Quorum Tours"
  const shortDate = startDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
  const ogTitle = `${tour.title} · ${shortDate} · ${location}`;

  // Description: aim for 110-160 chars
  const descParts = [`Led by ${operatorName}. $${price}/person. ${statusText}.`];
  if (highlights) descParts.push(`Highlights: ${highlights}.`);
  let description = descParts.join(' ');
  if (description.length > 160) {
    description = description.slice(0, 157) + '...';
  }

  const tourUrl = `${siteUrl}/tours/${tour.slug}`;

  return {
    title: ogTitle,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: tourUrl,
      siteName: 'Quorum Tours',
      title: ogTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}

export default function TourPage() {
  return <TourDetailClient />;
}
