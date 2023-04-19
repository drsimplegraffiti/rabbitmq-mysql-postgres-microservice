const userService = require("../service/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config_service");

const userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user.length) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await userService.createANewUser(email, hashedPassword);
      return res.status(200).json({ message: "User created successfully" });
    }
    return res.status(400).json({ message: "User already exists" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user.length) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role },
      config.jwt.secret,
      { expiresIn: process.env.JWT_SECRET_EXPIRATION_TIME }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.env.isProduction,
      sameSite: config.env.isProduction ? "none" : "lax",
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
    userSignUp,
    userSignIn,
};