const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db.js");
const { router } = require("./Routes/authRoutes.js");
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
connectDB();
app.use("/auth/", router);
app.use("/", (req, res) => {
  res.status(200).json({ msg: "this is default api pls check your endpoints" });
});
app.listen(process.env.port, () => {
  console.log(`server is running on port ${process.env.port} `);
});
