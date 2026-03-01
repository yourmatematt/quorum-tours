// =============================================================================
// OPERATOR APPLICATION RESPONSE — sent to admin when applicant responds
// =============================================================================

import { baseTemplate, colors, primaryButton, highlightBox } from './_base.ts'

interface ApplicationResponseData {
  businessName: string
  contactName: string
  contactEmail: string
  responseText: string
  adminUrl: string
}

export function operatorApplicationResponseEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { businessName, contactName, contactEmail, responseText, adminUrl } = data as unknown as ApplicationResponseData

  const subject = `Applicant Response: ${businessName}`
  const previewText = `${contactName} has responded to your information request.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Applicant Response Received
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <strong>${contactName}</strong> (${contactEmail}) has responded to your request for more information about their application for <strong>${businessName}</strong>.
    </p>

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0 0 8px;">
        <strong>Their response:</strong>
      </p>
      <p style="font-size: 14px; color: ${colors.inkMuted}; line-height: 1.6; margin: 0; white-space: pre-wrap;">${responseText}</p>
    `)}

    <p style="font-size: 14px; color: ${colors.inkMuted}; line-height: 1.6; margin: 24px 0;">
      The application has been moved back to the review queue.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Review Application', adminUrl)}
    </div>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
