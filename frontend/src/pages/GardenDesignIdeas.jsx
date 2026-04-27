import { useMemo, useState } from "react";
import SeoHead from "../components/SeoHead.jsx";
import Navbar from "../components/Navbar.jsx";

const THEME_OPTIONS = [
  "Tropical",
  "Country garden",
  "Modern",
  "Wildlife-friendly",
  "Low maintenance",
  "12-month flowering",
  "Family garden",
  "Entertaining garden",
];

const FEATURE_OPTIONS = [
  "Pergola",
  "Dining area",
  "Fire pit",
  "Pond or water feature",
  "Pool or hot tub",
  "Outdoor kitchen",
  "Raised beds",
  "Garden lighting",
  "Privacy screening",
  "Lawn",
  "No-lawn design",
  "Storage or shed",
];

const BUDGET_OPTIONS = [
  "Under £5,000",
  "£5,000 – £15,000",
  "£15,000 – £30,000",
  "£30,000 – £60,000",
  "£60,000+",
  "Not sure yet",
];

const MAINTENANCE_OPTIONS = [
  "Very low maintenance",
  "Moderate maintenance",
  "Happy to garden regularly",
  "Not sure yet",
];

const ORIENTATION_OPTIONS = [
  "North-facing",
  "East-facing",
  "South-facing",
  "West-facing",
  "Not sure",
];

const SLOPE_OPTIONS = [
  "Flat",
  "Slight slope",
  "Moderate slope",
  "Steep slope",
  "Not sure",
];

function toggleArrayValue(values, value) {
  if (values.includes(value)) {
    return values.filter((item) => item !== value);
  }

  return [...values, value];
}

function buildGardenDesignPrompt(form, selectedSummary) {
  return `
  You are an expert UK garden designer and landscape consultant.

  Create three creative garden design concepts based on the following homeowner brief.

  Each concept must include:
  1. A concept name
  2. A short design summary
  3. A top-down layout description
  4. A front-view description
  5. An angled perspective description
  6. A planting plan with specific plant suggestions matched to the requested themes
  7. Hard landscaping notes
  8. Specialist work required, such as lighting, wiring, plumbing, drainage, groundwork, decking, paving, pergola construction, outdoor kitchen installation or water features
  9. A rough implementation cost estimate in GBP
  10. A short explanation of who this option is best suited for
  11. Three image generation prompts:
    - Top-down plan view prompt
    - Front view prompt
    - Angled perspective prompt

  Important design instructions:
  - Make the three options clearly different from each other.
  - Respect the garden dimensions and access constraints.
  - Include practical notes about build complexity and maintenance.
  - If the budget seems too low for the requested features, explain what could be phased or simplified.
  - Assume this is a UK garden unless stated otherwise.
  - Make planting choices realistic for the UK climate and matched to the requested style.
  - Include planting for year-round structure where appropriate, such as evergreen shrubs, ornamental grasses, spring bulbs, summer perennials and winter-interest plants.
  - Be explicit about materials, zones, pathways, seating areas, planting beds and any retained existing features.
  - Where photos are listed, refer to them as supporting context, but do not claim to have seen them unless image analysis has actually been performed.
  - If the requested features cannot realistically fit within the stated budget, create:
    1. one budget-conscious phased option,
    2. one realistic mid-range option,
    3. one aspirational option.
    Clearly explain what is and is not achievable within the stated budget.
  - If the homeowner mentions a plancha or barbecue, treat this as a practical outdoor cooking station unless they explicitly request a full built-in outdoor kitchen.
  - For all three views within the same option, keep the same design, materials, planting, layout and feature locations so the images feel like different views of one coherent garden.

  Image prompt instructions:
  For each design option, create three separate image generation prompts.

  Each image prompt should:
  - Be written as a standalone image generation prompt.
  - Describe the garden as a realistic residential UK garden design.
  - Include the garden dimensions, overall layout, key features, planting style, hard landscaping materials and lighting where relevant.
  - Match the design concept and homeowner preferences.
  - Specify the viewpoint clearly:
    1. Top-down plan view
    2. Front view from the house looking down the garden
    3. Angled perspective view from one corner of the garden
  - Avoid text labels, annotations, watermarks, logos or people.
  - Avoid unrealistic luxury features unless the budget supports them.
  - Mention that the image should be photorealistic or high-quality garden design visualisation.

  Homeowner brief:
  - Garden size: ${
    selectedSummary.area
      ? `${form.length}m x ${form.width}m, approximately ${selectedSummary.area}m²`
      : "Not provided"
  }
  - Orientation: ${form.orientation}
  - Slope: ${form.slope}
  - Existing patio or terrace: ${form.existingPatio ? "Yes" : "No"}
  - Existing shed or outbuilding: ${form.existingShed ? "Yes" : "No"}
  - Existing outbuildings / fixed features: ${form.outbuildings || "Not provided"}
  - Access notes: ${form.accessNotes || "Not provided"}
  - Uploaded photo filenames: ${
    form.photos.length ? form.photos.join(", ") : "No photos uploaded"
  }

  Desired garden:
  - Preferred themes: ${
    form.themes.length ? form.themes.join(", ") : "Not provided"
  }
  - Desired features: ${
    form.features.length ? form.features.join(", ") : "Not provided"
  }
  - Maintenance preference: ${form.maintenance}
  - Rough implementation budget: ${form.budget}
  - Homeowner free-text request: ${form.wouldLike || "Not provided"}

  Customer details for context only:
  - Name: ${form.name || "Not provided"}
  - Postcode: ${form.postcode || "Not provided"}

  Output format:
  Return the answer in clear markdown with the following structure:

  # Option 1: [Concept name]
  ## Design summary
  ## Top-down layout
  ## Front view
  ## Angled perspective
  ## Planting plan
  ## Hard landscaping
  ## Specialist work required
  ## Rough implementation cost
  ## Best suited for
  ## Image generation prompts
  ### Top-down plan view prompt
  ### Front view prompt
  ### Angled perspective prompt

  # Option 2: [Concept name]
  Use the same structure.

  # Option 3: [Concept name]
  Use the same structure.

  # Cost comparison
  Compare the three options in a simple table.

  # Suggested phasing
  Explain what could be done in phase 1, phase 2 and phase 3 if the homeowner wants to spread the cost.

  # Landscaper brief
  Summarise the project in a concise contractor-friendly format, including access constraints, likely trades required, key materials, planting requirements and budget realism.

  # Recommended next steps
  Explain what the homeowner should do next before speaking to a landscaper.
  `;
}

export default function GardenDesignIdeas() {
  const [form, setForm] = useState({
    length: "",
    width: "",
    orientation: "Not sure",
    slope: "Flat",
    existingPatio: false,
    existingShed: false,
    outbuildings: "",
    accessNotes: "",
    themes: [],
    features: [],
    maintenance: "Not sure yet",
    budget: "Not sure yet",
    wouldLike: "",
    name: "",
    email: "",
    phone: "",
    postcode: "",
    photos: [],
  });

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [submitStatus, setSubmitStatus] = useState("");
  const [savedBrief, setSavedBrief] = useState(null);

  const selectedSummary = useMemo(() => {
    const area =
      Number(form.length) > 0 && Number(form.width) > 0
        ? Number(form.length) * Number(form.width)
        : null;

    return {
      area,
      themes: form.themes.length ? form.themes.join(", ") : "No themes selected yet",
      features: form.features.length
        ? form.features.join(", ")
        : "No features selected yet",
    };
  }, [form]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const prompt = buildGardenDesignPrompt(form, selectedSummary);

    setGeneratedPrompt(prompt);
    setBriefSubmitted(true);
    setSubmitStatus("Saving your garden design brief...");
    setSavedBrief(null);

    console.log("Garden design brief submitted:", form);
    console.log("Garden design AI prompt:", prompt);

    try {
      const payload = new FormData();

      payload.append(
        "brief",
        JSON.stringify({
          ...form,
          generatedPrompt: prompt,
        })
      );

      photoFiles.forEach((file) => {
        payload.append("photos", file);
      });

      const response = await fetch("http://localhost:3000/api/garden-design/brief", {
  method: "POST",
  body: payload,
});

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.error?.message || "The garden design brief could not be saved."
        );
      }

      setSavedBrief(result);
      setSubmitStatus("Your garden design brief has been saved successfully.");
    } catch (error) {
      console.error("Garden design brief save failed:", error);
      setSubmitStatus(
        error.message || "Something went wrong while saving your garden brief."
      );
    }
  }

  async function copyPromptToClipboard() {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert("Prompt copied to clipboard.");
    } catch (error) {
      console.error("Could not copy prompt:", error);
      alert("Sorry, the prompt could not be copied automatically.");
    }
  }

  return (
    <>
      <SeoHead
        title="AI Garden Design Ideas | Renovation Cost Guide"
        description="Create a structured garden design brief with dimensions, photos, style preferences, features and budget notes."
        canonical="https://www.renovationcostguide.co.uk/garden-design-ideas"
      />

      <Navbar />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Garden planning tool</p>
            <h1>AI garden design ideas for your outdoor space</h1>
            <p className="hero-text">
              Share your garden dimensions, layout, style preferences and must-have
              features. We’ll use your brief to create three creative garden design
              directions with planting ideas, specialist work notes and rough
              implementation costs.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#garden-brief">
                Start your garden brief
              </a>
              <a className="btn btn-secondary" href="#how-it-works">
                How it works
              </a>
            </div>

            <div className="hero-points">
              <span>Three design options</span>
              <span>Planting ideas</span>
              <span>Layout notes</span>
              <span>Cost estimate</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-card">
              <p className="mini-label">Coming next</p>
              <h3>Garden design concepts</h3>
              <p className="mini-text">
                The first version captures a structured garden brief. The next step
                will generate top-down, front and angled design views for each option.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">How it works</p>
            <h2>From garden brief to design direction</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>1. Describe your garden</h3>
              <p>
                Add dimensions, orientation, slope, existing patios, sheds, access
                notes and anything unusual about the current layout.
              </p>
            </div>

            <div className="benefit-card">
              <h3>2. Choose your style</h3>
              <p>
                Select themes such as tropical, country garden, wildlife-friendly,
                low maintenance or 12-month flowering.
              </p>
            </div>

            <div className="benefit-card">
              <h3>3. Generate design ideas</h3>
              <p>
                The full version will create three design options with layout views,
                planting suggestions, specialist works and rough cost estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="garden-brief" className="section section-alt">
        <div className="container form-wrap">
          <div className="section-heading left">
            <p className="section-kicker">Garden design brief</p>
            <h2>Tell us about your garden</h2>
            <p className="form-intro">
              The more detail you provide, the better the design ideas can be. For
              now, this form creates a structured brief we can later pass into the AI
              design generator.
            </p>
          </div>

          <form
            className="quote-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="section-heading left" style={{ marginBottom: "18px" }}>
              <p className="section-kicker">Existing garden</p>
              <h2 style={{ fontSize: "1.5rem" }}>Size, orientation and layout</h2>
            </div>

            <div className="form-row two-col">
              <label>
                Approximate length in metres
                <input
                  type="number"
                  min="0"
                  value={form.length}
                  onChange={(e) => updateField("length", e.target.value)}
                  placeholder="e.g. 12"
                />
              </label>

              <label>
                Approximate width in metres
                <input
                  type="number"
                  min="0"
                  value={form.width}
                  onChange={(e) => updateField("width", e.target.value)}
                  placeholder="e.g. 7"
                />
              </label>
            </div>

            <div className="form-row two-col">
              <label>
                Garden orientation
                <select
                  value={form.orientation}
                  onChange={(e) => updateField("orientation", e.target.value)}
                >
                  {ORIENTATION_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                Slope
                <select
                  value={form.slope}
                  onChange={(e) => updateField("slope", e.target.value)}
                >
                  {SLOPE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-row two-col">
              <label>
                <input
                  type="checkbox"
                  checked={form.existingPatio}
                  onChange={(e) => updateField("existingPatio", e.target.checked)}
                />
                Existing patio or terrace
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.existingShed}
                  onChange={(e) => updateField("existingShed", e.target.checked)}
                />
                Existing shed or outbuilding
              </label>
            </div>

            <label>
              Existing outbuildings, terraces or fixed features
              <textarea
                rows="3"
                value={form.outbuildings}
                onChange={(e) => updateField("outbuildings", e.target.value)}
                placeholder="For example: shed at the back left, raised patio near the house, greenhouse, existing pond..."
              />
            </label>

            <label>
              Access notes
              <textarea
                rows="3"
                value={form.accessNotes}
                onChange={(e) => updateField("accessNotes", e.target.value)}
                placeholder="For example: side access, narrow alley, steps, limited machinery access..."
              />
            </label>

            <label>
              Upload garden photos
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setPhotoFiles(files);
                  updateField(
                    "photos",
                    files.map((file) => file.name)
                  );
                }}
              />
            </label>

            {form.photos.length > 0 && (
              <div className="benefit-card" style={{ marginBottom: "18px" }}>
                <h3>Selected photos</h3>
                <ul className="content-list">
                  {form.photos.map((photo) => (
                    <li key={photo}>{photo}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="section-heading left" style={{ marginTop: "32px", marginBottom: "18px" }}>
              <p className="section-kicker">Desired garden</p>
              <h2 style={{ fontSize: "1.5rem" }}>Style, features and maintenance</h2>
            </div>

            <div className="benefit-card" style={{ marginBottom: "18px" }}>
              <h3>Preferred themes</h3>
              <div className="option-grid">
                {THEME_OPTIONS.map((theme) => (
                  <label className="option-pill" key={theme}>
                    <input
                      type="checkbox"
                      checked={form.themes.includes(theme)}
                      onChange={() =>
                        updateField("themes", toggleArrayValue(form.themes, theme))
                      }
                    />
                    {theme}
                  </label>
                ))}
              </div>
            </div>

            <div className="benefit-card" style={{ marginBottom: "18px" }}>
              <h3>Features you would like</h3>
              <div className="option-grid">
                {FEATURE_OPTIONS.map((feature) => (
                  <label className="option-pill" key={feature}>
                    <input
                      type="checkbox"
                      checked={form.features.includes(feature)}
                      onChange={() =>
                        updateField("features", toggleArrayValue(form.features, feature))
                      }
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row two-col">
              <label>
                Maintenance preference
                <select
                  value={form.maintenance}
                  onChange={(e) => updateField("maintenance", e.target.value)}
                >
                  {MAINTENANCE_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                Rough implementation budget
                <select
                  value={form.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                >
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              I would like...
              <textarea
                rows="5"
                value={form.wouldLike}
                onChange={(e) => updateField("wouldLike", e.target.value)}
                placeholder="Describe the garden you have in mind, how you want to use it, what you dislike about the current garden, or anything important to include."
              />
            </label>

            <div className="project-summary-card">
              <div className="section-heading left" style={{ marginBottom: "16px" }}>
                <p className="section-kicker">Your garden brief summary</p>
                <h2 style={{ fontSize: "1.5rem" }}>What will be sent for design generation</h2>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <h3>Approximate size</h3>
                  <p>
                    {selectedSummary.area
                      ? `${form.length}m × ${form.width}m (${selectedSummary.area}m²)`
                      : "Add length and width to calculate area"}
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Orientation and slope</h3>
                  <p>
                    {form.orientation}, {form.slope.toLowerCase()}
                  </p>
                </div>

                <div className="benefit-card">
                  <h3>Preferred themes</h3>
                  <p>{selectedSummary.themes}</p>
                </div>

                <div className="benefit-card">
                  <h3>Desired features</h3>
                  <p>{selectedSummary.features}</p>
                </div>

                <div className="benefit-card">
                  <h3>Maintenance</h3>
                  <p>{form.maintenance}</p>
                </div>

                <div className="benefit-card">
                  <h3>Budget</h3>
                  <p>{form.budget}</p>
                </div>

                <div className="benefit-card">
                  <h3>Photos</h3>
                  <p>
                    {form.photos.length
                      ? `${form.photos.length} photo${form.photos.length > 1 ? "s" : ""} selected`
                      : "No photos selected yet"}
                  </p>
                </div>
              </div>
            </div>

            <div className="section-heading left" style={{ marginTop: "32px", marginBottom: "18px" }}>
              <p className="section-kicker">Contact details</p>
              <h2 style={{ fontSize: "1.5rem" }}>Where should we send the ideas?</h2>
            </div>

            <div className="form-row two-col">
              <label>
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-row two-col">
              <label>
                Phone
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </label>

              <label>
                Postcode
                <input
                  type="text"
                  value={form.postcode}
                  onChange={(e) => updateField("postcode", e.target.value)}
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Create my garden design brief
            </button>

            {briefSubmitted && (
              <div className="garden-brief-ready-card">
                <div className="section-heading left" style={{ marginBottom: "16px" }}>
                  <p className="section-kicker">Garden brief ready</p>
                  <h2 style={{ fontSize: "1.5rem" }}>
                    Your garden design brief has been created
                  </h2>
                  <p className="form-intro">
                    This summary can be used to generate three garden design directions,
                    including layout ideas, planting suggestions, specialist work notes
                    and rough implementation costs.
                  </p>
                  {submitStatus && <p className="status">{submitStatus}</p>}
                  {savedBrief?.briefId && (
                    <p className="form-intro">
                      Reference: <strong>{savedBrief.briefId}</strong>
                    </p>
                  )}
                </div>

                <div className="benefits-grid">
                  <div className="benefit-card">
                    <h3>Garden size</h3>
                    <p>
                      {selectedSummary.area
                        ? `${form.length}m × ${form.width}m (${selectedSummary.area}m²)`
                        : "Not provided"}
                    </p>
                  </div>

                  <div className="benefit-card">
                    <h3>Style</h3>
                    <p>{selectedSummary.themes}</p>
                  </div>

                  <div className="benefit-card">
                    <h3>Features</h3>
                    <p>{selectedSummary.features}</p>
                  </div>

                  <div className="benefit-card">
                    <h3>Budget</h3>
                    <p>{form.budget}</p>
                  </div>

                  <div className="benefit-card">
                    <h3>Access</h3>
                    <p>{form.accessNotes || "Not provided"}</p>
                  </div>

                  <div className="benefit-card">
                    <h3>Photos</h3>
                    <p>
                      {form.photos.length
                        ? `${form.photos.length} photo${form.photos.length > 1 ? "s" : ""} selected`
                        : "No photos selected yet"}
                    </p>
                  </div>
                </div>

                <div className="benefit-card" style={{ marginTop: "18px" }}>
                  <h3>What happens next?</h3>
                  <p>
                    The next version will use this brief to generate three design
                    concepts. Each concept will include layout notes, planting ideas,
                    specialist work requirements, rough cost estimates and image prompts
                    for top-down, front and angled views.
                  </p>
                </div>

                <details className="generated-prompt-card">
                  <summary>View generated AI prompt</summary>

                  <div className="section-heading left" style={{ marginTop: "18px", marginBottom: "16px" }}>
                    <p className="section-kicker">Generated AI prompt</p>
                    <h2 style={{ fontSize: "1.5rem" }}>
                      Technical prompt preview
                    </h2>
                    <p className="form-intro">
                      This is mainly useful while testing the product. Later this will
                      be sent to the AI design generator automatically.
                    </p>
                  </div>

                  <textarea
                    className="prompt-preview"
                    value={generatedPrompt}
                    readOnly
                    rows="18"
                  />

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={copyPromptToClipboard}
                    style={{ marginTop: "16px" }}
                  >
                    Copy prompt
                  </button>
                </details>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
