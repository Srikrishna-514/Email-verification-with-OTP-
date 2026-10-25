const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const path = require("path")
dotenv.config();
const connectDB = () => {
  mongoose
    .connect(process.env.mongooseUri, { dbName: process.env.dbName })
    .then((res) => console.log("Database Connected successfully"))
    .catch((err) => console.log(err.message));
};
module.exports = connectDB;
