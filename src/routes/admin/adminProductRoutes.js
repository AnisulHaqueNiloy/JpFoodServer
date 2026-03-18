const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/adminProductController");

router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", upload.array("images", 10), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
