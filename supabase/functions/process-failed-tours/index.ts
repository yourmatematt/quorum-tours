// =============================================================================
// Edge Function: Process Failed Tours
// Cancels tours that failed to reach quorum by their commitment deadline
// Refunds deposits and notifies all committed users
// Called via cron job every hour
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.14.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

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
      tours_cancelled: 0,
      users_notified: 0,
      refunds_processed: 0,
      errors: [] as string[],
    }

    // Find tours that:
    // 1. Are still in 'forming' status
    // 2. Have passed their commitment_deadline
    // 3. Haven't reached their threshold
    const { data: failedTours, error: toursError } = await supabase
      .from('tours')
      .select(`
        id,
        title,
        date_start,
        threshold,
        current_participant_count,
        commitment_deadline,
        operators (
          id,
          business_name,
          profiles (email, display_name)
        )
      `)
      .eq('status', 'forming')
      .lt('commitment_deadline', now.toISOString())

    if (toursError) {
      throw new Error(`Failed to fetch tours: ${toursError.message}`)
    }

    for (const tour of failedTours || []) {
      // Double-check tour hasn't reached threshold
      if (tour.current_participant_count >= tour.threshold) {
        console.log(`Tour ${tour.id} actually reached threshold, skipping cancellation`)
        continue
      }

      console.log(`Processing failed tour: ${tour.id} (${tour.title})`)

      // Get all reservations for this tour
      const { data: reservations, error: resError } = await supabase
        .from('reservations')
        .select(`
          id,
          user_id,
          deposit_cents,
          deposit_charged,
          stripe_deposit_charge_id,
          profiles (email, display_name)
        `)
        .eq('tour_id', tour.id)
        .in('status', ['reserved', 'interest'])

      if (resError) {
        results.errors.push(`Failed to get reservations for tour ${tour.id}: ${resError.message}`)
        continue
      }

      // Process each reservation
      for (const reservation of reservations || []) {
        try {
          // Refund deposit if charged
          if (reservation.deposit_charged && reservation.stripe_deposit_charge_id) {
            try {
              const refund = await stripe.refunds.create({
                payment_intent: reservation.stripe_deposit_charge_id,
                reason: 'requested_by_customer',
                metadata: {
                  reservation_id: reservation.id,
                  tour_id: tour.id,
                  reason: 'tour_cancelled_quorum_not_met',
                },
              })

              // Update reservation with refund info
              await supabase
                .from('reservations')
                .update({
                  refund_amount_cents: reservation.deposit_cents,
                  refund_id: refund.id,
                  refunded_at: new Date().toISOString(),
                  status: 'refunded',
                  updated_at: new Date().toISOString(),
                })
                .eq('id', reservation.id)

              results.refunds_processed++
            } catch (stripeErr) {
              console.error(`Stripe refund failed for reservation ${reservation.id}:`, stripeErr)
              results.errors.push(`Refund failed for reservation ${reservation.id}`)

              // Still mark as cancelled even if refund fails (manual reconciliation needed)
              await supabase
                .from('reservations')
                .update({
                  status: 'cancelled',
                  updated_at: new Date().toISOString(),
                  notes: 'Refund failed - manual processing required',
                })
                .eq('id', reservation.id)
            }
          } else {
            // No deposit to refund, just cancel
            await supabase
              .from('reservations')
              .update({
                status: 'cancelled',
                updated_at: new Date().toISOString(),
              })
              .eq('id', reservation.id)
          }

          // Send cancellation email
          const email = reservation.profiles?.email
          if (email) {
            const sent = await sendEmail('tour_cancelled', email, {
              userName: reservation.profiles?.display_name || 'there',
              tourTitle: tour.title,
              tourDate: tour.date_start,
              reason: 'The tour did not reach the minimum number of participants needed to proceed.',
              refundAmount: reservation.deposit_charged ? (reservation.deposit_cents / 100).toFixed(2) : null,
              refundProcessed: reservation.deposit_charged,
              toursUrl: `${APP_URL}/tours`,
              profileUrl: `${APP_URL}/profile`,
            })

            if (sent) {
              results.users_notified++
              await supabase.from('email_log').insert({
                user_id: reservation.user_id,
                email_type: 'tour_cancelled',
                subject: `"${tour.title}" has been cancelled`,
                recipient_email: email,
                status: 'sent',
                sent_at: new Date().toISOString(),
                metadata: {
                  tour_id: tour.id,
                  reservation_id: reservation.id,
                  refund_processed: reservation.deposit_charged,
                }
              })
            }
          }
        } catch (resErr) {
          console.error(`Error processing reservation ${reservation.id}:`, resErr)
          results.errors.push(`Error processing reservation ${reservation.id}`)
        }
      }

      // Update tour status to cancelled
      await supabase
        .from('tours')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          cancellation_reason: 'quorum_not_met',
          updated_at: new Date().toISOString(),
        })
        .eq('id', tour.id)

      results.tours_cancelled++

      // Notify operator
      const operatorEmail = tour.operators?.profiles?.email
      if (operatorEmail) {
        await sendEmail('tour_cancelled', operatorEmail, {
          userName: tour.operators?.profiles?.display_name || tour.operators?.business_name || 'there',
          tourTitle: tour.title,
          tourDate: tour.date_start,
          reason: `The tour only reached ${tour.current_participant_count} of ${tour.threshold} required participants.`,
          isOperator: true,
          participantCount: tour.current_participant_count,
          threshold: tour.threshold,
          dashboardUrl: `${APP_URL}/operator/tours`,
        })
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
    console.error('Process failed tours error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
