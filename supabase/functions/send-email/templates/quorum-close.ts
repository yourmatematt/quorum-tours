// =============================================================================
// QUORUM CLOSE EMAIL
// Triggered when a tour is 1-2 spots away from quorum.
// Sent to all committed participants to encourage sharing.
// =============================================================================

import { baseTemplate, colors, shareButtons, highlightBox } from './_base.ts'

interface QuorumCloseData {
  firstName: string
  tourName: string
  tourDate: string
  operatorName: string
  spotsRemaining: number
  threshold: number
  currentCommits: number
  targetSpecies: string
  tourLocation: string
  tourUrl: string
  siteUrl: string
}

export function quorumCloseEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    tourDate,
    operatorName,
    spotsRemaining,
    threshold,
    currentCommits,
    targetSpecies,
    tourLocation,
    tourUrl,
    siteUrl,
  } = data as unknown as QuorumCloseData

  const spotsWord = spotsRemaining === 1 ? 'spot' : 'spots'
  const subject = `${tourName} needs ${spotsRemaining} more ${spotsWord} to confirm`
  const previewText = `You're ${spotsRemaining} ${spotsWord} away from a confirmed tour. One share could make it happen.`

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
      Almost there — ${spotsRemaining} ${spotsWord} to go
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 32px;">
      <strong style="color: ${colors.ink};">${tourName}</strong> with ${operatorName} on ${tourDate} is ${spotsRemaining} ${spotsWord} away from confirmed. That's ${currentCommits} of ${threshold} committed — you're almost there.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.primaryLight}; border-radius: 12px; margin-bottom: 32px;">
      <tr>
        <td style="padding: 28px 32px; text-align: center;">
          <p style="font-size: 40px; font-weight: 700; color: ${colors.primary}; margin: 0 0 4px 0;">${spotsRemaining}</p>
          <p style="font-size: 16px; color: ${colors.inkMuted}; margin: 0 0 24px 0;">
            more ${spotsWord} needed${targetSpecies ? ` to see ${targetSpecies} in ${tourLocation}` : ''}
          </p>
          <p style="font-size: 15px; color: ${colors.ink}; font-weight: 600; margin: 0 0 20px 0;">
            Know a birder who'd want in?
          </p>
          ${shareButtons(shareData)}
          <p style="font-size: 13px; color: ${colors.inkSubtle}; margin: 16px 0 0 0;">
            Or share: <a href="${tourUrl}" style="color: ${colors.primary};">${tourUrl}</a>
          </p>
        </td>
      </tr>
    </table>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      If the tour doesn't reach ${threshold} committed participants, everyone's deposit is refunded in full. But you're this close — one message to the right person could confirm it.
    </p>

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">
        Track live progress on your <a href="${siteUrl}/profile" style="color: ${colors.primary};">account dashboard</a>. You'll get an email the moment quorum is reached.
      </p>
    `)}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin: 32px 0 8px;">Best,</p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
