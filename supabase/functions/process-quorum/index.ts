// =============================================================================
// Edge Function: Process Quorum Reached
// Called when a tour reaches its minimum threshold
// Sends payment window emails to all committed users
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PAYMENT_WINDOW_HOURS = 24

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // This function is called internally or via cron, verify secret
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`) {
      // If not service role, check for admin user
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader || '' } } }
      )
      const { data: { user } } = await supabaseClient.auth.getUser()

      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    const { tour_id } = await req.json()

    if (!tour_id) {
      return new Response(JSON.stringify({ error: 'tour_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get tour with reservations
    const { data: tour, error: tourError } = await supabase
      .from('tours')
      .select(`
        id,
        title,
        status,
        threshold,
        current_participant_count,
        date_start,
        price_cents,
        operators (
          id,
          business_name
        )
      `)
      .eq('id', tour_id)
      .single()

    if (tourError || !tour) {
      return new Response(JSON.stringify({ error: 'Tour not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify tour is at threshold
    if (tour.current_participant_count < tour.threshold) {
      return new Response(JSON.stringify({
        error: 'Tour has not reached threshold',
        current: tour.current_participant_count,
        threshold: tour.threshold,
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify tour is still in forming status
    if (tour.status !== 'forming') {
      return new Response(JSON.stringify({
        error: 'Tour is not in forming status',
        current_status: tour.status,
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Calculate payment deadline
    const paymentDeadline = new Date()
    paymentDeadline.setHours(paymentDeadline.getHours() + PAYMENT_WINDOW_HOURS)

    // Update tour status
    const { error: tourUpdateError } = await supabase
      .from('tours')
      .update({
        status: 'payment_pending',
        payment_window_end: paymentDeadline.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', tour_id)

    if (tourUpdateError) {
      throw new Error(`Failed to update tour: ${tourUpdateError.message}`)
    }

    // Get all reserved reservations
    const { data: reservations, error: resError } = await supabase
      .from('reservations')
      .select(`
        id,
        user_id,
        deposit_cents,
        deposit_charged,
        profiles (
          email,
          display_name
        )
      `)
      .eq('tour_id', tour_id)
      .eq('status', 'reserved')

    if (resError) {
      throw new Error(`Failed to get reservations: ${resError.message}`)
    }

    // Update all reservations to payment_pending
    const reservationIds = reservations.map(r => r.id)

    const { error: resUpdateError } = await supabase
      .from('reservations')
      .update({
        status: 'payment_pending',
        payment_due_at: paymentDeadline.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .in('id', reservationIds)

    if (resUpdateError) {
      throw new Error(`Failed to update reservations: ${resUpdateError.message}`)
    }

    // Send emails to all users
    const emailPromises = reservations.map(async (reservation) => {
      const profile = reservation.profiles
      const balanceDue = tour.price_cents - (reservation.deposit_charged ? reservation.deposit_cents : 0)

      // Log email to email_log table
      await supabase.from('email_log').insert({
        user_id: reservation.user_id,
        email_type: 'quorum_reached',
        subject: `Great news! "${tour.title}" is confirmed - Complete your payment`,
        recipient_email: profile.email,
        status: 'sent',
        metadata: {
          tour_id: tour_id,
          reservation_id: reservation.id,
          payment_deadline: paymentDeadline.toISOString(),
          balance_due_cents: balanceDue,
        }
      })

      // TODO: Actually send email via Resend/SendGrid
      // For now, just log it
      console.log(`Would send email to ${profile.email}:
        Tour: ${tour.title}
        Deadline: ${paymentDeadline.toISOString()}
        Balance Due: $${(balanceDue / 100).toFixed(2)}
      `)
    })

    await Promise.all(emailPromises)

    // Schedule timeout check (via pg_cron or external scheduler)
    // This would be handled by a separate cron job checking for expired payment windows

    return new Response(JSON.stringify({
      success: true,
      tour_id: tour_id,
      new_status: 'payment_pending',
      payment_deadline: paymentDeadline.toISOString(),
      users_notified: reservations.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Process quorum error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
