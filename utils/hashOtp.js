const dotenv = require("dotenv");
const crypto = require("crypto");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const hashOtp = (otp) => {
  return crypto
    .createHmac("sha256", process.env.otpKey)
    .update(String(otp))
    .digest("hex");
};

module.exports = { hashOtp };
