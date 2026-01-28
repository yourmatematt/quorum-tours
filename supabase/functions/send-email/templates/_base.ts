// =============================================================================
// BASE EMAIL TEMPLATE - Quorum Tours
// =============================================================================

// Brand colors
const colors = {
  primary: '#2E8B57',        // Forest green
  primaryLight: '#E8F5EE',   // Mint background
  accent: '#D4A84B',         // Gold
  ink: '#1A1A1A',
  inkMuted: '#4A4A4A',
  inkSubtle: '#6B6B6B',
  surface: '#FFFFFF',
  surfaceSunken: '#F5F5F0',
  border: '#E0DED8',
}

// Base email wrapper
export function baseTemplate(content: string, previewText: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Quorum Tours</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset */
    body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }

    /* Typography */
    body, td { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    h1, h2, h3 { font-family: 'Crimson Pro', Georgia, 'Times New Roman', serif; font-weight: 600; margin: 0 0 16px 0; }

    /* Links */
    a { color: ${colors.primary}; text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* Buttons */
    .button {
      display: inline-block;
      padding: 14px 28px;
      background-color: ${colors.accent};
      color: ${colors.ink} !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      text-align: center;
    }
    .button:hover { opacity: 0.9; }

    .button-secondary {
      background-color: ${colors.surface};
      border: 2px solid ${colors.border};
      color: ${colors.ink} !important;
    }

    /* Mobile */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 16px !important; }
      .content { padding: 24px 16px !important; }
      h1 { font-size: 24px !important; }
      h2 { font-size: 20px !important; }
      .button { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.surfaceSunken};">
  <!-- Preview text -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${previewText}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Email container -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!-- Content wrapper -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width: 600px; background-color: ${colors.surface}; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px; border-bottom: 1px solid ${colors.border};">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <span style="font-family: 'Crimson Pro', Georgia, serif; font-size: 24px; font-weight: 600; color: ${colors.primary};">Quorum Tours</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content" style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: ${colors.surfaceSunken}; border-top: 1px solid ${colors.border};">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-size: 13px; color: ${colors.inkSubtle}; line-height: 1.6;">
                    <p style="margin: 0 0 8px 0;">
                      <a href="https://quorumtours.com" style="color: ${colors.inkSubtle};">quorumtours.com</a>
                    </p>
                    <p style="margin: 0;">
                      Questions? Reply to this email or contact <a href="mailto:support@quorumtours.com">support@quorumtours.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

// Utility: Format currency
export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

// Utility: Primary button
export function primaryButton(text: string, url: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="${url}" class="button" style="display: inline-block; padding: 14px 28px; background-color: ${colors.accent}; color: ${colors.ink}; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">${text}</a>
        </td>
      </tr>
    </table>
  `
}

// Utility: Secondary button
export function secondaryButton(text: string, url: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="${url}" class="button button-secondary" style="display: inline-block; padding: 12px 24px; background-color: ${colors.surface}; border: 2px solid ${colors.border}; color: ${colors.ink}; text-decoration: none; font-weight: 500; font-size: 14px; border-radius: 8px;">${text}</a>
        </td>
      </tr>
    </table>
  `
}

// Utility: Info box
export function infoBox(content: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.surfaceSunken}; border-radius: 8px; margin: 24px 0;">
      <tr>
        <td style="padding: 20px;">
          ${content}
        </td>
      </tr>
    </table>
  `
}

// Utility: Highlight box (for important info)
export function highlightBox(content: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.primaryLight}; border-left: 4px solid ${colors.primary}; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <tr>
        <td style="padding: 20px;">
          ${content}
        </td>
      </tr>
    </table>
  `
}

// Utility: Warning box
export function warningBox(content: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FEF3E2; border-left: 4px solid #D4A84B; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <tr>
        <td style="padding: 20px;">
          ${content}
        </td>
      </tr>
    </table>
  `
}

// Utility: Share buttons for emails
export function shareButtons(tour: {
  name: string
  date: string
  location: string
  operatorName: string
  targetSpecies: string
  spotsNeeded: number
  url: string
}): string {
  const spotsText = tour.spotsNeeded === 1 ? '1 more person' : `${tour.spotsNeeded} more people`

  // X
  const xText = `Heading out ${tour.date} to spot ${tour.targetSpecies} at ${tour.location} with ${tour.operatorName}. Need ${spotsText}.`
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(tour.url)}`

  // Facebook
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tour.url)}`

  // WhatsApp
  const waText = `Hey, joining a birding tour ${tour.date} at ${tour.location} with ${tour.operatorName}. We're tracking ${tour.targetSpecies}. Need ${spotsText} for it to run. You keen? ${tour.url}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`

  // Email
  const emailSubject = `Join us for ${tour.name} on ${tour.date}`
  const emailBody = `Hi,\n\nI'm heading out on a birding tour ${tour.date} at ${tour.location} and thought you might be interested.\n\nThe tour is led by ${tour.operatorName} and we're specifically looking to see ${tour.targetSpecies}.\n\nWe just need ${spotsText} to confirm. If you're keen: ${tour.url}\n\nCheers`
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 16px 0;">
      <tr>
        <td style="padding-right: 8px;">
          <a href="${xUrl}" style="display: inline-block; padding: 10px 16px; background: #000; color: #fff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">X</a>
        </td>
        <td style="padding-right: 8px;">
          <a href="${fbUrl}" style="display: inline-block; padding: 10px 16px; background: #1877F2; color: #fff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">Facebook</a>
        </td>
        <td style="padding-right: 8px;">
          <a href="${waUrl}" style="display: inline-block; padding: 10px 16px; background: #25D366; color: #fff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">WhatsApp</a>
        </td>
        <td>
          <a href="${emailUrl}" style="display: inline-block; padding: 10px 16px; background: #666; color: #fff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">Email</a>
        </td>
      </tr>
    </table>
  `
}

// Color exports for templates
export { colors }
