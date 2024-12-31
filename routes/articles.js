const express = require("express");
const router = express.Router();

const validator = require("../middlewares/bodyValidate");
const articleSchema = require("../validators/createArticle");
const articleController = require("../controllers/articles");
const passport = require("passport");
const { createUploader } = require("../utils/uploader");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/images/covers"));
  },

  filename: (req, file, cb) => {
    const fileName =
      `${file.originalname}-${Date.now()}` + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const validFileTypes = /jpeg|jpg|png/;
  const mimeType = validFileTypes.test(file.mimetype);
  const extName = validFileTypes.test(path.extname(file.originalname));

  if (mimeType && extName) {
    return cb(null, true);
  }

  return cb(new Error("File type not supported !"));
};

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

router.route("/").post(
  passport.authenticate("accessToken", { session: false }), //todo: uncomment this line
  uploader.single("cover"),
  validator(articleSchema),
  articleController.create
);

module.exports = router;
