const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt-nodejs");

// Local strategy
passport.use(
  new LocalStrategy(  {
      usernameField: 'email', // we use 'email' instead of default 'username'
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
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
    } catch (err) {
      return done(err);
    }
  })
);

// JWT strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
