const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db.js");
const { router } = require("./Routes/authRoutes.js");
const app = express();
dotenv.config();
app.use(express.json());
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use("/auth/", router);
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
