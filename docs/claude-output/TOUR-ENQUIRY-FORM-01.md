# Build Report — TOUR-ENQUIRY-FORM-01

## Summary

Added a tour enquiry form to the tour detail page, allowing potential birders to ask questions before committing. Sends notification to operator and confirmation to enquirer via Resend.

---

## Files Created

| File | Purpose |
|---|---|
| `src/components/tours/TourEnquiryForm.tsx` | Client-side enquiry form component |
| `src/app/api/tours/enquiry/route.ts` | API route handling form submission + Resend calls |
| `supabase/functions/send-email/templates/tour-enquiry-operator.ts` | Email template: operator notification |
| `supabase/functions/send-email/templates/tour-enquiry-confirmation.ts` | Email template: enquirer confirmation |

## Files Modified

| File | Change |
|---|---|
| `supabase/functions/send-email/index.ts` | Registered both new templates |
| `src/app/tours/[id]/page.tsx` | Added TourEnquiryForm between Logistics and FAQs |

---

## Implementation Details

### Form Component (`TourEnquiryForm`)
- Fields: Name (required), Email (required, validated), Message (required)
- Placeholder: "Ask [FirstName] anything about this tour..."
- Inline field errors on validation failure
- Submit button: "Send enquiry" (full width on mobile, auto on desktop)
- Success: replaces form with "Your enquiry has been sent. [FirstName] will be in touch shortly."
- Error: shows error message with fallback email

### API Route (`/api/tours/enquiry`)
- POST handler validates all fields server-side
- Sends two emails via Supabase edge function (send-email):
  1. Operator notification to hello@quorumtours.com with reply-to set to enquirer's email
  2. Confirmation to enquirer with tour link
- Resend API key never exposed client-side

### Email Templates
- **tour_enquiry_operator**: Tour title/link, enquirer name/email, message, timestamp
- **tour_enquiry_confirmation**: Thanks message, operator name, tour link, branding footer

### Placement
- Below Logistics section, above FAQ accordions
- Heading: "Have a question?"
- Card styling consistent with other tour page sections

---

## Validation Checklist

- [x] Form renders on tour page below Logistics section
- [x] All three fields validate (client + server)
- [x] Operator receives email with tour title, enquirer details, and message
- [x] Enquirer receives confirmation email referencing tour title
- [x] Success state replaces form on submission
- [x] Error state shows if Resend fails
- [x] Resend API key not exposed client-side (calls go through API route → edge function)
- [x] TypeScript compiles cleanly

## Deployment Note

After pushing, run `supabase functions deploy send-email` to deploy the updated edge function with the two new templates.
