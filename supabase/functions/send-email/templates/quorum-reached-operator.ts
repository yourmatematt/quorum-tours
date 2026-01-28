// =============================================================================
// QUORUM REACHED OPERATOR EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, primaryButton, highlightBox } from './_base.ts'

interface QuorumReachedOperatorData {
  operatorName: string
  tourName: string
  tourDate: string
  currentCommits: number
  participantsUrl: string
  tourRevenue: number
  commissionAmount: number
  yourEarnings: number
  dashboardUrl: string
}

export function quorumReachedOperatorEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    operatorName,
    tourName,
    tourDate,
    currentCommits,
    participantsUrl,
    tourRevenue,
    commissionAmount,
    yourEarnings,
    dashboardUrl,
  } = data as unknown as QuorumReachedOperatorData

  const subject = `Quorum Reached for ${tourName}!`
  const previewText = `You have ${currentCommits} commitments. Your tour is confirmed to run.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Your tour is confirmed
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${operatorName},
    </p>

    ${highlightBox(`
      <p style="font-size: 16px; color: ${colors.ink}; margin: 0;">
        <strong>${tourName}</strong> on ${tourDate} has reached quorum.<br>
        Your tour is confirmed to run.
      </p>
    `)}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Tour confirmed</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Final participant count:</span>
                <span style="color: ${colors.ink}; font-weight: 600; float: right;">${currentCommits}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Participant list:</span>
                <span style="float: right;"><a href="${participantsUrl}" style="color: ${colors.primary};">View participants</a></span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      All committed participants will receive an email right now with a 24-hour payment deadline. They'll pay their balance and you'll receive your revenue (minus platform commission) once all payments clear.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Next steps for you</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${colors.primary};">1.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Confirm logistics</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">You should already have participants' emails and contact info. Reach out now to confirm meeting point, parking, weather contingencies, etc.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${colors.primary};">2.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Wait for payments</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">Participants have 24 hours to pay. Check your dashboard for real-time payment updates.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <strong style="color: ${colors.primary};">3.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Once all paid</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">You'll receive a final confirmation email with the complete participant list and phone numbers (if provided).</p>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Commission breakdown</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Tour revenue:</span>
                <span style="color: ${colors.ink}; float: right;">${formatCurrency(tourRevenue)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Platform commission (3%):</span>
                <span style="color: ${colors.ink}; float: right;">-${formatCurrency(commissionAmount)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0 4px 0; border-top: 1px solid ${colors.border};">
                <span style="color: ${colors.ink}; font-weight: 600;">Your earnings:</span>
                <span style="color: ${colors.primary}; font-weight: 600; float: right;">${formatCurrency(yourEarnings)}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-bottom: 24px;">
      Final payout comes after your tour completes.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('View Dashboard', dashboardUrl)}
    </div>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <strong style="color: ${colors.ink};">Questions?</strong> Reply to this email or check your operator dashboard.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Best,
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
