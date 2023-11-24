// creating add to cart schema in mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsListSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1'],
        max: [50, 'Quantity can not be more than 50']
    },
}, { _id: false });

const cartSchema = new Schema({
    productsList: [productsListSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;