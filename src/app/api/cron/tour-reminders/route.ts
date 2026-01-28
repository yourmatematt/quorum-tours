// =============================================================================
// Vercel Cron: Tour Reminders
// Schedule: Daily at 9:00 AM AEST (23:00 UTC)
// =============================================================================

import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Verify cron secret (Vercel adds this header for cron jobs)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Call Supabase Edge Function
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-tour-reminders`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Tour reminders failed:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    const result = await response.json()
    console.log('Tour reminders result:', result)

    return NextResponse.json({
      success: true,
      ...result,
      executed_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Tour reminders cron error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
