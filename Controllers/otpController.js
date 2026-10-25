const { userModel } = require("../Models/user.js");
const { otpModel } = require("../Models/EmailOtp.js");
const { hashOtp } = require("../utils/hashOtp.js");
const { sendEmail } = require("../utils/sendMails.js");
const otp = require("../utils/genarateOtp.js");
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

    // Generate a secure six-digit OTP
    // const otp = crypto.randomInt(100000, 1000000).toString();

    // Hash the OTP
    const otpHash = hashOtp(otp);

    // Invalidate any previous OTP for this user
    await otpModel.deleteMany({ userId: user._id });

    // Save the new OTP hash and expiry time
    await otpModel.create({
      userId: user._id,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send the original OTP by email
    await sendEmail(user.email, otp);

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
