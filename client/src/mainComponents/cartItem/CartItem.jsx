/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import "./cartItem.css"
import { addCartItem, decreaseCartItem, deleteCartItem } from "../../redux/cartReducer"
import { ToastContainer, toast } from "react-toastify"

function CartItem({ item }) {
    const dispatch = useDispatch()

    const handleIncrease = async() => {
        const { _id } = item;
        const serverItem = {productId : _id, quantity : 1}
        const res = await fetch("http://localhost:5000/api/v1/cart", {
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(serverItem)
        })
        if(!res.ok) {
            return toast.error("Something went wrong");
        }
        const data = await res.json();
        if(!data.success) {
            return toast.error("something went wrong");
        }
        dispatch(addCartItem(item))
    }

    const handleDecrease = async() => {
        const { _id } = item;
        const serverItem = {productId : _id}
        const res = await fetch("http://localhost:5000/api/v1/cart", {
            method : "PATCH",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(serverItem)
        })
        if(!res.ok) {
            return toast.error("Something went wrong");
        }
        const data = await res.json();
        if(!data.success) {
            return toast.error("something went wrong");
        }
        dispatch(decreaseCartItem(item._id))
    }

    const handleDelete = async() => {
        const { _id } = item;
        const serverItem = {productId : _id}
        const res = await fetch("http://localhost:5000/api/v1/cart", {
            method : "PUT",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(serverItem)
        })
        if(!res.ok) {
            return toast.error("Something went wrong");
        }
        const data = await res.json();
        if(!data.success) {
            return toast.error("something went wrong");
        }
        dispatch(deleteCartItem(item._id))
    }

    return (
        <div className="cart-item">
            <ToastContainer />
            <div className="cart-item-left-side">
                <div className="cart-item-img">
                    <img src={item.image} alt="item" />
                </div>
                <div className="cart-item-info">
                    <h5>{item.name}</h5>
                    <div className="item-cart-amount">
                        <button onClick={() => handleDecrease()}>-</button>
                        <input readOnly value={item.quantity} type="number" name="quantity" id="" />
                        <button onClick={() => handleIncrease()}>+</button>
                    </div>
                    <div className="item-cart-price">
                        <h4>{item.currentPrice * item.quantity} $</h4>
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