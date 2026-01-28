// =============================================================================
// STRIKE APPLIED EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, warningBox, infoBox } from './_base.ts'

interface StrikeAppliedData {
  firstName: string
  tourName: string
  depositAmount: number
  depositLessFee: number
  operatorName: string
  strikeNumber: number
}

export function strikeAppliedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    depositAmount,
    depositLessFee,
    operatorName,
    strikeNumber,
  } = data as unknown as StrikeAppliedData

  const subject = 'Your account has received a strike'
  const previewText = `You missed the payment deadline for ${tourName}. Here's what happens next.`

  const strikeLabel = strikeNumber === 1 ? 'Strike 1' : strikeNumber === 2 ? 'Strike 2' : `Strike ${strikeNumber}`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Strike applied to your account
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      You did not pay for <strong style="color: ${colors.ink};">${tourName}</strong> within the 24-hour deadline. Your deposit has been forfeited to the operator.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What just happened</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0 0 8px 0;">
            Your deposit: ${formatCurrency(depositAmount)} (minus 3% platform fee = ${formatCurrency(depositLessFee)}) has been sent to ${operatorName}.
          </p>
          <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0 0 8px 0;">
            Your spot went to the next person on the waitlist.
          </p>
          <p style="font-size: 14px; color: ${colors.ink}; font-weight: 600; margin: 16px 0 0 0;">
            You've received a <span style="color: #D4A84B;">${strikeLabel}</span> on your account.
          </p>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What this means for future bookings</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${strikeNumber >= 1 ? '#D4A84B' : colors.ink};">Strike 1:</strong>
          <span style="color: ${colors.inkMuted}; margin-left: 8px;">Operators can require a deposit on your next tour commitment. The operator sets the amount.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${strikeNumber >= 2 ? '#D4A84B' : colors.ink};">Strike 2:</strong>
          <span style="color: ${colors.inkMuted}; margin-left: 8px;">You'll be required to pay a 50% deposit on all future tours.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <strong style="color: ${strikeNumber >= 3 ? '#D4A84B' : colors.ink};">Strike 3:</strong>
          <span style="color: ${colors.inkMuted}; margin-left: 8px;">Your account will be suspended. You won't be able to book tours.</span>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Can you appeal?</h2>

    ${infoBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0 0 12px 0;">
        <strong>Yes, but only if there were extenuating circumstances.</strong>
      </p>
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0 0 8px 0;">
        Reply to this email or contact us at <a href="mailto:support@quorumtours.com" style="color: ${colors.primary};">support@quorumtours.com</a> with:
      </p>
      <ul style="margin: 8px 0; padding-left: 20px;">
        <li style="color: ${colors.inkMuted}; padding: 2px 0;">What prevented you from paying</li>
        <li style="color: ${colors.inkMuted}; padding: 2px 0;">Any supporting information (hospital visit, family emergency, etc.)</li>
        <li style="color: ${colors.inkMuted}; padding: 2px 0;">A request to review your case</li>
      </ul>
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 8px 0 0 0;">
        We'll review your appeal and respond within 3 business days. Approved appeals may result in the strike being removed.
      </p>
    `)}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin: 32px 0 24px;">
      <strong style="color: ${colors.ink};">Questions?</strong> Contact us at <a href="mailto:support@quorumtours.com" style="color: ${colors.primary};">support@quorumtours.com</a>.
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
