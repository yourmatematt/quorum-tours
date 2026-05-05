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
];

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return destinationsData.find((d) => d.slug === slug);
}

export function getRelatedDestinations(slugs: string[]): DestinationData[] {
  return slugs
    .map((slug) => destinationsData.find((d) => d.slug === slug))
    .filter((d): d is DestinationData => d !== undefined);
}
