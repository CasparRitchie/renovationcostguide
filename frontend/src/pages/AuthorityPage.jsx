import { Link, useParams } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import { AUTHORITY_PAGES } from "../data/authorityPages.js";

export default function AuthorityPage() {
  const { slug } = useParams();
  const page = AUTHORITY_PAGES[slug];

  if (!page) {
    return (
      <div className="section">
        <div className="container">
          <h1>Page not found</h1>
          <p>We couldn’t find that guide.</p>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };

  return (
    <>
      <SeoHead
        title={page.seoTitle}
        description={page.description}
        canonical={page.canonical}
        jsonLd={faqJsonLd}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">{page.heroKicker}</p>
            <h1>{page.h1}</h1>
            <p className="hero-text">{page.intro}</p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="/#calculator">
                Use cost calculator
              </a>
              <a className="btn btn-secondary" href="/#quotes">
                Get quotes
              </a>
            </div>
          </div>
        </div>
      </section>

      {page.sections.map((section) => (
        <section className="section" key={section.title}>
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">{section.kicker}</p>
              <h2>{section.title}</h2>
            </div>

            <div className="benefits-grid">
              {section.cards.map((card) => (
                <div className="benefit-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Related guides</p>
            <h2>Explore more cost guides</h2>
          </div>

          <div className="benefits-grid">
            {page.links.map((link) => (
              <div className="benefit-card" key={link.to}>
                <h3>{link.title}</h3>
                <Link className="btn btn-secondary" to={link.to}>
                  View guide
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Frequently asked questions</p>
            <h2>{page.title} FAQs</h2>
          </div>

          <div className="card-grid single-column-grid">
            {page.faqs.map((faq) => (
              <div className="benefit-card" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
