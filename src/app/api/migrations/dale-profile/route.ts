/**
 * ONE-TIME migration route — Dale Winward / Mallacoota Cruises profile copy.
 * Delete this file after applying.
 * Source: supabase/migrations/20260407000001_dale_winward_profile_copy.sql
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const MIGRATION_TOKEN = 'dale-profile-mig-2026-quorum';

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== MIGRATION_TOKEN) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Missing env vars.' }, { status: 500 });
  }

  const client = createClient(supabaseUrl, serviceKey);

  const description = `Dale Winward has spent 13 years guiding wildlife cruises out of Mallacoota, one of the most biodiverse coastal pockets in south-east Australia. His boat, the M.V. Loch-Ard — a historic timber ferry built in the early 1900s from Huon pine and kauri — operates from the Mallacoota Inlet, where the Gippsland Lakes system meets the Southern Ocean. A single outing gives access to freshwater, estuarine, and open-water habitat.

Dale is best known beyond birding circles for his role in the 2019 Black Summer firestorms, when he used the Loch-Ard to evacuate 11 hikers stranded by fire on the Mallacoota foreshore. That instinct — read the conditions, act decisively, get people home safely — is the same one he brings to every trip on the water.

The Mallacoota region hosts over 300 bird species. Dale specialises in pelagic and coastal birdwatching, with particular expertise in albatross, petrel, and shearwater identification. Vagrant seabirds appear here that are rarely recorded elsewhere on the Victorian coast. His knowledge of seasonal movements, feeding windows, and the specific weather patterns that push seabirds inshore is built from hundreds of crossings on the same water.

Group sizes are kept small by design. Every participant gets time at the rail. Dale's approach is methodical rather than theatrical — the list builds through careful scanning, not luck.`;

  // Fetch current metadata to merge
  const { data: existing, error: fetchError } = await client
    .from('operators')
    .select('id, metadata')
    .eq('slug', 'mallacoota-cruises')
    .single();

  if (fetchError || !existing) {
    return NextResponse.json(
      { error: 'Operator not found.', detail: fetchError?.message },
      { status: 404 }
    );
  }

  const currentMetadata = (existing.metadata ?? {}) as Record<string, unknown>;
  const newMetadata = {
    ...currentMetadata,
    why_quorum: "I've spent years waiting to see if enough people show up, then making calls I didn't want to make. Quorum fixes that — the tour is real before I commit to anything.",
    press: [
      {
        outlet: 'Snowy River Mail',
        headline: 'Hero turns to tourism innovation',
        url: 'https://snowyrivermail.com.au/15952/hero-turns-to-tourism-innovation/',
        year: 2026,
      },
    ],
    vessel_name: 'M.V. Loch-Ard',
  };

  const { error: updateError } = await client
    .from('operators')
    .update({
      tagline: "Pelagic and coastal birding from Mallacoota aboard the M.V. Loch-Ard — 13 years on the water in one of Australia's most biodiverse coastal pockets.",
      description,
      established_year: 2013,
      metadata: newMetadata,
    })
    .eq('id', existing.id);

  if (updateError) {
    return NextResponse.json(
      { error: 'Update failed.', detail: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    operatorId: existing.id,
    fieldsSet: ['tagline', 'description', 'established_year', 'metadata.why_quorum', 'metadata.press', 'metadata.vessel_name'],
  });
}
