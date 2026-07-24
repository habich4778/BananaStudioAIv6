const Job = require("../models/job.model");
const queue = require("../queue/job.queue");

async function createJobs(productFiles = []) {
  queue.clear();

  const jobs = productFiles.map((product, index) => {
    return new Job({
      id: index + 1,

      product,

      productName:
        product.originalname,

      productPreview: `data:${product.mimetype};base64,${product.buffer.toString(
        "base64"
      )}`,
    });
  });

  queue.addMany(jobs);

  return queue.getAll();
}

async function runJobs(worker) {

  queue.start(true);

  const jobs = queue.getAll();

  for (const job of jobs) {

    queue.setCurrentJob(job.id);

    try {

      job.startedAt = new Date();

      job.status = "running";

      job.progress = 5;

      job.brainStatus = "running";

      const brainResult =
        await worker(job);

      job.brainStatus =
        "completed";

      job.progress = 40;

      job.promptImage =
        brainResult.promptImage || "";

      job.promptVideo =
        brainResult.promptVideo || "";

      job.imageStatus = "running";

      if (brainResult.render) {

        job.imageStatus =
          "completed";

        job.image =
          brainResult.render.image || null;

      }

      job.progress = 75;

      job.videoStatus = "waiting";

      job.progress = 95;

      job.result = brainResult;

      job.status = "completed";

      job.progress = 100;

      job.finishedAt = new Date();

    } catch (err) {

      job.status = "failed";

      job.error = err.message;

      job.finishedAt = new Date();

    }

  }

  queue.finish();

  return {

    jobs: queue.getAll(),

    statistics:
      queue.getStatistics(),

  };

}

/**
 * ==========================
 * Public API
 * ==========================
 */

function getJobs() {

  return queue.getAll();

}

function getJob(id) {

  return queue
    .getAll()
    .find(
      (job) =>
        Number(job.id) === Number(id)
    );

}

function getStatistics() {

  return queue.getStatistics();

}

function clear() {

  queue.clear();

}

module.exports = {

  createJobs,

  runJobs,

  getJobs,

  getJob,

  getStatistics,

  clear,

};