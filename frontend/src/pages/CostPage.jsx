import { Link, useParams } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import { PROJECTS, CITIES, formatGBP } from "../data/seoData.js";

export default function CostPage() {
  const { projectSlug, citySlug } = useParams();

  const project = PROJECTS[projectSlug];
  const city = citySlug ? CITIES[citySlug] : null;

  if (!project) {
    return (
      <div className="section">
        <div className="container">
          <h1>Page not found</h1>
          <p>We couldn’t find that cost guide.</p>
          <Link to="/" className="btn btn-primary">Back to home</Link>
        </div>
      </div>
    );
  }

  const multiplier = city ? city.multiplier : 1;
  const low = Math.round(project.low * multiplier);
  const mid = Math.round(project.mid * multiplier);
  const high = Math.round(project.high * multiplier);

  const locationText = city ? ` in ${city.name}` : " in the UK";
  const pageTitle = `${project.name} Cost${locationText} | Renovation Cost Guide`;
  const metaDescription = `Estimate ${project.name.toLowerCase()} cost${locationText}. Typical budgets range from ${formatGBP(low)} to ${formatGBP(high)} depending on size, labour and finish.`;
  const canonical = `https://www.renovationcostguide.co.uk/cost/${projectSlug}${citySlug ? `/${citySlug}` : ""}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: project.faqs.map((faq) => ({
      "@type": "Question",
      name: city ? faq.q.replace("in the UK", `in ${city.name}`) : faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: city
          ? `${faq.a} Costs in ${city.name} can vary depending on local labour rates and project complexity.`
          : faq.a
      }
    }))
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={metaDescription}
        canonical={canonical}
        jsonLd={faqJsonLd}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Renovation cost guide</p>
            <h1>{project.name} Cost{locationText}</h1>
            <p className="hero-text">
              {project.intro} This guide gives a practical planning range for homeowners
              researching likely project budgets{locationText.toLowerCase()}.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#quote-form">Get Quotes</a>
              <Link className="btn btn-secondary" to="/">Back to home</Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-card">
              <p className="mini-label">Estimated budget range</p>
              <h3>{project.name}</h3>
              <p className="mini-price">
                {formatGBP(low)} – {formatGBP(high)}
              </p>
              <p className="mini-text">
                A realistic early-stage guide based on a typical UK project
                {city ? `, adjusted for ${city.name}` : ""}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Typical cost range</p>
            <h2>What does a {project.name.toLowerCase()} usually cost{locationText.toLowerCase()}?</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Lower range</h3>
              <p>{formatGBP(low)}</p>
            </div>
            <div className="benefit-card">
              <h3>Typical mid range</h3>
              <p>{formatGBP(mid)}</p>
            </div>
            <div className="benefit-card">
              <h3>Upper range</h3>
              <p>{formatGBP(high)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">What affects cost</p>
            <h2>Main price drivers</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Size and complexity</h3>
              <p>
                Larger projects and more complex layouts generally increase labour,
                materials and project management time.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Specification</h3>
              <p>
                Premium finishes, bespoke joinery, upgraded glazing and higher-end
                materials usually push budgets upward.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Location</h3>
              <p>
                Labour rates and supply costs can vary significantly by region
                {city ? `, especially in and around ${city.name}` : ""}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Frequently asked questions</p>
            <h2>{project.name} FAQs</h2>
          </div>

          <div className="card-grid single-column-grid">
            {project.faqs.map((faq) => (
              <div className="benefit-card" key={faq.q}>
                <h3>{city ? faq.q.replace("in the UK", `in ${city.name}`) : faq.q}</h3>
                <p>
                  {city
                    ? `${faq.a} Costs in ${city.name} can vary depending on local labour rates and project complexity.`
                    : faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote-form" className="section section-alt">
        <div className="container form-wrap">
          <div className="section-heading left">
            <p className="section-kicker">Get quotes</p>
            <h2>Ready to compare quotes?</h2>
            <p className="form-intro">
              Use the homepage quote form for now while we finish the fuller enquiry flow.
            </p>
          </div>

          <div className="quote-form">
            <p style={{ marginTop: 0 }}>
              Looking for real quotes for your {project.name.toLowerCase()}
              {city ? ` in ${city.name}` : ""}?
            </p>
            <Link to="/#quotes" className="btn btn-primary submit-btn">
              Go to quote form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
