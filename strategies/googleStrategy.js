const googleStrategy = require("passport-google-oauth20").Strategy;
const { default: slugify } = require("slugify");
const configs = require("../configs");
const userModel = require("../models/Users");

module.exports = new googleStrategy(
  {
    clientID: configs.auth.google.clientID,
    clientSecret: configs.auth.google.clientSecret,
    callbackURL: `${configs.domain}/api/auth/google/callback`,
  },
  async (accessTone, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      const avatar = profile.photos[0].value;

      const name = `${profile.name.givenName} ${profile.name.familyName}`;

      const userName =
        slugify(name, { lower: true }).replace(/[\.-]/g, "") +
        "-" +
        Date.now().toString().slice(-4);

      const usersCount = await userModel.count();

      // const user = await userModel.findOne({ where: { email } });

      // if (user) {
      //   return done(null, user);
      // }

      // const newUser = await userModel.create({
      //   name,
      //   userName,
      //   email,
      //   phone: "NULL",
      //   avatar,
      //   role: usersCount > 0 ? "USER" : "ADMIN",
      //   authProvider: "google",
      // });

      const newUser = await userModel.findOrCreate({
        where: { email },
        defaults: {
          name,
          userName,
          phone: "NULL",
          avatar,
          role: usersCount > 0 ? "USER" : "ADMIN",
          authProvider: "google",
        },
      });

      return done(null, newUser);
    } catch (error) {
      console.error("Error in Google OAuth Strategy:", error);
      return done(error, false);
    }
  }
);
