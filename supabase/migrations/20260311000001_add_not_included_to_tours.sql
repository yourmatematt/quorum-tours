-- Add not_included column to tours table (same pattern as included: text[])
ALTER TABLE tours ADD COLUMN IF NOT EXISTS not_included text[] DEFAULT '{}';

-- Seed Wilderness Coast Weekender with not-included items
UPDATE tours
SET not_included = ARRAY['Accommodation', 'Travel to Mallacoota', 'Travel insurance', 'Meals not specified in the itinerary']
WHERE slug = 'wilderness-coast-weekender-apr-2026';
