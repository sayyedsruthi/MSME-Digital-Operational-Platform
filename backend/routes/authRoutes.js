const router = require("express").Router();
const controller = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { loginValidator, registerValidator } = require("../validators/authValidator");

router.post("/register", validate(registerValidator), controller.register);
router.post("/login", validate(loginValidator), controller.login);
router.get("/profile", protect, controller.profile);

module.exports = router;
