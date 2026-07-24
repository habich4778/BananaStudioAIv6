class Job {
  constructor({
    id,
    product,
    productName = null,
    productPreview = null,
  }) {
    // ==========================
    // Identity
    // ==========================

    this.id = id;

    this.product = product;

    this.productName =
      productName ||
      product?.originalname ||
      `Product ${id}`;

    this.productPreview =
      productPreview || null;

    // ==========================
    // Queue
    // ==========================

    this.status = "waiting";

    this.progress = 0;

    // ==========================
    // Pipeline
    // ==========================

    this.brainStatus = "waiting";

    this.imageStatus = "waiting";

    this.videoStatus = "waiting";

    // ==========================
    // Outputs
    // ==========================

    this.promptImage = "";

    this.promptVideo = "";

    this.image = null;

    this.video = null;

    this.result = null;

    // ==========================
    // Retry
    // ==========================

    this.retry = 0;

    // ==========================
    // Error
    // ==========================

    this.error = null;

    // ==========================
    // Time
    // ==========================

    this.createdAt = new Date();

    this.startedAt = null;

    this.finishedAt = null;
  }
}

module.exports = Job;