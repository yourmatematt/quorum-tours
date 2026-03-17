# OPERATOR-PHOTO-HIDE-001: Temporarily Hide Compass Tours Profile Photo

## Task

Temporarily hide the profile photo on Dale Winward's operator profile page (Compass Tours) until photo permission is confirmed.

## Change Made

**File:** `src/app/operators/[id]/OperatorProfileClient.tsx` (line 189)

The `photo` prop passed to `<OperatorHero>` now checks the operator slug. When `slug === 'compass-tours'`, `undefined` is passed instead of `logo_url`, which triggers the existing avatar fallback (a generic person silhouette SVG).

```tsx
// TEMP: logo_url hidden pending photo permission — remove when approved
photo={operator.slug === 'compass-tours' ? undefined : (operator.logo_url ?? undefined)}
```

## What Was NOT Changed

- `logo_url` is still fetched from the database (`SELECT *` on `operators`)
- No database changes
- No changes to the `OperatorHero` component itself
- All other operators are unaffected

## Reverting

When photo permission is confirmed, remove the conditional and restore:

```tsx
photo={operator.logo_url ?? undefined}
```

And delete the `// TEMP:` comment.
