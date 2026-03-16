const express = require("express");
const multer = require("multer");
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;
const { analyseQuote } = require("../services/quoteCheck/analyseQuote");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("UNSUPPORTED_FILE_TYPE"));
    }

    cb(null, true);
  },
});

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "quote-check",
  });
});

router.post("/analyse", upload.single("file"), async (req, res) => {
  try {
    const {
      projectType,
      location,
      propertyType = "",
      quotedTotal = "",
      quoteCount = "",
      mainConcern = "",
      notes = "",
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: "NO_FILE_UPLOADED",
          message: "Please upload a PDF, JPG or PNG file.",
        },
      });
    }

    if (!projectType) {
      return res.status(400).json({
        success: false,
        error: {
          code: "PROJECT_TYPE_INVALID",
          message: "Please select a valid project type.",
        },
      });
    }

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text || "";
    } else {
      extractedText = "";
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(422).json({
        success: false,
        error: {
          code: "TEXT_EXTRACTION_FAILED",
          message:
            "We could not extract enough text from this file. Text-based PDFs will work best in v1.",
        },
      });
    }

    const result = analyseQuote({
      extractedText,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      projectType,
      location,
      propertyType,
      quotedTotalInput: quotedTotal,
      quoteCount,
      mainConcern,
      notes,
    });

    return res.json({
      success: true,
      ...result,
    });
    } catch (error) {
    console.error("quote-check analyse error:", error);

    const code =
      error?.message === "UNSUPPORTED_FILE_TYPE"
        ? "UNSUPPORTED_FILE_TYPE"
        : "ANALYSIS_FAILED";

    const message =
      code === "UNSUPPORTED_FILE_TYPE"
        ? "Please upload a PDF, JPG or PNG file."
        : error?.message || "Something went wrong while analysing the quote.";

    return res.status(500).json({
      success: false,
      error: {
        code,
        message,
      },
    });
  }
});

module.exports = router;
