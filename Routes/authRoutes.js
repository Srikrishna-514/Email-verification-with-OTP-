const { signinController } = require("../Controllers/authController.js");
const { sendOTP } = require("../Controllers/otpController.js");
const { verifyOTP } = require("../Controllers/otpVerifyController.js");
const express = require("express");
const router = express.Router();
router.post("/signin", signinController);
router.post("/sendOtp", sendOTP);
router.post("/verifyOtp", verifyOTP);

module.exports = { router };
