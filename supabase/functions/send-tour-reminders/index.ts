// =============================================================================
// Edge Function: Send Tour Reminders
// Sends reminder emails 7 days and 1 day before tour start
// Called via cron job daily at 9am
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const APP_URL = Deno.env.get('APP_URL') || 'https://quorumtours.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Send email via the send-email edge function
 */
async function sendEmail(
  template: string,
  to: string,
  data: Record<string, unknown>
): Promise<boolean> {
  try {
    const response = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template, to, data }),
      }
    )
    if (!response.ok) {
      console.error(`Failed to send ${template} email to ${to}:`, await response.text())
      return false
    }
    return true
  } catch (err) {
    console.error(`Email send error for ${template}:`, err)
    return false
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Verify this is called by service role or cron
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const now = new Date()
    const results = {
      seven_day_reminders: 0,
      one_day_reminders: 0,
      payment_reminders: 0,
      errors: [] as string[],
    }

    // Calculate date ranges
    const sevenDaysFromNow = new Date(now)
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
    const sevenDayStart = new Date(sevenDaysFromNow)
    sevenDayStart.setHours(0, 0, 0, 0)
    const sevenDayEnd = new Date(sevenDaysFromNow)
    sevenDayEnd.setHours(23, 59, 59, 999)

    const oneDayFromNow = new Date(now)
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1)
    const oneDayStart = new Date(oneDayFromNow)
    oneDayStart.setHours(0, 0, 0, 0)
    const oneDayEnd = new Date(oneDayFromNow)
    oneDayEnd.setHours(23, 59, 59, 999)

    // Get confirmed tours starting in 7 days
    const { data: sevenDayTours } = await supabase
      .from('tours')
      .select(`
        id,
        title,
        date_start,
        location,
        meeting_point,
        operators (business_name)
      `)
      .eq('status', 'confirmed')
      .gte('date_start', sevenDayStart.toISOString())
      .lte('date_start', sevenDayEnd.toISOString())

    // Get confirmed tours starting tomorrow
    const { data: oneDayTours } = await supabase
      .from('tours')
      .select(`
        id,
        title,
        date_start,
        location,
        meeting_point,
        operators (business_name)
      `)
      .eq('status', 'confirmed')
      .gte('date_start', oneDayStart.toISOString())
      .lte('date_start', oneDayEnd.toISOString())

    // Send 7-day reminders
    for (const tour of sevenDayTours || []) {
      // Check if we already sent 7-day reminder for this tour
      const { data: existingReminder } = await supabase
        .from('email_log')
        .select('id')
        .eq('email_type', 'tour_reminder_7day')
        .eq('metadata->tour_id', tour.id)
        .limit(1)
        .single()

      if (existingReminder) {
        continue // Already sent
      }

      // Get confirmed reservations for this tour
      const { data: reservations } = await supabase
        .from('reservations')
        .select(`
          id,
          user_id,
          profiles (email, display_name)
        `)
        .eq('tour_id', tour.id)
        .eq('status', 'confirmed')

      for (const reservation of reservations || []) {
        const email = reservation.profiles?.email
        if (!email) continue

        const sent = await sendEmail('tour_reminder', email, {
          userName: reservation.profiles?.display_name || 'there',
          tourTitle: tour.title,
          tourDate: tour.date_start,
          tourLocation: tour.location || 'See tour details',
          meetingPoint: tour.meeting_point || 'To be confirmed',
          operatorName: tour.operators?.business_name || 'your guide',
          daysUntil: 7,
          tourUrl: `${APP_URL}/tours/${tour.id}`,
          profileUrl: `${APP_URL}/profile`,
        })

        if (sent) {
          results.seven_day_reminders++
          await supabase.from('email_log').insert({
            user_id: reservation.user_id,
            email_type: 'tour_reminder_7day',
            subject: `7 days until "${tour.title}" - Get ready!`,
            recipient_email: email,
            status: 'sent',
            sent_at: new Date().toISOString(),
            metadata: {
              tour_id: tour.id,
              reservation_id: reservation.id,
              days_until: 7,
            }
          })
        } else {
          results.errors.push(`Failed 7-day reminder for ${email} (tour: ${tour.id})`)
        }
      }
    }

    // Send 1-day reminders
    for (const tour of oneDayTours || []) {
      // Check if we already sent 1-day reminder for this tour
      const { data: existingReminder } = await supabase
        .from('email_log')
        .select('id')
        .eq('email_type', 'tour_reminder_1day')
        .eq('metadata->tour_id', tour.id)
        .limit(1)
        .single()

      if (existingReminder) {
        continue // Already sent
      }

      // Get confirmed reservations for this tour
      const { data: reservations } = await supabase
        .from('reservations')
        .select(`
          id,
          user_id,
          profiles (email, display_name)
        `)
        .eq('tour_id', tour.id)
        .eq('status', 'confirmed')

      for (const reservation of reservations || []) {
        const email = reservation.profiles?.email
        if (!email) continue

        const sent = await sendEmail('tour_reminder', email, {
          userName: reservation.profiles?.display_name || 'there',
          tourTitle: tour.title,
          tourDate: tour.date_start,
          tourLocation: tour.location || 'See tour details',
          meetingPoint: tour.meeting_point || 'To be confirmed',
          operatorName: tour.operators?.business_name || 'your guide',
          daysUntil: 1,
          tourUrl: `${APP_URL}/tours/${tour.id}`,
          profileUrl: `${APP_URL}/profile`,
        })

        if (sent) {
          results.one_day_reminders++
          await supabase.from('email_log').insert({
            user_id: reservation.user_id,
            email_type: 'tour_reminder_1day',
            subject: `Tomorrow: "${tour.title}" - Final details`,
            recipient_email: email,
            status: 'sent',
            sent_at: new Date().toISOString(),
            metadata: {
              tour_id: tour.id,
              reservation_id: reservation.id,
              days_until: 1,
            }
          })
        } else {
          results.errors.push(`Failed 1-day reminder for ${email} (tour: ${tour.id})`)
        }
      }
    }

    // =======================================================================
    // PAYMENT REMINDERS (6 hours before 24-hour deadline expires)
    // =======================================================================

    // Find reservations with payment_due_at between 5 and 7 hours from now
    // This gives a window to catch the 6-hour mark even if cron runs at odd times
    const sixHoursFromNow = new Date(now)
    sixHoursFromNow.setHours(sixHoursFromNow.getHours() + 6)
    const fiveHoursFromNow = new Date(now)
    fiveHoursFromNow.setHours(fiveHoursFromNow.getHours() + 5)
    const sevenHoursFromNow = new Date(now)
    sevenHoursFromNow.setHours(sevenHoursFromNow.getHours() + 7)

    const { data: pendingPayments } = await supabase
      .from('reservations')
      .select(`
        id,
        user_id,
        tour_id,
        payment_due_at,
        balance_cents,
        tours (
          id,
          title,
          slug,
          price_cents,
          deposit_cents
        ),
        profiles (
          email,
          display_name
        )
      `)
      .eq('status', 'payment_pending')
      .gte('payment_due_at', fiveHoursFromNow.toISOString())
      .lte('payment_due_at', sevenHoursFromNow.toISOString())

    for (const reservation of pendingPayments || []) {
      const email = reservation.profiles?.email
      if (!email) continue

      // Check if we already sent a payment reminder for this reservation
      const { data: existingReminder } = await supabase
        .from('email_log')
        .select('id')
        .eq('email_type', 'payment_reminder')
        .eq('reservation_id', reservation.id)
        .limit(1)
        .single()

      if (existingReminder) {
        continue // Already sent
      }

      const hoursRemaining = Math.round(
        (new Date(reservation.payment_due_at).getTime() - now.getTime()) / (1000 * 60 * 60)
      )

      const sent = await sendEmail('payment_reminder', email, {
        userName: reservation.profiles?.display_name || 'there',
        tourTitle: reservation.tours?.title || 'your tour',
        hoursRemaining,
        deadlineTime: new Date(reservation.payment_due_at).toLocaleString('en-AU', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        amountDue: ((reservation.balance_cents || reservation.tours?.price_cents || 0) / 100).toFixed(2),
        paymentUrl: `${APP_URL}/tours/${reservation.tours?.slug || reservation.tour_id}/join/payment?type=full`,
        profileUrl: `${APP_URL}/profile`,
      })

      if (sent) {
        results.payment_reminders++
        await supabase.from('email_log').insert({
          user_id: reservation.user_id,
          reservation_id: reservation.id,
          tour_id: reservation.tour_id,
          email_type: 'payment_reminder',
          subject: `Payment reminder: ${hoursRemaining} hours left for "${reservation.tours?.title}"`,
          recipient_email: email,
          status: 'sent',
          sent_at: new Date().toISOString(),
          metadata: {
            hours_remaining: hoursRemaining,
            payment_due_at: reservation.payment_due_at,
            amount_due_cents: reservation.balance_cents || reservation.tours?.price_cents,
          }
        })
      } else {
        results.errors.push(`Failed payment reminder for ${email} (reservation: ${reservation.id})`)
      }
    }

    return new Response(JSON.stringify({
      success: true,
      ...results,
      processed_at: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Send tour reminders error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
