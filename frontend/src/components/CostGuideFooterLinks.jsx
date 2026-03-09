import { Link } from "react-router-dom";

export default function CostGuideFooterLinks() {
  return (
    <section className="section" style={{ paddingTop: "24px" }}>
      <div className="container">
        <div
          className="benefit-card"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <p className="section-kicker" style={{ marginBottom: "8px" }}>
              Cost guide footer links
            </p>
            <h2 style={{ marginBottom: "8px" }}>
              Explore more renovation cost guides
            </h2>
            <p style={{ margin: 0 }}>
              Jump straight to some of the most important renovation cost pages
              on the site.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <Link className="btn btn-secondary" to="/cost/kitchen-renovation">
              Kitchen renovation
            </Link>
            <Link className="btn btn-secondary" to="/cost/bathroom-renovation">
              Bathroom renovation
            </Link>
            <Link className="btn btn-secondary" to="/cost/loft-conversion">
              Loft conversion
            </Link>
            <Link className="btn btn-secondary" to="/cost/house-extension">
              House extension
            </Link>
            <Link className="btn btn-secondary" to="/cost/garage-conversion">
              Garage conversion
            </Link>
            <Link className="btn btn-secondary" to="/cost/garden-room">
              Garden room
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
