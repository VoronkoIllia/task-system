const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../errors/ApiError");

const authService = {
  async register(name, email, password) {
    if (!name || !email || !password) {
      throw ApiError.badRequest("Name, email, and password are required");
    }

    if (password.length < 6) {
      throw ApiError.badRequest("Password must be at least 6 characters long");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw ApiError.badRequest("Invalid email format");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw ApiError.badRequest("Email already in use");
    }

    const user = new User({ name, email, password });

    await user.save();

    const token = generateToken(user._id, user.role);

    return token;
  },

  async login(email, password) {
    if (!email || !password) {
      throw ApiError.badRequest("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw ApiError.badRequest("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.badRequest("Invalid email or password");
    }

    const token = generateToken(user._id, user.role);

    return token;
  },

  getUserById(id) {
    const user = User.findById(id).select("-password");
    if (!user) {
      throw ApiError.notFound("User not found");
    }
    return user;
  },
};

module.exports = authService;
