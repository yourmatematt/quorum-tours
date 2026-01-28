# Email Share URLs Implementation Guide

When rendering share buttons in emails, use these URL patterns with proper encoding.

## Share URL Patterns

### X (Twitter)
```
https://twitter.com/intent/tweet?text=[ENCODED_TEXT]&url=[ENCODED_TOUR_URL]
```

**Text template:**
```
Heading out [TOUR_DATE] to spot [TARGET_SPECIES] at [TOUR_LOCATION] with [OPERATOR_NAME]. Need [SPOTS_REMAINING] more people.
```

### Facebook
```
https://www.facebook.com/sharer/sharer.php?u=[ENCODED_TOUR_URL]&quote=[ENCODED_TEXT]
```

**Text template:**
```
I'm joining [OPERATOR_NAME]'s [TOUR_NAME] tour on [TOUR_DATE] at [TOUR_LOCATION], and [SPOTS_REMAINING] more people are welcome. We're looking for [TARGET_SPECIES]. Details here:
```

### WhatsApp
```
https://wa.me/?text=[ENCODED_FULL_MESSAGE]
```

**Text template (include URL in message):**
```
Hey, joining a birding tour [TOUR_DATE] at [TOUR_LOCATION] with [OPERATOR_NAME]. We're tracking [TARGET_SPECIES]. Need [SPOTS_REMAINING] more for it to run. You keen? [TOUR_URL]
```

### Email (mailto)
```
mailto:?subject=[ENCODED_SUBJECT]&body=[ENCODED_BODY]
```

**Subject:**
```
Join us for [TOUR_NAME] on [TOUR_DATE]
```

**Body:**
```
Hi,

I'm heading out on a birding tour [TOUR_DATE] at [TOUR_LOCATION] and thought you might be interested.

The tour is led by [OPERATOR_NAME] and we're specifically looking to see [TARGET_SPECIES].

We just need [SPOTS_REMAINING] more people to confirm. If you're keen: [TOUR_URL]

Cheers
```

## HTML Button Examples for Emails

```html
<!-- Share buttons row -->
<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
  <tr>
    <!-- X Button -->
    <td style="padding-right: 8px;">
      <a href="[X_SHARE_URL]"
         style="display: inline-block; padding: 10px 16px; background: #000; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px;">
        Share on X
      </a>
    </td>

    <!-- Facebook Button -->
    <td style="padding-right: 8px;">
      <a href="[FACEBOOK_SHARE_URL]"
         style="display: inline-block; padding: 10px 16px; background: #1877F2; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px;">
        Facebook
      </a>
    </td>

    <!-- WhatsApp Button -->
    <td style="padding-right: 8px;">
      <a href="[WHATSAPP_SHARE_URL]"
         style="display: inline-block; padding: 10px 16px; background: #25D366; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px;">
        WhatsApp
      </a>
    </td>

    <!-- Email Button -->
    <td>
      <a href="[MAILTO_URL]"
         style="display: inline-block; padding: 10px 16px; background: #666; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px;">
        Email
      </a>
    </td>
  </tr>
</table>
```

## Edge Function Helper

```typescript
// In your send-email Edge Function
function buildShareUrls(tour: {
  name: string;
  date: string;
  location: string;
  operatorName: string;
  targetSpecies: string;
  spotsRemaining: number;
  url: string;
}) {
  const spotsText = tour.spotsRemaining === 1
    ? '1 more person'
    : `${tour.spotsRemaining} more people`;

  // X
  const xText = `Heading out ${tour.date} to spot ${tour.targetSpecies} at ${tour.location} with ${tour.operatorName}. Need ${spotsText}.`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(tour.url)}`;

  // Facebook
  const fbText = `I'm joining ${tour.operatorName}'s ${tour.name} tour on ${tour.date} at ${tour.location}, and ${spotsText} are welcome. We're looking for ${tour.targetSpecies}. Details here:`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tour.url)}&quote=${encodeURIComponent(fbText)}`;

  // WhatsApp
  const waText = `Hey, joining a birding tour ${tour.date} at ${tour.location} with ${tour.operatorName}. We're tracking ${tour.targetSpecies}. Need ${spotsText} for it to run. You keen? ${tour.url}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;

  // Email
  const emailSubject = `Join us for ${tour.name} on ${tour.date}`;
  const emailBody = `Hi,

I'm heading out on a birding tour ${tour.date} at ${tour.location} and thought you might be interested.

The tour is led by ${tour.operatorName} and we're specifically looking to see ${tour.targetSpecies}.

We just need ${spotsText} to confirm. If you're keen: ${tour.url}

Cheers`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return { xUrl, fbUrl, waUrl, emailUrl };
}
```

## Notes

- All text must be URL-encoded when building the share URLs
- WhatsApp includes the tour URL in the message body (not as a separate parameter)
- Email uses `mailto:` protocol which opens user's default email client
- Facebook's `quote` parameter pre-fills the share dialog but user can edit
- X enforces 280 char limit - keep text under 180 to leave room for URL
