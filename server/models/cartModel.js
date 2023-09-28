// creating add to cart schema in mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    

},{timestamps : true});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;