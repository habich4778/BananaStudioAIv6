class JobQueue {
  constructor() {
    this.jobs = [];

    this.status = "idle";

    this.currentJobId = null;

    this.startedAt = null;

    this.finishedAt = null;

    this.autoMode = false;
  }

  // ==========================
  // Queue
  // ==========================

  add(job) {
    this.jobs.push(job);
  }

  addMany(jobs) {
    this.jobs.push(...jobs);
  }

  clear() {
    this.jobs = [];

    this.status = "idle";

    this.currentJobId = null;

    this.startedAt = null;

    this.finishedAt = null;
  }

  // ==========================
  // Factory
  // ==========================

  start(autoMode = false) {
    this.status = "running";

    this.autoMode = autoMode;

    this.startedAt = new Date();

    this.finishedAt = null;
  }

  finish() {
    this.status = "completed";

    this.currentJobId = null;

    this.finishedAt = new Date();
  }

  pause() {
    this.status = "paused";
  }

  resume() {
    this.status = "running";
  }

  stop() {
    this.status = "stopped";
  }

  setCurrentJob(jobId) {
    this.currentJobId = jobId;
  }

  // ==========================
  // Get Jobs
  // ==========================

  getAll() {
    return this.jobs;
  }

  getById(id) {
    return this.jobs.find(
      (job) => job.id === id
    );
  }

  getWaitingJobs() {
    return this.jobs.filter(
      (job) => job.status === "waiting"
    );
  }

  getRunningJobs() {
    return this.jobs.filter(
      (job) => job.status === "running"
    );
  }

  getCompletedJobs() {
    return this.jobs.filter(
      (job) => job.status === "completed"
    );
  }

  getFailedJobs() {
    return this.jobs.filter(
      (job) => job.status === "failed"
    );
  }

  // ==========================
  // Statistics
  // ==========================

  getStatistics() {
    return {
      total: this.jobs.length,

      waiting: this.getWaitingJobs().length,

      running: this.getRunningJobs().length,

      completed:
        this.getCompletedJobs().length,

      failed:
        this.getFailedJobs().length,

      currentJobId:
        this.currentJobId,

      status:
        this.status,

      autoMode:
        this.autoMode,

      startedAt:
        this.startedAt,

      finishedAt:
        this.finishedAt,
    };
  }
}

module.exports = new JobQueue();