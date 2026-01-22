# Designing chase lists for serious birders: A UX research synthesis

**Serious birders don't maintain static chase lists—they generate context-specific target lists dynamically, triggered by trip planning, rare bird alerts, and seasonal shifts.** This fundamental insight should reshape how tour booking platforms approach species "want" lists. For the 45-65 demographic with 300-600+ life list species, the platform must respect expertise, avoid patronizing gamification, and integrate seamlessly with eBird (the de facto standard). The core UX challenge is enabling efficient list generation and meaningful notifications without creating list fatigue or alert noise.

This research synthesizes findings from birding forums, eBird documentation, adjacent domain analysis (fishing apps, iNaturalist, citizen science platforms), and community complaint patterns to deliver specific, actionable recommendations for a tour booking platform.

---

## How serious birders actually conceptualize wanted species

The mental model for "chase lists" among experienced birders is **fluid, multi-layered, and contextual**—not a fixed document they maintain. Understanding this hierarchy is critical for UX design.

**Nemesis birds** sit at the emotional apex. These are species a birder has actively pursued multiple times and failed to see—earned through repeated disappointment, not self-assigned. One birder described his Russet-crowned Motmot: "Local guides proud of their 100 percent success rates have to change their marketing campaigns after a day out with me. My wife has started calling it the 'notmot.'" Tours targeting someone's nemesis bird represent **extremely high conversion potential**—these birders will travel significant distances and pay premium prices for another attempt.

**Bogey birds** (British-influenced term) differ subtly: these are species a birder "should have seen by now" given their location and experience. As one BirdForum user explained: "Jack Snipe is a bogey because there's plenty in my local area and I keep missing them every winter." The distinction matters for UX—bogey birds are contextual to expectation, while nemesis implies active multi-year pursuit.

**Target species** is the functional, planning-oriented term most birders use. Target lists are generated dynamically—before a trip, birders consult eBird Targets, cross-reference with field guides, and produce a working list for that specific destination and timeframe. Big Year birders create fresh target lists daily. This suggests the platform should emphasize **list generation tools over static list maintenance**.

**Bucket list species** are aspirational dreams—the Shoebill, the Resplendent Quetzal—without active pursuit attached. These drive long-term tour interest but don't require notification urgency.

List changes follow predictable triggers: **additions** come from rare bird alerts, trip announcements, seasonal migration patterns, and taxonomic splits creating "new" species. **Removals** are immediate upon successfully seeing the bird, or when a trip concludes. The platform should support both automatic removal (species seen) and context-specific lists (trip-scoped).

---

## Species input UX: What works across platforms

eBird's species entry system sets user expectations for serious birders. Its **4-letter quick entry codes** (GRHE for Green Heron, BLJA for Blue Jay) enable expert-level speed—power users type four characters rather than full names. Context-aware filtering pre-populates checklists with species likely for the location and date, reducing 10,000+ world species to 50-200 relevant options. The "Show Rarities" button reveals unusual species without cluttering the default view.

**Autocomplete search** matching partial text, common names, and scientific names is baseline expected functionality. Merlin Bird ID adds visual-first selection with photos alongside names, reducing cognitive load when birders recognize appearance but can't recall exact names. BirdTrack uses 2-letter codes familiar to UK birders, while Avibase supports 271 languages and 151 taxonomic checklists.

For the chase list context, the platform should implement a **hybrid entry system**:
- Primary: Autocomplete search with partial matching (common and scientific names)
- Secondary: 4-letter code support for power users who know eBird conventions
- Tertiary: Browse by taxonomic group or visual "type" category (gull-like birds, long-legged waders)
- Essential: Photos in search results for visual confirmation

**The cold start problem**—helping new users populate an empty list—has proven solutions. iNaturalist's "Unobserved Species" button shows species others have seen in a region that the user hasn't, directly generating a chase list. eBird's Target Species tool does similar work, ranking species by detection likelihood. For a tour platform, the most effective approach is **destination-based starter lists**: "Top 50 target birds for Costa Rica" curated by tour operators, pre-checked as wanted with option to remove. Combine this with **eBird life list import** (CSV format, universal among serious birders) to auto-calculate needs.

Import/export capabilities are non-negotiable for this demographic. eBird's MyEBirdData.csv export is the standard format—columns include Common Name, Scientific Name, Taxonomic Order, Location, Date, and coordinates. The platform must accept this format and export chase lists in compatible CSV for users to take offline or into other tools. **Data lock-in will drive away serious birders**, who expressed strong frustration with platforms like Birda that import but don't export.

---

## Optimal list size and the prioritization imperative

Research consistently points to **10-25 species as the practical ceiling for active chase lists** before notifications become meaningless noise. Big Year birders preparing daily target lists typically identify ~20 "must-see" species per major trip. eBird's Rare Bird Alert system limits to 500 records within 7 days per region—an implicit acknowledgment of attention capacity limits.

The platform should implement **tiered prioritization**, reflecting how birders naturally categorize targets:

- **Tier 1 (Must-see)**: Would change travel plans to see these species. Limited to 10 maximum. Triggers immediate push notifications.
- **Tier 2 (Chase-worthy)**: Worth extra effort if in the area. 10-25 species. Daily digest notifications.
- **Tier 3 (Would be nice)**: Interested but won't go out of way. 25-50 species. Weekly summary notifications.
- **Tier 4 (Bonus)**: Pleasant surprise if encountered. Unlimited. No notifications.

This tiered system prevents alert fatigue while ensuring high-priority targets get immediate attention. Critical UX detail: **auto-remove species from the list once logged as seen**, mirroring how birders' mental lists work. eBird Needs Alerts do this automatically—the platform should too.

For extremely rare species (vagrants, accidentals), the platform must clearly distinguish these from merely uncommon species. Vagrants appear **well outside their normal range** due to storms or navigation errors—their presence is unpredictable and shouldn't be "promised" on tours. Display treatment should include explicit uncertainty language: "This species is a vagrant—sightings are unpredictable" versus reliable rarity indicators for species that are simply uncommon but regular.

---

## Display patterns that respect taxonomic expertise

**Taxonomic order is the expected default** for serious birders—this is the standard in field guides, eBird, and scientific publications. Lists starting with waterfowl and ending with passerines reflect the phylogenetic organization birders have internalized through decades of experience. Deviating from taxonomic order as default will feel disorienting.

However, the platform should provide sort toggles for alternative views:

| Sort Method | Use Case |
|-------------|----------|
| Taxonomic (default) | Matches mental model, field guide organization |
| By likelihood | Trip planning—"most getable" species first |
| By priority tier | Focus attention on must-see targets |
| Alphabetical | Quick lookup when name is known |
| By rarity | Prioritizing alert-worthy species |
| By last observation | Finding coverage gaps |

**Essential metadata per species** (based on what serious birders consistently value):

1. **Seasonal occurrence bar charts**—eBird's signature feature showing weekly detection frequency. Taller bars indicate higher likelihood during that period. This is the primary decision-making tool for timing trips.
2. **Range maps**—dynamic maps showing breeding (red), non-breeding (blue), year-round (purple), and migration (yellow) distribution.
3. **Recent sightings**—"Last reported in [tour area]: [date]" with observer count. Critical for chase decisions.
4. **Photos**—multiple high-quality images, preferably from the tour region.
5. **Audio/songs**—playback capability; Merlin's sound ID has made audio a "killer feature."
6. **Difficulty indicators**—implied by detection frequency but can be made explicit.

The "Last seen in your region" feature is **highly valued**—eBird shows when users last reported a species and from where. For tour context, showing community-level recent sightings ("Last reported: 3 days ago by 4 observers") provides actionable intelligence.

---

## Privacy, sharing, and the ethics of rare bird data

Privacy around rare species locations is **deeply embedded in birding culture** and must be respected in platform design. The American Birding Association Code of Birding Ethics explicitly states: "Before advertising the presence of a rare bird, evaluate the potential for disturbance to the bird, its surroundings, and other people in the area."

eBird developed the gold standard for sensitive species handling: automatic hiding of sensitive species from public view, location obscuring to 400 km² grids, exclusion from hotspot output and alerts, and user controls for anonymous contribution. The platform must implement similar protections—particularly for nesting raptors, owls, and endangered species.

Sharing behavior varies by trust level. Serious birders often share chase lists **with trusted friends** for trip planning but are cautious about public sharing. One birder noted: "I've shared a rare-bird sighting privately with a very few close friends and colleagues whom I know I can trust to approach the bird respectfully—and whom I have sworn to secrecy." The platform should support:
- Private lists (default)
- Sharing with selected contacts
- Anonymous contribution to aggregate data
- Explicit opt-in for any public visibility

**Aggregate chase list data** represents significant value for tour operators—knowing "47 users want Eastern Bristlebird" informs tour design and marketing. This can be implemented ethically by:
- Showing only aggregate demand (species-level counts)
- Never exposing individual user lists to operators without explicit consent
- Requiring explicit opt-in for inclusion in aggregate statistics
- Presenting demand trends without user attribution

---

## Anti-patterns that will drive away experienced birders

The 45-65 demographic has strong, consistent complaints about existing birding apps that the platform must avoid.

**Excessive gamification alienates serious birders.** Reviews of Birda—which positions itself as "Strava for Birdwatching"—reveal the tension: "The 'gamification' and badges might make for fun challenges for new birders. As someone who has been listing daily on eBird for years, I personally find it too time consuming and distracting." Badges, streaks, and XP systems that reward trivial actions (logging in, adding your first bird) feel childish to experts who have spent decades developing genuine mastery. One reviewer specifically criticized the "dumbing down" of the hobby.

**Complexity without purpose frustrates equally.** eBird receives complaints about rigid checklist requirements, slow GPS acquisition, and verification processes that feel adversarial: "The overhead for me constantly responding to requests to modify past sightings is too high. If they are going to continually pester me to make changes to my sighting logs from over a decade ago, my response is to remove my logs completely."

**Data lock-in generates immediate distrust.** Birda's lack of export functionality drew pointed criticism: "No export options. You can import from several other birding apps, but no export. It looks like they specifically want to keep you within their ecosystem... It just doesn't feel right to me."

The platform should embrace these principles:
- Utility over engagement—no unnecessary badges or streaks
- Professional visual design—avoid bright cartoon aesthetics
- Data portability—easy export in standard formats
- Respect for expertise—serious birders know what they saw and don't need verification for common species
- Minimal friction—quick, simple list creation without complex protocols
- No forced social sharing—make community features optional

What serious birders consider "dumbing down": oversimplified ID that ignores subspecies and morphs, inability to use preferred taxonomy (eBird/Clements vs. IOC), lack of detailed data fields, and generic experiences not tailored to expertise level.

---

## Patterns from adjacent domains worth adapting

**Fishbrain's species-location-timing optimization** offers a directly applicable model. Users filter by target species, see where others have caught them with success rate data, and receive "BiteTime" forecasts predicting optimal conditions. For birding tours, this translates to: filter tours by chase list species, show historical sighting success rates per tour, and display seasonal timing recommendations based on eBird bar chart data.

**iNaturalist's "Unobserved Species" dynamic lists** solve the cold start problem elegantly—showing species others have seen in a region that the user hasn't, effectively auto-generating a regional chase list. The platform should implement similar functionality: "Species possible on this tour that you haven't seen."

**eBird's three-tier alert system** (Rare Bird Alerts, Needs Alerts, ABA Rarities) provides the notification architecture to emulate. Adapt for tours: Rare Bird Tours (tours with recently sighted rarities), Chase List Matches (tours matching user's specific targets), and New Availability (spots opening on high-probability tours).

**Zooniverse's engagement without gamification** offers lessons for respecting serious contributors. Their core principle—"We strive to never waste the volunteers' time"—and focus on real scientific impact over arbitrary achievements aligns with what serious birders value. Show how tour bookings support conservation; provide feedback on how data contributes to citizen science.

**What doesn't translate from casual collection apps:** Pokemon GO-style daily streaks, arbitrary point systems, leaderboards rewarding quantity over quality, childish badge designs, and forced social sharing. These mechanics work for casual engagement but actively repel serious hobbyists who measure success through genuine discovery and mastery, not gamified achievements.

---

## Actionable UX recommendations by feature area

### List creation and management
- Implement hybrid species entry: autocomplete + 4-letter codes + taxonomic browse + visual "type" categories
- Accept eBird CSV import for life lists; auto-calculate "needs" for tour destinations
- Enable destination-based starter lists curated by tour operators
- Support multiple list types: life list, year list, regional lists (serious birders track all of these)
- Auto-remove species from chase lists upon logging as seen
- Export chase lists in CSV and printable PDF formats

### Prioritization and notifications
- Implement 4-tier priority system with per-tier notification settings
- Limit Tier 1 (must-see) to 10 species maximum to maintain notification value
- Provide frequency controls: immediate, daily digest, weekly summary
- Allow geographic radius filtering for alerts
- Include confirmation status indicators (verified sightings vs. unreviewed reports)

### Display and organization
- Default to taxonomic order; provide toggles for likelihood, priority, alphabetical, rarity
- Include bar charts (seasonal occurrence), range map thumbnails, recent sighting counts, photos, and audio
- Bold recent activity: "Last reported 3 days ago by 4 observers"
- Clearly distinguish vagrant/accidental species from uncommon species
- Show which lists each species would satisfy: "You need this for: Life list / Year list / Australia list"

### Privacy and social features
- Make lists private by default; require opt-in for any sharing
- Support selective sharing with trusted contacts
- Show only aggregate demand to tour operators (never individual lists)
- Implement sensitive species protections mirroring eBird's system
- Allow anonymous contribution to aggregate statistics

### Avoiding anti-patterns for the 45-65 demographic
- No daily streaks, XP points, or trivial badges
- No forced social sharing or mandatory leaderboards
- Professional visual design—clean, information-dense, not playful
- Respect expertise: don't require verification for common species from high-experience users
- Ensure data portability: users own their lists and can export anytime
- Minimize clicks: quick-add from recent/favorite species, no unnecessary confirmation screens

### Feature differentiation by experience level

| Feature | Novice Birder | Expert Birder (300-600+ species) |
|---------|---------------|----------------------------------|
| Cold start | Curated starter lists, "popular targets" | eBird import, auto-calculate needs |
| Species entry | Visual browse with photos | 4-letter codes, autocomplete |
| Metadata density | Basic: photo, range map | Full: bar charts, recent sightings, audio |
| Notifications | Conservative defaults | Granular control per species/tier |
| Taxonomy options | Hide complexity | Support eBird/Clements and IOC |
| Gamification | Optional light achievements | Completely disabled |

---

## Conclusion

The critical insight for designing chase lists is that **serious birders generate target lists contextually rather than maintaining static want lists**. The platform should function as a list generation tool—helping users discover which of their target species are possible on specific tours—rather than asking users to build and maintain comprehensive static lists.

Success hinges on respecting the expertise of the 45-65 demographic: use professional birding terminology (lifers, targets, needs), integrate with eBird (the undisputed standard), provide information-dense displays with bar charts and sighting data, and absolutely avoid patronizing gamification. The **10-25 species ceiling for active chase targets** prevents notification fatigue, while tiered prioritization ensures high-value alerts (tours targeting nemesis birds) cut through.

Privacy controls are non-negotiable—birding culture deeply values discretion around rare species locations. Aggregate data can inform tour operators about demand without exposing individual lists. Data portability (CSV export) builds trust and differentiates the platform from apps that lock users into ecosystems.

The adjacent domain research reveals that successful engagement with serious adult hobbyists comes from respecting their expertise and emphasizing genuine utility—not from badges, streaks, or points. Fishbrain's species-timing-location optimization, iNaturalist's dynamic unobserved lists, and eBird's tiered alert system offer proven patterns worth adapting. The platform that gets this right will capture a demographic willing to travel 6-8 hours and pay premium prices for a shot at their nemesis bird.