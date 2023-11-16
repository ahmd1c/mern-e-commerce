/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../cartItem/cartItem"
import "./cart.css"
import { clearCart } from "../../redux/cartReducer";

function Cart({ cartActive, setCartActive }) {

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div className={`cart-aside ${cartActive ? "active" : ""}`}>
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
                    cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)
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
            <button style={{ width: "100%" }} className="btn-primary">Checkout</button>
        </div>
    )
}

export default Cart