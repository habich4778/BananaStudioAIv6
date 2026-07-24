class BaseProvider {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Tên Provider
   * Ví dụ:
   * nano
   * tensorart
   * openart
   * comfyui
   */
  getName() {
    throw new Error("Provider must implement getName()");
  }

  /**
   * Kiểm tra provider có sẵn sàng hay không
   */
  async isAvailable() {
    return true;
  }

  /**
   * Render ảnh
   *
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  async render(options) {
    throw new Error("Provider must implement render()");
  }

  /**
   * Lấy thông tin Provider
   */
  getInfo() {
    return {
      name: this.getName(),
      available: true,
    };
  }
}

module.exports = BaseProvider;