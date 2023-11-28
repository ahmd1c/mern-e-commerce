import { ToastContainer, toast } from "react-toastify";
import "./fail.css"
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Failed = () => {

    useEffect(() => {
        const cancelOrder = async () => {
            const res = await fetch("http://localhost:5000/api/order/cancel", {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) {
                return toast.error("Something went wrong");
            }
            const data = await res.json();
            if (!data.success) {
                toast.warn(data.msg);
            }
        }
        cancelOrder();
    },[])

    return (
        <div className="failed-order-page">
            <ToastContainer />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h1>Oops! Your order failed.</h1>
            <p>We&apos;re sorry, but there was an issue processing your order.</p>
            <p>Please contact our support team for assistance.</p>
            <NavLink to="/">Back To Home</NavLink>
        </div>
    );
};

export default Failed;