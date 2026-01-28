// =============================================================================
// TOUR REMINDER EMAIL
// =============================================================================

import { baseTemplate, colors, infoBox } from './_base.ts'

interface TourReminderData {
  firstName: string
  tourName: string
  tourDate: string
  startTime: string
  tourLocation: string
  duration: string
  operatorName: string
  operatorEmail: string
  operatorPhone: string
  bringList: string[]
  parkingDetails: string
  weatherForecastUrl: string
}

export function tourReminderEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    tourDate,
    startTime,
    tourLocation,
    duration,
    operatorName,
    operatorEmail,
    operatorPhone,
    bringList,
    parkingDetails,
    weatherForecastUrl,
  } = data as unknown as TourReminderData

  const subject = `Your tour is in 2 days — ${tourName}`
  const previewText = `Quick reminder: ${tourDate} at ${startTime}. Here's what to know.`

  const bringListHtml = bringList && bringList.length > 0
    ? bringList.map(item => `<li style="color: ${colors.inkMuted}; padding: 4px 0;">${item}</li>`).join('')
    : `<li style="color: ${colors.inkMuted}; padding: 4px 0;">Your guide will confirm closer to the date</li>`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Tour in 2 days
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Your tour is 48 hours away. Here's everything you need:
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">The basics</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Tour:</span>
                <span style="color: ${colors.ink}; font-weight: 600; float: right;">${tourName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Date:</span>
                <span style="color: ${colors.ink}; float: right;">${tourDate}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: ${colors.inkSubtle};">Time:</span>
                <span style="color: ${colors.ink}; float: right;">${startTime} (arrive 15 minutes early)</span>
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
                <span style="color: ${colors.inkSubtle};">Guide:</span>
                <span style="color: ${colors.ink}; float: right;">${operatorName}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What to bring</h2>

    <ul style="margin: 0 0 24px 0; padding-left: 20px;">
      ${bringListHtml}
    </ul>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Weather</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      <a href="${weatherForecastUrl}" style="color: ${colors.primary};">Check the forecast</a> before you go and dress accordingly.
    </p>

    ${parkingDetails ? `
    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Parking & directions</h2>

    ${infoBox(`
      <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 0;">
        ${parkingDetails}
      </p>
    `)}
    ` : ''}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Questions?</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Contact your guide directly:
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 16px; color: ${colors.ink}; font-weight: 600; margin: 0 0 8px 0;">${operatorName}</p>
          <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 4px 0;">
            <a href="mailto:${operatorEmail}" style="color: ${colors.primary};">${operatorEmail}</a>
          </p>
          ${operatorPhone ? `
          <p style="font-size: 14px; color: ${colors.inkMuted}; margin: 4px 0;">
            <a href="tel:${operatorPhone}" style="color: ${colors.primary};">${operatorPhone}</a>
          </p>
          ` : ''}
        </td>
      </tr>
    </table>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      They know the site better than anyone and can answer last-minute logistics questions.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Looking forward to seeing you there. Have a great tour.
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
