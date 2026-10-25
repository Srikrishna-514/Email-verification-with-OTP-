const { userModel } = require("../Models/user.js");
const { otpModel } = require("../Models/EmailOtp.js");
const { hashOtp } = require("../utils/hashOtp.js");
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    if (!/^\d{6}$/.test(String(otp))) {
      return res.status(400).json({
        message: "OTP must be 6 digits",
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
        message: "Email already verified",
      });
    }

    const otpRecord = await otpModel.findOne({
      userId: user._id,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found. Request a new OTP.",
      });
    }

    if (otpRecord.expiresAt <= new Date()) {
      await otpModel.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        message: "OTP expired. Request a new OTP.",
      });
    }

    const submittedHash = hashOtp(String(otp));

    if (submittedHash !== otpRecord.otpHash) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isEmailVerified = true;
    await user.save();

    await otpModel.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { verifyOTP };
