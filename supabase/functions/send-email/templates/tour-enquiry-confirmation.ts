// =============================================================================
// TOUR ENQUIRY — CONFIRMATION TO ENQUIRER
// =============================================================================

import { baseTemplate, colors, primaryButton } from './_base.ts'

interface TourEnquiryConfirmationData {
  enquirerName: string
  enquirerEmail: string
  tourTitle: string
  tourSlug: string
  siteUrl: string
}

export function tourEnquiryConfirmationEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { enquirerName, enquirerEmail, tourTitle, tourSlug, siteUrl } = data as unknown as TourEnquiryConfirmationData

  const subject = `Your enquiry about ${tourTitle}`
  const previewText = `We've received your question about ${tourTitle}`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Enquiry Received
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Thanks ${enquirerName}, we've received your enquiry about <strong>${tourTitle}</strong>.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Dale will be in touch with you at <strong>${enquirerEmail}</strong> shortly.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('View Tour', `${siteUrl}/tours/${tourSlug}`)}
    </div>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-top: 32px;">
      Have more questions? Reply to this email or reach us at hello@quorumtours.com.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
