const geminiBrain = require("../brain/gemini.brain");
const nanoRender = require("../render/nanoBanana.render");

async function processJob({
  job,
  modelFile,
  characterMode,
  sceneMode,
}) {
  // ==========================
  // Brain
  // ==========================

  job.brainStatus = "running";
  job.progress = 10;

  const brain = await geminiBrain.analyze({
    characterMode,
    sceneMode,
    modelFile,
    productFiles: [job.product],
  });

  job.brainStatus = "completed";
  job.progress = 40;

  job.promptImage =
    brain.promptImage || "";

  job.promptVideo =
    brain.promptVideo || "";

  // ==========================
  // Render
  // ==========================

  job.imageStatus = "running";
  job.progress = 60;

  const render =
    await nanoRender.render({
      prompt: job.promptImage,
      modelImage: modelFile,
      productImage: job.product,
    });

  job.imageStatus = "completed";
  job.progress = 90;

  if (render) {
    job.image =
      render.imageUrl || render.image || null;

    job.render = render;
  }

  // ==========================
  // Video
  // ==========================

  job.videoStatus = "waiting";

  job.progress = 100;

  return {
    promptImage: job.promptImage,

    promptVideo: job.promptVideo,

    render,
  };
}

module.exports = {
  processJob,
};