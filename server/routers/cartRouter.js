
const router = require("express").Router();

const { addToCart, getCart, clearCart, decreaseCartItem, deleteCartItem } = require("../controllers/cartHandler");
const Cart = require("../models/cartModel");
const { verifyToken } = require("../utils/authVerification");

router.post("/", verifyToken , addToCart)
router.patch("/", verifyToken , decreaseCartItem)
router.put("/", verifyToken , deleteCartItem)
router.get("/", verifyToken , getCart)
router.delete("/", verifyToken , clearCart )

module.exports = router