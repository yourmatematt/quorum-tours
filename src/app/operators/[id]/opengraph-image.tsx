import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const alt = 'Operator profile';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const { data: operator } = await supabase
    .from('operators')
    .select(`
      name,
      tagline,
      base_location,
      logo_url,
      specialties,
      tours_completed,
      guests_served,
      established_year,
      is_verified,
      is_founding_operator
    `)
    .eq(isUuid ? 'id' : 'slug', id)
    .single();

  if (!operator) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#F0FFF4', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 48, color: '#1A3320' }}>Operator not found</span>
        </div>
      ),
      { ...size }
    );
  }

  const location = operator.base_location || 'Australia';
  const specialties = (operator.specialties || []).slice(0, 5);
  const currentYear = new Date().getFullYear();
  const yearsExp = operator.established_year ? currentYear - operator.established_year : null;

  // Fetch Crimson Pro font
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ.woff2'
  ).then(res => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #F0FFF4 0%, #e6f9ea 50%, #d4f0dc 100%)',
          padding: '48px 56px',
          fontFamily: 'Crimson Pro, Georgia, serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#2E8B57', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '20px', fontWeight: 700,
            }}>Q</div>
            <span style={{ fontSize: '20px', color: '#4a7a5a', fontWeight: 500 }}>quorumtours.com</span>
          </div>
          {operator.is_verified && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px', borderRadius: '24px',
              background: '#2E8B57', color: 'white',
              fontSize: '18px', fontWeight: 600,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verified Operator
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', gap: '40px', flex: 1 }}>
          {/* Logo */}
          {operator.logo_url ? (
            <div style={{
              width: '160px', height: '160px', borderRadius: '20px',
              overflow: 'hidden', flexShrink: 0,
              border: '3px solid rgba(46, 139, 87, 0.2)',
              display: 'flex',
            }}>
              <img
                src={operator.logo_url}
                width={160}
                height={160}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div style={{
              width: '160px', height: '160px', borderRadius: '20px',
              background: 'rgba(46, 139, 87, 0.1)',
              border: '3px solid rgba(46, 139, 87, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '64px', color: '#2E8B57', fontWeight: 700,
              flexShrink: 0,
            }}>
              {operator.name.charAt(0)}
            </div>
          )}

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Name */}
            <div style={{
              fontSize: '56px', fontWeight: 700, color: '#1A3320',
              lineHeight: 1.1, marginBottom: '12px',
              display: 'flex',
            }}>
              {operator.name}
            </div>

            {/* Tagline */}
            {operator.tagline && (
              <div style={{
                fontSize: '26px', color: '#2d5a3d', fontStyle: 'italic',
                marginBottom: '20px', display: 'flex',
              }}>
                {operator.tagline}
              </div>
            )}

            {/* Location + experience */}
            <div style={{ display: 'flex', gap: '28px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontSize: '22px', color: '#2d5a3d' }}>{location}</span>
              </div>
              {yearsExp && yearsExp > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span style={{ fontSize: '22px', color: '#2d5a3d' }}>{yearsExp} years experience</span>
                </div>
              )}
              {operator.tours_completed && operator.tours_completed > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: '22px', color: '#2d5a3d' }}>{operator.tours_completed} tours completed</span>
                </div>
              ) : null}
            </div>

            {/* Specialties */}
            {specialties.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {specialties.map((s: string) => (
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
          </div>
        </div>

        {/* Founding operator badge */}
        {operator.is_founding_operator && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginTop: '20px',
            fontSize: '18px', color: '#DAA520', fontWeight: 600,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#DAA520" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Founding Operator
          </div>
        )}
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
