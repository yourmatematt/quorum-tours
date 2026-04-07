// =============================================================================
// TOUR COMMITTED EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, primaryButton, highlightBox, shareButtons } from './_base.ts'

interface TourCommittedData {
  firstName: string
  tourName: string
  tourDate: string
  operatorName: string
  operatorEmail: string
  deadlineDate: string
  depositAmount: number
  remainingAmount: number
  threshold: number
  currentCommits: number
  spotsRemaining: number
  targetSpecies: string
  tourLocation: string
  tourUrl: string
  siteUrl: string
}

export function tourCommittedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    tourDate,
    operatorName,
    operatorEmail,
    deadlineDate,
    depositAmount,
    remainingAmount,
    threshold,
    currentCommits,
    spotsRemaining,
    targetSpecies,
    tourLocation,
    tourUrl,
    siteUrl,
  } = data as unknown as TourCommittedData

  const subject = `Your commitment to ${tourName} is confirmed`
  const previewText = spotsRemaining > 0
    ? `${spotsRemaining} more ${spotsRemaining === 1 ? 'person' : 'people'} needed — share with a birding friend to make it happen.`
    : `You're confirmed for ${tourName} on ${tourDate}.`

  const depositDisplay = depositAmount > 0
    ? `Deposit paid: ${formatCurrency(depositAmount)} (applied to your total when you pay the balance)`
    : `No deposit required. You'll pay the full amount when the tour confirms.`

  const shareData = {
    name: tourName,
    date: tourDate,
    location: tourLocation,
    operatorName,
    targetSpecies,
    spotsNeeded: spotsRemaining,
    url: tourUrl,
  }

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Your commitment is confirmed
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      You're in for <strong style="color: ${colors.ink};">${tourName}</strong> on ${tourDate} with ${operatorName}. The tour needs ${threshold} committed participants to run — you're one of ${currentCommits}.
    </p>

    ${spotsRemaining > 0 ? `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.primaryLight}; border-radius: 12px; margin-bottom: 32px;">
      <tr>
        <td style="padding: 28px 32px; text-align: center;">
          <p style="font-size: 22px; font-weight: 700; color: ${colors.primary}; margin: 0 0 8px 0;">
            ${spotsRemaining} more ${spotsRemaining === 1 ? 'person' : 'people'} needed
          </p>
          <p style="font-size: 15px; color: ${colors.inkMuted}; margin: 0 0 24px 0;">
            Know a birder who'd want to ${targetSpecies ? `see ${targetSpecies} in` : 'join this wildlife tour in'} ${tourLocation}? Send them this tour — you'll help make it happen.
          </p>
          ${shareButtons(shareData)}
          <p style="font-size: 13px; color: ${colors.inkSubtle}; margin: 16px 0 0 0;">
            Or share the link: <a href="${tourUrl}" style="color: ${colors.primary};">${tourUrl}</a>
          </p>
        </td>
      </tr>
    </table>
    ` : `
    ${highlightBox(`
      <p style="font-size: 16px; color: ${colors.primary}; font-weight: 600; margin: 0 0 4px 0;">Quorum reached!</p>
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">This tour is confirmed. You'll receive payment instructions shortly.</p>
    `)}
    `}

    <h2 style="font-size: 18px; color: ${colors.ink}; margin: 32px 0 16px;">Your booking details</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 4px 0;">
                <span style="color: ${colors.inkSubtle};">Commitments needed:</span>
                <span style="color: ${colors.ink}; float: right;">${threshold}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">
                <span style="color: ${colors.inkSubtle};">Committed so far:</span>
                <span style="color: ${colors.ink}; float: right;">${currentCommits}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; border-top: 1px solid ${colors.border}; margin-top: 8px;">
                <span style="color: ${colors.inkSubtle};">${depositDisplay}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 18px; color: ${colors.ink}; margin: 32px 0 16px;">What happens next</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      If the tour reaches ${threshold} committed participants by ${deadlineDate}, you'll get a confirmation email and 24 hours to pay the balance of ${formatCurrency(remainingAmount)}. Your deposit is applied to the total.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      If quorum isn't reached, your deposit is refunded in full. No penalties. We'll let you know.
    </p>

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">
        <strong>Until then:</strong> No action needed. Monitor progress on your <a href="${siteUrl}/profile" style="color: ${colors.primary};">account dashboard</a>.
      </p>
    `)}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin: 32px 0 8px;">
      Questions about the tour itself? Contact ${operatorName} at <a href="mailto:${operatorEmail}" style="color: ${colors.primary};">${operatorEmail}</a>.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">Best,</p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
