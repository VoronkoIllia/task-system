const express = require("express");
const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const catchAsync = require("../middlewares/error-handling/catchAsync");

const { registerSchema, loginSchema } = require("../validators/authValidators");
const validate = require("../middlewares/validate");

const router = express.Router();
router.post(
  "/register",
  validate(registerSchema),
  catchAsync(authController.register),
);
router.post("/login", validate(loginSchema), catchAsync(authController.login));
router.get("/me", protect, catchAsync(authController.getMe));
router.post("/logout", protect, catchAsync(authController.logout));

module.exports = router;
