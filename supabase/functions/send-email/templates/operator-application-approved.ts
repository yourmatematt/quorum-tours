// =============================================================================
// OPERATOR APPLICATION APPROVED — sent to applicant
// =============================================================================

import { baseTemplate, colors, primaryButton, highlightBox } from './_base.ts'

interface ApplicationApprovedData {
  contactName: string
  businessName: string
  dashboardUrl: string
  siteUrl: string
}

export function operatorApplicationApprovedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { contactName, businessName, dashboardUrl, siteUrl } = data as unknown as ApplicationApprovedData

  const subject = `Your application has been approved — Welcome to Quorum Tours`
  const previewText = `${businessName} is now live on Quorum Tours. Set up your profile and list your first tour.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      You're In
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${contactName},
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; line-height: 1.6; margin-bottom: 24px;">
      Your application for <strong>${businessName}</strong> has been approved. You now have full access to the operator dashboard.
    </p>

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0 0 8px;">
        <strong>Here's what to do next:</strong>
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 6px 0; color: ${colors.inkMuted}; font-size: 14px;">
            <strong style="color: ${colors.primary};">1.</strong> Complete your operator profile
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: ${colors.inkMuted}; font-size: 14px;">
            <strong style="color: ${colors.primary};">2.</strong> List your first tour
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: ${colors.inkMuted}; font-size: 14px;">
            <strong style="color: ${colors.primary};">3.</strong> Connect your Stripe account to receive payouts
          </td>
        </tr>
      </table>
    `)}

    <div style="text-align: center; margin: 32px 0;">
      ${primaryButton('Go to Your Dashboard', dashboardUrl)}
    </div>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-top: 32px;">
      Need help getting started? Check out the Help section in your dashboard, or reply to this email.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
