export default function QuoteSection({
  lead,
  setLead,
  status,
  onSubmit,
}) {
  return (
    <section id="quotes" className="section section-alt">
      <div className="container form-wrap">
        <div className="section-heading left">
          <p className="section-kicker">Quote request</p>
          <h2>Request renovation quotes</h2>
          <p className="form-intro">
            Share a few details about your project and we’ll use them to start
            matching your enquiry properly.
          </p>
        </div>

        <form onSubmit={onSubmit} className="quote-form">
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
            Project description
            <textarea
              rows="5"
              value={lead.description}
              onChange={(e) => setLead({ ...lead, description: e.target.value })}
              placeholder="Tell us about the project you have in mind"
            />
          </label>

          <button type="submit" className="btn btn-primary submit-btn">
            Get My Quotes
          </button>

          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
