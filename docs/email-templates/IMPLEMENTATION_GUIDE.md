# Email Implementation Quick Reference

## Email Trigger Map

Use this to wire up email sends in your backend.

| Email ID | Trigger Event | Recipient(s) | Timing | Priority |
|----------|---------------|--------------|--------|----------|
| welcome | User completes signup | User | Immediately | High |
| tour_committed | User clicks commit on a forming tour | User | Immediately | High |
| quorum_reached | Tour reaches quorum at [COMMITMENT_DEADLINE] | All committed users | Immediately | **Critical** |
| payment_reminder | 12 hours before [DEADLINE_DATETIME] | Users who committed but didn't pay | Scheduled | High |
| payment_confirmed | Stripe webhook: charge.succeeded | User | Immediately | Critical |
| strike_applied | Payment deadline passes without charge | User | Immediately | Critical |
| waitlist_spot | Committed user cancels and spot opens | Waitlist #1 user | Immediately | High |
| tour_cancelled | [COMMITMENT_DEADLINE] passes, quorum not reached | All committed users | Scheduled (end of day) | High |
| tour_reminder | 48 hours before [TOUR_DATE] at [START_TIME] | Confirmed participants | Scheduled | Medium |
| new_booking | User commits to operator's tour | Operator | Immediately | Medium |
| quorum_reached_operator | Tour reaches quorum | Operator | Immediately | Critical |
| deposit_forfeited | Payment deadline passes for committed user | Operator | Immediately | Critical |
| tour_confirmed | All committed participants have paid | Operator | Immediately | Critical |
| payout_sent | Tour date has passed + payments cleared | Operator | Scheduled (1-2 days post-tour) | Medium |

---

## Database Fields Required for Each Email

### User/Birder Level
- `first_name`
- `email`
- `account_created_date`
- `trust_tier` (enum: NEW, TRUSTED, STRIKE_1, STRIKE_2, SUSPENDED)
- `strikes_count`

### Tour Level
- `tour_id`
- `tour_name`
- `tour_date`
- `tour_time` (start time)
- `tour_location`
- `tour_duration`
- `tour_price` (decimal)
- `quorum` (minimum participants)
- `commitment_deadline` (date/time when tour confirms or closes)
- `status` (enum: FORMING, CONFIRMED, CANCELLED, COMPLETED)

### Commitment/Booking Level
- `booking_id`
- `user_id`
- `tour_id`
- `commitment_date`
- `deposit_amount` (decimal, can be NULL)
- `balance_due` (decimal)
- `payment_deadline` (date/time, 24 hours after quorum)
- `status` (enum: COMMITTED, PAID, FORFEITED, CANCELLED)
- `payment_method_token` (for authorization)

### Operator/Guide Level
- `operator_id`
- `operator_name`
- `operator_email`
- `operator_phone`
- `tour_id`
- `participant_count_current`
- `participant_count_quorum`
- `deposit_amount_new_users` (operator-set)
- `total_revenue`
- `platform_commission` (always 3%)
- `operator_earnings`

### Waitlist Level
- `waitlist_position` (1, 2, 3...)
- `user_id`
- `tour_id`
- `waitlist_claim_deadline` (24 hours from offer)

---

## Template Rendering Checklist

For each email template, ensure your email service (SendGrid, Mailgun, etc.) can:

- [ ] Parse `[PLACEHOLDER]` syntax and replace with dynamic content
- [ ] Format currency values with $ and 2 decimal places
- [ ] Format dates as "Month DD, YYYY" (e.g., "March 15, 2026")
- [ ] Format datetimes as "Month DD, YYYY at H:MM AM/PM" (e.g., "March 10, 2026 at 2:15 PM")
- [ ] Generate clickable links from `[LINK_NAME]` placeholders
- [ ] Render bold text (use `**text**` or `<strong>text</strong>`)
- [ ] Handle line breaks and paragraph spacing correctly
- [ ] Render tables (if your ESP supports it, for `tour_confirmed`)

---

## Key Content Mappings

### Deposit Amount Logic
```
if (user.trustTier === 'NEW' || user.trustTier === 'STRIKE_1') {
  deposit = tour.operatorSetDeposit || '$0'
} else if (user.trustTier === 'STRIKE_2') {
  deposit = (tour.price * 0.5).toFixed(2)
} else if (user.trustTier === 'TRUSTED') {
  deposit = '$0'
}
```

### Balance Due Logic
```
balanceDue = (tour.price - deposit).toFixed(2)
```

### Platform Commission (Always 3%)
```
platformFee = (total * 0.03).toFixed(2)
operatorEarnings = (total - platformFee).toFixed(2)
```

### Payment Deadline
```
paymentDeadline = quorumReachedDatetime + 24 hours
```

### Strike Consequences
```
if (missedPayment) {
  user.strikes += 1
  if (user.strikes === 1) {
    nextBookingDeposit = 'operator-set'
  } else if (user.strikes === 2) {
    nextBookingDeposit = '50% of tour price'
  } else if (user.strikes >= 3) {
    user.status = 'SUSPENDED'
    user.canBook = false
  }
}
```

---

## Testing Strategy

### Unit Test Template Rendering
```javascript
// Test each email with sample data
const testData = {
  welcome: {
    firstName: 'Alice',
    email: 'alice@example.com'
  },
  tour_committed: {
    firstName: 'Alice',
    tourName: 'Spring Warblers at Oak Ridge',
    tourDate: 'March 15, 2026',
    commitmentDeadline: 'March 12, 2026 at 5:00 PM',
    quorumNumber: 6,
    currentCommits: 2,
    spotsRemaining: 4,
    depositAmount: '$25.00'
  },
  // ... etc
}
```

### Integration Test Email Flow
1. Create test tour (quorum: 3)
2. User 1 commits → Verify `tour_committed` sent
3. User 2 commits → Verify `tour_committed` sent
4. User 3 commits → Verify `quorum_reached` sent to all 3 users + operator
5. User 1 doesn't pay by deadline → Verify `strike_applied` and `deposit_forfeited` sent
6. User 2 pays → Verify `payment_confirmed` sent
7. Waitlist user claims spot → Verify `waitlist_spot_claimed` sent + tour updated
8. After tour date → Verify `payout_sent` sent to operator

### Manual QA Checklist
For each email:
- [ ] Subject line appears correctly in inbox preview
- [ ] Preview text is visible and makes sense
- [ ] All placeholders are replaced with actual data
- [ ] Links are clickable and go to correct destination
- [ ] Dates/times are formatted consistently
- [ ] Currency amounts have $ and 2 decimal places
- [ ] Bold formatting is visible
- [ ] Email is readable on mobile (375px width)
- [ ] No spelling/grammar errors
- [ ] Tone is consistent with guidelines
- [ ] No HTML rendering issues (formatting issues)
- [ ] Footer is clean and professional

---

## Common Placeholder Values

### Dates/Times
Use these formats consistently throughout:

**Dates:**
- `[TOUR_DATE]` → "March 15, 2026"
- `[COMMITMENT_DEADLINE]` → "March 12, 2026"

**Date + Time:**
- `[DEADLINE_DATETIME]` → "March 10, 2026 at 2:15 PM"
- `[PAYMENT_DEADLINE_DATETIME]` → "March 10, 2026 at 2:15 PM"

**Relative time references:**
- "24 hours" (use exact time instead in critical emails)
- "48 hours before tour" (acceptable for non-critical reminders)

### Amounts
Always include currency symbol and 2 decimal places:
- `[TOUR_PRICE]` → "$189.00"
- `[DEPOSIT_AMOUNT]` → "$25.00"
- `[BALANCE_DUE]` → "$164.00"
- `[COMMISSION_AMOUNT]` → "$5.67"
- `[EARNINGS_AMOUNT]` → "$183.33"

### Numbers
Always use words or numerals consistently:
- `[QUORUM_NUMBER]` → "6" (numeral, not "six")
- `[CURRENT_COMMITS]` → "4" (numeral)
- `[REMAINING_SPOTS]` → "2" (numeral)
- `[FINAL_COUNT]` → "8" (numeral)

### Links
Provide specific link types:
- `[PAYMENT_LINK]` → Direct link to payment processing
- `[TOURS_LINK]` → Link to browse tours
- `[PARTICIPANT_LIST_LINK]` → Link to full participant list (operators only)
- `[DASHBOARD_LINK]` → Link to user/operator dashboard
- `[CLAIM_LINK]` → Direct link to claim waitlist spot
- `[APPEAL_FORM_LINK]` → Link to strike appeal form
- `[FAQ]` or `[SUPPORT_EMAIL]` → Help resources

---

## ESP Configuration

### SendGrid Template Setup
```
Template ID: [EMAIL_ID]
Subject: [As defined in template file]
Preview Text: [As defined in template file]
Body: [As defined in template file]
```

### Substitution Tags (SendGrid example)
```
-name → {{firstName}}
-tour_name → {{tourName}}
-tour_date → {{tourDate}}
-deadline_datetime → {{deadlineDatetime}}
-payment_link → {{paymentLink}}
```

### Scheduling
- `tour_cancelled` → Scheduled for end of day on commitment deadline
- `payment_reminder` → Scheduled 12 hours before deadline
- `tour_reminder` → Scheduled 48 hours before tour
- `payout_sent` → Scheduled 1-2 business days after tour completion

---

## Compliance Notes

### GDPR/CCPA Compliance
- All emails should include unsubscribe option (though transactional emails are exempt)
- Store consent records for non-transactional emails separately
- Include "Why did I receive this?" context for clarity

### Email Best Practices
- From address: `[noreply@quorum-tours.com]` for transactional
- Reply-to: `[support@quorum-tours.com]` for user support
- List-Unsubscribe header: Include for all emails
- DKIM/SPF/DMARC: Properly configured before launch

### Accessibility
- Email content must be readable in dark mode
- Alt text for any images
- High contrast text (not light gray on white)
- Semantic HTML structure

---

## Monitoring & Analytics

Track these metrics for each email type:
- **Delivery rate** (% successfully delivered)
- **Open rate** (% opened within 24 hours)
- **Click rate** (% clicked relevant link)
- **Bounce rate** (hard/soft bounces)
- **Spam complaint rate** (should be <0.1%)
- **Unsubscribe rate** (should be low for transactional)

### Alerts
Set up alerts for:
- Delivery failures (>5% bounce rate)
- High spam complaint rate
- Missing recipient data (placeholder not rendered)

---

## Future Enhancements

These templates are v1.0. Potential future improvements:
- A/B test subject lines on high-volume emails
- Personalization (past booking history, preferences)
- Localization (other languages/regions)
- SMS fallback for critical deadlines (24-hour payment)
- In-app notifications alongside email

---

**Last Updated:** 2026-01-25
**Version:** 1.0
**Maintainer:** Content & Product Teams
