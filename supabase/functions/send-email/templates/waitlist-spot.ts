// =============================================================================
// WAITLIST SPOT EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, primaryButton, warningBox, highlightBox } from './_base.ts'

interface WaitlistSpotData {
  firstName: string
  tourName: string
  tourDate: string
  deadlineDatetime: string
  depositAmount: number
  claimUrl: string
}

export function waitlistSpotEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    tourDate,
    deadlineDatetime,
    depositAmount,
    claimUrl,
  } = data as unknown as WaitlistSpotData

  const subject = `A spot just opened up on ${tourName} — Claim it within 24 hours`
  const previewText = `Someone's spot became available. You're first in line. You have 24 hours to claim it.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      A spot opened up
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      A spot has opened up on <strong style="color: ${colors.ink};">${tourName}</strong> on ${tourDate}. You're first on the waitlist, so we're offering it to you.
    </p>

    ${warningBox(`
      <p style="font-size: 16px; color: ${colors.ink}; margin: 0 0 8px 0;">
        <strong>You have 24 hours to claim this spot.</strong>
      </p>
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        Deadline: ${deadlineDatetime}
      </p>
    `)}

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Claim This Spot', claimUrl)}
    </div>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">If you claim the spot</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">You pay your deposit now (if required based on your trust tier).</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">Since this tour has already reached quorum, you'll have 24 hours to pay the balance.</span>
        </td>
      </tr>
      ${depositAmount > 0 ? `
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">Deposit amount: ${formatCurrency(depositAmount)} (applied to your total)</span>
        </td>
      </tr>
      ` : ''}
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">If you don't claim by the deadline</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.inkSubtle}; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">The spot goes to the next person on the waitlist.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.inkSubtle}; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">Your name stays on the list for future openings.</span>
        </td>
      </tr>
    </table>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Claim Your Spot', claimUrl)}
    </div>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Best,
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
