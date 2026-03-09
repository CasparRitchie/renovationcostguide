import { Link } from "react-router-dom";
import { formatGBP } from "../../utils/formatters";

export default function HomeHero({ estimate }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">Planning a home improvement project?</p>
          <h1>Estimate renovation costs and compare quotes from local contractors.</h1>
          <p className="hero-text">
            Use our free UK renovation cost calculator to estimate budgets for{" "}
            <Link to="/cost/loft-conversion">loft conversions</Link>,{" "}
            <Link to="/cost/house-extension">house extensions</Link>,{" "}
            <Link to="/cost/garden-room">garden rooms</Link> and{" "}
            <Link to="/cost/kitchen-renovation">kitchen renovations</Link>.
            {" "}When you&apos;re ready, you can also request quotes from trusted local
            professionals and compare prices before choosing the right contractor
            for your project. You can also read our{" "}
            <Link to="/how-much-does-it-cost-to-renovate-a-house-uk">
              full guide to house renovation costs in the UK
            </Link>{" "}
            before planning your project.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#calculator">
              Calculate Costs
            </a>
            <a className="btn btn-secondary" href="#quotes">
              Get Quotes
            </a>
          </div>

          <div className="hero-points">
            <span>Estimate renovation costs</span>
            <span>Read expert guides</span>
            <span>Compare local quotes</span>
            <span>Plan with confidence</span>
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
              Use the calculator to explore likely project costs, then request
              quotes from local contractors when you&apos;re ready to compare real
              pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
