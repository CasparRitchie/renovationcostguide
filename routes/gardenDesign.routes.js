const express = require("express");
const multer = require("multer");
const {
  saveGardenDesignBrief,
} = require("../services/gardenDesign.service");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
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
    service: "garden-design",
  });
});

router.post(
  "/brief",
  upload.array("photos", 10),
  async (req, res) => {
    try {
      if (!req.body.brief) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_BRIEF",
            message: "Garden design brief is required.",
          },
        });
      }

      const brief = JSON.parse(req.body.brief);
      const photos = req.files || [];

      const result = await saveGardenDesignBrief({
        brief,
        photos,
      });

      return res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("garden-design brief error:", error);

      const code =
        error?.message === "UNSUPPORTED_FILE_TYPE"
          ? "UNSUPPORTED_FILE_TYPE"
          : "GARDEN_BRIEF_SAVE_FAILED";

      const message =
        code === "UNSUPPORTED_FILE_TYPE"
          ? "Please upload JPG, PNG, WEBP, HEIC or HEIF images."
          : error?.message || "Something went wrong while saving the garden design brief.";

      return res.status(500).json({
        success: false,
        error: {
          code,
          message,
        },
      });
    }
  }
);

module.exports = router;
