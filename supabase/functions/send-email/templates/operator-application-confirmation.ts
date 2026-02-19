// =============================================================================
// OPERATOR APPLICATION CONFIRMATION — sent to applicant
// =============================================================================

import { baseTemplate, colors, primaryButton } from './_base.ts'

interface ApplicationConfirmationData {
  contactName: string
  businessName: string
  siteUrl: string
}

export function operatorApplicationConfirmationEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { contactName, businessName, siteUrl } = data as unknown as ApplicationConfirmationData

  const subject = `We received your application — ${businessName}`
  const previewText = "We'll review your application and be in touch within 48 hours."

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Application Received
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${contactName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Thanks for applying to list tours on Quorum Tours. We've received your application for <strong>${businessName}</strong> and will review it shortly.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      You can expect to hear back from us within <strong>48 hours</strong>. We'll reach out to this email address with next steps.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      In the meantime, feel free to explore the platform to see how it works for participants.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Browse Tours', `${siteUrl}/tours`)}
    </div>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-top: 32px;">
      Have questions? Reply to this email or reach us at hello@quorumtours.com.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
