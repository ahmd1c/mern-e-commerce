/* eslint-disable react/prop-types */
import CartItem from "../cartItem/cartItem"
import "./cart.css"

function Cart({cartActive , setCartActive}) {
    return (
        <div className={`cart-aside ${cartActive ? "active" : ""}`}>
            <span className="material-symbols-outlined" onClick={()=> setCartActive(false)} >close</span>
            <h1>Cart</h1>
            <div className="cart-items">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className="total">total</div>
            <button style={{width : "100%"}} className="btn-primary">Checkout</button>
        </div>
    )
}

export default Cart