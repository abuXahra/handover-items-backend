const express = require("express");
const router = express.Router();
const handOverController = require("../controller/handover.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/", handOverController.createHandover);
router.get("/", authenticate, handOverController.getHandovers);
router.get("/:handoverId", handOverController.getHandover);
router.patch("/:handoverId", handOverController.updateHandover);
router.delete("/:handoverId", handOverController.deleteHandover);

module.exports = router;
