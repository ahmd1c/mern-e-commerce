import { NavLink } from "react-router-dom"
import UserNav from "./UserNav"
import "./css/navlinks.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

// eslint-disable-next-line react/prop-types
function NavLinks({ handleAsideNav, active }) {
  const user = useSelector((state) => state.user)
  const [categListShow, setCategListShow] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:5000/api/v1/category")
      if (!res.ok) return toast.error("something went wrong , please try again")
      const data = await res.json()
      setCategories(data.categories)
    }
    getCategories()
  }, [])

  return (
    <nav className={active ? "active" : null}>
      <div onClick={handleAsideNav} className={`menu-icon ${active ? "active" : null}`}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li
          onClick={(e) => {
            if (e.target.nodeName === "SPAN") setCategListShow((prev) => !prev)
          }}
          className="nav-category-item"><span className="nav-main-span">Products <span className="material-symbols-outlined">
            arrow_drop_down
          </span></span>
          <ul className={`nav-category-list ${categListShow ? "active" : ""}`}>
            {categories.map((category) => (
              <li key={category._id}><NavLink  to={`/products?category=${category._id}`}>{category.name}</NavLink></li>
            ))}
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