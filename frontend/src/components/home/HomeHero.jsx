import { Link } from "react-router-dom";
import { formatGBP } from "../../utils/formatters";

export default function HomeHero({ estimate }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">Planning a home improvement project?</p>
          <h1>Estimate renovation costs before you commit.</h1>
          <p className="hero-text">
            Use our free UK renovation cost calculator to get quick planning
            estimates for{" "}
            <Link to="/cost/loft-conversion">loft conversions</Link>,{" "}
            <Link to="/cost/house-extension">house extensions</Link>, garden rooms and
            kitchen renovations.
            <Link to="/cost/kitchen-renovation">kitchen renovations</Link>

            {" "}You can also read our{" "}
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
  );
}
