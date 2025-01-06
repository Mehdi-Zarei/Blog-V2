const userModel = require("../models/Users");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const redis = require("../redis");
const sendOtp = require("../utils/sendOtp");
const uuid = require("uuid").v4;
const { sendVerificationEmail } = require("../utils/nodemailer");

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

exports.refreshToken = async (req, res, next) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      { expiresIn: `${configs.auth.accessTokenExpireInMinutes}m` }
    );

    return res.json({ accessToken });
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

exports.sendOtp = async (req, res, next) => {
  try {
    const { userPhone } = req.body;

    const otpResult = await sendOtp(userPhone);

    if (!otpResult.success) {
      return res.status(400).json({ message: "Error sending OTP code !!" });
    }

    res.status(200).json({ message: "OTP code sent successfully." });
  } catch (error) {
    next(error);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ where: { email }, raw: true });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found With This Email !!" });
    }

    const resetPasswordToken = uuid();

    await redis.hset(`resetPassword:${resetPasswordToken}`, {
      token: resetPasswordToken,
      email: email,
    });
    await redis.expire(`resetPassword:${resetPasswordToken}`, 3600); //* 1 Hour

    const subject = "Reset Password Link";

    const text = `
    <p>سلام ${user.name} عزیز،</p>
    <p>درخواست تغییر رمز عبور برای حساب کاربری شما ثبت شده است. اگر این درخواست از سمت شما بوده است، لطفاً از طریق لینک زیر اقدام به تغییر رمز عبور خود کنید:</p>
    <a href="http://localhost:${configs.server.port}/auth/reset-password/${resetPasswordToken}">تغییر رمز عبور</a>
    <p>این لینک تا <strong>۱ ساعت</strong> آینده معتبر است. اگر شما این درخواست را ارسال نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید یا با پشتیبانی تماس بگیرید.</p>
    <p>با تشکر،</p>
    <p>تیم پشتیبانی</p>
`;

    const emailSent = await sendVerificationEmail(user, subject, text);

    if (emailSent) {
      return res
        .status(200)
        .json({ message: "Email has been sent successfully." });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to send email. Please try again later." });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const { token } = req.params;

    const data = await redis.hgetall(`resetPassword:${token}`);

    if (!data || data.token !== token) {
      return res
        .status(404)
        .json({ message: "Invalid or expired reset token." });
    }

    const hashedNewPassword = bcrypt.hashSync(password, 12);

    const [user] = await userModel.update(
      { password: hashedNewPassword },
      { where: { email: data.email } }
    );

    if (!user) {
      return res.status(404).json({ message: "User Not Found !!" });
    }

    await redis.del(`resetPassword:${token}`);

    return res
      .status(200)
      .json({ message: "Your Password Changed Successfully." });
  } catch (error) {
    next(error);
  }
};
