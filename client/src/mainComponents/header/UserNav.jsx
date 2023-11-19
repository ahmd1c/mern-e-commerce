import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logUserOut } from "../../redux/userReducer";
import "./css/userNav.css"
import { ToastContainer , toast } from "react-toastify";

function UserNav() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const handleLogout = () => {
    fetch("http://localhost:5000/api/v1/user/signout",{credentials:"include"}).then(res => res.json())
        .then(data => {
            if(data.success) {
                dispatch(logUserOut());
                toast.success("You are logged out")
                window.location.reload();
            }else {
                toast.error('error logging out')
                window.location.reload();
            }
        })
    }

    return (
        <>
        <ToastContainer />
        {user?.email ? (
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
    }
        </>
        )
}

export default UserNav