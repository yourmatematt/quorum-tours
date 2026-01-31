# Profile Page - Chase List Edit Feature

**Date:** 2026-01-29
**Status:** In Progress

## Summary

Added edit functionality to the Chase List section on the profile page.

## Changes Made

### ChaseListSection.tsx
- Added "Edit" button in header that toggles edit mode
- When editing:
  - Shows text input + "Add" button to manually add species
  - Shows "Import from eBird" drag-drop zone
  - Shows X (remove) button next to each species
  - Shows "How to export from eBird" help link
- When not editing:
  - Clean list view with species names and regions
  - No import zone visible (cleaner default state)

### New Props
```typescript
interface ChaseListSectionProps {
  birds: ChaseListBird[];
  onImport?: (file: File) => void;
  onRemove?: (id: string) => void;
  onAdd?: (name: string) => void;  // NEW
}
```

### UX Flow
1. User sees "Chase List" with species count and "Edit" link
2. Click "Edit" → enters edit mode:
   - Text input appears for manual species entry
   - Import from eBird zone appears
   - X buttons appear next to each species
3. Click "Done" → exits edit mode, clean view returns

## Previous Session Work

### Profile Page Fixes (same session)
1. Fixed right sidebar section containment (Chase List, Past Tours, Account Settings)
2. Removed nested scrolling - page scrolls naturally now
3. Tightened spacing throughout (space-y-3)
4. QuorumProgressBar updated for two-phase visualization (forming vs confirmed)

### Files Modified
- `src/components/profile/ChaseListSection.tsx` - Complete rewrite with edit mode
- `src/components/profile/PastToursSection.tsx` - Compact styling
- `src/components/profile/SettingsSection.tsx` - Compact styling
- `src/app/profile/page.tsx` - Removed no-scroll dashboard, normal page flow

## Commits Made
1. `f5b1983` - Two-phase quorum/capacity booking model
2. `eac1c7a` - Profile page layout and QuorumProgressBar integration
3. `3ae42b9` - Profile page right sidebar with proper section containment
4. `108e336` - Profile page UX - tighter spacing, no nested scrolling, edit chase list

## Pending
- Screenshot verification of edit mode (browser server crashed)
- Commit the latest ChaseListSection changes with Edit button
- Test the edit flow end-to-end
