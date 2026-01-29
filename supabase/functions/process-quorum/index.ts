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

    const { tour_id, exclude_user_id } = await req.json()

    if (!tour_id) {
      return new Response(JSON.stringify({ error: 'tour_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // exclude_user_id is optional - used to avoid double-emailing the user who triggered quorum

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get tour with reservations and operator profile
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
          business_name,
          profiles (
            email,
            display_name
          )
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

    // Get all reserved reservations (optionally excluding the user who just triggered quorum)
    let reservationsQuery = supabase
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

    // Exclude the user who triggered quorum if provided (they already got their email)
    if (exclude_user_id) {
      reservationsQuery = reservationsQuery.neq('user_id', exclude_user_id)
    }

    const { data: reservations, error: resError } = await reservationsQuery

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
        status: 'pending',
        metadata: {
          tour_id: tour_id,
          reservation_id: reservation.id,
          payment_deadline: paymentDeadline.toISOString(),
          balance_due_cents: balanceDue,
        }
      })

      // Send email via send-email edge function
      try {
        const emailResponse = await fetch(
          `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              template: 'quorum_reached',
              to: profile.email,
              data: {
                userName: profile.display_name || 'there',
                tourTitle: tour.title,
                tourDate: tour.date_start,
                operatorName: tour.operators?.business_name || 'your guide',
                paymentDeadline: paymentDeadline.toISOString(),
                balanceDueCents: balanceDue,
                paymentUrl: `${Deno.env.get('APP_URL') || 'https://quorumtours.com'}/tours/${tour_id}/pay`,
              },
            }),
          }
        )

        if (emailResponse.ok) {
          // Update email log status
          await supabase.from('email_log')
            .update({ status: 'sent', sent_at: new Date().toISOString() })
            .eq('user_id', reservation.user_id)
            .eq('email_type', 'quorum_reached')
            .eq('metadata->reservation_id', reservation.id)
        } else {
          console.error(`Failed to send email to ${profile.email}:`, await emailResponse.text())
        }
      } catch (emailErr) {
        console.error(`Email send error for ${profile.email}:`, emailErr)
      }
    })

    await Promise.all(emailPromises)

    // Send notification to operator
    const operatorEmail = tour.operators?.profiles?.email
    if (operatorEmail) {
      try {
        await fetch(
          `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              template: 'quorum_reached_operator',
              to: operatorEmail,
              data: {
                operatorName: tour.operators?.profiles?.display_name || tour.operators?.business_name || 'there',
                tourTitle: tour.title,
                tourDate: tour.date_start,
                participantCount: reservations.length,
                paymentDeadline: paymentDeadline.toISOString(),
                expectedRevenue: ((tour.price_cents * reservations.length) / 100).toFixed(2),
                dashboardUrl: `${Deno.env.get('APP_URL') || 'https://quorumtours.com'}/operator/tours`,
              },
            }),
          }
        )
      } catch (opEmailErr) {
        console.error('Failed to send operator notification:', opEmailErr)
      }
    }

    // Schedule timeout check (via pg_cron or external scheduler)
    // This would be handled by a separate cron job checking for expired payment windows

    return new Response(JSON.stringify({
      success: true,
      tour_id: tour_id,
      new_status: 'payment_pending',
      payment_deadline: paymentDeadline.toISOString(),
      users_notified: reservations.length,
      operator_notified: !!operatorEmail,
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
