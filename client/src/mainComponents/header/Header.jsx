import { useState } from "react"
import NavIcons from "./NavIcons"
import NavLinks from "./NavLinks"
import Search from "./Search"
import UserNav from "./UserNav"
// import {Link} from "react-router-dom"
import "./css/header.css"
import Cart from "../cart/Cart"

function Header() {
    const [active , setActive] = useState(false)
    const [cartActive , setCartActive] = useState(false)

    const handleAsideNav = ()=>{
        setActive(!active)
    }
    

    return (
        <header>
            <div className="upper-section">
                <div onClick={handleAsideNav} className={`menu-icon ${active ? "active" : null}`}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                <div className="logo">
                <a  href="/" >Ein-c</a>

                </div>
                <Search />
                <NavIcons  setCartActive={setCartActive}/>
                <UserNav />

            </div>
                <NavLinks active={active} handleAsideNav={handleAsideNav} />
                <Cart cartActive={cartActive} setCartActive={setCartActive}/>
        </header>
    )
}

export default Header