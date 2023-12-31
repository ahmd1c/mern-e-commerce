
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");

exports.addToCart = asyncHandler( async (req, res , next) => {

    // GET THE PRODUCT ID FROM THE BODY
    const { productId, quantity } = req.body;

    // CHECK WHETHER THE PRODUCT IS AVAILABLE IN THE STORE OR NOT
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if (product.quantity < quantity) {
        return res.status(400).json({
            success: false,
            message: product.quantity > 0 ? `Only ${product.quantity} left` : "Product out of stock"
        });
    }

    // CHECK WHEHTER THE USER HAS A CART OR NOT
    let userCart = await Cart.findOne({ userId: req.user.id });

    // CREATE A NEW CART IF THERE IS NO CART
    if (!userCart) {
        userCart = await Cart.create({
            userId: req.user.id,
            productsList: [
                {
                    productId,
                    quantity,
                    price : product.currentPrice,
                }
            ],
            totalPrice: +quantity * product.currentPrice
        })

    } else {
        // CHECKS IF THE PRODUCT IS ALREADY IN THE CART
        const productExist = userCart.productsList.find(
            (p) => p.productId.toString() === productId.toString()
        );
        // IF PRODUCT EXISTS THEN INCREMENT QUANTITY & TOTAL PRICE 
        if (productExist) {
            productExist.quantity += +quantity;
            userCart.totalPrice += +quantity * product.currentPrice;

        } else {
            // IF PRODUCT DOES NOT EXIST THEN ADD THE PRODUCT TO THE CART
            userCart.productsList.push({
                productId,
                quantity,
                price : product.currentPrice
            });
            
            userCart.totalPrice += +quantity * product.currentPrice;
        }

        await userCart.save();

    }

    res.status(200).json({
        success: true,
        userCart
    })

})

exports.getCart = asyncHandler( async (req, res , next) => {

    const userCart = await Cart.findOne({ userId: req.user.id }).populate("productsList.productId");

    if (!userCart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found"
        });
    }

    return res.status(200).json({
        success: true,
        userCart
    })

})

exports.decreaseCartItem = asyncHandler( async (req, res , next) => {

    const { productId } = req.body;

    const userCart = await Cart.findOne({ userId: req.user.id }).populate("productsList.productId");

    if (!userCart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found"
        });
    }

    let isCartUpdated = false;
    const product = userCart.productsList.find((p) => p.productId._id.toString() === productId.toString());

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if(product.quantity > 1) {
        product.quantity--;
        userCart.totalPrice -= product.productId.currentPrice;
        isCartUpdated = true;

    }else if(product.quantity === 1) {
        userCart.productsList = userCart.productsList.filter((p) => p.productId._id.toString() !== productId.toString());
        userCart.totalPrice -= product.productId.currentPrice;
        isCartUpdated = true;
    }

    if (isCartUpdated) {
        await Cart.updateOne({ userId:  userCart.userId }, userCart , { new: true });
    }

    return res.status(200).json({
        success: true,
        userCart
    })

})

exports.deleteCartItem = asyncHandler( async (req, res , next) => {
    const { productId } = req.body;
    const userCart = await Cart.findOne({ userId: req.user.id }).populate("productsList.productId");
    const product = userCart.productsList.find((p) => p.productId._id.toString() === productId.toString());

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    userCart.productsList = userCart.productsList.filter((p) => p.productId._id.toString() !== productId.toString());
    userCart.totalPrice -= product.productId.currentPrice * product.quantity;
    await userCart.save();
    
    return res.status(200).json({
        success: true,
        userCart
    })

})

exports.clearCart = asyncHandler( async (req, res , next) => {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({
        success: true,
        message: "Cart cleared successfully"
    })
})

