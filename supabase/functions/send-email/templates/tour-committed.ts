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
  const previewText = `Now we wait to see if the tour reaches quorum by ${deadlineDate}.`

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
      Your commitment to <strong style="color: ${colors.ink};">${tourName}</strong> on ${tourDate} with ${operatorName} is confirmed.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What this means</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkMuted};">You are committed to this tour if it reaches quorum by ${deadlineDate}.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkMuted};">${depositDisplay}</span>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Current status</h2>

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
                <span style="color: ${colors.inkSubtle};">Current commitments:</span>
                <span style="color: ${colors.ink}; float: right;">${currentCommits}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0;">
                <span style="color: ${colors.inkSubtle};">Spots remaining:</span>
                <span style="color: ${colors.primary}; font-weight: 600; float: right;">${spotsRemaining}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What happens next</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      If the tour reaches ${threshold} committed participants by ${deadlineDate}, you'll receive an email saying the tour is confirmed. You'll then have 24 hours to pay the balance of ${formatCurrency(remainingAmount)}. Your deposit is applied to the total.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      If the tour doesn't reach quorum, your deposit is refunded in full. No penalties. We'll let you know the tour isn't running.
    </p>

    ${spotsRemaining > 0 ? `
    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Help this tour reach quorum</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      This tour needs ${spotsRemaining} more ${spotsRemaining === 1 ? 'person' : 'people'} to run. Know someone who'd be interested in ${targetSpecies ? `seeing ${targetSpecies} in` : 'joining this wildlife tour in'} ${tourLocation}?
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; margin-bottom: 12px;">Share this tour:</p>

    ${shareButtons(shareData)}

    <p style="font-size: 14px; color: ${colors.inkSubtle}; margin: 16px 0;">
      Or copy this link: <a href="${tourUrl}" style="color: ${colors.primary};">${tourUrl}</a>
    </p>
    ` : ''}

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">
        <strong>Until then:</strong> No action needed. You can monitor the tour's progress on your <a href="${siteUrl}/profile" style="color: ${colors.primary};">account dashboard</a>.
      </p>
    `)}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin: 32px 0 8px;">
      Questions about the tour itself (dates, location, what to bring)? Contact ${operatorName} directly at <a href="mailto:${operatorEmail}" style="color: ${colors.primary};">${operatorEmail}</a>.
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
