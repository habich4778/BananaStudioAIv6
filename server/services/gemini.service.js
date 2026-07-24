const ai = require("./google.service");

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function generate(payload) {
  let lastError;

  for (let i = 1; i <= 3; i++) {
    try {
      console.log(`🤖 Gemini Request (${i}/3)`);

      const response =
        await ai.models.generateContent(payload);

      console.log("✅ Gemini Success");

      return response;
    } catch (err) {
      lastError = err;

      console.log("");
      console.log("❌ GEMINI ERROR");
      console.log("--------------------------------");

      console.log("Status :", err.status);
      console.log("Code   :", err.code);
      console.log("Message:", err.message);

      if (err.error) {
        console.log("");
        console.log("Error Object:");
        console.log(
          JSON.stringify(err.error, null, 2)
        );
      }

      if (err.response) {
        console.log("");
        console.log("Response:");
        console.log(
          JSON.stringify(err.response, null, 2)
        );
      }

      console.log("");
      console.log("Raw Error:");
      console.log(err);

      console.log("--------------------------------");

      if (
        (err.status === 503 ||
          err.code === 503) &&
        i < 3
      ) {
        console.log("⏳ Retry sau 2 giây...");
        await sleep(2000);
        continue;
      }

      throw err;
    }
  }

  throw lastError;
}

/**
 * Text Only
 */

async function generateText({
  model,
  prompt,
}) {
  return generate({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  });
}

/**
 * Image Understanding
 * (Model + Product -> Prompt)
 */

async function generateImage({
  model,
  prompt,
  parts = [],
}) {
  return generate({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
          ...parts,
        ],
      },
    ],
  });
}

/**
 * Nano Banana
 */

async function generateNanoBanana({
  model,
  prompt,
  parts = [],
}) {
  return generate({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
          ...parts,
        ],
      },
    ],
    generationConfig: {
      responseModalities: [
        "TEXT",
        "IMAGE",
      ],
    },
  });
}

module.exports = {
  generate,
  generateText,
  generateImage,
  generateNanoBanana,
};