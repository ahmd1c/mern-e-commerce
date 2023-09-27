const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true, "product must have name"],
        minlength : [2 , "To short name"]
    },
    amount: {
        type : Number,
        required : [true , "amount is required"],
        min : [1 , "amout must be at least 1"],
        max : [4000 , "too many of product at this time"],
        default : 1
    },
    description : {
        type : String,
        trim : true,
        required : [true, "product must have description"],
        minlength : [2, "To short description"],
    },

    beforePrice : Number ,

    afterPrice : {
        type : Number,
        required : [true , "price is required"],
    },
    rating : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Rating",
    }],
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : [true, "product must have category"]
    },
    subCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
    },

},{timestamps : true})


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
