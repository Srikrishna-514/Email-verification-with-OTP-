const { userModel } = require("../Models/user.js");
const { otpModel } = require("../Models/EmailOtp.js");
const { hashOtp } = require("../utils/hashOtp.js");
const { sendEmail } = require("../utils/sendMails.js");
const generateOtp = require("../utils/genarateOtp.js");

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // Generate an actual six-digit OTP
    const otp = generateOtp();

    // Hash the OTP before storing it
    const otpHash = hashOtp(otp);

    // Remove previous OTPs for this user
    await otpModel.deleteMany({ userId: user._id });

    // Save the hashed OTP with 5-minute expiry
    await otpModel.create({
      userId: user._id,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("Sending OTP email...");

    // Send email; wait at most 15 seconds
    await Promise.race([
      sendEmail(user.email, otp),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email sending timed out")), 15000),
      ),
    ]);

    console.log("OTP email sent successfully");

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP error:", error.message);

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

module.exports = { sendOTP };
