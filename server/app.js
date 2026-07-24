require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes/index.routes");
const visionRoutes = require("./routes/vision.routes");

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

/**
 * Static Outputs
 * Sau này ảnh render sẽ được lưu tại:
 * server/outputs
 */
app.use(
  "/outputs",
  express.static(
    path.join(__dirname, "outputs")
  )
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Banana Studio AI V5 Backend Running 🚀",
  });
});

app.use("/api", routes);
app.use("/api/vision", visionRoutes);

// Kiểm tra server còn sống
app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("====================================");
  console.log("🍌 Banana Studio AI V5");
  console.log(`🚀 Server running: http://localhost:${PORT}`);
  console.log("====================================");
});

server.on("error", (err) => {
  console.error("SERVER ERROR:");
  console.error(err);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION");
  console.error(err);
});