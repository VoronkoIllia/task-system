require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/authRouter");
const taskRouter = require("./routers/taskRouter");
const errorHandler = require("./middlewares/error-handling/errorHandler");
const ApiError = require("./errors/ApiError");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5500",
    credentials: true,
  }),
); // налаштування CORS для дозволу запитів з клієнтського додатку та передачі cookie
app.use(cookieParser()); // парсинг cookie для доступа к токену в cookie

app.use(express.json());
// app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use((req, res, next) => {
  next(ApiError.notFound("Page not found"));
});
app.use(errorHandler);

module.exports = app;
