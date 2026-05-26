const authService = require("../services/authService");

const { generateToken } = require("../utils/jwt");

const cookieOptions = {
  httpOnly: true, // JS не має доступу
  secure: process.env.NODE_ENV === "production", // тільки HTTPS у production
  sameSite: "lax", // захист від CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів у мілісекундах
};

const authController = {
  async register(req, res) {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions); // зберігаємо токен в cookie
    res.status(201).json({
      success: true,
      token,
      message: "User registered successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  },

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions); // зберігаємо токен в cookie
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  },

  async getMe(req, res) {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  },
  async logout(req, res) {
    res.clearCookie("token", cookieOptions); // видаляємо cookie з токеном
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  },
};

module.exports = authController;
