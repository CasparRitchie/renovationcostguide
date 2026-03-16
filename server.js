const express = require("express");
const path = require("path");

const leadRoutes = require("./routes/lead.routes");
const quoteCheckRoutes = require("./routes/quoteCheck.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/lead", leadRoutes);
app.use("/api/quote-check", quoteCheckRoutes);

const distPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
