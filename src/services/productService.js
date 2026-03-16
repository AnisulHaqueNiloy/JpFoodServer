const Product = require('../models/Product');
const SubCategory = require('../models/SubCategory');

exports.getAllProductsService = async (filters) => {
    const { category, subCategory, subSlug, minPrice, maxPrice, stock, sort, bestSeller, limit } = filters;
    let query = {};

    // ID based filters
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (stock) query.stock = stock;
    if (bestSeller) query.bestSeller = true;

    // Slug based filter (Image 2 logic)
    if (subSlug) {
        const sub = await SubCategory.findOne({ slug: subSlug });
        if (sub) query.subCategory = sub._id;
    }

    // Price range logic
    if (minPrice || maxPrice) {
        query.price = { 
            $gte: Number(minPrice) || 0, 
            $lte: Number(maxPrice) || 999999 
        };
    }

    // Sorting logic
    let sortBy = { createdAt: -1 };
    if (sort === 'priceLow') sortBy = { price: 1 };
    if (sort === 'priceHigh') sortBy = { price: -1 };

    let productQuery = Product.find(query).populate('category subCategory').sort(sortBy);
    
    if (limit) productQuery = productQuery.limit(Number(limit));

    return await productQuery;
};