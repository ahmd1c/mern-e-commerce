import { NavLink } from "react-router-dom"
import UserNav from "./UserNav"
import "./css/navlinks.css"
import { useState } from "react"
import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
function NavLinks({ handleAsideNav, active }) {
  const user = useSelector((state) => state.user)
  const [categList, setCategList] = useState(false)

  return (
    <nav className={active ? "active" : null}>
      <div onClick={handleAsideNav} className={`menu-icon ${active ? "active" : null}`}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li
          onClick={(e) => {
            if (e.target.nodeName === "SPAN") setCategList((prev) => !prev)
          }}
          className="nav-category-item"><span className="nav-main-span">Categories <span className="material-symbols-outlined">
            arrow_drop_down
          </span></span>
          <ul className={`nav-category-list ${categList ? "active" : ""}`}>
            <li><NavLink to="/categories">Category 1</NavLink></li>
            <li><NavLink to="/categories">Category 2</NavLink></li>
            <li><NavLink to="/categories">Category 3</NavLink></li>
            <li><NavLink to="/categories">Category 4</NavLink></li>
            <li><NavLink to="/categories">Category 5</NavLink></li>
          </ul>
        </li>

        {user?.role === "admin" && (
          <li id="admin">
            <NavLink to="/admin">
              Dashboard
            </NavLink>
          </li>
        )}

      </ul>
      <UserNav />

    </nav>
  )
}

export default NavLinks