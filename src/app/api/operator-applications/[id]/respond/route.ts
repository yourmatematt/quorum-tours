/**
 * POST /api/operator-applications/[id]/respond
 *
 * Allows an applicant to respond when more info has been requested.
 * Resets application status to 'pending' so it re-enters the review queue.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/email';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { response: responseText } = body;

    if (!responseText?.trim()) {
      return NextResponse.json(
        { error: 'Please provide a response.' },
        { status: 400 }
      );
    }

    // Verify authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch the application and verify ownership
    const { data: application, error: fetchError } = await serviceClient
      .from('operator_applications')
      .select('*')
      .eq('id', id)
      .eq('profile_id', user.id)
      .single();

    if (fetchError || !application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    if (application.status !== 'more_info_requested') {
      return NextResponse.json(
        { error: 'This application is not awaiting a response.' },
        { status: 400 }
      );
    }

    // Append response to admin_notes with separator
    const updatedNotes = [
      application.admin_notes || '',
      '',
      '--- Applicant Response ---',
      responseText.trim(),
    ].join('\n');

    // Update application: append response and reset to pending
    const { error: updateError } = await serviceClient
      .from('operator_applications')
      .update({
        admin_notes: updatedNotes,
        status: 'pending',
      })
      .eq('id', id);

    if (updateError) {
      console.error('Failed to update application:', updateError);
      return NextResponse.json(
        { error: 'Failed to submit response. Please try again.' },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

    // Notify admin about the response (non-blocking)
    sendEmail({
      template: 'operator_application_response',
      to: 'hello@quorumtours.com',
      data: {
        businessName: application.business_name,
        contactName: application.contact_name,
        contactEmail: application.contact_email,
        responseText: responseText.trim(),
        adminUrl: `${siteUrl}/admin/operators`,
      },
    }).catch(err => console.error('Failed to send admin notification:', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application response error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
