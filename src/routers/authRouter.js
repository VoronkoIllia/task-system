const express = require("express");
const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const catchAsync = require("../middlewares/error-handling/catchAsync");

const router = express.Router();
router.post("/register", catchAsync(authController.register));
router.post("/login", catchAsync(authController.login));
router.get("/me", protect, catchAsync(authController.getMe));
router.post("/logout", protect, catchAsync(authController.logout));

module.exports = router;
