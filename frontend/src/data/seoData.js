import extension1 from "../assets/images/extension1.png";
import extension2 from "../assets/images/extension2.png";
import gardenCabinMain from "../assets/images/garden-cabin-main.jpeg";
import gardenRoomPremium from "../assets/images/garden-room-premium.jpeg";
import gardenpodDark from "../assets/images/gardenpod-dark.png";
import gardenpodFuturistic from "../assets/images/gardenpod-futuristic.png";
import gardenroomGreen from "../assets/images/gardenroom-green.png";
import gardenroomPortrait from "../assets/images/gardenroom-portrait.png";
import kitchenHero from "../assets/images/kitchen-hero.png";
import kitchenMain1 from "../assets/images/kitchen-main-1.jpeg";
import kitchenMain2 from "../assets/images/kitchen-main-2.jpeg";
import kitchenRenovationMain from "../assets/images/kitchen-renovation-main.jpeg";
import loftAfter from "../assets/images/loft-after.png";
import loftBefore from "../assets/images/loft-before.png";
import loftConversionBathroom from "../assets/images/loft-conversion-bathroom.jpeg";
import loftConversionMain from "../assets/images/loft-conversion-main.jpeg";
import loftConversionPremium2 from "../assets/images/loft-conversion-premium2.png";
import loftConversionPremium3 from "../assets/images/loft-conversion-premium3.png";
import loftConversionGamer from "../assets/images/loft-conversion-gamer.png";
import loftConversionGamer2 from "../assets/images/loft-conversion-gamer2.png";
import plasteringWorker from "../assets/images/plastering-worker.jpeg";
import sprayPaintingWalls from "../assets/images/spray-painting-walls.jpeg";
import garageConversionBudget from "../assets/images/garage-conversion-budget.png";
import garageConversionPremium from "../assets/images/garage-conversion-premium.png";
import garageConversionPremium2 from "../assets/images/garage-conversion-premium2.png";
import garageConversionPremium3 from "../assets/images/garage-conversion-premium3.png";
import garageConversionPremium4 from "../assets/images/garage-conversion-premium4.png";
import extensionCottageTraditional from "../assets/images/house-extension-cottage-traditional.png";
import extensionTerraced from "../assets/images/house-extension-terraced.png";
import extensionSemiDetached from "../assets/images/house-extension-semi-detached.png";
import extensionFuturistic from "../assets/images/house-extension-futuristic.png";
import bathroomPremium from "../assets/images/bathroom-renovation-premium.png";
import bathroomMidrangeWood from "../assets/images/bathroom-renovation-midrange-wood.png";
import bathroomSlateMetallic from "../assets/images/bathroom-renovation-slate-metallic.png";

export const PROJECTS = {
  "kitchen-renovation": {
    name: "Kitchen Renovation",
    intro:
      "Kitchen renovation costs vary depending on layout changes, cabinetry quality, appliances, labour and finish level.",
    cityIntro: (cityName) =>
      `Kitchen renovation costs in ${cityName} can vary significantly depending on cabinetry quality, worktops, appliances, labour rates, access and whether the layout is being changed.`,
    heroImage: kitchenRenovationMain,
    heroImageAlt: "Modern kitchen renovation with fitted units and worktops",
    galleryImages: [
      {
        src: kitchenMain1,
        alt: "Kitchen interior with fitted cabinetry and island"
      },
      {
        src: kitchenMain2,
        alt: "Contemporary kitchen with modern finishes"
      },
      {
        src: kitchenHero,
        alt: "Bright premium kitchen with island and pendant lighting"
      },
      {
        src: sprayPaintingWalls,
        alt: "Tradesperson spray painting walls during interior renovation"
      }
    ],
    low: 8000,
    mid: 18000,
    high: 30000,

    includedItems: [
      "Removal of the existing kitchen",
      "Cabinetry and storage installation",
      "Worktops and splashbacks",
      "Sink, taps and plumbing adjustments",
      "Electrical changes for appliances and lighting",
      "Flooring, decorating and final finishing",
      "Appliance installation where included"
    ],

    budgetTiers: [
      {
        title: "Budget kitchen renovation",
        range: "£8,000–£12,000",
        text:
          "Usually suits a simpler replacement kitchen with standard units, laminate worktops and limited layout changes."
      },
      {
        title: "Mid-range kitchen renovation",
        range: "£12,000–£22,000",
        text:
          "Often includes better cabinetry, improved worktops, upgraded appliances and some plumbing or electrical reconfiguration."
      },
      {
        title: "Premium kitchen renovation",
        range: "£22,000–£30,000+",
        text:
          "Can include bespoke cabinetry, stone worktops, premium appliances, island units and higher-end finishing throughout."
      }
    ],

    driverCards: [
      {
        title: "Cabinetry and storage",
        text:
          "Cabinet quality, internal storage features and bespoke joinery often make up a large part of the total kitchen budget."
      },
      {
        title: "Worktops and appliances",
        text:
          "Quartz, stone and premium appliances can raise the cost significantly compared with standard mid-market choices."
      },
      {
        title: "Layout and services",
        text:
          "Moving sinks, ovens, lighting or extractor positions usually increases plumbing, electrical and installation costs."
      }
    ],

    faqs: [
      {
        q: "How much does a kitchen renovation cost in the UK?",
        a: "A kitchen renovation in the UK often costs between £8,000 and £30,000 depending on size, materials, appliances and layout changes."
      },
      {
        q: "What affects kitchen renovation cost the most?",
        a: "The biggest cost drivers are cabinetry, worktops, appliances, plumbing or electrical changes, and whether the layout is being altered."
      }
    ]
  },

  "loft-conversion": {
    name: "Loft Conversion",
    intro:
      "Loft conversion costs depend on roof structure, staircase requirements, dormer work, insulation, plastering and the final specification.",
    cityIntro: (cityName) =>
      `Loft conversion costs in ${cityName} can vary depending on structural complexity, staircase design, access, labour rates and the type of conversion you choose. This guide gives a practical planning range for homeowners researching likely loft conversion budgets in ${cityName}.`,
    heroImage: loftConversionPremium2,
    heroImageAlt: "Finished loft conversion interior with sloped ceiling and natural light",
    galleryImages: [
      {
        src: loftConversionMain,
        alt: "Finished loft conversion interior with skylights and fitted storage"
      },
      {
        src: loftConversionPremium2,
        alt: "Premium loft conversion living area with bright natural light"
      },
      {
        src: loftConversionPremium3,
        alt: "Loft conversion bedroom with neutral decor and roof windows"
      },
      {
        src: loftConversionBathroom,
        alt: "Loft conversion bathroom with shower and modern finish"
      },
      {
        src: loftConversionGamer,
        alt: "Gamer style loft conversion"
      },
      {
        src: loftConversionGamer2,
        alt: "Loft conversion for a gamer with neon lights"
      }
    ],
    beforeAfterImages: [
      {
        src: loftBefore,
        alt: "Unfinished loft space before conversion with exposed rafters and rooflight",
        label: "Before"
      },
      {
        src: loftAfter,
        alt: "Finished loft conversion bedroom with skylights and fitted storage",
        label: "After"
      }
    ],
    low: 25000,
    mid: 45000,
    high: 70000,
    costPerM2: "£1,500 – £2,500 per m²",

    includedItems: [
      "Structural calculations and strengthening where needed",
      "Floor reinforcement and steelwork if required",
      "Roof insulation and plasterboard lining",
      "Dormer or rooflight installation where included",
      "New staircase installation",
      "Electrical and lighting work",
      "Plastering, joinery and interior finishing"
    ],

    budgetTiers: [
      {
        title: "Budget loft conversion",
        range: "£25,000–£35,000",
        text:
          "Usually suits a simpler rooflight loft conversion with minimal structural alteration and a straightforward internal fit-out."
      },
      {
        title: "Mid-range loft conversion",
        range: "£35,000–£50,000",
        text:
          "Often includes a dormer, a more complete internal finish, better storage solutions and higher overall specification."
      },
      {
        title: "Premium loft conversion",
        range: "£50,000–£70,000+",
        text:
          "Can include larger dormers, more structural work, bespoke joinery, premium finishes and an ensuite bathroom."
      }
    ],

    driverCards: [
      {
        title: "Type of loft conversion",
        text:
          "Rooflight, dormer and hip-to-gable loft conversions vary significantly in cost because they involve different levels of structural and external work.",
        cityText: (cityName) =>
          `In ${cityName}, the type of loft conversion can affect cost even more because structural labour, scaffolding and specialist trades are often more expensive.`
      },
      {
        title: "Staircase and layout",
        text:
          "The staircase design and how easily it fits into the existing house layout can have a major impact on labour, design complexity and usable floor area."
      },
      {
        title: "Bathrooms and finishes",
        text:
          "Adding an ensuite, fitted storage, premium finishes or more complex lighting usually increases the final loft conversion cost."
      }
    ],

    costFactors: [
      "Roof structure and whether structural steel is needed",
      "Type of loft conversion, such as rooflight, dormer or hip-to-gable",
      "Staircase design and how easily it fits into the existing layout",
      "Insulation, plastering and fire regulation upgrades",
      "Whether you add a bathroom or ensuite"
    ],
    projectTypes: [
      {
        title: "Rooflight loft conversion",
        text:
          "Usually the cheapest loft conversion type because it keeps the roof shape largely unchanged and focuses on internal conversion."
      },
      {
        title: "Dormer loft conversion",
        text:
          "A popular mid-range option that creates more headroom and floor space, but usually costs more because of the extra structural and external work."
      },
      {
        title: "Hip-to-gable loft conversion",
        text:
          "Typically more expensive than a rooflight conversion because it alters the roof structure more significantly to create usable space."
      }
    ],
    priceRisks: [
      "Complex roof geometry can increase structural costs",
      "Adding an ensuite often raises plumbing, drainage and finishing costs",
      "Older properties may require extra strengthening or remedial work",
      "Access issues can increase labour time and scaffold costs"
    ],
    planningNotes: [
      "Many loft conversions fall under permitted development, but not all do.",
      "Dormers, roof shape changes and properties in conservation areas may involve stricter rules.",
      "Building regulations approval is usually required, especially for structure, fire safety, stairs and insulation."
    ],
    faqs: [
      {
        q: "How much does a loft conversion cost in the UK?",
        a: "A loft conversion in the UK often costs between £25,000 and £70,000 depending on type, size, structural work and finish level."
      },
      {
        q: "Is a dormer loft conversion more expensive?",
        a: "Yes. Dormer loft conversions usually cost more than simple rooflight conversions because they involve more structural and external work."
      }
    ]
  },

  "house-extension": {
    name: "House Extension",
    intro:
      "House extension costs vary based on size, foundations, structure, glazing, roof type, internal fit-out and your location.",
    cityIntro: (cityName) =>
      `House extension costs in ${cityName} are often influenced by build size, foundation requirements, structure, glazing, labour rates and access conditions. This guide gives a practical planning range for homeowners comparing likely extension budgets in ${cityName}.`,
    heroImage: extension2,
    heroImageAlt: "Large premium rear extension with wide folding doors and active building work",
    galleryImages: [
      {
        src: extension1,
        alt: "House extension under construction on a bright summer day"
      },
      {
        src: extension2,
        alt: "Large premium house extension with folding doors and bright interior"
      },
      {
        src: extensionCottageTraditional,
        alt: "Traditional countryside cottage with a large characterful extension"
      },
      {
        src: extensionTerraced,
        alt: "Rear extension on a Victorian terraced house with modern glazing"
      },
      {
        src: extensionSemiDetached,
        alt: "Rear extension on a semi-detached house with open-plan kitchen diner"
      },
      {
        src: extensionFuturistic,
        alt: "Futuristic contemporary house extension with dramatic glazing and lighting"
      }
    ],
    low: 30000,
    mid: 65000,
    high: 120000,

    includedItems: [
      "Groundworks and foundations",
      "Structural walls, framing or steelwork",
      "Roof construction and weatherproofing",
      "Windows, doors and glazing",
      "Insulation and plastering",
      "Electrical and plumbing first fix and second fix",
      "Internal finishing and decoration where included"
    ],

    budgetTiers: [
      {
        title: "Budget house extension",
        range: "£30,000–£50,000",
        text:
          "Usually suits a smaller, straightforward rear extension with simpler design choices and a more standard finish."
      },
      {
        title: "Mid-range house extension",
        range: "£50,000–£80,000",
        text:
          "Often includes a larger footprint, better glazing, improved internal finishes and more complex structural work."
      },
      {
        title: "Premium house extension",
        range: "£80,000–£120,000+",
        text:
          "Can include large openings, premium glazing, bespoke design features, higher-end finishes and more extensive structural or landscaping work."
      }
    ],

    driverCards: [
      {
        title: "Size and structure",
        text:
          "The overall size of the extension, the structural design and whether steelwork is needed will strongly influence the final cost.",
        cityText: (cityName) =>
          `In ${cityName}, larger or more structural extension projects can become significantly more expensive because labour, engineering input and site logistics often cost more.`
      },
      {
        title: "Foundations and ground conditions",
        text:
          "Difficult ground conditions, deeper foundations, drainage complications or nearby trees can all increase the cost of an extension."
      },
      {
        title: "Glazing and internal finish",
        text:
          "Large doors, rooflights, premium glazing and higher-end interior finishes can push house extension budgets up quickly."
      }
    ],

    faqs: [
      {
        q: "How much does a house extension cost in the UK?",
        a: "A house extension in the UK often costs between £30,000 and £120,000 depending on the size, specification and complexity of the build."
      },
      {
        q: "What is the cheapest type of extension?",
        a: "A simple rear extension with a straightforward design is often cheaper than wraparound or double-storey extensions."
      }
    ]
  },

  "bathroom-renovation": {
    name: "Bathroom Renovation",
    intro:
      "Bathroom renovation costs depend on tiling, sanitaryware, plumbing changes, waterproofing, labour and the level of finish.",
    cityIntro: (cityName) =>
      `Bathroom renovation costs in ${cityName} are often affected by labour rates, access, property type, plumbing complexity and the level of finish. This guide gives a practical planning range for homeowners comparing likely project budgets in ${cityName}.`,
    heroImage: loftConversionBathroom,
    heroImageAlt: "Modern bathroom renovation with shower and fitted finishes",
    galleryImages: [
      {
        src: bathroomPremium,
        alt: "Premium bathroom renovation with freestanding bath, double vanity and walk-in shower"
      },
      {
        src: bathroomMidrangeWood,
        alt: "Mid-range bathroom renovation with warm wood finishes and practical layout"
      },
      {
        src: bathroomSlateMetallic,
        alt: "Bathroom renovation with dark slate tiles and metallic finishes"
      }
    ],
    low: 5000,
    mid: 12000,
    high: 25000,

    includedItems: [
      "Removal of the existing bathroom suite and finishes",
      "Plumbing adjustments for bath, shower, basin or toilet",
      "Waterproofing and preparation of walls and floors",
      "Wall and floor tiling",
      "Installation of sanitaryware and brassware",
      "Lighting, extractor fan and electrical finishing",
      "Decoration, sealing and final finishing"
    ],

    budgetTiers: [
      {
        title: "Budget bathroom renovation",
        range: "£5,000–£8,000",
        text:
          "Usually suits a smaller bathroom where the layout remains broadly the same and the specification is fairly standard."
      },
      {
        title: "Mid-range bathroom renovation",
        range: "£8,000–£15,000",
        text:
          "Often includes better-quality fittings, more extensive tiling, improved lighting, vanity storage and some plumbing or electrical upgrades."
      },
      {
        title: "Premium bathroom renovation",
        range: "£15,000–£25,000+",
        text:
          "Can include layout changes, walk-in showers, freestanding baths, premium brassware, underfloor heating and higher-end finishes throughout."
      }
    ],

    driverCards: [
      {
        title: "Plumbing and layout changes",
        text:
          "Costs usually rise if the toilet, bath, shower or basin needs moving, because extra plumbing work adds labour and complexity.",
        cityText: (cityName) =>
          `Costs in ${cityName} often rise further if the layout changes, because plumbing labour and coordination are usually more expensive in larger cities.`
      },
      {
        title: "Tiling and waterproofing",
        text:
          "Full-height tiling, tanking, premium tiles and more detailed finishing can significantly affect the total budget."
      },
      {
        title: "Sanitaryware and fittings",
        text:
          "Bathrooms vary hugely in cost depending on whether you choose standard suites or premium taps, showers, baths and fitted furniture."
      }
    ],

    faqs: [
      {
        q: "How much does a bathroom renovation cost in the UK?",
        a: "Bathroom renovation costs in the UK often range from £5,000 to £25,000 depending on the bathroom size, fittings and labour involved."
      },
      {
        q: "What makes a bathroom renovation expensive?",
        a: "Moving plumbing, high-end fixtures, premium tiles and bespoke joinery can all increase bathroom renovation costs significantly."
      }
    ]
  },

  "garden-room": {
    name: "Garden Room",
    intro:
      "Garden room costs depend on size, insulation, foundations, electrical work, glazing quality and intended year-round use.",
    heroImage: gardenCabinMain,
    heroImageAlt: "Garden cabin or garden room exterior in landscaped garden",
    galleryImages: [
      {
        src: gardenRoomPremium,
        alt: "Premium garden room with large glazing and modern finish"
      },
      {
        src: gardenpodDark,
        alt: "Dark contemporary garden room with lounge area and deck"
      },
      {
        src: gardenpodFuturistic,
        alt: "Futuristic garden pod with curved design and glazed front"
      },
      {
        src: gardenroomGreen,
        alt: "Green traditional garden room with patio and landscaped planting"
      },
      {
        src: gardenroomPortrait,
        alt: "Modern cedar garden office in a landscaped garden"
      }
    ],
    low: 10000,
    mid: 22000,
    high: 45000,
    faqs: [
      {
        q: "How much does a garden room cost in the UK?",
        a: "A garden room in the UK often costs between £10,000 and £45,000 depending on the size, insulation level and specification."
      },
      {
        q: "Are insulated garden rooms worth the extra cost?",
        a: "Usually yes, especially if you want to use the space year-round as an office, studio or guest room."
      }
    ]
  },

  "garage-conversion": {
    name: "Garage Conversion",
    intro:
      "Garage conversion costs depend on insulation, flooring, windows, doors, services and how much structural adjustment is needed.",
    heroImage: garageConversionPremium,
    heroImageAlt: "Premium garage conversion showing how a garage can become a stylish living space",
    galleryImages: [
      {
        src: garageConversionBudget,
        alt: "Lower-budget garage conversion with simple bedroom-style layout"
      },
      {
        src: garageConversionPremium,
        alt: "Premium garage conversion with polished finishes and spacious layout"
      },
      {
        src: garageConversionPremium2,
        alt: "Mid-range garage conversion with bedroom layout and warm neutral finishes"
      },
      {
        src: garageConversionPremium3,
        alt: "Premium garage conversion used as a bright home office and studio"
      },
      {
        src: garageConversionPremium4,
        alt: "Premium garage conversion with bedroom and ensuite-style wash area"
      }
    ],
    low: 9000,
    mid: 18000,
    high: 35000,
    faqs: [
      {
        q: "How much does a garage conversion cost in the UK?",
        a: "A garage conversion in the UK often costs between £9,000 and £35,000 depending on the structure, services and finish level."
      },
      {
        q: "Is a garage conversion cheaper than an extension?",
        a: "In many cases yes, because the main structure is already in place."
      }
    ]
  },

  "basement-conversion": {
    name: "Basement Conversion",
    intro:
      "Basement conversion costs depend on excavation requirements, waterproofing, structural work, ventilation, drainage and final fit-out.",
    heroImage: plasteringWorker,
    heroImageAlt: "Interior construction work during basement conversion or renovation",
    galleryImages: [
      {
        src: sprayPaintingWalls,
        alt: "Interior finishing work in a newly renovated space"
      }
    ],
    low: 40000,
    mid: 85000,
    high: 160000,
    faqs: [
      {
        q: "How much does a basement conversion cost in the UK?",
        a: "A basement conversion in the UK often costs between £40,000 and £160,000 depending on excavation needs, waterproofing and structural complexity."
      },
      {
        q: "Why are basement conversions often expensive?",
        a: "Basement projects often involve structural work, waterproofing, drainage, access constraints and more specialist labour than above-ground renovations."
      }
    ]
  },

  "roof-replacement": {
    name: "Roof Replacement",
    intro:
      "Roof replacement costs vary with roof size, tile choice, scaffolding, timber condition, insulation and access.",
    low: 5000,
    mid: 12000,
    high: 25000,
    faqs: [
      {
        q: "How much does a roof replacement cost in the UK?",
        a: "Roof replacement costs in the UK often range from £5,000 to £25,000 depending on roof size, materials and structural condition."
      },
      {
        q: "Does replacing a roof include insulation?",
        a: "Sometimes, but not always. It depends on the scope of the works and whether roof insulation upgrades are included."
      }
    ]
  },

  "window-replacement": {
    name: "Window Replacement",
    intro:
      "Window replacement costs depend on frame material, glazing specification, number of windows and installation complexity.",
    low: 3000,
    mid: 8000,
    high: 18000,
    faqs: [
      {
        q: "How much does window replacement cost in the UK?",
        a: "Window replacement in the UK often costs between £3,000 and £18,000 depending on property size, frame materials and glazing quality."
      },
      {
        q: "Are triple glazed windows much more expensive?",
        a: "They are usually more expensive than double glazing, though the premium varies by supplier and property type."
      }
    ]
  },

  "rewiring-house": {
    name: "House Rewiring",
    intro:
      "House rewiring costs vary depending on property size, ease of access, finishing work and whether the home is occupied during the works.",
    low: 4000,
    mid: 8000,
    high: 15000,
    faqs: [
      {
        q: "How much does house rewiring cost in the UK?",
        a: "House rewiring in the UK often costs between £4,000 and £15,000 depending on the property size and complexity."
      },
      {
        q: "Does rewiring include replastering?",
        a: "Not always. Some quotes include making good, while others only cover electrical works."
      }
    ]
  }
};

export const CITIES = {
  london: { name: "London", multiplier: 1.25 },
  manchester: { name: "Manchester", multiplier: 1.05 },
  birmingham: { name: "Birmingham", multiplier: 1.03 },
  leeds: { name: "Leeds", multiplier: 1.0 },
  liverpool: { name: "Liverpool", multiplier: 0.98 },
  bristol: { name: "Bristol", multiplier: 1.08 },
  sheffield: { name: "Sheffield", multiplier: 0.98 },
  newcastle: { name: "Newcastle", multiplier: 0.97 },
  nottingham: { name: "Nottingham", multiplier: 0.99 },
  oxford: { name: "Oxford", multiplier: 1.12 }
};

export const HOME_IMAGES = {
  hero: {
    src: kitchenHero,
    alt: "Modern renovated kitchen with island and bright natural light"
  },
  featureStrip: [
    {
      src: extension2,
      alt: "Large premium house extension with folding doors and bright interior"
    },
    {
      src: loftAfter,
      alt: "Finished loft conversion bedroom with skylights and fitted storage"
    },
    {
      src: gardenpodFuturistic,
      alt: "Futuristic garden pod in a landscaped garden"
    }
  ]
};

export function formatGBP(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}
