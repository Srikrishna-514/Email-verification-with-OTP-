const { userModel } = require("../Models/user.js");
const bcrypt = require("bcrypt");

const signinController = async (req, res) => {
  console.log("1. Controller reached");
  console.log("2. Request body:", req.body);

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
        received: req.body,
      });
    }

    console.log("3. Input validation passed");

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("4. Password hashed");

    const userData = await userModel.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    console.log("5. User created");

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: userData._id,
        username: userData.username,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);

    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

module.exports = { signinController };
