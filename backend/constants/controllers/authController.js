const authService = require("../services/authService");
const { success } = require("../utils/responseHandler");

exports.register = async (req, res, next) => {
  try {
    success(res, "User registered", await authService.register(req.body), 201);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    success(res, "Login successful", await authService.login(req.body));
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res) => {
  success(res, "Profile fetched", req.user);
};
