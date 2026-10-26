const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db.js");
const { router } = require("./Routes/authRoutes.js");
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/", router);

app.use((req, res) => {
  res.status(404).json({
    msg: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Application startup failed:", error.message);
    process.exit(1);
  });
