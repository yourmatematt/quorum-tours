-- =============================================================================
-- Migration: Add Role Column to Profiles
-- Description: Adds role-based access control for admin/operator subdomains
-- Created: 2026-02-05
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. ADD ROLE COLUMN TO PROFILES
-- Roles: 'user' (default), 'operator', 'admin'
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
    CHECK (role IN ('user', 'operator', 'admin'));

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

COMMENT ON COLUMN public.profiles.role IS
    'User role for subdomain access: user (default), operator, admin';

-- -----------------------------------------------------------------------------
-- 2. FUNCTION: Sync role to auth.users app_metadata
-- This allows middleware to check role from JWT without DB query
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_role_to_app_metadata()
RETURNS TRIGGER AS $$
BEGIN
    -- Update app_metadata in auth.users with the new role
    UPDATE auth.users
    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) ||
        jsonb_build_object('role', NEW.role)
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION sync_role_to_app_metadata() IS
    'Syncs profile.role to auth.users.app_metadata for JWT-based auth checks';

-- -----------------------------------------------------------------------------
-- 3. TRIGGER: Sync on INSERT or UPDATE of role
-- -----------------------------------------------------------------------------
DROP TRIGGER IF EXISTS on_profile_role_change ON public.profiles;
CREATE TRIGGER on_profile_role_change
    AFTER INSERT OR UPDATE OF role ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION sync_role_to_app_metadata();

-- -----------------------------------------------------------------------------
-- 4. BACKFILL: Sync existing profiles to app_metadata
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    profile_record RECORD;
BEGIN
    FOR profile_record IN SELECT id, role FROM public.profiles LOOP
        UPDATE auth.users
        SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) ||
            jsonb_build_object('role', profile_record.role)
        WHERE id = profile_record.id;
    END LOOP;
END;
$$;

-- -----------------------------------------------------------------------------
-- 5. UPDATE handle_new_user() to include role
-- New users default to 'user' role
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(
            NEW.raw_user_meta_data->>'name',
            CONCAT(
                COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
                ' ',
                COALESCE(NEW.raw_user_meta_data->>'last_name', '')
            ),
            NEW.raw_user_meta_data->>'full_name',
            split_part(NEW.email, '@', 1)
        ),
        'user'  -- Default role for new signups
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = COALESCE(EXCLUDED.name, profiles.name);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 6. RLS: Only admins can update roles
-- Regular users and operators cannot change their own role
-- -----------------------------------------------------------------------------
CREATE POLICY "Only admins can update roles"
    ON public.profiles FOR UPDATE
    USING (
        -- User can update their own profile
        auth.uid() = id
    )
    WITH CHECK (
        -- But role changes require admin
        (role = (SELECT role FROM public.profiles WHERE id = auth.uid())) OR
        ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
    );
