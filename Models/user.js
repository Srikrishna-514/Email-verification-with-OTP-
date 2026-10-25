const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
