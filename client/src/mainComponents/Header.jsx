import { useState } from "react"
import NavIcons from "./NavIcons"
import NavLinks from "./NavLinks"
import Search from "./Search"
import UserNav from "./UserNav"
// import {Link} from "react-router-dom"
import "./header.css"

function Header() {
    const [active , setActive] = useState(false)

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
                <a className="logo" href="/" >Ein-c</a>
                <Search />
                <NavIcons />
                <UserNav />

            </div>
                <NavLinks active={active} handleAsideNav={handleAsideNav} />
        </header>
    )
}

export default Header