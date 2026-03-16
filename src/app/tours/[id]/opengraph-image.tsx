import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';
import { loadFont } from '@/lib/og-utils';

export const runtime = 'edge';
export const revalidate = 0;
export const alt = 'Tour details';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const { data: tour } = await supabase
    .from('tours')
    .select(`
      og_image_url,
      status,
      current_participant_count,
      threshold,
      booking_deadline
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();

  if (!tour) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#1a3320', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 48, color: '#f0fff4' }}>Tour not found</span>
        </div>
      ),
      { ...size }
    );
  }

  const current = tour.current_participant_count || 0;
  const threshold = tour.threshold || 1;
  const progressPct = Math.min(100, Math.round((current / threshold) * 100));

  let statusText = '';
  let statusColor = '#daa520';

  if (tour.status === 'confirmed') {
    statusText = 'Tour confirmed';
    statusColor = '#2e8b57';
  } else if (current >= threshold) {
    statusText = 'Guaranteed to run';
    statusColor = '#2e8b57';
  } else if (current > threshold) {
    statusText = 'Waitlist only';
    statusColor = '#daa520';
  } else if (tour.booking_deadline) {
    const deadline = new Date(tour.booking_deadline + 'T00:00:00Z');
    const now = new Date();
    if (now > deadline) {
      statusText = 'Applications closed';
      statusColor = '#6b7280';
    } else {
      statusText = `Commit by ${deadline.getUTCDate()} ${deadline.toLocaleDateString('en-AU', { month: 'long', timeZone: 'UTC' })}`;
      statusColor = '#daa520';
    }
  }

  const { font400, font700 } = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          fontFamily: 'Crimson Pro, Georgia, serif',
          position: 'relative',
          background: '#1a3320',
        }}
      >
        {/* Full-bleed background image */}
        {tour.og_image_url ? (
          <img
            src={tour.og_image_url}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}

        {/* Bottom status bar: line | status text | line */}
        {statusText && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '0 48px 28px 48px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
            {/* Left progress line */}
            <div style={{
              flex: 1, height: '4px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
            }}>
              <div style={{
                width: `${progressPct}%`, height: '100%', borderRadius: '2px',
                background: statusColor,
              }} />
            </div>
            {/* Status text */}
            <span style={{
              fontSize: '18px', color: statusColor, fontWeight: 400,
              whiteSpace: 'nowrap',
            }}>
              {statusText}
            </span>
            {/* Right line */}
            <div style={{
              flex: 1, height: '4px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
            }} />
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Crimson Pro', data: font400, style: 'normal' as const, weight: 400 as const },
        { name: 'Crimson Pro', data: font700, style: 'normal' as const, weight: 700 as const },
      ],
    }
  );
}
