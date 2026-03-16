const BATHROOM_RULES = {
  expectedItems: {
    removal: ["strip out", "removal", "remove existing", "demolition"],
    plumbing: [
      "plumbing",
      "pipework",
      "relocate toilet",
      "relocate basin",
      "relocate shower",
    ],
    sanitaryware: [
      "toilet",
      "basin",
      "bath",
      "shower",
      "sanitaryware",
      "brassware",
    ],
    tiling: ["tiling", "tiles", "wall tiles", "floor tiles"],
    waterproofing: ["waterproofing", "tanking", "tank", "wet area prep"],
    electrics: ["electrics", "lighting", "extractor", "fan", "electrical"],
    finishing: ["decorating", "sealant", "making good", "finishing"],
    waste: ["skip", "waste", "rubble", "disposal"],
  },

  questionMap: {
    waterproofing:
      "Does this include waterproofing or tanking where needed?",
    electrics:
      "Does this include electrical finishing and any extractor fan work?",
    sanitaryware:
      "Are sanitaryware and brassware included, or are they client-supplied?",
    tiling: "Does this include all tiling materials and labour?",
    waste: "Does this include waste removal and skip costs?",
    finishing: "Does this include final finishing, sealing and making good?",
  },
};

function runBathroomChecks(text) {
  const found = [];
  const missing = [];

  Object.entries(BATHROOM_RULES.expectedItems).forEach(([key, keywords]) => {
    const isFound = keywords.some((kw) => text.includes(kw));
    if (isFound) {
      found.push(key);
    } else {
      missing.push(key);
    }
  });

  const strengths = [];
  const possibleGaps = [];
  const questionsToAsk = [];

  if (found.includes("plumbing")) {
    strengths.push("Plumbing work appears to be referenced.");
  }

  if (found.includes("tiling")) {
    strengths.push("Tiling appears to be mentioned.");
  }

  if (found.includes("sanitaryware")) {
    strengths.push("Sanitaryware or bathroom fittings appear to be included.");
  }

  missing.forEach((key) => {
    switch (key) {
      case "waterproofing":
        possibleGaps.push("Waterproofing or tanking is not clearly mentioned.");
        break;
      case "electrics":
        possibleGaps.push("Electrical finishing or extractor work is unclear.");
        break;
      case "waste":
        possibleGaps.push("Waste removal is not clearly mentioned.");
        break;
      case "finishing":
        possibleGaps.push("Final finishing or making good is not obvious.");
        break;
      case "tiling":
        possibleGaps.push("Tiling is not clearly described.");
        break;
      case "sanitaryware":
        possibleGaps.push("Sanitaryware supply is not clearly shown.");
        break;
      default:
        possibleGaps.push(`${key} is not clearly mentioned.`);
    }

    if (BATHROOM_RULES.questionMap[key]) {
      questionsToAsk.push(BATHROOM_RULES.questionMap[key]);
    }
  });

  return {
    found,
    missing,
    strengths,
    possibleGaps,
    questionsToAsk,
  };
}

module.exports = {
  BATHROOM_RULES,
  runBathroomChecks,
};
