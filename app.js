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

const localStrategy = require("./strategies/localStrategy");

//* Built-in Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

//* Third-party Middleware

app.use(cors());
passport.use(localStrategy);

//* Import Routes

app.use("/api/auth", authRouter);
app.use("/api/captcha", captchaController.get);
app.use("/api/users", userRouter);
app.use("/api/articles", articlesRouter);

//* 404 Error Handler

app.use((req, res) => {
  return res.status(404).json({ message: "OoPss!Page Not Found !!" });
});

module.exports = app;
