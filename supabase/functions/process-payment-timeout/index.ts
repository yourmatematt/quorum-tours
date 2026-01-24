// =============================================================================
// Edge Function: Process Payment Timeout
// Called when 24-hour payment window expires
// Applies strikes, forfeits deposits, offers spots to waitlist
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.14.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

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
    // This function runs via cron or admin trigger
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { tour_id, reservation_id } = await req.json()

    // Can process single reservation or all expired for a tour
    let expiredReservations: any[]

    if (reservation_id) {
      // Process single reservation
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          id,
          user_id,
          tour_id,
          deposit_cents,
          deposit_charged,
          stripe_deposit_charge_id,
          payment_due_at,
          tours (
            id,
            title,
            price_cents,
            operators (
              id,
              stripe_account_id
            )
          ),
          profiles (
            email,
            display_name
          )
        `)
        .eq('id', reservation_id)
        .eq('status', 'payment_pending')
        .single()

      if (error || !data) {
        return new Response(JSON.stringify({ error: 'Reservation not found or not pending' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      expiredReservations = [data]
    } else if (tour_id) {
      // Process all expired reservations for a tour
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          id,
          user_id,
          tour_id,
          deposit_cents,
          deposit_charged,
          stripe_deposit_charge_id,
          payment_due_at,
          tours (
            id,
            title,
            price_cents,
            operators (
              id,
              stripe_account_id
            )
          ),
          profiles (
            email,
            display_name
          )
        `)
        .eq('tour_id', tour_id)
        .eq('status', 'payment_pending')
        .lt('payment_due_at', new Date().toISOString())

      if (error) {
        throw new Error(`Failed to get reservations: ${error.message}`)
      }

      expiredReservations = data || []
    } else {
      // Process ALL expired reservations across all tours (cron job mode)
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          id,
          user_id,
          tour_id,
          deposit_cents,
          deposit_charged,
          stripe_deposit_charge_id,
          payment_due_at,
          tours (
            id,
            title,
            price_cents,
            operators (
              id,
              stripe_account_id
            )
          ),
          profiles (
            email,
            display_name
          )
        `)
        .eq('status', 'payment_pending')
        .lt('payment_due_at', new Date().toISOString())

      if (error) {
        throw new Error(`Failed to get reservations: ${error.message}`)
      }

      expiredReservations = data || []
    }

    const results = []

    for (const reservation of expiredReservations) {
      try {
        const result = await processExpiredReservation(supabase, reservation)
        results.push(result)
      } catch (err) {
        console.error(`Error processing reservation ${reservation.id}:`, err)
        results.push({
          reservation_id: reservation.id,
          error: err.message,
        })
      }
    }

    return new Response(JSON.stringify({
      processed: results.length,
      results: results,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Process timeout error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

/**
 * Process a single expired reservation
 */
async function processExpiredReservation(supabase: any, reservation: any) {
  const tourId = reservation.tour_id
  const userId = reservation.user_id
  const operatorStripeId = reservation.tours?.operators?.stripe_account_id

  // 1. Mark reservation as abandoned
  await supabase
    .from('reservations')
    .update({
      status: 'abandoned',
      updated_at: new Date().toISOString(),
    })
    .eq('id', reservation.id)

  // 2. Apply strike to user
  const { data: newStrikeCount } = await supabase
    .rpc('apply_payment_timeout_strike', {
      p_user_id: userId,
      p_reservation_id: reservation.id,
    })

  // 3. Forfeit deposit (if any was charged)
  let forfeitTransferId = null
  if (reservation.deposit_charged && reservation.deposit_cents > 0) {
    // Mark deposit as forfeited
    await supabase
      .from('reservations')
      .update({
        deposit_forfeited: true,
        deposit_forfeited_at: new Date().toISOString(),
      })
      .eq('id', reservation.id)

    // Transfer forfeited deposit to operator (minus 3% commission)
    if (operatorStripeId) {
      const payoutAmount = Math.round(reservation.deposit_cents * 0.97)

      try {
        const transfer = await stripe.transfers.create({
          amount: payoutAmount,
          currency: 'aud',
          destination: operatorStripeId,
          metadata: {
            reservation_id: reservation.id,
            type: 'forfeit',
            original_deposit: reservation.deposit_cents,
            platform_fee: reservation.deposit_cents - payoutAmount,
          },
        })

        forfeitTransferId = transfer.id

        await supabase
          .from('reservations')
          .update({
            forfeit_transferred: true,
            forfeit_transfer_id: transfer.id,
          })
          .eq('id', reservation.id)

      } catch (stripeErr) {
        console.error('Stripe transfer failed:', stripeErr)
        // Log for manual reconciliation
      }
    }
  }

  // 4. Send notification email about strike
  await supabase.from('email_log').insert({
    user_id: userId,
    email_type: 'strike_applied',
    subject: `Payment deadline missed - Strike applied to your account`,
    recipient_email: reservation.profiles?.email,
    status: 'sent',
    metadata: {
      tour_id: tourId,
      reservation_id: reservation.id,
      new_strike_count: newStrikeCount,
      deposit_forfeited: reservation.deposit_charged,
    }
  })

  // 5. Offer spot to next waitlist person
  await offerSpotToWaitlist(supabase, tourId)

  // 6. Update tour participant count (trigger should handle this)
  // The denormalized count trigger should automatically decrement

  return {
    reservation_id: reservation.id,
    user_id: userId,
    new_strike_count: newStrikeCount,
    deposit_forfeited: reservation.deposit_charged,
    forfeit_transfer_id: forfeitTransferId,
    waitlist_notified: true,
  }
}

/**
 * Offer the freed spot to the next person on waitlist
 */
async function offerSpotToWaitlist(supabase: any, tourId: string) {
  // Get next waitlist entry
  const { data: nextInLine, error } = await supabase
    .from('waitlist')
    .select(`
      id,
      user_id,
      position,
      profiles (
        email,
        display_name
      )
    `)
    .eq('tour_id', tourId)
    .order('position', { ascending: true })
    .limit(1)
    .single()

  if (error || !nextInLine) {
    console.log('No one on waitlist for tour', tourId)
    return
  }

  // Get tour details
  const { data: tour } = await supabase
    .from('tours')
    .select('title, price_cents, deposit_cents')
    .eq('id', tourId)
    .single()

  // Calculate payment deadline for waitlist user
  const paymentDeadline = new Date()
  paymentDeadline.setHours(paymentDeadline.getHours() + PAYMENT_WINDOW_HOURS)

  // Create reservation for waitlist user
  const { data: newReservation } = await supabase
    .from('reservations')
    .insert({
      user_id: nextInLine.user_id,
      tour_id: tourId,
      status: 'payment_pending',
      payment_due_at: paymentDeadline.toISOString(),
      guest_count: 1,
    })
    .select()
    .single()

  // Remove from waitlist
  await supabase
    .from('waitlist')
    .delete()
    .eq('id', nextInLine.id)

  // Send email to waitlist user
  await supabase.from('email_log').insert({
    user_id: nextInLine.user_id,
    email_type: 'waitlist_spot_available',
    subject: `A spot opened up! "${tour.title}" - Complete your payment`,
    recipient_email: nextInLine.profiles?.email,
    status: 'sent',
    metadata: {
      tour_id: tourId,
      reservation_id: newReservation?.id,
      payment_deadline: paymentDeadline.toISOString(),
      price_cents: tour.price_cents,
    }
  })

  console.log(`Offered spot to waitlist user ${nextInLine.user_id} for tour ${tourId}`)
}
