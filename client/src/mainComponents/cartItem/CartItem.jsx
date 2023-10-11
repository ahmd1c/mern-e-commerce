
import "./cartItem.css"

function CartItem() {
    return (
        <div className="cart-item">
            <div className="cart-item-left-side">
                <div className="cart-item-img">
                    <img src="" alt="" />
                </div>
                <div className="cart-item-info">
                    <h5>title</h5>
                    <div className="item-cart-amount">
                        <button>-</button>
                        <input type="number" name="" id="" />
                        <button>+</button>
                    </div>
                    <h4>price</h4>
                </div>
            </div>
            <span className="material-symbols-outlined">
                delete
            </span>
        </div>
    )
}

export default CartItem