const express = require("express");
const router = express.Router();
const {
  getCategoriesWithSubs,
  getProducts,
  getFeatured,
  getProductBySlug,
} = require("../controllers/productController");

// Categories Route
router.get("/categories", getCategoriesWithSubs);

// Product Routes
router.get("/", getProducts); // Filtering (Image 3)
router.get("/featured", getFeatured); // Homepage (Image 2)
router.get("/:slug", getProductBySlug); // Details (Image 4)



module.exports = router;
