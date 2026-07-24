console.log("🧪 Generate Test");

try {
  const generatePrompt = require("../prompts/generatePrompt");
  const geminiService = require("../services/gemini.service");
  const parseGeminiResponse = require("../utils/geminiResponseParser");

  // ==========================
  // Prompt
  // ==========================

  const prompt = generatePrompt({
    characterMode: "keep",
    sceneMode: "keep",
  });

  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt không hợp lệ.");
  }

  // ==========================
  // Gemini Service
  // ==========================

  if (
    typeof geminiService.generateImage !==
    "function"
  ) {
    throw new Error(
      "Thiếu generateImage()."
    );
  }

  // ==========================
  // Parser
  // ==========================

  if (
    typeof parseGeminiResponse !==
    "function"
  ) {
    throw new Error(
      "Parser không hợp lệ."
    );
  }

  // ==========================
  // Mock Gemini Response
  // ==========================

  const mockResponse = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Banana Studio Test",
            },
          ],
        },
      },
    ],
  };

  const parsed =
    parseGeminiResponse(mockResponse);

  if (
    parsed.text !== "Banana Studio Test"
  ) {
    throw new Error(
      "Parser hoạt động không đúng."
    );
  }

  console.log("✅ Prompt Ready");

  console.log("✅ Gemini Ready");

  console.log("✅ Parser Ready");

  console.log("✅ Generate Pipeline OK");

  console.log("✅ Generate Test Passed");
} catch (err) {
  console.log("❌ Generate Test Failed");

  throw err;
}