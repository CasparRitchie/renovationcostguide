const COMMON_RULES = {
  totals: [
    "total",
    "grand total",
    "total cost",
    "total price",
    "quote total",
    "quotation total",
  ],
  vat: [
    "vat",
    "including vat",
    "excluding vat",
    "inc vat",
    "ex vat",
  ],
  paymentSchedule: [
    "deposit",
    "stage payment",
    "payment schedule",
    "balance",
    "interim payment",
    "final payment",
  ],
  timeline: [
    "weeks",
    "working days",
    "duration",
    "start date",
    "completion",
    "programme",
    "timeline",
  ],
  exclusions: [
    "excluded",
    "exclusions",
    "not included",
    "excluded works",
    "outside scope",
  ],
  vagueTerms: [
    "estimate",
    "provisional",
    "as required",
    "if needed",
    "tbc",
    "to be confirmed",
    "subject to survey",
    "allowance",
    "approx",
    "client to supply",
  ],
};

function normaliseText(text = "") {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesAny(text, terms = []) {
  return terms.some((term) => text.includes(term));
}

function findMatchedTerms(text, terms = []) {
  return terms.filter((term) => text.includes(term));
}

function detectMoneyValues(rawText = "") {
  const matches = rawText.match(/£\s?\d[\d,]*(?:\.\d{1,2})?/g) || [];
  return [...new Set(matches)];
}

function detectTotal(rawText = "", fallback = "") {
  const moneyValues = detectMoneyValues(rawText);

  if (fallback && String(fallback).trim()) {
    const numeric = String(fallback).replace(/[^\d.]/g, "");
    if (numeric) {
      return `£${Number(numeric).toLocaleString("en-GB")}`;
    }
  }

  return moneyValues.length > 0 ? moneyValues[moneyValues.length - 1] : null;
}

function assessItemisation(rawText = "") {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const pricedLines = lines.filter(
    (line) =>
      /£\s?\d/.test(line) ||
      /\b(total|supply|install|labour|materials)\b/i.test(line)
  );

  if (pricedLines.length >= 8) return "clear";
  if (pricedLines.length >= 4) return "moderate";
  return "weak";
}

module.exports = {
  COMMON_RULES,
  normaliseText,
  includesAny,
  findMatchedTerms,
  detectTotal,
  assessItemisation,
};
