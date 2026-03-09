import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import { formatGBP } from "../data/seoData.js";
import Navbar from "../components/Navbar.jsx";
import CostGuideFooterLinks from "../components/CostGuideFooterLinks.jsx";

export default function RenovationCostGuide() {

  const averageLow = 20000;
  const averageHigh = 120000;

  return (
    <>
      <SeoHead
        title="How Much Does It Cost to Renovate a House in the UK?"
        description="Learn the average cost to renovate a house in the UK. Compare full house renovation costs, project budgets and typical renovation prices."
        canonical="https://www.renovationcostguide.co.uk/how-much-does-it-cost-to-renovate-a-house-uk"
      />

      <Navbar />

        <section className="hero">
          <div className="container hero-grid">

            <div className="hero-copy">
              <p className="hero-kicker">Renovation planning guide</p>

              <h1>
                How Much Does It Cost to Renovate a House in the UK?
              </h1>

              <p className="hero-text">
                Renovating a house in the UK can cost anywhere from
                {" "}
                <strong>{formatGBP(averageLow)}</strong>
                {" "}to{" "}
                <strong>{formatGBP(averageHigh)}</strong>
                {" "}
                depending on the size of the property, the level of renovation,
                and the quality of finishes.
              </p>

              <div className="hero-actions">
                <a href="/#calculator" className="btn btn-primary">
                  Use cost calculator
                </a>

                <a href="/#quotes" className="btn btn-secondary">
                  Get renovation quotes
                </a>
              </div>
            </div>

          </div>
        </section>

        <section className="section">
          <div className="container">

            <div className="section-heading">
              <p className="section-kicker">Average renovation cost</p>
              <h2>Typical house renovation costs in the UK</h2>
            </div>

            <div className="benefits-grid">

              <div className="benefit-card">
                <h3>Light renovation</h3>
                <p>
                  Cosmetic improvements such as painting, flooring and minor
                  upgrades can cost between <strong>£20,000 and £40,000</strong>.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Moderate renovation</h3>
                <p>
                  Renovations including a new kitchen, bathroom upgrades and
                  structural changes often range from
                  <strong> £40,000 to £80,000</strong>.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Full renovation</h3>
                <p>
                  A full house renovation with extensions or loft conversions
                  can exceed <strong>£100,000+</strong>.
                </p>
              </div>

              <div className="benefit-card">
                <h3>House Renovation Cost Guide</h3>
                <p>
                  Learn how much it costs to renovate a house in the UK, including typical
                  renovation budgets by property size and project type.
                </p>
                <Link
                  className="btn btn-secondary"
                  to="/how-much-does-it-cost-to-renovate-a-house-uk"
                >
                  View guide
                </Link>
              </div>

            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">

            <div className="section-heading">
              <p className="section-kicker">Renovation by property size</p>
              <h2>Estimated renovation budgets by house size</h2>
            </div>

            <div className="benefits-grid">

              <div className="benefit-card">
                <h3>2 bedroom house</h3>
                <p>Typical renovation budgets range from £25k – £60k.</p>
              </div>

              <div className="benefit-card">
                <h3>3 bedroom house</h3>
                <p>Renovation costs often fall between £40k – £90k.</p>
              </div>

              <div className="benefit-card">
                <h3>4 bedroom house</h3>
                <p>Large house renovations can exceed £120k.</p>
              </div>

            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">

            <div className="section-heading">
              <p className="section-kicker">Common renovation projects</p>
              <h2>Typical renovation project costs</h2>
            </div>

            <div className="benefits-grid">

              <div className="benefit-card">
                <h3>Kitchen renovation</h3>
                <p>£8,000 – £30,000</p>
                <Link to="/cost/kitchen-renovation" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Loft conversion</h3>
                <p>£25,000 – £70,000</p>
                <Link to="/cost/loft-conversion" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>House extension</h3>
                <p>£30,000 – £120,000</p>
                <Link to="/cost/house-extension" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Renovation Cost per m²</h3>
                <p>
                  Understand average renovation cost per square metre in the UK and
                  how budgets change depending on project scope and finish.
                </p>
                <Link
                  to="/cost-per-m2-house-renovation-uk"
                  className="btn btn-secondary"
                >
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Loft Conversion Cost Guide</h3>
                <p>
                  Compare rooflight, dormer and hip-to-gable loft conversion costs in the UK.
                </p>
                <Link
                  to="/how-much-does-a-loft-conversion-cost-uk"
                  className="btn btn-secondary"
                >
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>House Extension Cost Guide</h3>
                <p>
                  Learn typical UK house extension budgets including rear, side return and
                  double-storey extensions.
                </p>
                <Link
                  to="/how-much-does-a-house-extension-cost-uk"
                  className="btn btn-secondary"
                >
                  View guide
                </Link>
              </div>

            </div>

          </div>
        </section>

        <section className="section section-alt">
          <div className="container">

            <div className="section-heading">
              <p className="section-kicker">Explore renovation costs</p>
              <h2>Popular renovation cost guides</h2>
            </div>

            <div className="benefits-grid">

              <div className="benefit-card">
                <h3>Kitchen renovation cost</h3>
                <Link to="/cost/kitchen-renovation" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Bathroom renovation cost</h3>
                <Link to="/cost/bathroom-renovation" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Loft conversion cost</h3>
                <Link to="/cost/loft-conversion" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>House extension cost</h3>
                <Link to="/cost/house-extension" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Garage conversion cost</h3>
                <Link to="/cost/garage-conversion" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>Garden room cost</h3>
                <Link to="/cost/garden-room" className="btn btn-secondary">
                  View guide
                </Link>
              </div>

            </div>

          </div>
        </section>
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Renovation planning guides</p>
              <h2>Helpful UK renovation cost guides</h2>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>Cost Per m² House Renovation UK</h3>
                <p>
                  Understand average renovation cost per square metre in the UK
                  for lighter, mid-range and full renovation projects.
                </p>
                <Link
                  className="btn btn-secondary"
                  to="/cost-per-m2-house-renovation-uk"
                >
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>How Much Does a Loft Conversion Cost?</h3>
                <p>
                  Compare typical UK loft conversion budgets, including rooflight,
                  dormer and hip-to-gable projects.
                </p>
                <Link
                  className="btn btn-secondary"
                  to="/how-much-does-a-loft-conversion-cost-uk"
                >
                  View guide
                </Link>
              </div>

              <div className="benefit-card">
                <h3>How Much Does a House Extension Cost?</h3>
                <p>
                  See typical UK extension budgets for rear, side return and
                  double-storey projects.
                </p>
                <Link
                  className="btn btn-secondary"
                  to="/how-much-does-a-house-extension-cost-uk"
                >
                  View guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CostGuideFooterLinks />
      </>
  );
}
