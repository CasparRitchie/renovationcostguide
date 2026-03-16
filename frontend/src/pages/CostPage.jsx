import { Link, useParams } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import { PROJECTS, CITIES, formatGBP } from "../data/seoData.js";
import { CITY_DATA } from "../data/cityData.js";
import Navbar from "../components/Navbar.jsx";
import CostGuideFooterLinks from "../components/CostGuideFooterLinks.jsx";

export default function CostPage() {
  const { projectSlug, citySlug } = useParams();

  const project = PROJECTS[projectSlug];
  const city = citySlug ? CITIES[citySlug] : null;
  const cityInfo = citySlug ? CITY_DATA[citySlug] : null;
  const isPillarPage = !city;

  if (!project) {
    return (
      <div className="section">
        <div className="container">
          <h1>Page not found</h1>
          <p>We couldn’t find that cost guide.</p>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = Object.entries(PROJECTS)
    .filter(([slug]) => slug !== projectSlug)
    .slice(0, 4);

  const relatedCities = Object.entries(CITIES)
    .filter(([slug]) => slug !== citySlug)
    .slice(0, 4);

  const featuredCitySlugs = [
    "london",
    "manchester",
    "birmingham",
    "leeds",
    "bristol",
    "oxford",
  ];

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
          : faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.renovationcostguide.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cost Guides",
        item: "https://www.renovationcostguide.co.uk/#guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${project.name} Cost`,
        item: `https://www.renovationcostguide.co.uk/cost/${projectSlug}`,
      },
      ...(city
        ? [
            {
              "@type": "ListItem",
              position: 4,
              name: `${project.name} Cost in ${city.name}`,
              item: canonical,
            },
          ]
        : []),
    ],
  };

  const combinedJsonLd = [faqJsonLd, breadcrumbJsonLd];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={metaDescription}
        canonical={canonical}
        jsonLd={combinedJsonLd}
      />

      <Navbar />

      <section className="section" style={{ paddingBottom: "0" }}>
        <div className="container">
          <p className="breadcrumb">
            <Link to="/">Home</Link>
            <span> / </span>
            <a href="/#guides">Cost Guides</a>
            <span> / </span>
            <Link to={`/cost/${projectSlug}`}>{project.name} Cost</Link>
            {city && (
              <>
                <span> / </span>
                <span>{city.name}</span>
              </>
            )}
          </p>
        </div>
      </section>

      {isPillarPage && project.heroImage && (
        <section
          className="section"
          style={{ paddingTop: "16px", paddingBottom: "0" }}
        >
          <div className="container">
            <div className="page-image-wrap">
              <img
                src={project.heroImage}
                alt={project.heroImageAlt || `${project.name} example`}
                className="page-hero-image"
              />
            </div>
          </div>
        </section>
      )}

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Renovation cost guide</p>
            <h1>
              {project.name} Cost{locationText}
            </h1>
            <p className="hero-text">
              {city && project.cityIntro
                ? project.cityIntro(city.name)
                : `${project.intro} This guide gives a practical planning range for homeowners researching likely project budgets${locationText.toLowerCase()}.`}
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#quote-form">
                Get Quotes
              </a>
              <Link className="btn btn-secondary" to="/">
                Back to home
              </Link>
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
            <h2>
              What does a {project.name.toLowerCase()} usually cost
              {locationText.toLowerCase()}?
            </h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Lower range</h3>
              <p>{formatGBP(low)}</p>
            </div>
            <div className="benefit-card">
              <h3>Typical mid-range</h3>
              <p>{formatGBP(mid)}</p>
            </div>
            <div className="benefit-card">
              <h3>Upper range</h3>
              <p>{formatGBP(high)}</p>
            </div>
          </div>
        </div>
      </section>

      {project.includedItems?.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">What is usually included</p>
              <h2>
                What is normally included in a {project.name.toLowerCase()}
                {city ? ` in ${city.name}` : ""}?
              </h2>
            </div>

            <div className="benefit-card">
              <ul className="content-list">
                {project.includedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {project.budgetTiers?.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Budget examples</p>
              <h2>Typical {project.name.toLowerCase()} budget levels</h2>
            </div>

            <div className="benefits-grid">
              {project.budgetTiers.map((tier) => (
                <div className="benefit-card" key={tier.title}>
                  <h3>{tier.title}</h3>
                  <p>
                    <strong>{tier.range}</strong>
                  </p>
                  <p>{tier.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {city && cityInfo && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">
                What makes {cityInfo.name} different?
              </p>
              <h2>{project.name} costs in {cityInfo.name}</h2>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>Typical contractor day rates</h3>
                <p>{cityInfo.contractorDayRate}</p>
              </div>

              <div className="benefit-card">
                <h3>Typical skip / waste cost</h3>
                <p>{cityInfo.skipCost}</p>
              </div>

              <div className="benefit-card">
                <h3>Labour cost position</h3>
                <p>
                  Costs in {cityInfo.name} are typically adjusted by a labour
                  multiplier of <strong>{cityInfo.labourMultiplier}</strong>{" "}
                  compared with a standard UK baseline.
                </p>
              </div>
            </div>

            <div
              className="section-heading left"
              style={{ marginTop: "36px", marginBottom: "20px" }}
            >
              <p className="section-kicker">Local pricing signals</p>
              <h2>Why renovation costs vary in {cityInfo.name}</h2>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>Access and logistics</h3>
                <p>{cityInfo.accessNotes}</p>
              </div>

              <div className="benefit-card">
                <h3>Demand for contractors</h3>
                <p>{cityInfo.demandNotes}</p>
              </div>

              <div className="benefit-card">
                <h3>Planning context</h3>
                <p>{cityInfo.planningNotes}</p>
              </div>
            </div>

            {cityInfo.housingStock?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginTop: "36px", marginBottom: "20px" }}
                >
                  <p className="section-kicker">Housing stock context</p>
                  <h2>Common property types in {cityInfo.name}</h2>
                </div>

                <div className="benefit-card">
                  <ul className="content-list">
                    {cityInfo.housingStock.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {cityInfo.commonConstraints?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginTop: "36px", marginBottom: "20px" }}
                >
                  <p className="section-kicker">
                    Typical renovation constraints
                  </p>
                  <h2>Hidden costs and common issues in {cityInfo.name}</h2>
                </div>

                <div className="benefit-card">
                  <ul className="content-list">
                    {cityInfo.commonConstraints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {cityInfo.scenarios?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginTop: "36px", marginBottom: "20px" }}
                >
                  <p className="section-kicker">Local example scenarios</p>
                  <h2>
                    Example {project.name.toLowerCase()} budgets in{" "}
                    {cityInfo.name}
                  </h2>
                </div>

                <div className="benefits-grid">
                  {cityInfo.scenarios.map((scenario) => (
                    <div className="benefit-card" key={scenario.title}>
                      <h3>{scenario.title}</h3>
                      <p>
                        <strong>{scenario.propertyType}</strong>
                      </p>
                      <p>
                        <strong>{scenario.estimate}</strong>
                      </p>
                      <p>{scenario.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {isPillarPage && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Expert guide</p>
              <h2>{project.name} cost guide in the UK</h2>
            </div>

            {project.costPerM2 && (
              <div className="benefit-card" style={{ marginBottom: "24px" }}>
                <h3>Average cost per m²</h3>
                <p>{project.costPerM2}</p>
              </div>
            )}

            {project.projectTypes?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginBottom: "20px" }}
                >
                  <p className="section-kicker">Common project types</p>
                  <h2>Different ways this project can be delivered</h2>
                </div>

                <div className="benefits-grid">
                  {project.projectTypes.map((item) => (
                    <div className="benefit-card" key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.costFactors?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginTop: "36px", marginBottom: "20px" }}
                >
                  <p className="section-kicker">Main cost drivers</p>
                  <h2>What usually affects the final price most</h2>
                </div>

                <div className="benefit-card">
                  <ul className="content-list">
                    {project.costFactors.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {project.priceRisks?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginTop: "36px", marginBottom: "20px" }}
                >
                  <p className="section-kicker">What can push the cost up</p>
                  <h2>Common budget risks</h2>
                </div>

                <div className="benefit-card">
                  <ul className="content-list">
                    {project.priceRisks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {project.planningNotes?.length > 0 && (
              <>
                <div
                  className="section-heading left"
                  style={{ marginTop: "36px", marginBottom: "20px" }}
                >
                  <p className="section-kicker">Planning and regulations</p>
                  <h2>Important things to check early</h2>
                </div>

                <div className="benefit-card">
                  <ul className="content-list">
                    {project.planningNotes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {project.driverCards?.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">What affects cost</p>
              <h2>Main {project.name.toLowerCase()} price drivers</h2>
            </div>

            <div className="benefits-grid">
              {project.driverCards.map((card) => (
                <div className="benefit-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>
                    {city && card.cityText
                      ? card.cityText(city.name)
                      : card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isPillarPage && project.galleryImages?.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Project examples</p>
              <h2>{project.name} inspiration and typical work examples</h2>
            </div>

            <div className="image-grid">
              {project.galleryImages.map((image) => (
                <div className="image-card" key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="content-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isPillarPage && (
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Popular cities</p>
              <h2>{project.name} cost in major UK cities</h2>
            </div>

            <div className="benefits-grid">
              {featuredCitySlugs
                .filter((slug) => CITIES[slug])
                .map((slug) => {
                  const item = CITIES[slug];
                  return (
                    <div className="benefit-card" key={slug}>
                      <h3>{project.name} Cost in {item.name}</h3>
                      <p>
                        Compare typical {project.name.toLowerCase()} pricing in{" "}
                        {item.name}, with location-adjusted cost ranges.
                      </p>
                      <Link
                        className="btn btn-secondary"
                        to={`/cost/${projectSlug}/${slug}`}
                      >
                        View {item.name} guide
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Frequently asked questions</p>
            <h2>{project.name} FAQs</h2>
          </div>

          <div className="card-grid single-column-grid">
            {project.faqs.map((faq) => (
              <div className="benefit-card" key={faq.q}>
                <h3>
                  {city ? faq.q.replace("in the UK", `in ${city.name}`) : faq.q}
                </h3>
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

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Related guides</p>
            <h2>Explore more renovation cost pages</h2>
          </div>

          <div className="benefits-grid">
            {relatedProjects.map(([slug, item]) => (
              <div className="benefit-card" key={slug}>
                <h3>
                  {item.name} Cost{city ? ` in ${city.name}` : ""}
                </h3>
                <p>
                  View our guide to typical {item.name.toLowerCase()} pricing
                  {city ? ` in ${city.name}` : " in the UK"}.
                </p>
                <Link
                  className="btn btn-secondary"
                  to={`/cost/${slug}${city ? `/${citySlug}` : ""}`}
                >
                  View guide
                </Link>
              </div>
            ))}
          </div>

          {city && (
            <>
              <div className="section-heading" style={{ marginTop: "36px" }}>
                <p className="section-kicker">Other locations</p>
                <h2>{project.name} cost in other cities</h2>
              </div>

              <div className="benefits-grid">
                {relatedCities.map(([slug, item]) => (
                  <div className="benefit-card" key={slug}>
                    <h3>{project.name} Cost in {item.name}</h3>
                    <p>
                      Compare typical {project.name.toLowerCase()} pricing in{" "}
                      {item.name}.
                    </p>
                    <Link
                      className="btn btn-secondary"
                      to={`/cost/${projectSlug}/${slug}`}
                    >
                      View guide
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
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

      <section id="quote-form" className="section section-alt">
        <div className="container form-wrap">
          <div className="section-heading left">
            <p className="section-kicker">Compare renovation quotes</p>
            <h2>Get quotes from trusted local contractors</h2>

            <p className="form-intro">
              Planning a {project.name.toLowerCase()}
              {city ? ` in ${city.name}` : ""}? Tell us a little about your
              project and we’ll help you compare quotes from experienced
              contractors in your area.
            </p>
          </div>

          <div className="quote-form">
            <p style={{ marginTop: 0 }}>
              Our service is completely free for homeowners and helps you
              compare multiple quotes before choosing the right contractor.
            </p>

            <ul className="quote-benefits">
              <li>✓ Free service for homeowners</li>
              <li>✓ Compare multiple quotes</li>
              <li>✓ Local renovation specialists</li>
            </ul>

            <a href="/#quotes" className="btn btn-primary submit-btn">
              Get renovation quotes
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
