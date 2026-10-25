const { userModel } = require("../Models/user.js");
const bcrypt = require("bcrypt");
const signinController = async (req, res) => {
  try {
    const { username, email, password, isVerified } = req.body;
    if (username && email && password && isVerified) {
      const hashedPassword = bcrypt.hashSync(password, 12);
      console.log(hashedPassword);
      const userData = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword,
        isVerified: isVerified,
      });
      res
        .status(200)
        .json({ message: "user register Successfully", info: userData });
    } else {
      res.send("Enter proper details");
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { signinController };
