const express = require("express");
const multer = require("multer");
const { analyzeOutfit } = require("../services/gemini.service");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.fields([
    { name: "person", maxCount: 1 },
    { name: "cloth", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("📥 /api/upload");

      const person = req.files?.person?.[0];
      const cloth = req.files?.cloth?.[0];

      if (!person || !cloth) {
        return res.status(400).json({
          success: false,
          message: "Thiếu ảnh.",
        });
      }

      console.log("👤 Person:", person.originalname);
      console.log("👕 Cloth :", cloth.originalname);

      const result = await analyzeOutfit(
        person.buffer,
        cloth.buffer
      );

      console.log("✅ Gemini OK");

      res.json({
        success: true,
        result,
      });

    } catch (err) {
      console.error("❌ GEMINI ERROR");
      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
  }
);

module.exports = router;