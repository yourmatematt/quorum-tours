# Build Report — TOUR-PAGE-FIXES-02

## Summary

Fixed three issues on the tour detail page and across the codebase: incorrect deposit language, hardcoded cancellation policy, and missing operator photo.

---

## Task 1: Fix Deposit Language

**Problem:** Multiple locations stated deposits are "held, not charged" — factually incorrect. Deposits ARE charged immediately.

### Files Changed

| File | Change |
|---|---|
| `src/components/join/PaymentSection.tsx` | "held but NOT charged" → "Your deposit is charged now" |
| `src/components/how-it-works/TrustStrip.tsx` | "Deposits held, not charged, until confirmed" → "Deposit charged now — full refund if tour doesn't run" |
| `src/components/home/TrustSection.tsx` | "No charge until confirmed" / "not charged until quorum" → "Deposit refunded if tour doesn't run" |
| `src/components/for-operators/HowItWorks.tsx` | Step 2 description: "card is held—not charged" → "deposit is charged — fully refunded if tour doesn't run" |
| `src/components/for-operators/HowItWorks.tsx` | Example label: "cards held, not charged" → "deposits charged, refundable" |
| `src/app/tours/[id]/join/success/page.tsx` | "deposit is held securely" → "deposit has been charged" |
| `src/app/terms/page.tsx` | "authorised but not charged until threshold" → "deposit is charged immediately" + "fully refunded" |
| `docs/site-docs/terms-of-service.md` | Same terms update as above |
| `src/components/join/InterestForm.tsx` | Comment: "No payment until tour confirms" → "Trusted members commit without deposit" |
| `src/app/tours/[id]/page.tsx` | FAQ answer: "cancelled with no charge" → "cancelled and your deposit is fully refunded" |

### Not Changed (non-source files)

- `EXPLAINER-VIDEOS.md` — video scripts, not live content
- `research/` — research docs, not user-facing
- `ralph/` — PRD docs
- `docs/claude-output/` — build reports
- `docs/context/` — research synthesis

These contain legacy "held, not charged" language but are reference/planning documents, not deployed code.

---

## Task 2: Remove Hardcoded Cancellation Policy

**Problem:** Tour page logistics section displayed a hardcoded cancellation policy not set by operators.

**Fix:** Removed the entire cancellation policy block from `generateLogistics()` in `src/app/tours/[id]/page.tsx`. No `cancellation_policy` column exists on the tours table, so the block is simply removed — no policy will display until operators can set their own.

---

## Task 3: Operator Photo in Your Guide Card

**Problem:** Your Guide card showed placeholder SVG avatar instead of operator's actual photo.

**Fix:**
1. Added `logo_url` to the operator select query in `src/lib/supabase/useTours.ts`
2. Added `operatorPhoto` field to tour mapping in `src/app/tours/[id]/page.tsx`
3. Updated Your Guide card to render `<Image>` with circular crop when `logo_url` exists, falling back to SVG placeholder when null

---

## Validation Checklist

- [x] No instance of "held, not charged" or "not charged until" in any source file (`src/`, `docs/site-docs/`)
- [x] Deposit language is consistent and accurate across all pages, components, and templates
- [x] Hardcoded cancellation policy block removed from tour page logistics
- [x] Your Guide card renders operator photo from `logo_url`
- [x] Your Guide card falls back to placeholder SVG if `logo_url` is null
- [x] TypeScript compiles cleanly (`tsc --noEmit` passes)
