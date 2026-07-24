function now() {
  return new Date().toLocaleTimeString("vi-VN");
}

function line() {
  console.log(
    "--------------------------------------------------"
  );
}

function log(section, message = "") {
  console.log(
    `[${now()}] [${section}] ${message}`
  );
}

function success(section, message = "") {
  console.log(
    `[${now()}] [${section}] ✅ ${message}`
  );
}

function warning(section, message = "") {
  console.log(
    `[${now()}] [${section}] ⚠️ ${message}`
  );
}

function error(section, message = "") {
  console.error(
    `[${now()}] [${section}] ❌ ${message}`
  );
}

module.exports = {
  line,
  log,
  success,
  warning,
  error,
};