const express = require("express");
const dotenv = require("dotenv");
const { userModel } = require("./Models/user.js");
const connectDB = require("./Config/db.js");
const { router } = require("./Routes/authRoutes.js");
const app = express();
dotenv.config();
app.use(express.json());
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("REQUEST RECEIVED:", req.method, req.originalUrl);
  next();
});

app.use("/auth", router);

app.get("/db-health", async (req, res) => {
  try {
    await userModel.db.db.admin().ping();

    return res.status(200).json({
      status: "OK",
      message: "MongoDB ping successful",
    });
  } catch (error) {
    console.error("DB HEALTH ERROR:", error.message);

    return res.status(500).json({
      status: "ERROR",
      message: "MongoDB ping failed",
    });
  }
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
