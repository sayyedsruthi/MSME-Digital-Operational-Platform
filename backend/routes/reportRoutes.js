const router = require("express").Router();
const controller = require("../controllers/reportController");

router.get("/inventory", controller.inventoryReport);
router.get("/sales", controller.salesReport);
router.get("/employees", controller.employeeReport);

module.exports = router;
