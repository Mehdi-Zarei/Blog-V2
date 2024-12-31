const express = require("express");
const router = express.Router();

const validator = require("../middlewares/bodyValidate");
const articleSchema = require("../validators/createArticle");
const articleController = require("../controllers/articles");
const passport = require("passport");

router
  .route("/")
  .post(
    passport.authenticate("accessToken", { session: false }),
    validator(articleSchema),
    articleController.create
  );

module.exports = router;
