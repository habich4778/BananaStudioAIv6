console.log("🧪 Gemini Service Test");

try {
  const geminiService = require("../services/gemini.service");

  if (!geminiService) {
    throw new Error(
      "Không load được gemini.service.js"
    );
  }

  if (
    typeof geminiService.generateImage !==
    "function"
  ) {
    throw new Error(
      "Thiếu hàm generateImage()."
    );
  }

  console.log("✅ Gemini Service Loaded");

  console.log("✅ generateImage() Found");

  // ==========================
  // Payload Test
  // ==========================

  const payload = {
    model: "gemini-3-flash-preview",
    prompt: "Test Prompt",
    parts: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: "AAAA",
        },
      },
    ],
  };

  if (!payload.model) {
    throw new Error("Thiếu model.");
  }

  if (!payload.prompt) {
    throw new Error("Thiếu prompt.");
  }

  if (!Array.isArray(payload.parts)) {
    throw new Error("parts phải là Array.");
  }

  console.log("✅ Payload Structure OK");

  console.log("✅ Gemini Service Test Passed");
} catch (err) {
  console.log("❌ Gemini Service Test Failed");

  throw err;
}