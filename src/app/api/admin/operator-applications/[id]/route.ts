/**
 * PATCH /api/admin/operator-applications/[id]
 *
 * Admin action on an operator application: approve, reject, or request more info.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/email';
import { slugify } from '@/lib/utils/slugify';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, adminNotes } = body;

    if (!['approve', 'reject', 'request_info'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }

    // Verify admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check admin role
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    // Fetch the application
    const { data: application, error: fetchError } = await serviceClient
      .from('operator_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

    // === APPROVE ===
    if (action === 'approve') {
      // Generate unique slug
      let slug = slugify(application.business_name);
      const { data: existingSlugs } = await serviceClient
        .from('operators')
        .select('slug')
        .ilike('slug', `${slug}%`);

      if (existingSlugs && existingSlugs.length > 0) {
        const suffix = Math.random().toString(36).substring(2, 6);
        slug = `${slug}-${suffix}`;
      }

      // Create operator record
      const { data: operator, error: opError } = await serviceClient
        .from('operators')
        .insert({
          name: application.business_name,
          slug,
          description: application.description,
          base_location: application.base_location,
          is_verified: true,
          owner_profile_id: application.profile_id,
          metadata: {
            credentials: application.credentials,
            years_experience: application.years_experience,
            website_url: application.website_url,
          },
        })
        .select('id, slug')
        .single();

      if (opError) {
        console.error('Failed to create operator:', opError);
        return NextResponse.json({ error: 'Failed to create operator record.' }, { status: 500 });
      }

      // Resolve profile_id: if anonymous, check if a matching profile exists now
      let resolvedProfileId = application.profile_id;

      if (!resolvedProfileId) {
        const { data: matchingProfile } = await serviceClient
          .from('profiles')
          .select('id')
          .eq('email', application.contact_email)
          .maybeSingle();

        if (matchingProfile) {
          resolvedProfileId = matchingProfile.id;

          // Link the application to the discovered profile
          await serviceClient
            .from('operator_applications')
            .update({ profile_id: resolvedProfileId })
            .eq('id', id);
        }
      }

      // If applicant has an account, set up their membership and role
      if (resolvedProfileId) {
        // Create operator_members entry
        const { error: memberError } = await serviceClient.from('operator_members').insert({
          operator_id: operator.id,
          profile_id: resolvedProfileId,
          is_active: true,
        });

        if (memberError) {
          console.error('Failed to create operator_members entry:', memberError);
          return NextResponse.json({ error: 'Failed to create operator membership.' }, { status: 500 });
        }

        // Update profile role to operator
        const { error: profileError } = await serviceClient
          .from('profiles')
          .update({ role: 'operator', linked_operator_id: operator.id })
          .eq('id', resolvedProfileId);

        if (profileError) {
          console.error('Failed to update profile role:', profileError);
          return NextResponse.json({ error: 'Failed to update profile role.' }, { status: 500 });
        }
      }

      const needsAccount = !resolvedProfileId;

      // Update application status
      const { error: statusError } = await serviceClient
        .from('operator_applications')
        .update({
          status: 'approved',
          admin_notes: adminNotes || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          created_operator_id: operator.id,
        })
        .eq('id', id);

      if (statusError) {
        console.error('Failed to update application status:', statusError);
        return NextResponse.json({ error: 'Failed to update application status.' }, { status: 500 });
      }

      // Send approval email
      const signupUrl = `${siteUrl}/signup?email=${encodeURIComponent(application.contact_email)}&redirect=/operator`;
      sendEmail({
        template: 'operator_application_approved',
        to: application.contact_email,
        data: {
          contactName: application.contact_name,
          contactEmail: application.contact_email,
          businessName: application.business_name,
          dashboardUrl: `${siteUrl}/operator`,
          signupUrl,
          needsAccount,
          siteUrl,
        },
      }).catch(err => console.error('Failed to send approval email:', err));

      return NextResponse.json({
        success: true,
        operatorId: operator.id,
        operatorSlug: operator.slug,
      });
    }

    // === REJECT ===
    if (action === 'reject') {
      await serviceClient
        .from('operator_applications')
        .update({
          status: 'rejected',
          admin_notes: adminNotes || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      sendEmail({
        template: 'operator_application_rejected',
        to: application.contact_email,
        data: {
          contactName: application.contact_name,
          businessName: application.business_name,
          reason: adminNotes || '',
          siteUrl,
        },
      }).catch(err => console.error('Failed to send rejection email:', err));

      return NextResponse.json({ success: true });
    }

    // === REQUEST INFO ===
    if (action === 'request_info') {
      if (!adminNotes?.trim()) {
        return NextResponse.json({ error: 'Please specify what information you need.' }, { status: 400 });
      }

      const { error: statusError } = await serviceClient
        .from('operator_applications')
        .update({
          status: 'more_info_requested',
          admin_notes: adminNotes,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (statusError) {
        console.error('Failed to update application status:', statusError);
        return NextResponse.json({ error: 'Failed to update application.' }, { status: 500 });
      }

      sendEmail({
        template: 'operator_application_info_requested',
        to: application.contact_email,
        data: {
          contactName: application.contact_name,
          businessName: application.business_name,
          message: adminNotes,
          siteUrl,
        },
      }).catch(err => console.error('Failed to send info request email:', err));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    console.error('Admin operator action error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
