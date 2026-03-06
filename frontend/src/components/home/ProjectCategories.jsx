import { categoryCards } from "../../data/homeData";

export default function ProjectCategories({ onChooseProject }) {
  return (
    <section id="categories" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">Project categories</p>
          <h2>Explore the most common renovation types</h2>
        </div>

        <div className="card-grid">
          {categoryCards.map((card) => (
            <button
              key={card.key}
              type="button"
              className="category-card"
              onClick={() => onChooseProject(card.key)}
            >
              <p className="card-eyebrow">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="card-link">Use calculator →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
