const jwt = require("jsonwebtoken");
const env = require("../config/env");
const userModel = require("../models/userModel");

async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) return res.status(401).json({ success: false, message: "Authentication token missing" });

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

module.exports = protect;
