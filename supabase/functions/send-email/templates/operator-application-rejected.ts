// =============================================================================
// OPERATOR APPLICATION REJECTED — sent to applicant
// =============================================================================

import { baseTemplate, colors } from './_base.ts'

interface ApplicationRejectedData {
  contactName: string
  businessName: string
  reason: string
  siteUrl: string
}

export function operatorApplicationRejectedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { contactName, businessName, reason, siteUrl } = data as unknown as ApplicationRejectedData

  const subject = `Update on your Quorum Tours application`
  const previewText = `An update on your application for ${businessName}.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Application Update
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${contactName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Thank you for your interest in listing tours on Quorum Tours. After reviewing your application for <strong>${businessName}</strong>, we're unable to approve it at this time.
    </p>

    ${reason ? `
    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <strong>Reason:</strong> ${reason}
    </p>
    ` : ''}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      If you believe this was made in error, or if your circumstances have changed, you're welcome to re-apply in the future. You can also reach us at hello@quorumtours.com with any questions.
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-top: 32px;">
      — The Quorum Tours Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
