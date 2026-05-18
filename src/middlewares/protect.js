const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../errors/ApiError");
const { JWT_SECRET } = require("../config/env");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for Bearer token in Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    // Verify token and get user from payload
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return next(ApiError.badRequest("User not found"));
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        ApiError.badRequest("Your session has expired. Please log in again"),
      );
    }
    return next(ApiError.badRequest("Not authorized to access this route"));
  }
};

module.exports = protect;
