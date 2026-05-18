require("dotenv").config();
const express = require("express");
const app = express();

const authRouter = require("./routers/authRouter");
const taskRouter = require("./routers/taskRouter");
const errorHandler = require("./middlewares/error-handling/errorHandler");
const ApiError = require("./errors/ApiError");

app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use((req, res, next) => {
  next(ApiError.notFound("Page not found"));
});
app.use(errorHandler);

module.exports = app;
