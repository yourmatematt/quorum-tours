// =============================================================================
// Edge Function: Stripe Connect Onboarding
// Creates Connect account and returns onboarding link for operators
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

    const { operator_id, refresh } = await req.json()

    if (!operator_id) {
      return new Response(JSON.stringify({ error: 'operator_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Verify user is operator admin
    const { data: isAdmin } = await supabaseAdmin
      .rpc('is_operator_admin', { op_id: operator_id })

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Not authorized for this operator' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get operator details
    const { data: operator, error: opError } = await supabaseAdmin
      .from('operators')
      .select('*')
      .eq('id', operator_id)
      .single()

    if (opError || !operator) {
      return new Response(JSON.stringify({ error: 'Operator not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let stripeAccountId = operator.stripe_account_id

    // Create Connect account if doesn't exist
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'AU',
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: 'individual', // or 'company'
        metadata: {
          operator_id: operator_id,
          quorum_tours: 'true',
        },
      })

      stripeAccountId = account.id

      // Save to database
      await supabaseAdmin
        .from('operators')
        .update({
          stripe_account_id: stripeAccountId,
          stripe_onboarding_started_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', operator_id)
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${Deno.env.get('SITE_URL')}/operator/profile?stripe=refresh`,
      return_url: `${Deno.env.get('SITE_URL')}/operator/profile?stripe=complete`,
      type: 'account_onboarding',
    })

    return new Response(JSON.stringify({
      url: accountLink.url,
      account_id: stripeAccountId,
      expires_at: accountLink.expires_at,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('Stripe Connect error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
