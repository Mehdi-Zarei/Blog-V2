const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const configs = require("../configs");
const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const Redis = require("../redis");

module.exports = new jwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.refreshTokenSecretKey,
    passReqToCallback: true,
  },
  async (req, payload, done) => {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const user = await userModel.findByPk(payload.id, {
      raw: true,
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return done(null, false);
    }

    const hashedRefreshToken = await Redis.get(`refreshToken:${user.id}`);

    if (!hashedRefreshToken) {
      return done(null, false);
    }

    const compareRefreshToken = bcrypt.compareSync(
      refreshToken,
      hashedRefreshToken
    );

    if (!compareRefreshToken) {
      return done(null, false);
    }

    return done(null, user);
  }
);
