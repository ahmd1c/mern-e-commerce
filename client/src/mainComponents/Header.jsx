import NavIcons from "./NavIcons"
import NavLinks from "./NavLinks"
import Search from "./Search"
// import {Link} from "react-router-dom"
import "./header.css"

function Header() {
    return (
        <header>
            <div className="upper-section">
                <a href="/" >Ein-c</a>
                <Search />
                <NavIcons />
                <div className="user">
                    <button>Login</button>
                    <button>Register</button>
                </div>

            </div>
            <NavLinks />
        </header>
    )
}

export default Header