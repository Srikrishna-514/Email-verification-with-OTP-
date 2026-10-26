const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});
const connectDB = () => {
  mongoose

    .connect(process.env.mongooseUri, { dbName: process.env.dbName })
    .then((res) => console.log("Database Connected successfully"))
    .catch((err) => console.log(err.message));
};
module.exports = connectDB;
