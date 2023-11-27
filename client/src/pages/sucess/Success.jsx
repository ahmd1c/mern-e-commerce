import "./success.css"
import correct from "../../assets/correct.webp"
import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux/cartReducer"

function Success() {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleSuccess = async () => {
            const res = await fetch("http://localhost:5000/api/v1/order/success", {
                method: "POST",
                credentials: "include",
            })
            if (!res.ok) {
                return toast.error("Something went wrong");
            }
            const data = await res.json();
            if (data.success) {
                dispatch(clearCart())
                toast.success(data.msg);
                console.log(data);
            }
        }

        handleSuccess();

    }, [])

    return (
        <div className="success-cont">
            <ToastContainer />
            <h1>Order Placed Successfully</h1>
            <img src={correct} alt="success" />
            <NavLink to="/">Back To Home</NavLink>
        </div>
    )
}

export default Success