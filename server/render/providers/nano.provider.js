const BaseProvider = require("./base.provider");

class NanoProvider extends BaseProvider {
  getName() {
    return "tensor-art";
  }

  async render({
    prompt,
    modelImage,
    productImage,
  }) {
    console.log("");
    console.log("🎨 Tensor.Art Manual Render");
    console.log("--------------------------------");

    console.log("Model :", modelImage.originalname);
    console.log("Product :", productImage.originalname);
    console.log("--------------------------------");
    console.log(prompt);
    console.log("--------------------------------");

    return {
      provider: this.getName(),

      status: "waiting-render",

      prompt,

      action: "open-tensor-art",

      modelName: modelImage.originalname,

      productName: productImage.originalname,
    };
  }
}

module.exports = new NanoProvider();