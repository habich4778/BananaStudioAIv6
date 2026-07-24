console.log("🧪 Upload Test");

try {
  const multer = require("multer");

  if (!multer) {
    throw new Error(
      "Không load được multer."
    );
  }

  const storage = multer.memoryStorage();

  if (!storage) {
    throw new Error(
      "Không tạo được memoryStorage."
    );
  }

  const upload = multer({
    storage,
  });

  if (!upload) {
    throw new Error(
      "Không tạo được upload middleware."
    );
  }

  console.log("✅ Multer Loaded");

  console.log("✅ Memory Storage Ready");

  console.log("✅ Upload Test Passed");
} catch (err) {
  console.log("❌ Upload Test Failed");

  throw err;
}