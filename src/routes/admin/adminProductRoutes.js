const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/adminProductController");

router.post("/products", upload.array("images", 10), createProduct);
router.put("/products/:id", upload.array("images", 10), updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
