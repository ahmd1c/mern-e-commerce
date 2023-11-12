const Category = require("../models/categoryModel");
const asyncHandler = require("../utils/asyncHandler");
const Product = require("../models/productModel");

exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        categories,
    });;

})

exports.createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
})

exports.updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }
    res.status(200).json({
        success: true,
        category,
    });
})

exports.deleteCategory = asyncHandler(async (req, res) => {

    const deletedCategories = await Category.deleteMany({$or : [{parentCategory: req.params.id} , {_id: req.params.id}]});
    const deletedProducts = await Product.deleteMany({$or : [{category: req.params.id} , {subCategory: req.params.id}]});
    if(deletedCategories.deletedCount === 0){
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
    
})
