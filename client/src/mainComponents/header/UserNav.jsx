import { NavLink } from "react-router-dom"


function UserNav() {
    return (
        <div className="user">
            <button>
                <NavLink to="/login">login</NavLink>
            </button>
            <button>
                <NavLink to="/register">register</NavLink>
            </button>
        </div>
    )
}

export default UserNav