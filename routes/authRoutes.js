const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const authorizeRoles = require('../middlewares/authorizeRoles');

let refreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  refreshTokens.push(token);
  return token;
}

// Register
router.post("/register", async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.send({
      success: false,
      message: "Body is empty",
    });
  }
  const inputName = body.fullName; //inputted username
  const password = body.password; //inputted password
  const email = body.email.toLowerCase(); //required to ensure duplicate accounts in MongoDB cannot be created with upper case letters of the same email
  const confirmpass = body.confirmpass;
  const role = body.role;

  if (!inputName) {
    return res.send({
      success: false,
      message: "Full Name cannot be blank",
    });
  }

  if (inputName.split(" ").length < 2) {
    return res.send({
      success: false,
      message: "Enter a first and last name",
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: "Email cannot be blank",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Password cannot be blank",
    });
  }

  if (password.length < 8) {
    return res.send({
      success: false,
      message: "Password cannot be shorter than 8 characters",
    });
  }

  if (!(password == confirmpass)) {
    return res.send({
      success: false,
      message: "Passwords do not match",
    });
  }

  const user = await User.findOne({ email: email });

  if (user) {
    return res.send({
      success: false,
      message: "Account already exists",
    });
  }

  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(email)) {
    try {
      // Saving new user in DB
      const newUser = new User();
      newUser.avatar = Math.floor(Math.random() * 5 + 1);
      newUser.fullName = inputName;
      newUser.email = email.toLowerCase();
      newUser.userType = "Student";
      newUser.password = newUser.hashPassword(password);
      newUser.role = role;

      const savedUser = await newUser.save();

      return res.send({
        success: true,
        message: "Account created!",
      });
    } catch (err) {
      console.error(err);
      return res.send({
        success: false,
        message: "Server error",
      });
    }
  } else {
    return res.send({
      success: false,
      message: "Invalid email",
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ success: false, message: info?.message });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    req.header('acesss-token', accessToken);
    req.header()
    res.json({ success: true, accessToken, refreshToken });
  })(req, res, next);
});

// Refresh Token
router.post("/token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});

// Logout
router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

// Protected Route
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Protected content", user: req.user });
  }
);

// 🔐 Staff-only route
router.get(
  '/staff/orders',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  (req, res) => {
    res.json({ message: 'Staff orders view', user: req.user });
  }
);

// 🔐 Customer-only route
router.get(
  '/canteen/menu',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('customer'),
  (req, res) => {
    res.json({ message: 'Customer canteen menu', user: req.user });
  }
);

module.exports = router;


module.exports = router;
