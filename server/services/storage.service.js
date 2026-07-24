const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUTPUT_DIR = path.join(
  __dirname,
  "../outputs"
);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, {
    recursive: true,
  });
}

function saveImage({
  buffer,
  extension = "png",
}) {
  const fileName =
    `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const filePath = path.join(
    OUTPUT_DIR,
    fileName
  );

  fs.writeFileSync(filePath, buffer);

  return {
    fileName,
    filePath,
    publicPath: `/outputs/${fileName}`,
  };
}

function deleteImage(fileName) {
  const filePath = path.join(
    OUTPUT_DIR,
    fileName
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function exists(fileName) {
  return fs.existsSync(
    path.join(
      OUTPUT_DIR,
      fileName
    )
  );
}

module.exports = {
  saveImage,
  deleteImage,
  exists,
};