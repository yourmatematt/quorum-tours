// =============================================================================
// TOUR CANCELLED EMAIL
// =============================================================================

import { baseTemplate, colors, highlightBox, secondaryButton } from './_base.ts'

interface TourCancelledData {
  firstName: string
  tourName: string
  depositPaid: boolean
  toursUrl: string
}

export function tourCancelledEmail(data: Record<string, unknown>): { subject: string; html: string } {
  const {
    firstName,
    tourName,
    depositPaid,
    toursUrl,
  } = data as unknown as TourCancelledData

  const subject = `${tourName} did not reach quorum`
  const previewText = `The tour didn't get enough commitments to run. Any deposit paid will be refunded.`

  const content = `
    <h1 style="font-size: 28px; color: ${colors.ink}; margin-bottom: 24px;">
      Tour not running
    </h1>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Hi ${firstName},
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      Unfortunately, <strong style="color: ${colors.ink};">${tourName}</strong> did not reach quorum by the deadline. The tour will not run.
    </p>

    <h2 style="font-size: 20px; color: ${colors.ink}; margin: 32px 0 16px;">What now?</h2>

    ${depositPaid ? highlightBox(`
      <p style="font-size: 14px; color: ${colors.ink}; margin: 0;">
        <strong>Your deposit will be refunded in full within 5-7 business days.</strong><br>
        No impact to your account. You can browse other tours and commit whenever you find one that interests you.
      </p>
    `) : `
    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      No impact to your account. You can browse other tours and commit whenever you find one that interests you.
    </p>
    `}

    <div style="text-align: center; margin: 32px 0;">
      ${secondaryButton('Browse Available Tours', toursUrl)}
    </div>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      We understand this is disappointing. Quorum-based booking works best when operators have a solid waiting list and birders know the tours will happen. Sometimes the timing just doesn't align.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 24px;">
      If you have feedback on what would've made you commit to this tour, reach out. We read every message and use it to improve.
    </p>

    <p style="font-size: 16px; color: ${colors.inkMuted}; line-height: 1.6; margin-bottom: 8px;">
      Best,
    </p>

    <p style="font-size: 16px; color: ${colors.ink}; margin-bottom: 24px;">
      The Quorum Team
    </p>

    <p style="font-size: 14px; color: ${colors.inkSubtle}; margin-top: 32px; padding-top: 16px; border-top: 1px solid ${colors.border};">
      P.S. If the operator wants to try again with adjusted dates or pricing, they'll reach out directly. You'll be first to know.
    </p>
  `

  return { subject, html: baseTemplate(content, previewText) }
}
