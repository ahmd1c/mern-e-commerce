// create order schema for e-commerce in mongoose

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stripeSessionId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    
    products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }],
    // subTotalPrice: {
    //     type: Number,
    //     required: true,
    // },
    totalPrice: {
        type : Number,
        required: true,
    },
    country : {
        type: String,
        // required: true
    },
    city : {
        type: String,
        // required: true,
    },
    address : {
        type: String,
        // required: true,
        trim : true,
        minlength : [5 , "to short address"],
        maxlength : [100, "to long address"]
    },
    status : {
        type: String,
        enum : [ "processing" , "shipped" , "delivered" , "cancelled"],
        default : "processing",
    }
},{timestamps : true})


const Order = mongoose.model("Order" , orderSchema);
module.exports = Order;