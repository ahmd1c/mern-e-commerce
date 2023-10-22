
import { useCallback, useState } from "react"
import "./settings.css"
import Profile from "../profile/Profile"
import ChangePassword from "../change password/ChangePassword"
import Orders from "../orders/Orders"
import WhishList from "../whishlist/WhishList"
import Reviews from "../reviews/Reviews"

function Settings() {
    const [profile, setProfile] = useState(true)
    const [changePassword, setChangePassword] = useState(false)
    const [whishList, setWhishList] = useState(false)
    const [orders, setOrders] = useState(false)
    const [reviews, setReviews] = useState(false)


    const handleLayout = useCallback((active) => {
        const layOutArr = [setProfile, setChangePassword, setWhishList, setOrders, setReviews]
        layOutArr.forEach((fn => fn(false)))
        layOutArr[active](true)
    }, [])


    return (
        <div className="user-cont">
            <div className="user-aside">
                <div onClick={() => handleLayout(0)} className="statistics">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                    <h5>profile</h5>
                </div>
                <div onClick={() => handleLayout(1)} className="users">
                    <span className="material-symbols-outlined">
                        key
                    </span>
                    <h5>change password</h5>
                </div>
                <div onClick={() => handleLayout(2)} className="products">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <h5>whish list</h5>
                </div>
                <div onClick={() => handleLayout(3)} className="add-product">
                    <span className="material-symbols-outlined">
                        payments
                    </span>
                    <h5>orders</h5>
                </div>
                <div onClick={() => handleLayout(4)} className="Orders">
                    <span className="material-symbols-outlined">
                        reviews
                    </span>
                    <h5>reviews</h5>
                </div>

            </div>
            <div className="user-main">
                {profile ? <Profile /> : null}
                {changePassword ? <ChangePassword /> : null}
                {orders ? <Orders /> : null}
                {whishList ? <WhishList /> : null}
                {reviews ? <Reviews /> : null}
            </div>
        </div>
    )
}

export default Settings