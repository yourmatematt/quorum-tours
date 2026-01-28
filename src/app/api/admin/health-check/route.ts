// =============================================================================
// Admin Health Check API
// Runs actual diagnostic tests against all system services
// =============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Test result types
type TestStatus = 'operational' | 'degraded' | 'critical' | 'unknown'

interface TestResult {
  name: string
  status: TestStatus
  message: string
  latencyMs?: number
  details?: Record<string, unknown>
}

interface HealthCheckResponse {
  timestamp: string
  overall: TestStatus
  tests: TestResult[]
  testDataIds?: string[] // IDs of test records created (for cleanup)
}

// Initialize clients
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function POST(request: NextRequest) {
  // Verify admin authorization (simplified - enhance with actual auth check)
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tests } = await request.json() as { tests?: string[] }
  const testsToRun = tests || ['all']
  const runAll = testsToRun.includes('all')

  const results: TestResult[] = []
  const testDataIds: string[] = []

  // ==========================================================================
  // 1. SUPABASE CONNECTION TEST
  // ==========================================================================
  if (runAll || testsToRun.includes('supabase')) {
    const start = Date.now()
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .limit(1)

      const latency = Date.now() - start

      if (error) {
        results.push({
          name: 'Supabase Connection',
          status: 'critical',
          message: `Database error: ${error.message}`,
          latencyMs: latency,
        })
      } else {
        results.push({
          name: 'Supabase Connection',
          status: latency > 1000 ? 'degraded' : 'operational',
          message: latency > 1000 ? `Slow response (${latency}ms)` : 'Connected',
          latencyMs: latency,
        })
      }
    } catch (err) {
      results.push({
        name: 'Supabase Connection',
        status: 'critical',
        message: `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // ==========================================================================
  // 2. SUPABASE WRITE TEST
  // ==========================================================================
  if (runAll || testsToRun.includes('supabase-write')) {
    const start = Date.now()
    try {
      // Insert a test record into email_log (will be cleaned up)
      const { data, error } = await supabaseAdmin
        .from('email_log')
        .insert({
          user_id: null,
          email_type: 'health_check_test',
          subject: 'System Health Check Test',
          recipient_email: 'test@health-check.internal',
          status: 'test',
          metadata: {
            test_run: true,
            timestamp: new Date().toISOString(),
          }
        })
        .select('id')
        .single()

      const latency = Date.now() - start

      if (error) {
        results.push({
          name: 'Supabase Write',
          status: 'critical',
          message: `Write failed: ${error.message}`,
          latencyMs: latency,
        })
      } else {
        testDataIds.push(`email_log:${data.id}`)
        results.push({
          name: 'Supabase Write',
          status: latency > 500 ? 'degraded' : 'operational',
          message: latency > 500 ? `Slow write (${latency}ms)` : 'Write successful',
          latencyMs: latency,
        })
      }
    } catch (err) {
      results.push({
        name: 'Supabase Write',
        status: 'critical',
        message: `Write error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // ==========================================================================
  // 3. STRIPE API TEST
  // ==========================================================================
  if (runAll || testsToRun.includes('stripe')) {
    const start = Date.now()
    try {
      const balance = await stripe.balance.retrieve()
      const latency = Date.now() - start

      results.push({
        name: 'Stripe API',
        status: latency > 2000 ? 'degraded' : 'operational',
        message: latency > 2000 ? `Slow response (${latency}ms)` : 'Connected',
        latencyMs: latency,
        details: {
          available: balance.available.map(b => ({ amount: b.amount, currency: b.currency })),
        },
      })
    } catch (err) {
      results.push({
        name: 'Stripe API',
        status: 'critical',
        message: `Stripe error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // ==========================================================================
  // 4. STRIPE WEBHOOK ENDPOINT TEST
  // ==========================================================================
  if (runAll || testsToRun.includes('stripe-webhook')) {
    const start = Date.now()
    try {
      // List recent webhook endpoints to verify configuration
      const webhooks = await stripe.webhookEndpoints.list({ limit: 5 })
      const latency = Date.now() - start

      const activeWebhooks = webhooks.data.filter(w => w.status === 'enabled')

      results.push({
        name: 'Stripe Webhooks',
        status: activeWebhooks.length > 0 ? 'operational' : 'degraded',
        message: activeWebhooks.length > 0
          ? `${activeWebhooks.length} active webhook(s)`
          : 'No active webhooks configured',
        latencyMs: latency,
        details: {
          total: webhooks.data.length,
          active: activeWebhooks.length,
        },
      })
    } catch (err) {
      results.push({
        name: 'Stripe Webhooks',
        status: 'degraded',
        message: `Could not verify webhooks: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // ==========================================================================
  // 5. RESEND EMAIL TEST (actual send to test address)
  // ==========================================================================
  if (runAll || testsToRun.includes('email')) {
    const start = Date.now()
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            template: 'welcome',
            to: process.env.ADMIN_EMAIL || 'delivered@resend.dev', // Resend test address
            data: {
              userName: 'Health Check Test',
              loginUrl: 'https://quorumtours.com/login',
              toursUrl: 'https://quorumtours.com/tours',
              isTest: true,
            },
          }),
        }
      )

      const latency = Date.now() - start
      const result = await response.json()

      if (response.ok && result.success) {
        results.push({
          name: 'Email Service (Resend)',
          status: latency > 3000 ? 'degraded' : 'operational',
          message: latency > 3000 ? `Slow delivery (${latency}ms)` : 'Email sent successfully',
          latencyMs: latency,
          details: { messageId: result.messageId },
        })
      } else {
        results.push({
          name: 'Email Service (Resend)',
          status: 'critical',
          message: `Email failed: ${result.error || 'Unknown error'}`,
          latencyMs: latency,
        })
      }
    } catch (err) {
      results.push({
        name: 'Email Service (Resend)',
        status: 'critical',
        message: `Email service error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // ==========================================================================
  // 6. EDGE FUNCTIONS TEST
  // ==========================================================================
  if (runAll || testsToRun.includes('edge-functions')) {
    // Test each edge function's availability (OPTIONS request)
    const edgeFunctions = [
      'send-email',
      'create-checkout',
      'stripe-webhook',
      'process-quorum',
      'process-payment-timeout',
      'send-tour-reminders',
      'process-failed-tours',
    ]

    for (const fn of edgeFunctions) {
      const start = Date.now()
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${fn}`,
          { method: 'OPTIONS' }
        )
        const latency = Date.now() - start

        results.push({
          name: `Edge: ${fn}`,
          status: response.ok ? (latency > 1000 ? 'degraded' : 'operational') : 'critical',
          message: response.ok
            ? (latency > 1000 ? `Slow (${latency}ms)` : 'Available')
            : `HTTP ${response.status}`,
          latencyMs: latency,
        })
      } catch (err) {
        results.push({
          name: `Edge: ${fn}`,
          status: 'critical',
          message: `Unreachable: ${err instanceof Error ? err.message : 'Unknown error'}`,
        })
      }
    }
  }

  // ==========================================================================
  // 7. CRON JOB STATUS CHECK
  // ==========================================================================
  if (runAll || testsToRun.includes('cron')) {
    try {
      // Check last cron job runs from email_log
      const { data: recentJobs } = await supabaseAdmin
        .from('email_log')
        .select('email_type, created_at, status')
        .in('email_type', ['tour_reminder_7day', 'tour_reminder_1day', 'strike_applied', 'tour_cancelled'])
        .order('created_at', { ascending: false })
        .limit(10)

      const cronTypes = [
        { name: 'Tour Reminders', types: ['tour_reminder_7day', 'tour_reminder_1day'] },
        { name: 'Payment Timeout', types: ['strike_applied'] },
        { name: 'Failed Tours', types: ['tour_cancelled'] },
      ]

      for (const cron of cronTypes) {
        const lastRun = recentJobs?.find(j => cron.types.includes(j.email_type))

        if (lastRun) {
          const hoursSinceRun = (Date.now() - new Date(lastRun.created_at).getTime()) / (1000 * 60 * 60)

          results.push({
            name: `Cron: ${cron.name}`,
            status: hoursSinceRun > 48 ? 'degraded' : 'operational',
            message: `Last activity: ${hoursSinceRun.toFixed(1)}h ago`,
            details: { lastRun: lastRun.created_at },
          })
        } else {
          results.push({
            name: `Cron: ${cron.name}`,
            status: 'unknown',
            message: 'No recent activity (may be normal if no tours pending)',
          })
        }
      }
    } catch (err) {
      results.push({
        name: 'Cron Jobs',
        status: 'degraded',
        message: `Could not check cron status: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // ==========================================================================
  // CALCULATE OVERALL STATUS
  // ==========================================================================
  const hasAnyCritical = results.some(r => r.status === 'critical')
  const hasAnyDegraded = results.some(r => r.status === 'degraded')

  const overall: TestStatus = hasAnyCritical
    ? 'critical'
    : hasAnyDegraded
      ? 'degraded'
      : 'operational'

  const response: HealthCheckResponse = {
    timestamp: new Date().toISOString(),
    overall,
    tests: results,
    testDataIds: testDataIds.length > 0 ? testDataIds : undefined,
  }

  return NextResponse.json(response)
}

// =============================================================================
// CLEANUP ENDPOINT - Remove test data
// =============================================================================
export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Clean up test email_log entries
    const { error } = await supabaseAdmin
      .from('email_log')
      .delete()
      .eq('email_type', 'health_check_test')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Test data cleaned up' })
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : 'Cleanup failed'
    }, { status: 500 })
  }
}
