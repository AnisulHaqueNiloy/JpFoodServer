const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/place-order", protect, orderController.placeOrder);

module.exports = router;