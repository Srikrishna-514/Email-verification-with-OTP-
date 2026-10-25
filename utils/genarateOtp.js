const crypto = require("crypto");

const otp = crypto.randomInt(100000, 1000000).toString();

module.exports = otp;
