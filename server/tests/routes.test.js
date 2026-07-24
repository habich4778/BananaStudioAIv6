console.log("🧪 Routes Test");

try {
  const routes = require("../routes/index.routes");

  if (!routes) {
    throw new Error("Routes not found");
  }

  console.log("✅ Routes Loaded");

  console.log("✅ Routes Test Passed");
} catch (err) {
  console.log("❌ Routes Test Failed");
  throw err;
}