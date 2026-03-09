export const CITY_DATA = {
  london: {
    name: "London",
    labourMultiplier: 1.35,
    contractorDayRate: "£250–£350",
    skipCost: "£350–£500",
    accessNotes:
      "Parking restrictions, congestion charges and limited access in many areas can increase labour time and delivery costs.",
    demandNotes:
      "Demand for experienced renovation contractors is extremely high, which often pushes project timelines and labour costs upward.",
    planningNotes:
      "Many boroughs contain conservation areas, so loft conversions and extensions may require additional approvals.",
    housingStock: [
      "Victorian terraces",
      "Georgian townhouses",
      "Converted flats",
      "1930s semi-detached homes"
    ],
    commonConstraints: [
      "Limited rear access for materials",
      "Party wall agreements for terraced properties",
      "Older electrical and plumbing systems"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed Victorian terrace",
        estimate: "£10,000–£16,000",
        description: "Suitable for a lighter project with standard finishes and limited structural change."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£18,000–£32,000",
        description: "Typical for a fuller renovation with upgraded finishes and some layout improvement."
      },
      {
        title: "Premium example",
        propertyType: "4-bed townhouse or detached home",
        estimate: "£35,000–£65,000",
        description: "Usually includes more extensive labour, premium materials and more complex access conditions."
      }
    ]
  },

  manchester: {
    name: "Manchester",
    labourMultiplier: 1.05,
    contractorDayRate: "£200–£280",
    skipCost: "£280–£400",
    accessNotes:
      "City-centre properties may have parking restrictions affecting deliveries and waste removal.",
    demandNotes:
      "Manchester’s property market has driven strong renovation demand in recent years.",
    planningNotes:
      "Loft conversions and extensions are usually straightforward but conservation areas may require approval.",
    housingStock: [
      "Victorian terraces",
      "Converted mills and apartments",
      "1930s semi-detached houses",
      "Modern developments"
    ],
    commonConstraints: [
      "Older brickwork requiring repointing",
      "Electrical upgrades in older terraces",
      "Party wall considerations"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£8,500–£13,500",
        description: "Suitable for a lighter project with standard finishes and modest complexity."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£15,000–£26,000",
        description: "Typical for a fuller renovation with some upgraded finishes and layout changes."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached home",
        estimate: "£28,000–£50,000",
        description: "Often includes higher-end finishes, more trades and broader refurbishment scope."
      }
    ]
  },

  birmingham: {
    name: "Birmingham",
    labourMultiplier: 1.03,
    contractorDayRate: "£195–£275",
    skipCost: "£270–£390",
    accessNotes:
      "Access is usually manageable, but denser inner-city neighbourhoods can make parking and deliveries more awkward.",
    demandNotes:
      "Demand for renovation contractors is solid across Birmingham, especially in areas with older family housing stock.",
    planningNotes:
      "Planning permission is often straightforward for standard projects, though local design constraints can apply in heritage areas.",
    housingStock: [
      "1930s semi-detached houses",
      "Victorian terraces",
      "Post-war suburban homes",
      "Modern apartment developments"
    ],
    commonConstraints: [
      "Older plumbing and electrical systems",
      "Mixed-quality extensions or alterations from previous owners",
      "Access limitations on terraced streets"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£8,000–£13,000",
        description: "Suitable for a lighter upgrade with standard materials and limited structural work."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£14,000–£25,000",
        description: "Typical for a broader renovation with upgraded finishes and moderate complexity."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached home",
        estimate: "£27,000–£48,000",
        description: "Usually involves premium finishes, more specialist trades and larger spaces."
      }
    ]
  },

  leeds: {
    name: "Leeds",
    labourMultiplier: 1.0,
    contractorDayRate: "£190–£265",
    skipCost: "£260–£380",
    accessNotes:
      "Access is often easier than in London, but dense terraced areas and narrow streets can still affect waste removal and deliveries.",
    demandNotes:
      "Leeds continues to see steady demand for renovation work, particularly in established residential areas.",
    planningNotes:
      "Most standard renovations are straightforward, though extensions and loft conversions can need extra review in conservation settings.",
    housingStock: [
      "Victorian terraces",
      "1930s semi-detached homes",
      "Stone-built suburban properties",
      "Modern family developments"
    ],
    commonConstraints: [
      "Solid-wall properties needing insulation upgrades",
      "Outdated wiring in older terraces",
      "Restricted rear access for materials"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£8,000–£12,500",
        description: "Suitable for a lighter project with practical finishes and limited layout change."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£14,000–£24,000",
        description: "Typical for a fuller renovation with upgraded finishes and some layout improvement."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached house",
        estimate: "£26,000–£46,000",
        description: "Often includes broader refurbishment, premium materials and more labour input."
      }
    ]
  },

  liverpool: {
    name: "Liverpool",
    labourMultiplier: 0.98,
    contractorDayRate: "£185–£255",
    skipCost: "£255–£370",
    accessNotes:
      "Many neighbourhoods offer fairly practical access, although tight terraced streets can still complicate skips and deliveries.",
    demandNotes:
      "Contractor demand is healthy, but labour pressure is often slightly lower than in the South East.",
    planningNotes:
      "Planning requirements are usually manageable, though heritage and conservation settings may add complexity.",
    housingStock: [
      "Victorian terraces",
      "1930s semi-detached houses",
      "Post-war family homes",
      "Converted urban flats"
    ],
    commonConstraints: [
      "Older roofs and masonry needing remedial work",
      "Electrical upgrades in older housing stock",
      "Party wall issues in terrace properties"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£7,500–£12,000",
        description: "Suitable for a lighter project with standard finishes and modest complexity."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached home",
        estimate: "£13,500–£23,000",
        description: "Typical for a fuller renovation with better finishes and some structural adjustment."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached home",
        estimate: "£25,000–£44,000",
        description: "Usually includes higher-end finishes, wider scope and more specialist work."
      }
    ]
  },

  bristol: {
    name: "Bristol",
    labourMultiplier: 1.15,
    contractorDayRate: "£220–£300",
    skipCost: "£300–£450",
    accessNotes:
      "Terraced streets and hillside properties can sometimes make deliveries and skip placement more difficult.",
    demandNotes:
      "Strong housing demand has increased renovation activity across the city.",
    planningNotes:
      "Victorian housing areas and conservation zones may require additional planning review.",
    housingStock: [
      "Victorian terraces",
      "1930s semi-detached houses",
      "Converted flats",
      "Modern apartments"
    ],
    commonConstraints: [
      "Older wiring and plumbing systems",
      "Limited side access in terrace properties",
      "Shared walls requiring party wall agreements"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed Victorian terrace",
        estimate: "£9,000–£14,500",
        description: "Suitable for a lighter project with standard finishes and limited structural work."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£16,000–£28,000",
        description: "Typical for a broader renovation with upgraded finishes and moderate complexity."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached or period home",
        estimate: "£30,000–£52,000",
        description: "Often includes higher-end materials, more trades and access-related cost pressure."
      }
    ]
  },

  nottingham: {
    name: "Nottingham",
    labourMultiplier: 0.99,
    contractorDayRate: "£185–£260",
    skipCost: "£255–£375",
    accessNotes:
      "Access is generally reasonable, although tighter residential streets can affect parking and skip positioning.",
    demandNotes:
      "Renovation demand is stable, with pricing influenced by neighbourhood and housing type.",
    planningNotes:
      "Standard projects are often straightforward, though protected streetscapes and heritage settings may need extra checks.",
    housingStock: [
      "Victorian terraces",
      "1930s semis",
      "Post-war suburban homes",
      "Modern developments"
    ],
    commonConstraints: [
      "Aging bathrooms and kitchens in older family homes",
      "Electrics needing full or partial upgrades",
      "Mixed-quality previous renovations"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£7,500–£12,500",
        description: "Suitable for a lighter project with standard finishes and limited structural change."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£14,000–£24,000",
        description: "Typical for a fuller renovation with upgraded finishes and moderate labour input."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached home",
        estimate: "£26,000–£45,000",
        description: "Usually includes higher-end materials, wider scope and more specialist trades."
      }
    ]
  },

  sheffield: {
    name: "Sheffield",
    labourMultiplier: 0.95,
    contractorDayRate: "£180–£250",
    skipCost: "£250–£350",
    accessNotes:
      "Access is generally easier than in larger cities, although hillside streets can affect deliveries.",
    demandNotes:
      "Renovation demand is steady but typically lower than in London or Bristol.",
    planningNotes:
      "Planning permission requirements are usually straightforward for standard extensions and loft conversions.",
    housingStock: [
      "1930s semi-detached houses",
      "Post-war suburban homes",
      "Victorian terraces",
      "Modern estates"
    ],
    commonConstraints: [
      "Older heating systems in older terraces",
      "Roof insulation upgrades often required",
      "Occasional structural upgrades in older homes"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£7,000–£11,500",
        description: "Suitable for a lighter project with standard finishes and practical scope."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached home",
        estimate: "£13,000–£22,000",
        description: "Typical for a fuller renovation with improved finishes and some layout changes."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached house",
        estimate: "£24,000–£42,000",
        description: "Usually includes broader refurbishment, upgraded finishes and larger spaces."
      }
    ]
  },

  newcastle: {
    name: "Newcastle",
    labourMultiplier: 0.97,
    contractorDayRate: "£180–£255",
    skipCost: "£250–£360",
    accessNotes:
      "Access is often manageable, though denser urban streets and older terraces can affect deliveries and waste collection.",
    demandNotes:
      "Demand is moderate, with pricing often remaining below the highest-cost southern cities.",
    planningNotes:
      "Standard planning routes are usually clear, though heritage areas and more visible extensions may attract closer scrutiny.",
    housingStock: [
      "Victorian terraces",
      "Tyneside flats",
      "1930s semi-detached homes",
      "Post-war family houses"
    ],
    commonConstraints: [
      "Older brickwork and roofing needing repair",
      "Solid-wall construction affecting insulation upgrades",
      "Shared access or party wall considerations"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace or flat",
        estimate: "£7,500–£12,000",
        description: "Suitable for a lighter project with standard materials and limited complexity."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached house",
        estimate: "£13,500–£23,000",
        description: "Typical for a fuller renovation with upgraded finishes and moderate structural input."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached home",
        estimate: "£25,000–£44,000",
        description: "Often includes higher-end finishes, wider scope and more specialist work."
      }
    ]
  },

  oxford: {
    name: "Oxford",
    labourMultiplier: 1.12,
    contractorDayRate: "£220–£310",
    skipCost: "£300–£430",
    accessNotes:
      "Restricted streets, parking pressure and limited access around central areas can increase project logistics costs.",
    demandNotes:
      "Demand for renovation work is high because of property values and ongoing pressure on local housing stock.",
    planningNotes:
      "Oxford has many conservation-sensitive areas, so planning and design constraints can be more significant than average.",
    housingStock: [
      "Victorian terraces",
      "Edwardian family homes",
      "Period townhouses",
      "Converted flats"
    ],
    commonConstraints: [
      "Heritage-related design restrictions",
      "Limited access for materials and skips",
      "High expectations for finish quality in premium areas"
    ],
    scenarios: [
      {
        title: "Budget example",
        propertyType: "2-bed terrace",
        estimate: "£9,000–£14,000",
        description: "Suitable for a lighter project with standard finishes and limited structural change."
      },
      {
        title: "Mid-range example",
        propertyType: "3-bed semi-detached or period home",
        estimate: "£16,000–£29,000",
        description: "Typical for a fuller renovation with upgraded finishes and more complex site conditions."
      },
      {
        title: "Premium example",
        propertyType: "4-bed detached or townhouse",
        estimate: "£30,000–£55,000",
        description: "Usually includes premium materials, more trades and higher access or compliance costs."
      }
    ]
  }
};
