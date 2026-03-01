// =============================================================================
// OPERATOR APPLICATION INFO REQUESTED — sent to applicant
// =============================================================================

import { baseTemplate, colors } from './_base.ts'

interface InfoRequestedData {
  contactName: string
  businessName: string
  message: string
  siteUrl: string
}

export function operatorApplicationInfoRequestedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { contactName, businessName, message, siteUrl } = data as unknown as InfoRequestedData

  const subject = `Additional information needed for your Quorum Tours application`
  const previewText = `We need a bit more information about ${businessName}.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      We Need a Bit More Info
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${contactName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Thanks for applying to list tours on Quorum Tours as <strong>${businessName}</strong>. Before we can move forward, we need some additional information:
    </p>

    <div style="background: ${colors.surfaceSunken}; border-left: 4px solid ${colors.primary}; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
      <p style="font-size: 15px; color: ${colors.ink}; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
    </div>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 32px;">
      Please reply directly to this email with the requested details and we'll continue reviewing your application.
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-top: 32px;">
      — The Quorum Tours Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
