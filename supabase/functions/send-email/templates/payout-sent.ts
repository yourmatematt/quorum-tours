// =============================================================================
// PAYOUT SENT OPERATOR EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, secondaryButton, highlightBox, infoBox } from './_base.ts'

interface Comment {
  text: string
  rating: number
}

interface PayoutSentData {
  operatorName: string
  tourName: string
  tourDate: string
  totalRevenue: number
  commissionAmount: number
  earningsAmount: number
  dateTransferred: string
  dateInAccount: string
  averageRating: number
  comments: Comment[]
  dashboardUrl: string
}

export function payoutSentEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    operatorName,
    tourName,
    tourDate,
    totalRevenue,
    commissionAmount,
    earningsAmount,
    dateTransferred,
    dateInAccount,
    averageRating,
    comments,
    dashboardUrl,
  } = data as unknown as PayoutSentData

  const subject = `Your payout for ${tourName} has been transferred`
  const previewText = `Earnings: ${formatCurrency(earningsAmount)}. Thank you for leading great tours.`

  const ratingStars = '★'.repeat(Math.round(averageRating)) + '☆'.repeat(5 - Math.round(averageRating))

  const commentsHtml = comments && comments.length > 0
    ? comments.map(c => `
      <div style="padding: 12px 0; border-bottom: 1px solid ${colors.border};">
        <p style="font-size: 14px; color: ${colors.inkMuted}; font-style: italic; margin: 0 0 4px 0;">"${c.text}"</p>
        <p style="font-size: 12px; color: ${colors.inkSubtle}; margin: 0;">${'★'.repeat(c.rating)}${'☆'.repeat(5 - c.rating)}</p>
      </div>
    `).join('')
    : `<p style="font-size: 14px; color: ${colors.inkSubtle}; margin: 0;">No comments yet.</p>`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Payout transferred
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${operatorName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Your payout for <strong style="color: ${colors.ink};">${tourName}</strong> on ${tourDate} has been transferred to your account.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Earnings summary</h2>

    ${highlightBox(`
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 4px 0;">
            <span style="color: ${colors.inkMuted};">Total revenue:</span>
            <span style="color: ${colors.ink}; float: right;">${formatCurrency(totalRevenue)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 4px 0;">
            <span style="color: ${colors.inkMuted};">Platform commission (3%):</span>
            <span style="color: ${colors.ink}; float: right;">-${formatCurrency(commissionAmount)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0 0 0; border-top: 1px solid ${colors.border};">
            <span style="color: ${colors.ink}; font-weight: 600;">Your earnings:</span>
            <span style="color: ${colors.primary}; font-weight: 600; float: right;">${formatCurrency(earningsAmount)}</span>
          </td>
        </tr>
      </table>
    `)}

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.inkSubtle};">Transfer date:</span>
          <span style="color: ${colors.ink}; float: right;">${dateTransferred}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.inkSubtle};">Expected in account:</span>
          <span style="color: ${colors.ink}; float: right;">${dateInAccount}</span>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Tour feedback</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 16px;">
      We received feedback from your participants:
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px; text-align: center;">
          <p style="font-size: 14px; color: ${colors.inkSubtle}; margin: 0 0 8px 0;">Average rating</p>
          <p style="font-size: 28px; color: ${colors.accent}; margin: 0;">${ratingStars}</p>
          <p style="font-size: 16px; color: ${colors.ink}; font-weight: 600; margin: 8px 0 0 0;">${averageRating.toFixed(1)}/5</p>
        </td>
      </tr>
    </table>

    ${comments && comments.length > 0 ? `
    <div style="margin-bottom: 24px;">
      <p style="font-size: 14px; color: ${colors.inkSubtle}; margin: 0 0 12px 0;">Comments:</p>
      ${commentsHtml}
    </div>
    ` : ''}

    ${infoBox(`
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        If there were any issues—no-shows, safety concerns, disputes—let us know. We take account integrity seriously and want to help.
      </p>
    `)}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What's next?</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Create another tour. Your reputation as an operator depends on consistent, excellent experiences. You're doing great. Keep it up.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      ${secondaryButton('View Dashboard', dashboardUrl)}
    </div>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <strong style="color: ${colors.ink};">Questions about your payout?</strong> Reply to this email or check your operator dashboard.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Best,
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; margin-top: 32px; padding-top: 16px; border-top: 1px solid ${colors.border};">
      P.S. If you have ideas for improving Quorum Tours, we want to hear them. This platform is built on operator feedback.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
