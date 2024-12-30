const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../models/Users");

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await userModel.findOne({
      where: { userName: username },
      raw: true,
    });

    if (!user) return done(null, false);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return done(null, false);

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
