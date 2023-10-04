import UserNav from "./UserNav"
import "./css/navlinks.css"

// eslint-disable-next-line react/prop-types
function NavLinks({handleAsideNav , active}) {



  return (
    <nav className={active ? "active" : null }>
      <div onClick={handleAsideNav} className={`menu-icon ${active ? "active" : null}`}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="">Products</a></li>
        <li><a href="">Categories</a></li>
      </ul>
      <UserNav />
    </nav>
  )
}

export default NavLinks