const parseGeminiResponse = require("../utils/geminiResponseParser");

console.log("🧪 Parser Test");

try {
  // ==========================
  // Test 1 - Empty Response
  // ==========================

  const empty = parseGeminiResponse(null);

  if (!empty) {
    throw new Error("Parser trả về null.");
  }

  if (!Array.isArray(empty.images)) {
    throw new Error("images phải là Array.");
  }

  // ==========================
  // Test 2 - Text Response
  // ==========================

  const textResponse = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Hello Banana Studio",
            },
          ],
        },
      },
    ],
  };

  const textResult =
    parseGeminiResponse(textResponse);

  if (
    textResult.text !==
    "Hello Banana Studio"
  ) {
    throw new Error(
      "Không đọc được text."
    );
  }

  // ==========================
  // Test 3 - Image Response
  // ==========================

  const imageResponse = {
    candidates: [
      {
        content: {
          parts: [
            {
              inlineData: {
                mimeType: "image/png",
                data: "AAAA1111BBBB",
              },
            },
          ],
        },
      },
    ],
  };

  const imageResult =
    parseGeminiResponse(imageResponse);

  if (imageResult.images.length !== 1) {
    throw new Error(
      "Không đọc được ảnh."
    );
  }

  if (
    imageResult.images[0].mimeType !==
    "image/png"
  ) {
    throw new Error(
      "Sai mimeType."
    );
  }

  if (
    imageResult.images[0].base64 !==
    "AAAA1111BBBB"
  ) {
    throw new Error(
      "Sai dữ liệu Base64."
    );
  }

  // ==========================
  // Test 4 - Mixed Response
  // ==========================

  const mixedResponse = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Generated",
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: "IMAGE_DATA",
              },
            },
          ],
        },
      },
    ],
  };

  const mixedResult =
    parseGeminiResponse(mixedResponse);

  if (
    mixedResult.text !== "Generated"
  ) {
    throw new Error(
      "Mixed Response đọc sai text."
    );
  }

  if (
    mixedResult.images.length !== 1
  ) {
    throw new Error(
      "Mixed Response đọc sai image."
    );
  }

  console.log("✅ Parser Test Passed");
} catch (err) {
  console.log("❌ Parser Test Failed");

  throw err;
}