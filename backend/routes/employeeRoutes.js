const router = require("express").Router();
const controller = require("../controllers/employeeController");
const validate = require("../middleware/validateMiddleware");
const validator = require("../validators/employeeValidator");

router.get("/", controller.getAllEmployees);
router.get("/:id", controller.getEmployeeById);
router.post("/", validate(validator), controller.createEmployee);
router.put("/:id", validate(validator), controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

module.exports = router;
