/**
 * POST /api/operator-applications
 *
 * Submit an operator application. Works for both authenticated and anonymous users.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      contactName,
      contactEmail,
      businessName,
      baseLocation,
      description,
      yearsExperience,
      credentials,
      websiteUrl,
    } = body;

    // Validate required fields
    if (!contactName?.trim() || !contactEmail?.trim() || !businessName?.trim() ||
        !baseLocation?.trim() || !description?.trim() || !yearsExperience) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (description.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide a more detailed description of your operation.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    const profileId = user?.id || null;

    // Check for duplicate pending application by email
    const { data: existing } = await supabase
      .from('operator_applications')
      .select('id, status')
      .eq('contact_email', contactEmail.trim())
      .eq('status', 'pending')
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email is already under review.' },
        { status: 409 }
      );
    }

    // Insert application using service role for RLS bypass
    const { createClient: createServiceClient } = await import('@supabase/supabase-js');
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: application, error: insertError } = await serviceClient
      .from('operator_applications')
      .insert({
        profile_id: profileId,
        contact_name: contactName.trim(),
        contact_email: contactEmail.trim(),
        business_name: businessName.trim(),
        base_location: baseLocation.trim(),
        description: description.trim(),
        years_experience: parseInt(yearsExperience, 10),
        credentials: credentials?.trim() || null,
        website_url: websiteUrl?.trim() || null,
        status: 'pending',
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Failed to insert application:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

    // Send admin notification (non-blocking)
    sendEmail({
      template: 'operator_application_received',
      to: 'hello@quorumtours.com',
      data: {
        businessName: businessName.trim(),
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim(),
        baseLocation: baseLocation.trim(),
        description: description.trim(),
        yearsExperience: parseInt(yearsExperience, 10),
        adminUrl: `${siteUrl}/admin/operators`,
      },
    }).catch(err => console.error('Failed to send admin notification:', err));

    // Send applicant confirmation (non-blocking)
    sendEmail({
      template: 'operator_application_confirmation',
      to: contactEmail.trim(),
      data: {
        contactName: contactName.trim(),
        businessName: businessName.trim(),
        siteUrl,
      },
    }).catch(err => console.error('Failed to send applicant confirmation:', err));

    return NextResponse.json(
      { success: true, applicationId: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Operator application error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
