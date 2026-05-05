export interface SpeciesLocation {
  name: string;
  state: string;
  notes: string;
}

export interface SpeciesData {
  slug: string;
  commonName: string;
  scientificName: string;
  conservationStatus: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered';
  conservationStatusCode: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  tagline: string;
  heroDescription: string;
  fullDescription: string;
  bestLocations: SpeciesLocation[];
  bestSeason: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  habitatTypes: string[];
  topFacts: string[];
  metaDescription: string;
  keywords: string[];
  relatedSpeciesSlugs: string[];
}

export const speciesData: SpeciesData[] = [
  {
    slug: 'southern-cassowary',
    commonName: 'Southern Cassowary',
    scientificName: 'Casuarius casuarius',
    conservationStatus: 'Vulnerable',
    conservationStatusCode: 'VU',
    tagline: "Australia's most dangerous bird — and one of its most magnificent.",
    heroDescription:
      'Standing nearly two metres tall with iridescent blue-black plumage and a vivid cobalt neck, the Southern Cassowary is a living dinosaur roaming Queensland\'s tropical rainforests. The third-largest bird on Earth.',
    fullDescription: `The Southern Cassowary (Casuarius casuarius) is one of the most extraordinary birds in the world — a prehistoric giant that has been stalking the rainforests of Far North Queensland for millions of years. Standing up to 1.8 metres tall and weighing over 70 kg, cassowaries are the third-heaviest bird on Earth and the only surviving member of their family in Australia.

Their plumage is a deep, iridescent blue-black, offset by an extraordinary bare-skin neck in vivid shades of cobalt blue and crimson red. The casque — a distinctive bony helmet on their head — is unique among birds and may help these animals navigate dense rainforest undergrowth. Cassowaries are frugivores, playing an irreplaceable ecological role as seed dispersers for over 150 rainforest plant species.

Despite their fearsome reputation, cassowaries are shy birds that generally avoid human contact. The 'danger' comes from cornered or hand-fed birds; in the wild, you are far more likely to glimpse a fleeting shadow as one melts back into the forest. The Cape Tribulation and Daintree regions of Far North Queensland offer the best odds of a genuine sighting, particularly in the early morning when cassowaries move between fruiting trees.

Conservation pressures are significant — an estimated 4,000 birds remain in Australia. Vehicle strikes, dog attacks, and habitat loss to development are the primary threats. Responsible wildlife tourism that keeps cassowaries wild (never feeding them) plays a genuine role in the species' survival.`,
    bestLocations: [
      {
        name: 'Mission Beach',
        state: 'QLD',
        notes: 'Highest cassowary density in Australia. Early morning walks along the absolute beachfront and backing rainforest frequently yield sightings.',
      },
      {
        name: 'Daintree Rainforest / Cape Tribulation',
        state: 'QLD',
        notes: 'World Heritage rainforest with healthy cassowary population. Mossman Gorge and the Cape Trib road are key access points.',
      },
      {
        name: 'Kuranda',
        state: 'QLD',
        notes: 'Rainforest edges near the Barron River corridor. Less reliable than Mission Beach but accessible from Cairns.',
      },
      {
        name: 'Atherton Tablelands (wet sclerophyll edges)',
        state: 'QLD',
        notes: 'Cassowaries occasionally found at rainforest margins. Lake Eacham area reported.',
      },
    ],
    bestSeason: 'Year-round, but May–October (dry season) reduces leeches and makes rainforest walking more comfortable. Fruiting events in the wet season (Nov–Apr) bring cassowaries to the forest floor.',
    difficulty: 'Hard',
    habitatTypes: ['Tropical Rainforest', 'Wet Sclerophyll Forest', 'Melaleuca Swamp'],
    topFacts: [
      'Can kill a person with a single kick — the inner toe bears a dagger-like claw up to 12 cm long',
      'Males incubate eggs and raise chicks solo while females move on to find new mates',
      'Swallows fruit whole — can pass seeds of plants too large for any other animal to disperse',
      'Can run at 50 km/h through dense rainforest',
      'Estimated population of ~4,000 remaining in Australia',
    ],
    metaDescription:
      'See the Southern Cassowary in the wild. Where to find this prehistoric giant in Far North Queensland — Mission Beach, Daintree, Cape Tribulation — with expert birding tour advice.',
    keywords: [
      'southern cassowary',
      'cassowary sighting Queensland',
      'see cassowary Australia',
      'Mission Beach cassowary',
      'Daintree cassowary',
      'Cape Tribulation wildlife',
      'cassowary tour Queensland',
      'Australian cassowary tours',
    ],
    relatedSpeciesSlugs: ['superb-lyrebird', 'gouldian-finch'],
  },
  {
    slug: 'superb-lyrebird',
    commonName: 'Superb Lyrebird',
    scientificName: 'Menura novaehollandiae',
    conservationStatus: 'Least Concern',
    conservationStatusCode: 'LC',
    tagline: "Nature's greatest mimic lives in Victoria's mountain ash forests.",
    heroDescription:
      "The Superb Lyrebird is Australia's most iconic songbird — capable of mimicking chainsaws, camera shutters, and dozens of other species with breathtaking accuracy. The male's spectacular lyre-shaped tail is one of nature's greatest displays.",
    fullDescription: `The Superb Lyrebird (Menura novaehollandiae) is arguably Australia's most celebrated bird — a pheasant-sized songbird with an almost supernatural vocal ability and one of the most elaborate courtship displays in the natural world.

Males grow to 100 cm including the famous lyre-shaped tail, which takes seven years to develop fully. During winter courtship (June–August), males build earthen display mounds in forest clearings and perform extraordinary dances while spreading their tails into a shimmering fan, singing a continuous cascade of song that incorporates perfect mimicry of other bird species, animal calls, and even mechanical sounds like chainsaws, camera shutters, and car engines.

Female lyrebirds are master nest architects, building large domed nests in rock crevices or dense vegetation, raising a single chick alone. The chicks themselves can begin mimicking sounds within months of hatching.

Lyrebirds inhabit wet sclerophyll forests and rainforest edges in southeastern Australia, favouring areas with deep leaf litter where they forage for invertebrates by raking with powerful feet. They are best seen on quiet early mornings in the right habitat — the Dandenong Ranges outside Melbourne, Sherbrooke Forest in particular, offer some of Australia's most reliable encounters.

Victoria's mountain ash and messmate forests are the lyrebird's stronghold, making Gippsland and the ranges east of Melbourne prime territory for birders seeking this species.`,
    bestLocations: [
      {
        name: 'Sherbrooke Forest, Dandenong Ranges',
        state: 'VIC',
        notes: 'One of the most reliable lyrebird sites in Australia. Pirianda Gardens and the Sherbrooke picnic area are productive. Males actively display Jun–Aug.',
      },
      {
        name: 'Tarra-Bulga National Park',
        state: 'VIC',
        notes: 'Remote temperate rainforest south of Gippsland. Excellent lyrebird habitat with well-maintained walking tracks.',
      },
      {
        name: 'Budderoo National Park / Minnamurra Rainforest',
        state: 'NSW',
        notes: 'Accessible from Wollongong or the Illawarra. Excellent rainforest with a resident lyrebird population.',
      },
      {
        name: 'Royal National Park',
        state: 'NSW',
        notes: 'Southern sections near Waterfall and Audley. Lyrebirds regularly seen on the Currawong walking track.',
      },
    ],
    bestSeason: 'June–August for peak courtship display. Males sing year-round but are most active and visible during winter breeding season.',
    difficulty: 'Moderate',
    habitatTypes: ['Wet Sclerophyll Forest', 'Temperate Rainforest', 'Montane Forest'],
    topFacts: [
      'Males can incorporate over 20 different species\' calls into a single song sequence',
      'Has been documented mimicking chainsaws, camera shutters, car alarms, and even human voices',
      'Display tail takes 7 years to fully develop and comprises 16 specialised feathers',
      'Moves an estimated 11 cubic metres of leaf litter per year while foraging — shaping the forest floor',
      'After the 2019–20 Black Summer fires, lyrebird populations in Victoria and NSW declined significantly — though populations in protected areas remain stable',
    ],
    metaDescription:
      'Find the Superb Lyrebird in Victoria and NSW. Best locations, viewing tips, and expert birding tours to see Australia\'s greatest mimic — including Sherbrooke Forest and the Dandenong Ranges.',
    keywords: [
      'superb lyrebird',
      'lyrebird Victoria',
      'see lyrebird Australia',
      'Sherbrooke Forest lyrebird',
      'Dandenong Ranges birding',
      'lyrebird display',
      'lyrebird tour Victoria',
      'Gippsland birding',
    ],
    relatedSpeciesSlugs: ['glossy-black-cockatoo', 'gang-gang-cockatoo'],
  },
  {
    slug: 'glossy-black-cockatoo',
    commonName: 'Glossy Black-Cockatoo',
    scientificName: 'Calyptorhynchus lathami',
    conservationStatus: 'Vulnerable',
    conservationStatusCode: 'VU',
    tagline: 'The quietest, most elusive of the black cockatoos.',
    heroDescription:
      'Glossy Black-Cockatoos are the understated jewels of the Australian bush — dark, quiet, and entirely dependent on drooping sheoak seeds. Spotting one feeding in a casuarina takes patience but delivers an intimacy that other black cockatoos rarely allow.',
    fullDescription: `The Glossy Black-Cockatoo (Calyptorhynchus lathami) is the smallest and least conspicuous of Australia's five black cockatoo species — and arguably the most charming. Where Yellow-tailed and Red-tailed Black-Cockatoos announce themselves with raucous calls and drama, the Glossy is almost secretive, moving quietly through casuarina woodland and feeding with a focused patience that lets skilled observers get quite close.

Males are a deep, glossy brown-black with vivid red tail panels; females are mottled brown with yellow-orange speckling on the head and neck, making them surprisingly cryptic in dappled woodland light. Both sexes feed almost exclusively on seeds of sheoak (Allocasuarina and Casuarina species), extracting them from woody cones with powerful, precisely applied bill force.

This dietary specialisation makes Glossy Black-Cockatoos highly sensitive to habitat condition. They require mature, seed-producing sheoaks and are absent from landscapes where sheoak has been cleared or where hollow-bearing trees have been removed. The species is recovering in some areas through targeted revegetation programs.

In southeastern Australia, East Gippsland's coastal heathlands and Kangaroo Island in South Australia hold important populations. The Kangaroo Island subspecies (C. l. halmaturinus) is listed as Endangered following the catastrophic 2019–20 fires that burned much of its habitat.`,
    bestLocations: [
      {
        name: 'Mallacoota / East Gippsland coastal heath',
        state: 'VIC',
        notes: 'Small but reliable population in coastal heathland around Mallacoota Inlet. Best searched in sheoak stands near the inlet foreshore.',
      },
      {
        name: 'Kangaroo Island',
        state: 'SA',
        notes: 'The endemic subspecies halmaturinus is critically threatened but can be found in the island\'s surviving sheoak woodlands.',
      },
      {
        name: 'Capertee Valley',
        state: 'NSW',
        notes: 'The Capertee Valley supports an important population. Look in Allocasuarina woodland on the valley floor.',
      },
      {
        name: 'Blue Mountains, lower slopes',
        state: 'NSW',
        notes: 'Sheoak-lined creek gullies below the escarpment. Occasional sightings near Blackheath and Katoomba.',
      },
    ],
    bestSeason: 'Autumn and winter (April–August) when sheoak cones are mature and flocks are most predictable. In summer, birds range more widely and are harder to locate.',
    difficulty: 'Hard',
    habitatTypes: ['Coastal Heathland', 'Sheoak Woodland', 'Dry Sclerophyll Forest'],
    topFacts: [
      'Feeds almost exclusively on seeds of sheoak (Allocasuarina / Casuarina) — one of the most specialised diets of any Australian parrot',
      'Nests in hollows of large eucalypts — needs trees over 100 years old',
      'The Kangaroo Island subspecies is listed as Endangered — an estimated 370 birds remain after the 2019–20 fires',
      'Male and female plumage is strikingly different (pronounced sexual dimorphism)',
      'Flocks are usually small (5–30 birds), quiet, and easy to miss unless you know what to look for',
    ],
    metaDescription:
      'Spot the Glossy Black-Cockatoo in the wild. Best sites in Victoria, NSW, and Kangaroo Island — with expert birding guide advice for finding this elusive black cockatoo.',
    keywords: [
      'glossy black cockatoo',
      'glossy black cockatoo Victoria',
      'black cockatoo Australia',
      'Mallacoota birding',
      'Gippsland birds',
      'black cockatoo Kangaroo Island',
      'glossy black cockatoo tour',
      'Australian cockatoo species',
    ],
    relatedSpeciesSlugs: ['gang-gang-cockatoo', 'orange-bellied-parrot', 'superb-lyrebird'],
  },
  {
    slug: 'orange-bellied-parrot',
    commonName: 'Orange-bellied Parrot',
    scientificName: 'Neophema chrysogaster',
    conservationStatus: 'Critically Endangered',
    conservationStatusCode: 'CR',
    tagline: "One of the world's rarest birds makes an annual journey between Tasmania and mainland Australia.",
    heroDescription:
      "With fewer than 50 wild birds remaining, the Orange-bellied Parrot is Australia's most critically threatened species — and one of the most remarkable migratory birds on Earth. Each winter, a handful of survivors cross Bass Strait to the salt marshes of Victoria and South Australia.",
    fullDescription: `The Orange-bellied Parrot (Neophema chrysogaster) is one of the rarest birds on Earth — and one of the most poignant conservation stories in Australia. An estimated fewer than 50 wild birds now survive, supplemented by a captive insurance population that actively supports wild recruitment through release programs.

The species breeds only in the remote buttongrass moorlands of southwest Tasmania, nesting in hollows of ancient eucalypts in an area around Melaleuca, a remote wilderness accessible only by light plane or multi-day bushwalk. After breeding, the entire wild population migrates across Bass Strait to winter on the salt marsh and coastal heathland of southern Victoria and South Australia — a crossing of over 250 km over open ocean.

Males are electric grass-green with a vivid orange belly patch framed by blue on the forehead and leading edge of the wing. Females are duller, with a paler orange belly that can be absent in immatures. In the field, birds are best located by their sharp, buzzy calls as they move low through saltmarsh vegetation.

Wintering birds can be found at a small number of reliable sites, most accessibly at Werribee Treatment Plant and Altona/Laverton coastal wetlands near Melbourne, and at Milang, Coorong, and Mount Compass in South Australia. Sightings are never guaranteed — finding this bird requires dedication, good site knowledge, and sometimes patience across multiple days.

Captive breeding at multiple zoos and wildlife centres across Australia has proven essential for the species' survival, and releases of captive-bred birds into the wild have helped maintain the wild population.`,
    bestLocations: [
      {
        name: 'Werribee Treatment Plant',
        state: 'VIC',
        notes: 'The most reliably productive winter site. Coastal wetlands adjacent to the treatment plant support wintering birds Nov–Apr. Join organised survey days for guided access.',
      },
      {
        name: 'Altona / Laverton coastal wetlands',
        state: 'VIC',
        notes: 'Samphire-dominated salt marsh on Port Phillip Bay. Less traffic than Werribee but productive when birds are present.',
      },
      {
        name: 'Milang / Coorong',
        state: 'SA',
        notes: 'SA wintering sites. Coorong lagoon edges and Milang foreshore saltmarsh. Requires local knowledge.',
      },
      {
        name: 'Melaleuca, Southwest National Park',
        state: 'TAS',
        notes: 'The breeding grounds. Accessible only by small plane (light aircraft charter) or a 4–5 day bushwalk. The most committed birders make this pilgrimage each summer (Nov–Feb).',
      },
    ],
    bestSeason: 'Winter (May–September) on mainland sites for migrating birds. December–February at Melaleuca in Tasmania for breeding birds.',
    difficulty: 'Expert',
    habitatTypes: ['Coastal Saltmarsh', 'Samphire Wetland', 'Buttongrass Moorland (TAS)'],
    topFacts: [
      'Fewer than 50 wild birds remaining — one of Australia\'s rarest vertebrates',
      'Crosses Bass Strait (250+ km of open ocean) twice a year on migration',
      'Breeds only at Melaleuca in remote southwest Tasmania',
      'The orange belly patch is diagnostic — no other small parrot in southeastern Australia has this',
      'Active captive breeding programs at Healesville Sanctuary, Melbourne Zoo, and other facilities',
    ],
    metaDescription:
      'One of the world\'s rarest birds — the Orange-bellied Parrot migrates from Tasmania to coastal Victoria each winter. Where to look, when to visit, and the conservation story behind Australia\'s rarest parrot.',
    keywords: [
      'orange-bellied parrot',
      'orange bellied parrot Victoria',
      'rarest Australian birds',
      'Werribee birding',
      'Melaleuca Tasmania birding',
      'critically endangered Australian birds',
      'parrot migration Australia',
      'Australian rare birds',
    ],
    relatedSpeciesSlugs: ['swift-parrot', 'regent-honeyeater', 'plains-wanderer'],
  },
  {
    slug: 'regent-honeyeater',
    commonName: 'Regent Honeyeater',
    scientificName: 'Anthochaera phrygia',
    conservationStatus: 'Critically Endangered',
    conservationStatusCode: 'CR',
    tagline: "A bird so rare its song is being forgotten — now learning to sing from captive-raised companions.",
    heroDescription:
      "The Regent Honeyeater was once a nomadic wanderer across box-ironbark forests from Queensland to Victoria. Today, fewer than 300 birds survive in the wild — and captive-bred males are losing the songs that define their species.",
    fullDescription: `The Regent Honeyeater (Anthochaera phrygia) is one of Australia's most critically endangered birds — and its plight has become one of the most heartbreaking stories in conservation. Once so numerous that flocks of thousands darkened the skies over flowering ironbark forests, the Regent Honeyeater has been reduced to an estimated 150–300 wild birds.

The species is a large, striking honeyeater with a bold black and yellow pattern — males are unmistakable with scalloped yellow and black plumage and a bare, warty black face mask. They are specialist nectar feeders on box-ironbark and Canberra woodland eucalypt species, following the irregular flowering cycles of their preferred trees across a vast range from Queensland to South Australia.

The collapse has been driven primarily by clearing of box-ironbark woodland, which accelerated through the 20th century as the most fertile country was converted to agriculture. The remaining birds are highly nomadic and sparsely distributed, making encounters genuinely rare even in prime habitat.

Perhaps the most poignant measure of the decline: captive-bred males raised without older wild males to learn from are increasingly singing incorrect or incomplete songs — and struggling to attract mates. Conservation programs at Taronga Zoo and others are now working to teach young birds the correct song before release.

The species is the focus of one of Australia's most intensive conservation programs. Captive breeding and regular releases, combined with revegetation of box-ironbark woodland, offer hope — but the race is far from won.`,
    bestLocations: [
      {
        name: 'Capertee Valley, Capertee NP',
        state: 'NSW',
        notes: 'The most reliable site in Australia for wild Regent Honeyeaters. Spring (Aug–Oct) flowering of yellow box brings birds to a small area. Join BirdLife surveys for best odds.',
      },
      {
        name: 'Chiltern-Mount Pilot National Park',
        state: 'VIC',
        notes: 'Excellent box-ironbark woodland habitat. Irregular sightings depending on flowering. One of the priority sites for release of captive-bred birds.',
      },
      {
        name: 'Bundarra-Barraba area',
        state: 'NSW',
        notes: 'Remnant box woodland in the New England Tablelands. Known breeding records in good years.',
      },
      {
        name: 'Winton Wetlands',
        state: 'VIC',
        notes: 'Large restoration project near Benalla. Revegetation includes priority honeyeater food trees.',
      },
    ],
    bestSeason: 'August–October is optimal — spring flowering of yellow box and grey box brings birds to reliable locations. Nomadic birds can appear or disappear unpredictably year-round.',
    difficulty: 'Expert',
    habitatTypes: ['Box-Ironbark Woodland', 'Dry Sclerophyll Forest', 'Canberra Woodland'],
    topFacts: [
      'Estimated 150–300 wild birds remain — one of the rarest birds in Australia',
      'Captive-bred males raised without wild males are losing the species\' song — a behaviour transmission crisis',
      'Once numbered in the thousands; collapsed over the 20th century due to woodland clearing',
      'Specialist on yellow box and grey box flowering — must follow irregular, nomadic patterns',
      'Listed as Critically Endangered under both the EPBC Act and IUCN Red List',
    ],
    metaDescription:
      'Find the Regent Honeyeater in Australia. One of the country\'s rarest birds — where to look, the Capertee Valley, Chiltern, and what the captive breeding program is doing to save them.',
    keywords: [
      'regent honeyeater',
      'regent honeyeater Australia',
      'Capertee Valley birding',
      'critically endangered Australian birds',
      'box ironbark woodland birds',
      'regent honeyeater tours',
      'rare Australian birds',
      'threatened species birding',
    ],
    relatedSpeciesSlugs: ['orange-bellied-parrot', 'swift-parrot', 'plains-wanderer'],
  },
  {
    slug: 'gouldian-finch',
    commonName: 'Gouldian Finch',
    scientificName: 'Erythrura gouldiae',
    conservationStatus: 'Endangered',
    conservationStatusCode: 'EN',
    tagline: "The most colourful finch in the world calls the Northern Territory home.",
    heroDescription:
      "Few birds in the world rival the Gouldian Finch for sheer chromatic intensity — a living jewel of violet, yellow, green, and red that inhabits the savanna woodlands of the top end. Once common, now a genuine finch pilgrim's quest.",
    fullDescription: `The Gouldian Finch (Erythrura gouldiae) is widely considered the most beautiful finch in the world — a declaration that would be hyperbole if the bird weren't genuinely extraordinary. Adults are a kaleidoscope of purple-blue, brilliant yellow, grass-green, and either scarlet or black or (rarely) yellow on the head, with males being more intensely coloured than females.

The species inhabits savanna woodland in the Northern Territory, Western Australia's Kimberley, and adjacent Queensland, congregating around waterholes and rocky escarpments during the dry season when surface water is scarce. They feed primarily on ripe and half-ripe grass seeds, often seen feeding acrobatically in large flocks on seeding spear grasses.

Gouldian Finch populations have declined dramatically since European settlement — an estimated 95% decline since the 1800s. The species is now largely confined to the remote Kimberley and the Northern Territory's top end, with strongholds around Katherine and Pine Creek. The primary causes of decline are changes to fire management — specifically the loss of mosaic burning that indigenous Australians had maintained for tens of thousands of years — and the introduction of feral animals and exotic pasture grasses that outcompete native seed-producing grasses.

The best time to find Gouldian Finches is the dry season (May–August) when birds gather at waterholes and the savanna is more open. Sites around Darwin, Katherine, and the Daly River area can produce good sightings when birds are present.`,
    bestLocations: [
      {
        name: 'Holmes Jungle Nature Park',
        state: 'NT',
        notes: 'Just outside Darwin. Small population present year-round, best in dry season. Reliable site for visiting birders.',
      },
      {
        name: 'Katherine area (Low Level Reserve)',
        state: 'NT',
        notes: 'Katherine is the hub for Gouldian Finch trips in the NT. Dry season concentrations at waterholes can number in the hundreds.',
      },
      {
        name: 'Mount Barnett Station / Gibb River Road',
        state: 'WA',
        notes: 'The Kimberley stronghold for the species. The Gibb River Road provides access to remote habitat. Good camping with waterhole access.',
      },
      {
        name: 'Edith Falls (Leliyn), Nitmiluk NP',
        state: 'NT',
        notes: 'Reliable waterhole with Gouldian Finches in residence most years. Easy camping access.',
      },
    ],
    bestSeason: 'May–August (dry season). Birds concentrate at waterholes as surface water dries up. Easiest to find when feeding flocks visit waterholes in early morning and late afternoon.',
    difficulty: 'Hard',
    habitatTypes: ['Savanna Woodland', 'Eucalypt Woodland', 'Rocky Escarpment'],
    topFacts: [
      'Three head colour morphs — red, black, and yellow — occur in wild populations (red is most common)',
      'An estimated 95% population decline since European settlement',
      'Can fly up to 100 km in a day to find surface water in the dry season',
      'Listed as Endangered under the EPBC Act — an estimated 2,500 birds remain in the wild',
      'Breeding success is strongly linked to spear grass seed production, which depends on traditional fire management',
    ],
    metaDescription:
      'See the Gouldian Finch — Australia\'s most colourful bird — in the Northern Territory. Best sites, dry season timing, and expert advice for planning your Gouldian Finch birding trip.',
    keywords: [
      'gouldian finch',
      'gouldian finch Northern Territory',
      'see gouldian finch Australia',
      'Katherine birding',
      'NT birding tours',
      'Kimberley birds',
      'Australian finch species',
      'top end birding',
    ],
    relatedSpeciesSlugs: ['southern-cassowary', 'plains-wanderer'],
  },
  {
    slug: 'swift-parrot',
    commonName: 'Swift Parrot',
    scientificName: 'Lathamus discolor',
    conservationStatus: 'Critically Endangered',
    conservationStatusCode: 'CR',
    tagline: "The fastest parrot in Australia makes a winter migration that's one of conservation's most urgent battles.",
    heroDescription:
      "Swift Parrots breed only in Tasmania and migrate to mainland Australia each winter, following the flowering of eucalypts across a vast range. With sugar gliders preying heavily on nesting females, the wild population has entered a precipitous decline.",
    fullDescription: `The Swift Parrot (Lathamus discolor) is one of the world's three migratory parrots, breeding in the eucalypt forests of Tasmania before crossing Bass Strait each autumn to winter on the mainland. They are small, torpedo-shaped birds with rapid, swooping flight — bright grass-green with crimson on the face and a splash of cobalt on the crown.

The species is now Critically Endangered, with an estimated population of fewer than 2,000 birds. The primary threat is predation by introduced sugar gliders in Tasmania, which kill nesting females at rates that have halved the population in a decade. Sugar gliders were introduced to Tasmania by people keeping them as pets — they did not occur naturally there — and they are wreaking havoc on hollow-nesting birds across the island.

On mainland Australia, Swift Parrots winter in flowering eucalypt woodland from Queensland to South Australia, following the irregular flowering of yellow box, grey box, and related species. They can be found in flocks feeding actively in the canopy alongside other honeyeaters, with birds often visible at close range when feeding on flowers in lower trees.

The best mainland sites are in the ACT (Black Mountain, Canberra Nature Park) and adjacent NSW ranges when yellow box is flowering, and in the Capertee Valley and Box-Ironbark woodland of central Victoria.

The species is the subject of urgent legal battles over logging in Tasmania, which reduces hollow availability for nesting.`,
    bestLocations: [
      {
        name: 'Canberra Nature Park / Black Mountain',
        state: 'ACT',
        notes: 'Good flowering yellow box habitat around Canberra. Spring and autumn the most reliable times as birds move through on migration.',
      },
      {
        name: 'Chiltern-Mount Pilot NP',
        state: 'VIC',
        notes: 'Box-ironbark woodland. Good winter–spring sightings in years when flowering is occurring.',
      },
      {
        name: 'Sturt National Park / Capertee Valley',
        state: 'NSW',
        notes: 'Irregular but good sightings in years with strong woodland flowering.',
      },
      {
        name: 'East Gippsland / Mallacoota area',
        state: 'VIC',
        notes: 'Occasional reports from coastal heathland and eucalypt forest on migration.',
      },
    ],
    bestSeason: 'April–October on the mainland as birds winter away from Tasmania. Spring (August–October) is best as birds are moving north and woodland flowering peaks.',
    difficulty: 'Hard',
    habitatTypes: ['Box-Ironbark Woodland', 'Eucalypt Forest', 'Coastal Heathland'],
    topFacts: [
      'One of only three migratory parrot species in the world',
      'Population less than 2,000 birds — classified as Critically Endangered',
      'Sugar gliders introduced to Tasmania are killing nesting females at catastrophic rates',
      'Can fly 800+ km on migration across Bass Strait and down the east coast',
      'Feeds almost exclusively on nectar and pollen of eucalypts on the mainland',
    ],
    metaDescription:
      'Find the Swift Parrot on the Australian mainland. Where to see this critically endangered migratory parrot in Victoria, ACT, and NSW — with expert birding guide advice.',
    keywords: [
      'swift parrot',
      'swift parrot Australia',
      'critically endangered parrot',
      'migratory parrot Australia',
      'Canberra birding',
      'Chiltern birding',
      'swift parrot conservation',
      'Victorian rare birds',
    ],
    relatedSpeciesSlugs: ['orange-bellied-parrot', 'glossy-black-cockatoo', 'regent-honeyeater'],
  },
  {
    slug: 'plains-wanderer',
    commonName: 'Plains-wanderer',
    scientificName: 'Pedionomus torquatus',
    conservationStatus: 'Critically Endangered',
    conservationStatusCode: 'CR',
    tagline: "Australia's rarest grassland bird — a living fossil with no close relatives on Earth.",
    heroDescription:
      "The Plains-wanderer is one of the world's most unusual birds — a near-flightless grassland specialist that has occupied Australia's native grasslands since the Oligocene. Today, fewer than 1,000 birds survive across a handful of fragmentary grassland sites.",
    fullDescription: `The Plains-wanderer (Pedionomus torquatus) is an extraordinary bird that defies easy categorisation. It looks superficially like a buttonquail but is not closely related to them — it occupies its own monotypic family Pedionomidae and its nearest relatives are thought to be the jacanas and sandpipers of the shorebird group. This makes it one of the most evolutionarily distinct birds in Australia.

Plains-wanderers are small (around 15–19 cm), secretive birds that inhabit sparse native grasslands — specifically the open, stony, sparsely vegetated plains that characterise the floodplains and interfluvial areas of the western slopes and Riverina of NSW, Victoria, and southern Queensland. They are highly cryptic, relying on camouflage and a tendency to crouch motionless in sparse ground cover.

The female Plains-wanderer is larger and more brightly coloured than the male — a reversal of the usual bird pattern — and takes an active role in courtship while the male incubates eggs and raises the young (polyandry). This role reversal, combined with the bird's ancient lineage and specific habitat requirements, makes it a remarkable study in avian evolution.

The species has declined catastrophically since European settlement. Conversion of native grassland to cropland and improved pasture, combined with overgrazing, drought, and the suppression of natural fire regimes that kept grassland structure open and suitable, has reduced the population to an estimated fewer than 1,000 birds, largely confined to a few sites around Hay in NSW, the Riverina, and nearby Queensland grasslands.

Finding a Plains-wanderer requires either a guided survey with local knowledge or significant patience and a night spotlight — birds are most active and visible in low ambient light.`,
    bestLocations: [
      {
        name: 'Hay area / Riverina',
        state: 'NSW',
        notes: 'The most reliable area for Plains-wanderers in Australia. Sparse native grassland around Hay, Booligal, and the Lachlan floodplain. Specialist guided surveys offer the best access.',
      },
      {
        name: 'Terrick Terrick National Park',
        state: 'VIC',
        notes: 'Victorian stronghold for the species. Native grassland restoration has improved habitat quality. Spotlight surveys on still nights in summer.',
      },
      {
        name: 'Sunraysia district / Raak Plain',
        state: 'VIC',
        notes: 'Occasional records from sparse native grassland in far northwest Victoria.',
      },
      {
        name: 'Darling Downs (Gurulmundi area)',
        state: 'QLD',
        notes: 'Queensland records on private farmland with remnant native grassland. Requires landowner permission.',
      },
    ],
    bestSeason: 'October–February (summer). Plains-wanderers are more active and detectable in summer, especially after rain events that green up native grass cover. Night spotlighting most productive.',
    difficulty: 'Expert',
    habitatTypes: ['Native Grassland', 'Mitchell Grass Plain', 'Floodplain Grassland'],
    topFacts: [
      'The only member of its family — no close relatives anywhere in the world',
      'Females are larger and more colourful than males, and pursue males — a role reversal',
      'Fewer than 1,000 birds estimated to remain in the wild',
      'Lived in Australian grasslands since the Oligocene (33–23 million years ago)',
      'Almost entirely sedentary — birds stay within a few kilometres of their birth site their whole lives',
    ],
    metaDescription:
      'Find the Plains-wanderer in the wild — one of Australia\'s rarest birds. Best sites in the NSW Riverina, Terrick Terrick Victoria, and expert night survey tips for this ancient grassland specialist.',
    keywords: [
      'plains wanderer',
      'plains-wanderer Australia',
      'Riverina birding',
      'rare Australian grassland birds',
      'Terrick Terrick birding',
      'critically endangered birds Australia',
      'night spotlight birding Australia',
      'Australian grassland birds',
    ],
    relatedSpeciesSlugs: ['regent-honeyeater', 'orange-bellied-parrot'],
  },
  {
    slug: 'gang-gang-cockatoo',
    commonName: 'Gang-gang Cockatoo',
    scientificName: 'Callocephalon fimbriatum',
    conservationStatus: 'Endangered',
    conservationStatusCode: 'EN',
    tagline: "Victoria's avian emblem — a creaking, clowning cockatoo of the mountain forests.",
    heroDescription:
      "The Gang-gang Cockatoo is a beloved resident of Victoria's alpine ash and mountain forests. Males with their vivid red crest are unmistakable; the creaking-gate call is one of Australia's most distinctive bird sounds.",
    fullDescription: `The Gang-gang Cockatoo (Callocephalon fimbriatum) is one of Australia's most endearing parrots and the formal avian emblem of the Australian Capital Territory. Despite this distinction it is now classified as Endangered, with the 2019–20 Black Summer bushfires burning through an estimated 70–80% of its core breeding range in Victoria and NSW.

Gang-gangs are medium-sized, stocky cockatoos with a scalloped grey plumage that gives them an almost knitted appearance. Males are immediately identified by their striking red heads and crests; females are grey with a faint green wash and orange-edged feathers on the belly. Both sexes have the distinctive creaking, rusty-hinge call that carries clearly through mountain forest.

During spring and summer, Gang-gangs breed in the tall mountain ash and alpine ash forests of the Victorian and NSW ranges, nesting in large hollows in mature eucalypts. In autumn and winter, they move to lower altitudes — often appearing in suburban parks and gardens in Canberra, the Dandenong Ranges, and alpine fringe towns like Bright and Harrietville.

Post-fire recovery is complicated by the loss of hollow-bearing trees. Gang-gangs need old trees with large hollows for nesting, and the fires destroyed many of these. Conservation programs are now installing nest boxes in recovering forest as a stopgap measure.

Winter visits to Canberra's suburbs or the Dandenong Ranges east of Melbourne offer some of the most reliable encounters — birds regularly feed on berry-producing ornamental trees in gardens and street plantings.`,
    bestLocations: [
      {
        name: 'Dandenong Ranges (Belgrave, Sherbrooke)',
        state: 'VIC',
        notes: 'Excellent habitat for Gang-gangs year-round. Sherbrooke Forest and surrounding suburbs see frequent sightings. Often found alongside Superb Lyrebirds.',
      },
      {
        name: 'Canberra suburbs (winter)',
        state: 'ACT',
        notes: 'Gang-gangs descend from the ranges to feed on berry-producing trees in suburban Canberra gardens April–August. Check ornamental hawthorns, cotoneasters, and berry-bearing natives.',
      },
      {
        name: 'Alpine Victoria (Bright, Mount Hotham area)',
        state: 'VIC',
        notes: 'Breeding habitat in mountain ash forest. Good in spring and early summer before birds descend.',
      },
      {
        name: 'Tharwa Valley / Namadgi National Park',
        state: 'ACT',
        notes: 'Montane forest and alpine ash. One of the most reliable year-round sites after the fires.',
      },
    ],
    bestSeason: 'Year-round. Summer in mountain forest (breeding). Winter in lower-altitude gardens and open woodland (feeding on berries). Autumn and winter in Canberra suburbs is the most accessible.',
    difficulty: 'Moderate',
    habitatTypes: ['Mountain Ash Forest', 'Alpine Ash Forest', 'Subalpine Woodland', 'Suburban Parks'],
    topFacts: [
      'The formal bird emblem of the Australian Capital Territory',
      'Classified as Endangered after the 2019–20 Black Summer fires burned 70–80% of its breeding range',
      'The "creaking gate" call is one of the most distinctive sounds of Australian mountain forest',
      'Males and females look completely different — this pronounced sexual dimorphism is unusual among cockatoos',
      'Regularly feeds on berry-producing ornamental trees in gardens during winter — an easy urban encounter',
    ],
    metaDescription:
      'Spot the Gang-gang Cockatoo in Victoria and the ACT. Best sites in the Dandenong Ranges, Canberra, and alpine Victoria — guide tips for finding the endangered mountain cockatoo.',
    keywords: [
      'gang-gang cockatoo',
      'gang gang cockatoo Victoria',
      'Canberra birds winter',
      'Dandenong Ranges birding',
      'endangered cockatoos Australia',
      'Victorian mountain birds',
      'gang-gang cockatoo ACT',
      'alpine birding Australia',
    ],
    relatedSpeciesSlugs: ['superb-lyrebird', 'glossy-black-cockatoo'],
  },
  {
    slug: 'malleefowl',
    commonName: 'Malleefowl',
    scientificName: 'Leipoa ocellata',
    conservationStatus: 'Vulnerable',
    conservationStatusCode: 'VU',
    tagline: "Australia's ancient megapode — an engineer that builds mounds the size of a small car.",
    heroDescription:
      "The Malleefowl is one of the most remarkable birds on Earth — a turkey-sized ground bird that constructs enormous incubation mounds from organic material, then tends them for months, regulating the internal temperature with extraordinary precision.",
    fullDescription: `The Malleefowl (Leipoa ocellata) is one of Australia's most fascinating birds — a large, intricately patterned megapode that uses a remarkable biological alternative to sitting on eggs: instead, it builds a massive mound of leaf litter and soil that generates heat through decomposition, then tends that mound meticulously to maintain the precise temperature required for incubation.

Males begin building or refurbishing their mound in autumn and winter, accumulating up to four tonnes of organic material in a mound that can be 5 metres across and 1.5 metres high. Through winter, the decaying leaf litter at the mound's core generates heat; by spring, the male opens and closes the mound daily — using his sensitive bill and tongue as a thermometer — to maintain the target temperature of around 33°C. A single male may tend his mound for 11 months of the year.

The species inhabits mallee scrub and inland semi-arid woodland, relying on the deep accumulation of leaf litter for mound construction. They are widespread but sparsely distributed and secretive, their complex mottled brown-grey plumage rendering them almost invisible against the mallee floor.

Malleefowl populations have declined severely since European settlement — fox predation on chicks and eggs is the primary driver, combined with habitat clearance and changed fire regimes. Finding Malleefowl often requires specific site knowledge or visiting a reserve with active monitoring programs.`,
    bestLocations: [
      {
        name: 'Murraylands (Pinnaroo area)',
        state: 'SA',
        notes: 'Good mallee habitat with resident Malleefowl. Murray Mallee region supports a reasonable population.',
      },
      {
        name: 'Hattah-Kulkyne National Park',
        state: 'VIC',
        notes: 'Murray mallee habitat. Good spring and autumn when birds are more active around mounds.',
      },
      {
        name: 'Wyperfeld National Park',
        state: 'VIC',
        notes: 'Excellent mallee habitat. Malleefowl monitoring program in place — can arrange guided mound visits.',
      },
      {
        name: 'Bilby Reserve / Scotia Sanctuary',
        state: 'NSW',
        notes: 'Feral predator-free reserves in western NSW include Malleefowl in their conservation programs.',
      },
    ],
    bestSeason: 'August–December for mound activity as birds add material and males begin temperature regulation. Mornings near active mounds are best.',
    difficulty: 'Hard',
    habitatTypes: ['Mallee Scrub', 'Semi-arid Woodland', 'Inland Heathland'],
    topFacts: [
      'Males regulate mound temperature to within 1°C of 33°C over the 11-month incubation period',
      'Chicks hatch fully feathered and independent — parents provide no further care',
      'A single mound can take decades to build, with generations reusing the same structure',
      'Listed as Vulnerable federally and in all states where it occurs',
      'Fox predation on chicks and eggs is the primary driver of population decline',
    ],
    metaDescription:
      'Find the Malleefowl — one of Australia\'s most remarkable birds — in the mallee and semi-arid woodlands of Victoria, SA, and NSW. Best sites and guided tour advice.',
    keywords: [
      'malleefowl',
      'malleefowl Victoria',
      'mallee birds Australia',
      'malleefowl mound',
      'Wyperfeld National Park birds',
      'Australian megapode',
      'inland birding Australia',
      'mallee wildlife tours',
    ],
    relatedSpeciesSlugs: ['plains-wanderer', 'southern-cassowary'],
  },
];

export function getSpeciesBySlug(slug: string): SpeciesData | undefined {
  return speciesData.find((s) => s.slug === slug);
}

export function getRelatedSpecies(slugs: string[]): SpeciesData[] {
  return slugs
    .map((slug) => speciesData.find((s) => s.slug === slug))
    .filter((s): s is SpeciesData => s !== undefined);
}

export const conservationStatusColors: Record<string, { bg: string; text: string; label: string }> = {
  LC: { bg: '#d6ebe3', text: '#1b3d2f', label: 'Least Concern' },
  NT: { bg: '#d6ebe3', text: '#2a6048', label: 'Near Threatened' },
  VU: { bg: '#f5e8d6', text: '#7a4f1a', label: 'Vulnerable' },
  EN: { bg: '#fdf0ee', text: '#922b21', label: 'Endangered' },
  CR: { bg: '#fdf0ee', text: '#7d1a13', label: 'Critically Endangered' },
};
