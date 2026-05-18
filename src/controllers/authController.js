const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../errors/ApiError");

const authController = {
  async register(req, res) {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Email and password are required"));
    }
    try {
      // Find user by email
      const user = await User.findOne({ email }).select("+password");

      // Check if user exists and password matches
      if (!user) {
        return next(ApiError.badRequest("Invalid email or password"));
      }

      // Compare provided password with hashed password in database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(ApiError.badRequest("Invalid email or password"));
      }

      // Generate JWT token
      const token = generateToken(user._id, user.role);

      res.json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getMe(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = authController;
