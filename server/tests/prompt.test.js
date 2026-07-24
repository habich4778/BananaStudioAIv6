const generatePrompt = require("../prompts/generatePrompt");

console.log("🧪 Prompt Test");

try {
  const prompt = generatePrompt({
    characterMode: "keep",
    sceneMode: "keep",
  });

  if (typeof prompt !== "string") {
    throw new Error(
      "Prompt phải là string."
    );
  }

  if (prompt.length < 100) {
    throw new Error(
      "Prompt quá ngắn."
    );
  }

  const required = [
    "CHARACTER",
    "SCENE",
    "PRODUCT LOCK",
    "IMAGE QUALITY RULES",
  ];

  required.forEach((keyword) => {
    if (!prompt.includes(keyword)) {
      throw new Error(
        `Thiếu section: ${keyword}`
      );
    }
  });

  console.log("✅ Prompt generated");

  console.log(
    `📏 Length : ${prompt.length} ký tự`
  );

  console.log("✅ Prompt Test Passed");
} catch (err) {
  console.log("❌ Prompt Test Failed");

  throw err;
}