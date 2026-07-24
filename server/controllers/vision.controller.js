const bananaEngine = require("../engine/banana.engine");

const factoryWorker = require("../workers/factory.worker");

async function generate(req, res) {
  try {
    const {
      characterMode = "keep",
      sceneMode = "keep",
    } = req.body;

    const modelFile = req.files?.model?.[0];
    const productFiles = req.files?.products || [];

    if (!modelFile) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ảnh người mẫu.",
      });
    }

    if (!productFiles.length) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ảnh sản phẩm.",
      });
    }

    // ==========================
    // Factory Queue
    // ==========================

    await bananaEngine.createJobs(productFiles);

    // ==========================
    // Background Factory
    // Không chờ chạy xong
    // ==========================

    bananaEngine
      .runJobs(async (job) => {
        return factoryWorker.processJob({
          job,
          modelFile,
          characterMode,
          sceneMode,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    // ==========================
    // Trả kết quả ngay
    // ==========================

    return res.json({
      success: true,

      provider: "banana",

      mode: "factory",

      message:
        "Factory đã khởi động.",

      statistics:
        bananaEngine.getStatistics(),
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message:
        err.message || "Generate thất bại.",
    });

  }
}

/**
 * Factory Status
 */

async function status(req, res) {

  try {

    const statistics =
      bananaEngine.getStatistics();

    const jobs =
      bananaEngine.getJobs();

    return res.json({

      success: true,

      statistics,

      jobs,

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message:
        err.message,

    });

  }

}

module.exports = {
  generate,
  status,
};