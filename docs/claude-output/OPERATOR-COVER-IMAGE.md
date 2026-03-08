# Build Report — OPERATOR-COVER-IMAGE

**Date:** 2026-03-08

## Summary

LinkedIn-style cover/banner image for operator profiles. Full-width banner with profile photo overlapping the bottom edge. Upload support in both operator and admin dashboards.

## Architecture

- **Storage:** `operator-covers` Supabase Storage bucket (10MB, jpeg/png/webp)
- **DB column:** `operators.hero_image_url` (already existed, now wired)
- **Output:** 1920x400px cropped image via rectangular crop modal

## Files Created

### `supabase/migrations/20260308000003_operator_covers_bucket.sql`
- Creates `operator-covers` public bucket with 10MB limit
- RLS policies: authenticated upload/update/delete, public read

### `src/app/api/operator/cover/route.ts`
- POST: upload cropped cover to storage, update `hero_image_url`
- DELETE: remove cover from storage, clear `hero_image_url`
- Uses same `getOperatorForUser()` pattern (operator_members → linked_operator_id)

### `src/app/api/admin/operators/cover/route.ts`
- POST: admin endpoint for uploading cover on behalf of operators
- Verifies admin role, accepts `operatorId` in FormData

### `src/components/operator/profile/CoverImageCropModal.tsx`
- Rectangular crop modal (16:10 canvas, 1920x400 output)
- Drag-to-reposition, zoom slider, dimmed overlay outside crop area
- WebP with JPEG fallback for Safari

## Files Modified

### `src/components/ui/OperatorHero.tsx`
- Added `coverImage?: string` prop
- New layout: cover banner → overlapping photo + name/badges → metadata + tagline
- Banner: `h-[140px]` mobile, `h-[180px]` tablet, `h-[220px]` desktop
- Profile photo overlaps banner bottom with white border ring and card shadow
- Gradient placeholder when no cover image

### `src/app/operators/[id]/page.tsx`
- Added `hero_image_url` to `OperatorRow` interface
- Passes `coverImage={operator.hero_image_url}` to `OperatorHero`

### `src/components/operator/profile/ProfileView.tsx`
- Added `CoverImageCropModal` import
- Added `coverUrl` prop to `PublicProfileTab`
- Cover upload section with preview strip, upload/change/remove buttons
- 10MB limit, same file type validation

### `src/app/admin/operators/[id]/page.tsx`
- Added `CoverImageCropModal` import and `AdminCoverUpload` component
- Added `hero_image_url` to form state and save payload
- Cover upload field in edit form

### `src/app/api/admin/operators/[id]/route.ts`
- Added `hero_image_url` to `ALLOWED_COLUMNS` whitelist

## Validation

- [x] Cover banner renders on public operator profile
- [x] Profile photo overlaps bottom of banner (LinkedIn pattern)
- [x] Gradient placeholder shown when no cover image
- [x] Rectangular crop modal works with zoom + drag
- [x] Upload works from operator dashboard
- [x] Upload works from admin dashboard
- [x] Delete/remove clears cover image
- [x] Migration applied to remote database
- [x] TypeScript typecheck passes clean
