/**
 * POST /api/tours/enquiry
 *
 * Handles tour enquiry form submissions.
 * Sends notification to operator and confirmation to enquirer via Resend.
 */

import { NextResponse } from 'next/server';

const emailFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`;
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quorumtours.com';

async function sendEmail(template: string, to: string, data: Record<string, unknown>, replyTo?: string) {
  const response = await fetch(emailFunctionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ template, to, data, replyTo }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email send failed: ${error}`);
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, tourTitle, tourSlug } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim() || !tourTitle || !tourSlug) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const sentAt = new Date().toLocaleString('en-AU', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Australia/Melbourne',
    });

    // Send notification to operator
    await sendEmail(
      'tour_enquiry_operator',
      'hello@quorumtours.com',
      {
        tourTitle,
        tourSlug,
        enquirerName: name.trim(),
        enquirerEmail: email.trim(),
        message: message.trim(),
        sentAt,
        siteUrl,
      },
      email.trim()
    );

    // Send confirmation to enquirer
    await sendEmail(
      'tour_enquiry_confirmation',
      email.trim(),
      {
        enquirerName: name.trim(),
        enquirerEmail: email.trim(),
        tourTitle,
        tourSlug,
        siteUrl,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tour enquiry error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us at hello@quorumtours.com' },
      { status: 500 }
    );
  }
}
