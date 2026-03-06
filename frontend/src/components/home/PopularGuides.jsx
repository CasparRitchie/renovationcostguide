import { Link } from "react-router-dom";
import { popularGuides } from "../../data/homeData";

export default function PopularGuides() {
  return (
    <section id="guides" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Popular guides</p>
          <h2>Explore renovation cost guides</h2>
        </div>

        <div className="benefits-grid">
          {popularGuides.map((guide) => (
            <div className="benefit-card" key={guide.to}>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
              <Link className="btn btn-secondary" to={guide.to}>
                View guide
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
