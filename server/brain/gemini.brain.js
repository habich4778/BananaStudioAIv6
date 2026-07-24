const {
  generateImage,
} = require("../services/gemini.service");

const generatePrompt = require("../prompts/generatePrompt");

const parseGeminiResponse = require(
  "../utils/geminiResponseParser"
);

const GEMINI_MODEL = "gemini-3-flash-preview";

async function analyze({
  characterMode,
  sceneMode,
  modelFile,
  productFiles,
}) {
  const prompt = generatePrompt({
    characterMode,
    sceneMode,
  });

  const parts = [];

  // Model
  parts.push({
    inlineData: {
      mimeType: modelFile.mimetype,
      data: modelFile.buffer.toString("base64"),
    },
  });

  // Products
  productFiles.forEach((file) => {
    parts.push({
      inlineData: {
        mimeType: file.mimetype,
        data: file.buffer.toString("base64"),
      },
    });
  });

  const response = await generateImage({
    model: GEMINI_MODEL,
    prompt,
    parts,
  });

  const parsed =
    parseGeminiResponse(response);

  return {
    promptImage:
      parsed.promptImage || "",

    promptVideo:
      parsed.promptVideo || "",

    images:
      parsed.images || [],
  };
}

module.exports = {
  analyze,
};