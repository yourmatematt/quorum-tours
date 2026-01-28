// =============================================================================
// PAYMENT REMINDER EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, primaryButton, warningBox } from './_base.ts'

interface PaymentReminderData {
  firstName: string
  tourName: string
  deadlineDatetime: string
  deadlineTime: string
  balanceDue: number
  depositAmount: number // 0 if no deposit was required
  currentStrikes: number // 0, 1, or 2
  paymentUrl: string
}

export function paymentReminderEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    deadlineDatetime,
    deadlineTime,
    balanceDue,
    depositAmount,
    currentStrikes,
    paymentUrl,
  } = data as unknown as PaymentReminderData

  const subject = `Reminder: Pay by ${deadlineTime} or lose your spot`
  const previewText = `12 hours left. Balance due: ${formatCurrency(balanceDue)}.`

  // Calculate strikes remaining after this potential miss
  const strikesAfterMiss = (currentStrikes || 0) + 1
  const strikesRemaining = 3 - strikesAfterMiss

  // Build consequence based on whether deposit was paid
  const depositConsequence = depositAmount > 0
    ? `Your deposit (${formatCurrency(depositAmount)}) goes to the operator.`
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
      12 hours remaining
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    ${warningBox(`
      <p style="font-size: 16px; color: ${colors.ink}; margin: 0 0 8px 0;">
        <strong>Reminder: Your payment for ${tourName} is due in 12 hours.</strong>
      </p>
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        Deadline: ${deadlineDatetime}
      </p>
    `)}

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin: 24px 0;">
      <tr>
        <td style="padding: 20px; text-align: center;">
          <p style="font-size: 14px; color: ${colors.inkSubtle}; margin: 0 0 8px 0;">Balance due</p>
          <p style="font-size: 32px; color: ${colors.primary}; font-weight: 600; margin: 0;">${formatCurrency(balanceDue)}</p>
        </td>
      </tr>
    </table>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Pay Now', paymentUrl)}
    </div>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">If you don't pay by ${deadlineDatetime}:</h2>

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
    </table>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-bottom: 24px;">
      No extensions. This is how the system keeps operators confident and tours running.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Pay Now', paymentUrl)}
    </div>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Still have questions? <a href="mailto:support@quorumtours.com" style="color: ${colors.primary};">Contact support</a> or reply to this email.
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
