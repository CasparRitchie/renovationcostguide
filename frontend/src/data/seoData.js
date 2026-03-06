export const PROJECTS = {
  "kitchen-renovation": {
    name: "Kitchen Renovation",
    intro:
      "Kitchen renovation costs vary depending on layout changes, cabinetry quality, appliances, labour and finish level.",
    low: 8000,
    mid: 18000,
    high: 30000,
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
    low: 25000,
    mid: 45000,
    high: 70000,
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
    low: 30000,
    mid: 65000,
    high: 120000,
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
    low: 5000,
    mid: 12000,
    high: 25000,
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
  "solar-panel-installation": {
    name: "Solar Panel Installation",
    intro:
      "Solar panel installation costs depend on roof size, system capacity, inverter choice, battery storage and installation complexity.",
    low: 5000,
    mid: 9000,
    high: 18000,
    faqs: [
      {
        q: "How much does solar panel installation cost in the UK?",
        a: "Solar panel installation in the UK often costs between £5,000 and £18,000 depending on system size and whether battery storage is included."
      },
      {
        q: "Do batteries make solar more expensive?",
        a: "Yes. Battery storage usually adds noticeably to the total system cost."
      }
    ]
  },
  "house-rewiring": {
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
  leicester: { name: "Leicester", multiplier: 0.99 }
};

export function formatGBP(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}
