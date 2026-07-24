async function render({
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
    provider: "tensor-art",

    status: "waiting-render",

    prompt,

    action: "open-tensor-art",

    modelName: modelImage.originalname,

    productName: productImage.originalname,
  };
}

module.exports = {
  render,
};