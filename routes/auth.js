const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateSchema = require("../validators/auth");
const validate = require("../middlewares/authValidate");
const authController = require("../controllers/auth");
const loginValidatorSchema = require("../validators/login");

router
  .route("/register")
  .post(validate(validateSchema), authController.register);

router
  .route("/login")
  .post(
    validate(loginValidatorSchema),
    passport.authenticate("local", { session: false }),
    authController.login
  );

module.exports = router;
