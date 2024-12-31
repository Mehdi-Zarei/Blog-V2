const express = require("express");
const router = express.Router();

const validator = require("../middlewares/bodyValidate");
const articleSchema = require("../validators/createArticle");
const articleController = require("../controllers/articles");

router.route("/").post(validator(articleSchema), articleController.create);

module.exports = router;
