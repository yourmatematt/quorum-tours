-- =============================================================================
-- Migration: Welcome Email Trigger
-- Description: Sends welcome email when a new user profile is created
-- Created: 2026-01-27
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. FUNCTION TO SEND WELCOME EMAIL VIA EDGE FUNCTION
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.send_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
    edge_function_url TEXT;
    service_role_key TEXT;
BEGIN
    -- Get the edge function URL and service key from vault
    -- In production, store these in Supabase Vault or as database secrets
    edge_function_url := current_setting('app.supabase_url', true) || '/functions/v1/send-email';
    service_role_key := current_setting('app.supabase_service_role_key', true);

    -- Only send for newly created profiles
    IF TG_OP = 'INSERT' AND NEW.email IS NOT NULL THEN
        -- Use pg_net extension to make HTTP request (async, non-blocking)
        PERFORM net.http_post(
            url := edge_function_url,
            headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', 'Bearer ' || service_role_key
            ),
            body := jsonb_build_object(
                'template', 'welcome',
                'to', NEW.email,
                'data', jsonb_build_object(
                    'userName', COALESCE(NEW.display_name, 'there'),
                    'email', NEW.email,
                    'loginUrl', current_setting('app.site_url', true) || '/login',
                    'toursUrl', current_setting('app.site_url', true) || '/tours',
                    'chaseListUrl', current_setting('app.site_url', true) || '/profile'
                )
            )
        );

        -- Log the email attempt
        INSERT INTO public.email_log (
            user_id,
            email_type,
            subject,
            recipient_email,
            status,
            metadata
        ) VALUES (
            NEW.id,
            'welcome',
            'Welcome to Quorum Tours!',
            NEW.email,
            'pending',
            jsonb_build_object(
                'triggered_by', 'profile_insert',
                'trigger_timestamp', NOW()
            )
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 2. TRIGGER ON PROFILES TABLE
-- Note: Only create if pg_net extension is available
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    -- Check if pg_net extension exists
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_net') THEN
        -- Drop existing trigger if exists
        DROP TRIGGER IF EXISTS trigger_send_welcome_email ON public.profiles;

        -- Create trigger
        CREATE TRIGGER trigger_send_welcome_email
            AFTER INSERT ON public.profiles
            FOR EACH ROW
            EXECUTE FUNCTION public.send_welcome_email();

        RAISE NOTICE 'Welcome email trigger created successfully';
    ELSE
        RAISE NOTICE 'pg_net extension not available - welcome emails will need to be sent via application code';
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 3. ALTERNATIVE: Email log for application-side sending
-- If pg_net is not available, the application can poll this table
-- -----------------------------------------------------------------------------
COMMENT ON FUNCTION public.send_welcome_email() IS
    'Sends welcome email via edge function when new profile is created.
     Requires pg_net extension for async HTTP calls.';

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.send_welcome_email() TO service_role;
