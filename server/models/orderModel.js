// create order schema for e-commerce in mongoose

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }],
    totalProducts: {
        type : Number,
        required: true,
        min : [1 , "at least 1 product required"]
    },
    totalPrice: {
        type : Number,
        required: true,
    },
    country : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
        trim : true,
        minlength : [5 , "to short address"],
        maxlength : [100, "to long address"]

    }
},{timestamps : true})


const Order = mongoose.model("Order" , orderSchema);
module.exports = Order;