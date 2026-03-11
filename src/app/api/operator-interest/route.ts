/**
 * POST /api/operator-interest
 *
 * Captures operator interest (email only) from the for-operators page.
 * Sends a confirmation to the submitter and a notification to admin.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Store in operator_interest table (create if needed, or just send emails)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Try to insert into operator_interest table if it exists
    const { error: insertError } = await supabase
      .from('operator_interest')
      .insert({ email: trimmedEmail });

    if (insertError) {
      // Table might not exist yet — log but continue with emails
      console.warn('operator_interest insert failed (table may not exist):', insertError.message);
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

    // Notify admin
    await sendEmail({
      template: 'operator_application_received',
      to: 'hello@quorumtours.com',
      data: {
        businessName: 'Interest Expression',
        contactName: trimmedEmail,
        contactEmail: trimmedEmail,
        baseLocation: 'Not provided',
        description: `Operator interest submitted from ${siteUrl}/for-operators`,
        yearsExperience: 0,
        adminUrl: `${siteUrl}/admin/operators`,
      },
    });

    // Send confirmation to the person
    await sendEmail({
      template: 'operator_application_confirmation',
      to: trimmedEmail,
      data: {
        contactName: 'there',
        businessName: 'your operation',
        siteUrl,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Operator interest error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
