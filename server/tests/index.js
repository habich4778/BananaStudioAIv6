console.clear();

require("dotenv").config();

const path = require("path");

console.log("======================================");
console.log("🍌 Banana Studio Test Center");
console.log("======================================");
console.log("");

const tests = [
  {
    name: "Environment",
    file: "environment.test.js",
  },
  {
    name: "Prompt",
    file: "prompt.test.js",
  },
  {
    name: "Parser",
    file: "parser.test.js",
  },
  {
    name: "Upload",
    file: "upload.test.js",
  },
  {
    name: "Routes",
    file: "routes.test.js",
  },
  {
    name: "Controller",
    file: "controller.test.js",
  },
  {
    name: "Gemini",
    file: "gemini.test.js",
  },
  {
    name: "Generate",
    file: "generate.test.js",
  },
];

const results = [];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    require(path.join(__dirname, test.file));

    results.push({
      name: test.name,
      status: "PASS",
    });

    passed++;
  } catch (err) {
    results.push({
      name: test.name,
      status: "FAIL",
      error: err.message,
    });

    failed++;
  }
}

console.log("");
console.log("======================================");
console.log("📋 Test Summary");
console.log("======================================");

results.forEach((result) => {
  const dots = ".".repeat(
    Math.max(1, 24 - result.name.length)
  );

  console.log(
    `${result.status === "PASS" ? "✅" : "❌"} ${result.name} ${dots} ${result.status}`
  );

  if (result.error) {
    console.log(`   ↳ ${result.error}`);
  }
});

console.log("");
console.log("--------------------------------------");
console.log(`TOTAL  : ${tests.length}`);
console.log(`PASSED : ${passed}`);
console.log(`FAILED : ${failed}`);
console.log("--------------------------------------");

if (failed === 0) {
  console.log("");
  console.log("🎉 ALL TEST PASSED");
} else {
  console.log("");
  console.log("⚠ Có bài test chưa đạt.");
}

console.log("");