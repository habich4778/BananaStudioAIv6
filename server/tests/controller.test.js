console.log("🧪 Controller Test");

try {
  const visionController = require("../controllers/vision.controller");

  if (!visionController) {
    throw new Error(
      "Không load được vision.controller.js"
    );
  }

  if (
    typeof visionController.generate !==
    "function"
  ) {
    throw new Error(
      "Thiếu hàm generate()."
    );
  }

  console.log("✅ Controller Loaded");

  console.log("✅ generate() Found");

  console.log("✅ Controller Test Passed");
} catch (err) {
  console.log("❌ Controller Test Failed");

  throw err;
}