// =============================================================================
// OPERATOR APPLICATION RECEIVED — sent to admin
// =============================================================================

import { baseTemplate, colors, primaryButton, highlightBox } from './_base.ts'

interface ApplicationReceivedData {
  businessName: string
  contactName: string
  contactEmail: string
  baseLocation: string
  description: string
  yearsExperience: number
  adminUrl: string
}

export function operatorApplicationReceivedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { businessName, contactName, contactEmail, baseLocation, description, yearsExperience, adminUrl } = data as unknown as ApplicationReceivedData

  const subject = `New Operator Application: ${businessName}`
  const previewText = `${contactName} has applied to list tours on Quorum Tours.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      New Operator Application
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      A new operator application has been submitted and is waiting for your review.
    </p>

    ${highlightBox(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 8px 0; color: ${colors.inkSubtle}; font-size: 14px; width: 140px;">Business Name</td>
          <td style="padding: 8px 0; color: ${colors.ink}; font-size: 14px; font-weight: 600;">${businessName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${colors.inkSubtle}; font-size: 14px;">Contact</td>
          <td style="padding: 8px 0; color: ${colors.ink}; font-size: 14px;">${contactName} (${contactEmail})</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${colors.inkSubtle}; font-size: 14px;">Location</td>
          <td style="padding: 8px 0; color: ${colors.ink}; font-size: 14px;">${baseLocation}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${colors.inkSubtle}; font-size: 14px;">Experience</td>
          <td style="padding: 8px 0; color: ${colors.ink}; font-size: 14px;">${yearsExperience} years</td>
        </tr>
      </table>
    `)}

    <p style="font-size: 14px; color: ${colors.inkMuted}; line-height: 1.6; margin: 24px 0;">
      <strong>About their operation:</strong><br>
      ${description}
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Review Application', adminUrl)}
    </div>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
