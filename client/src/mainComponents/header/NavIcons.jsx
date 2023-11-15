/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import "./css/navicons.css"

function NavIcons({ setCartActive}) {

    const cartTotal = useSelector((state) => state.cart.cartTotal);

    return (
        
        <div className="icons">
            <span data-amount={0} className="material-symbols-outlined">
                favorite
            </span>
            <span onClick={()=> setCartActive(true)} data-amount={cartTotal} className="material-symbols-outlined">
                shopping_cart
            </span>
        </div>
    )
}

export default NavIcons