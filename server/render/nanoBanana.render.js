const nanoProvider = require("./providers/nano.provider");

const storageService = require("../services/storage.service");

async function render({
  prompt,
  modelImage,
  productImage,
}) {
  console.log("");

  console.log("🍌 Nano Banana Render");
  console.log("--------------------------------");

  console.log(prompt);

  console.log("--------------------------------");

  const buffer =
    await nanoProvider.render({
      prompt,
      modelImage,
      productImage,
    });

  const saved =
    storageService.saveImage({
      buffer,
    });

  return {
    success: true,

    provider: "nano-banana-pro",

    status: "completed",

    prompt,

    image: saved.publicPath,

    imageUrl: saved.publicPath,

    imagePath: saved.filePath,
  };
}

module.exports = {
  render,
};