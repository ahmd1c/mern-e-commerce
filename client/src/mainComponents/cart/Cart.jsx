/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../cartItem/cartItem"
import "./cart.css"
import { clearCart } from "../../redux/cartReducer";
import { ToastContainer, toast } from "react-toastify";

function Cart({ cartActive, setCartActive }) {

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const handleClearCart = async() => {
        const res = await fetch("http://localhost:5000/api/v1/cart", {
            method : "DELETE",
            credentials : "include"
        })
        if(!res.ok) {
            return toast.error("Something went wrong");
        }
        toast.success("Cart cleared successfully");
        dispatch(clearCart());
    }

    const handleCheckout = async() => {
        const res = await fetch("http://localhost:5000/api/v1/order/create-checkout-session", {
            method : "POST",
            credentials : "include",
        })
        if(!res.ok) {
            return toast.error("Something went wrong");
        }
        const data = await res.json();
        window.location.href = data.url;
    }

    return (
        <div className={`cart-aside ${cartActive ? "active" : ""}`}>
            <ToastContainer />
            <span className="material-symbols-outlined" onClick={() => setCartActive(false)} >close</span>
            <div className="upper">
                <h1>Cart</h1>
                <h3>{cart.cartTotal} items</h3>
                <button onClick={handleClearCart}>Clear</button>
            </div>
            <div className="cart-items">

                {cart.cartItems.length === 0 ? (
                    <h3>Your cart is empty</h3>
                ) : (
                    cart.cartItems.map((item) => <CartItem key={item._id} item={item} />)
                )}
            </div>

            <form className="coupon">
                <input type="text" placeholder="Coupon code" />
                <button>Apply</button>
            </form>

            <div className="total">
                <h3>Total</h3>
                <h3>{cart.cartTotalCost} $</h3>
            </div>
            <button onClick={handleCheckout} style={{ width: "100%" }} className="btn-primary">Checkout</button>
        </div>
    )
}

export default Cart