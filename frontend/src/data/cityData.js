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
    ]
  }
};
