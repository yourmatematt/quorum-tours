// =============================================================================
// NEW BOOKING OPERATOR EMAIL
// =============================================================================

import { baseTemplate, colors, infoBox } from './_base.ts'

interface NewBookingData {
  operatorName: string
  birderName: string
  birderEmail: string
  tourName: string
  tourDate: string
  currentCommits: number
  threshold: number
  remaining: number
  depositRequired: boolean
  trustTier: 'new' | 'trusted' | 'strike_1' | 'strike_2'
  commitmentDeadline: string
  dashboardUrl: string
}

export function newBookingEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    operatorName,
    birderName,
    birderEmail,
    tourName,
    tourDate,
    currentCommits,
    threshold,
    remaining,
    depositRequired,
    trustTier,
    commitmentDeadline,
    dashboardUrl,
  } = data as unknown as NewBookingData

  const subject = `New commitment on ${tourName}`
  const previewText = `${birderName} just committed. You now have ${currentCommits}/${threshold}.`

  const progressPercent = Math.round((currentCommits / threshold) * 100)

  const trustTierLabels: Record<string, { label: string; description: string }> = {
    new: { label: 'New', description: 'First-time user. Deposit applies based on your tour settings.' },
    trusted: { label: 'Trusted', description: 'Has completed tours without issues. No deposit required.' },
    strike_1: { label: 'Strike 1', description: 'One missed payment. You set the deposit requirement.' },
    strike_2: { label: 'Strike 2', description: 'Two missed payments. 50% deposit required.' },
  }

  const tierInfo = trustTierLabels[trustTier] || trustTierLabels.new

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      New commitment
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${operatorName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <strong style="color: ${colors.ink};">${birderName}</strong> has committed to <strong style="color: ${colors.ink};">${tourName}</strong> on ${tourDate}.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Tour status</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Current commitments:</span>
                <span style="color: ${colors.ink}; font-weight: 600; float: right;">${currentCommits}/${threshold}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Remaining until quorum:</span>
                <span style="color: ${remaining === 0 ? colors.primary : colors.ink}; float: right;">${remaining}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Deposit required:</span>
                <span style="color: ${colors.ink}; float: right;">${depositRequired ? 'Yes' : 'No'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 0 8px 0;">
                <div style="background-color: ${colors.border}; border-radius: 4px; height: 8px; overflow: hidden;">
                  <div style="background-color: ${colors.primary}; height: 100%; width: ${progressPercent}%;"></div>
                </div>
                <p style="font-size: 12px; color: ${colors.inkSubtle}; margin: 4px 0 0 0; text-align: center;">${progressPercent}% to quorum</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Participant info</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkSubtle};">Name:</span>
          <span style="color: ${colors.ink}; float: right;">${birderName}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkSubtle};">Email:</span>
          <span style="color: ${colors.ink}; float: right;"><a href="mailto:${birderEmail}" style="color: ${colors.primary};">${birderEmail}</a></span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.inkSubtle};">Trust tier:</span>
          <span style="color: ${colors.ink}; font-weight: 600; float: right;">${tierInfo.label}</span>
        </td>
      </tr>
    </table>

    ${infoBox(`
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        <strong style="color: ${colors.ink};">${tierInfo.label}:</strong> ${tierInfo.description}
      </p>
    `)}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What's next?</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      If you reach quorum by ${commitmentDeadline}, all committed participants will be asked to pay their balance within 24 hours. Once they pay, your tour is fully confirmed.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      If you don't reach quorum by ${commitmentDeadline}, this tour will not run.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Questions about the commitment process? Check your <a href="${dashboardUrl}" style="color: ${colors.primary};">operator dashboard</a> or reply to this email.
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
