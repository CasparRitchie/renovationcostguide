export default function QuoteSection({
  lead,
  setLead,
  status,
  onSubmit,
  projectSummary,
}) {
  return (
    <section id="quotes" className="section section-alt">
      <div className="container form-wrap">
        <div className="section-heading left">
          <p className="section-kicker">Compare renovation quotes</p>
          <h2>Get quotes from local renovation specialists</h2>
          <p className="form-intro">
            Tell us a little about your project and we’ll help connect you with
            experienced contractors in your area so you can compare quotes and
            choose the right professional for your renovation.
          </p>
        </div>

        <form onSubmit={onSubmit} className="quote-form">
          <ul className="quote-benefits">
            <li>✓ Free service for homeowners</li>
            <li>✓ Compare quotes from local contractors</li>
            <li>✓ No obligation to proceed</li>
          </ul>

          {projectSummary && (
            <div className="project-summary-card">
              <div className="section-heading left" style={{ marginBottom: "16px" }}>
                <p className="section-kicker">Your project summary</p>
                <h2 style={{ fontSize: "1.5rem" }}>Based on your calculator selections</h2>
              </div>

              <div className="benefits-grid">
                {projectSummary.projectType && (
                  <div className="benefit-card">
                    <h3>Project type</h3>
                    <p>{projectSummary.projectType}</p>
                  </div>
                )}

                {projectSummary.size && (
                  <div className="benefit-card">
                    <h3>Project size</h3>
                    <p>{projectSummary.size}</p>
                  </div>
                )}

                {projectSummary.finish && (
                  <div className="benefit-card">
                    <h3>Finish level</h3>
                    <p>{projectSummary.finish}</p>
                  </div>
                )}

                {projectSummary.location && (
                  <div className="benefit-card">
                    <h3>Location</h3>
                    <p>{projectSummary.location}</p>
                  </div>
                )}

                {(projectSummary.estimateLow || projectSummary.estimateHigh) && (
                  <div className="benefit-card">
                    <h3>Estimated budget</h3>
                    <p>
                      {projectSummary.estimateLow} – {projectSummary.estimateHigh}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "16px" }}>
                <a href="#calculator" className="btn btn-secondary">
                  Edit calculator selections
                </a>
              </div>
            </div>
          )}

          <div className="form-row two-col">
            <label>
              Name
              <input
                type="text"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                required
              />
            </label>
          </div>

          <div className="form-row two-col">
            <label>
              Phone
              <input
                type="text"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              />
            </label>

            <label>
              Postcode
              <input
                type="text"
                value={lead.postcode}
                onChange={(e) => setLead({ ...lead, postcode: e.target.value })}
                required
              />
            </label>
          </div>

          <label>
            Project details
            <textarea
              rows="5"
              value={lead.description}
              onChange={(e) => setLead({ ...lead, description: e.target.value })}
              placeholder="For example: kitchen renovation, loft conversion, extension size, timeline, or any key details"
            />
          </label>

          <button type="submit" className="btn btn-primary submit-btn">
            Get renovation quotes
          </button>

          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
