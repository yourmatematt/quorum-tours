# Profile Page Dashboard Redesign

**Date:** 2026-01-26
**Status:** Complete

## Overview

Redesigned `/profile` page from a scrollable page to a no-scroll desktop dashboard layout. The primary goals were:
- At-a-glance control room for birders
- Enhanced tour cards with full context
- Chase list with eBird CSV import
- Social booking emphasis (fellow travelers visible)

## New Components Created

### 1. EnhancedTourCard (`src/components/profile/EnhancedTourCard.tsx`)

Full-featured commitment card replacing the simpler `UserCommitmentCard`. Features:
- Tour status badge + days until departure countdown
- Payment status badge (paid | deposit-paid | pending | overdue)
- Quorum progress bar for forming tours
- Contact operator button (mailto link)
- Expandable itinerary preview with day-by-day summary
- Fellow travelers avatar row with profile links (shows first 6 + overflow count)
- Operator profile link

Props interface:
```typescript
interface EnhancedTourCardProps {
  tourId: string;
  tourName: string;
  tourDates: string;
  operatorId: string;
  operatorName: string;
  location: string;
  status: 'confirmed' | 'forming' | 'not-running';
  currentParticipants: number;
  quorum: number;
  paymentStatus: 'paid' | 'deposit-paid' | 'pending' | 'overdue';
  departureDate: Date;
  fellowTravelers: { id: string; name: string; initials: string; }[];
  itinerarySummary: string[];
}
```

### 2. ChaseListSection (`src/components/profile/ChaseListSection.tsx`)

Chase list panel with eBird import. Features:
- Species list display (common name, scientific name, region tag)
- Drag-and-drop eBird CSV import zone
- Import status feedback (idle/importing/success/error states)
- External link to eBird export instructions
- Empty state messaging
- View-only mode (no inline editing per user preference)

Props interface:
```typescript
interface ChaseListSectionProps {
  birds: {
    id: string;
    commonName: string;
    scientificName: string;
    region?: string;
    addedDate: string;
  }[];
  onImport?: (file: File) => void;
}
```

## Page Layout Changes

### Desktop (lg breakpoint)
- Full viewport height: `lg:h-[calc(100vh-65px)] lg:overflow-hidden`
- No page scroll - scrolling contained within individual panels
- 12-column grid layout:
  - Top row: Profile header (9 cols) + Trust status (3 cols)
  - Main row: My Tours (8 cols) + Right sidebar (4 cols)
  - Right sidebar: Chase list (flex-1) + Past Tours + Settings (collapsed)

### Mobile
- Standard scrollable layout
- Stacked sections

## Files Modified

- `src/app/profile/page.tsx` - Complete rewrite with dashboard layout
- `src/components/profile/TrustStatusCard.tsx` - Compacted for sidebar column
- `src/components/profile/index.ts` - Added new component exports

## Bug Fixes During Implementation

1. **TourManagement.tsx syntax error** - Missing `}}` on style prop (line 167)
2. **Property name mismatches** - Updated all component usages from `threshold=` to `quorum=`:
   - `src/app/operators/[id]/page.tsx`
   - `src/app/tours/[id]/page.tsx`
   - `src/app/tours/[id]/join/page.tsx`
   - `src/app/tours/[id]/join/success/page.tsx`
   - `src/app/tours/page.tsx`
   - `src/components/home/TourStatesSection.tsx`

## Design Decisions

- **Fellow travelers**: Avatar row (compact) - small avatars in a row, click to expand
- **Chase list**: View + import only - no inline editing, just display and eBird CSV import
- **No scroll desktop**: Viewport-height dashboard with internal panel scrolling
- **Field notebook feel**: Dense but scannable, institutional not celebratory

## Component Exports

Updated `src/components/profile/index.ts`:
```typescript
export { ProfileHeader } from './ProfileHeader';
export { TrustStatusCard } from './TrustStatusCard';
export { UserCommitmentCard } from './UserCommitmentCard';
export { CommitmentsSection } from './CommitmentsSection';
export { EnhancedTourCard } from './EnhancedTourCard';
export { ChaseListSection } from './ChaseListSection';
export { PastToursSection } from './PastToursSection';
export { SettingsSection } from './SettingsSection';
```
