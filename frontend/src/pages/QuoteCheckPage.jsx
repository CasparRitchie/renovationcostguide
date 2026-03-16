import React, { useState } from "react";

const PROJECT_OPTIONS = [
  { value: "bathroom-renovation", label: "Bathroom renovation" },
  { value: "kitchen-renovation", label: "Kitchen renovation" },
  { value: "loft-conversion", label: "Loft conversion" },
  { value: "house-extension", label: "House extension" },
];

const CONCERN_OPTIONS = [
  "Whether the quote is too high",
  "Whether something important is missing",
  "Whether the quote is too vague",
  "Comparing quotes fairly",
  "Hidden extras",
];

export default function QuoteCheckPage() {
  const [file, setFile] = useState(null);
  const [projectType, setProjectType] = useState("bathroom-renovation");
  const [location, setLocation] = useState("");
  const [mainConcern, setMainConcern] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [quotedTotal, setQuotedTotal] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Please upload a quote file.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter a location.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectType", projectType);
      formData.append("location", location);
      formData.append("propertyType", propertyType);
      formData.append("quotedTotal", quotedTotal);
      formData.append("mainConcern", mainConcern);
      formData.append("notes", notes);

      const response = await fetch("/api/quote-check/analyse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.error?.message || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const analysis = result?.analysis;
  const snapshot = analysis?.snapshot;
  const overall = analysis?.overall_assessment;
  const cta = analysis?.cta;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: "980px" }}>
        <div className="section-heading">
          <p className="section-kicker">Quote assessment tool</p>
          <h1>Upload your builder’s quote and get a clearer second opinion</h1>
          <p>
            We review the structure, highlight possible gaps, flag vague items,
            and suggest smart questions to ask before you agree.
          </p>
        </div>

        <div className="benefit-card" style={{ marginBottom: "32px" }}>
          <form onSubmit={handleSubmit} className="quote-check-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="file">Upload quote</label>
                <input
                  id="file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">Project type</label>
                <select
                  id="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  {PROJECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Project location</label>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g. London or SW11"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="propertyType">Property type (optional)</label>
                <input
                  id="propertyType"
                  type="text"
                  placeholder="e.g. Flat, terraced house"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quotedTotal">Quoted total if known (optional)</label>
                <input
                  id="quotedTotal"
                  type="text"
                  placeholder="e.g. 15000"
                  value={quotedTotal}
                  onChange={(e) => setQuotedTotal(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mainConcern">What would you most like checked?</label>
                <select
                  id="mainConcern"
                  value={mainConcern}
                  onChange={(e) => setMainConcern(e.target.value)}
                >
                  <option value="">Select one</option>
                  {CONCERN_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "16px" }}>
              <label htmlFor="notes">Anything else you want us to focus on?</label>
              <textarea
                id="notes"
                rows="4"
                placeholder="Optional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Analysing..." : "Analyse quote"}
              </button>

              {file && (
                <span style={{ fontSize: "0.95rem", opacity: 0.8 }}>
                  {file.name}
                </span>
              )}
            </div>
          </form>
        </div>

        {error && (
          <div className="benefit-card" style={{ border: "1px solid #c62828", marginBottom: "24px" }}>
            <h3>There was a problem</h3>
            <p>{error}</p>
          </div>
        )}

        {overall && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">Assessment summary</p>
              <h2>{overall.label}</h2>
              <p>{overall.summary}</p>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>Confidence</h3>
                <p>{overall.confidence}</p>
              </div>
              <div className="benefit-card">
                <h3>Project</h3>
                <p>{snapshot?.project_type || "—"}</p>
              </div>
              <div className="benefit-card">
                <h3>Location</h3>
                <p>{snapshot?.location || "—"}</p>
              </div>
              <div className="benefit-card">
                <h3>Quote total</h3>
                <p>{snapshot?.quote_total || "—"}</p>
              </div>
              <div className="benefit-card">
                <h3>VAT</h3>
                <p>{snapshot?.vat_status || "—"}</p>
              </div>
              <div className="benefit-card">
                <h3>Payment schedule</h3>
                <p>{snapshot?.payment_schedule || "—"}</p>
              </div>
              <div className="benefit-card">
                <h3>Timeline</h3>
                <p>{snapshot?.timeline || "—"}</p>
              </div>
              <div className="benefit-card">
                <h3>Itemisation</h3>
                <p>{snapshot?.itemisation_level || "—"}</p>
              </div>
            </div>
          </section>
        )}

        {analysis?.strengths?.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">What looks good</p>
              <h2>Strengths</h2>
            </div>
            <div className="benefit-card">
              <ul className="content-list">
                {analysis.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {analysis?.possible_gaps?.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">Possible gaps</p>
              <h2>What may be missing</h2>
            </div>
            <div className="benefit-card">
              <ul className="content-list">
                {analysis.possible_gaps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {analysis?.clarifications_needed?.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">Needs clarification</p>
              <h2>What to check more closely</h2>
            </div>
            <div className="benefit-card">
              <ul className="content-list">
                {analysis.clarifications_needed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {analysis?.red_flags?.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">Red flags</p>
              <h2>Things to be cautious about</h2>
            </div>
            <div className="benefit-card">
              <ul className="content-list">
                {analysis.red_flags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {analysis?.questions_to_ask?.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">Questions to ask</p>
              <h2>Useful follow-up questions for the builder</h2>
            </div>
            <div className="benefit-card">
              <ul className="content-list">
                {analysis.questions_to_ask.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {analysis?.range_check && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-heading left">
              <p className="section-kicker">Cost sense-check</p>
              <h2>Broad range comparison</h2>
            </div>
            <div className="benefit-card">
              <h3>{analysis.range_check.status.replaceAll("_", " ")}</h3>
              <p>{analysis.range_check.comment}</p>
            </div>
          </section>
        )}

        {cta?.show_get_quotes && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="benefit-card">
              <p className="section-kicker" style={{ marginBottom: "8px" }}>
                Next step
              </p>
              <h2 style={{ marginBottom: "8px" }}>{cta.label}</h2>
              <p>{cta.reason}</p>
              <a href="/#quotes" className="btn btn-primary">
                Get quotes
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 
