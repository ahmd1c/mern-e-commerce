/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import "./cartItem.css"
import { addCartItem, decreaseCartItem, deleteCartItem } from "../../redux/cartReducer"

function CartItem({ item }) {
    const dispatch = useDispatch()
    const handleIncrease = () => {
        dispatch(addCartItem(item))
    }

    const handleDecrease = () => {
        dispatch(decreaseCartItem(item.id))
    }

    const handleDelete = () => {
        dispatch(deleteCartItem(item.id))
    }

    return (
        <div className="cart-item">
            <div className="cart-item-left-side">
                <div className="cart-item-img">
                    <img src={item.image} alt="item" />
                </div>
                <div className="cart-item-info">
                    <h5>{item.title}</h5>
                    <div className="item-cart-amount">
                        <button onClick={() => handleDecrease()}>-</button>
                        <input value={item.quantity} type="number" name="quantity" id="" />
                        <button onClick={() => handleIncrease()}>+</button>
                    </div>
                    <div className="item-cart-price">
                        <h4>{item.price} $</h4>
                        <h5>X {item.quantity}</h5>
                    </div>
                </div>
            </div>
            <span onClick={() => handleDelete()} className="material-symbols-outlined">
                delete
            </span>
        </div>
    )
}

export default CartItem