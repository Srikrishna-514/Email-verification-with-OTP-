const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db.js");
const { router } = require("./Routes/authRoutes.js");
const app = express();
dotenv.config();
app.use(express.json());
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use("/auth/", router);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Render API is responding",
  });
});
app.use((req, res) => {
  res.status(404).json({
    msg: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});
app.listen(process.env.port, () => {
  console.log(`server is running on port ${process.env.port} `);
});
