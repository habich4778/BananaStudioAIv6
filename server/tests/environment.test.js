console.log("🧪 Environment Test");

try {
  const requiredEnv = [
    "GEMINI_API_KEY",
  ];

  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(
        `Thiếu biến môi trường: ${key}`
      );
    }
  });

  const modules = [
    "../prompts/generatePrompt",
    "../services/gemini.service",
    "../utils/geminiResponseParser",
  ];

  modules.forEach((modulePath) => {
    require(modulePath);
  });

  console.log("✅ Environment OK");

  console.log(
    `🔑 GEMINI_API_KEY: ${process.env.GEMINI_API_KEY.slice(0, 8)}...`
  );

  console.log("✅ Environment Test Passed");
} catch (err) {
  console.log("❌ Environment Test Failed");

  throw err;
}