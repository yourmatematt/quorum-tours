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
      images: tour.image_url ? [{ url: tour.image_url, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}

async function getTourForSchema(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const { data } = await supabase
    .from('tours')
    .select(`
      title, slug, description, date_start, date_end,
      price_cents, image_url, threshold, current_participant_count, status,
      operator:operators(name, slug, base_location)
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();
  return data;
}

export default async function TourPage({ params }: TourPageProps) {
  const { id } = await params;
  const tour = await getTourForSchema(id);

  const operator = tour?.operator as unknown as { name: string; slug: string; base_location: string | null } | null;

  const jsonLd = tour ? {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: tour.title,
    description: tour.description || undefined,
    startDate: tour.date_start,
    endDate: tour.date_end,
    eventStatus: tour.status === 'confirmed'
      ? 'https://schema.org/EventScheduled'
      : tour.status === 'cancelled'
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: operator?.base_location || 'Australia',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AU',
        addressRegion: operator?.base_location || undefined,
      },
    },
    organizer: operator ? {
      '@type': 'Organization',
      name: operator.name,
      url: `${siteUrl}/operators/${operator.slug}`,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: (tour.price_cents / 100).toFixed(2),
      priceCurrency: 'AUD',
      availability: tour.status === 'cancelled'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      url: `${siteUrl}/tours/${tour.slug}`,
    },
    image: tour.image_url || undefined,
    url: `${siteUrl}/tours/${tour.slug}`,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <TourDetailClient />
    </>
  );
}
