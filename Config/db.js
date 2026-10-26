const mongoose = require("mongoose");
const dev = require("dotenv");
dev.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongooseUri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
