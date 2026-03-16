const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  createCategory,
  updateCategory, // <-- Eta missing chilo
  deleteCategory,
  createSubCategory,
  deleteSubCategory, // <-- Etao missing chilo
} = require("../../controllers/admin/adminCategoryController");

// Categories
router.post("/categories", upload.single("image"), createCategory);
router.put("/categories/:id", upload.single("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);

// Sub-Categories
router.post("/subcategories", upload.single("image"), createSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

module.exports = router;
