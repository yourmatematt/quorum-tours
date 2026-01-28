# Email Templates - COMPLETE

**Status:** All 14 core templates built and deployed.

## Location
`supabase/functions/send-email/templates/`

## Templates Built

### User Emails (9)
| File | Trigger |
|------|---------|
| `welcome.ts` | Signup |
| `tour-committed.ts` | Commit to tour |
| `quorum-reached.ts` | Tour hits threshold (24h deadline) |
| `payment-reminder.ts` | 12h before deadline |
| `payment-confirmed.ts` | Balance paid |
| `strike-applied.ts` | Missed deadline |
| `waitlist-spot.ts` | Spot opens |
| `tour-cancelled.ts` | Didn't reach quorum |
| `tour-reminder.ts` | 48h before tour |

### Operator Emails (5)
| File | Trigger |
|------|---------|
| `new-booking.ts` | Someone commits |
| `quorum-reached-operator.ts` | Threshold hit |
| `deposit-forfeited.ts` | User missed deadline |
| `tour-confirmed.ts` | All paid |
| `payout-sent.ts` | Earnings transferred |

### Base Template
| File | Purpose |
|------|---------|
| `_base.ts` | Shared styling, header, footer |

## Future (Not Essential for Launch)
- Reengagement emails (30d, 90d, 180d, 365d inactive)
- These can be added post-launch

## Configuration Required
```bash
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set EMAIL_FROM=tours@quorumtours.com
```
