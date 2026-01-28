// =============================================================================
// WELCOME EMAIL
// =============================================================================

import { baseTemplate, colors, highlightBox } from './_base.ts'

interface WelcomeData {
  firstName: string
  siteUrl: string
}

export function welcomeEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const { firstName, siteUrl } = data as unknown as WelcomeData

  const subject = "Welcome to Quorum Tours — Here's how it works"
  const previewText = "Tours run when you commit. Here's what that means."

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Welcome to Quorum Tours
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Our platform works differently than traditional tour booking. Instead of paying upfront for a tour that might not have enough participants, you commit conditionally and only pay when the tour is guaranteed to run.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Here's the flow</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${colors.primary};">1.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Browse tours</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">Each tour shows its quorum (minimum participants needed) and how many have committed.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${colors.primary};">2.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Commit</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">If a deposit is required, you pay it now. The deposit is applied to your tour price later.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${colors.primary};">3.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Wait for quorum</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">Other people commit too. If enough commit, the tour reaches quorum.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
          <strong style="color: ${colors.primary};">4.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">Tour confirms</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">You have 24 hours to pay the balance. Your deposit is applied to the total.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <strong style="color: ${colors.primary};">5.</strong>
          <span style="color: ${colors.ink}; margin-left: 8px;">You go birding</span>
          <p style="margin: 4px 0 0 20px; font-size: 14px; color: ${colors.inkMuted};">Everyone who paid joins the tour.</p>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">About deposits</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      As a new user, you'll pay a deposit when you commit to a tour. The deposit amount is set by the tour operator and is applied to your tour price—it's not an extra fee.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      Why deposits? Tours only work when people show up. If you commit and then don't pay the balance after the tour confirms, you disrupt the operator and other birders who were counting on you. The deposit compensates them for that disruption.
    </p>

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">
        <strong>What if a tour doesn't reach quorum?</strong><br>
        Your deposit is refunded in full. No strikes, no impact.
      </p>
    `)}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin: 32px 0 24px;">
      Questions? Check out our <a href="${siteUrl}/how-it-works" style="color: ${colors.primary};">How It Works</a> page for full details.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Looking forward to getting you birding.
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      Best,<br>
      The Quorum Team
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; margin-top: 32px; padding-top: 16px; border-top: 1px solid ${colors.border};">
      P.S. You're under no pressure to book immediately. Browse around, find tours that interest you, and join when you're ready.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
