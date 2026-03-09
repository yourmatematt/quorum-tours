// =============================================================================
// TOUR ENQUIRY — OPERATOR NOTIFICATION
// =============================================================================

import { baseTemplate, colors } from './_base.ts'

interface TourEnquiryOperatorData {
  tourTitle: string
  tourSlug: string
  enquirerName: string
  enquirerEmail: string
  message: string
  sentAt: string
  siteUrl: string
}

export function tourEnquiryOperatorEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { tourTitle, tourSlug, enquirerName, enquirerEmail, message, sentAt, siteUrl } = data as unknown as TourEnquiryOperatorData

  const subject = `New enquiry: ${tourTitle} — ${enquirerName}`
  const previewText = `${enquirerName} has a question about ${tourTitle}`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      New Tour Enquiry
    </h1>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: ${colors.inkSubtle}; vertical-align: top; width: 80px;">Tour</td>
        <td style="padding: 8px 0; font-size: 16px; color: ${colors.ink};">
          <a href="${siteUrl}/tours/${tourSlug}" style="color: ${colors.primary}; text-decoration: none;">${tourTitle}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: ${colors.inkSubtle}; vertical-align: top;">From</td>
        <td style="padding: 8px 0; font-size: 16px; color: ${colors.ink};">
          ${enquirerName} (<a href="mailto:${enquirerEmail}" style="color: ${colors.primary}; text-decoration: none;">${enquirerEmail}</a>)
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: ${colors.inkSubtle}; vertical-align: top;">Sent at</td>
        <td style="padding: 8px 0; font-size: 14px; color: ${colors.inkMuted};">${sentAt}</td>
      </tr>
    </table>

    <div style="background: ${colors.surfaceSunken}; border: 1px solid ${colors.border}; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 14px; color: ${colors.inkSubtle}; margin-bottom: 8px;">Message:</p>
      <p style="font-size: 16px; color: ${colors.ink}; line-height: 1.6; white-space: pre-wrap;">${message}</p>
    </div>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6;">
      Reply directly to <a href="mailto:${enquirerEmail}" style="color: ${colors.primary}; text-decoration: none;">${enquirerEmail}</a> to respond.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
