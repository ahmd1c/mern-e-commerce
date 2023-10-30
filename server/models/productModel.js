const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "product must have name"],
        minlength: [2, "To short name"]
    },
    amount: {
        type: Number,
        required: [true, "amount is required"],
        min: [1, "amout must be at least 1"],
        max: [4000, "too many of product at this time"],
        default: 1
    },
    description: {
        type: String,
        trim: true,
        required: [true, "product must have description"],
        minlength: [2, "To short description"],
    },

    beforePrice: Number,

    afterPrice: {
        type: Number,
        required: [true, "price is required"],
    },
    amountSold: {
        type: Number,
        default: 0,
        min: [0, "amount sold must be at least 0"],

    },
    avgRate: {
        avg: {
            type: Number,
            default: 0,
            min: [0, "avg rate must be at least 0"],
            max: [5, "avg rate must be at most 5"],
            required: [true, "avg rate is required"],

        },
        count: {
            type: Number,
            default: 0,
            min: [0, "count must be at least 0"],
            required: [true, "count is required"],
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "product must have category"],
        validate: {
            validator: async function (v) {
            const category = await Category.findById(v);
                return !!category;

            },
            message: "category is not valid",
        }},
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            validate: {
                validator: async function (v) {
                    const subCategory = await Category.findById(v);
                    return !!subCategory;
                },
                message: "sub category is not valid",
            }
        },
        cover: {
            type: String,
            required: [true, "product must have cover"],
        },
        images: [String]
    
}, { timestamps: true })


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
