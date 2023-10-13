/* eslint-disable react/prop-types */

import "./css/navicons.css"

function NavIcons({ setCartActive}) {
    return (
        
        <div className="icons">
            <span data-amount={0} className="material-symbols-outlined">
                favorite
            </span>
            <span onClick={()=> setCartActive(true)} data-amount={0} className="material-symbols-outlined">
                shopping_cart
            </span>
        </div>
    )
}

export default NavIcons