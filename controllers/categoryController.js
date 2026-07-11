const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
});

exports.getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404); throw new Error('Category not found'); }
    res.json(category);
});

exports.createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) { res.status(400); throw new Error('Please provide category name'); }
    const category = await Category.create({ name });
    res.status(201).json(category);
});

exports.updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404); throw new Error('Category not found'); }
    category.name = req.body.name || category.name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
});

exports.deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404); throw new Error('Category not found'); }
    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: 'Category removed successfully' });
});