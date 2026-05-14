export interface DestinationHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface DestinationOperator {
  name: string;
  slug: string;
  description: string;
}

export interface DestinationData {
  slug: string;
  name: string;
  region: string;
  state: string;
  tagline: string;
  heroDescription: string;
  fullDescription: string;
  keyBirds: string[];
  highlights: DestinationHighlight[];
  bestSeason: string;
  gettingThere: string;
  wherToStay: string;
  relatedOperators: DestinationOperator[];
  metaDescription: string;
  keywords: string[];
  relatedDestinationSlugs: string[];
}

export const destinationsData: DestinationData[] = [
  {
    slug: 'mallacoota-east-gippsland',
    name: 'Mallacoota & East Gippsland',
    region: 'East Gippsland, Victoria',
    state: 'VIC',
    tagline: 'Where Victoria\'s ancient forests meet the sea — one of Australia\'s last great wilderness birding frontiers.',
    heroDescription:
      "Mallacoota sits at the far end of East Gippsland — a remote coastal town tucked between the Genoa River and the sea, surrounded by Croajingolong National Park's wild coastline, ancient forests, and one of Victoria's most spectacular inlets. For birders, it's a genuine destination: seabirds, forest endemics, and waterbirds all within walking distance of town.",
    fullDescription: `Mallacoota is one of those places that earns its mystique. Accessible only by a long drive from Melbourne (6+ hours) or a scenic route via Canberra, it sits at the far eastern edge of Victoria — backed by the vast wilderness of Croajingolong National Park and facing Bass Strait's open waters.

For birders, this remoteness is the point. Mallacoota Inlet is one of the most biodiverse estuaries in southeastern Australia, supporting large populations of waterbirds and shorebirds alongside a rich variety of forest species just moments from the water's edge. The town itself is surrounded by Croajingolong National Park — a UNESCO Biosphere Reserve — which protects some of the least-disturbed coastal temperate rainforest in Victoria.

**The Inlet**

Mallacoota Inlet is the star attraction. The upper and lower lakes system spans thousands of hectares of sheltered water, offering exceptional habitat for pelicans, cormorants, herons, egrets, spoonbills, and terns. The inlet narrows dramatically near the township, making it ideal for scanning from the shoreline. Local boat tours — including those run by Mallacoota Cruises — access parts of the inlet otherwise impossible to reach, bringing birders to undisturbed shorebird and waterbird assemblages.

**The Forests**

Croajingolong's forests are among the tallest in Victoria, dominated by mountain ash, silvertop ash, and coastal blackbutt. They support a rich assemblage of forest birds: Superb Lyrebirds are regularly heard and occasionally seen in the deep gullies, Glossy Black-Cockatoos feed in coastal sheoak stands, and a suite of honeyeaters and thornbills occupy different forest strata.

**Pelagic and Seabird Interest**

Mallacoota's exposed Bass Strait coastline and the proximity of warm East Australian Current eddies to cold southern water make it an excellent location for pelagic seabirds. Shearwaters, petrels, and albatrosses pass offshore on migration, particularly in autumn and spring. Boat trips out through the inlet bar can access pelagic species.

**The Black Summer Legacy**

Mallacoota gained global attention during the 2019–20 Black Summer bushfires, when the town was cut off by fire and thousands of people sheltered on the beach as the sky turned black. The fires affected large areas of Croajingolong NP, but Mallacoota's core forest and inlet habitat survived largely intact. The recovery of fire-affected areas is ongoing — and the town's resilience, and the role played by local operators like Dale Winward of Mallacoota Cruises in wildlife rescue during the fires, is part of the destination's story.`,
    keyBirds: [
      'Glossy Black-Cockatoo',
      'Superb Lyrebird',
      'White-bellied Sea-Eagle',
      'Osprey',
      'Australian Pelican',
      'Royal Spoonbill',
      'Little Tern',
      'Sooty Oystercatcher',
      'Gang-gang Cockatoo',
      'Azure Kingfisher',
      'Tawny Frogmouth',
      'Wedge-tailed Eagle',
    ],
    highlights: [
      {
        icon: '🚤',
        title: 'Inlet boat tours',
        description:
          'Mallacoota Cruises operates guided wildlife and birding tours on the inlet, including the historic M.V. Loch-Ard. Seabirds, raptors, and waterbirds viewed from the water.',
      },
      {
        icon: '🌲',
        title: 'Croajingolong National Park',
        description:
          'UNESCO Biosphere Reserve protecting 87,500 ha of wild coastline, forest, and heath. Walking tracks from town access excellent birding habitat.',
      },
      {
        icon: '🦅',
        title: 'Sea eagle and osprey nesting',
        description:
          'White-bellied Sea-Eagles and Ospreys nest along the inlet — viewable from the shoreline and by boat. One of the most reliable sea eagle sites in Victoria.',
      },
      {
        icon: '🌊',
        title: 'Bass Strait seabird passage',
        description:
          'Autumn and spring bring shearwaters, petrels, and albatrosses past the coastline. The inlet bar is a good vantage point.',
      },
    ],
    bestSeason:
      'Year-round, but spring (September–November) and autumn (March–May) are outstanding for migratory shorebirds, terns, and seabird passage. Summer (Dec–Feb) is peak holiday season but still excellent for forest birds and waterbirds.',
    gettingThere:
      'Mallacoota is 520 km east of Melbourne via the Princes Highway and Genoa. Allow 6–7 hours by car. The nearest town is Cann River (68 km) or Bairnsdale (240 km). There is no public transport to Mallacoota.',
    wherToStay:
      'Mallacoota has a small range of accommodation from caravan parks (Adobe Flats, Beachcomber) to holiday houses and B&Bs. Book well ahead for summer and Easter. The Mallacoota Hotel provides pub accommodation.',
    relatedOperators: [
      {
        name: 'Mallacoota Cruises',
        slug: 'mallacoota-cruises',
        description:
          'Local specialist run by Dale Winward, operating wildlife and birding cruises on Mallacoota Inlet aboard the historic M.V. Loch-Ard. Deep local knowledge and a compelling conservation story.',
      },
    ],
    metaDescription:
      'Birding tours Mallacoota — a guide to one of Victoria\'s best-kept birding secrets. Inlet boat tours, Croajingolong National Park, and East Gippsland\'s extraordinary wildlife. Best birds, best season, and how to get there.',
    keywords: [
      'birding tours Mallacoota',
      'Mallacoota birding',
      'East Gippsland wildlife tours',
      'Croajingolong National Park birds',
      'Mallacoota Inlet wildlife',
      'Gippsland birding guide',
      'Victoria birdwatching',
      'bird watching East Gippsland',
      'wildlife tours Mallacoota',
    ],
    relatedDestinationSlugs: ['gippsland-lakes'],
  },
  {
    slug: 'gippsland-lakes',
    name: 'Gippsland Lakes & Bairnsdale Region',
    region: 'Central Gippsland, Victoria',
    state: 'VIC',
    tagline: "Australia's largest inland waterway system — a birder's haven of wetlands, heathlands, and coastal forest.",
    heroDescription:
      "The Gippsland Lakes are Australia's largest coastal lake system — a vast network of lakes, lagoons, and coastal heathlands that supports one of Victoria's richest waterbird assemblages. Bairnsdale is the gateway to a region where birding opportunities span from the alpine forests to the coast.",
    fullDescription: `The Gippsland Lakes — Lake Wellington, Lake Victoria, Lake King, and the Gippsland Lakes Coastal Park — form the largest coastal lake system in Australia. This interconnected waterway stretches over 400 km² and supports extraordinary bird diversity across multiple habitat types: open water, reed beds, salt marsh, coastal heath, and adjacent river forests.

**Waterbirds and Wetlands**

The lakes system supports one of Victoria's best assemblages of waterbirds. Australian Pelicans are a constant presence, and large numbers of cormorants, herons, and egrets work the shallows. Lake Wellington is particularly productive for diving ducks, grebes, and vagrant waterfowl. The Gippsland Lakes Ramsar site recognises its international significance for migratory shorebirds using the East Asian–Australasian Flyway.

**Lakes Entrance and the Ninety Mile Beach**

Lakes Entrance — where the lakes meet the sea — is an excellent location for scanning ocean birds. The bar provides opportunities for gannet, tern, and occasionally albatross sightings. The extensive Ninety Mile Beach backing onto the Gippsland Lakes Coastal Park has excellent shorebird habitat.

**East Gippsland Forests**

Further east, the forests of East Gippsland — including the Mitchell River area and the remote lowland forests of the Snowy River — hold significant populations of forest birds. Gang-gang Cockatoos, Glossy Black-Cockatoos, and the full suite of Gippsland forest species are accessible with some searching.

**Gateway to Mallacoota**

Bairnsdale serves as the natural gateway for tours heading further east to Mallacoota. The 240 km drive east passes through some of Victoria's most productive birding country, including the Mitchell River NP, Buchan caves area (Grey-headed Flying-fox colony, cave-dwelling owls), and the Tambo River corridor.`,
    keyBirds: [
      'Australian Pelican',
      'Australasian Gannet',
      'Little Tern',
      'Crested Tern',
      'White-bellied Sea-Eagle',
      'Brolga',
      'Royal Spoonbill',
      'Latham\'s Snipe',
      'Hooded Plover',
      'Azure Kingfisher',
      'Glossy Black-Cockatoo',
      'Gang-gang Cockatoo',
    ],
    highlights: [
      {
        icon: '🌊',
        title: 'Gippsland Lakes waterbird richness',
        description:
          "Australia's largest coastal lake system supports exceptional waterbird diversity year-round, including nationally significant Ramsar-listed wetlands.",
      },
      {
        icon: '🏖️',
        title: 'Ninety Mile Beach shorebirds',
        description:
          'The Gippsland Lakes Coastal Park coastline provides important habitat for migratory shorebirds using the East Asian–Australasian Flyway.',
      },
      {
        icon: '🦅',
        title: 'Lakes Entrance bar seabirds',
        description:
          'The ocean entrance at Lakes Entrance offers excellent vantage over Bass Strait for gannets, terns, and occasional pelagic species.',
      },
      {
        icon: '🌲',
        title: 'East Gippsland forest wildlife',
        description:
          'The forests east of Bairnsdale are among the most wildlife-rich in Victoria — wombats, bandicoots, gliders, and a superb range of forest birds.',
      },
    ],
    bestSeason:
      'Year-round birding. Summer (Dec–Feb) is outstanding for terns, shorebirds, and seabirds. Winter (Jun–Aug) for waterbird concentrations on the lakes.',
    gettingThere:
      'Bairnsdale is 280 km east of Melbourne on the Princes Highway — about 3 hours by car. Regular V/Line train and coach services run from Southern Cross Station. Local car hire available for exploring the region.',
    wherToStay:
      'Bairnsdale has good accommodation including motels, caravan parks, and B&Bs. Lakes Entrance is a holiday resort town with a wide range of options. Book ahead for summer.',
    relatedOperators: [],
    metaDescription:
      'Birding the Gippsland Lakes and Bairnsdale region — a guide to Australia\'s largest coastal lake system and gateway to East Gippsland\'s extraordinary wildlife.',
    keywords: [
      'Gippsland Lakes birding',
      'Bairnsdale wildlife tours',
      'East Gippsland birding guide',
      'Lakes Entrance birds',
      'Gippsland waterbirds',
      'Victoria birding destinations',
      'wetland birding Victoria',
      'Gippsland nature tours',
    ],
    relatedDestinationSlugs: ['mallacoota-east-gippsland'],
  },
  {
    slug: 'atherton-tablelands',
    name: 'Atherton Tablelands',
    region: 'Wet Tropics, Far North Queensland',
    state: 'QLD',
    tagline: "Australia's premier birding destination — a World Heritage highland where rainforest endemics live alongside the most bird-rich landscape on the continent.",
    heroDescription:
      'Rising from the tropical coast behind Cairns, the Atherton Tablelands is a cool, green highland blanketed in World Heritage rainforest and mosaic farmland. It holds more bird species than anywhere else in Australia of comparable size — and includes a suite of endemic species found nowhere else on Earth.',
    fullDescription: `The Atherton Tablelands is, without qualification, one of the finest birding destinations in the world. Sitting at 700–1100 metres above sea level and stretching roughly 80 km south from the Kuranda Range, it is the highland heart of Queensland's Wet Tropics — a UNESCO World Heritage Area protecting some of the most ancient and biodiverse rainforest in Australia.

What makes the Tablelands extraordinary is its concentration of range-restricted and endemic species. The Wet Tropics is one of the global hotspots of bird endemism. Species found here and nowhere else on Earth include the Chowchilla, Fernwren, Mountain Thornbill, Tooth-billed Bowerbird, Golden Bowerbird, Bower's Shrike-thrush, and the spectacular Victoria's Riflebird. These are not shy birds that require specialist techniques to locate — most are accessible to any patient birder willing to sit quietly at forest edges in the morning.

**The crater lakes**

Lake Eacham and Lake Barrine — two ancient volcanic crater lakes set in pristine rainforest — are among the most accessible birding hotspots in the Tablelands. Pied Monarchs, Spectacled Monarchs, Spotted Catbirds, Olive-backed Sunbirds, and Buff-breasted Paradise Kingfishers (in season) can be found within 50 metres of the carparks. The lake edges provide open water for waterfowl and the chance of Papuan Frogmouth on the dawn circuit.

**Platypus and grassland edges**

The Tablelands is one of the most reliable places in Australia to see a Platypus. The Tully River at Malanda and Yungaburra's Peterson Creek are famous sites. The farm paddocks and forest edges around Malanda, Millaa Millaa, and Ravenshoe support open-country specialists: Black-throated Finch occurs here at the southern edge of its Queensland range, and Brolgas are regular in the wetter paddocks.

**Accessibility**

Cairns is the gateway. The Tablelands begin 25 km west of the city, and most key birding sites are within 60–90 minutes' drive. Yungaburra is the most popular base for birding visitors — a small town with good accommodation, cafes, and a compact layout that puts rainforest edge habitat literally next to the main street. Day trips from Cairns are entirely feasible.`,
    keyBirds: [
      'Chowchilla',
      'Fernwren',
      'Mountain Thornbill',
      'Golden Bowerbird',
      'Tooth-billed Bowerbird',
      "Victoria's Riflebird",
      'Buff-breasted Paradise Kingfisher',
      'Spotted Catbird',
      'Pied Monarch',
      'Platypus',
      'Lumholtz\'s Tree-kangaroo',
      'Boyd\'s Forest Dragon',
    ],
    highlights: [
      {
        icon: '🦜',
        title: 'Endemic species cluster',
        description:
          'More range-restricted and endemic birds than anywhere else in Australia. Chowchilla, Fernwren, and Golden Bowerbird are Tablelands specialties found nowhere else on Earth.',
      },
      {
        icon: '🏞️',
        title: 'Crater lakes circuit',
        description:
          'Lake Eacham and Lake Barrine offer paved walking tracks through undisturbed rainforest with exceptional access to montane forest species. Car-accessible and beginner-friendly.',
      },
      {
        icon: '🦫',
        title: 'Platypus at dawn',
        description:
          "Peterson Creek at Yungaburra and the Malanda area are among Australia's most reliable sites for dawn Platypus viewing.",
      },
      {
        icon: '🌿',
        title: 'World Heritage rainforest',
        description:
          'The Wet Tropics rainforest is among the oldest in the world — fragments of Gondwanan vegetation that have survived in this highland for 180 million years.',
      },
    ],
    bestSeason: 'May to October (dry season) is the most comfortable for birding. November–April is the wet season — hot, humid, and prone to cyclone activity, but Buff-breasted Paradise Kingfishers arrive from New Guinea in late October and are present through summer. Year-round birding is productive; the Tablelands is not highly seasonal for resident species.',
    gettingThere:
      'Fly into Cairns Airport. The Tablelands begin 25 km west via the Kennedy Highway (Kuranda Range). Yungaburra is the birding base of choice — 80 km from Cairns. Car hire is essential; there is no public transport serving the birding sites.',
    wherToStay:
      'Yungaburra has the best range of birder-friendly accommodation: B&Bs, guesthouses, and a caravan park all within walking distance of the main birding sites. Malanda and Ravenshoe offer motel accommodation for those exploring the southern Tablelands. Atherton has the most services and is centrally located.',
    relatedOperators: [],
    metaDescription:
      "Atherton Tablelands birding guide — Australia's finest endemic birding destination. Chowchilla, Fernwren, Golden Bowerbird, Buff-breasted Paradise Kingfisher, and 400+ species in Queensland's World Heritage rainforest.",
    keywords: [
      'Atherton Tablelands birding',
      'Atherton Tablelands birds',
      'Far North Queensland birding',
      'Queensland endemic birds',
      'Wet Tropics birding',
      'Cairns birding tours',
      'Yungaburra birds',
      'Golden Bowerbird Australia',
      'Australian rainforest birds',
      'Chowchilla Australia',
    ],
    relatedDestinationSlugs: ['mallacoota-east-gippsland'],
  },
  {
    slug: 'southwest-tasmania',
    name: 'Southwest Tasmania',
    region: 'Southwest, Tasmania',
    state: 'TAS',
    tagline: 'One of the world\'s great wilderness areas — and the only place to find some of Australia\'s most critically endangered birds.',
    heroDescription:
      "Southwest Tasmania is remote, wet, and wild. It holds the last refuges of the Swift Parrot, the core habitat of the 40-spotted Pardalote, and the only known mainland breeding site of the Orange-bellied Parrot in Australia's south — along with subantarctic seabirds that push inshore on pelagic trips from Hobart.",
    fullDescription: `Southwest Tasmania is one of the last truly wild places in Australia. The Southwest National Park — 600,000 hectares of buttongrass moorland, quartzite ranges, ancient Huon pine forests, and glacial lakes — is part of the Tasmanian Wilderness World Heritage Area, one of the largest temperate wilderness reserves in the Southern Hemisphere.

For birders, Tasmania holds a status unique in Australia: several species exist here and only here, and others use Tasmania as their last critical refuge. Three Critically Endangered and Endangered parrots make the island their stronghold.

**40-spotted Pardalote — Bruny Island**

The most accessible target for visiting birders. The 40-spotted Pardalote is endemic to Tasmania and now largely restricted to Bruny Island and Maria Island. Bruny is a 20-minute ferry ride from Kettering (40 minutes south of Hobart). The white gum forest at Dennes Point and the Adventure Bay area hold the most reliable colonies. Morning visits in any season give good odds of finding these tiny, constantly moving birds in the canopy.

**Swift Parrot — Derwent Valley and Hobart area**

The Swift Parrot breeds in Tasmanian blue gum and black gum forests and migrates to the Australian mainland in autumn. Population: around 300 birds remaining. Nesting is concentrated in the Derwent Valley, Central Highlands, and along the east coast. Sugar gliders predate nest hollows — one of the major threats to breeding success. When in Tasmania from August to January, Blue gum flowering sites around Hobart and the Coal River Valley can attract large feeding flocks.

**Orange-bellied Parrot — Melaleuca**

One of the most sought-after birds in Australia. The Orange-bellied Parrot breeds only at Melaleuca, a remote southwest wilderness accessible by light aircraft or boat, or on foot via multi-day walks. Fewer than 50 wild birds remain. The species' existence is precarious, and visits to the breeding area are managed carefully. For most birders, seeing an OBP means wintering birds on mainland coastal saltmarshes in Victoria and South Australia (Werribee, western Port Phillip, Mount Compass).

**Pelagic birding from Hobart**

Bass Strait and the Southern Ocean produce excellent pelagic diversity. Blue Petrels, prions, Shy Albatross, Black-browed Albatross, and occasionally rare species from the Southern Ocean push north into Tasmanian waters. Organised pelagic trips from Hobart, particularly in autumn and winter, can produce 15–20 seabird species in a day.`,
    keyBirds: [
      '40-spotted Pardalote',
      'Swift Parrot',
      'Orange-bellied Parrot',
      'Shy Albatross',
      'Blue Petrel',
      'White-bellied Sea-Eagle',
      'Wedge-tailed Eagle',
      'Green Rosella',
      'Dusky Robin',
      'Strong-billed Honeyeater',
      'Black Currawong',
      'Yellow-throated Honeyeater',
    ],
    highlights: [
      {
        icon: '🦜',
        title: '40-spotted Pardalote on Bruny Island',
        description:
          'Reliable access to one of the world\'s rarest birds. The Dennes Point white gum forest on Bruny Island is the most accessible 40-spotted Pardalote site in Australia.',
      },
      {
        icon: '🦅',
        title: 'Swift Parrot nesting',
        description:
          'Tasmania is the sole breeding ground of the critically endangered Swift Parrot. Blue gum flowering events around Hobart in Aug–Oct can attract feeding flocks.',
      },
      {
        icon: '🌊',
        title: 'Southern Ocean pelagics',
        description:
          'Bass Strait and the Southern Ocean push albatross, petrels, and prions close to Tasmania. Organised pelagic trips from Hobart are productive year-round.',
      },
      {
        icon: '🏔️',
        title: 'Tasmanian wilderness endemics',
        description:
          'Green Rosella, Strong-billed Honeyeater, Yellow-throated Honeyeater, Dusky Robin, and Black Currawong are found only in Tasmania — all accessible from Hobart.',
      },
    ],
    bestSeason: 'Year-round. For 40-spotted Pardalote: any time, best in morning. For Swift Parrot: August–January (breeding season in Tasmania). For Orange-bellied Parrot at Melaleuca: December–February (breeding). For pelagics: autumn and winter (March–August) for the most diverse seabird communities.',
    gettingThere:
      'Fly into Hobart Airport. Bruny Island ferry departs Kettering, 40 min south of Hobart (Bruny Island Ferry — approximately 20 minutes crossing, runs frequently). Southwest National Park accessible by scenic flights from Hobart (Par Avion operates regular flights to Melaleuca). Walking access via multi-day tracks.',
    wherToStay:
      'Hobart is the base for all southwest Tasmania birding. Accommodation ranges from boutique city hotels to waterfront apartments. Bruny Island has small lodges, holiday cottages, and a campground. Advance booking essential in summer (December–February). Melaleuca hut accommodation is available (booking via Parks Tasmania).',
    relatedOperators: [],
    metaDescription:
      "Southwest Tasmania birding guide — 40-spotted Pardalote on Bruny Island, Swift Parrot, Orange-bellied Parrot, and Southern Ocean pelagics. Australia's most important island for rare and endemic birds.",
    keywords: [
      'Tasmania birding',
      'southwest Tasmania birds',
      'Bruny Island birding',
      '40-spotted pardalote Tasmania',
      'swift parrot Tasmania',
      'orange-bellied parrot',
      'Hobart birding',
      'Tasmania endemic birds',
      'Tasmania wildlife tours',
      'pelagic birding Tasmania',
    ],
    relatedDestinationSlugs: ['mallacoota-east-gippsland', 'gippsland-lakes'],
  },
];

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return destinationsData.find((d) => d.slug === slug);
}

export function getRelatedDestinations(slugs: string[]): DestinationData[] {
  return slugs
    .map((slug) => destinationsData.find((d) => d.slug === slug))
    .filter((d): d is DestinationData => d !== undefined);
}
