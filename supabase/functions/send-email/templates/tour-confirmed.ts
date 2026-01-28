// =============================================================================
// TOUR CONFIRMED OPERATOR EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, primaryButton, highlightBox, infoBox } from './_base.ts'

interface Participant {
  name: string
  email: string
  phone?: string
  trustTier: string
}

interface TourConfirmedData {
  operatorName: string
  tourName: string
  tourDate: string
  startTime: string
  tourLocation: string
  duration: string
  finalCount: number
  participants: Participant[]
  downloadUrl: string
  totalRevenue: number
  commissionAmount: number
  yourEarnings: number
}

export function tourConfirmedEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    operatorName,
    tourName,
    tourDate,
    startTime,
    tourLocation,
    duration,
    finalCount,
    participants,
    downloadUrl,
    totalRevenue,
    commissionAmount,
    yourEarnings,
  } = data as unknown as TourConfirmedData

  const subject = `${tourName} — All payments received. Tour is confirmed.`
  const previewText = `All ${finalCount} participants have paid. You're fully booked.`

  const participantRows = participants.map(p => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid ${colors.border}; font-size: 14px; color: ${colors.ink};">${p.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid ${colors.border}; font-size: 14px;"><a href="mailto:${p.email}" style="color: ${colors.primary};">${p.email}</a></td>
      <td style="padding: 8px; border-bottom: 1px solid ${colors.border}; font-size: 14px; color: ${colors.inkMuted};">${p.phone || '—'}</td>
      <td style="padding: 8px; border-bottom: 1px solid ${colors.border}; font-size: 14px; color: ${colors.inkSubtle};">${p.trustTier}</td>
    </tr>
  `).join('')

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      All payments received
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${operatorName},
    </p>

    ${highlightBox(`
      <p style="font-size: 16px; color: ${colors.ink}; margin: 0;">
        <strong>All payments have cleared.</strong> ${tourName} on ${tourDate} is fully confirmed.
      </p>
    `)}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Final participant list</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
      <tr style="background-color: ${colors.surfaceSunken};">
        <th style="padding: 12px 8px; text-align: left; font-size: 12px; color: ${colors.inkSubtle}; text-transform: uppercase; letter-spacing: 0.5px;">Name</th>
        <th style="padding: 12px 8px; text-align: left; font-size: 12px; color: ${colors.inkSubtle}; text-transform: uppercase; letter-spacing: 0.5px;">Email</th>
        <th style="padding: 12px 8px; text-align: left; font-size: 12px; color: ${colors.inkSubtle}; text-transform: uppercase; letter-spacing: 0.5px;">Phone</th>
        <th style="padding: 12px 8px; text-align: left; font-size: 12px; color: ${colors.inkSubtle}; text-transform: uppercase; letter-spacing: 0.5px;">Trust</th>
      </tr>
      ${participantRows}
    </table>

    <p style="font-size: 14px; color: ${colors.inkMuted}; margin-bottom: 24px;">
      <a href="${downloadUrl}" style="color: ${colors.primary};">Download this list</a>
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Tour logistics confirmed</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Date:</span>
                <span style="color: ${colors.ink}; float: right;">${tourDate}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Time:</span>
                <span style="color: ${colors.ink}; float: right;">${startTime}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Location:</span>
                <span style="color: ${colors.ink}; float: right;">${tourLocation}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Duration:</span>
                <span style="color: ${colors.ink}; float: right;">${duration}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Final participant count:</span>
                <span style="color: ${colors.primary}; font-weight: 600; float: right;">${finalCount}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Revenue summary</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkSubtle};">Total received:</span>
          <span style="color: ${colors.ink}; float: right;">${formatCurrency(totalRevenue)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkSubtle};">Platform commission (3%):</span>
          <span style="color: ${colors.ink}; float: right;">-${formatCurrency(commissionAmount)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0 4px 0;">
          <span style="color: ${colors.ink}; font-weight: 600;">Your earnings:</span>
          <span style="color: ${colors.primary}; font-weight: 600; float: right;">${formatCurrency(yourEarnings)}</span>
        </td>
      </tr>
    </table>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; line-height: 1.6; margin-bottom: 24px;">
      This amount will be transferred to your account within 5 business days after your tour completes.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Before the tour</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      You should have already contacted participants about meeting point, parking, what to bring, and weather contingencies. If you haven't, reach out now—they're expecting to hear from you.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Day of the tour</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Arrive early. Set up. Greet people as they arrive. Have a great tour.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">After the tour</h2>

    ${infoBox(`
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        Let us know if there are any no-shows or issues. This helps us improve the system.
      </p>
    `)}

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin: 32px 0 24px;">
      <strong style="color: ${colors.ink};">Questions?</strong> Reply to this email.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Best,
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
