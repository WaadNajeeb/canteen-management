const mongoose = require("mongoose");
const User = mongoose.model("users");
const passport = require("passport");

module.exports = (app) => {
  app.post("/auth/signup", async (req, res) => {
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

  app.post("/auth/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: info.success, message: info.message });
      }
      if (user) {
       
        req.logIn(user, function (err) {
          if (err) {
             
            return next(err);
          }
          console.log('The sucess', info);
          return res.send({ success: info.success, message: info.message });
        });
      }
    })(req, res, next);
  });
};
