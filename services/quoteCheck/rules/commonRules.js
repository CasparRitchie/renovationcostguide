const COMMON_RULES = {
    totals: [
    "total",
    "grand total",
    "total cost",
    "total estimated cost",
    "estimated total cost",
    "overall cost",
    "overall price",
    "quote total",
    "quotation total",
    "final total",
    "total amount",
    "project total",
    "estimated cost"
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
  if (fallback && String(fallback).trim()) {
    const numeric = String(fallback).replace(/[^\d.]/g, "");
    if (numeric) {
      return `£${Number(numeric).toLocaleString("en-GB")}`;
    }
  }

  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const totalPatterns = [
    /(?:grand total|total estimated cost|estimated total cost|overall cost|overall price|quote total|quotation total|final total|total amount|project total|total cost|estimated cost|total)[^\d£$]*([£$]\s?\d[\d,]*(?:\.\d{1,2})?)/i,
    /([£$]\s?\d[\d,]*(?:\.\d{1,2})?)[^\n]*(?:grand total|total estimated cost|estimated total cost|overall cost|overall price|quote total|quotation total|final total|total amount|project total|total cost|estimated cost|total)/i,
  ];

  for (const line of lines) {
    for (const pattern of totalPatterns) {
      const match = line.match(pattern);
      if (match && match[1]) {
        return normaliseMoney(match[1]);
      }
    }
  }

  // fallback: search across joined text in case OCR split oddly
  const joined = lines.join(" ");
  for (const pattern of totalPatterns) {
    const match = joined.match(pattern);
    if (match && match[1]) {
      return normaliseMoney(match[1]);
    }
  }

  // final fallback: largest detected amount
  const moneyValues = detectMoneyValues(rawText);
  if (!moneyValues.length) return null;

  const parsed = moneyValues
    .map((value) => ({
      raw: value,
      num: parseFloat(String(value).replace(/[^\d.]/g, "")),
    }))
    .filter((item) => !Number.isNaN(item.num))
    .sort((a, b) => b.num - a.num);

  return parsed.length ? normaliseMoney(parsed[0].raw) : null;
}

function normaliseMoney(value) {
  const symbol = String(value).includes("$") ? "$" : "£";
  const numeric = String(value).replace(/[^\d.]/g, "");
  if (!numeric) return null;

  return `${symbol}${Number(numeric).toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
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
