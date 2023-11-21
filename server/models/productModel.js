const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "product must have name"],
        minlength: [2, "name must be at least 2 characters"],
        maxlength: [200, "name must be at most 200 characters"],
    },
    quantity: {
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

    previousPrice: Number,

    currentPrice: {
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
        
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            
        },
        image: {
            type: String,
            required: [true, "product must have image"],
        },
    
}, { timestamps: true })


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
