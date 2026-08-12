const router = require("express").Router();
const controller = require("../controllers/inventoryController");
const validate = require("../middleware/validateMiddleware");
const validator = require("../validators/inventoryValidator");

router.get("/", controller.getAllInventory);
router.get("/:id", controller.getInventoryById);
router.post("/", validate(validator), controller.createInventory);
router.put("/:id", validate(validator), controller.updateInventory);
router.delete("/:id", controller.deleteInventory);

module.exports = router;
