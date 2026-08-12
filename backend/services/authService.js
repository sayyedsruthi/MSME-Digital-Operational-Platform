const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

exports.register = async (payload) => {
  const existing = await userModel.findByEmail(payload.email);
  if (existing) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }
  const password = await bcrypt.hash(payload.password, 10);
  const user = await userModel.create({ ...payload, password });
  return { user, token: generateToken(user) };
};

exports.login = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, created_at: user.created_at };
  return { user: safeUser, token: generateToken(safeUser) };
};
