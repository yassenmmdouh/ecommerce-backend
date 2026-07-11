const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const Category = require('../models/Category');
exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate('category', 'name'); 
    res.status(200).json(products);
});
exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) { res.status(404); throw new Error('Product not found'); }
    res.json(product);
});

exports.createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, countInStock } = req.body;

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
        res.status(404);
        throw new Error('Category not found');
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        countInStock
    });

    res.status(201).json(product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
});