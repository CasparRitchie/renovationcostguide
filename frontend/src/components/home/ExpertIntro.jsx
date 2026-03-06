export default function ExpertIntro() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-heading">
          <p className="section-kicker">How to use this guide</p>
          <h2>What renovation costs usually depend on</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Size is only one part of the cost</h3>
            <p>
              Floor area matters, but complexity often matters just as much.
              Structural steel, tricky access, plumbing moves, glazing, roof work
              and bespoke joinery can all change a budget significantly.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Specification changes the range quickly</h3>
            <p>
              A straightforward renovation using standard materials is very different
              from a premium finish with custom cabinetry, stone worktops, large-format
              glazing or higher-end fixtures and fittings.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Location and property type matter</h3>
            <p>
              Labour rates, site access, age of property and regional demand can all
              affect costs. Older homes and more complex layouts often bring extra
              unknowns that only become clear when work is properly scoped.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
