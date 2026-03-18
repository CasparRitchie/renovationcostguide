import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link to="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="brand-mark">RCG</span>
          <div>
            <div className="brand-name">Renovation Cost Guide</div>
            <div className="brand-sub">UK renovation planning estimates</div>
          </div>
        </Link>

        <nav className="topnav">
          <Link to="/how-much-does-it-cost-to-renovate-a-house-uk">
            Renovation Guide
          </Link>
          <Link to="/cost/loft-conversion">Loft Costs</Link>
          <Link to="/cost/house-extension">Extension Costs</Link>
          <Link to="/cost/kitchen-renovation">Kitchen Costs</Link>
          <Link to="/quote-check">Quote Check</Link>
          <a href={isHome ? "#quotes" : "/#quotes"}>Get Quotes</a>
        </nav>
      </div>
    </header>
  );
}
