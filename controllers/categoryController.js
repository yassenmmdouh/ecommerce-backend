const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

exports.getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find({});

    res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        data: categories
    });

});

exports.getCategoryById = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        data: category
    });

});

exports.createCategory = asyncHandler(async (req, res) => {

    const { name, description } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Please provide category name");
    }

    const category = await Category.create({
        name,
        description
    });

    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category
    });

});


exports.updateCategory = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;

    const updatedCategory = await category.save();

    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: updatedCategory
    });

});


exports.deleteCategory = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    await Category.deleteOne({ _id: req.params.id });

    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: null
    });

});