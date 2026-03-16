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
      title,
      date_start,
      date_end,
      current_participant_count,
      threshold,
      status,
      og_image_url,
      booking_deadline,
      operator:operators(name, base_location)
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

  const operator = tour.operator as unknown as { name: string; base_location: string | null } | null;
  const location = operator?.base_location || 'Australia';
  const operatorName = operator?.name || 'Tour Operator';
  const operatorInitials = operatorName.charAt(0).toUpperCase();
  const current = tour.current_participant_count || 0;
  const threshold = tour.threshold || 1;
  const progressPct = Math.min(100, Math.round((current / threshold) * 100));
  const isConfirmed = tour.status === 'confirmed' || current >= threshold;

  const startDate = new Date(tour.date_start);
  const endDate = new Date(tour.date_end);
  const dateStr = startDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  const durationDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const durationStr = durationDays === 1 ? '1 day' : `${durationDays} days`;

  let commitByStr = '';
  if (tour.booking_deadline) {
    const deadline = new Date(tour.booking_deadline);
    commitByStr = `Commit by ${deadline.getDate()} ${deadline.toLocaleDateString('en-AU', { month: 'long' })}`;
  }

  const { font400, font700 } = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#1a3320',
          fontFamily: 'Crimson Pro, Georgia, serif',
        }}
      >
        {/* LEFT COLUMN */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            height: '100%',
            padding: '38px 42px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <div style={{
              width: '22px', height: '22px', borderRadius: '4px',
              background: '#2e8b57', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '13px', fontWeight: 700,
            }}>Q</div>
            <span style={{
              fontSize: '13px', color: '#a0c8a8', fontWeight: 400,
              letterSpacing: '0.08em',
            }}>QUORUM TOURS</span>
          </div>

          {/* Tour name label + headline */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
            <span style={{
              fontSize: '11px', color: '#a0c8a8',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: '8px', fontWeight: 400,
            }}>Tour</span>
            <span style={{
              fontSize: '36px', fontWeight: 400, color: '#f0fff4',
              lineHeight: 1.15,
            }}>
              {tour.title}
            </span>
          </div>

          {/* Operator row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: '#2e8b57', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '12px', fontWeight: 700,
            }}>{operatorInitials}</div>
            <span style={{ fontSize: '13px', color: '#a0c8a8' }}>
              {operatorName} · {location}
            </span>
          </div>

          {/* Pills row */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: 'auto', flexWrap: 'wrap' }}>
            {/* Date pill */}
            <div style={{
              padding: '4px 14px', borderRadius: '20px',
              background: '#2e8b57',
              fontSize: '12px', color: '#f0fff4', fontWeight: 500,
            }}>
              {dateStr}
            </div>
            {/* Duration pill */}
            <div style={{
              padding: '4px 14px', borderRadius: '20px',
              background: 'transparent',
              border: '1px solid #4a7a5a',
              fontSize: '12px', color: '#a0c8a8', fontWeight: 500,
            }}>
              {durationStr}
            </div>
            {/* Location pill */}
            <div style={{
              padding: '4px 14px', borderRadius: '20px',
              background: 'transparent',
              border: '1px solid #4a7a5a',
              fontSize: '12px', color: '#a0c8a8', fontWeight: 500,
            }}>
              {location}
            </div>
          </div>

          {/* Bottom: progress bar + commit by */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Progress bar track */}
            <div style={{
              flex: 1, height: '4px', borderRadius: '2px',
              background: '#2d5a3d',
              display: 'flex',
            }}>
              <div style={{
                width: `${progressPct}%`, height: '100%', borderRadius: '2px',
                background: isConfirmed ? '#2e8b57' : '#daa520',
              }} />
            </div>
            {/* Commit by text */}
            {commitByStr && (
              <span style={{
                fontSize: '12px', color: '#daa520', fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                {commitByStr}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN — tour image */}
        <div style={{
          display: 'flex',
          width: '40%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {tour.og_image_url ? (
            <img
              src={tour.og_image_url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: '#2d5a3d',
              display: 'flex',
            }} />
          )}
          {/* Gradient overlay fading left */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: '100%',
            background: 'linear-gradient(to right, #1a3320 0%, transparent 100%)',
            display: 'flex',
          }} />
        </div>
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
