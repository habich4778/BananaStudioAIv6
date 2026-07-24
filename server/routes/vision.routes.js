const express = require("express");
const multer = require("multer");

const {
  generate,
  status,
} = require("../controllers/vision.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/generate",
  upload.fields([
    {
      name: "model",
      maxCount: 1,
    },
    {
      name: "products",
      maxCount: 100,
    },
  ]),
  generate
);

/**
 * Factory Status
 */
router.get(
  "/status",
  status
);

module.exports = router;