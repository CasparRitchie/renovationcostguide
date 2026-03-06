import { useMemo, useState } from "react";

const PROJECT_BASE_COSTS = {
  loft: 40000,
  extension: 60000,
  garden: 18000,
  kitchen: 12000,
};

const SIZE_MULTIPLIER = {
  small: 0.8,
  medium: 1,
  large: 1.3,
};

const FINISH_MULTIPLIER = {
  basic: 0.9,
  standard: 1,
  premium: 1.25,
};

function formatGBP(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

const categoryCards = [
  {
    key: "loft",
    eyebrow: "Popular project",
    title: "Loft Conversions",
    text: "Estimate likely costs for turning unused roof space into a practical new room.",
  },
  {
    key: "extension",
    eyebrow: "High-value build",
    title: "House Extensions",
    text: "Get a quick planning estimate for side, rear and wraparound extensions.",
  },
  {
    key: "garden",
    eyebrow: "Fast-growing trend",
    title: "Garden Rooms",
    text: "See indicative costs for offices, studios and insulated garden buildings.",
  },
  {
    key: "kitchen",
    eyebrow: "Home upgrade",
    title: "Kitchen Renovations",
    text: "Budget for a new kitchen layout, finish level and overall refurbishment.",
  },
];

export default function App() {
  const [projectType, setProjectType] = useState("loft");
  const [size, setSize] = useState("medium");
  const [finish, setFinish] = useState("standard");

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    description: "",
  });

  const [status, setStatus] = useState("");

  const estimate = useMemo(() => {
    const base = PROJECT_BASE_COSTS[projectType];
    const mid = base * SIZE_MULTIPLIER[size] * FINISH_MULTIPLIER[finish];
    const low = Math.round(mid * 0.85);
    const high = Math.round(mid * 1.15);

    return { low, high };
  }, [projectType, size, finish]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...lead,
          projectType,
          size,
          finish,
          estimateLow: estimate.low,
          estimateHigh: estimate.high,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setStatus("Thanks — your request has been received.");
      setLead({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  }

  function chooseProject(projectKey) {
    setProjectType(projectKey);
    const el = document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <span className="brand-mark">RCG</span>
            <div>
              <div className="brand-name">Renovation Cost Guide</div>
              <div className="brand-sub">UK renovation planning estimates</div>
            </div>
          </div>

          <nav className="topnav">
            <a href="#categories">Project Types</a>
            <a href="#calculator">Calculator</a>
            <a href="#why-us">Why use us</a>
            <a href="#quotes">Get Quotes</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Planning a home improvement project?</p>
            <h1>Estimate renovation costs before you commit.</h1>
            <p className="hero-text">
              Use our free UK renovation cost calculator to get quick planning
              estimates for loft conversions, house extensions, garden rooms and
              kitchen renovations.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#calculator">
                Calculate Costs
              </a>
              <a className="btn btn-secondary" href="#quotes">
                Request Quotes
              </a>
            </div>

            <div className="hero-points">
              <span>Loft conversions</span>
              <span>Extensions</span>
              <span>Garden rooms</span>
              <span>Kitchens</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-card">
              <p className="mini-label">Example estimate</p>
              <h3>Loft Conversion</h3>
              <p className="mini-price">
                {formatGBP(estimate.low)} – {formatGBP(estimate.high)}
              </p>
              <p className="mini-text">
                Based on your current calculator selection. Adjust project type,
                size and finish to explore likely budget ranges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Project categories</p>
            <h2>Explore the most common renovation types</h2>
          </div>

          <div className="card-grid">
            {categoryCards.map((card) => (
              <button
                key={card.key}
                type="button"
                className="category-card"
                onClick={() => chooseProject(card.key)}
              >
                <p className="card-eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className="card-link">Use calculator →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="section section-alt">
        <div className="container calc-grid">
          <div className="panel">
            <p className="section-kicker">Free tool</p>
            <h2>Renovation Cost Calculator</h2>
            <p className="panel-intro">
              This is a quick guide for early budgeting. Final pricing depends on
              structural complexity, specification, access, location and labour.
            </p>

            <label>
              Project type
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="loft">Loft conversion</option>
                <option value="extension">House extension</option>
                <option value="garden">Garden room</option>
                <option value="kitchen">Kitchen renovation</option>
              </select>
            </label>

            <label>
              Size
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>

            <label>
              Finish
              <select value={finish} onChange={(e) => setFinish(e.target.value)}>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </label>
          </div>

          <div className="panel estimate-panel">
            <p className="mini-label">Estimated range</p>
            <div className="estimate-value">
              {formatGBP(estimate.low)} – {formatGBP(estimate.high)}
            </div>
            <p className="estimate-note">
              A practical budgeting range for an early-stage project discussion.
            </p>

            <div className="estimate-breakdown">
              <div>
                <span>Project</span>
                <strong>
                  {projectType === "loft" && "Loft conversion"}
                  {projectType === "extension" && "House extension"}
                  {projectType === "garden" && "Garden room"}
                  {projectType === "kitchen" && "Kitchen renovation"}
                </strong>
              </div>
              <div>
                <span>Size</span>
                <strong>{size}</strong>
              </div>
              <div>
                <span>Finish</span>
                <strong>{finish}</strong>
              </div>
            </div>

            <a className="btn btn-primary full-width-btn" href="#quotes">
              Continue to quote request
            </a>
          </div>
        </div>
      </section>

      <section id="why-us" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Why use us</p>
            <h2>Built to help you plan with more confidence</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Clear early estimates</h3>
              <p>
                Start with a realistic budget range before contacting builders or
                designers.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Simple project categories</h3>
              <p>
                Compare extensions, lofts, kitchens and garden rooms in one place.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Ready for quote matching</h3>
              <p>
                Submit your details once you’re ready to move from rough estimate
                to real pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quotes" className="section section-alt">
        <div className="container form-wrap">
          <div className="section-heading left">
            <p className="section-kicker">Quote request</p>
            <h2>Request renovation quotes</h2>
            <p className="form-intro">
              For now this form can collect enquiries while you finalise the
              email-sending setup.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="quote-form">
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
                  onChange={(e) =>
                    setLead({ ...lead, postcode: e.target.value })
                  }
                  required
                />
              </label>
            </div>

            <label>
              Project description
              <textarea
                rows="5"
                value={lead.description}
                onChange={(e) =>
                  setLead({ ...lead, description: e.target.value })
                }
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
    </div>
  );
}
