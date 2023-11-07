const Joi = require('joi');
const asyncHandler = require('../utils/asyncHandler');
const { validateObjectId } = require('../utils/authVerification');

const cartValidation = asyncHandler(async (req, res, next) => {
    const productsListSchemaJoi = Joi.object({
        productId: Joi.string().required().custom((value, helper) => {
            if (!validateObjectId(value)) {
                return helper.message('Invalid productId');
            }
            return value;
        }),
        quantity: Joi.number().min(1).max(50).required().messages({
            'number.base': 'quantity is required',
            'number.min': 'quantity must be at least 1',
            'number.max': 'too many of product at this time',
        }),
    });
    
    const cartSchemaJoi = Joi.object({
        productsList: Joi.array().items(productsListSchemaJoi).required().messages({
            'array.base': 'productsList is required',
        }),

        totalPrice: Joi.number().required().messages({
            'number.base': 'totalPrice is required',
        }),
        userId: Joi.string().required().custom((value, helper) => {
            if (!validateObjectId(value)) {
                return helper.message('Invalid userId');
            }
            return value;
        }),
    });
   
    const value = await cartSchemaJoi.validateAsync(req.body, { abortEarly: false });
    if (value) return next();
   
})

module.exports = cartValidation;

