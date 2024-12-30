const express = require("express");
const router = express.Router();

const validateSchema = require("../validators/auth");
const validate = require("../middlewares/authValidate");
const authController = require("../controllers/auth");

router
  .route("/register")
  .post(validate(validateSchema), authController.register);

module.exports = router;
