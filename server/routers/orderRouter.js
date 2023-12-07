const { checkoutHandler, orderSuccess, orderCancel, getUserOrders, getAllOrders, updateOrder } = require("../controllers/orderHandler");
const { verifyToken, verifyAdmin } = require("../utils/authVerification");

const router = require("express").Router();

router.post("/create-checkout-session", verifyToken ,checkoutHandler)
router.post("/success", verifyToken , orderSuccess)
router.post("/cancel", verifyToken , orderCancel)
router.get("/user", verifyToken , getUserOrders )
router.get("/admin" , verifyAdmin , getAllOrders )
router.patch("/:id" , verifyAdmin , updateOrder)



module.exports = router