const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const { getAllProductsService } = require("../services/productService");

// 1. Sidebar Logic: Get Category with Nested Subcategories
exports.getCategoriesWithSubs = async (req, res) => {
  try {
    const categories = await Category.find();
    const fullData = await Promise.all(
      categories.map(async (cat) => {
        const subcategories = await SubCategory.find({ category: cat._id });
        return { ...cat._doc, subcategories };
      }),
    );
    res.json(fullData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Shop Page: GET /api/products (Image 3 Filter)
exports.getProducts = async (req, res) => {
  try {
    const products = await getAllProductsService(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Homepage: GET /api/products/featured (Image 2 - Tab wise)
exports.getFeatured = async (req, res) => {
  try {
    // Service-e pathiye dilam, oikhane slug handling kora ache
    const products = await getAllProductsService({ 
        ...req.query, 
        bestSeller: true, 
        limit: 8 
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Details Page: GET /api/products/:slug (Image 4)
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category subCategory",
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};