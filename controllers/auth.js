const { raw } = require("mysql2");
const userModel = require("../models/Users");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const redis = require("../redis");

exports.register = async (req, res, next) => {
  try {
    const { name, userName, email, phone, password } = req.body;

    const isUserExist = await userModel.findOne({
      where: {
        [Op.or]: [{ userName }, { email }, { phone }],
      },
      raw: true,
    });

    if (isUserExist) {
      let errorMessage = null;

      if (isUserExist.userName === userName) {
        errorMessage = "This username already exists!";
      } else if (isUserExist.email === email) {
        errorMessage = "This email already exists!";
      } else {
        errorMessage = "This phone number already exists!";
      }

      if (errorMessage) {
        return res.status(409).json({ message: errorMessage });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const usersCount = await userModel.count();

    const newUser = await userModel.create({
      name,
      userName,
      email,
      phone,
      password: hashedPassword,
      role: usersCount > 0 ? "USER" : "ADMIN",
    });

    const accessToken = jwt.sign(
      { id: newUser.id, role: newUser.role },
      configs.auth.accessTokenSecretKey,
      { expiresIn: `${configs.auth.accessTokenExpireInMinutes}m` }
    );

    const refreshToken = jwt.sign(
      { id: newUser.id },
      configs.auth.refreshTokenSecretKey,
      { expiresIn: `${configs.auth.refreshTokenExpireInDays}d` }
    );

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 12);

    await redis.set(
      `refreshToken:${newUser.id}`,
      hashedRefreshToken,
      "EX",
      configs.redis.refreshTokenExpireTimeInRedis
    );

    return res.status(201).json({
      message: "New user created successfully.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      { expiresIn: `${configs.auth.accessTokenExpireInMinutes}m` }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      configs.auth.refreshTokenSecretKey,
      { expiresIn: `${configs.auth.refreshTokenExpireInDays}d` }
    );

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 12);

    await redis.set(
      `refreshToken:${user.id}`,
      hashedRefreshToken,
      "EX",
      configs.redis.refreshTokenExpireTimeInRedis
    );

    return res.status(200).json({
      message: "User logged in successfully.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    const userID = req.user.id;

    await redis.del(`refreshToken:${userID}`);

    return res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;

    return res.json(user);
  } catch (error) {
    next(error);
  }
};
