const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateSchema = require("../validators/auth");
const validate = require("../middlewares/bodyValidate");
const authController = require("../controllers/auth");
const loginValidatorSchema = require("../validators/login");
const captcha = require("../middlewares/captcha");
const forgetPasswordSchema = require("../validators/forgetPassword");

router
  .route("/register")
  .post(validate(validateSchema), authController.register);

router
  .route("/login")
  .post(
    validate(loginValidatorSchema),
    captcha,
    passport.authenticate("local", { session: false }),
    authController.login
  );

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/google/callback")
  .get(
    passport.authenticate("google", { session: false }),
    authController.login
  );

router
  .route("/refresh")
  .get(
    passport.authenticate("refreshToken", { session: false }),
    authController.refreshToken
  );

router
  .route("/logout")
  .post(
    passport.authenticate("accessToken", { session: false }),
    authController.logOut
  );

router
  .route("/me")
  .get(
    passport.authenticate("accessToken", { session: false }),
    authController.getMe
  );

router.route("/otp/send").post(authController.sendOtp);

router
  .route("/forget-password")
  .post(validate(forgetPasswordSchema), authController.forgetPassword);

router.route("/reset-password/:token").post(authController.resetPassword);

module.exports = router;
