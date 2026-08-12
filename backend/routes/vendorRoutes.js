const router = require("express").Router();
const controller = require("../controllers/vendorController");

router.get("/", controller.getAllVendors);
router.get("/:id", controller.getVendorById);
router.post("/", controller.createVendor);
router.put("/:id", controller.updateVendor);
router.delete("/:id", controller.deleteVendor);

module.exports = router;
