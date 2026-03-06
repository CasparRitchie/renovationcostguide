import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import CostPage from "./pages/CostPage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cost/:projectSlug" element={<CostPage />} />
        <Route path="/cost/:projectSlug/:citySlug" element={<CostPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
