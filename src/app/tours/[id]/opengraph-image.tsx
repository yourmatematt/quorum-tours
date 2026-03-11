import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';
import { loadFont } from '@/lib/og-utils';

export const runtime = 'edge';
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
      title,
      date_start,
      date_end,
      price_cents,
      highlights,
      current_participant_count,
      threshold,
      capacity,
      status,
      operator:operators(name, base_location)
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();

  if (!tour) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 48, color: '#1A3320' }}>Tour not found</span>
        </div>
      ),
      { ...size }
    );
  }

  const operator = tour.operator as unknown as { name: string; base_location: string | null } | null;
  const location = operator?.base_location || 'Australia';
  const operatorName = operator?.name || 'Tour Operator';
  const price = tour.price_cents / 100;
  const highlights = (tour.highlights || []).slice(0, 4);
  const current = tour.current_participant_count || 0;
  const threshold = tour.threshold || 1;
  const progressPct = Math.min(100, Math.round((current / threshold) * 100));

  const startDate = new Date(tour.date_start);
  const endDate = new Date(tour.date_end);
  const dateStr = startDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })
    + ' – ' + endDate.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' });

  const isConfirmed = tour.status === 'confirmed' || current >= threshold;
  const spotsNeeded = Math.max(0, threshold - current);

  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#ffffff',
          padding: '48px 56px',
          fontFamily: 'Crimson Pro, Georgia, serif',
        }}
      >
        {/* Green accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: '#2E8B57', display: 'flex',
        }} />

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#2E8B57', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '20px', fontWeight: 700,
            }}>Q</div>
            <span style={{ fontSize: '20px', color: '#4B5563', fontWeight: 500 }}>quorumtours.com</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 20px', borderRadius: '24px',
            background: isConfirmed ? '#2E8B57' : '#DAA520',
            color: isConfirmed ? 'white' : '#1A3320',
            fontSize: '18px', fontWeight: 600,
          }}>
            {isConfirmed ? 'Confirmed' : `${spotsNeeded} more needed`}
          </div>
        </div>

        {/* Tour title */}
        <div style={{
          fontSize: '64px', fontWeight: 700, color: '#1A3320',
          lineHeight: 1.1, marginBottom: '20px',
          display: 'flex',
        }}>
          {tour.title}
        </div>

        {/* Details row */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span style={{ fontSize: '22px', color: '#374151' }}>{dateStr}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ fontSize: '22px', color: '#374151' }}>{location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span style={{ fontSize: '22px', color: '#374151' }}>Led by {operatorName}</span>
          </div>
        </div>

        {/* Highlight tags */}
        {highlights.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {highlights.map((s: string) => (
              <div key={s} style={{
                padding: '6px 16px', borderRadius: '20px',
                background: 'rgba(46, 139, 87, 0.12)',
                border: '1.5px solid rgba(46, 139, 87, 0.25)',
                fontSize: '18px', color: '#2E8B57', fontWeight: 500,
              }}>
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Bottom bar: price + quorum progress */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginTop: 'auto',
        }}>
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '48px', fontWeight: 700, color: '#1A3320' }}>${price}</span>
            <span style={{ fontSize: '22px', color: '#4B5563' }}>per person</span>
          </div>

          {/* Quorum progress */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <span style={{ fontSize: '16px', color: '#4B5563' }}>
              {current}/{threshold} committed
            </span>
            <div style={{
              width: '200px', height: '10px', borderRadius: '5px',
              background: 'rgba(46, 139, 87, 0.15)',
              display: 'flex',
            }}>
              <div style={{
                width: `${progressPct}%`, height: '100%', borderRadius: '5px',
                background: isConfirmed ? '#2E8B57' : '#DAA520',
              }} />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Crimson Pro',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
