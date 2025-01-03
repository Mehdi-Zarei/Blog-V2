const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");

//* Import Path Files

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const articlesRouter = require("./routes/articles");

const captchaController = require("./controllers/captcha");

const { errorHandler } = require("./middlewares/errorHandler");

const localStrategy = require("./strategies/localStrategy");
const accessTokenStrategy = require("./strategies/accessTokenStrategy");
const refreshTokenStrategy = require("./strategies/refreshTokenStrategy");
const googleStrategy = require("./strategies/googleStrategy");

//* Built-in Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

//* Third-party Middleware

app.use(cors());

passport.use(localStrategy);
passport.use(googleStrategy);

passport.use("accessToken", accessTokenStrategy);
passport.use("refreshToken", refreshTokenStrategy);

//* Import Routes

app.use("/api/auth", authRouter);
app.use("/api/captcha", captchaController.get);
app.use("/api/users", userRouter);
app.use("/api/articles", articlesRouter);

//* 404 Error Handler

app.use((req, res) => {
  return res.status(404).json({ message: "OoPss!Page Not Found !!" });
});

//* Global Error Handler
app.use(errorHandler);

module.exports = app;
