-- =============================================================================
-- Operator profile copy update: Mallacoota Cruises / Dale Winward
-- Written by CMO. Source: Snowy River Mail coverage, April 2026.
-- Apply via: supabase db push
-- =============================================================================
--
-- This fills in the description, tagline, vessel, and metadata fields for the
-- Mallacoota Cruises operator profile. These fields drive:
--   - The operator profile page "About" section
--   - The "Why I Joined Quorum" blockquote
--   - Google LocalBusiness structured data (description field)
--   - Operator card tagline throughout the site
--   - Equipment/vessel section on the profile page
--
-- If the slug is different in your local/prod database, adjust the WHERE clause.
-- =============================================================================

UPDATE operators
SET
  tagline = 'Pelagic and coastal birding from Mallacoota aboard the M.V. Loch-Ard — 13 years on the water in one of Australia''s most biodiverse coastal pockets.',

  description = E'Dale Winward has spent 13 years guiding wildlife cruises out of Mallacoota, one of the most biodiverse coastal pockets in south-east Australia. His boat, the M.V. Loch-Ard — a historic timber ferry built in the early 1900s from Huon pine and kauri — operates from the Mallacoota Inlet, where the Gippsland Lakes system meets the Southern Ocean. A single outing gives access to freshwater, estuarine, and open-water habitat.\n\nDale is best known beyond birding circles for his role in the 2019 Black Summer firestorms, when he used the Loch-Ard to evacuate 11 hikers stranded by fire on the Mallacoota foreshore. That instinct — read the conditions, act decisively, get people home safely — is the same one he brings to every trip on the water.\n\nThe Mallacoota region hosts over 300 bird species. Dale specialises in pelagic and coastal birdwatching, with particular expertise in albatross, petrel, and shearwater identification. Vagrant seabirds appear here that are rarely recorded elsewhere on the Victorian coast. His knowledge of seasonal movements, feeding windows, and the specific weather patterns that push seabirds inshore is built from hundreds of crossings on the same water.\n\nGroup sizes are kept small by design. Every participant gets time at the rail. Dale''s approach is methodical rather than theatrical — the list builds through careful scanning, not luck.',

  established_year = 2013,

  metadata = jsonb_set(
    jsonb_set(
      jsonb_set(
        COALESCE(metadata, '{}'::jsonb),
        '{why_quorum}',
        '"I''ve spent years waiting to see if enough people show up, then making calls I didn''t want to make. Quorum fixes that — the tour is real before I commit to anything."'::jsonb
      ),
      '{press}',
      '[{"outlet": "Snowy River Mail", "headline": "Hero turns to tourism innovation", "url": "https://snowyrivermail.com.au/15952/hero-turns-to-tourism-innovation/", "year": 2026}]'::jsonb
    ),
    '{vessel_name}',
    '"M.V. Loch-Ard"'::jsonb
  )
WHERE slug = 'compass-tours'; -- actual slug in DB (was 'mallacoota-cruises' in original draft)
