const router = require("express").Router();
const controller = require("../controllers/dashboardController");

router.get("/", controller.getDashboardSummary);

module.exports = router;
