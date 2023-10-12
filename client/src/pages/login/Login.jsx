
import { Link } from "react-router-dom"
import "./login.css"

function Login() {
    return (
        <div className="auth-cont">
            <form >
                <div className="email">
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="password">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="forget-register">
                    <Link to="#">forgot your password?</Link>
                    <span>
                        Do not have one ?
                        <Link to="/register">create an account now</Link>
                    </span>
                    <hr />
                    <button type="button">Login with google</button>
                    <hr />
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login