import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userReducer";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (
            username.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            password !== repeatPassword
        )
            return toast.error("please fill the required fields");

        try {
            const response = await fetch("http://localhost:5000/api/v1/user/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username ,
                    email ,
                    password,
                    repeatPassword,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success === true) {
                dispatch(setUser(data.user));
                toast.success("You are successfully signed up");
                navigate("/", { replace: true });
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    };
    return (
        <div className="auth-cont">
            <ToastContainer />
            <form onSubmit={handleSignUpSubmit}>
                <div className="name">
                    <label htmlFor="name">name</label>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>
                <div className="email">
                    <label htmlFor="email">email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="repeat-password">
                    <label htmlFor="repeat-password">repeat password</label>
                    <input
                        onChange={(e) => setrepeatPassword(e.target.value)}
                        type="password"
                        name="repeat-password"
                        id="repeat-password"
                    />
                </div>
                <div className="forget-register">
                    <span>
                        Have an account ?<Link to="/login">login now</Link>
                    </span>
                    <hr />
                    <button type="button">Login with google</button>
                    <hr />
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
