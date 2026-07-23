const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

exports.getProducts = asyncHandler(async (req, res) => {

    const { category, minPrice, maxPrice, search, inStock } = req.query;

    let filter = {};

    // Filter by category
    if (category) {
        filter.category = category;
    }

    // Filter by price
    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

    // Search in name and description
    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // In Stock only
    if (inStock === "true") {
        filter.stock = {
            $gt: 0
        };
    }

    const products = await Product.find(filter)
        .populate("category", "name");

    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: products
    });

});

exports.getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
        .populate("category", "name description");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        data: product
    });

});

exports.createProduct = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        price,
        category,
        stock
    } = req.body;

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
        res.status(404);
        throw new Error("Category not found");
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock
    });

    res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: product
    });

});

exports.updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
if (req.body.category) {
    const existingCategory = await Category.findById(req.body.category);

    if (!existingCategory) {
        res.status(404);
        throw new Error("Category not found");
    }
}

    Object.assign(product, req.body);

    const updatedProduct = await product.save();

    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: updatedProduct
    });

});

exports.deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        data: null
    });

});