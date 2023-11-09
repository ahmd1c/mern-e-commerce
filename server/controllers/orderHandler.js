
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const asyncHandler = require("../utils/asyncHandler");
const { validateObjectId } = require("../utils/authVerification");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

exports.checkoutHandler = asyncHandler(async (req, res , next) => {
    // This is a public sample test API key.

    const coupon = await stripe.coupons.create({
        percent_off: 25.5,
        duration: 'once',
    });

    const userCart = await Cart.findOne({ user: req.user.id });

    const productListIds = userCart.productsList.map((product) => {
        return product.productId
    })

    const products = await Product.find({ _id: { $in: productListIds } }).select("name afterPrice quantity");


    //CHECKING IF THE PRODUCT IS AVAILABLE IN THE STORE OR NOT
    const notAvailable = [];

    products.forEach((product) => {
        const productQuantity = userCart.productsList.find((p) => p.productId.toString() === product._id.toString()).quantity;
        if (product.quantity < productQuantity) {
            notAvailable.push({
                name: product.name,
                quantity: productQuantity,
                notAvailableQuantity: product.quantity
            })
        }
    })

    if (notAvailable.length > 0) {
        return res.status(400).json({
            success: false,
            message: notAvailable.map((i) => `${i.name} only have ${i.notAvailableQuantity} available`,).join(". ")
        });
    }

    const lineItems = products.map((product) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name
                },
                unit_amount: product.afterPrice * 100
            },
            quantity: userCart.productsList.find((p) => p.productId.toString() === product._id.toString()).quantity
        }
    });


    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        discounts: [{
            coupon: coupon.id
        }],
        billing_address_collection: 'required',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    const order = await Order.create({
        user: req.user.id,
        products: userCart.productsList,
        totalPrice: userCart.totalPrice,
        stripeSessionId: session.id,

    });

    res.status(200).json({ url: session.url });

});



exports.orderSuccess = asyncHandler(async (req, res , next) => {

    const order = await Order.findOne({ user: req.user.id });

    const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);

    order.country = session.customer_details.address.country;
    order.city = session.customer_details.address.city;
    order.address = session.customer_details.address.line1;
    order.status = "processing";

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order placed successfully",
    })

})

exports.orderCancel = asyncHandler(async (req, res , next) => {
    const order = await Order.findOneAndDelete({ user: req.user.id });
    res.status(200).json({
        success: false,
        message: "Order has been cancelled",
    })
})

exports.getUserOrder = asyncHandler(async (req, res , next) => {
    const order = await Order.findOne({ user: req.user.id });
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }
    res.status(200).json({
        success: true,
        order
    })
})

exports.getUserOrders = asyncHandler(async (req, res , next) => {
    const orders = await Order.find({ user: req.user.id });
    if (!orders) {
        return res.status(404).json({
            success: false,
            message: "Orders not found"
        });
    }
    res.status(200).json({
        success: true,
        orders
    })
})

exports.getAllOrders = asyncHandler(async (req, res , next) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (!orders) {
        return res.status(404).json({
            success: false,
            message: "Orders not found"
        });
    }
    res.status(200).json({
        success: true,
        orders
    })
})

exports.updateOrder = asyncHandler(async (req, res , next) => {

    validateObjectId(req.params.id);

    const { status } = req.body; 
    // CHECK IF STATUS IS VALID 
    if (!["processing", "shipped", "delivered"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        })
    }

    const order = await Order.findByIdAndUpdate(req.params.id, {status}, {
        new: true,
        runValidators: true
    });
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    // SENDING ONLY STATUS WHICH IS CHANGED
    res.status(200).json({
        success: true,
        status: order.status
    })
})


exports.deleteOrder = asyncHandler(async (req, res , next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "order deleted successfully"
    })

})