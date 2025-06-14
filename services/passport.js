const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt-nodejs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, {
            success: false,
            message: "User does not exist!",
          });
        }

        if (user.emailVerified != true && false) {
          //CHANGE WHEN COMPLETE!!!!
          return done(null, false, {
            success: false,
            message: "Please verify your email!",
          });
          //First param: null error, 2nd: false user, 3rd: error msg
        }
        //Password match only if user exists
        bcrypt.compare(password, user.password, (err, isMatch) => {
          console.log("The Error", err);
          if (err) throw err;
          if (isMatch) {
            return done(null, user, { success: true, message: "Logged in!" }); //return null for error and return user if password matches hash.
          } else {
            return done(null, false, {
              success: false,
              message: "Incorrect password entered!",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  )
);
