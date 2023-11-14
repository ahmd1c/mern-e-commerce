import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logUserOut } from "../../redux/userReducer";
import "./css/userNav.css"

// eslint-disable-next-line react/prop-types
function UserNav() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const handleLogout = () => {
        // fetch logout
        dispatch(logUserOut());
    }

    return (
        // eslint-disable-next-line react/prop-types
        user?.email ? (
            <div className="user">
                
                <NavLink to="/user">
                    <h5>{user?.username}ERERERERERERER</h5>
                    <img src={user?.profilePhoto} alt="profile" />
                </NavLink>
                <button onClick={handleLogout}>
                    logout
                </button>
            </div>
        ) :
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