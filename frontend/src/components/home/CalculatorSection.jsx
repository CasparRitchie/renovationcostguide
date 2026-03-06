import { formatGBP } from "../../utils/formatters";

export default function CalculatorSection({
  projectType,
  setProjectType,
  size,
  setSize,
  finish,
  setFinish,
  estimate,
}) {
  return (
    <section id="calculator" className="section section-alt">
      <div className="container calc-grid">
        <div className="panel">
          <p className="section-kicker">Free tool</p>
          <h2>Renovation Cost Calculator</h2>
          <p className="panel-intro">
            This is a quick guide for early budgeting. Final pricing depends on
            structural complexity, specification, access, location and labour.
          </p>

          <label>
            Project type
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              <option value="loft">Loft conversion</option>
              <option value="extension">House extension</option>
              <option value="garden">Garden room</option>
              <option value="kitchen">Kitchen renovation</option>
            </select>
          </label>

          <label>
            Size
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          <label>
            Finish
            <select value={finish} onChange={(e) => setFinish(e.target.value)}>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </label>
        </div>

        <div className="panel estimate-panel">
          <p className="mini-label">Estimated range</p>
          <div className="estimate-value">
            {formatGBP(estimate.low)} – {formatGBP(estimate.high)}
          </div>
          <p className="estimate-note">
            A practical budgeting range for an early-stage project discussion.
          </p>

          <div className="estimate-breakdown">
            <div>
              <span>Project</span>
              <strong>
                {projectType === "loft" && "Loft conversion"}
                {projectType === "extension" && "House extension"}
                {projectType === "garden" && "Garden room"}
                {projectType === "kitchen" && "Kitchen renovation"}
              </strong>
            </div>
            <div>
              <span>Size</span>
              <strong>{size}</strong>
            </div>
            <div>
              <span>Finish</span>
              <strong>{finish}</strong>
            </div>
          </div>

          <a className="btn btn-primary full-width-btn" href="#quotes">
            Continue to quote request
          </a>
        </div>
      </div>
    </section>
  );
}
