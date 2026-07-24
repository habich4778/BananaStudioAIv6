const config = require("./render.config");

const nanoProvider = require("./providers/nano.provider");

// Các provider sẽ được thêm dần
const providers = {
  "nano-banana": nanoProvider,

  // "google": googleProvider,
  // "flux": fluxProvider,
  // "comfyui": comfyProvider,
  // "huggingface": huggingfaceProvider,
};

async function render(options) {
  const engine =
    options.engine ||
    config.defaultEngine;

  const provider =
    providers[engine];

  if (!provider) {
    throw new Error(
      `Provider "${engine}" chưa tồn tại.`
    );
  }

  console.log("");
  console.log("🎨 Render Manager");
  console.log("-----------------------------");
  console.log("Engine :", engine);
  console.log("-----------------------------");

  const result =
    await provider.render(options);

  return {
    success:
      result.success ?? true,

    provider:
      result.provider || engine,

    status:
      result.status ||
      "completed",

    image:
      result.image || null,

    imageUrl:
      result.imageUrl || null,

    imagePath:
      result.imagePath || null,

    prompt:
      result.prompt || null,

    meta:
      result.meta || {},
  };
}

module.exports = {
  render,
};