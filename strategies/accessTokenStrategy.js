const configs = require("../configs");
const userModel = require("../models/Users");

const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = new jwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.accessTokenSecretKey,
  },
  async (payload, done) => {
    try {
      const user = await userModel.findByPk(payload.id, {
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) return done(null, false);

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
