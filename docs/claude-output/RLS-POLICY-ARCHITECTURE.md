# Row Level Security (RLS) Policy Architecture

**Status:** PLANNED
**Last Updated:** 2026-01-24

---

## Overview

Quorum Tours uses Supabase Row Level Security (RLS) to enforce data access at the database level. This ensures that even if application code is compromised, users can only access data they're authorized to see.

---

## Access Levels

| Role | Description | JWT Claim |
|------|-------------|-----------|
| `anon` | Unauthenticated visitors | None |
| `authenticated` | Logged-in users | `auth.uid()` |
| `participant` | User with active reservation | Via reservation lookup |
| `operator_member` | Member of an operator | Via `operator_members` table |
| `operator_admin` | Owner/admin of an operator | Via `operator_members` role |
| `admin` | Platform administrator | `app_metadata.is_admin = true` |

---

## Helper Functions

### `is_admin()`
Checks if current user is a platform admin via JWT claims.

```sql
SELECT is_admin(); -- Returns BOOLEAN
```

### `is_operator_member(op_id UUID, required_roles[])`
Checks if current user is a member of the specified operator.

```sql
-- Any member
SELECT is_operator_member('operator-uuid');

-- Specific roles only
SELECT is_operator_member('operator-uuid', ARRAY['owner', 'admin']::operator_member_role[]);
```

### `is_operator_admin(op_id UUID)`
Shorthand for `is_operator_member(op_id, ARRAY['owner', 'admin'])`.

```sql
SELECT is_operator_admin('operator-uuid');
```

### `can_access_tour_data(tour_id UUID)`
Checks if user can access detailed tour data (reservations, payments).

```sql
SELECT can_access_tour_data('tour-uuid');
```

### `get_tour_access_level(tour_id UUID)`
Returns the user's access level for a tour: `'admin'`, `'operator_admin'`, `'operator_member'`, `'participant'`, or `'none'`.

```sql
SELECT get_tour_access_level('tour-uuid');
```

---

## Policy Matrix

### Public Data (Read-only for all)

| Table | Anonymous | Authenticated |
|-------|-----------|---------------|
| `tours` | ✅ Read | ✅ Read |
| `tour_species` | ✅ Read | ✅ Read |
| `operators` (active) | ✅ Read | ✅ Read |
| `guides` | ✅ Read | ✅ Read |
| `species` | ✅ Read | ✅ Read |
| `regions` | ✅ Read | ✅ Read |
| `badges` | ✅ Read | ✅ Read |

### User Personal Data

| Table | Own Data | Others' Data | Admin |
|-------|----------|--------------|-------|
| `profiles` | ✅ Read/Write | ✅ If public or shared tour | ✅ All |
| `profile_private` | ❌ | ❌ | ✅ All |
| `reservations` | ✅ Read/Write | ❌ | ✅ All |
| `user_chase_list` | ✅ Read/Write | ❌ | ❌ |
| `notification_preferences` | ✅ Read/Write | ❌ | ❌ |
| `notifications` | ✅ Read | ❌ | ❌ |
| `guide_ratings` | ✅ Own ratings | ❌ | ✅ All |

### Operator Data

| Table | Operator Member | Operator Admin | Platform Admin |
|-------|-----------------|----------------|----------------|
| `operators` | ✅ Read | ✅ Read/Write | ✅ All |
| `operator_members` | ✅ Read team | ✅ Manage team | ✅ All |
| `operator_credentials` | ❌ | ✅ Read/Write | ✅ All |
| `operator_media` | ✅ Read | ✅ Read/Write | ✅ All |
| `tours` | ✅ Read | ✅ Create/Edit/Delete | ✅ All |
| `tour_species` | ✅ Read | ✅ Manage | ✅ All |
| `reservations` (their tours) | ✅ Read | ✅ Read | ✅ All |
| `payment_events` (their tours) | ✅ Read | ✅ Read | ✅ All |
| `waitlist` (their tours) | ✅ Read | ✅ Read | ✅ All |

### Admin-Only Data

| Table | Description |
|-------|-------------|
| `audit_log` | All system changes |
| `admin_alerts` | Platform alerts |
| `system_metrics` | Performance data |
| `api_usage_log` | API tracking |
| `email_log` | Email history |
| `strike_history` | All strikes |

---

## Policy Patterns

### Pattern 1: Own Data Only

```sql
CREATE POLICY "Users can view own X"
    ON table_name FOR SELECT
    USING (auth.uid() = user_id);
```

### Pattern 2: Own Data + Admin

```sql
CREATE POLICY "Users and admins can view X"
    ON table_name FOR SELECT
    USING (is_admin() OR auth.uid() = user_id);
```

### Pattern 3: Operator Member Access

```sql
CREATE POLICY "Operators can view tour X"
    ON table_name FOR SELECT
    USING (
        is_admin()
        OR auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM public.tours t
            WHERE t.id = table_name.tour_id
            AND t.operator_id IS NOT NULL
            AND is_operator_member(t.operator_id)
        )
    );
```

### Pattern 4: Operator Admin Only

```sql
CREATE POLICY "Operator admins can manage X"
    ON table_name FOR ALL
    USING (
        is_admin()
        OR (
            operator_id IS NOT NULL
            AND is_operator_admin(operator_id)
        )
    );
```

### Pattern 5: Public Read, Restricted Write

```sql
-- Public read
CREATE POLICY "Public can view X"
    ON table_name FOR SELECT
    USING (TRUE);

-- Restricted write
CREATE POLICY "Only admins can modify X"
    ON table_name FOR ALL
    USING (is_admin());
```

---

## Profile Visibility Rules

Special case: Users on the same tour can see each other's profiles.

```sql
CREATE POLICY "Profile visibility based on privacy"
    ON profiles FOR SELECT
    USING (
        -- Always see own profile
        auth.uid() = id
        -- Admins see all
        OR is_admin()
        -- Public profiles visible to everyone
        OR is_public = TRUE
        -- Tour participants can see each other
        OR EXISTS (
            SELECT 1 FROM reservations r1
            JOIN reservations r2 ON r1.tour_id = r2.tour_id
            WHERE r1.user_id = profiles.id
            AND r2.user_id = auth.uid()
            AND r1.status NOT IN ('cancelled', 'refunded', 'abandoned')
            AND r2.status NOT IN ('cancelled', 'refunded', 'abandoned')
        )
    );
```

---

## Security Considerations

### 1. Function Security

All helper functions use `SECURITY DEFINER` to bypass RLS for their internal queries. This is safe because:
- Functions only return boolean/text, not row data
- Functions are called with the user's `auth.uid()`
- Functions cannot be used to extract data

### 2. JWT vs Database Lookup

- `is_admin()` uses JWT claims (fast, no DB hit)
- `is_operator_member()` queries database (slower, always current)

For critical operations, the database lookup ensures membership is current even if the JWT hasn't been refreshed.

### 3. Realtime Considerations

RLS policies apply to Realtime subscriptions. Users only receive updates for rows they can SELECT:

```typescript
// This subscription respects RLS
const channel = supabase
  .channel('my-reservations')
  .on('postgres_changes', { table: 'reservations' }, callback)
  .subscribe();
```

### 4. Service Role Bypass

Edge Functions using `SUPABASE_SERVICE_ROLE_KEY` bypass RLS. Use with caution:

```typescript
// Bypasses RLS - use only in trusted Edge Functions
const supabase = createClient(url, serviceRoleKey);
```

---

## Performance Optimization

### Indexes for RLS

```sql
-- Operator member lookup
CREATE INDEX idx_operator_members_profile_active
    ON operator_members(profile_id, is_active)
    WHERE is_active = TRUE;

-- Tour by operator
CREATE INDEX idx_tours_operator_id
    ON tours(operator_id)
    WHERE operator_id IS NOT NULL;

-- Reservations by tour
CREATE INDEX idx_reservations_tour_id
    ON reservations(tour_id);
```

### Avoiding N+1 RLS Checks

When fetching related data, use joins rather than separate queries:

```typescript
// Good: Single query with RLS applied once
const { data } = await supabase
  .from('tours')
  .select('*, reservations(*)')
  .eq('id', tourId);

// Bad: Multiple queries, multiple RLS checks
const { data: tour } = await supabase.from('tours').select('*').eq('id', tourId);
const { data: reservations } = await supabase.from('reservations').select('*').eq('tour_id', tourId);
```

---

## Migration Files

| Migration | Description |
|-----------|-------------|
| `20260124000001_stripe_integration_gaps.sql` | `payment_events` RLS policies |
| `20260124000003_rls_policy_fixes.sql` | Fixed operator access to tours/reservations |

---

## Testing RLS

### Impersonate User

```sql
-- Set user context
SELECT set_config('request.jwt.claims', '{"sub": "user-uuid"}', true);

-- Run query as that user
SELECT * FROM reservations;
```

### Check Policy Evaluation

```sql
-- See which policies apply
SELECT * FROM pg_policies WHERE tablename = 'reservations';
```

### Verify Access Levels

```sql
-- Check user's access for a tour
SELECT get_tour_access_level('tour-uuid');
```
