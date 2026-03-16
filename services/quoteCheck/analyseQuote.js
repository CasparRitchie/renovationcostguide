const {
  COMMON_RULES,
  normaliseText,
  includesAny,
  findMatchedTerms,
  detectTotal,
  assessItemisation,
} = require("./rules/commonRules");
const { runBathroomChecks } = require("./rules/bathroomRules");

const PROJECT_LABELS = {
  "bathroom-renovation": "Bathroom renovation",
  "kitchen-renovation": "Kitchen renovation",
  "loft-conversion": "Loft conversion",
  "house-extension": "House extension",
};

const TYPICAL_RANGES = {
  "bathroom-renovation": { low: 5000, high: 25000 },
  "kitchen-renovation": { low: 8000, high: 30000 },
  "loft-conversion": { low: 25000, high: 70000 },
  "house-extension": { low: 30000, high: 120000 },
};

function toNumberFromMoney(value) {
  if (!value) return null;
  const numeric = String(value).replace(/[^\d.]/g, "");
  return numeric ? Number(numeric) : null;
}

function runCommonChecks(rawText, quotedTotalInput = "") {
  const text = normaliseText(rawText);
  const detectedTotal = detectTotal(rawText, quotedTotalInput);

  const vatPresent = includesAny(text, COMMON_RULES.vat);
  const paymentPresent = includesAny(text, COMMON_RULES.paymentSchedule);
  const timelinePresent = includesAny(text, COMMON_RULES.timeline);
  const exclusionsPresent = includesAny(text, COMMON_RULES.exclusions);
  const totalPresent = Boolean(detectedTotal);
  const itemisationLevel = assessItemisation(rawText);

  const vagueHits = findMatchedTerms(text, COMMON_RULES.vagueTerms);

  return {
    detectedTotal,
    vatStatus: vatPresent ? "present" : "unclear",
    paymentSchedule: paymentPresent ? "present" : "missing",
    timeline: timelinePresent ? "present" : "missing",
    exclusions: exclusionsPresent ? "present" : "missing",
    totalPresent,
    itemisationLevel,
    vagueTermHits: vagueHits,
    vagueTermCount: vagueHits.length,
  };
}

function runProjectChecks(projectType, rawText) {
  const text = normaliseText(rawText);

  switch (projectType) {
    case "bathroom-renovation":
      return runBathroomChecks(text);
    case "kitchen-renovation":
    case "loft-conversion":
    case "house-extension":
    default:
      return {
        found: [],
        missing: [],
        strengths: [],
        possibleGaps: [],
        questionsToAsk: [],
      };
  }
}

function runRangeCheck(projectType, detectedTotal) {
  const range = TYPICAL_RANGES[projectType];
  const totalNum = toNumberFromMoney(detectedTotal);

  if (!range || !totalNum) {
    return {
      status: "hard_to_judge",
      comment:
        "This quote is hard to judge confidently from the available information alone.",
    };
  }

  if (totalNum < range.low * 0.75) {
    return {
      status: "possibly_low",
      comment:
        "This appears lower than a typical broad range for this type of project, so it may be worth checking exactly what is included.",
    };
  }

  if (totalNum > range.high * 1.25) {
    return {
      status: "possibly_high",
      comment:
        "This appears higher than a typical broad range for this type of project, although specification and inclusions may justify the difference.",
    };
  }

  return {
    status: "broadly_in_range",
    comment:
      "This appears broadly within a typical range for this project type, although specification and inclusions will affect whether it represents good value.",
  };
}

function buildAssessment(common, projectChecks) {
  let score = 0;

  if (common.totalPresent) score += 2;
  if (common.vatStatus === "present") score += 1;
  if (common.paymentSchedule === "present") score += 1;
  if (common.timeline === "present") score += 1;
  if (common.exclusions === "present") score += 1;
  if (common.itemisationLevel === "clear") score += 2;
  if (common.itemisationLevel === "moderate") score += 1;
  if (projectChecks.found.length >= 4) score += 2;

  if (!common.totalPresent) score -= 3;
  if (common.vatStatus !== "present") score -= 1;
  if (common.paymentSchedule !== "present") score -= 1;
  if (common.timeline !== "present") score -= 1;
  if (common.exclusions !== "present") score -= 1;
  if (common.itemisationLevel === "weak") score -= 2;
  if (common.vagueTermCount >= 3) score -= 2;
  if (projectChecks.missing.length >= 3) score -= 3;

  if (score >= 4) {
    return {
      label: "Looks reasonably detailed",
      confidence: "medium",
      summary:
        "This quote appears reasonably structured, although a few details may still need checking before you proceed.",
    };
  }

  if (score >= 0) {
    return {
      label: "Some important details need checking",
      confidence: "medium",
      summary:
        "This quote appears to cover some key elements, but several areas still need clarification before you can compare it confidently or agree to proceed.",
    };
  }

  return {
    label: "Too vague to rely on confidently",
    confidence: "medium",
    summary:
      "This quote is difficult to assess confidently because several important details appear unclear, missing or only broadly described.",
    };
  }
}

function buildCTA(assessment, common, projectChecks, rangeCheck) {
  const strong =
    assessment.label === "Too vague to rely on confidently" ||
    common.itemisationLevel === "weak" ||
    !common.totalPresent ||
    projectChecks.missing.length >= 3 ||
    rangeCheck.status === "possibly_high" ||
    rangeCheck.status === "possibly_low";

  if (strong) {
    return {
      show_get_quotes: true,
      strength: "strong",
      label: "Compare with other quotes",
      reason:
        "This quote has a few unclear or missing areas, so comparing with other contractors may help you make a more confident decision.",
    };
  }

  return {
    show_get_quotes: true,
    strength: "soft",
    label: "Get another quote for comparison",
    reason:
      "Even if this quote may be workable, comparing with another contractor could help you spot differences in scope, detail and pricing.",
  };
}

function analyseQuote({
  extractedText,
  fileName,
  fileType,
  projectType,
  location,
  propertyType = "",
  quotedTotalInput = "",
  mainConcern = "",
}) {
  const common = runCommonChecks(extractedText, quotedTotalInput);
  const projectChecks = runProjectChecks(projectType, extractedText);
  const rangeCheck = runRangeCheck(projectType, common.detectedTotal);
  const assessment = buildAssessment(common, projectChecks);
  const cta = buildCTA(assessment, common, projectChecks, rangeCheck);

  const strengths = [
    ...(common.totalPresent ? ["The quote includes a clear overall total."] : []),
    ...(common.paymentSchedule === "present"
      ? ["The payment stages are shown."]
      : []),
    ...(common.vatStatus === "present"
      ? ["VAT appears to be mentioned."]
      : []),
    ...(projectChecks.strengths || []),
  ];

  const possibleGaps = [
    ...projectChecks.possibleGaps,
    ...(common.timeline === "missing" ? ["No clear timeline is shown."] : []),
    ...(common.exclusions === "missing"
      ? ["Exclusions are not clearly shown."]
      : []),
  ];

  const clarificationsNeeded = [
    ...(common.vatStatus !== "present"
      ? ["It is not clear whether VAT is included."]
      : []),
    ...(common.vagueTermCount > 0
      ? ["Several items may need clarification because vague wording is used."]
      : []),
    ...(mainConcern ? [`User concern noted: ${mainConcern}.`] : []),
  ];

  const redFlags = [
    ...(!common.totalPresent ? ["No clear overall total was found."] : []),
    ...(common.itemisationLevel === "weak"
      ? ["The quote appears only lightly itemised."]
      : []),
    ...(common.vagueTermCount >= 3
      ? ["The quote uses several vague or provisional terms."]
      : []),
  ];

  const questionsToAsk = [...new Set(projectChecks.questionsToAsk)];

  return {
    input: {
      project_type: projectType,
      location,
      property_type: propertyType,
      quoted_total_input: quotedTotalInput,
      main_concern: mainConcern,
    },
    extraction: {
      file_name: fileName,
      file_type: fileType,
      text_extracted: true,
      extracted_text_length: extractedText.length,
      detected_total: common.detectedTotal,
      detected_vat: common.vatStatus,
      detected_payment_schedule: common.paymentSchedule === "present",
      detected_timeline: common.timeline === "present",
    },
    analysis: {
      overall_assessment: assessment,
      snapshot: {
        project_type: PROJECT_LABELS[projectType] || projectType,
        location,
        quote_total: common.detectedTotal || "Not clearly found",
        vat_status: common.vatStatus,
        payment_schedule: common.paymentSchedule,
        timeline: common.timeline,
        itemisation_level: common.itemisationLevel,
      },
      strengths,
      possible_gaps: possibleGaps,
      clarifications_needed: clarificationsNeeded,
      red_flags: redFlags,
      questions_to_ask: questionsToAsk,
      range_check: rangeCheck,
      cta,
    },
    debug: {
      structure_score: strengths.length - possibleGaps.length,
      vague_term_hits: common.vagueTermHits,
      expected_items_found: projectChecks.found,
      expected_items_missing: projectChecks.missing,
    },
  };
}

module.exports = {
  analyseQuote,
};
