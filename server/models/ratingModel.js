const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    rate : {
        type : Number,
        min : [1 , "rate must be at least 1"],
        max : [5 , "rate can't be more than 5"],
        default : 4.5,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "user is required to rate"]
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : [true , "product must be exist in rate"]
    },
    comment : {
        type : String,
        minlength : [2 , "Too short comment"],
        maxlength : [500, "Too long comment"],
        trim : true,
    }
},{timestamps : true})

const Rating = mongoose.model("Rating" , ratingSchema )
module.exports = Rating