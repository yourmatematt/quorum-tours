# Profile Dashboard Redesign - January 2026

## Summary

Complete redesign of the `/profile` page (Birder Dashboard / My Account) following design spec and reference image.

## Changes Made

### 1. ProfileHeader.tsx - Compact Inline Header
- Removed full-width card with excessive whitespace
- Now: Avatar + name/member-since LEFT, trust badge RIGHT
- Trust badge: shield icon with checkmark, green tint background for "Trusted" tier
- No separate TrustStatusCard - trust status lives in header

### 2. EnhancedTourCard.tsx - Quorum as Centrepiece
- Top 1px accent stripe: green (confirmed) / amber (forming)
- Tour name in Fraunces display serif at larger scale
- QUORUM PROGRESS section with:
  - Uppercase label
  - Large Fraunces numeral for days countdown
  - Dot visualization (filled dots larger with glow, unfilled smaller with border)
  - Progress text ("8/12 · Running" or "4/6 to run")
- Payment status as colored text
- Fellow travelers avatar row
- Collapsed "Target species & actions" section (default collapsed)
- Card hover: border-color + colored shadow (NO lift+shadow)

### 3. ChaseListSection.tsx - Primary Sidebar Element
- Green-tinted header bar with crosshair/target icon
- Species count in dark green pill + Edit link
- Matched species (isMatched: true) get green background highlight + dot indicator
- State tags with color-coded backgrounds:
  - NT = amber
  - NSW = blue
  - VIC = purple
  - QLD = pink
  - SA = orange
  - WA = cyan
  - TAS = emerald
  - ACT = indigo
- "+ Add species to your chase list" CTA at bottom

### 4. ChaseListMatchAlert.tsx - NEW Component
- Amber alert card below chase list
- Bell icon + "Chase List Match" heading
- Shows when chase list species matches a booked tour

### 5. SettingsSection.tsx - Demoted to Bottom
- Minimal list style
- Small uppercase "ACCOUNT" header
- Profile, Email & Password, Notifications links
- Sign out at bottom

### 6. Profile Page Layout
- UPCOMING TOURS label (uppercase, tracking-wide) + "Browse more →" link
- Tour cards on left (8/12 cols)
- Past Tours collapsed below tour cards (left column)
- Right sidebar (4/12 cols): Chase List, Match Alert, Account

## Files Modified
- `src/components/profile/ProfileHeader.tsx` - Complete rewrite
- `src/components/profile/EnhancedTourCard.tsx` - Complete rewrite
- `src/components/profile/ChaseListSection.tsx` - Complete rewrite
- `src/components/profile/ChaseListMatchAlert.tsx` - NEW
- `src/components/profile/SettingsSection.tsx` - Styling updates
- `src/components/profile/index.ts` - Added ChaseListMatchAlert export
- `src/app/profile/page.tsx` - Layout restructure

## Design Compliance
- Kill-list compliant: NO lift+shadow hover, NO gradient blobs, NO "Learn More" CTAs
- Typography: Fraunces display serif for headlines/tour names, system sans for body
- Colors: Primary green #059669, Amber #D97706 for forming/notifications
- Card hover uses border-color change + colored shadow only

## Date
2026-01-31
