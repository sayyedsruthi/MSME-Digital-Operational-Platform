const router = require("express").Router();
const controller = require("../controllers/orderController");
const validate = require("../middleware/validateMiddleware");
const validator = require("../validators/orderValidator");

router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrderById);
router.post("/", validate(validator), controller.createOrder);
router.put("/:id", validate(validator), controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;
