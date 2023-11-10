const joi = require("joi");
const asyncHandler = require("../utils/asyncHandler");
const { validateObjectId } = require("../utils/authVerification");
const Category = require("../models/categoryModel");

exports.createProductValidator = asyncHandler(async (req, res, next) => {
    const schema = joi.object({
        name: joi
            .string()
            .trim()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.empty": "name is required",
                "string.min": "name must be at least 2 characters",
                "string.max": "name must be at most 100 characters",
            }),

        description: joi
            .string()
            .trim()
            .min(2)
            .max(4000)
            .required()
            .messages({
                "string.empty": "description is required",
                "string.min": "description must be at least 2 characters",
                "string.max": "description must be at most 4000 characters",
            }),

        category: joi
            .string()
            .required()
            .messages({
                "string.empty": "category is required",
            }),

        subCategory: joi
            .string()
            .required()
            .messages({
                "string.empty": "subCategory is required",
            }),

        quantity: joi
            .number()
            .min(1)
            .max(4000)
            .required()
            .messages({
                "number.base": "quantity is required",
                "number.min": "quantity must be at least 1",
                "number.max": "too many of product at this time",
            }),

        beforePrice: joi.number(),

        afterPrice: joi
            .number()
            .max(joi.ref("beforePrice"))
            .required()
            .messages({
                "number.base": "afterPrice is required",
                "number.max": "afterPrice must be less than beforePrice",
            }),
    });

    const value = await schema.validateAsync(req.body, { abortEarly: false });

    if (value) return next();
});

exports.updateProductValidator = asyncHandler(async (req, res, next) => {
    console.log("updateValidator");


    const schema = joi.object({
        name: joi
            .string()
            .trim()
            .min(2)
            .max(100)
            .messages({
                "string.min": "name must be at least 2 characters",
                "string.max": "name must be at most 100 characters",
            }),

        description: joi
            .string()
            .trim()
            .min(2)
            .max(4000)
            .messages({
                "string.min": "description must be at least 2 characters",
                "string.max": "description must be at most 4000 characters",
            }),

        category: joi.string(),

        subCategory: joi.string(),

        quantity: joi
            .number()
            .min(1)
            .max(4000)
            .messages({
                "number.min": "quantity must be at least 1",
                "number.max": "too many of product at this time",
            }),

        beforePrice: joi.number(),

        afterPrice: joi.number()
            .max(joi.ref("beforePrice"))
            .messages({
                "number.max": "afterPrice must be less than beforePrice",
            }),
    });

    const value = await schema.validateAsync(req.body, { abortEarly: false });

    if (value) return next();
});


exports.assertCategoryandSubCategory = asyncHandler(async (req, res, next) => {

    // if no category or subCategory that mostly an update not create as create will not pass from createProductValidator middleware
    

    if (!req.body.category && !req.body.subCategory) {
        console.log("HERE2");
        
        return next();
        
    } else if (req.body.category) {
        console.log("HERE3");
        
        validateObjectId(req.body.category , res);
        validateObjectId(req.body.subCategory , res);
        
        const category = await Category.findById(req.body.category);
        const subCategory = await Category.findById(req.body.subCategory);

        if (!category || !subCategory) {
            console.log("HERE4");
            throw new Error("category or subCategory not found");
        }

        return next();
        
    } else {
        
        console.log("HERE5");
        validateObjectId(req.body.subCategory , res);
        const subCategory = await Category.findById(req.body.subCategory);
        
        if (!subCategory) {
            throw new Error("subCategory not found");
        }

        return next();
    }


})