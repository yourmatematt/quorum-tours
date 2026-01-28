// =============================================================================
// DEPOSIT FORFEITED OPERATOR EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, highlightBox, infoBox } from './_base.ts'

interface DepositForfeitedData {
  operatorName: string
  birderName: string
  tourName: string
  tourDate: string
  depositAmount: number
  platformFee: number
  depositLessFee: number
  currentConfirmedCount: number
  threshold: number
}

export function depositForfeitedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    operatorName,
    birderName,
    tourName,
    tourDate,
    depositAmount,
    platformFee,
    depositLessFee,
    currentConfirmedCount,
    threshold,
  } = data as unknown as DepositForfeitedData

  const subject = `Deposit received — ${birderName} missed payment deadline`
  const previewText = `${birderName} didn't pay. Deposit received: ${formatCurrency(depositLessFee)}.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Deposit forfeited
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${operatorName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <strong style="color: ${colors.ink};">${birderName}</strong> missed the 24-hour payment deadline for <strong style="color: ${colors.ink};">${tourName}</strong> on ${tourDate}.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Their deposit has been forfeited.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Deposit received</h2>

    ${highlightBox(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 4px 0;">
            <span style="color: ${colors.inkMuted};">Deposit amount:</span>
            <span style="color: ${colors.ink}; float: right;">${formatCurrency(depositAmount)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0;">
            <span style="color: ${colors.inkMuted};">Platform fee (3%):</span>
            <span style="color: ${colors.ink}; float: right;">-${formatCurrency(platformFee)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0 0 0; border-top: 1px solid ${colors.border};">
            <span style="color: ${colors.ink}; font-weight: 600;">Amount to you:</span>
            <span style="color: ${colors.primary}; font-weight: 600; float: right;">${formatCurrency(depositLessFee)}</span>
          </td>
        </tr>
      </table>
    `)}

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin: 16px 0 24px;">
      This will be included in your next payout.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Open spot</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      ${birderName}'s spot is now open and has been offered to the next person on the waitlist. If someone claims it, you'll be notified immediately.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Account impact</h2>

    ${infoBox(`
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        <strong style="color: ${colors.ink};">${birderName}</strong> has received a strike. If they want to book another tour in the future, you can require a deposit (and you should consider doing so).
      </p>
    `)}

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin: 24px 0;">
      <tr>
        <td style="padding: 20px; text-align: center;">
          <p style="font-size: 14px; color: ${colors.inkSubtle}; margin: 0 0 8px 0;">Current confirmed participants</p>
          <p style="font-size: 24px; color: ${colors.ink}; font-weight: 600; margin: 0;">${currentConfirmedCount}/${threshold}</p>
        </td>
      </tr>
    </table>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Your tour is still confirmed as long as participants who did pay show up.
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
