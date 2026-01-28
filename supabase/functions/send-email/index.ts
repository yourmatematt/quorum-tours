// =============================================================================
// SEND-EMAIL EDGE FUNCTION - Quorum Tours Transactional Emails via Resend
// =============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// Import all email templates
import { welcomeEmail } from './templates/welcome.ts'
import { tourCommittedEmail } from './templates/tour-committed.ts'
import { quorumReachedEmail } from './templates/quorum-reached.ts'
import { paymentReminderEmail } from './templates/payment-reminder.ts'
import { paymentConfirmedEmail } from './templates/payment-confirmed.ts'
import { strikeAppliedEmail } from './templates/strike-applied.ts'
import { waitlistSpotEmail } from './templates/waitlist-spot.ts'
import { tourCancelledEmail } from './templates/tour-cancelled.ts'
import { tourReminderEmail } from './templates/tour-reminder.ts'
import { newBookingEmail } from './templates/new-booking.ts'
import { quorumReachedOperatorEmail } from './templates/quorum-reached-operator.ts'
import { depositForfeitedEmail } from './templates/deposit-forfeited.ts'
import { tourConfirmedEmail } from './templates/tour-confirmed.ts'
import { payoutSentEmail } from './templates/payout-sent.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') || 'Quorum Tours <tours@quorumtours.com>'

// Template registry
const templates: Record<string, (data: Record<string, unknown>) => { subject: string; html: string }> = {
  welcome: welcomeEmail,
  tour_committed: tourCommittedEmail,
  quorum_reached: quorumReachedEmail,
  payment_reminder: paymentReminderEmail,
  payment_confirmed: paymentConfirmedEmail,
  strike_applied: strikeAppliedEmail,
  waitlist_spot: waitlistSpotEmail,
  tour_cancelled: tourCancelledEmail,
  tour_reminder: tourReminderEmail,
  new_booking: newBookingEmail,
  quorum_reached_operator: quorumReachedOperatorEmail,
  deposit_forfeited: depositForfeitedEmail,
  tour_confirmed: tourConfirmedEmail,
  payout_sent: payoutSentEmail,
}

interface EmailRequest {
  template: string
  to: string
  data: Record<string, unknown>
  replyTo?: string
}

serve(async (req: Request) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const { template, to, data, replyTo }: EmailRequest = await req.json()

    // Validate template exists
    if (!templates[template]) {
      throw new Error(`Unknown email template: ${template}`)
    }

    // Generate email content
    const { subject, html } = templates[template](data)

    // Send via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text()
      throw new Error(`Resend API error: ${error}`)
    }

    const result = await resendResponse.json()

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      { headers, status: 200 }
    )

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Send email error:', message)

    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers, status: 500 }
    )
  }
})
