import { useMemo, useState } from "react";
import { calculateEstimate } from "./utils/estimate";

import HomeHero from "./components/home/HomeHero";
import ProjectCategories from "./components/home/ProjectCategories";
import CalculatorSection from "./components/home/CalculatorSection";
import CostBreakdown from "./components/home/CostBreakdown";
import ExpertIntro from "./components/home/ExpertIntro";
import PopularGuides from "./components/home/PopularGuides";
import WhyUseUs from "./components/home/WhyUseUs";
import QuoteSection from "./components/home/QuoteSection";

export default function App() {
  const [projectType, setProjectType] = useState("loft");
  const [size, setSize] = useState("medium");
  const [finish, setFinish] = useState("standard");

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    description: "",
  });

  const [status, setStatus] = useState("");

  const estimate = useMemo(
    () => calculateEstimate(projectType, size, finish),
    [projectType, size, finish]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...lead,
          projectType,
          size,
          finish,
          estimateLow: estimate.low,
          estimateHigh: estimate.high,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setStatus("Thanks — your request has been received.");
      setLead({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  }

  function chooseProject(projectKey) {
    setProjectType(projectKey);
    const el = document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <span className="brand-mark">RCG</span>
            <div>
              <div className="brand-name">Renovation Cost Guide</div>
              <div className="brand-sub">UK renovation planning estimates</div>
            </div>
          </div>

          <nav className="topnav">
            <a href="#categories">Project Types</a>
            <a href="#calculator">Calculator</a>
            <a href="#guides">Guides</a>
            <a href="#quotes">Get Quotes</a>
          </nav>
        </div>
      </header>

      <HomeHero estimate={estimate} />

      <ProjectCategories onChooseProject={chooseProject} />

      <CalculatorSection
        projectType={projectType}
        setProjectType={setProjectType}
        size={size}
        setSize={setSize}
        finish={finish}
        setFinish={setFinish}
        estimate={estimate}
      />

      <CostBreakdown />

      <ExpertIntro />

      <PopularGuides />

      <WhyUseUs />

      <QuoteSection
        lead={lead}
        setLead={setLead}
        status={status}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
