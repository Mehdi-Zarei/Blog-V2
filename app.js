const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const userRouter = require("./routes/user");

//* Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

//* Third-party Middleware

app.use(cors());

//* Import Routes
// app.use("/api/auth", userRouter);
//* 404 Error Handler

app.use((req, res) => {
  return res.status(404).json({ message: "OoPss!Page Not Found !!" });
});

module.exports = app;
