const express = require("express");
const router = express.Router();

const { appendLeadToDropbox } = require("../services/dropbox.service");
const { sendLeadEmail } = require("../services/email.service");

router.post("/", async (req, res) => {
  const data = req.body;

  console.log("New lead received:", data);

  const timestamp = new Date().toISOString();

  const csvRow = [
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.postcode,
    data.projectType,
    data.size,
    data.finish,
    data.estimateLow,
    data.estimateHigh,
    `"${(data.description || "").replace(/"/g, "'")}"`,
    "new",
  ].join(",");

  try {
    await sendLeadEmail(data);
    await appendLeadToDropbox(csvRow);

    res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
});

module.exports = router;
