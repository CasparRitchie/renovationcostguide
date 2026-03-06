import { useMemo, useState } from "react";

const PROJECT_BASE_COSTS = {
  loft: 40000,
  extension: 60000,
  garden: 18000,
  kitchen: 12000
};

const SIZE_MULTIPLIER = {
  small: 0.8,
  medium: 1,
  large: 1.3
};

const FINISH_MULTIPLIER = {
  basic: 0.9,
  standard: 1,
  premium: 1.25
};

function formatGBP(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

export default function App() {
  const [projectType, setProjectType] = useState("loft");
  const [size, setSize] = useState("medium");
  const [finish, setFinish] = useState("standard");

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    description: ""
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...lead,
          projectType,
          size,
          finish,
          estimateLow: estimate.low,
          estimateHigh: estimate.high
        })
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
        description: ""
      });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">RenovationCostGuide.co.uk</p>
          <h1>UK Renovation Cost Calculator</h1>
          <p className="sub">
            Estimate the cost of loft conversions, house extensions, garden
            rooms and kitchen renovations in a few seconds.
          </p>
        </div>
      </header>

      <main className="wrap grid">
        <section className="card">
          <h2>Calculate your estimate</h2>

          <label>
            Project type
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
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

          <div className="result">
            <p className="result-label">Estimated cost range</p>
            <p className="result-value">
              {formatGBP(estimate.low)} – {formatGBP(estimate.high)}
            </p>
            <p className="result-note">
              This is a rough guide for planning purposes. Exact pricing depends
              on design, location, structural work and finish.
            </p>
          </div>
        </section>

        <section className="card">
          <h2>Request quotes</h2>
          <p>
            Leave your details and we’ll use this to start matching your project
            with suitable builders.
          </p>

          <form onSubmit={handleSubmit} className="form">
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

            <label>
              Project description
              <textarea
                rows="4"
                value={lead.description}
                onChange={(e) => setLead({ ...lead, description: e.target.value })}
                placeholder="Tell us a little about your project"
              />
            </label>

            <button type="submit">Get my quotes</button>
          </form>

          {status && <p className="status">{status}</p>}
        </section>
      </main>
    </div>
  );
}
