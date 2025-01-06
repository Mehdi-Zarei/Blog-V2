const express = require("express");
const router = express.Router();
const passport = require("passport");

//* Middlewares
const paramsAndBodyValidate = require("../middlewares/bodyAndParams");
const bodyValidate = require("../middlewares/bodyValidate");
const captcha = require("../middlewares/captcha");

//*Yup Schema
const validateSchema = require("../validators/auth");
const loginValidatorSchema = require("../validators/login");
const {
  forgetPasswordSchema,
  resetPasswordSchema,
  resetPasswordParamsSchema,
} = require("../validators/forgetPassword");

//* Controller
const authController = require("../controllers/auth");

router
  .route("/register")
  .post(bodyValidate(validateSchema), authController.register);

router
  .route("/login")
  .post(
    bodyValidate(loginValidatorSchema),
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
  .post(bodyValidate(forgetPasswordSchema), authController.forgetPassword);

router
  .route("/reset-password/:token")
  .post(
    paramsAndBodyValidate(resetPasswordParamsSchema, resetPasswordSchema),
    authController.resetPassword
  );

module.exports = router;
