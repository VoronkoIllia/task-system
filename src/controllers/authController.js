const authService = require("../services/authService");

const authController = {
  async register(req, res) {
    const { name, email, password } = req.body;

    const token = await authService.register(name, email, password);
    res
      .status(201)
      .json({ success: true, token, message: "User registered successfully" });
  },

  async login(req, res, next) {
    const { email, password } = req.body;

    const token = await authService.login(email, password);
    res.status(200).json({ success: true, token });
  },

  async getMe(req, res) {
    const user = await authService.getUserById(req.user.id);
    res.status(200).json({ success: true, user });
  },
};

module.exports = authController;
