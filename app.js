
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const cookieParser = require('cookie-parser');

const keys = require('./config/keys');
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use("/auth", authRoutes);
app.use("/staff", staffRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
