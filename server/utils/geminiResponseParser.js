function extractJson(text = "") {
  if (!text) return null;

  // ```json ... ```
  const markdown =
    text.match(/```json\s*([\s\S]*?)```/i) ||
    text.match(/```\s*([\s\S]*?)```/i);

  if (markdown) {
    return markdown[1].trim();
  }

  // tìm object JSON đầu tiên
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start !== -1 && end !== -1 && end > start) {
    return text.substring(start, end + 1);
  }

  return null;
}

function parseGeminiResponse(response) {
  const result = {
    promptImage: "",
    promptVideo: "",
    images: [],
    metadata: response || {},
    rawText: "",
  };

  if (!response) {
    return result;
  }

  let text = "";

  try {
    // Gemini SDK mới
    if (typeof response.text === "function") {
      text = response.text() || "";
    }

    // Gemini SDK cũ
    if (!text && typeof response.text === "string") {
      text = response.text;
    }

    // candidates
    if (
      !text &&
      response.candidates?.length
    ) {
      const parts =
        response.candidates[0].content?.parts || [];

      text = parts
        .filter((p) => typeof p.text === "string")
        .map((p) => p.text)
        .join("\n");
    }

    // content.parts
    if (
      !text &&
      response.content?.parts
    ) {
      text = response.content.parts
        .filter((p) => typeof p.text === "string")
        .map((p) => p.text)
        .join("\n");
    }
  } catch (err) {
    console.log(err);
  }

  result.rawText = text;

  // ==========================
  // Parse JSON
  // ==========================

  const jsonText = extractJson(text);

  if (jsonText) {
    try {
      const json = JSON.parse(jsonText);

      result.promptImage =
        json.promptImage ||
        json.imagePrompt ||
        json.image_prompt ||
        "";

      result.promptVideo =
        json.promptVideo ||
        json.videoPrompt ||
        json.video_prompt ||
        "";

      if (Array.isArray(json.images)) {
        result.images = json.images;
      }
    } catch (err) {
      console.log(
        "Gemini JSON Parse Error:",
        err.message
      );
    }
  }

  // ==========================
  // Fallback
  // ==========================

  if (!result.promptImage && text) {
    result.promptImage = text.trim();
  }

  // ==========================
  // Inline Images
  // ==========================

  const parts =
    response.candidates?.[0]?.content?.parts ||
    response.content?.parts ||
    [];

  parts.forEach((part) => {
    if (part.inlineData) {
      result.images.push({
        mimeType: part.inlineData.mimeType,
        base64: part.inlineData.data,
      });
    }
  });

  // ==========================
  // Debug
  // ==========================

  console.log("\n========== GEMINI PARSER ==========");
  console.log(
    "Prompt Image:",
    result.promptImage.substring(0, 120)
  );
  console.log(
    "Prompt Video:",
    result.promptVideo.substring(0, 120)
  );
  console.log(
    "Images:",
    result.images.length
  );
  console.log("===================================\n");

  return result;
}

module.exports = parseGeminiResponse;