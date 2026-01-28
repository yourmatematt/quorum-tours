// =============================================================================
// QUORUM REACHED EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, primaryButton, warningBox } from './_base.ts'

interface QuorumReachedData {
  firstName: string
  tourName: string
  tourDate: string
  deadlineDatetime: string
  tourPrice: number
  depositAmount: number // 0 if no deposit was required
  balanceDue: number
  currentStrikes: number // 0, 1, or 2
  paymentUrl: string
  siteUrl: string
}

export function quorumReachedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    tourDate,
    deadlineDatetime,
    tourPrice,
    depositAmount,
    balanceDue,
    currentStrikes,
    paymentUrl,
    siteUrl,
  } = data as unknown as QuorumReachedData

  const subject = `Quorum Reached for ${tourName}! Pay within 24 hours`
  const previewText = `${tourName} has reached quorum and is guaranteed to run. You have until ${deadlineDatetime} to pay.`

  // Calculate strikes remaining after this potential miss
  const strikesAfterMiss = (currentStrikes || 0) + 1
  const strikesRemaining = 3 - strikesAfterMiss

  // Build consequence based on whether deposit was paid
  const depositConsequence = depositAmount > 0
    ? `Your deposit (${formatCurrency(depositAmount)}) is forfeited to the operator (minus 3% platform fee).`
    : ''

  // Build strike consequence with context about remaining strikes
  let strikeConsequence = 'You receive a strike on your account.'
  if (strikesRemaining === 1) {
    strikeConsequence = 'You receive a strike on your account. You will have 1 strike remaining until account suspension.'
  } else if (strikesRemaining === 0) {
    strikeConsequence = 'You receive a strike and your account will be suspended. You won\'t be able to book tours.'
  }

  // Additional consequence for trusted users (no deposit) - they'll need deposit next time
  const futureDepositWarning = depositAmount === 0
    ? 'You will be required to pay a deposit when registering for your next tour.'
    : ''

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      ${tourName} is confirmed
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      The tour has reached quorum and is <strong style="color: ${colors.ink};">guaranteed to run</strong> on ${tourDate}.
    </p>

    ${warningBox(`
      <p style="font-size: 16px; color: ${colors.ink}; margin: 0 0 8px 0;">
        <strong>Your payment is due in 24 hours.</strong>
      </p>
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        Deadline: ${deadlineDatetime}
      </p>
    `)}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Amount due</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 4px 0;">
                <span style="color: ${colors.inkSubtle};">Tour price:</span>
                <span style="color: ${colors.ink}; float: right;">${formatCurrency(tourPrice)}</span>
              </td>
            </tr>
            ${depositAmount > 0 ? `
            <tr>
              <td style="padding: 4px 0;">
                <span style="color: ${colors.inkSubtle};">Less deposit:</span>
                <span style="color: ${colors.ink}; float: right;">-${formatCurrency(depositAmount)}</span>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0 4px 0; border-top: 1px solid ${colors.border};">
                <span style="color: ${colors.ink}; font-weight: 600;">Balance to pay:</span>
                <span style="color: ${colors.primary}; font-weight: 600; float: right;">${formatCurrency(balanceDue)}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Pay Now', paymentUrl)}
    </div>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What happens if you pay on time</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#10003;</span>
          <span style="color: ${colors.inkMuted};">Your balance is charged.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#10003;</span>
          <span style="color: ${colors.inkMuted};">Your booking is confirmed.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#10003;</span>
          <span style="color: ${colors.inkMuted};">You'll receive tour details (meeting point, what to bring, operator contact) within 48 hours.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.primary}; margin-right: 8px;">&#10003;</span>
          <span style="color: ${colors.inkMuted};">You're all set.</span>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What happens if you miss the deadline</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      ${depositConsequence ? `
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: #D4A84B; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">${depositConsequence}</span>
        </td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: #D4A84B; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">Your spot goes to the next person on the waitlist.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: #D4A84B; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">${strikeConsequence}</span>
        </td>
      </tr>
      ${futureDepositWarning ? `
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: #D4A84B; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">${futureDepositWarning}</span>
        </td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: #D4A84B; margin-right: 8px;">&#8226;</span>
          <span style="color: ${colors.inkMuted};">Strikes are permanent but can be appealed through support if extenuating circumstances apply.</span>
        </td>
      </tr>
    </table>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-bottom: 24px;">
      This is not negotiable. The 24-hour window exists because operators need certainty. If everyone who commits paid when it's convenient, tours would fall apart.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      <strong style="color: ${colors.ink};">Questions?</strong> Contact us at <a href="mailto:support@quorumtours.com" style="color: ${colors.primary};">support@quorumtours.com</a> or check our <a href="${siteUrl}/how-it-works" style="color: ${colors.primary};">FAQ</a> for details on the payment process.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Pay Now', paymentUrl)}
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
