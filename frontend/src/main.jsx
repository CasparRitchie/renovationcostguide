import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import CostPage from "./pages/CostPage.jsx";
import "./index.css";
import RenovationCostGuide from "./pages/RenovationCostGuide";
import AuthorityPage from "./pages/AuthorityPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cost/:projectSlug" element={<CostPage />} />
        <Route path="/cost/:projectSlug/:citySlug" element={<CostPage />} />
        <Route path="/how-much-does-it-cost-to-renovate-a-house-uk" element={<RenovationCostGuide />} />
        <Route path="/:slug" element={<AuthorityPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
