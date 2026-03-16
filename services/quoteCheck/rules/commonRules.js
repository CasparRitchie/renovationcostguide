const COMMON_RULES = {
  totals: [
    "total",
    "grand total",
    "total cost",
    "total estimated cost",
    "estimated total cost",
    "overall cost",
    "overall price",
    "overall total",
    "quote total",
    "quotation total",
    "final total",
    "total amount",
    "project total",
    "estimated cost",
    "estimated total",
    "estimated project cost",
    "estimated project total",
    "final cost",
    "final price",
    "final amount",
    "contract total",
    "contract price",
    "sum total",
    "balance total",
    "amount due",
    "amount payable",
    "total payable",
    "price total",
    "total estimated",
    "estimated works cost",
    "works total",
    "job total",
    "renovation total",
    "project cost",
    "project price",
    "quote amount",
    "quotation amount",
    "overall estimate",
    "estimate total",
    "estimated works total",
    "total estimated price",
    "cost summary",
    "pricing summary",
    "summary total",
    "scope total",
    "project estimate",
    "estimated quotation total"
  ],

  vat: [
    "vat",
    "including vat",
    "excluding vat",
    "inc vat",
    "ex vat",
    "vat included",
    "vat excluded",
    "plus vat",
    "less vat",
    "vat @",
    "vat at",
    "vat amount",
    "vat total",
    "value added tax",
    "includes vat",
    "excludes vat",
    "subject to vat",
    "net of vat",
    "gross of vat",
    "tax",
    "sales tax",
    "tax included",
    "tax excluded",
    "including tax",
    "excluding tax",
    "inc tax",
    "ex tax",
    "tax amount",
    "tax total",
    "before tax",
    "after tax",
    "subtotal before vat",
    "subtotal before tax",
    "sub total before vat",
    "sub total before tax",
    "total incl. vat",
    "total incl vat",
    "total excl. vat",
    "total excl vat",
    "incl vat",
    "excl vat",
    "incl. vat",
    "excl. vat"
  ],

  paymentSchedule: [
    "deposit",
    "initial deposit",
    "advance payment",
    "upfront payment",
    "stage payment",
    "stage payments",
    "payment schedule",
    "payment plan",
    "payment terms",
    "payment structure",
    "payment breakdown",
    "interim payment",
    "interim payments",
    "midway payment",
    "mid project payment",
    "progress payment",
    "progress payments",
    "final payment",
    "final balance",
    "balance",
    "balance due",
    "remaining balance",
    "retention",
    "retention payment",
    "instalment",
    "instalments",
    "installment",
    "installments",
    "milestone payment",
    "milestone payments",
    "upon completion",
    "on completion",
    "at completion",
    "on contract signing",
    "at contract signing",
    "on acceptance",
    "payment due",
    "payments due",
    "due date",
    "due dates",
    "terms of payment",
    "invoice schedule",
    "billing schedule",
    "schedule of payments",
    "stage 1 payment",
    "stage 2 payment",
    "stage 3 payment"
  ],

  timeline: [
    "timeline",
    "project timeline",
    "programme",
    "program",
    "schedule",
    "works schedule",
    "project schedule",
    "estimated duration",
    "duration",
    "estimated time",
    "estimated programme",
    "estimated program",
    "working days",
    "calendar days",
    "weeks",
    "start date",
    "start",
    "estimated start",
    "proposed start",
    "commencement",
    "commencement date",
    "completion date",
    "completion",
    "estimated completion",
    "practical completion",
    "finish date",
    "estimated finish",
    "end date",
    "target completion",
    "expected completion",
    "project start",
    "project end",
    "lead time",
    "timeframe",
    "project timeframe",
    "anticipated start",
    "anticipated completion",
    "works to commence",
    "works complete by"
  ],

  exclusions: [
    "excluded",
    "exclusions",
    "excluded works",
    "not included",
    "not included in quote",
    "not included in price",
    "excluded from quote",
    "excluded from price",
    "outside scope",
    "out of scope",
    "scope exclusions",
    "does not include",
    "do not include",
    "excluding",
    "excludes",
    "optional extras",
    "extra over",
    "extras",
    "additional works",
    "additional costs",
    "client to supply",
    "customer to supply",
    "by others",
    "owner supplied",
    "supplied by client",
    "supplied by customer",
    "allowance only",
    "provisional sum",
    "provisional sums",
    "subject to survey",
    "subject to inspection",
    "unless stated otherwise",
    "not allowed for",
    "no allowance for",
    "exclusions apply",
    "this quote excludes",
    "the following are excluded",
    "the following are not included"
  ],

  vagueTerms: [
    "estimate",
    "estimated",
    "provisional",
    "provisional sum",
    "provisional sums",
    "as required",
    "if needed",
    "if required",
    "where necessary",
    "where required",
    "tbc",
    "to be confirmed",
    "to be agreed",
    "to be discussed",
    "subject to survey",
    "subject to site survey",
    "subject to inspection",
    "subject to access",
    "subject to opening up",
    "allowance",
    "allowances",
    "approx",
    "approximately",
    "around",
    "client to supply",
    "customer to supply",
    "by others",
    "to follow",
    "not yet confirmed",
    "assumed",
    "assumption",
    "assumptions",
    "proposed",
    "anticipated",
    "indicative",
    "guide price",
    "budget price",
    "budget estimate",
    "draft",
    "preliminary",
    "for guidance only",
    "ballpark",
    "tendered sum",
    "pending confirmation"
  ],
};

function cleanExtractedText(text = "") {
  return text
    .replace(/[|]/g, " ")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function normaliseText(text = "") {
  return cleanExtractedText(text).toLowerCase().replace(/\s+/g, " ").trim();
}

function includesAny(text, terms = []) {
  return terms.some((term) => text.includes(term));
}

function findMatchedTerms(text, terms = []) {
  return terms.filter((term) => text.includes(term));
}

function detectMoneyValues(rawText = "") {
  const matches =
    rawText.match(/[£$€]\s?\d[\d,]*(?:\.\d{1,2})?/g) || [];
  return [...new Set(matches)];
}

function normaliseMoney(value) {
  const symbol = String(value).includes("$")
    ? "$"
    : String(value).includes("€")
      ? "€"
      : "£";

  const numeric = String(value).replace(/[^\d.]/g, "");
  if (!numeric) return null;

  return `${symbol}${Number(numeric).toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function detectTotal(rawText = "", fallback = "") {
  if (fallback && String(fallback).trim()) {
    const numeric = String(fallback).replace(/[^\d.]/g, "");
    if (numeric) {
      return `£${Number(numeric).toLocaleString("en-GB")}`;
    }
  }

  const lines = cleanExtractedText(rawText)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const totalLabelPattern =
    "(grand total|total estimated cost|estimated total cost|overall cost|overall price|overall total|quote total|quotation total|final total|total amount|project total|estimated cost|estimated total|estimated project cost|estimated project total|final cost|final price|final amount|contract total|contract price|sum total|amount due|amount payable|total payable|price total|works total|job total|project cost|project price|quote amount|quotation amount|overall estimate|estimate total|pricing summary|summary total|project estimate|total cost|total)";

  const totalPatterns = [
    new RegExp(`${totalLabelPattern}[^\\d£$€]{0,25}([£$€]\\s?\\d[\\d,]*(?:\\.\\d{1,2})?)`, "i"),
    new RegExp(`([£$€]\\s?\\d[\\d,]*(?:\\.\\d{1,2})?)[^\\n]{0,40}${totalLabelPattern}`, "i"),
  ];

  for (const line of lines) {
    for (const pattern of totalPatterns) {
      const match = line.match(pattern);
      if (match && match[1]) {
        return normaliseMoney(match[1]);
      }
    }
  }

  const joined = lines.join(" ");
  for (const pattern of totalPatterns) {
    const match = joined.match(pattern);
    if (match && match[1]) {
      return normaliseMoney(match[1]);
    }
  }

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

function assessItemisation(rawText = "") {
  const lines = cleanExtractedText(rawText)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const itemSignals = lines.filter((line) => {
    return (
      /[£$€]\s?\d/.test(line) ||
      /\b(total|supply|install|installation|labour|labor|materials|task|cost|amount|payment|due date|timeline|item|description|scope|works|rate|qty|quantity|price)\b/i.test(
        line
      )
    );
  });

  if (itemSignals.length >= 10) return "clear";
  if (itemSignals.length >= 5) return "moderate";
  return "weak";
}

module.exports = {
  COMMON_RULES,
  cleanExtractedText,
  normaliseText,
  includesAny,
  findMatchedTerms,
  detectMoneyValues,
  normaliseMoney,
  detectTotal,
  assessItemisation,
};
