const router = require("express").Router();
const controller = require("../controllers/productionController");

router.get("/", controller.getAllProduction);
router.get("/:id", controller.getProductionById);
router.post("/", controller.createProduction);
router.put("/:id", controller.updateProduction);
router.delete("/:id", controller.deleteProduction);

module.exports = router;
