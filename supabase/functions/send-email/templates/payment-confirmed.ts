// =============================================================================
// PAYMENT CONFIRMED EMAIL
// =============================================================================

import { baseTemplate, colors, formatCurrency, infoBox, highlightBox } from './_base.ts'

interface PaymentConfirmedData {
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
  operatorInstructions: string
  tourPrice: number
  amountPaid: number
  transactionId: string
  paymentDateTime: string
}

export function paymentConfirmedEmail(data: Record<string, unknown>): { subject: string; html: string } {
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
    operatorInstructions,
    tourPrice,
    amountPaid,
    transactionId,
    paymentDateTime,
  } = data as unknown as PaymentConfirmedData

  const subject = `Your booking is confirmed — ${tourName}`
  const previewText = `Payment received. You're all set for ${tourDate}. Here's what to know.`

  const bringListHtml = bringList && bringList.length > 0
    ? bringList.map(item => `<li style="color: ${colors.inkMuted}; padding: 4px 0;">${item}</li>`).join('')
    : `<li style="color: ${colors.inkMuted}; padding: 4px 0;">Your guide will send details closer to the date</li>`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Your booking is confirmed
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    ${highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">
        <strong>Payment received:</strong> ${paymentDateTime}
      </p>
    `)}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Tour details</h2>

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

    ${operatorInstructions ? `
    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What happens next</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Check in with your guide 15 minutes early. ${operatorInstructions}
    </p>
    ` : `
    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What happens next</h2>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Check in with your guide 15 minutes early. Your guide will send specific meeting point details closer to the date.
    </p>
    `}

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Operator contact</h2>

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

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">Your booking</h2>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkSubtle};">Tour cost:</span>
          <span style="color: ${colors.ink}; float: right;">${formatCurrency(tourPrice)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid ${colors.border};">
          <span style="color: ${colors.inkSubtle};">Amount paid:</span>
          <span style="color: ${colors.ink}; float: right;">${formatCurrency(amountPaid)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <span style="color: ${colors.inkSubtle};">Transaction ID:</span>
          <span style="color: ${colors.ink}; font-family: monospace; font-size: 13px; float: right;">${transactionId}</span>
        </td>
      </tr>
    </table>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      We're excited you're joining this tour. Questions before the date? Reach out to your guide directly—they know the location and logistics best.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Safe birding,
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; margin-top: 32px; padding-top: 16px; border-top: 1px solid ${colors.border};">
      P.S. Leave early on the day of your tour. Parking and trail navigation often take longer than expected.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
