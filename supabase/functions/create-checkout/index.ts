// =============================================================================
// Edge Function: Create Checkout Session
// Creates Stripe checkout for deposits or full payments
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.14.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get user from JWT
    const authHeader = req.headers.get('Authorization')!
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Parse request body
    const { tour_id, payment_type } = await req.json()
    // payment_type: 'deposit' (on commit) or 'balance' (after quorum)

    if (!tour_id) {
      return new Response(JSON.stringify({ error: 'tour_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Use service role for database operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get user trust status
    const { data: trustStatus } = await supabaseAdmin
      .rpc('get_user_trust_status', { p_user_id: user.id })

    if (!trustStatus.can_book) {
      return new Response(JSON.stringify({
        error: 'Account suspended',
        message: 'Your account is suspended. Please contact support to appeal.'
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get tour details
    const { data: tour, error: tourError } = await supabaseAdmin
      .from('tours')
      .select(`
        id,
        title,
        price_cents,
        deposit_cents,
        status,
        operators (
          id,
          business_name,
          stripe_account_id
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

    // Get or create reservation
    let reservation = await getOrCreateReservation(supabaseAdmin, user.id, tour_id)

    // Calculate amount based on payment type and trust status
    let amountCents: number
    let description: string

    if (payment_type === 'balance') {
      // After quorum - pay remaining balance
      const depositPaid = reservation.deposit_charged ? reservation.deposit_cents : 0
      amountCents = tour.price_cents - depositPaid
      description = `Balance payment for ${tour.title}`
    } else {
      // On commit - calculate deposit based on trust tier
      const { data: requiredDeposit } = await supabaseAdmin
        .rpc('calculate_required_deposit', {
          p_user_id: user.id,
          p_tour_id: tour_id
        })

      if (requiredDeposit === 0) {
        // Trusted user - no deposit, just create reservation
        await supabaseAdmin
          .from('reservations')
          .update({
            status: 'reserved',
            deposit_cents: 0,
            updated_at: new Date().toISOString(),
          })
          .eq('id', reservation.id)

        return new Response(JSON.stringify({
          success: true,
          no_payment_required: true,
          message: 'You are a trusted member. No deposit required.',
          reservation_id: reservation.id,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      amountCents = requiredDeposit
      description = `Deposit for ${tour.title}`

      // Update reservation with deposit amount
      await supabaseAdmin
        .from('reservations')
        .update({
          deposit_cents: amountCents,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reservation.id)
    }

    // Get user profile for Stripe customer
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('email, display_name')
      .eq('id', user.id)
      .single()

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: profile?.email || user.email,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: tour.title,
              description: description,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        reservation_id: reservation.id,
        tour_id: tour_id,
        user_id: user.id,
        payment_type: payment_type || 'deposit',
      },
      success_url: `${Deno.env.get('SITE_URL')}/tours/${tour_id}/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('SITE_URL')}/tours/${tour_id}`,
      // For Connect: transfer to operator after successful payment
      // payment_intent_data: {
      //   transfer_data: {
      //     destination: tour.operators.stripe_account_id,
      //   },
      // },
    })

    return new Response(JSON.stringify({
      checkout_url: session.url,
      session_id: session.id,
      reservation_id: reservation.id,
      amount_cents: amountCents,
      trust_tier: trustStatus.trust_tier,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Create checkout error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

/**
 * Get existing reservation or create new one
 */
async function getOrCreateReservation(
  supabase: any,
  userId: string,
  tourId: string
) {
  // Check for existing reservation
  const { data: existing } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .eq('tour_id', tourId)
    .not('status', 'in', '("cancelled","refunded","abandoned")')
    .single()

  if (existing) {
    return existing
  }

  // Create new reservation
  const { data: newReservation, error } = await supabase
    .from('reservations')
    .insert({
      user_id: userId,
      tour_id: tourId,
      status: 'interest',
      guest_count: 1,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create reservation: ${error.message}`)
  }

  return newReservation
}
